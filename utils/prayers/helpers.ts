import { type Zone } from "./types";

export function getNegeriOptions(zones: Zone[]): string[] {
  return [...new Set(zones.map((z) => z.negeri))];
}

export function getDaerahOptions(
  zones: Zone[],
  negeri: string | null,
): string[] {
  return zones.filter((z) => z.negeri === negeri).map((z) => z.daerah);
}

export function getJakimCode(
  zones: Zone[],
  negeri: string | null,
  daerah: string | null,
): string | undefined {
  return zones.find((z) => z.negeri === negeri && z.daerah === daerah)
    ?.jakimCode;
}

type RGB = { r: number; g: number; b: number };

function hexToRgb(hex: string): RGB {
  const cleaned = hex.replace("#", "");

  const full =
    cleaned.length === 3
      ? cleaned
          .split("")
          .map((c) => c + c)
          .join("")
      : cleaned;

  const num = parseInt(full, 16);

  return {
    r: (num >> 16) & 255,
    g: (num >> 8) & 255,
    b: num & 255,
  };
}

function rgbToHex({ r, g, b }: RGB): string {
  const toHex = (v: number) => v.toString(16).padStart(2, "0");
  return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
}

function mixWithWhite(color: RGB, factor: number): RGB {
  return {
    r: Math.round(color.r + (255 - color.r) * factor),
    g: Math.round(color.g + (255 - color.g) * factor),
    b: Math.round(color.b + (255 - color.b) * factor),
  };
}

export function getGradients(hex: string): string[] {
  const base = hexToRgb(hex);

  const isLight = base.r > 240 && base.g > 240 && base.b > 240;

  return Array.from({ length: 6 }, (_, i) => {
    const factor = i / 5;

    let mixed: RGB;

    if (isLight) {
      mixed = {
        r: Math.round(base.r * (1 - factor)),
        g: Math.round(base.g * (1 - factor)),
        b: Math.round(base.b * (1 - factor)),
      };
    } else {
      mixed = mixWithWhite(base, factor);
    }

    return rgbToHex(mixed);
  });
}

function getLuminance({ r, g, b }: RGB): number {
  const srgb = [r, g, b].map((v) => {
    const c = v / 255;
    return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
  });

  return 0.2126 * srgb[0] + 0.7152 * srgb[1] + 0.0722 * srgb[2];
}

export function getContrastTextColor(hex: string): "#000000" | "#ffffff" {
  const rgb = hexToRgb(hex);
  const luminance = getLuminance(rgb);

  return luminance > 0.179 ? "#000000" : "#ffffff";
}

export function getDailyPrayerCounts(logs: any[]) {
  const map: Record<string, number> = {};

  for (const log of logs) {
    if (!log.completed) continue;

    if (!map[log.date]) {
      map[log.date] = 0;
    }

    map[log.date] += 1;
  }

  return Object.entries(map).map(([date, count]) => ({
    date,
    count,
  }));
}

export function getGradientIndex(count: number, max: number) {
  const capped = Math.min(count, max - 1);
  return max - 1 - capped;
}

export function formatDate(date: Date) {
  return date.toISOString().split("T")[0];
}
