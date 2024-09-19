"use server";
import Hero from "#/components/custom/Hero";
import HeroHeader from "#/components/custom/HeroHeader";
import HeroFooter from "#/components/custom/HeroFooter";
import About from "#/components/custom/About";
import Experience from "#/components/custom/Experience";
import Footer from "#/components/custom/Footer";
import UpScrollButton from "#/components/custom/UpScrollButton";
import Projects from "#/components/custom/Projects";

export default async function Home() {
  return (
    <main className="mx-auto flex flex-col px-5 max-w-[1280px] relative">
      <section className="h-[100dvh] w-full flex flex-col">
        <HeroHeader />
        <Hero />
        <HeroFooter />
      </section>
      <section className="h-full dark:bg-dot-white/[0.4] bg-dot-black/[0.4] relative">
        <div className="relative z-10">
          <About />
          <Experience />
          <Projects />
          <Footer />
        </div>
        <div className="absolute pointer-events-none inset-0 flex items-center justify-center bg-background [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]"></div>
      </section>
      <UpScrollButton />
    </main>
  );
}
