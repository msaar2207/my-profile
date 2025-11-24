"use client";

import React, {
  useState,
  useEffect,
  useCallback,
  useMemo,
  useRef,
} from "react";
import { AnimatePresence, motion, Transition, useReducedMotion } from "framer-motion";

type Slide = {
  id: string;
  label: string;
  title: string;
  subtitle?: string;
  bullets?: string[];
  note?: string; // your speaking note
  visual: {
    title: string;
    description: string;
    image?: string; // path under /public
  };
};

const slides: Slide[] = [
  {
    id: "intro",
    label: "01",
    title: "Aun Rizvi",
    subtitle: "Senior Full-Stack Engineer & AI Systems Architect",
    bullets: [
      "10+ years building production systems across AI, finance, HRMS & IoT",
      "Expert in AI orchestration, RAG, multi-model workflows & cloud architectures",
      "Hands-on with LangChain, LLM APIs, vector DBs, Full Stack Cloud Native and DevOps (AWS/GCP)",
    ],
    visual: {
      title: "Career Timeline",
      description:
        "Highlights across AI orchestration, cloud, and vertical products.",
      image: "/diagrams/intro-timeline.svg",
    },
  },

  // NEW: Smart DCC – umbrella for QuranAI + Ahln Box + LLM systems
  {
    id: "smart-dcc",
    label: "02",
    title: "Smart DCC – AI Systems & Greenfield Architecture",
    subtitle: "Next.js • FastAPI • FAISS • Microservices",
    bullets: [
      "Architected and deployed LLM-powered systems using Next.js, FastAPI, and FAISS for enterprise knowledge retrieval.",
      "Designed modular microservices with Node.js and MongoDB, integrated with real-time streaming via SSE.",
      "Led greenfield development of QuranAI and AHNL Box platforms with scalable, testable architecture.",
    ],
    visual: {
      title: "LLM Systems Map",
      description:
        "QuranAI, Ahln Box, and internal tools connected via shared AI and microservice layer.",
      image: "/diagrams/smart-dcc-architecture.svg",
    },
  },

  {
    id: "orchestration",
    label: "03",
    title: "AI Orchestration & Model Routing",
    subtitle: "LangChain • Multi-Model • Cost Optimization",
    bullets: [
      "Built QuranAI with routing between JAIS, LLaMA-3 and smaller models via LangChain.",
      "Implemented conditional routing, fallbacks and streaming (SSE) for live responses.",
      "Optimized prompts, caching & batching to reduce API cost while improving accuracy.",
    ],
    visual: {
      title: "Routing Flow",
      description:
        "Decision layer chooses DeepSeek/OpenAI models with fallbacks and SSE.",
      image: "/diagrams/orchestration-routing.svg",
    },
  },

  {
    id: "rag",
    label: "04",
    title: "RAG & Knowledge Systems",
    subtitle: "Vector Search • Embeddings • Document Versioning",
    bullets: [
      "Implemented RAG pipelines using MongoDB + Pinecone / vector DBs.",
      "Indexed long-form documents with embeddings for low-latency retrieval.",
      "Built versioned document stores with metadata & search for production apps.",
    ],
    visual: {
      title: "RAG Loop",
      description:
        "Document ingestion, embeddings, vector search, and answer synthesis.",
      image: "/diagrams/rag-loop.svg",
    },
  },
  {
    id: "hrms",
    label: "05",
    title: "HRMS SaaS Architecture with AI Agents",
    subtitle: "Multi-Tenant • UAE Labour Law • Automation",
    bullets: [
      "Architected HRMS SaaS aligned with UAE labour laws (payroll, EOS, WPS, docs).",
      "Multi-tenant architecture with PostgreSQL, stored procedures & strict access control.",
      "Integrated AI agents for onboarding, document generation & ID/license extraction.",
    ],
    note: "Use this as evidence of complex real-world domain + compliance + automation.",
    visual: {
      title: "HRMS Modules",
      description:
        "Tenant-aware services with AI agents for onboarding and documents.",
      image: "/diagrams/hrms-architecture.svg",
    },
  },

  {
    id: "iot",
    label: "06",
    title: "Ahln Smart Box – IoT & Orchestration",
    subtitle: "Sensors • Live Streaming • Delivery Workflows",
    bullets: [
      "Built end-to-end IoT ecosystem for secure smart delivery (Ahln Smart Box).",
      "Orchestrated camera streams, lock control, notifications & mobile apps.",
      "Designed event-driven flows that mirror robust orchestration for AI systems.",
    ],
    visual: {
      title: "IoT Control Loop",
      description:
        "Edge device streams + commands with cloud workflows and alerts.",
      image: "/diagrams/iot-loop.svg",
    },
  },

  {
    id: "cloud-devops",
    label: "07",
    title: "Cloud, DevOps & Reliability",
    subtitle: "AWS • GCP • Docker • Nginx • Monitoring",
    bullets: [
      "Deployed microservices & AI workloads on EC2 / GCP with Docker & Nginx.",
      "Set up logging, metrics & alerting for 24/7 uptime on business-critical systems.",
      "Designed fallback strategies and error handling for AI workflows & APIs.",
    ],
    visual: {
      title: "Deployment Topology",
      description:
        "Load balancer → containers → observability and CI/CD gates.",
      image: "/diagrams/cloud-topology.svg",
    },
  },

  // NEW: RevenueRoll – analytics & caching performance
  {
    id: "revenueroll",
    label: "08",
    title: "RevenueRoll – Analytics & Performance at Scale",
    subtitle: "React • Node.js • AWS • Metabase",
    bullets: [
      "Architected backend APIs with Node.js and Express.js for analytics consumed via Metabase dashboards.",
      "Refactored frontend architecture with React, achieving ~70% performance improvement.",
      "Implemented a 5-layer caching system that reduced page load time by ~50% for analytics-heavy views.",
    ],
    visual: {
      title: "Analytics Stack",
      description:
        "React clients, Node APIs, caching layers, and Metabase analytics on AWS.",
      image: "/diagrams/revenueroll.png",
    },
  },

  // NEW: Banking/fintech + RAAST
  {
    id: "banking-fintech",
    label: "09",
    title: "Enterprise Banking & Payments",
    subtitle: "Microservices • MongoDB Optimization • RAAST",
    bullets: [
      "Developed scalable backend microservices with Node.js for a bank with 1500+ branches.",
      "Optimized MongoDB queries and data access patterns, achieving up to 100% faster performance.",
      "Contributed to RAAST payment integration for HBL, supporting secure high-volume financial transactions.",
    ],
    visual: {
      title: "Banking Services",
      description:
        "Microservices and data flows supporting high-volume transaction workloads.",
      image: "/diagrams/raast.png",
    },
  },

  // NEW: Leadership & mentoring (Binaryvibes + 10Pearls + Dexterous patterns)
  {
    id: "leadership",
    label: "10",
    title: "Leadership, Mentoring & Product Delivery",
    subtitle: "Team Lead • Performance • Clean Architecture",
    bullets: [
      "Led frontend and full-stack teams delivering e-commerce and SaaS platforms with Angular, React, and Node.js.",
      "Improved page load and CMS performance by up to 40–60% through profiling and architecture refinements.",
      "Mentored junior engineers, introduced clean-code practices and automation, boosting team productivity.",
    ],
    visual: {
      title: "Team Impact",
      description:
        "From hands-on coding to mentoring and driving architecture decisions.",
    },
  },

  {
    id: "closing",
    label: "11",
    title: "Why I’m a Strong Fit",
    subtitle: "Practical • Production-Focused • Cost-Aware",
    bullets: [
      "Already solved problems you’re facing: model orchestration, RAG, data recency & costs.",
      "Hands-on implementer who can design, build & optimize AI workflows end-to-end.",
      "Ready to plug into your stack and start improving your AI systems from day one.",
    ],
    note: "End with confidence and invite deeper technical discussion / live demos.",
    visual: {
      title: "Readiness Checklist",
      description:
        "Map capabilities to orchestration, RAG, cost control, and reliability.",
      image: "/diagrams/closing-checklist.svg",
    },
  },
];
const createSlideVariants = (reduceMotion: boolean) => ({
  enter: (direction: number) =>
    reduceMotion
      ? {
          x: 0,
          opacity: 1,
          scale: 1,
        }
      : {
          x: direction > 0 ? 80 : -80,
          opacity: 0,
          scale: 0.98,
        },
  center: {
    x: 0,
    opacity: 1,
    scale: 1,
  },
  exit: (direction: number) =>
    reduceMotion
      ? {
          x: 0,
          opacity: 1,
          scale: 1,
        }
      : {
          x: direction > 0 ? -80 : 80,
          opacity: 0,
          scale: 0.98,
        },
});

export const SlideDeck: React.FC = () => {
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [zoom, setZoom] = useState(1);
  const prefersReducedMotion = useReducedMotion();
  const slideVariants = useMemo(
    () => createSlideVariants(!!prefersReducedMotion),
    [prefersReducedMotion]
  );
  const slideTransition: Transition = prefersReducedMotion
    ? { duration: 0.01, ease: "easeInOut" }
    : { duration: 0.4, ease: "easeInOut" };
  const isAnimatingRef = useRef(false);
  const modalOverlayMotion = prefersReducedMotion
    ? {
        initial: { opacity: 1 },
        animate: { opacity: 1 },
        exit: { opacity: 1 },
      }
    : {
        initial: { opacity: 0 },
        animate: { opacity: 1 },
        exit: { opacity: 0 },
      };
  const modalContentMotion = prefersReducedMotion
    ? {
        initial: { scale: 1, opacity: 1 },
        animate: { scale: 1, opacity: 1 },
        exit: { scale: 1, opacity: 1 },
      }
    : {
        initial: { scale: 0.97, opacity: 1 },
        animate: { scale: 1, opacity: 1 },
        exit: { scale: 0.97, opacity: 1 },
      };
  const modalTransition: Transition = prefersReducedMotion
    ? { duration: 0.01 }
    : { duration: 0.2, ease: "easeOut" };

  const currentSlide = slides[index];
  const isIntro = currentSlide.id === "intro";

  const goTo = useCallback(
    (newIndex: number) => {
      if (newIndex < 0 || newIndex >= slides.length) return;
      if (!prefersReducedMotion && isAnimatingRef.current) return;
      setDirection(newIndex > index ? 1 : -1);
      setIndex(newIndex);
    },
    [index, prefersReducedMotion]
  );

  const handleKey = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "ArrowRight" || e.key === " ") {
        goTo(index + 1);
      } else if (e.key === "ArrowLeft") {
        goTo(index - 1);
      } else if (e.key.toLowerCase() === "o") {
        setZoom(1);
        setIsModalOpen(true);
      } else if (isModalOpen && e.key.toLowerCase() === "w") {
        setZoom((z) => Math.min(z + 0.25, 3));
      } else if (isModalOpen && e.key.toLowerCase() === "s") {
        setZoom((z) => Math.max(z - 0.25, 0.5));
      }
    },
    [goTo, index, isModalOpen]
  );

  useEffect(() => {
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [handleKey]);

  const openModal = useCallback(() => {
    setZoom(1);
    setIsModalOpen(true);
  }, []);

  const closeModal = useCallback(() => {
    setIsModalOpen(false);
  }, []);

  const zoomIn = useCallback(() => {
    setZoom((z) => Math.min(z + 0.25, 3));
  }, []);

  const zoomOut = useCallback(() => {
    setZoom((z) => Math.max(z - 0.25, 0.5));
  }, []);

  const resetZoom = useCallback(() => {
    setZoom(1);
  }, []);

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-slate-50 flex flex-col items-center justify-center px-4 py-6">
      {/* Mobile fixed arrows */}
      <div className="sm:hidden fixed top-4 left-4 z-50">
        <button
          onClick={(e) => {
            e.stopPropagation();
            goTo(index - 1);
          }}
          disabled={index === 0}
          className={`px-3 py-2 rounded-full border backdrop-blur bg-slate-900/70 ${
            index === 0
              ? "border-slate-700 text-slate-600 cursor-not-allowed"
              : "border-slate-600 text-slate-200 hover:border-purple-400 hover:text-purple-200"
          }`}
          aria-label="Previous slide"
        >
          ←
        </button>
      </div>
      <div className="sm:hidden fixed top-4 right-4 z-50">
        <button
          onClick={(e) => {
            e.stopPropagation();
            goTo(index + 1);
          }}
          disabled={index === slides.length - 1}
          className={`px-3 py-2 rounded-full border backdrop-blur bg-slate-900/70 ${
            index === slides.length - 1
              ? "border-slate-700 text-slate-600 cursor-not-allowed"
              : "border-purple-500 text-purple-100 hover:bg-purple-500/10"
          }`}
          aria-label="Next slide"
        >
          →
        </button>
      </div>

      {/* Top bar */}
      <div className="w-full max-w-6xl flex items-center justify-between mb-4">
        <div className="text-xs sm:text-sm font-mono tracking-widest text-slate-400 uppercase">
          AI Systems Implementation — Portfolio Deck
        </div>
        <div className="text-xs sm:text-sm text-slate-400">
          Slide {index + 1} / {slides.length}
        </div>
      </div>

      {/* Slide area */}
      <div
        className="w-full max-w-6xl h-[70vh] sm:h-[72vh] bg-slate-900/70 border border-slate-700/70 rounded-3xl shadow-2xl shadow-purple-900/40 backdrop-blur-xl overflow-hidden flex"
        onClick={() => goTo(index + 1)}
      >
        <div className="hidden md:flex flex-col w-40 border-r border-slate-800/70 bg-slate-950/60">
          <div className="p-4 text-xs font-semibold tracking-widest text-slate-400 uppercase">
            Slides
          </div>
          <div className="flex-1 overflow-y-auto space-y-1 px-2 pb-4">
            {slides.map((s, i) => (
              <button
                key={s.id}
                onClick={(e) => {
                  e.stopPropagation();
                  goTo(i);
                }}
                className={`w-full text-left px-3 py-2 rounded-xl text-xs transition ${
                  i === index
                    ? "bg-purple-600/80 text-white"
                    : "text-slate-300 hover:bg-slate-800/80"
                }`}
              >
                <div className="text-[10px] font-mono text-slate-300/70">
                  {s.label}
                </div>
                <div className="truncate">{s.title}</div>
              </button>
            ))}
          </div>
        </div>

        <div className="flex-1 flex flex-col">
          <AnimatePresence custom={direction} mode="wait">
            <motion.div
              key={currentSlide.id}
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={slideTransition}
              onAnimationStart={() => {
                if (!prefersReducedMotion) isAnimatingRef.current = true;
              }}
              onAnimationComplete={() => {
                isAnimatingRef.current = false;
              }}
              className="flex-1 p-5 sm:p-8 lg:p-10 flex flex-col"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-purple-500/20 text-purple-200 text-xs font-semibold">
                    {currentSlide.label}
                  </span>
                  <div>
                    <h1 className="text-xl sm:text-2xl lg:text-3xl font-semibold tracking-tight">
                      {currentSlide.title}
                    </h1>
                    {currentSlide.subtitle && (
                      <p className="text-xs sm:text-sm text-slate-300 mt-1">
                        {currentSlide.subtitle}
                      </p>
                    )}
                    {isIntro && (
                      <div className="mt-2 inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-purple-600 via-indigo-500 to-cyan-500 px-3 py-1 text-[11px] font-semibold text-white shadow-lg shadow-purple-900/40">
                        <span className="inline-flex h-2 w-2 rounded-full bg-white" />
                        Hire-ready: Senior Full-Stack & AI Systems
                      </div>
                    )}
                  </div>
                  {isIntro && (
                    <div className="ml-4 h-20 w-20 sm:h-24 sm:w-24 rounded-2xl overflow-hidden border border-slate-700 shadow-lg shadow-purple-900/30 ring-2 ring-purple-500/30">
                      <img
                        src="/profile.jpg"
                        alt="Aun Rizvi portrait"
                        className="h-full w-full object-cover"
                      />
                    </div>
                  )}
                </div>
              </div>

              <div className="flex-1 flex flex-col lg:flex-row gap-6">
                <div className="flex-1">
                  <ul className="space-y-3 sm:space-y-4 text-sm sm:text-base">
                    {currentSlide.bullets?.map((b, idx) => (
                      <li key={idx} className="flex gap-3">
                        <span className="mt-1 h-1.5 w-1.5 rounded-full bg-purple-400/80" />
                        <span className="text-slate-100">{b}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Right side: Visual pane */}
                <div
                  className="w-full lg:w-80 bg-slate-900/70 border border-slate-800/80 rounded-3xl p-4 flex flex-col justify-between"
                  onClick={(e) => e.stopPropagation()}
                >
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="text-[11px] font-semibold text-slate-400 uppercase tracking-widest">
                          Visual Focus
                        </div>
                        <p className="text-xs text-slate-300">
                          {currentSlide.visual.title}
                        </p>
                      </div>
                      <button
                        onClick={openModal}
                        className="text-[11px] px-2 py-1 rounded-full border border-purple-500/70 text-purple-100 hover:bg-purple-500/10"
                      >
                        Open
                      </button>
                    </div>
                    <p className="text-[11px] text-slate-400">
                      {currentSlide.visual.description}
                    </p>
                    <div className="relative group">
                      <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-purple-500/10 via-slate-900/40 to-slate-900/60 opacity-0 group-hover:opacity-100 transition" />
                      {currentSlide.visual.image && (
                        <img
                          src={currentSlide.visual.image}
                          alt={`${currentSlide.visual.title} diagram`}
                          className="w-full rounded-2xl border border-slate-800/80 bg-slate-950/60"
                        />
                      )}
                      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition">
                        <span className="text-[11px] px-3 py-1 rounded-full bg-slate-900/90 border border-purple-500/70 text-purple-100 shadow-lg">
                          Click to view full screen
                        </span>
                      </div>
                      <button
                        className="absolute inset-0"
                        aria-label="Open diagram"
                        onClick={openModal}
                      />
                    </div>
                  </div>

                  {currentSlide.note && (
                    <div className="mt-4 pt-3 border-t border-slate-800/80">
                      <div className="text-[10px] font-semibold text-slate-400 uppercase tracking-widest mb-1">
                        Speaker Note
                      </div>
                      <p className="text-[11px] text-slate-300">
                        {currentSlide.note}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Bottom nav */}
          <div className="hidden sm:flex items-center justify-between px-5 sm:px-8 pb-4 pt-2 border-t border-slate-800/70 text-[11px] text-slate-400">
            <button
              onClick={(e) => {
                e.stopPropagation();
                goTo(index - 1);
              }}
              disabled={index === 0}
              className={`px-3 py-1 rounded-full border ${
                index === 0
                  ? "border-slate-700 text-slate-600 cursor-not-allowed"
                  : "border-slate-600 hover:border-purple-400 hover:text-purple-200"
              }`}
            >
              ← Previous
            </button>

            <div className="flex gap-1">
              {slides.map((s, i) => (
                <button
                  key={s.id}
                  onClick={(e) => {
                    e.stopPropagation();
                    goTo(i);
                  }}
                  className={`h-1.5 w-4 rounded-full transition ${
                    i === index
                      ? "bg-purple-400"
                      : "bg-slate-600 hover:bg-purple-500/70"
                  }`}
                />
              ))}
            </div>

            <button
              onClick={(e) => {
                e.stopPropagation();
                goTo(index + 1);
              }}
              disabled={index === slides.length - 1}
              className={`px-3 py-1 rounded-full border ${
                index === slides.length - 1
                  ? "border-slate-700 text-slate-600 cursor-not-allowed"
                  : "border-purple-500 text-purple-100 hover:bg-purple-500/10"
              }`}
            >
              Next →
            </button>
          </div>
        </div>
      </div>

      {/* Full-screen modal for diagrams */}
      <AnimatePresence>
        {isModalOpen && (
          <motion.div
            className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center px-4 py-6"
            initial={modalOverlayMotion.initial}
            animate={modalOverlayMotion.animate}
            exit={modalOverlayMotion.exit}
            transition={modalTransition}
            onClick={closeModal}
          >
            <motion.div
              className="w-full max-w-5xl bg-slate-900/90 border border-slate-700/70 rounded-3xl shadow-2xl overflow-hidden"
              initial={modalContentMotion.initial}
              animate={modalContentMotion.animate}
              exit={modalContentMotion.exit}
              transition={modalTransition}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between px-5 py-3 border-b border-slate-800/70 bg-slate-900/80">
                <div>
                  <p className="text-sm font-semibold text-slate-100">
                    {currentSlide.visual.title}
                  </p>
                  <p className="text-[11px] text-slate-400">
                    {currentSlide.visual.description}
                  </p>
                </div>
                <div className="flex items-center gap-2 text-[11px]">
                  <button
                    onClick={zoomOut}
                    className="px-2 py-1 rounded-full border border-slate-700 text-slate-200 hover:border-purple-400"
                  >
                    −
                  </button>
                  <button
                    onClick={resetZoom}
                    className="px-2 py-1 rounded-full border border-slate-700 text-slate-200 hover:border-purple-400"
                  >
                    100%
                  </button>
                  <button
                    onClick={zoomIn}
                    className="px-2 py-1 rounded-full border border-slate-700 text-slate-200 hover:border-purple-400"
                  >
                    +
                  </button>
                  <button
                    onClick={closeModal}
                    className="px-2 py-1 rounded-full border border-purple-500/80 text-purple-100 hover:bg-purple-500/10"
                  >
                    Close
                  </button>
                </div>
              </div>
              <div className="bg-slate-950/50">
                <div className="max-h-[70vh] overflow-auto flex items-center justify-center p-6">
                  <img
                    src={currentSlide.visual.image}
                    alt={`${currentSlide.visual.title} diagram`}
                    className="max-w-full transition-transform"
                    style={{
                      transform: `scale(${zoom})`,
                      transformOrigin: "center",
                    }}
                  />
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
