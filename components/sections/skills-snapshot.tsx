import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { profile } from "@/lib/profile";

export function SkillsSnapshot() {
  return (
    <section
      aria-labelledby="skills-heading"
      className="border-t border-border bg-surface/40 py-20 sm:py-24"
    >
      <Container>
        <SectionHeading
          id="skills-heading"
          eyebrow="Toolkit"
          title="What I build with"
          description="The tools I reach for most. I pick the smallest stack that can carry the product."
        />

        <dl className="mt-10 grid gap-x-8 gap-y-8 sm:grid-cols-2 lg:grid-cols-4">
          {profile.skills.map((group) => (
            <div key={group.label}>
              <dt className="text-sm font-medium tracking-[0.14em] text-accent uppercase">
                {group.label}
              </dt>
              <dd className="mt-3">
                <ul className="flex flex-wrap gap-2">
                  {group.items.map((item) => (
                    <li
                      key={item}
                      className="rounded-full border border-border bg-background px-3 py-1 text-xs font-medium text-muted-foreground"
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              </dd>
            </div>
          ))}
        </dl>
      </Container>
    </section>
  );
}
