import Link from "next/link";
import Image from "next/image";
import { Columns3, FileText, Workflow } from "lucide-react";
import { Button } from "@/components/ui/button";
import { landingCopy } from "@/app/_data/landing";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PricingTable } from "@clerk/nextjs";

const PRICING_TAB =
  "rounded-full px-5 py-1.5 data-active:bg-primary data-active:text-primary-foreground dark:data-active:bg-primary dark:data-active:text-primary-foreground";

const featureIcons = {
  canvas: Workflow,
  docs: FileText,
  "team-board": Columns3,
};

type Feature = (typeof landingCopy.features.rows)[number];

function SurfaceMock({ feature }: { feature: Feature }) {
  if (feature.id === "canvas") {
    return (
      <div
        aria-label="Canvas flowchart preview"
        className="relative flex min-h-72 items-center justify-center overflow-hidden rounded-xl bg-[#f7f5f0] p-6 text-zinc-800 sm:min-h-80"
        style={{
          backgroundImage:
            "radial-gradient(circle, #d6d3cd 1px, transparent 1px)",
          backgroundSize: "18px 18px",
        }}
      >
        <div className="flex items-center gap-2 sm:gap-3">
          <div className="rounded-lg border border-zinc-200 bg-white px-3 py-2 text-xs font-medium shadow-sm sm:px-4 sm:text-sm">
            {feature.mock.nodes[0]}
          </div>
          <span aria-hidden="true" className="text-zinc-400">
            →
          </span>
          <div className="flex flex-col items-center gap-3">
            <div className="rounded-lg border border-amber-300 bg-amber-50 px-3 py-2 text-xs font-medium shadow-sm sm:px-4 sm:text-sm">
              {feature.mock.nodes[1]}
            </div>
            <div className="rounded-md border border-rose-200 bg-rose-50 px-2 py-1 text-[10px] text-rose-700 sm:text-xs">
              {feature.mock.branch}
            </div>
          </div>
          <span aria-hidden="true" className="text-zinc-400">
            →
          </span>
          <div className="rounded-lg border border-zinc-200 bg-white px-3 py-2 text-xs font-medium shadow-sm sm:px-4 sm:text-sm">
            {feature.mock.nodes[2]}
          </div>
        </div>
        <div className="absolute bottom-3 right-3 rounded-md border border-zinc-200 bg-white/90 px-2 py-1 font-mono text-[10px] text-zinc-500">
          100%
        </div>
      </div>
    );
  }

  if (feature.id === "docs") {
    return (
      <div
        aria-label="Product spec document preview"
        className="flex min-h-72 items-center justify-center rounded-xl bg-[#e8e5df] p-5 sm:min-h-80 sm:p-8"
      >
        <article className="min-h-56 w-full max-w-sm rounded-md border border-zinc-200 bg-white p-6 text-zinc-800 shadow-xl shadow-zinc-900/10 sm:p-8">
          <div className="mb-6 flex items-center justify-between border-b border-zinc-100 pb-3">
            <span className="text-[11px] text-zinc-500">
              {feature.mock.title}
            </span>
            <FileText aria-hidden="true" className="size-4 text-zinc-400" />
          </div>
          <h3 className="mb-3 text-xl font-semibold tracking-tight">
            {feature.mock.section}
          </h3>
          <p className="text-xs leading-5 text-zinc-500">
            {feature.mock.paragraph}
          </p>
          <div className="my-5 h-px bg-zinc-100" />
          <h4 className="mb-3 text-sm font-semibold">
            {feature.mock.subheading}
          </h4>
          <div className="space-y-2" aria-hidden="true">
            <div className="h-2 w-full rounded bg-zinc-100" />
            <div className="h-2 w-11/12 rounded bg-zinc-100" />
            <div className="h-2 w-3/4 rounded bg-zinc-100" />
          </div>
        </article>
      </div>
    );
  }

  return (
    <div
      aria-label="Team kanban board preview"
      className="min-h-72 overflow-hidden rounded-xl bg-[#f7f5f0] p-4 text-zinc-800 sm:min-h-80 sm:p-5"
    >
      <div className="mb-4 flex items-center justify-between">
        <span className="text-xs font-semibold">Product workspace</span>
        <div className="flex -space-x-1.5" aria-hidden="true">
          <span className="size-6 rounded-full border-2 border-[#f7f5f0] bg-amber-400" />
          <span className="size-6 rounded-full border-2 border-[#f7f5f0] bg-sky-400" />
          <span className="size-6 rounded-full border-2 border-[#f7f5f0] bg-violet-400" />
        </div>
      </div>
      <div className="grid grid-cols-3 gap-2 sm:gap-3">
        {feature.mock.columns.map((column, columnIndex) => (
          <div key={column.title} className="min-w-0">
            <div className="mb-2 flex items-center gap-1 text-[10px] font-medium text-zinc-500 sm:text-xs">
              <span
                aria-hidden="true"
                className={`size-1.5 rounded-full ${
                  columnIndex === 0
                    ? "bg-zinc-400"
                    : columnIndex === 1
                      ? "bg-amber-500"
                      : "bg-emerald-500"
                }`}
              />
              <span className="truncate">{column.title}</span>
            </div>
            <div className="space-y-2">
              {column.cards.map((card, cardIndex) => (
                <div
                  key={card}
                  className="rounded-md border border-zinc-200 bg-white p-2 shadow-sm"
                >
                  <div
                    className="mb-2 h-1.5 w-4/5 rounded bg-zinc-200"
                    aria-hidden="true"
                  />
                  <p className="text-[9px] font-medium leading-3 sm:text-[10px]">
                    {card}
                  </p>
                  {columnIndex === 1 && cardIndex === 0 && (
                    <span
                      aria-hidden="true"
                      className="relative -right-2 mt-2 inline-flex size-4 items-center justify-center rounded-full bg-sky-500 text-[8px] text-white shadow"
                    >
                      A
                    </span>
                  )}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function Home() {
  const { hero, audience, features, howItWorks, pricing, closing, footer } =
    landingCopy;

  return (
    <main>
      <section
        aria-labelledby="hero-title"
        className="topo-bg flex min-h-[calc(100svh-4.5rem)] items-center justify-center overflow-hidden px-6 py-24 text-center md:px-10"
      >
        <div className="relative z-10 mx-auto flex w-full max-w-7xl flex-col items-center">
          <p className="mb-7 inline-flex items-center gap-2 font-mono text-xs font-medium uppercase tracking-[0.22em] text-primary">
            <span
              aria-hidden="true"
              className="size-1.5 rotate-45 bg-primary"
            />
            {hero.eyebrow}
          </p>

          <h1
            id="hero-title"
            className="max-w-4xl text-balance font-heading text-5xl font-semibold leading-[1.04] tracking-[-0.045em] sm:text-6xl md:text-7xl lg:text-8xl"
          >
            {hero.headline.before}{" "}
            <span className="text-primary">{hero.headline.accent}</span>{" "}
            {hero.headline.after}
          </h1>

          <p className="mt-7 max-w-2xl text-pretty text-base leading-7 text-muted-foreground sm:text-lg sm:leading-8">
            {hero.subtitle}
          </p>

          <div className="mt-10 flex w-full flex-col items-center justify-center gap-3 sm:w-auto sm:flex-row">
            <Button
              asChild
              size="lg"
              className="h-12 w-full px-6 text-base sm:w-auto"
            >
              <Link href="/sign-up">
                {hero.primaryAction}
                <span aria-hidden="true" className="ml-1">
                  &rarr;
                </span>
              </Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="h-12 w-full border-white/15 bg-background/50 px-6 text-base hover:bg-white/5 sm:w-auto"
            >
              <Link href="#how-it-works">{hero.secondaryAction}</Link>
            </Button>
          </div>

          <div className="survey-frame scroll-tilt mt-20 w-full max-w-7xl">
            <div className="overflow-hidden rounded-2xl border border-white/10 bg-card/80 p-1 shadow-2xl shadow-black/40">
              <video
                autoPlay
                muted
                loop
                playsInline
                poster="/videos/hero-poster.jpg"
                aria-label="Preview of the Outpost workspace"
                className="aspect-video w-full rounded-xl object-cover"
              >
                <source src="/videos/hero.webm" type="video/webm" />
                <source src="/videos/hero.mp4" type="video/mp4" />
                Your browser does not support embedded video.
              </video>
            </div>
          </div>
        </div>
      </section>

      <section
        aria-label={audience.label}
        className="border-y border-white/10 bg-white/[0.02] px-6 py-7 md:px-10"
      >
        <div className="mx-auto flex max-w-6xl flex-col items-center gap-5 sm:flex-row sm:justify-between">
          <p className="shrink-0 font-mono text-xs uppercase tracking-[0.16em] text-muted-foreground">
            {audience.label}
          </p>
          <ul className="flex flex-wrap items-center justify-center gap-x-6 gap-y-3 sm:justify-end sm:gap-x-8">
            {audience.groups.map((group) => (
              <li
                key={group}
                className="text-sm font-medium text-foreground/80"
              >
                {group}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section
        id="product"
        aria-labelledby="features-title"
        className="px-6 py-24 md:px-10 md:py-32"
      >
        <div className="mx-auto max-w-6xl">
          <header className="mb-16 max-w-3xl md:mb-24">
            <p className="mb-4 font-mono text-xs uppercase tracking-[0.2em] text-primary">
              {features.eyebrow}
            </p>
            <h2
              id="features-title"
              className="text-balance font-heading text-4xl font-semibold leading-tight tracking-[-0.035em] sm:text-5xl md:text-6xl"
            >
              {features.heading}
            </h2>
          </header>

          <div className="space-y-20 md:space-y-28">
            {features.rows.map((feature, index) => {
              const Icon = featureIcons[feature.icon];
              const reverse = index % 2 === 1;

              return (
                <article
                  key={feature.id}
                  aria-labelledby={`${feature.id}-title`}
                  className="grid items-center gap-10 md:grid-cols-2 md:gap-16"
                >
                  <div className={reverse ? "md:order-2" : undefined}>
                    <div className="mb-5 flex size-11 items-center justify-center rounded-xl border border-primary/20 bg-primary/10 text-primary">
                      <Icon aria-hidden="true" className="size-5" />
                    </div>
                    <h3
                      id={`${feature.id}-title`}
                      className="font-heading text-3xl font-semibold tracking-tight sm:text-4xl"
                    >
                      {feature.title}
                    </h3>
                    <p className="mt-4 max-w-xl text-base leading-7 text-muted-foreground">
                      {feature.description}
                    </p>
                    <ul className="mt-6 space-y-3">
                      {feature.bullets.map((bullet) => (
                        <li
                          key={bullet}
                          className="flex items-start gap-3 text-sm leading-6 text-foreground/85"
                        >
                          <span
                            aria-hidden="true"
                            className="mt-2 size-1.5 shrink-0 rotate-45 bg-primary"
                          />
                          {bullet}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className={reverse ? "md:order-1" : undefined}>
                    <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-2 shadow-xl shadow-black/20 sm:p-3">
                      <SurfaceMock feature={feature} />
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section
        id="how-it-works"
        aria-labelledby="how-it-works-title"
        className="border-y border-white/10 bg-white/[0.02] px-6 py-24 md:px-10 md:py-32"
      >
        <div className="mx-auto max-w-6xl">
          <header className="mx-auto mb-16 max-w-3xl text-center md:mb-20">
            <p className="mb-4 font-mono text-xs uppercase tracking-[0.2em] text-primary">
              {howItWorks.eyebrow}
            </p>
            <h2
              id="how-it-works-title"
              className="text-balance font-heading text-4xl font-semibold leading-tight tracking-[-0.035em] sm:text-5xl md:text-6xl"
            >
              {howItWorks.heading}
            </h2>
          </header>

          <ol className="relative grid gap-8 before:absolute before:bottom-8 before:left-6 before:top-8 before:border-l before:border-dashed before:border-primary/40 md:grid-cols-3 md:gap-10 md:before:bottom-auto md:before:left-[16.666%] md:before:right-[16.666%] md:before:top-6 md:before:border-l-0 md:before:border-t">
            {howItWorks.steps.map((step, index) => (
              <li
                key={step.title}
                className="relative z-10 flex gap-5 md:flex-col md:items-center md:gap-6 md:text-center"
              >
                <span className="flex size-12 shrink-0 items-center justify-center rounded-full border border-primary/40 bg-background font-mono text-sm text-primary shadow-[0_0_24px_oklch(0.74_0.16_55_/_0.12)]">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <div className="pb-2 md:max-w-xs md:pb-0">
                  <h3 className="font-heading text-xl font-semibold tracking-tight sm:text-2xl">
                    {step.title}
                  </h3>
                  <p className="mt-2 text-sm leading-6 text-muted-foreground sm:text-base">
                    {step.description}
                  </p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section
        id="pricing"
        aria-labelledby="pricing-title"
        className="px-6 py-24 md:px-10 md:py-32"
      >
        <div className="mx-auto mb-12 max-w-5xl text-center">
          <p className="mb-4 font-mono text-xs uppercase tracking-[0.2em] text-primary">
            {pricing.eyebrow}
          </p>
          <h2
            id="pricing-title"
            className="text-balance font-heading text-6xl font-semibold leading-tight tracking-[-0.035em] sm:text-5xl md:text-6xl"
          >
            {pricing.heading}
          </h2>
          <Tabs defaultValue="user" 
            className= "mx-auto max-w-5xl items-center gap-10">
            <TabsList className="h-auto rounded-full border border-white/10 bg-white/3
            p-1 ">
              <TabsTrigger value="user" className={PRICING_TAB}>Personal</TabsTrigger>
              <TabsTrigger value="organization" className={PRICING_TAB}>Team</TabsTrigger>
            </TabsList>
            <TabsContent value="user" className="w-full">
              <PricingTable for="user"/>
            </TabsContent>
           <TabsContent value="organization" className="w-full">
              <PricingTable for="organization" />
            </TabsContent>
          </Tabs>
        </div>
      </section>

      <section
        aria-labelledby="closing-title"
        className="topo-bg relative isolate overflow-hidden border-y border-white/10 px-6 py-20 md:px-10 md:py-28"
      >
        <div className="relative z-10 mx-auto flex max-w-5xl flex-col-reverse items-center justify-between gap-8 text-center sm:flex-row sm:text-left">
          <div className="max-w-2xl">
            <p className="mb-4 font-mono text-xs uppercase tracking-[0.2em] text-primary">
              {closing.eyebrow}
            </p>
            <h2
              id="closing-title"
              className="text-balance font-heading text-4xl font-semibold leading-tight tracking-[-0.035em] sm:text-5xl"
            >
              {closing.heading}
            </h2>
            <Button asChild size="lg" className="mt-8 h-12 px-6 text-base">
              <Link href="/sign-up">{closing.action}</Link>
            </Button>
          </div>
          <Image
            src="/brand/mascot-dark.png"
            alt=""
            width={220}
            height={220}
            className="size-36 object-contain sm:size-48"
            aria-hidden="true"
          />
        </div>
      </section>

      <footer className="px-6 py-7 text-center md:px-10">
        <p className="text-sm text-muted-foreground">{footer}</p>
      </footer>
    </main>
  );
}
