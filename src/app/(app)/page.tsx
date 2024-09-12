"use server";
import Hero from "#/components/custom/Hero";
import HeroHeader from "#/components/custom/HeroHeader";
import { Textfit } from "react-textfit";
import HeroFooter from "#/components/custom/HeroFooter";
import About from "#/components/custom/About";

export default async function Home() {
  return (
    <main className="mx-auto w-full max-w-7xl flex flex-col px-5">
      <section className="h-[100dvh] w-full flex flex-col">
        <HeroHeader />
        <Hero />
        <HeroFooter />
      </section>
      <section className="w-full">
        <About />
      </section>
    </main>
  );
}
