"use client";

import { useEffect, useRef, useState } from "react";

type StatDef = {
  label: string;
  trend: string;
  endNumeric: number;
  format: (n: number) => string;
};

const STATS: StatDef[] = [
  {
    label: "Halal Certification Requests",
    trend: "↑ 12%",
    endNumeric: 10_000,
    format: (n) => `${Math.round(n / 1000)}K+`,
  },
  {
    label: "Halal Meat Exported",
    trend: "↑ 8%",
    endNumeric: 25.3,
    format: (n) => `${n.toFixed(1)}M`,
  },
  {
    label: "Individual Served",
    trend: "↑ 15%",
    endNumeric: 20_000,
    format: (n) => `${Math.round(n / 1000)}K+`,
  },
  {
    label: "Registered companies",
    trend: "↑ 23%",
    endNumeric: 100,
    format: (n) => `${Math.round(n)}+`,
  },
];

const DURATION_MS = 1800;

function easeOutCubic(t: number) {
  return 1 - (1 - t) ** 3;
}

export default function AnimatedDepartmentMetrics() {
  const rootRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(false);

  useEffect(() => {
    const el = rootRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setActive(true);
          obs.disconnect();
        }
      },
      { threshold: 0.12, rootMargin: "0px 0px -8% 0px" }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <div
      ref={rootRef}
      className="mt-10 grid grid-cols-2 gap-4 lg:grid-cols-4"
    >
      {STATS.map((s) => (
        <MetricCard
          key={s.label}
          label={s.label}
          trend={s.trend}
          endNumeric={s.endNumeric}
          format={s.format}
          active={active}
        />
      ))}
    </div>
  );
}

function MetricCard({
  label,
  trend,
  endNumeric,
  format,
  active,
}: {
  label: string;
  trend: string;
  endNumeric: number;
  format: (n: number) => string;
  active: boolean;
}) {
  const [display, setDisplay] = useState(() => format(0));

  useEffect(() => {
    if (!active) return;
    let raf = 0;
    const start = performance.now();

    const tick = (now: number) => {
      const t = Math.min((now - start) / DURATION_MS, 1);
      if (t >= 1) {
        setDisplay(format(endNumeric));
        return;
      }
      const eased = easeOutCubic(t);
      const value = endNumeric * eased;
      setDisplay(format(value));
      raf = requestAnimationFrame(tick);
    };

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [active, endNumeric, format]);

  return (
    <div className="rounded-2xl border border-white/80 bg-white/90 p-5 text-center shadow-sm ring-1 ring-teal-100/60 backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:ring-teal-200/80">
      <p className="text-2xl font-bold tabular-nums text-teal-800 md:text-3xl">
        {display}
      </p>
      <p className="mt-1 text-xs font-semibold text-emerald-600">{trend}</p>
      <p className="mt-2 text-xs font-medium text-gray-600 md:text-sm">{label}</p>
    </div>
  );
}
