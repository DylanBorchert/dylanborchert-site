"use server";
import Hero from "#/components/custom/Home/Hero/Hero";
import About from "#/components/custom/Home/About/About.client";
import Footer from "#/components/custom/Footer";
import UpScrollButton from "#/components/custom/UpScrollButton";
import ExperienceServer from "#/components/custom/Home/Experience/Experience.server";
import AboutServer from "#/components/custom/Home/About/About.server";
import { ContactClient } from "#/components/custom/Contact";


export default async function Home() {

  return (
    <main className="mx-auto flex flex-col px-5 max-w-[calc(100dvh*(4/3))] relative">
      <Hero>
        <Hero.Header />
        <Hero.Body />
        <Hero.Footer />
      </Hero>
      <section className="h-full dark:bg-grid-small-white/[0.2] bg-grid-small-black/[0.2] relative">
        <div className="z-10 relative">
          <AboutServer />
        </div>
        <div className="absolute pointer-events-none inset-0 flex items-center justify-center bg-background [mask-image:radial-gradient(ellipse_at_center,transparent_20%,hsl(var(--background)))]"></div>
      </section>
      <section className="h-full dark:bg-dot-white/[0.2] bg-dot-black/[0.2] relative mt-5">
        <div className="z-10 relative">
          <ExperienceServer />
          {/* <Projects /> */}
        </div>
        <div className="absolute pointer-events-none inset-0 flex items-center justify-center bg-background [mask-image:radial-gradient(ellipse_at_center,transparent_20%,hsl(var(--background)))]"></div>
      </section>
      <Footer />
      <UpScrollButton />
      <ContactClient />
    </main>
  );
}