'use client';

/**
 * Authentic SVG icons for each technology in the constellation.
 * Scalable, lightweight, and cleanly rendered with crisp vector paths.
 */

export function TechIcon({ id, size = 24, color = 'currentColor', className = '' }) {
  const props = {
    width: size,
    height: size,
    viewBox: '0 0 24 24',
    fill: 'none',
    xmlns: 'http://www.w3.org/2000/svg',
    className,
  };

  switch (id) {
    case 'javascript':
      return (
        <svg {...props}>
          <rect x="2" y="2" width="20" height="20" rx="3" fill="#F7DF1E" fillOpacity="0.15" stroke="#F7DF1E" strokeWidth="1.2" />
          <path d="M12 9v6a2 2 0 0 1-2 2H8" stroke="#F7DF1E" strokeWidth="1.8" strokeLinecap="round" />
          <path d="M15 15.5c.8.6 1.8.8 2.6.4.8-.4 1.4-1.2 1.4-2.1 0-1.8-2.6-1.5-2.6-3 0-.6.4-1.2 1.2-1.4.8-.2 1.8 0 2.4.6" stroke="#F7DF1E" strokeWidth="1.8" strokeLinecap="round" />
        </svg>
      );

    case 'nodejs':
      return (
        <svg {...props} viewBox="0 0 32 32">
          <path
            d="M16 2.5l11.7 6.8v13.4L16 29.5 4.3 22.7V9.3L16 2.5z"
            fill="#5FA04E"
            fillOpacity="0.15"
            stroke="#5FA04E"
            strokeWidth="1.8"
          />
          <path
            d="M16 8l7 4v8l-7 4-7-4v-8l7-4z"
            stroke="#68A063"
            strokeWidth="1.4"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <circle cx="16" cy="16" r="2.5" fill="#5FA04E" />
        </svg>
      );

    case 'express':
      return (
        <svg {...props} viewBox="0 0 24 24">
          <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.4" strokeOpacity="0.4" />
          <path
            d="M6.5 14.5l3.5-5 3.5 5M13.5 9.5l3.5 5"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path d="M13 13.5h5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
        </svg>
      );

    case 'rest-apis':
      return (
        <svg {...props}>
          <rect x="3" y="4" width="7" height="6" rx="1.5" stroke="currentColor" strokeWidth="1.5" />
          <rect x="14" y="4" width="7" height="6" rx="1.5" stroke="currentColor" strokeWidth="1.5" />
          <rect x="8.5" y="14" width="7" height="6" rx="1.5" stroke="currentColor" strokeWidth="1.5" />
          <path d="M6.5 10v1.5a1 1 0 001 1h4m6-2.5v1.5a1 1 0 01-1 1h-4m0 0v2" stroke="currentColor" strokeWidth="1.4" />
        </svg>
      );

    case 'authentication':
      return (
        <svg {...props}>
          <path
            d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"
            fill="currentColor"
            fillOpacity="0.12"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <circle cx="12" cy="10" r="2" stroke="currentColor" strokeWidth="1.5" />
          <path d="M12 12v3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      );

    case 'jwt':
      return (
        <svg {...props} viewBox="0 0 24 24">
          <circle cx="12" cy="12" r="9" stroke="#d63aff" strokeWidth="1.4" strokeOpacity="0.6" />
          <path
            d="M12 3v9l7.8 4.5"
            stroke="#fb015b"
            strokeWidth="1.6"
            strokeLinecap="round"
          />
          <path
            d="M12 12L4.2 16.5"
            stroke="#00b9f1"
            strokeWidth="1.6"
            strokeLinecap="round"
          />
          <circle cx="12" cy="12" r="2" fill="#d63aff" />
        </svg>
      );

    case 'cookies':
      return (
        <svg {...props}>
          <path
            d="M12 2a10 10 0 1 0 10 10 4 4 0 0 1-5-5 4 4 0 0 1-5-5z"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <circle cx="8.5" cy="8.5" r="1" fill="currentColor" />
          <circle cx="7.5" cy="14.5" r="1" fill="currentColor" />
          <circle cx="13" cy="16" r="1" fill="currentColor" />
          <circle cx="15.5" cy="11.5" r="1" fill="currentColor" />
        </svg>
      );

    case 'react':
      return (
        <svg {...props} viewBox="-11.5 -10.23174 23 20.46348">
          <circle cx="0" cy="0" r="2.05" fill="#61DAFB" />
          <g stroke="#61DAFB" strokeWidth="1" fill="none">
            <ellipse rx="11" ry="4.2" />
            <ellipse rx="11" ry="4.2" transform="rotate(60)" />
            <ellipse rx="11" ry="4.2" transform="rotate(120)" />
          </g>
        </svg>
      );

    case 'mongodb':
      return (
        <svg {...props} viewBox="0 0 24 24">
          <path
            d="M12 2C12 2 7 8 7 13.5C7 17.5 9.5 20 12 22C14.5 20 17 17.5 17 13.5C17 8 12 2 12 2Z"
            fill="#00ED64"
            fillOpacity="0.15"
            stroke="#00ED64"
            strokeWidth="1.5"
            strokeLinejoin="round"
          />
          <path d="M12 3V21" stroke="#00ED64" strokeWidth="1.2" strokeLinecap="round" />
        </svg>
      );

    case 'mongoose':
      return (
        <svg {...props}>
          <path
            d="M4 18l4-12 4 8 4-8 4 12"
            stroke="#e11d48"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <circle cx="12" cy="14" r="1.5" fill="#e11d48" />
        </svg>
      );

    case 'postgresql':
      return (
        <svg {...props} viewBox="0 0 24 24">
          <path
            d="M12 3c-4.4 0-8 3.4-8 7.5 0 2.8 1.6 5.3 4 6.5v3.5l3-2h1c4.4 0 8-3.4 8-7.5S16.4 3 12 3z"
            fill="#336791"
            fillOpacity="0.15"
            stroke="#336791"
            strokeWidth="1.5"
            strokeLinejoin="round"
          />
          <circle cx="9.5" cy="9.5" r="1.5" fill="#336791" />
          <path d="M13 9c1 .5 2 1.5 2 3" stroke="#336791" strokeWidth="1.4" strokeLinecap="round" />
        </svg>
      );

    case 'supabase':
      return (
        <svg {...props} viewBox="0 0 24 24">
          <path
            d="M12.5 2L4 13.5h7.5L10.5 22 20 10.5h-7.5L12.5 2z"
            fill="#3ECF8E"
            fillOpacity="0.2"
            stroke="#3ECF8E"
            strokeWidth="1.6"
            strokeLinejoin="round"
          />
        </svg>
      );

    case 'db-design':
      return (
        <svg {...props}>
          <rect x="3" y="3" width="18" height="6" rx="2" stroke="currentColor" strokeWidth="1.5" />
          <path d="M5 6h2M3 12h18M3 15h18M3 18h18" stroke="currentColor" strokeWidth="1.4" />
          <rect x="3" y="9" width="18" height="12" rx="2" stroke="currentColor" strokeWidth="1.5" />
          <path d="M10 9v12" stroke="currentColor" strokeWidth="1.4" />
        </svg>
      );

    case 'python':
      return (
        <svg {...props} viewBox="0 0 24 24">
          <path
            d="M11.9 2c-3.1 0-2.9 1.3-2.9 1.3l.01 1.4h2.9v.4H6.5S4 4.8 4 8c0 3.1 1.5 3 1.5 3h.9v-1.3s-.1-1.5 1.5-1.5h2.9c1.4 0 1.4-1.3 1.4-1.3V3.3s.2-1.3-2.3-1.3zm-1.6 1a.6.6 0 110 1.2.6.6 0 010-1.2z"
            fill="#3776AB"
          />
          <path
            d="M12.1 22c3.1 0 2.9-1.3 2.9-1.3l-.01-1.4h-2.9v-.4h5.4s2.5.3 2.5-2.9c0-3.1-1.5-3-1.5-3h-.9v1.3s.1 1.5-1.5 1.5h-2.9c-1.4 0-1.4 1.3-1.4 1.3v3.6s-.2 1.3 2.3 1.3zm1.6-1a.6.6 0 110-1.2.6.6 0 010 1.2z"
            fill="#FFD43B"
          />
        </svg>
      );

    case 'numpy':
      return (
        <svg {...props} viewBox="0 0 24 24">
          <path
            d="M3 6l9-4 9 4v12l-9 4-9-4V6z"
            stroke="#4DABCF"
            strokeWidth="1.5"
            strokeLinejoin="round"
          />
          <path d="M12 2v20M3 6l18 12M3 18L21 6" stroke="#4DABCF" strokeWidth="1" strokeOpacity="0.6" />
        </svg>
      );

    case 'pandas':
      return (
        <svg {...props} viewBox="0 0 24 24">
          <rect x="4" y="3" width="3" height="7" rx="1" fill="#150458" stroke="#E70488" strokeWidth="1.2" />
          <rect x="10.5" y="7" width="3" height="14" rx="1" fill="#150458" stroke="#E70488" strokeWidth="1.2" />
          <rect x="17" y="11" width="3" height="9" rx="1" fill="#150458" stroke="#E70488" strokeWidth="1.2" />
          <path d="M4 14h3M17 6h3" stroke="#E70488" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      );

    case 'data-processing':
      return (
        <svg {...props}>
          <path d="M4 7h16M7 12h10M10 17h4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
          <circle cx="8" cy="7" r="2" fill="#070709" stroke="currentColor" strokeWidth="1.4" />
          <circle cx="15" cy="12" r="2" fill="#070709" stroke="currentColor" strokeWidth="1.4" />
          <circle cx="12" cy="17" r="2" fill="#070709" stroke="currentColor" strokeWidth="1.4" />
        </svg>
      );

    case 'embeddings':
      return (
        <svg {...props}>
          <circle cx="6" cy="6" r="2.5" stroke="currentColor" strokeWidth="1.4" />
          <circle cx="18" cy="8" r="2" stroke="currentColor" strokeWidth="1.4" />
          <circle cx="12" cy="14" r="3" stroke="currentColor" strokeWidth="1.5" fill="currentColor" fillOpacity="0.15" />
          <circle cx="7" cy="19" r="1.5" stroke="currentColor" strokeWidth="1.4" />
          <circle cx="19" cy="18" r="2" stroke="currentColor" strokeWidth="1.4" />
          <path d="M8 7.5l2.5 4.5M16.5 9.5l-2.5 3M9 17.5l2-1.5M15 15.5l2.5 1.5" stroke="currentColor" strokeWidth="0.9" strokeDasharray="2 2" strokeOpacity="0.6" />
        </svg>
      );

    case 'vector-search':
      return (
        <svg {...props}>
          <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="1.5" />
          <path d="M16 16l5 5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
          <path d="M8 11h6M11 8v6" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
          <circle cx="11" cy="11" r="3" stroke="currentColor" strokeWidth="1" strokeDasharray="1.5 1.5" />
        </svg>
      );

    case 'pgvector':
      return (
        <svg {...props} viewBox="0 0 24 24">
          <ellipse cx="12" cy="5" rx="7" ry="2.5" stroke="#336791" strokeWidth="1.4" />
          <path d="M5 5v5c0 1.4 3.1 2.5 7 2.5s7-1.1 7-2.5V5" stroke="#336791" strokeWidth="1.4" />
          <path d="M5 10v5c0 1.4 3.1 2.5 7 2.5s7-1.1 7-2.5v-5" stroke="#336791" strokeWidth="1.4" />
          <path d="M12 17.5l4 4.5M12 22l4-4.5" stroke="#38bdf8" strokeWidth="1.6" strokeLinecap="round" />
        </svg>
      );

    case 'rag':
      return (
        <svg {...props}>
          <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" stroke="currentColor" strokeWidth="1.5" />
          <path d="M12 7l1.5 3 3.5.5-2.5 2.5.6 3.5-3.1-1.6L8.9 16.5l.6-3.5L7 10.5l3.5-.5L12 7z" fill="currentColor" fillOpacity="0.2" stroke="currentColor" strokeWidth="1.2" strokeLinejoin="round" />
        </svg>
      );

    case 'llm-integration':
      return (
        <svg {...props}>
          <path
            d="M12 2l2.4 6.6L21 11l-6.6 2.4L12 20l-2.4-6.6L3 11l6.6-2.4L12 2z"
            fill="currentColor"
            fillOpacity="0.18"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinejoin="round"
          />
          <circle cx="19" cy="4" r="1.5" fill="currentColor" />
          <circle cx="5" cy="19" r="1.5" fill="currentColor" />
        </svg>
      );

    case 'git':
      return (
        <svg {...props} viewBox="0 0 24 24">
          <circle cx="6" cy="6" r="2.5" stroke="#F05032" strokeWidth="1.5" fill="#F05032" fillOpacity="0.2" />
          <circle cx="6" cy="18" r="2.5" stroke="#F05032" strokeWidth="1.5" fill="#F05032" fillOpacity="0.2" />
          <circle cx="18" cy="9" r="2.5" stroke="#F05032" strokeWidth="1.5" fill="#F05032" fillOpacity="0.2" />
          <path d="M6 8.5v7M18 11.5v.5a5 5 0 0 1-5 5H6" stroke="#F05032" strokeWidth="1.6" strokeLinecap="round" />
        </svg>
      );

    case 'github':
      return (
        <svg {...props} viewBox="0 0 24 24" fill="currentColor">
          <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
        </svg>
      );

    case 'postman':
      return (
        <svg {...props} viewBox="0 0 24 24">
          <circle cx="12" cy="12" r="9.5" fill="#FF6C37" fillOpacity="0.15" stroke="#FF6C37" strokeWidth="1.4" />
          <path
            d="M5 12l14-5-5 14-2.5-5.5L5 12z"
            fill="#FF6C37"
            stroke="#FF6C37"
            strokeWidth="1.2"
            strokeLinejoin="round"
          />
        </svg>
      );

    case 'api-testing':
      return (
        <svg {...props}>
          <rect x="3" y="4" width="18" height="16" rx="3" stroke="currentColor" strokeWidth="1.5" />
          <path d="M7 12l3 3 7-7" stroke="#34d399" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      );

    case 'docker':
      return (
        <svg {...props} viewBox="0 0 24 24">
          <path
            d="M3 13.5C3 17 6 19 11 19c6 0 9-3 10-6-1.5 0-3-1-3.5-2 .5 0 2-1 2-2-1 0-2.5.5-3.5 1.5-.5-1.5-2-2.5-3.5-2.5-1 0-2 .5-2.5 1-1-1-2.5-1.5-4-1.5-2 0-3.5 1-4.5 2.5C4 10 3 11.5 3 13.5z"
            fill="#2496ED"
            fillOpacity="0.2"
            stroke="#2496ED"
            strokeWidth="1.5"
            strokeLinejoin="round"
          />
          <rect x="5" y="10" width="2" height="2" fill="#2496ED" />
          <rect x="8" y="10" width="2" height="2" fill="#2496ED" />
          <rect x="11" y="10" width="2" height="2" fill="#2496ED" />
          <rect x="8" y="7" width="2" height="2" fill="#2496ED" />
          <rect x="11" y="7" width="2" height="2" fill="#2496ED" />
        </svg>
      );

    case 'deployment':
      return (
        <svg {...props}>
          <path
            d="M4.5 16.5l3-3m0 0l4-4c1-1 3.5-1.5 5.5-1.5-.5 2-.5 4.5-1.5 5.5l-4 4m-4-4l-3 3M14 6l4 4"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <circle cx="5" cy="19" r="1.5" fill="currentColor" />
        </svg>
      );

    default:
      return (
        <svg {...props}>
          <circle cx="12" cy="12" r="8" stroke="currentColor" strokeWidth="1.5" />
          <circle cx="12" cy="12" r="3" fill="currentColor" />
        </svg>
      );
  }
}

