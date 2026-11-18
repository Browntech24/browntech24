import { Container } from "@/components/ui/container";

type PageHeaderProps = {
  eyebrow?: string;
  title: string;
  description?: string;
};

export function PageHeader({ eyebrow, title, description }: PageHeaderProps) {
  return (
    <div className="border-b border-border bg-surface/60">
      <Container className="py-16 sm:py-20">
        {eyebrow ? (
          <p className="mb-3 text-sm font-medium tracking-[0.14em] text-accent uppercase">
            {eyebrow}
          </p>
        ) : null}
        <h1 className="text-3xl font-semibold tracking-tight text-balance sm:text-4xl">{title}</h1>
        {description ? (
          <p className="mt-4 max-w-2xl text-pretty text-muted-foreground">{description}</p>
        ) : null}
      </Container>
    </div>
  );
}
