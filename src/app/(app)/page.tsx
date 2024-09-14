"use server";
import Hero from "#/components/custom/Hero";
import HeroHeader from "#/components/custom/HeroHeader";
import HeroFooter from "#/components/custom/HeroFooter";
import About from "#/components/custom/About";
import Resume from "#/components/custom/Resume";

export default async function Home() {
  return (
    <main className="mx-auto w-full max-w-7xl flex flex-col px-5">
      <section className="h-[100dvh] w-full flex flex-col">
        <HeroHeader />
        <Hero />
        <HeroFooter />
      </section>
      <section className="h-full dark:bg-dot-white/[0.4] bg-dot-black/[0.4] relative">
        <div className="relative z-10">
          <About />
          <Resume />
        </div>
        <div className="absolute pointer-events-none inset-0 flex items-center justify-center bg-background [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]"></div>
      </section>
    </main>
  );
}
