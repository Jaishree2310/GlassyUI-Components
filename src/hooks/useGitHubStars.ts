import { useState, useEffect } from 'react';

const CACHE_KEY = 'gh_stars_glassyui';
const CACHE_TTL = 60 * 60 * 1000; // 1 hour

function formatStars(n: number): string {
  if (n >= 1000) return (n / 1000).toFixed(1).replace(/\.0$/, '') + 'k';
  return String(n);
}

export function useGitHubStars(): string {
  const [stars, setStars] = useState<string>(() => {
    try {
      const cached = localStorage.getItem(CACHE_KEY);
      if (cached) {
        const { value, ts } = JSON.parse(cached);
        if (Date.now() - ts < CACHE_TTL) return formatStars(value);
      }
    } catch {}
    return '…';
  });

  useEffect(() => {
    let cancelled = false;
    const cached = localStorage.getItem(CACHE_KEY);
    if (cached) {
      try {
        const { value, ts } = JSON.parse(cached);
        if (Date.now() - ts < CACHE_TTL) {
          setStars(formatStars(value));
          return;
        }
      } catch {}
    }

    fetch('https://api.github.com/repos/Jaishree2310/GlassyUI-Components')
      .then(r => r.json())
      .then(data => {
        if (cancelled) return;
        const count: number = data.stargazers_count ?? 0;
        localStorage.setItem(
          CACHE_KEY,
          JSON.stringify({ value: count, ts: Date.now() }),
        );
        setStars(formatStars(count));
      })
      .catch(() => {});

    return () => {
      cancelled = true;
    };
  }, []);

  return stars;
}
