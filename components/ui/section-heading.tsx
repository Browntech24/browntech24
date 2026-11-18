import { cn } from "@/lib/utils";

type SectionHeadingProps = {
  id?: string;
  eyebrow?: string;
  title: string;
  description?: string;
  className?: string;
};

export function SectionHeading({
  id,
  eyebrow,
  title,
  description,
  className,
}: SectionHeadingProps) {
  return (
    <div className={cn("max-w-2xl", className)}>
      {eyebrow ? (
        <p className="mb-2 text-sm font-medium tracking-[0.14em] text-accent uppercase">
          {eyebrow}
        </p>
      ) : null}
      <h2 id={id} className="text-2xl font-semibold tracking-tight text-balance sm:text-3xl">
        {title}
      </h2>
      {description ? <p className="mt-3 text-pretty text-muted-foreground">{description}</p> : null}
    </div>
  );
}
