"use client";

import { useState, useEffect, useRef } from "react";

const statistics = [
  {
    value: "50k+",
    label: "Mosques & Islamic Centers Supported",
  },
  {
    value: "30M+",
    label: "Muslims Served Across Oromia Region",
  },
  {
    value: "100+",
    label: "Religious Education Programs",
  },
  {
    value: "25+",
    label: "Years of Service to the Community",
  },
];

// Parse value string to number (handles K, M, +)
function parseValue(value: string): number {
  const cleanValue = value.replace(/[^0-9.KMkm]/g, "");
  const num = parseFloat(cleanValue);
  
  if (cleanValue.toLowerCase().includes("m")) {
    return num * 1000000;
  } else if (cleanValue.toLowerCase().includes("k")) {
    return num * 1000;
  }
  return num;
}

// Format number back to original format
function formatValue(value: number, original: string): string {
  const hasPlus = original.includes("+");
  const hasK = original.toLowerCase().includes("k");
  const hasM = original.toLowerCase().includes("m");
  
  if (hasM && value >= 1000000) {
    return `${(value / 1000000).toFixed(0)}M${hasPlus ? "+" : ""}`;
  } else if (hasK && value >= 1000) {
    return `${(value / 1000).toFixed(0)}K${hasPlus ? "+" : ""}`;
  } else {
    return `${Math.floor(value)}${hasPlus ? "+" : ""}`;
  }
}

// Counter component for individual statistic
function Counter({ targetValue, originalValue, label }: { targetValue: number; originalValue: string; label: string }) {
  const [count, setCount] = useState(0);
  const [hasAnimated, setHasAnimated] = useState(false);
  const elementRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (hasAnimated) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasAnimated) {
            setHasAnimated(true);
            
            const duration = 2000; // 2 seconds
            const startTime = Date.now();
            const startValue = 0;
            const endValue = targetValue;

            const animate = () => {
              const now = Date.now();
              const elapsed = now - startTime;
              const progress = Math.min(elapsed / duration, 1);
              
              // Easing function (ease-out)
              const easeOut = 1 - Math.pow(1 - progress, 3);
              const currentValue = startValue + (endValue - startValue) * easeOut;
              
              setCount(currentValue);

              if (progress < 1) {
                requestAnimationFrame(animate);
              } else {
                setCount(endValue);
              }
            };

            requestAnimationFrame(animate);
          }
        });
      },
      { threshold: 0.3 }
    );

    if (elementRef.current) {
      observer.observe(elementRef.current);
    }

    return () => {
      if (elementRef.current) {
        observer.unobserve(elementRef.current);
      }
    };
  }, [targetValue, hasAnimated]);

  return (
    <div
      ref={elementRef}
      className="text-center p-6 bg-white/5 rounded-lg backdrop-blur-sm hover:bg-white/10 transition-colors"
    >
      <div className="text-5xl md:text-6xl font-bold text-yellow-400 mb-4">
        {formatValue(count, originalValue)}
      </div>
      <p className="text-lg text-white/90">{label}</p>
    </div>
  );
}

export default function StatisticsSection() {
  return (
    <section className="py-16 bg-blue-900 text-white relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-[linear-gradient(to_right,transparent_0%,rgba(255,255,255,0.1)_50%,transparent_100%)]"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {statistics.map((stat, index) => (
            <Counter
              key={index}
              targetValue={parseValue(stat.value)}
              originalValue={stat.value}
              label={stat.label}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

