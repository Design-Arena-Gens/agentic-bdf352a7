import Image from "next/image";
import { features } from "@/lib/content";

export function FeaturesSection() {
  return (
    <section id="features" className="bg-background py-20">
      <div className="mx-auto w-full max-w-[var(--grid-max-width)] px-6">
        <div className="mx-auto max-w-[var(--content-max-width)] text-center">
          <span className="text-sm font-semibold uppercase tracking-[0.28em] text-muted">
            Feature highlights
          </span>
          <h2 className="mt-4 text-3xl font-semibold text-foreground md:text-4xl">
            Intelligent light, adaptive sound, insights that plan tomorrow
          </h2>
          <p className="mt-4 text-lg text-muted">
            LunaWave blends proven wavelengths, context-aware audio, and actionable recovery data so you
            fall asleep faster and wake with clarity.
          </p>
        </div>
        <div className="mt-16 grid gap-10">
          {features.map((feature, index) => (
            <article
              key={feature.name}
              className={`grid items-center gap-10 rounded-[var(--radius-lg)] bg-white/80 p-6 shadow-[var(--shadow-soft)] ring-1 ring-primary/10 md:grid-cols-2 ${
                index % 2 ? "md:flex-row-reverse" : ""
              }`}
            >
              <div className="order-2 md:order-1">
                <h3 className="text-2xl font-semibold text-foreground">{feature.name}</h3>
                <p className="mt-3 text-muted">{feature.description}</p>
                <ul className="mt-6 space-y-2 text-sm text-muted">
                  {feature.bullets.map((bullet) => (
                    <li key={bullet} className="flex items-start gap-2">
                      <span aria-hidden className="mt-1 text-primary">
                        ●
                      </span>
                      <span>{bullet}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="order-1 md:order-2">
                <div className="relative overflow-hidden rounded-[var(--radius-md)] bg-gradient-to-br from-[#0e1030] to-[#2a2c66] p-1 shadow-[var(--shadow-hard)]">
                  <Image
                    src={feature.image.src}
                    alt={feature.image.alt}
                    width={800}
                    height={600}
                    className="h-auto w-full rounded-[calc(var(--radius-md)-0.5rem)] object-cover"
                    loading="lazy"
                  />
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
