import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub, faLinkedin, faXTwitter } from "@fortawesome/free-brands-svg-icons";
import Link from "next/link";
import {
  faArrowRight,
  faBolt,
  faCode,
  faGlobe,
  faLink,
  faRss,
  faServer,
  faShieldHalved,
} from "@fortawesome/free-solid-svg-icons";
import { LINE_SEED } from "@/lib/fonts";
import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { Log } from "@/components/LogClient";

export default function Home() {
  const highlights = [
    {
      icon: faBolt,
      title: "Reliable delivery",
      description: "Frontend to infrastructure, with an eye on performance budgets and clean DX.",
    },
    {
      icon: faShieldHalved,
      title: "Quality first",
      description: "Type-safe code, automated linting, and thoughtful monitoring baked into every release.",
    },
    {
      icon: faGlobe,
      title: "Global reach",
      description: "Experience shipping products for diverse audiences, from content-heavy sites to SaaS.",
    },
  ];

  const capabilities = [
    {
      icon: faCode,
      title: "Web experiences",
      body: "Next.js, React, and modern CSS to craft purposeful interfaces that feel fast and polished.",
    },
    {
      icon: faServer,
      title: "Edge & backend",
      body: "API design, serverless patterns, and observability to keep features reliable after launch.",
    },
    {
      icon: faLink,
      title: "Integrations",
      body: "From payment gateways to CMS migrations, I connect the tooling that keeps teams moving.",
    },
  ];

  const socialLinks = [
    { title: "Blog", href: "/blog", icon: faRss },
    { title: "Links", href: "/links", icon: faLink },
    { title: "GitHub", href: "https://github.com/hondaya14", icon: faGithub as IconProp },
    { title: "X", href: "https://x.com/hondaya14", icon: faXTwitter as IconProp },
    {
      title: "LinkedIn",
      href: "https://www.linkedin.com/in/yasuhisa-honda-5a5470274/",
      icon: faLinkedin as IconProp,
    },
  ];

  return (
    <main className="min-h-screen bg-gradient-to-b from-[#0b0c10] via-[#0c0d12] to-[#0b0c10] text-foreground">
      <div className="mx-auto flex max-w-6xl flex-col gap-16 px-6 py-16 md:px-10 md:py-24">
        <section className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/5 px-6 py-10 shadow-2xl shadow-indigo-900/30 backdrop-blur md:px-12">
          <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/15 via-purple-500/10 to-transparent" />
          <div className="relative flex flex-col gap-8 md:flex-row md:items-center md:justify-between">
            <div className="space-y-6">
              <span className="inline-flex items-center rounded-full border border-white/10 bg-white/10 px-4 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-indigo-100">
                product-minded engineer
              </span>
              <div className="space-y-4">
                <h1
                  className={`text-4xl leading-tight text-white sm:text-5xl md:text-6xl ${LINE_SEED.className}`}
                >
                  Build and ship digital products without compromising quality.
                </h1>
                <p className="max-w-2xl text-lg text-slate-200">
                  I help teams deliver reliable, user-focused experiences—from design systems to edge-ready backends—so releases feel polished, predictable, and measurable.
                </p>
              </div>
              <div className="flex flex-wrap items-center gap-4">
                <Link
                  href="/blog"
                  className="group inline-flex items-center gap-2 rounded-full bg-indigo-500 px-5 py-3 text-base font-semibold text-white transition hover:-translate-y-0.5 hover:bg-indigo-400"
                >
                  Read the build log
                  <FontAwesomeIcon
                    icon={faArrowRight}
                    className="w-4 transition duration-150 group-hover:translate-x-1"
                  />
                </Link>
                <Link
                  href="/links"
                  className="inline-flex items-center gap-2 rounded-full border border-white/20 px-5 py-3 text-base font-semibold text-white transition hover:-translate-y-0.5 hover:border-indigo-200/50 hover:text-indigo-100"
                >
                  Explore projects
                </Link>
              </div>
              <div className="flex flex-wrap items-center gap-6">
                {socialLinks.map((link) => (
                  <Link
                    key={link.title}
                    title={link.title}
                    href={link.href}
                    target={link.href.startsWith("http") ? "_blank" : undefined}
                    className="group inline-flex items-center gap-2 text-slate-200 transition hover:text-white"
                  >
                    <span className="flex h-10 w-10 items-center justify-center rounded-2xl border border-white/10 bg-white/5 transition group-hover:-translate-y-0.5 group-hover:border-indigo-200/50">
                      <FontAwesomeIcon icon={link.icon} className="w-5" />
                    </span>
                    <span className="text-sm font-medium">{link.title}</span>
                  </Link>
                ))}
              </div>
            </div>
            <div className="grid w-full max-w-sm grid-cols-1 gap-4 rounded-2xl border border-white/10 bg-black/30 p-5 text-sm text-slate-200 shadow-inner shadow-indigo-900/40">
              <div className="flex items-center justify-between rounded-xl border border-white/5 bg-white/5 px-4 py-3">
                <span className="text-xs uppercase tracking-[0.18em] text-slate-300">Focus</span>
                <span className="rounded-full bg-indigo-500/20 px-3 py-1 text-xs font-semibold text-indigo-100">DX & UX</span>
              </div>
              <div className="space-y-3">
                {highlights.map((item) => (
                  <div key={item.title} className="flex gap-3 rounded-xl border border-white/5 bg-white/5 p-3">
                    <span className="mt-1 flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-500/10 text-indigo-200">
                      <FontAwesomeIcon icon={item.icon} className="w-4" />
                    </span>
                    <div>
                      <p className="text-base font-semibold text-white">{item.title}</p>
                      <p className="text-sm text-slate-300">{item.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="grid gap-6 md:grid-cols-3">
          {capabilities.map((capability) => (
            <div
              key={capability.title}
              className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 p-6 shadow-lg transition hover:-translate-y-1 hover:border-indigo-200/50"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/5 via-purple-500/0 to-transparent" />
              <div className="relative flex h-12 w-12 items-center justify-center rounded-xl bg-indigo-500/15 text-indigo-200">
                <FontAwesomeIcon icon={capability.icon} className="w-5" />
              </div>
              <h3 className="relative mt-4 text-xl font-semibold text-white">{capability.title}</h3>
              <p className="relative mt-2 text-sm leading-relaxed text-slate-300">{capability.body}</p>
            </div>
          ))}
        </section>

        <section className="grid gap-6 md:grid-cols-[2fr,1fr]">
          <div className="rounded-2xl border border-white/10 bg-white/5 p-6 shadow-inner shadow-indigo-900/30">
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="text-sm uppercase tracking-[0.18em] text-indigo-100">Signal</p>
                <h2 className={`text-2xl font-semibold text-white ${LINE_SEED.className}`}>Build log</h2>
                <p className="mt-2 text-sm text-slate-300">
                  Streaming notes from experiments, releases, and infrastructure tweaks.
                </p>
              </div>
              <Link
                href="/blog"
                className="inline-flex items-center gap-2 rounded-full border border-white/20 px-4 py-2 text-sm font-semibold text-white transition hover:border-indigo-200/50"
              >
                Browse all posts
                <FontAwesomeIcon icon={faArrowRight} className="w-3" />
              </Link>
            </div>
            <div className="mt-6 rounded-xl border border-white/10 bg-black/30 p-4">
              <Log />
            </div>
          </div>
          <div className="rounded-2xl border border-white/10 bg-gradient-to-b from-white/10 via-white/5 to-white/0 p-6 shadow-lg">
            <p className="text-sm uppercase tracking-[0.18em] text-indigo-100">Now shipping</p>
            <h3 className={`mt-2 text-2xl font-semibold text-white ${LINE_SEED.className}`}>
              Systems that scale with users
            </h3>
            <ul className="mt-4 space-y-3 text-sm text-slate-200">
              <li className="flex items-start gap-3">
                <span className="mt-1 h-2 w-2 rounded-full bg-emerald-400" />
                <span>Designing resilient content pipelines and monitoring around microCMS.</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="mt-1 h-2 w-2 rounded-full bg-indigo-400" />
                <span>Refining developer experience with typed APIs, CI/CD safety nets, and clear release rituals.</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="mt-1 h-2 w-2 rounded-full bg-fuchsia-400" />
                <span>Championing accessible interfaces with crisp typography and purposeful motion.</span>
              </li>
            </ul>
            <div className="mt-6 rounded-xl border border-white/10 bg-white/5 p-4 text-xs text-slate-300">
              Available for collaborations focused on experience quality, design systems, and platform stability.
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
