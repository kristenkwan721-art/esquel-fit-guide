import type { UserProfile, BodyShape, FitType, ColorProfile, Season, Recommendation, Undertone, Contrast } from "./types";

export function classifyBodyShape(p: UserProfile): BodyShape {
  if (p.bodyShape) return p.bodyShape;
  const { chest, waist, hip } = p;
  const wc = waist / chest, wh = waist / hip, ch = chest / hip;
  if (wc > 0.95 && wh > 0.95) return "oval";
  if (ch > 1.08) return "inverted";
  if (ch < 0.92) return "triangle";
  if (Math.abs(chest - hip) < 5 && wc > 0.78) return "rectangle";
  return "hourglass";
}

export function suggestFit(p: UserProfile): FitType {
  const bmi = p.weight / Math.pow(p.height / 100, 2);
  if (bmi < 21) return "slim";
  if (bmi < 26) return "regular";
  return "relaxed";
}

const PALETTES: Record<Season, { name: string; hex: string }[]> = {
  spring: [
    { name: "象牙白 Ivory", hex: "#F5EFE0" },
    { name: "嫩芽绿 Sprout", hex: "#A8C29A" },
    { name: "暖驼 Camel", hex: "#C9A87A" },
    { name: "珊瑚 Coral", hex: "#E89B7A" },
    { name: "天青 Sky", hex: "#A8C5D6" },
  ],
  summer: [
    { name: "雾蓝 Mist", hex: "#B7C7D1" },
    { name: "灰玫瑰 Rose", hex: "#C9A8B0" },
    { name: "薰衣草 Lavender", hex: "#B8B2CC" },
    { name: "云白 Cloud", hex: "#EDEDE8" },
    { name: "鼠尾草 Sage", hex: "#9AB0A0" },
  ],
  autumn: [
    { name: "焦糖 Caramel", hex: "#A87A4E" },
    { name: "苔绿 Moss", hex: "#6B7A4E" },
    { name: "赭石 Ochre", hex: "#C28A3A" },
    { name: "砖红 Brick", hex: "#9A4E3E" },
    { name: "亚麻 Linen", hex: "#D8C9A8" },
  ],
  winter: [
    { name: "墨黑 Ink", hex: "#1A1F1C" },
    { name: "纯白 Snow", hex: "#F8F6F1" },
    { name: "深松 Pine", hex: "#2E4A3A" },
    { name: "酒红 Bordeaux", hex: "#5A2030" },
    { name: "钢蓝 Steel", hex: "#3A4A5A" },
  ],
};

export function classifySeason(undertone: Undertone, contrast: Contrast): Season {
  if (undertone === "warm") return contrast === "high" ? "autumn" : "spring";
  if (undertone === "cool") return contrast === "high" ? "winter" : "summer";
  return contrast === "high" ? "winter" : "summer";
}

export function buildColorProfile(undertone: Undertone, contrast: Contrast): ColorProfile {
  const seasonType = classifySeason(undertone, contrast);
  return { undertone, contrast, seasonType, palette: PALETTES[seasonType] };
}

const SEASON_LABEL: Record<Season, string> = {
  spring: "春 · 暖浅型", summer: "夏 · 冷浅型", autumn: "秋 · 暖深型", winter: "冬 · 冷深型",
};
export const seasonLabel = (s: Season) => SEASON_LABEL[s];

const FIT_LABEL: Record<FitType, string> = { slim: "修身 Slim", regular: "标准 Regular", relaxed: "宽松 Relaxed" };
export const fitLabel = (f: FitType) => FIT_LABEL[f];

const SHAPE_LABEL: Record<BodyShape, string> = {
  rectangle: "长方形 / 直筒", triangle: "三角形 / 梨型", inverted: "倒三角 / 健硕",
  oval: "椭圆 / 圆润", hourglass: "沙漏 / 匀称",
};
export const shapeLabel = (s: BodyShape) => SHAPE_LABEL[s];

export function buildRecommendations(
  profile: UserProfile, color: ColorProfile, season: Season
): Recommendation[] {
  const fit = suggestFit(profile);
  const shape = classifyBodyShape(profile);
  const p = color.palette;

  const base: Omit<Recommendation, "id">[] = [
    {
      title: "通勤 · 静谧基底",
      fitType: fit,
      colors: [p[0], p[4], p[1]],
      items: ["天丝棉府绸衬衫", "再生棉锥形长裤", "极简皮带", "简约德比鞋"],
      description: `以 ${p[0].name} 为主色，叠加 ${p[1].name} 作为低饱和点缀。${shapeLabel(shape)}建议${fitLabel(fit)}剪裁，肩线干净、腰位自然。`,
      occasion: "工作日 · 办公室",
    },
    {
      title: "周末 · 自然层叠",
      fitType: fit === "slim" ? "regular" : fit,
      colors: [p[2], p[0], p[3]],
      items: ["有机棉 T 恤", "轻磅水洗衬衫", "技术面料工装裤", "帆布运动鞋"],
      description: `${SEASON_LABEL[color.seasonType]}的暖度搭配${p[2].name}做主调，营造放松而有结构的层次。`,
      occasion: "周末 · 散步咖啡",
    },
    {
      title: "正式 · 礼仪克制",
      fitType: "regular",
      colors: [p[4], p[0], { name: "墨黑 Ink", hex: "#1A1F1C" }],
      items: ["免烫西装外套", "高支棉礼服衬衫", "羊毛混纺西裤", "牛津鞋"],
      description: "克制的明暗对比，单点亮面材质，适合需要正式感但不张扬的场合。",
      occasion: "晚宴 · 商务",
    },
    {
      title: `${seasonName(season)} · 应季单品`,
      fitType: fit,
      colors: [p[1], p[0], p[2]],
      items: seasonItems(season),
      description: `结合当下${seasonName(season)}的温度与光线，强调面料触感与功能性，色彩呼应你的${SEASON_LABEL[color.seasonType]}基调。`,
      occasion: "日常 · 应季穿搭",
    },
  ];
  return base.map((b, i) => ({ ...b, id: `rec-${i}` }));
}

function seasonName(s: Season) {
  return ({ spring: "春季", summer: "夏季", autumn: "秋季", winter: "冬季" } as const)[s];
}
function seasonItems(s: Season): string[] {
  return ([...({
    spring: ["轻薄风衣", "棉麻长袖衬衫", "锥形九分裤", "皮革乐福鞋"],
    summer: ["凉感 Polo", "亚麻短袖衬衫", "速干休闲短裤", "帆布鞋"],
    autumn: ["羊毛针织衫", "灯芯绒衬衫", "锥形羊毛长裤", "皮靴"],
    winter: ["羊绒高领", "驼色长大衣", "羊毛西裤", "切尔西靴"],
  } as const)[s]]);
}

export function autoSeason(): Season {
  const m = new Date().getMonth() + 1;
  if (m <= 2 || m === 12) return "winter";
  if (m <= 5) return "spring";
  if (m <= 8) return "summer";
  return "autumn";
}
