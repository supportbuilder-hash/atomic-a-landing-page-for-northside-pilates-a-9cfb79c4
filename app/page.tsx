"use client";

import { useState, type FormEvent } from "react";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { Activity, Heart, Sparkles, Clock, User, Circle, Check, ChevronDown, Mail } from 'lucide-react';
import { Reveal } from "@/components/Reveal";
import { fadeInUp, staggerContainer } from "@/lib/motion";
import { cn } from "@/lib/utils";

type ClassTypeItem = { title: string; duration: string; level: string; description: string };
type InstructorItem = { name: string; role: string; bio: string; image: string };
type PricingPlan = {
  name: string;
  price: string;
  period: string;
  description: string;
  features: string[];
  ctaLabel: string;
  badge?: string;
  highlighted?: boolean;
};
type FaqItem = { question: string; answer: string };
type ContactDetail = { label: string; value: string };

const CLASS_ICONS = [Activity, Heart, Sparkles, Clock, User, Circle];

export default function HomePage() {
  const t = useTranslations();

  const classTypes = (Array.isArray(t.raw("home.classTypes.items"))
    ? t.raw("home.classTypes.items")
    : []) as ClassTypeItem[];
  const instructors = (Array.isArray(t.raw("home.instructors.items"))
    ? t.raw("home.instructors.items")
    : []) as InstructorItem[];
  const plans = (Array.isArray(t.raw("home.pricing.plans")) ? t.raw("home.pricing.plans") : []) as PricingPlan[];
  const faqItems = (Array.isArray(t.raw("home.faq.items")) ? t.raw("home.faq.items") : []) as FaqItem[];
  const contactDetails = (Array.isArray(t.raw("home.contact.details"))
    ? t.raw("home.contact.details")
    : []) as ContactDetail[];
  const timeOptions = (Array.isArray(t.raw("home.freeTrial.timeOptions"))
    ? t.raw("home.freeTrial.timeOptions")
    : []) as string[];

  const [openFaq, setOpenFaq] = useState<number>(0);

  const [contactForm, setContactForm] = useState({ name: "", email: "", message: "" });
  const [contactSubmitted, setContactSubmitted] = useState(false);

  const [trialForm, setTrialForm] = useState({ name: "", email: "", timeSlot: timeOptions[0] ?? "" });
  const [trialSubmitted, setTrialSubmitted] = useState(false);

  const handleContactSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setContactSubmitted(true);
  };

  const handleTrialSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setTrialSubmitted(true);
  };

  return (
    <main className="bg-background text-foreground">
      {/* Hero */}
      <Reveal>
        <section id="hero" className="relative overflow-hidden bg-mesh py-24 md:py-32">
          <div className="mx-auto grid max-w-6xl grid-cols-1 items-center gap-12 px-6 lg:grid-cols-2">
            <div>
              <span className="inline-flex items-center rounded-full border border-border bg-card/60 px-4 py-1.5 text-sm font-medium text-muted-foreground">
                {t("home.hero.badge")}
              </span>
              <h1 className="mt-6 text-balance text-4xl font-semibold leading-tight tracking-tight md:text-6xl">
                {t("home.hero.titleStart")} <span className="text-gradient">{t("home.hero.titleAccent")}</span>
              </h1>
              <p className="mt-6 max-w-xl text-pretty text-lg leading-relaxed text-muted-foreground">
                {t("home.hero.subtitle")}
              </p>
              <div className="mt-10 flex flex-wrap items-center gap-4">
                <a
                  href="#free-trial-cta"
                  className="inline-flex items-center justify-center rounded-lg bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground shadow-glow transition hover:-translate-y-0.5 motion-reduce:transition-none"
                >
                  {t("home.hero.primaryCta")}
                </a>
                <a
                  href="#class-types"
                  className="inline-flex items-center justify-center rounded-lg border border-border bg-card px-6 py-3 text-sm font-semibold text-foreground transition hover:-translate-y-0.5 motion-reduce:transition-none"
                >
                  {t("home.hero.secondaryCta")}
                </a>
              </div>
            </div>
            <div className="glass-strong rounded-2xl p-3 shadow-glow">
              <div className="overflow-hidden rounded-xl">
                <img
                  src="https://titoaistorageaccount.blob.core.windows.net/titoai-storage/site-images/a2b1b40244414f2f8b120058c860a261.jpg"
                  alt={t("home.hero.imageAlt")}
                  className="h-full w-full object-cover"
                />
              </div>
            </div>
          </div>
        </section>
      </Reveal>

      {/* Class types */}
      <Reveal>
        <section id="class-types" className="py-24 md:py-32">
          <div className="mx-auto max-w-6xl px-6">
            <div className="max-w-2xl">
              <span className="text-sm font-semibold uppercase tracking-wide text-primary">
                {t("home.classTypes.eyebrow")}
              </span>
              <h2 className="mt-3 text-balance text-3xl font-semibold tracking-tight md:text-4xl">
                {t("home.classTypes.title")}
              </h2>
              <p className="mt-4 text-pretty text-lg leading-relaxed text-muted-foreground">
                {t("home.classTypes.subtitle")}
              </p>
            </div>
            <motion.div
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-80px" }}
              className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-3"
            >
              {classTypes.map((item, i) => {
                const Icon = CLASS_ICONS[i % CLASS_ICONS.length];
                return (
                  <motion.div
                    key={item.title}
                    variants={fadeInUp}
                    className={cn(
                      "surface-elevated rounded-2xl border border-border bg-card p-6 transition hover:-translate-y-1 hover:shadow-lg motion-reduce:transition-none",
                      i === 0 && "md:col-span-2"
                    )}
                  >
                    <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-primary/10 text-primary">
                      <Icon className="h-5 w-5" aria-hidden="true" />
                    </div>
                    <h3 className="mt-5 text-lg font-semibold">{item.title}</h3>
                    <div className="mt-1 flex items-center gap-2 text-sm text-muted-foreground">
                      <span>{item.duration}</span>
                      <span aria-hidden="true">&middot;</span>
                      <span>{item.level}</span>
                    </div>
                    <p className="mt-3 leading-relaxed text-muted-foreground">{item.description}</p>
                  </motion.div>
                );
              })}
            </motion.div>
          </div>
        </section>
      </Reveal>

      {/* Instructors */}
      <Reveal>
        <section id="instructors" className="bg-muted py-24 md:py-32">
          <div className="mx-auto max-w-6xl px-6">
            <div className="max-w-2xl">
              <span className="text-sm font-semibold uppercase tracking-wide text-primary">
                {t("home.instructors.eyebrow")}
              </span>
              <h2 className="mt-3 text-balance text-3xl font-semibold tracking-tight md:text-4xl">
                {t("home.instructors.title")}
              </h2>
              <p className="mt-4 text-pretty text-lg leading-relaxed text-muted-foreground">
                {t("home.instructors.subtitle")}
              </p>
            </div>
            <div className="mt-12 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
              {instructors.map((person, i) => (
                <Reveal key={person.name} delay={i * 0.06}>
                  <div className="overflow-hidden rounded-2xl border border-border bg-card shadow-glow">
                    <div className="aspect-[4/5] overflow-hidden">
                      <img src={person.image} alt={person.name} className="h-full w-full object-cover" />
                    </div>
                    <div className="p-5">
                      <h3 className="font-semibold">{person.name}</h3>
                      <p className="text-sm font-medium text-primary">{person.role}</p>
                      <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{person.bio}</p>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      </Reveal>

      {/* Pricing */}
      <Reveal>
        <section id="pricing" className="py-24 md:py-32">
          <div className="mx-auto max-w-6xl px-6">
            <div className="mx-auto max-w-2xl text-center">
              <span className="text-sm font-semibold uppercase tracking-wide text-primary">
                {t("home.pricing.eyebrow")}
              </span>
              <h2 className="mt-3 text-balance text-3xl font-semibold tracking-tight md:text-4xl">
                {t("home.pricing.title")}
              </h2>
              <p className="mt-4 text-pretty text-lg leading-relaxed text-muted-foreground">
                {t("home.pricing.subtitle")}
              </p>
            </div>
            <div className="mt-14 grid grid-cols-1 gap-6 md:grid-cols-3">
              {plans.map((plan) => (
                <div
                  key={plan.name}
                  className={cn(
                    "flex flex-col rounded-2xl border p-8 transition hover:-translate-y-1 motion-reduce:transition-none",
                    plan.highlighted ? "border-primary bg-card shadow-glow" : "border-border bg-card"
                  )}
                >
                  {plan.badge && (
                    <span className="mb-4 inline-flex w-fit items-center rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
                      {plan.badge}
                    </span>
                  )}
                  <h3 className="text-lg font-semibold">{plan.name}</h3>
                  <p className="mt-1 text-sm text-muted-foreground">{plan.description}</p>
                  <div className="mt-6 flex items-baseline gap-1">
                    <span className="text-4xl font-semibold tracking-tight">{plan.price}</span>
                    <span className="text-sm text-muted-foreground">{plan.period}</span>
                  </div>
                  <ul className="mt-6 flex-1 space-y-3">
                    {plan.features.map((feature) => (
                      <li key={feature} className="flex items-start gap-2 text-sm text-muted-foreground">
                        <Check className="mt-0.5 h-4 w-4 flex-shrink-0 text-primary" aria-hidden="true" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <a
                    href="#free-trial-cta"
                    className={cn(
                      "mt-8 inline-flex items-center justify-center rounded-lg px-5 py-3 text-sm font-semibold transition hover:-translate-y-0.5 motion-reduce:transition-none",
                      plan.highlighted
                        ? "bg-primary text-primary-foreground shadow-glow"
                        : "border border-border bg-background text-foreground"
                    )}
                  >
                    {plan.ctaLabel}
                  </a>
                </div>
              ))}
            </div>
          </div>
        </section>
      </Reveal>

      {/* Free trial sign-up */}
      <Reveal>
        <section id="free-trial-cta" className="bg-gradient-brand py-24 text-primary-foreground md:py-32">
          <div className="mx-auto grid max-w-6xl grid-cols-1 items-center gap-12 px-6 lg:grid-cols-2">
            <div>
              <span className="text-sm font-semibold uppercase tracking-wide text-primary-foreground/70">
                {t("home.freeTrial.eyebrow")}
              </span>
              <h2 className="mt-3 text-balance text-3xl font-semibold tracking-tight md:text-4xl">
                {t("home.freeTrial.title")}
              </h2>
              <p className="mt-4 max-w-md text-pretty leading-relaxed text-primary-foreground/80">
                {t("home.freeTrial.subtitle")}
              </p>
            </div>
            <div className="glass-strong rounded-2xl p-8">
              {trialSubmitted ? (
                <p className="text-center text-lg font-medium">{t("home.freeTrial.successMessage")}</p>
              ) : (
                <form onSubmit={handleTrialSubmit} className="space-y-5">
                  <div>
                    <label htmlFor="trial-name" className="mb-1.5 block text-sm font-medium text-primary-foreground/90">
                      {t("home.freeTrial.nameLabel")}
                    </label>
                    <input
                      id="trial-name"
                      type="text"
                      required
                      value={trialForm.name}
                      onChange={(e) => setTrialForm((prev) => ({ ...prev, name: e.target.value }))}
                      className="w-full rounded-lg border border-primary-foreground/20 bg-background/10 px-4 py-2.5 text-primary-foreground placeholder:text-primary-foreground/50 focus:border-primary-foreground/60 focus:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                    />
                  </div>
                  <div>
                    <label htmlFor="trial-email" className="mb-1.5 block text-sm font-medium text-primary-foreground/90">
                      {t("home.freeTrial.emailLabel")}
                    </label>
                    <input
                      id="trial-email"
                      type="email"
                      required
                      value={trialForm.email}
                      onChange={(e) => setTrialForm((prev) => ({ ...prev, email: e.target.value }))}
                      className="w-full rounded-lg border border-primary-foreground/20 bg-background/10 px-4 py-2.5 text-primary-foreground placeholder:text-primary-foreground/50 focus:border-primary-foreground/60 focus:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                    />
                  </div>
                  <div>
                    <label htmlFor="trial-time" className="mb-1.5 block text-sm font-medium text-primary-foreground/90">
                      {t("home.freeTrial.timeLabel")}
                    </label>
                    <select
                      id="trial-time"
                      value={trialForm.timeSlot}
                      onChange={(e) => setTrialForm((prev) => ({ ...prev, timeSlot: e.target.value }))}
                      className="w-full rounded-lg border border-primary-foreground/20 bg-background/10 px-4 py-2.5 text-primary-foreground focus:border-primary-foreground/60 focus:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                    >
                      {timeOptions.map((option) => (
                        <option key={option} value={option} className="text-foreground">
                          {option}
                        </option>
                      ))}
                    </select>
                  </div>
                  <button
                    type="submit"
                    className="w-full rounded-lg bg-background px-5 py-3 text-sm font-semibold text-foreground transition hover:-translate-y-0.5 motion-reduce:transition-none"
                  >
                    {t("home.freeTrial.submitLabel")}
                  </button>
                  <p className="text-center text-xs text-primary-foreground/70">{t("home.freeTrial.note")}</p>
                </form>
              )}
            </div>
          </div>
        </section>
      </Reveal>

      {/* FAQ */}
      <Reveal>
        <section id="faq" className="bg-muted py-24 md:py-32">
          <div className="mx-auto grid max-w-6xl grid-cols-1 gap-12 px-6 lg:grid-cols-[0.8fr_1.2fr]">
            <div>
              <span className="text-sm font-semibold uppercase tracking-wide text-primary">
                {t("home.faq.eyebrow")}
              </span>
              <h2 className="mt-3 text-balance text-3xl font-semibold tracking-tight md:text-4xl">
                {t("home.faq.title")}
              </h2>
              <p className="mt-4 text-pretty leading-relaxed text-muted-foreground">{t("home.faq.subtitle")}</p>
            </div>
            <div className="divide-y divide-border rounded-2xl border border-border bg-card">
              {faqItems.map((item, i) => (
                <div key={item.question}>
                  <button
                    type="button"
                    onClick={() => setOpenFaq(openFaq === i ? -1 : i)}
                    aria-expanded={openFaq === i}
                    className="flex w-full items-center justify-between gap-4 p-5 text-left"
                  >
                    <span className="font-medium">{item.question}</span>
                    <ChevronDown
                      className={cn(
                        "h-4 w-4 flex-shrink-0 text-muted-foreground transition-transform",
                        openFaq === i && "rotate-180"
                      )}
                      aria-hidden="true"
                    />
                  </button>
                  {openFaq === i && (
                    <div className="px-5 pb-5 text-sm leading-relaxed text-muted-foreground">{item.answer}</div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>
      </Reveal>

      {/* Contact */}
      <Reveal>
        <section id="contact" className="py-24 md:py-32">
          <div className="mx-auto grid max-w-6xl grid-cols-1 gap-12 px-6 lg:grid-cols-2">
            <div>
              <span className="text-sm font-semibold uppercase tracking-wide text-primary">
                {t("home.contact.eyebrow")}
              </span>
              <h2 className="mt-3 text-balance text-3xl font-semibold tracking-tight md:text-4xl">
                {t("home.contact.title")}
              </h2>
              <p className="mt-4 max-w-md text-pretty leading-relaxed text-muted-foreground">
                {t("home.contact.subtitle")}
              </p>
              <dl className="mt-8 space-y-4">
                {contactDetails.map((detail) => (
                  <div key={detail.label} className="flex items-start gap-3">
                    <Mail className="mt-0.5 h-4 w-4 flex-shrink-0 text-primary" aria-hidden="true" />
                    <div>
                      <dt className="text-sm font-medium text-muted-foreground">{detail.label}</dt>
                      <dd className="text-sm">{detail.value}</dd>
                    </div>
                  </div>
                ))}
              </dl>
            </div>
            <div className="surface-elevated rounded-2xl border border-border bg-card p-8">
              {contactSubmitted ? (
                <p className="text-center text-lg font-medium">{t("home.contact.successMessage")}</p>
              ) : (
                <form onSubmit={handleContactSubmit} className="space-y-5">
                  <div>
                    <label htmlFor="contact-name" className="mb-1.5 block text-sm font-medium">
                      {t("home.contact.nameLabel")}
                    </label>
                    <input
                      id="contact-name"
                      type="text"
                      required
                      value={contactForm.name}
                      onChange={(e) => setContactForm((prev) => ({ ...prev, name: e.target.value }))}
                      className="w-full rounded-lg border border-border bg-background px-4 py-2.5 text-foreground focus:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                    />
                  </div>
                  <div>
                    <label htmlFor="contact-email" className="mb-1.5 block text-sm font-medium">
                      {t("home.contact.emailLabel")}
                    </label>
                    <input
                      id="contact-email"
                      type="email"
                      required
                      value={contactForm.email}
                      onChange={(e) => setContactForm((prev) => ({ ...prev, email: e.target.value }))}
                      className="w-full rounded-lg border border-border bg-background px-4 py-2.5 text-foreground focus:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                    />
                  </div>
                  <div>
                    <label htmlFor="contact-message" className="mb-1.5 block text-sm font-medium">
                      {t("home.contact.messageLabel")}
                    </label>
                    <textarea
                      id="contact-message"
                      required
                      rows={4}
                      value={contactForm.message}
                      onChange={(e) => setContactForm((prev) => ({ ...prev, message: e.target.value }))}
                      className="w-full rounded-lg border border-border bg-background px-4 py-2.5 text-foreground focus:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full rounded-lg bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground shadow-glow transition hover:-translate-y-0.5 motion-reduce:transition-none"
                  >
                    {t("home.contact.submitLabel")}
                  </button>
                </form>
              )}
            </div>
          </div>
        </section>
      </Reveal>
    </main>
  );
}