/**
 * Theme Configuration for Oromia Majlis
 * 
 * This file contains the design system tokens and theme configuration
 * used throughout the application for consistent styling.
 */

export const theme = {
  colors: {
    primary: {
      blue: {
        DEFAULT: "#1e3a8a", // blue-900
        dark: "#1e40af", // blue-800
        light: "#3b82f6", // blue-500
      },
      yellow: {
        DEFAULT: "#eab308", // yellow-500
        light: "#facc15", // yellow-400
      },
      red: {
        DEFAULT: "#dc2626", // red-600
        dark: "#b91c1c", // red-700
        light: "#ef4444", // red-500
      },
    },
    gray: {
      50: "#f9fafb",
      100: "#f3f4f6",
      200: "#e5e7eb",
      600: "#4b5563",
      700: "#374151",
      800: "#1f2937",
      900: "#111827",
    },
  },
  spacing: {
    section: {
      py: "py-16", // 4rem vertical padding
      px: "px-4", // 1rem horizontal padding
    },
  },
  typography: {
    heading: {
      h1: "text-4xl md:text-5xl lg:text-6xl font-bold",
      h2: "text-3xl md:text-4xl font-bold",
      h3: "text-2xl md:text-3xl font-bold",
      h4: "text-xl md:text-2xl font-semibold",
    },
    body: {
      large: "text-lg",
      medium: "text-base",
      small: "text-sm",
    },
  },
  breakpoints: {
    sm: "640px",
    md: "768px",
    lg: "1024px",
    xl: "1280px",
  },
} as const;

export type Theme = typeof theme;

