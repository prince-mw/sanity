"use client";

import { getBackgroundClasses, type BackgroundColor } from "./utils";

interface SpacerSectionProps {
  height?: 'small' | 'medium' | 'large' | 'xlarge';
  showDivider?: boolean;
  backgroundColor?: BackgroundColor;
}

export function SpacerSection({
  height = 'medium',
  showDivider = false,
  backgroundColor = 'transparent',
}: SpacerSectionProps) {
  const bgClasses = getBackgroundClasses(backgroundColor);
  
  const heightMap: Record<string, string> = {
    small: 'h-8 md:h-12',
    medium: 'h-16 md:h-24',
    large: 'h-24 md:h-32',
    xlarge: 'h-32 md:h-48',
  };

  const isDark = backgroundColor === 'dark' || backgroundColor === 'blue' || backgroundColor === 'gradient';

  return (
    <div className={`${bgClasses} ${heightMap[height]} flex items-center justify-center`}>
      {showDivider && (
        <div className={`w-full max-w-4xl mx-auto px-4`}>
          <hr className={`border-t ${isDark ? 'border-white/20' : 'border-gray-200'}`} />
        </div>
      )}
    </div>
  );
}
