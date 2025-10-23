import { ScrollRestorer } from "@/components/ScrollRestorer";
export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  return (
    <section data-locale={locale}>
      <ScrollRestorer />
      {children}
    </section>
  );
}
