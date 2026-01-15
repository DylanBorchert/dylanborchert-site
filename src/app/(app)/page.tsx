"use server";
import Hero from "#/components/custom/Home/Hero/Hero";
import About from "#/components/custom/Home/About/About.client";
import Footer from "#/components/custom/Footer";
import UpScrollButton from "#/components/custom/UpScrollButton";
import ExperienceServer from "#/components/custom/Home/Experience/Experience.server";
import AboutServer from "#/components/custom/Home/About/About.server";
import { ContactClient } from "#/components/custom/Contact";
import { cn } from "#/lib/utils";
import { Projects } from "#/components/custom/Home/Projects/Projects.client";

export default async function Home() {
  return (
    <main className="flex flex-col px-5relative mx-5">
      <Hero>
        <Hero.Header />
        <Hero.Body />
        <Hero.Footer />
      </Hero>
      <section
        className={cn(
          "mx-auto max-w-[calc(100dvh*(5/4))]",
          "h-full relative inset-0",
          "[background-size:20px_20px]",
          "[background-image:radial-gradient(#d4d4d4_1px,transparent_1px)]",
          "dark:[background-image:radial-gradient(#404040_1px,transparent_1px)]"
        )}
      >
        <section className="h-full relative inset-0">
          <div className="z-10 relative">
            <AboutServer />
          </div>
        </section>
        <section className="h-full relative mt-5">
          <div className="z-10 relative">
            <ExperienceServer />
          </div>
        </section>
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_10%,var(--background))] dark:bg-background"></div>
      </section>
      <Projects />
      <Footer />
      <UpScrollButton />
      <ContactClient />
    </main>
  );
}