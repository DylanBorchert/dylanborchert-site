"use server";
import Hero from "#/components/custom/Hero";
import Nav from "#/components/custom/Nav";
import SubHero from "#/components/custom/SubHero";

export default async function Home() {
  return (
    <main className="mx-auto w-full max-w-7xl flex flex-col px-5">
      <section className="h-[100dvh] w-full flex flex-col">
        <Nav />
        <Hero />
        <SubHero />
      </section>
      <section className="w-full"></section>
    </main>
  );
}
