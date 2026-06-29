// ASHTON VALE ARCHIVES — LocalStorage Layer
// All keys namespaced under "ava_" to avoid collisions.

const Storage = (() => {
  const NS = "ava_";

  function key(k) { return NS + k; }

  function get(k, fallback = null) {
    try {
      const raw = localStorage.getItem(key(k));
      return raw !== null ? JSON.parse(raw) : fallback;
    } catch { return fallback; }
  }

  function set(k, v) {
    try { localStorage.setItem(key(k), JSON.stringify(v)); }
    catch(e) { console.warn("Storage write failed:", e); }
  }

  function getProgress() {
    return get("progress", {
      solvedCases: [],
      collectedObjects: [],
      recoveredFiles: [],
      visitedPages: [],
      timelineProgress: 0
    });
  }

  function saveProgress(progress) {
    set("progress", progress);
  }

  function isCaseSolved(caseId) {
    const p = getProgress();
    return p.solvedCases.includes(caseId);
  }

  function markCaseSolved(caseId, lorePage) {
    const p = getProgress();
    if (!p.solvedCases.includes(caseId)) {
      p.solvedCases.push(caseId);
    }
    if (lorePage && !p.recoveredFiles.includes(lorePage)) {
      p.recoveredFiles.push(lorePage);
    }
    saveProgress(p);
  }

  function addCollectible(id) {
    const p = getProgress();
    if (!p.collectedObjects.includes(id)) {
      p.collectedObjects.push(id);
    }
    saveProgress(p);
  }

  function hasCollectible(id) {
    const p = getProgress();
    return p.collectedObjects.includes(id);
  }

  function getStats() {
    const p = getProgress();
    return {
      casesSolved: p.solvedCases.length,
      objectsFound: p.collectedObjects.length,
      filesRecovered: p.recoveredFiles.length,
      timelineProgress: p.timelineProgress
    };
  }

  // ── VAULT HELPERS ────────────────────────────────────────────────────────

  function getVaultState(seasonId) {
    return get("vault_" + seasonId, {
      vaultOpened:   false,
      rewardClaimed: false,
      earnedBadges:  [],
      viewedBonuses: []
    });
  }

  function saveVaultState(seasonId, state) {
    set("vault_" + seasonId, state);
  }

  function isSeasonComplete(seasonId) {
    return get("seasonComplete_" + seasonId, false);
  }

  function isVaultOpen(seasonId) {
    return getVaultState(seasonId).vaultOpened;
  }

  return {
    get, set,
    getProgress, saveProgress,
    isCaseSolved, markCaseSolved,
    addCollectible, hasCollectible,
    getStats,
    getVaultState, saveVaultState, isSeasonComplete, isVaultOpen
  };
})();
