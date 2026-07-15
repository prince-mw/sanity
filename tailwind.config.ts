import type { Config } from "tailwindcss";
import typography from "@tailwindcss/typography";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  safelist: [
    // Preserve classes used in CMS custom embed HTML content
    'flex', 'grid', 'block', 'inline-block', 'hidden',
    'flex-col', 'flex-row', 'flex-wrap', 'items-center', 'justify-center', 'justify-between',
    'gap-2', 'gap-4', 'gap-6', 'gap-8',
    'grid-cols-1', 'grid-cols-2', 'grid-cols-3', 'grid-cols-4',
    'text-sm', 'text-base', 'text-lg', 'text-xl', 'text-2xl', 'text-3xl', 'text-4xl',
    'font-medium', 'font-semibold', 'font-bold',
    'text-center', 'text-left', 'text-right',
    'text-white', 'text-gray-500', 'text-gray-600', 'text-gray-700', 'text-gray-900',
    'bg-white', 'bg-gray-50', 'bg-gray-100', 'bg-blue-50', 'bg-blue-600',
    'rounded', 'rounded-lg', 'rounded-xl', 'rounded-2xl', 'rounded-full',
    'shadow', 'shadow-md', 'shadow-lg', 'shadow-xl',
    'p-2', 'p-4', 'p-6', 'p-8', 'px-4', 'px-6', 'px-8', 'py-2', 'py-4', 'py-6', 'py-8',
    'm-2', 'm-4', 'mx-auto', 'mt-4', 'mt-6', 'mt-8', 'mb-4', 'mb-6', 'mb-8',
    'w-full', 'max-w-md', 'max-w-lg', 'max-w-xl', 'max-w-2xl', 'max-w-4xl', 'max-w-6xl',
    'space-y-2', 'space-y-4', 'space-y-6',
    'border', 'border-gray-200', 'border-gray-300',
    'overflow-hidden', 'relative', 'absolute',
    'object-cover', 'object-contain',
    { pattern: /^(md|lg):/ },
  ],

  theme: {
    extend: {
      colors: {
        // MW Blue palette
        "mw-blue": {
          50: "#eff6ff",
          100: "#dbeafe",
          200: "#bfdbfe",
          300: "#93c5fd",
          400: "#60a5fa",
          500: "#3b82f6",
          600: "#2563eb",
          700: "#1d4ed8",
          800: "#1e40af",
          900: "#1e3a8a",
          950: "#172554",
        },
        // MW Gray palette
        "mw-gray": {
          50: "#f9fafb",
          100: "#f3f4f6",
          200: "#e5e7eb",
          300: "#d1d5db",
          400: "#9ca3af",
          500: "#6b7280",
          600: "#4b5563",
          700: "#374151",
          800: "#1f2937",
          900: "#111827",
          950: "#030712",
        },
        // Utility colors
        "mw-success": "#10b981",
        "mw-warning": "#f59e0b",
        "mw-error": "#ef4444",
        "mw-info": "#3b82f6",
      },
      fontFamily: {
        sans: ["Poppins", "system-ui", "sans-serif"],
      },
      boxShadow: {
        "mw-sm": "0 1px 2px 0 rgb(0 0 0 / 0.05)",
        "mw-md": "0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)",
        "mw-lg": "0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)",
        "mw-xl": "0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)",
      },
      keyframes: {
        marquee: {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-50%)' },
        },
      },
      animation: {
        marquee: 'marquee 40s linear infinite',
      },
    },
  },
  plugins: [typography],
} satisfies Config;
