type JsonLdProps = {
  data: Record<string, unknown>;
};

/**
 * Structured data. The payload is serialised by us, and `<` is escaped so a
 * content string can never close the script tag early.
 */
export function JsonLd({ data }: JsonLdProps) {
  const json = JSON.stringify(data).replace(/</g, "\\u003c");

  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: json }} />;
}
