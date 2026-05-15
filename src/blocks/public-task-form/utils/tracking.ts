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
      JSON.stringify(hashes),
    );
  } catch (_e) {
    // ignore storage errors (private mode, etc.)
  }
}

export function getInitialHashes(pipelineId: number): string[] {
  return readStoredHashes(pipelineId);
}
