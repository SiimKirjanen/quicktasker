export const MAX_TRACKED = 10;

function trackStorageKey(pipelineId: number): string {
  return `wpqt_pub_track_${pipelineId}`;
}

export function readStoredHashes(pipelineId: number): string[] {
  try {
    const raw = window.localStorage.getItem(trackStorageKey(pipelineId));
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch (_e) {
    return [];
  }
}

export function writeStoredHashes(pipelineId: number, hashes: string[]): void {
  try {
    window.localStorage.setItem(
      trackStorageKey(pipelineId),
      JSON.stringify(hashes.slice(0, MAX_TRACKED)),
    );
  } catch (_e) {
    // ignore storage errors (private mode, etc.)
  }
}

export function getInitialHashes(pipelineId: number): string[] {
  const stored = readStoredHashes(pipelineId);
  try {
    const params = new URLSearchParams(window.location.search);
    const fromUrl = params.get("wpqt_track");
    if (fromUrl && !stored.includes(fromUrl)) {
      const merged = [fromUrl, ...stored];
      writeStoredHashes(pipelineId, merged);
      return merged.slice(0, MAX_TRACKED);
    }
  } catch (_e) {
    // ignore
  }
  return stored;
}
