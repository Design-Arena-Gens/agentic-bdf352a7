import { faqs } from "@/lib/content";

export function FAQSection() {
  return (
    <section id="faq" className="bg-background-elevated py-20">
      <div className="mx-auto w-full max-w-[var(--grid-max-width)] px-6">
        <div className="mx-auto max-w-[var(--content-max-width)] text-center">
          <span className="text-sm font-semibold uppercase tracking-[0.28em] text-muted">
            Frequently asked questions
          </span>
          <h2 className="mt-4 text-3xl font-semibold text-foreground">
            Everything you want to know before your first night
          </h2>
        </div>
        <div className="mt-12 grid gap-4">
          {faqs.map((item, index) => (
            <details
              key={item.question}
              className="group rounded-[var(--radius-md)] border border-primary/15 bg-white/80 p-5 text-left shadow-sm"
              open={index === 0}
            >
              <summary className="flex cursor-pointer list-none items-center justify-between text-base font-semibold text-foreground">
                {item.question}
                <span className="ml-4 text-primary transition-transform group-open:rotate-45" aria-hidden>
                  +
                </span>
              </summary>
              <p className="mt-3 text-sm text-muted">{item.answer}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
