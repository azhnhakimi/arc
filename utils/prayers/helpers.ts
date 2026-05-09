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
