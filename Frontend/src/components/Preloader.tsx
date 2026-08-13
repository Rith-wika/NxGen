import { useNetworkStatus } from "@/hooks/useNetworkStatus";

interface PreloaderProps {
  /** Optional loading state override */
  isLoading?: boolean;
  /** Time in ms before showing loader (default: 1000ms) */
  threshold?: number;
}

export const Preloader = ({ isLoading: forcedLoading, threshold = 1000 }: PreloaderProps) => {
  const { isLoading, isSlowConnection } = useNetworkStatus(threshold);

  // Only show if explicitly set to loading or if we detect slow loading
  if (!forcedLoading && (!isLoading || !isSlowConnection)) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-background">
      <div className="text-center space-y-6">
        {/* Open Book SVG - outline with animated fill */}
        <div className="w-40 h-28 mx-auto text-primary">
          <svg
            viewBox="0 0 200 120"
            xmlns="http://www.w3.org/2000/svg"
            role="img"
            aria-labelledby="bookTitle bookDesc"
            className="w-full h-full"
            style={{ display: "block" }}
          >
            <title id="bookTitle">Loading</title>
            <desc id="bookDesc">An open book whose pages are being filled while the site loads.</desc>
            <defs>
              <linearGradient id="g1" x1="0" x2="0" y1="0" y2="1">
                <stop offset="0%" stopColor="var(--c1, #60a5fa)" />
                <stop offset="100%" stopColor="var(--c2, #34d399)" />
              </linearGradient>
            </defs>

            {/* Fill group - scaleY animated from bottom to top to simulate filling */}
            <g className="book-fill" style={{ transformOrigin: "center bottom", transformBox: "fill-box" }}>
              {/* Left page fill */}
              <path
                d="M10 30 C40 10 90 10 100 30 L100 95 L10 95 Z"
                fill="url(#g1)"
                className="left-fill"
              />
              {/* Right page fill */}
              <path
                d="M190 30 C160 10 110 10 100 30 L100 95 L190 95 Z"
                fill="url(#g1)"
                className="right-fill"
              />
            </g>

            {/* Outline on top */}
            <path
              d="M10 30 C40 10 90 10 100 30 C110 10 160 10 190 30 L190 95 L100 95 L10 95 Z"
              fill="none"
              stroke="currentColor"
              strokeWidth="3"
              strokeLinejoin="round"
              strokeLinecap="round"
            />

            {/* Center spine */}
            <path d="M100 30 L100 95" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          </svg>
        </div>

        {/* <div className="space-y-2">
          <h2 className="text-2xl font-bold gradient-text">Loading Academy</h2>
        </div> */}
      </div>

      <style>{`
        /* animate the fill by scaling the fill group on Y axis up and down */
        .book-fill {
          transform: scaleY(0);
          animation: fillUpDown 2s ease-in-out infinite;
          transform-origin: center bottom;
        }

        @keyframes fillUpDown {
          0% {
            transform: scaleY(0);
            opacity: 0.9;
          }
          50% {
            transform: scaleY(1);
            opacity: 1;
          }
          100% {
            transform: scaleY(0);
            opacity: 0.9;
          }
        }

        /* subtle float for the SVG container */
        .book-float {
          animation: float 3s ease-in-out infinite;
        }

        @keyframes float {
          0% { transform: translateY(0); }
          50% { transform: translateY(-6px); }
          100% { transform: translateY(0); }
        }
      `}</style>
    </div>
  );
};
