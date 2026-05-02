import { Nav } from "@/components/determinant/Nav";
import { Hero } from "@/components/determinant/Hero";
import { About } from "@/components/determinant/About";
import { SmartFit } from "@/components/determinant/SmartFit";
import { ColorTest } from "@/components/determinant/ColorTest";
import { Seasonal } from "@/components/determinant/Seasonal";
import { Recommendations } from "@/components/determinant/Recommendations";
import { Footer } from "@/components/determinant/Footer";

const Index = () => (
  <main className="min-h-screen bg-background text-foreground">
    <Nav />
    <Hero />
    <About />
    <SmartFit />
    <ColorTest />
    <Seasonal />
    <Recommendations />
    <Footer />
  </main>
);

export default Index;
