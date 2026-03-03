'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { useState, useEffect } from 'react'
import Image from 'next/image'

// Custom SVG icons
const CheckIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
  </svg>
)

const GlobeIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 013 12c0-1.605.42-3.113 1.157-4.418" />
  </svg>
)

const MapPinIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
  </svg>
)

const PhotoIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
  </svg>
)

const SparklesIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456zM16.894 20.567L16.5 21.75l-.394-1.183a2.25 2.25 0 00-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 001.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 001.423 1.423l1.183.394-1.183.394a2.25 2.25 0 00-1.423 1.423z" />
  </svg>
)

const MapIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" d="M9 6.75V15m6-6v8.25m.503 3.498l4.875-2.437c.381-.19.622-.58.622-1.006V4.82c0-.836-.88-1.38-1.628-1.006l-3.869 1.934c-.317.159-.69.159-1.006 0L9.503 3.252a1.125 1.125 0 00-1.006 0L3.622 5.689C3.24 5.88 3 6.27 3 6.695V19.18c0 .836.88 1.38 1.628 1.006l3.869-1.934c.317-.159.69-.159 1.006 0l4.994 2.497c.317.158.69.158 1.006 0z" />
  </svg>
)

const BuildingOfficeIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 21h16.5M4.5 3h15M5.25 3v18m13.5-18v18M9 6.75h1.5m-1.5 3h1.5m-1.5 3h1.5m3-6H15m-1.5 3H15m-1.5 3H15M9 21v-3.375c0-.621.504-1.125 1.125-1.125h3.75c.621 0 1.125.504 1.125 1.125V21" />
  </svg>
)

const CreditCardIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h3m-3.75 3h15a2.25 2.25 0 002.25-2.25V6.75A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25v10.5A2.25 2.25 0 004.5 19.5z" />
  </svg>
)

const BoltIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
  </svg>
)

const ChartBarIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z" />
  </svg>
)

// Integration partners for Don't Replace. Integrate. section
const integrations = [
  { name: 'VIOOH', category: 'SSP', logo: '/assets/images/integrations/viooh.svg' },
  { name: 'DV360', category: 'SSP', logo: '/assets/images/integrations/dv360.svg' },
  { name: 'Magnite', category: 'SSP', logo: '/assets/images/integrations/magnite.svg' },
  { name: 'Google Ad Manager 360', category: 'SSP', logo: '/assets/images/integrations/google-ad-manager-360.svg' },
  { name: 'The Trade Desk', category: 'DSP', logo: '/assets/images/integrations/the-trade-desk.svg' },
  { name: 'Cassie', category: 'DSP', logo: '/assets/images/integrations/cassie.svg' },
  { name: 'MAX', category: 'DSP', logo: '/assets/images/integrations/max.svg' },
  { name: 'StackAdapt', category: 'DSP', logo: '/assets/images/integrations/stackadapt.svg' },
  { name: 'Amobee', category: 'DSP', logo: '/assets/images/integrations/amobee.svg' },
  { name: 'AppNexus', category: 'DSP', logo: '/assets/images/integrations/appnexus.svg' },
  { name: 'MediaMath', category: 'DSP', logo: '/assets/images/integrations/mediamath.svg' },
  { name: 'Verizon Media', category: 'DSP', logo: '/assets/images/integrations/verizon.svg' },
  { name: 'Mediasmart', category: 'DSP', logo: '/assets/images/integrations/mediasmart.svg' },
]

export default function MWMarketPage() {
  const [selectedContinent, setSelectedContinent] = useState<string | null>(null)
  const [hoveredLocation, setHoveredLocation] = useState<string | null>(null)
  const [currency, setCurrency] = useState('USD')
  const [livePurchases, setLivePurchases] = useState<Array<{location: string, price: number, time: string, billboard: string}>>([])

  const currencies = [
    { code: 'USD', symbol: '$', rate: 1, name: 'US Dollar' },
    { code: 'EUR', symbol: '€', rate: 0.92, name: 'Euro' },
    { code: 'GBP', symbol: '£', rate: 0.79, name: 'British Pound' },
    { code: 'JPY', symbol: '¥', rate: 149.50, name: 'Japanese Yen' },
    { code: 'CNY', symbol: '¥', rate: 7.24, name: 'Chinese Yuan' },
    { code: 'AUD', symbol: 'A$', rate: 1.52, name: 'Australian Dollar' },
    { code: 'CAD', symbol: 'C$', rate: 1.36, name: 'Canadian Dollar' },
    { code: 'CHF', symbol: 'Fr', rate: 0.88, name: 'Swiss Franc' },
    { code: 'INR', symbol: '₹', rate: 83.12, name: 'Indian Rupee' },
    { code: 'SGD', symbol: 'S$', rate: 1.34, name: 'Singapore Dollar' },
    { code: 'HKD', symbol: 'HK$', rate: 7.83, name: 'Hong Kong Dollar' },
    { code: 'KRW', symbol: '₩', rate: 1310.50, name: 'South Korean Won' },
    { code: 'SEK', symbol: 'kr', rate: 10.35, name: 'Swedish Krona' },
    { code: 'NOK', symbol: 'kr', rate: 10.72, name: 'Norwegian Krone' },
    { code: 'DKK', symbol: 'kr', rate: 6.87, name: 'Danish Krone' },
    { code: 'NZD', symbol: 'NZ$', rate: 1.64, name: 'New Zealand Dollar' },
    { code: 'MXN', symbol: 'Mex$', rate: 17.15, name: 'Mexican Peso' },
    { code: 'BRL', symbol: 'R$', rate: 4.92, name: 'Brazilian Real' },
    { code: 'ZAR', symbol: 'R', rate: 18.45, name: 'South African Rand' },
    { code: 'AED', symbol: 'د.إ', rate: 3.67, name: 'UAE Dirham' },
    { code: 'SAR', symbol: 'ر.س', rate: 3.75, name: 'Saudi Riyal' },
    { code: 'THB', symbol: '฿', rate: 34.82, name: 'Thai Baht' },
    { code: 'MYR', symbol: 'RM', rate: 4.47, name: 'Malaysian Ringgit' },
    { code: 'IDR', symbol: 'Rp', rate: 15650, name: 'Indonesian Rupiah' },
    { code: 'PHP', symbol: '₱', rate: 55.85, name: 'Philippine Peso' },
    { code: 'PLN', symbol: 'zł', rate: 3.98, name: 'Polish Zloty' },
    { code: 'CZK', symbol: 'Kč', rate: 22.58, name: 'Czech Koruna' },
    { code: 'HUF', symbol: 'Ft', rate: 354.20, name: 'Hungarian Forint' },
    { code: 'ILS', symbol: '₪', rate: 3.65, name: 'Israeli Shekel' },
    { code: 'TRY', symbol: '₺', rate: 28.95, name: 'Turkish Lira' }
  ]

  const continents = [
    { 
      id: 'north-america', 
      name: 'North America', 
      color: 'from-blue-500 to-cyan-500',
      billboards: 78000,
      avgPrice: 8500,
      topCities: ['New York', 'Los Angeles', 'Toronto', 'Mexico City']
    },
    { 
      id: 'south-america', 
      name: 'South America', 
      color: 'from-green-500 to-emerald-500',
      billboards: 12000,
      avgPrice: 3200,
      topCities: ['São Paulo', 'Buenos Aires', 'Rio de Janeiro', 'Lima']
    },
    { 
      id: 'europe', 
      name: 'Europe', 
      color: 'from-purple-500 to-pink-500',
      billboards: 92000,
      avgPrice: 7800,
      topCities: ['London', 'Paris', 'Berlin', 'Madrid']
    },
    { 
      id: 'asia', 
      name: 'Asia', 
      color: 'from-orange-500 to-red-500',
      billboards: 85000,
      avgPrice: 6900,
      topCities: ['Tokyo', 'Shanghai', 'Singapore', 'Dubai']
    },
    { 
      id: 'africa', 
      name: 'Africa', 
      color: 'from-yellow-500 to-orange-500',
      billboards: 8500,
      avgPrice: 2100,
      topCities: ['Lagos', 'Cairo', 'Johannesburg', 'Nairobi']
    },
    { 
      id: 'oceania', 
      name: 'Oceania', 
      color: 'from-teal-500 to-blue-500',
      billboards: 6500,
      avgPrice: 5400,
      topCities: ['Sydney', 'Melbourne', 'Auckland', 'Brisbane']
    }
  ]

  const globalLocations = [
    { id: 1, name: 'New York', continent: 'north-america', x: 25, y: 35, pulse: true, country: 'USA', flag: '🇺🇸', digital: 3200, classic: 4800 },
    { id: 2, name: 'Los Angeles', continent: 'north-america', x: 18, y: 38, pulse: false, country: 'USA', flag: '🇺🇸', digital: 2800, classic: 3900 },
    { id: 3, name: 'Toronto', continent: 'north-america', x: 27, y: 32, pulse: false, country: 'Canada', flag: '🇨🇦', digital: 1800, classic: 2400 },
    { id: 4, name: 'Mexico City', continent: 'north-america', x: 22, y: 42, pulse: true, country: 'Mexico', flag: '🇲🇽', digital: 1500, classic: 2200 },
    { id: 5, name: 'São Paulo', continent: 'south-america', x: 35, y: 65, pulse: false, country: 'Brazil', flag: '🇧🇷', digital: 2100, classic: 2800 },
    { id: 6, name: 'Buenos Aires', continent: 'south-america', x: 34, y: 70, pulse: false, country: 'Argentina', flag: '🇦🇷', digital: 1200, classic: 1600 },
    { id: 7, name: 'Rio de Janeiro', continent: 'south-america', x: 36, y: 63, pulse: true, country: 'Brazil', flag: '🇧🇷', digital: 1800, classic: 2300 },
    { id: 8, name: 'London', continent: 'europe', x: 48, y: 28, pulse: true, country: 'UK', flag: '🇬🇧', digital: 4200, classic: 5600 },
    { id: 9, name: 'Paris', continent: 'europe', x: 49, y: 30, pulse: false, country: 'France', flag: '🇫🇷', digital: 3500, classic: 4200 },
    { id: 10, name: 'Berlin', continent: 'europe', x: 51, y: 27, pulse: false, country: 'Germany', flag: '🇩🇪', digital: 2900, classic: 3400 },
    { id: 11, name: 'Madrid', continent: 'europe', x: 47, y: 33, pulse: false, country: 'Spain', flag: '🇪🇸', digital: 2400, classic: 3100 },
    { id: 12, name: 'Tokyo', continent: 'asia', x: 82, y: 37, pulse: true, country: 'Japan', flag: '🇯🇵', digital: 5200, classic: 6800 },
    { id: 13, name: 'Shanghai', continent: 'asia', x: 78, y: 40, pulse: false, country: 'China', flag: '🇨🇳', digital: 4800, classic: 6200 },
    { id: 14, name: 'Singapore', continent: 'asia', x: 74, y: 52, pulse: true, country: 'Singapore', flag: '🇸🇬', digital: 1900, classic: 2400 },
    { id: 15, name: 'Dubai', continent: 'asia', x: 60, y: 43, pulse: true, country: 'UAE', flag: '🇦🇪', digital: 2600, classic: 3200 },
    { id: 16, name: 'Mumbai', continent: 'asia', x: 67, y: 44, pulse: false, country: 'India', flag: '🇮🇳', digital: 3100, classic: 4500 },
    { id: 17, name: 'Lagos', continent: 'africa', x: 49, y: 52, pulse: false, country: 'Nigeria', flag: '🇳🇬', digital: 800, classic: 1200 },
    { id: 18, name: 'Cairo', continent: 'africa', x: 54, y: 40, pulse: false, country: 'Egypt', flag: '🇪🇬', digital: 1100, classic: 1600 },
    { id: 19, name: 'Sydney', continent: 'oceania', x: 87, y: 70, pulse: true, country: 'Australia', flag: '🇦🇺', digital: 2200, classic: 2900 },
    { id: 20, name: 'Melbourne', continent: 'oceania', x: 86, y: 73, pulse: false, country: 'Australia', flag: '🇦🇺', digital: 1800, classic: 2400 },
    // Additional 20% more dots (4 new dots)
    { id: 21, name: 'Chicago', continent: 'north-america', x: 24, y: 36, pulse: true, country: 'USA', flag: '🇺🇸', digital: 2600, classic: 3500 },
    { id: 22, name: 'Miami', continent: 'north-america', x: 26, y: 43, pulse: false, country: 'USA', flag: '🇺🇸', digital: 1900, classic: 2600 },
    { id: 23, name: 'Vancouver', continent: 'north-america', x: 20, y: 30, pulse: false, country: 'Canada', flag: '🇨🇦', digital: 1400, classic: 1900 },
    { id: 24, name: 'Lima', continent: 'south-america', x: 28, y: 58, pulse: true, country: 'Peru', flag: '🇵🇪', digital: 900, classic: 1300 },
    { id: 25, name: 'Bogotá', continent: 'south-america', x: 30, y: 50, pulse: false, country: 'Colombia', flag: '🇨🇴', digital: 1000, classic: 1400 },
    { id: 26, name: 'Rome', continent: 'europe', x: 52, y: 35, pulse: true, country: 'Italy', flag: '🇮🇹', digital: 2800, classic: 3500 },
    { id: 27, name: 'Amsterdam', continent: 'europe', x: 50, y: 27, pulse: false, country: 'Netherlands', flag: '🇳🇱', digital: 2100, classic: 2700 },
    { id: 28, name: 'Barcelona', continent: 'europe', x: 48, y: 35, pulse: false, country: 'Spain', flag: '🇪🇸', digital: 1900, classic: 2500 },
    { id: 29, name: 'Seoul', continent: 'asia', x: 80, y: 38, pulse: true, country: 'South Korea', flag: '🇰🇷', digital: 3800, classic: 4900 },
    { id: 30, name: 'Bangkok', continent: 'asia', x: 72, y: 48, pulse: false, country: 'Thailand', flag: '🇹🇭', digital: 2300, classic: 3100 },
    { id: 31, name: 'Hong Kong', continent: 'asia', x: 77, y: 43, pulse: true, country: 'Hong Kong', flag: '🇭🇰', digital: 2900, classic: 3600 },
    { id: 32, name: 'Delhi', continent: 'asia', x: 69, y: 41, pulse: false, country: 'India', flag: '🇮🇳', digital: 2700, classic: 3900 },
    { id: 33, name: 'Johannesburg', continent: 'africa', x: 53, y: 68, pulse: false, country: 'South Africa', flag: '🇿🇦', digital: 1300, classic: 1800 },
    { id: 34, name: 'Nairobi', continent: 'africa', x: 57, y: 54, pulse: true, country: 'Kenya', flag: '🇰🇪', digital: 700, classic: 1000 },
    { id: 35, name: 'Casablanca', continent: 'africa', x: 46, y: 38, pulse: false, country: 'Morocco', flag: '🇲🇦', digital: 900, classic: 1300 },
    { id: 36, name: 'Auckland', continent: 'oceania', x: 90, y: 72, pulse: false, country: 'New Zealand', flag: '🇳🇿', digital: 1200, classic: 1600 },
    { id: 37, name: 'Brisbane', continent: 'oceania', x: 88, y: 67, pulse: true, country: 'Australia', flag: '🇦🇺', digital: 1500, classic: 2000 },
    { id: 38, name: 'Perth', continent: 'oceania', x: 80, y: 69, pulse: false, country: 'Australia', flag: '🇦🇺', digital: 1100, classic: 1500 },
    { id: 39, name: 'San Francisco', continent: 'north-america', x: 19, y: 37, pulse: true, country: 'USA', flag: '🇺🇸', digital: 2900, classic: 3800 },
    { id: 40, name: 'Monterrey', continent: 'north-america', x: 23, y: 43, pulse: false, country: 'Mexico', flag: '🇲🇽', digital: 1100, classic: 1600 }
  ]

  const recentTransactions = [
    { location: 'Tokyo, Japan', price: 18000, time: '2m ago', billboard: 'Shibuya Crossing Digital', continent: 'asia' },
    { location: 'New York, USA', price: 15000, time: '5m ago', billboard: 'Times Square LED', continent: 'north-america' },
    { location: 'Dubai, UAE', price: 9500, time: '8m ago', billboard: 'Marina Digital Wall', continent: 'asia' },
    { location: 'London, UK', price: 12500, time: '12m ago', billboard: 'Piccadilly Circus Screen', continent: 'europe' },
    { location: 'São Paulo, Brazil', price: 6800, time: '15m ago', billboard: 'Paulista Avenue LED', continent: 'south-america' },
    { location: 'Sydney, Australia', price: 7200, time: '18m ago', billboard: 'Harbour Bridge Display', continent: 'oceania' }
  ]

  const billboardTypes = [
    { type: 'Classic Static', count: 142000, color: 'from-gray-500 to-slate-600' },
    { type: 'Digital LED', count: 108000, color: 'from-blue-500 to-indigo-600' }
  ]

  useEffect(() => {
    // Simulate live purchases
    const interval = setInterval(() => {
      const randomTransaction = recentTransactions[Math.floor(Math.random() * recentTransactions.length)]
      setLivePurchases(prev => [
        { ...randomTransaction, time: 'just now' },
        ...prev.slice(0, 4)
      ])
    }, 5000)
    return () => clearInterval(interval)
  }, [])

  const formatPrice = (price: number) => {
    const selectedCurrency = currencies.find(c => c.code === currency)
    if (!selectedCurrency) return `$${price.toLocaleString()}`
    const convertedPrice = Math.round(price * selectedCurrency.rate)
    return `${selectedCurrency.symbol}${convertedPrice.toLocaleString()}`
  }

  const selectedContinentData = continents.find(c => c.id === selectedContinent)
  const filteredLocations = selectedContinent 
    ? globalLocations.filter(loc => loc.continent === selectedContinent)
    : globalLocations

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section with World Map */}
      <section className="relative bg-gradient-to-br from-blue-900 via-blue-800 to-indigo-900 text-white py-16 md:py-20 overflow-hidden">
        <div className="absolute inset-0 bg-black/30"></div>
        
        {/* Animated background */}
        <div className="absolute inset-0">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-400/10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-1/3 right-1/4 w-96 h-96 bg-indigo-400/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center mb-12">
            <motion.h1
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6"
            >
              MW Market
            </motion.h1>
            
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-2xl md:text-3xl lg:text-4xl font-light mb-4 text-gray-100"
            >
              Global OOH Billboard Market
            </motion.h2>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-xl md:text-2xl mb-8 text-gray-200"
            >
              Classic & Digital Billboards Available Worldwide
            </motion.p>
          </div>

          {/* Interactive World Map */}
          <div className="relative w-full h-[350px] md:h-[500px] bg-gradient-to-br from-blue-950/50 to-indigo-950/50 rounded-2xl border-2 border-white/20 overflow-hidden mb-8">
            {/* Map background grid */}
            <div className="absolute inset-0 opacity-10">
              <div className="w-full h-full" style={{
                backgroundImage: 'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)',
                backgroundSize: '50px 50px'
              }}></div>
            </div>

            {/* Animated World Map Lines (Latitude and Longitude) */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ opacity: 0.3 }}>
              {/* Horizontal latitude lines */}
              <motion.line
                x1="0" y1="25%" x2="100%" y2="25%"
                stroke="rgba(255,255,255,0.4)"
                strokeWidth="1"
                strokeDasharray="10,5"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
              />
              <motion.line
                x1="0" y1="50%" x2="100%" y2="50%"
                stroke="rgba(255,255,255,0.5)"
                strokeWidth="1.5"
                strokeDasharray="10,5"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 3, repeat: Infinity, ease: "linear", delay: 0.5 }}
              />
              <motion.line
                x1="0" y1="75%" x2="100%" y2="75%"
                stroke="rgba(255,255,255,0.4)"
                strokeWidth="1"
                strokeDasharray="10,5"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 3, repeat: Infinity, ease: "linear", delay: 1 }}
              />
              
              {/* Vertical longitude lines */}
              <motion.line
                x1="25%" y1="0" x2="25%" y2="100%"
                stroke="rgba(255,255,255,0.4)"
                strokeWidth="1"
                strokeDasharray="10,5"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 3, repeat: Infinity, ease: "linear", delay: 1.5 }}
              />
              <motion.line
                x1="50%" y1="0" x2="50%" y2="100%"
                stroke="rgba(255,255,255,0.5)"
                strokeWidth="1.5"
                strokeDasharray="10,5"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 3, repeat: Infinity, ease: "linear", delay: 2 }}
              />
              <motion.line
                x1="75%" y1="0" x2="75%" y2="100%"
                stroke="rgba(255,255,255,0.4)"
                strokeWidth="1"
                strokeDasharray="10,5"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 3, repeat: Infinity, ease: "linear", delay: 2.5 }}
              />
            </svg>

            {/* Global locations with pulsing dots */}
            {filteredLocations.map((location, index) => (
              <motion.div
                key={location.id}
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.05 }}
                className="absolute cursor-pointer group"
                style={{ left: `${location.x}%`, top: `${location.y}%` }}
                onMouseEnter={() => setHoveredLocation(location.name)}
                onMouseLeave={() => setHoveredLocation(null)}
              >
                {/* Pulsing ring */}
                {location.pulse && (
                  <div className="absolute -inset-4 bg-yellow-400/20 rounded-full animate-ping"></div>
                )}
                
                {/* Location pin with dynamic blinking */}
                <div 
                  className={`w-3 h-3 rounded-full ${
                    location.pulse ? 'bg-yellow-400 animate-pulse shadow-yellow-400/50' : 'bg-blue-400 animate-pulse shadow-blue-400/50'
                  } shadow-lg group-hover:scale-150 transition-transform border-2 border-white`}
                  style={{ animationDelay: `${index * 150}ms` }}
                ></div>
                
                {/* Enhanced Location Tooltip with Inventory Details */}
                <div className={`absolute left-4 top-0 bg-gradient-to-br from-white to-gray-50 text-gray-900 px-4 py-3 rounded-xl text-xs font-semibold whitespace-nowrap shadow-2xl border-2 border-blue-100 transition-all ${
                  hoveredLocation === location.name ? 'opacity-100 scale-100' : 'opacity-0 scale-0'
                }`}>
                  <div className="flex items-center gap-2 mb-2 pb-2 border-b border-gray-200">
                    <span className="text-2xl">{location.flag}</span>
                    <div>
                      <div className="font-bold text-sm text-gray-900">{location.name}</div>
                      <div className="text-xs text-gray-600">{location.country}</div>
                    </div>
                  </div>
                  <div className="space-y-1.5">
                    <div className="flex items-center justify-between gap-4">
                      <span className="text-blue-600 flex items-center gap-1">
                        <SparklesIcon className="w-3 h-3" />
                        Digital:
                      </span>
                      <span className="font-bold text-gray-900">{location.digital.toLocaleString()}</span>
                    </div>
                    <div className="flex items-center justify-between gap-4">
                      <span className="text-gray-600 flex items-center gap-1">
                        <PhotoIcon className="w-3 h-3" />
                        Classic:
                      </span>
                      <span className="font-bold text-gray-900">{location.classic.toLocaleString()}</span>
                    </div>
                    <div className="pt-1.5 mt-1.5 border-t border-gray-200">
                      <div className="flex items-center justify-between">
                        <span className="text-gray-700">Total:</span>
                        <span className="font-bold text-blue-600">{(location.digital + location.classic).toLocaleString()}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}

            {/* Legend */}
            <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-sm rounded-lg p-3 text-xs space-y-2">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-yellow-400 border-2 border-white animate-pulse shadow-lg shadow-yellow-400/50"></div>
                <span className="text-gray-900 font-medium">Live Purchase Activity</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-blue-400 border-2 border-white animate-pulse shadow-lg shadow-blue-400/50" style={{ animationDelay: '500ms' }}></div>
                <span className="text-gray-900 font-medium">Available Billboards</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Live Purchase Ticker */}
      <section className="bg-gradient-to-r from-green-600 to-emerald-600 text-white py-4 overflow-hidden">
        <motion.div
          animate={{ x: [0, -2000] }}
          transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
          className="flex gap-12 whitespace-nowrap"
        >
          {[...recentTransactions, ...recentTransactions, ...recentTransactions].map((transaction, index) => (
            <div key={index} className="flex items-center gap-3 text-sm">
              <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
              <MapPinIcon className="w-4 h-4" />
              <span className="font-bold">{transaction.location}</span>
              <span className="opacity-75">•</span>
              <span>{transaction.billboard}</span>
              <span className="opacity-75">•</span>
              <span className="font-bold text-yellow-300">{formatPrice(transaction.price)}</span>
              <span className="opacity-75">•</span>
              <span className="text-xs opacity-80">{transaction.time}</span>
            </div>
          ))}
        </motion.div>
      </section>

      {/* Continent Details Section */}
      <AnimatePresence mode="wait">
        {selectedContinentData && (
          <motion.section
            key={selectedContinent}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
            className="py-16 bg-gradient-to-br from-gray-50 to-blue-50"
          >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center mb-12">
                <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                  {selectedContinentData.name} Billboard Inventory
                </h2>
                <p className="text-xl text-gray-600">
                  Explore {selectedContinentData.billboards.toLocaleString()} available billboards
                </p>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
                <div className={`bg-gradient-to-br ${selectedContinentData.color} p-6 rounded-xl text-white shadow-xl`}>
                  <div className="text-4xl font-bold mb-2">{selectedContinentData.billboards.toLocaleString()}</div>
                  <div className="text-sm opacity-90">Total Billboards</div>
                </div>
                <div className="bg-white p-6 rounded-xl shadow-lg border-2 border-gray-200">
                  <div className="text-4xl font-bold text-blue-600 mb-2">{formatPrice(selectedContinentData.avgPrice)}</div>
                  <div className="text-sm text-gray-600">Average Price/Week</div>
                </div>
                <div className="bg-white p-6 rounded-xl shadow-lg border-2 border-gray-200">
                  <div className="text-4xl font-bold text-green-600 mb-2">{selectedContinentData.topCities.length}</div>
                  <div className="text-sm text-gray-600">Major Cities</div>
                </div>
                <div className="bg-white p-6 rounded-xl shadow-lg border-2 border-gray-200">
                  <div className="text-4xl font-bold text-purple-600 mb-2">24/7</div>
                  <div className="text-sm text-gray-600">Instant Booking</div>
                </div>
              </div>

              {/* Top Cities */}
              <div className="bg-white rounded-2xl shadow-xl p-8 border-2 border-gray-200">
                <div className="flex items-center gap-2 mb-6">
                  <BuildingOfficeIcon className="w-7 h-7 text-blue-600" />
                  <h3 className="text-2xl font-bold text-gray-900">Top Cities</h3>
                </div>
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
                  {selectedContinentData.topCities.map((city, index) => (
                    <motion.div
                      key={city}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      className="flex items-center gap-3 p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg hover:shadow-lg transition-shadow"
                    >
                      <MapPinIcon className="w-6 h-6 text-blue-600" />
                      <div>
                        <div className="font-bold text-gray-900">{city}</div>
                        <div className="text-xs text-gray-600">Available Now</div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </motion.section>
        )}
      </AnimatePresence>

      {/* Competitive Advantages Section - Statistics Focus */}
      <section className="py-24 bg-gradient-to-br from-gray-50 via-white to-blue-50 relative overflow-hidden">
        {/* Background decoration */}
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-20 left-10 w-72 h-72 bg-blue-200 rounded-full blur-3xl" />
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-indigo-200 rounded-full blur-3xl" />
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-20"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Why Choose MW Market?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              The numbers speak for themselves
            </p>
          </motion.div>

          {/* Main Stats Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
            {[
              { 
                value: "2", 
                unit: "min", 
                label: "Average Booking Time",
                description: "vs 2-4 weeks with traditional agencies"
              },
              { 
                value: "147", 
                unit: "+", 
                label: "Countries Covered",
                description: "Global reach from a single platform"
              },
              { 
                value: "250K", 
                unit: "+", 
                label: "Billboard Inventory",
                description: "Premium screens worldwide"
              },
              { 
                value: "5", 
                unit: "%", 
                label: "Platform Fee",
                description: "vs 15-25% typical agency fees"
              }
            ].map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30, scale: 0.9 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="relative group"
              >
                <div className="bg-white rounded-[6px] p-8 border border-gray-200 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 h-full">
                  <div className="flex items-baseline gap-1 mb-2">
                    <motion.span 
                      className="text-5xl md:text-6xl font-bold text-gray-900"
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      transition={{ duration: 1, delay: index * 0.1 + 0.3 }}
                      viewport={{ once: true }}
                    >
                      {stat.value}
                    </motion.span>
                    <span className="text-3xl font-bold text-blue-600">{stat.unit}</span>
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">{stat.label}</h3>
                  <p className="text-gray-500 text-sm">{stat.description}</p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Secondary Stats Row */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            viewport={{ once: true }}
            className="grid md:grid-cols-3 gap-6"
          >
            {[
              { value: "30+", label: "Currencies Supported", sublabel: "Pay in your local currency" },
              { value: "24/7", label: "Support Available", sublabel: "Dedicated team always ready" },
              { value: "Real-time", label: "Analytics Dashboard", sublabel: "Track every impression" }
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 + 0.5 }}
                viewport={{ once: true }}
                className="flex items-center gap-4 bg-white rounded-[6px] p-6 border border-gray-200 shadow-md"
              >
                <div className="w-1 h-16 bg-gradient-to-b from-blue-500 to-indigo-600 rounded-full" />
                <div>
                  <div className="text-2xl font-bold text-gray-900">{item.value}</div>
                  <div className="text-gray-800 font-medium">{item.label}</div>
                  <div className="text-gray-500 text-sm">{item.sublabel}</div>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Bottom comparison highlight */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            viewport={{ once: true }}
            className="mt-16 text-center"
          >
            <div className="inline-flex items-center gap-4 bg-gradient-to-r from-green-50 to-emerald-50 rounded-full px-8 py-4 border border-green-200">
              <span className="text-gray-700 font-medium">
                <span className="text-green-600 font-bold">85% faster</span> campaign launches than traditional methods
              </span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Partnership Benefits Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Two-Sided Market Benefits
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Value for advertisers and billboard owners alike
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-12">
            {/* Advertisers Benefits */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-3xl p-10 shadow-xl"
            >
              <div className="flex items-center gap-4 mb-8">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-2xl flex items-center justify-center text-white text-2xl font-bold shadow-lg">
                  A
                </div>
                <div>
                  <h3 className="text-3xl font-bold text-gray-900">For Advertisers</h3>
                  <p className="text-gray-600">Launch global campaigns instantly</p>
                </div>
              </div>
              <ul className="space-y-4">
                {[
                  'Access 250,000+ billboards in 147 countries from one platform',
                  'Real-time pricing with no hidden fees or commissions',
                  'Book campaigns in 2 minutes with instant confirmation',
                  'Live analytics dashboard tracking impressions and ROI',
                  'Multi-currency payments with secure transactions',
                  'AI-powered audience targeting and location insights',
                  'Campaign management tools with scheduling automation',
                  '24/7 customer support in multiple languages'
                ].map((benefit, index) => (
                  <motion.li
                    key={index}
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="flex items-start gap-3"
                  >
                    <CheckIcon className="w-6 h-6 text-green-600 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700">{benefit}</span>
                  </motion.li>
                ))}
              </ul>
            </motion.div>

            {/* Billboard Owners Benefits */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-3xl p-10 shadow-xl"
            >
              <div className="flex items-center gap-4 mb-8">
                <div className="w-16 h-16 bg-gradient-to-br from-green-600 to-emerald-600 rounded-2xl flex items-center justify-center text-white text-2xl font-bold shadow-lg">
                  O
                </div>
                <div>
                  <h3 className="text-3xl font-bold text-gray-900">For Billboard Owners</h3>
                  <p className="text-gray-600">Maximize your inventory revenue</p>
                </div>
              </div>
              <ul className="space-y-4">
                {[
                  'Reach 12,000+ active advertisers globally from day one',
                  'Fill vacant inventory with automated matching algorithms',
                  '94% average occupancy rate vs 67% industry average',
                  'Instant payments with transparent 5% platform fee',
                  'Dynamic pricing tools to optimize revenue',
                  'Zero upfront costs or monthly subscription fees',
                  'Professional dashboard for inventory management',
                  'Marketing support to showcase your locations'
                ].map((benefit, index) => (
                  <motion.li
                    key={index}
                    initial={{ opacity: 0, x: 10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="flex items-start gap-3"
                  >
                    <CheckIcon className="w-6 h-6 text-green-600 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700">{benefit}</span>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Social Proof Stats Section */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Performance That Speaks For Itself
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Real numbers from real campaigns on MW Market
            </p>
          </motion.div>

          {/* Main Performance Cards */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            {[
              { label: 'Average Campaign ROI', value: '385', suffix: '%', comparison: 'vs 180% industry avg' },
              { label: 'Average Booking Time', value: '2.3', suffix: 'min', comparison: 'vs 2-4 weeks traditional' },
              { label: 'Billboard Fill Rate', value: '94', suffix: '%', comparison: 'vs 67% industry avg' },
              { label: 'Customer Satisfaction', value: '4.9', suffix: '/5', comparison: 'from 8,500+ reviews' }
            ].map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-gray-50 rounded-[6px] p-8 border border-gray-200 hover:border-gray-300 hover:shadow-lg transition-all duration-300"
              >
                <div className="flex items-baseline gap-1 mb-3">
                  <span className="text-3xl md:text-5xl font-bold text-gray-900">{stat.value}</span>
                  <span className="text-2xl font-semibold text-gray-500">{stat.suffix}</span>
                </div>
                <h3 className="text-base font-semibold text-gray-800 mb-2">{stat.label}</h3>
                <p className="text-sm text-gray-500">{stat.comparison}</p>
              </motion.div>
            ))}
          </div>

          {/* Additional Stats - Horizontal Band */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            viewport={{ once: true }}
            className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-[6px] p-8 md:p-10"
          >
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-4">
              {[
                { label: 'Total Campaigns', value: '45,000+' },
                { label: 'Countries Served', value: '147' },
                { label: 'Monthly Impressions', value: '2.8B' },
                { label: 'Active Users', value: '12,000+' }
              ].map((stat, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ duration: 0.5, delay: index * 0.1 + 0.4 }}
                  viewport={{ once: true }}
                  className="text-center"
                >
                  <div className="text-3xl md:text-4xl font-bold text-white mb-1">{stat.value}</div>
                  <div className="text-sm text-blue-100">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Demo/Onboarding CTA Section */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left: Demo Form */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="bg-white rounded-3xl shadow-2xl p-10"
            >
              <h2 className="text-4xl font-bold text-gray-900 mb-4">
                Book Your Free Demo
              </h2>
              <p className="text-lg text-gray-600 mb-8">
                See how MW Market can transform your OOH advertising strategy in just 15 minutes
              </p>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Full Name *</label>
                  <input
                    type="text"
                    placeholder="John Smith"
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:border-blue-600 focus:ring-2 focus:ring-blue-200 outline-none transition-all text-gray-900"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Work Email *</label>
                  <input
                    type="email"
                    placeholder="john@company.com"
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:border-blue-600 focus:ring-2 focus:ring-blue-200 outline-none transition-all text-gray-900"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Company Name *</label>
                  <input
                    type="text"
                    placeholder="Your Company"
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:border-blue-600 focus:ring-2 focus:ring-blue-200 outline-none transition-all text-gray-900"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Monthly Ad Budget</label>
                  <select className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:border-blue-600 focus:ring-2 focus:ring-blue-200 outline-none transition-all text-gray-900">
                    <option>Select budget range</option>
                    <option>$10K - $50K</option>
                    <option>$50K - $100K</option>
                    <option>$100K - $500K</option>
                    <option>$500K+</option>
                  </select>
                </div>
                
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-8 py-4 rounded-xl font-bold text-lg hover:from-blue-700 hover:to-indigo-700 transition-all shadow-xl hover:shadow-2xl"
                >
                  Schedule My Demo
                </motion.button>
                
                <p className="text-xs text-gray-500 text-center">
                  No credit card required • 15-minute demo • Free consultation
                </p>
              </div>
            </motion.div>

            {/* Right: Benefits */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="space-y-8"
            >
              <div>
                <h3 className="text-3xl font-bold text-gray-900 mb-6">
                  What You&apos;ll Get in Your Demo:
                </h3>
              </div>
              
              {[
                {
                  title: 'Live Platform Walkthrough',
                  description: 'See how to browse, filter, and book billboards across 147 countries in real-time',
                  icon: MapIcon
                },
                {
                  title: 'Custom Campaign Strategy',
                  description: 'Get personalized recommendations based on your target audience and budget',
                  icon: ChartBarIcon
                },
                {
                  title: 'ROI Calculator Demo',
                  description: 'Learn how our analytics predict and track your campaign performance',
                  icon: BoltIcon
                },
                {
                  title: 'Onboarding Support',
                  description: 'Discover how our team helps you launch your first campaign successfully',
                  icon: CheckIcon
                }
              ].map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="flex gap-4 bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition-shadow"
                >
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-xl flex items-center justify-center shadow-lg">
                      <item.icon className="w-6 h-6 text-white" />
                    </div>
                  </div>
                  <div>
                    <h4 className="text-lg font-bold text-gray-900 mb-2">{item.title}</h4>
                    <p className="text-gray-600">{item.description}</p>
                  </div>
                </motion.div>
              ))}
              
              <div className="bg-gradient-to-r from-green-600 to-emerald-600 p-6 rounded-2xl text-white">
                <p className="text-lg font-bold mb-2">Limited Time Offer</p>
                <p className="text-sm">Book a demo this week and get $500 in free campaign credits plus 3 months of premium analytics!</p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Why MW Market?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              The world&apos;s most trusted platform for OOH billboard advertising
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { Icon: GlobeIcon, title: 'Global Coverage', description: '147 countries, 250,000+ verified billboard locations worldwide', color: 'text-blue-600' },
              { Icon: CreditCardIcon, title: 'Multi-Currency', description: 'Pay in 30+ currencies with secure transactions', color: 'text-green-600' },
              { Icon: BoltIcon, title: 'Instant Booking', description: 'Book billboards in seconds with real-time availability', color: 'text-yellow-600' },
              { Icon: ChartBarIcon, title: 'Live Analytics', description: 'Track impressions and ROI with real-time performance data', color: 'text-purple-600' }
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white p-8 rounded-xl shadow-lg hover:shadow-2xl transition-shadow text-center"
              >
                <feature.Icon className={`w-16 h-16 mx-auto mb-4 ${feature.color}`} />
                <h3 className="text-xl font-bold text-gray-900 mb-3">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Integrations Section - Don't Replace. Integrate. */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <div className="inline-flex items-center gap-2 bg-blue-100 px-4 py-2 rounded-full mb-6">
                <span className="text-blue-600 font-medium text-sm">13+ Integrations</span>
              </div>
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                Don&apos;t Replace.
                <span className="block text-blue-600">Integrate.</span>
              </h2>
              <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                MW Market connects seamlessly with your existing buying platforms. No rip-and-replace—just instant global inventory access from day one.
              </p>

              <div className="grid grid-cols-2 gap-4">
                {['SSP Partners', 'DSP Partners', 'Programmatic', 'Real-Time Bidding'].map((category) => (
                  <div key={category} className="flex items-center gap-2">
                    <svg className="w-5 h-5 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span className="text-gray-700">{category}</span>
                  </div>
                ))}
              </div>

              <div className="mt-8">
                <a
                  href="/integrations"
                  className="text-blue-600 font-semibold hover:text-blue-700 flex items-center gap-2"
                >
                  View All Integrations
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </a>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
                {integrations.map((integration, index) => (
                  <motion.div
                    key={integration.name}
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.4, delay: index * 0.05 }}
                    viewport={{ once: true }}
                    className="flex items-center justify-center group cursor-pointer"
                  >
                    <div className="w-36 h-28 flex items-center justify-center grayscale opacity-60 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-300">
                      <Image src={integration.logo} alt={integration.name} width={180} height={72} className="object-contain w-full h-full" />
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

    </div>
  )
}
