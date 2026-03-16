// Shared utility functions and types for landing page sections

export type BackgroundColor = 'white' | 'gray' | 'blue' | 'dark' | 'gradient' | 'transparent';
export type Alignment = 'left' | 'center' | 'right';
export type MaxWidth = 'narrow' | 'medium' | 'wide' | 'full';

export function getBackgroundClasses(color?: BackgroundColor): string {
  const bgMap: Record<BackgroundColor, string> = {
    white: 'bg-white',
    gray: 'bg-gray-50',
    blue: 'bg-mw-blue-600 text-white',
    dark: 'bg-gray-900 text-white',
    gradient: 'bg-gradient-to-r from-mw-blue-600 to-mw-blue-800 text-white',
    transparent: 'bg-transparent',
  };
  return bgMap[color || 'white'];
}

export function getTextColorClasses(bgColor?: BackgroundColor): string {
  const darkBgs: BackgroundColor[] = ['blue', 'dark', 'gradient'];
  return darkBgs.includes(bgColor || 'white') ? 'text-white' : 'text-gray-900';
}

export function getSubtextColorClasses(bgColor?: BackgroundColor): string {
  const darkBgs: BackgroundColor[] = ['blue', 'dark', 'gradient'];
  return darkBgs.includes(bgColor || 'white') ? 'text-white/80' : 'text-gray-600';
}

export function getAlignmentClasses(alignment?: Alignment): string {
  const alignMap: Record<Alignment, string> = {
    left: 'text-left',
    center: 'text-center mx-auto',
    right: 'text-right ml-auto',
  };
  return alignMap[alignment || 'left'];
}

export function getMaxWidthClasses(maxWidth?: MaxWidth): string {
  const widthMap: Record<MaxWidth, string> = {
    narrow: 'max-w-2xl',
    medium: 'max-w-4xl',
    wide: 'max-w-6xl',
    full: 'max-w-full',
  };
  return widthMap[maxWidth || 'medium'];
}

export function getHeightClasses(height?: 'full' | 'large' | 'medium' | 'small'): string {
  const heightMap: Record<string, string> = {
    full: 'min-h-screen',
    large: 'min-h-[80vh]',
    medium: 'min-h-[60vh]',
    small: 'min-h-[40vh]',
  };
  return heightMap[height || 'large'];
}

// Video URL parsing utilities
export function getYouTubeId(url: string): string | null {
  const regex = /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/;
  const match = url.match(regex);
  return match ? match[1] : null;
}

export function getVimeoId(url: string): string | null {
  const regex = /vimeo\.com\/(?:.*\/)?(\d+)/;
  const match = url.match(regex);
  return match ? match[1] : null;
}

export function parseVideoUrl(url: string): { type: 'youtube' | 'vimeo' | 'unknown'; id: string | null } {
  const youtubeId = getYouTubeId(url);
  if (youtubeId) return { type: 'youtube', id: youtubeId };
  
  const vimeoId = getVimeoId(url);
  if (vimeoId) return { type: 'vimeo', id: vimeoId };
  
  return { type: 'unknown', id: null };
}

// Button styles
export function getButtonClasses(variant: 'primary' | 'secondary' = 'primary', isDarkBg?: boolean): string {
  if (variant === 'primary') {
    return isDarkBg
      ? 'bg-white text-mw-blue-600 hover:bg-gray-100 px-6 py-3 rounded-lg font-semibold transition-colors'
      : 'bg-mw-blue-600 text-white hover:bg-mw-blue-700 px-6 py-3 rounded-lg font-semibold transition-colors';
  }
  return isDarkBg
    ? 'border-2 border-white text-white hover:bg-white/10 px-6 py-3 rounded-lg font-semibold transition-colors'
    : 'border-2 border-mw-blue-600 text-mw-blue-600 hover:bg-mw-blue-50 px-6 py-3 rounded-lg font-semibold transition-colors';
}
