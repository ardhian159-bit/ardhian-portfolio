export function GithubIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      aria-hidden="true"
    >
      <path d="M12 .5C5.65.5.5 5.66.5 12.02c0 5.08 3.29 9.39 7.86 10.91.57.1.78-.25.78-.55v-2.13c-3.2.7-3.87-1.36-3.87-1.36-.52-1.32-1.27-1.67-1.27-1.67-1.04-.71.08-.7.08-.7 1.15.08 1.75 1.18 1.75 1.18 1.02 1.75 2.68 1.24 3.34.95.1-.74.4-1.24.73-1.53-2.55-.29-5.23-1.28-5.23-5.69 0-1.26.45-2.29 1.18-3.1-.12-.29-.51-1.46.11-3.04 0 0 .96-.31 3.15 1.18.91-.25 1.89-.38 2.86-.39.97.01 1.95.14 2.86.39 2.19-1.49 3.15-1.18 3.15-1.18.62 1.58.23 2.75.11 3.04.74.81 1.18 1.84 1.18 3.1 0 4.42-2.69 5.4-5.25 5.68.41.36.78 1.06.78 2.14v3.17c0 .31.21.66.79.55C20.21 21.4 23.5 17.09 23.5 12.02 23.5 5.66 18.35.5 12 .5z" />
    </svg>
  )
}

export function LinkedinIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      aria-hidden="true"
    >
      <path d="M19 0h-14C2.24 0 0 2.24 0 5v14c0 2.76 2.24 5 5 5h14c2.76 0 5-2.24 5-5V5c0-2.76-2.24-5-5-5zM8 19H5V8h3v11zM6.5 6.73c-.97 0-1.75-.79-1.75-1.76s.78-1.76 1.75-1.76 1.75.79 1.75 1.76S7.47 6.73 6.5 6.73zM20 19h-3v-5.6c0-1.34-.03-3.06-1.87-3.06-1.87 0-2.16 1.46-2.16 2.96V19h-3V8h2.88v1.5h.04c.4-.76 1.39-1.56 2.86-1.56 3.06 0 3.62 2.01 3.62 4.63V19z" />
    </svg>
  )
}

// Emerald glassmorphism "AC" monogram — matches the favicon (app/icon.svg).
export function AcMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 64 64" className={className} aria-hidden="true" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="ac-bg" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#0B7A5B" />
          <stop offset="0.55" stopColor="#065F46" />
          <stop offset="1" stopColor="#053D32" />
        </linearGradient>
        <linearGradient id="ac-glass" x1="0.12" y1="0" x2="0.62" y2="1">
          <stop offset="0" stopColor="#ffffff" stopOpacity="0.34" />
          <stop offset="0.5" stopColor="#ffffff" stopOpacity="0.05" />
          <stop offset="1" stopColor="#ffffff" stopOpacity="0" />
        </linearGradient>
        <radialGradient id="ac-spec" cx="0.32" cy="0.2" r="0.62">
          <stop offset="0" stopColor="#ffffff" stopOpacity="0.5" />
          <stop offset="1" stopColor="#ffffff" stopOpacity="0" />
        </radialGradient>
      </defs>
      <rect x="2" y="2" width="60" height="60" rx="16" fill="url(#ac-bg)" />
      <rect x="2" y="2" width="60" height="60" rx="16" fill="url(#ac-glass)" />
      <ellipse cx="24" cy="15" rx="24" ry="13" fill="url(#ac-spec)" />
      <rect x="3" y="3" width="58" height="58" rx="15" fill="none" stroke="#ffffff" strokeOpacity="0.28" strokeWidth="1.4" />
      <text
        x="32"
        y="42"
        textAnchor="middle"
        fontFamily="-apple-system,BlinkMacSystemFont,'SF Pro Display','Helvetica Neue',Arial,sans-serif"
        fontSize="30"
        fontWeight="600"
        letterSpacing="-1.5"
        fill="#ECFDF5"
      >
        AC
      </text>
    </svg>
  )
}
