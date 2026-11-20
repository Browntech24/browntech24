import { AboutTeaser } from "@/components/sections/about-teaser";
import { ContactCta } from "@/components/sections/contact-cta";
import { FeaturedProjects } from "@/components/sections/featured-projects";
import { Hero } from "@/components/sections/hero";
import { LatestPosts } from "@/components/sections/latest-posts";
import { SkillsSnapshot } from "@/components/sections/skills-snapshot";

export default function HomePage() {
  return (
    <>
      <Hero />
      <FeaturedProjects />
      <AboutTeaser />
      <SkillsSnapshot />
      <LatestPosts />
      <ContactCta />
    </>
  );
}
