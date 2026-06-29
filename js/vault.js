// ASTEN VALE ARCHIVES — Season Vault Logic
// Drives vault.html. Reads from vault-config.js and storage.js.

(function () {
  "use strict";

  // ── AUDIO ──────────────────────────────────────────────────────────────────

  let audioCtx = null;

  function getAudioCtx() {
    if (!audioCtx) {
      audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    }
    return audioCtx;
  }

  function playMetallicClick() {
    try {
      const ctx = getAudioCtx();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      const filter = ctx.createBiquadFilter();
      filter.type = "bandpass";
      filter.frequency.value = 1200;
      filter.Q.value = 8;
      osc.connect(filter);
      filter.connect(gain);
      gain.connect(ctx.destination);
      osc.type = "sawtooth";
      osc.frequency.setValueAtTime(900, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(180, ctx.currentTime + 0.12);
      gain.gain.setValueAtTime(0.25, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.25);
      osc.start(ctx.currentTime);
      osc.stop(ctx.currentTime + 0.25);
    } catch (e) {}
  }

  function playVaultUnlock() {
    try {
      const ctx = getAudioCtx();
      const now = ctx.currentTime;

      // Low rumble
      const rumble = ctx.createOscillator();
      const rumbleGain = ctx.createGain();
      rumble.type = "sawtooth";
      rumble.frequency.value = 55;
      rumbleGain.gain.setValueAtTime(0, now);
      rumbleGain.gain.linearRampToValueAtTime(0.12, now + 1.2);
      rumbleGain.gain.linearRampToValueAtTime(0.06, now + 4);
      rumbleGain.gain.linearRampToValueAtTime(0, now + 6);
      rumble.connect(rumbleGain);
      rumbleGain.connect(ctx.destination);
      rumble.start(now);
      rumble.stop(now + 6);

      // Metallic ring
      const ring = ctx.createOscillator();
      const ringGain = ctx.createGain();
      ring.type = "sine";
      ring.frequency.value = 330;
      ringGain.gain.setValueAtTime(0, now + 0.8);
      ringGain.gain.linearRampToValueAtTime(0.35, now + 1.2);
      ringGain.gain.exponentialRampToValueAtTime(0.001, now + 5);
      ring.connect(ringGain);
      ringGain.connect(ctx.destination);
      ring.start(now + 0.8);
      ring.stop(now + 5);

      // Higher harmonic shimmer
      const shimmer = ctx.createOscillator();
      const shimmerGain = ctx.createGain();
      shimmer.type = "sine";
      shimmer.frequency.value = 660;
      shimmerGain.gain.setValueAtTime(0, now + 1);
      shimmerGain.gain.linearRampToValueAtTime(0.15, now + 1.5);
      shimmerGain.gain.exponentialRampToValueAtTime(0.001, now + 4);
      shimmer.connect(shimmerGain);
      shimmerGain.connect(ctx.destination);
      shimmer.start(now + 1);
      shimmer.stop(now + 4);

      // Ambient pad (soft wind)
      for (let i = 0; i < 3; i++) {
        const pad = ctx.createOscillator();
        const padGain = ctx.createGain();
        pad.type = "sine";
        pad.frequency.value = [110, 165, 220][i];
        padGain.gain.setValueAtTime(0, now + 2);
        padGain.gain.linearRampToValueAtTime(0.05, now + 3.5);
        padGain.gain.linearRampToValueAtTime(0, now + 8);
        pad.connect(padGain);
        padGain.connect(ctx.destination);
        pad.start(now + 2);
        pad.stop(now + 8);
      }
    } catch (e) {}
  }

  function playEmberAmbient() {
    try {
      const ctx = getAudioCtx();
      const now = ctx.currentTime;
      for (let i = 0; i < 4; i++) {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = "sine";
        osc.frequency.value = [82, 110, 138, 165][i];
        gain.gain.setValueAtTime(0, now + i * 0.4);
        gain.gain.linearRampToValueAtTime(0.06, now + i * 0.4 + 1.5);
        gain.gain.linearRampToValueAtTime(0, now + i * 0.4 + 6);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(now + i * 0.4);
        osc.stop(now + i * 0.4 + 6);
      }
    } catch (e) {}
  }

  // ── STORAGE HELPERS ────────────────────────────────────────────────────────

  function getVaultState(seasonId) {
    return Storage.get("vault_" + seasonId, {
      vaultOpened: false,
      rewardClaimed: false,
      earnedBadges: [],
      viewedBonuses: []
    });
  }

  function saveVaultState(seasonId, state) {
    Storage.set("vault_" + seasonId, state);
  }

  function markVaultOpened(seasonId) {
    const state = getVaultState(seasonId);
    state.vaultOpened = true;
    state.rewardClaimed = true;
    const cfg = SEASONS_CONFIG.find(s => s.id === seasonId);
    if (cfg) state.earnedBadges = cfg.badges.map(b => b.id);
    saveVaultState(seasonId, state);
    Storage.set("seasonComplete_" + seasonId, true);
  }

  function isBadgeEarned(seasonId, badgeId) {
    return getVaultState(seasonId).earnedBadges.includes(badgeId);
  }

  // ── PARTICLE SYSTEM ───────────────────────────────────────────────────────

  function spawnParticles(container, count) {
    const symbols = ["", "", "✧", "·", "—", "○"];
    for (let i = 0; i < count; i++) {
      const p = document.createElement("span");
      p.className = "vault-particle";
      p.textContent = symbols[Math.floor(Math.random() * symbols.length)];
      p.style.cssText = [
        `left: ${Math.random() * 100}%`,
        `animation-delay: ${(Math.random() * 4).toFixed(2)}s`,
        `animation-duration: ${(3 + Math.random() * 5).toFixed(2)}s`,
        `font-size: ${(0.5 + Math.random() * 1.2).toFixed(2)}rem`,
        `opacity: ${(0.1 + Math.random() * 0.5).toFixed(2)}`
      ].join(";");
      container.appendChild(p);
    }
  }

  function spawnRewardParticles(container, count) {
    const items = ["📄", "📋", "✧", "·", "○", "—", "◆", "░"];
    for (let i = 0; i < count; i++) {
      const p = document.createElement("span");
      p.className = "reward-particle";
      p.textContent = items[Math.floor(Math.random() * items.length)];
      p.style.cssText = [
        `left: ${Math.random() * 100}%`,
        `animation-delay: ${(Math.random() * 3).toFixed(2)}s`,
        `animation-duration: ${(4 + Math.random() * 6).toFixed(2)}s`,
        `font-size: ${(0.6 + Math.random() * 1.4).toFixed(2)}rem`
      ].join(";");
      container.appendChild(p);
    }
  }

  // ── TYPEWRITER ────────────────────────────────────────────────────────────

  function typewriter(el, text, speed, onDone) {
    let i = 0;
    el.textContent = "";
    const interval = setInterval(() => {
      if (i < text.length) {
        el.textContent += text[i++];
      } else {
        clearInterval(interval);
        if (onDone) onDone();
      }
    }, speed);
    return interval;
  }

  function typewriterLines(el, lines, speed, lineGap, onDone) {
    let lineIndex = 0;
    el.innerHTML = "";

    function nextLine() {
      if (lineIndex >= lines.length) {
        if (onDone) onDone();
        return;
      }
      const line = lines[lineIndex++];
      const p = document.createElement("p");
      p.className = "reward-text-line" + (line === "" ? " reward-text-gap" : "");
      el.appendChild(p);

      if (line === "") {
        setTimeout(nextLine, lineGap);
        return;
      }
      typewriter(p, line, speed, () => setTimeout(nextLine, lineGap));
    }

    nextLine();
  }

  // ── DIGIT SLOT REVEAL ─────────────────────────────────────────────────────

  function revealDigitSlot(slot, digit, animated) {
    if (animated) {
      slot.classList.add("revealing");
      setTimeout(() => {
        slot.textContent = String(digit).padStart(2, "0");
        slot.classList.remove("revealing");
        slot.classList.add("revealed");
      }, 400);
    } else {
      slot.textContent = String(digit).padStart(2, "0");
      slot.classList.add("revealed");
    }
  }

  // ── VAULT DOOR ANIMATION ──────────────────────────────────────────────────

  function animateVaultOpening(onComplete) {
    const door = document.getElementById("vault-door");
    const wheel = document.getElementById("vault-wheel");
    const bolts = document.querySelectorAll(".vault-bolt");
    const interior = document.getElementById("vault-interior");
    const dustEl = document.getElementById("vault-dust");

    if (!door || !wheel) { if (onComplete) onComplete(); return; }

    // Step 1: Wheel spins
    wheel.classList.add("spinning");

    // Step 2: Bolts retract
    setTimeout(() => {
      bolts.forEach((b, i) => {
        setTimeout(() => b.classList.add("retracted"), i * 150);
      });
    }, 800);

    // Step 3: Door swings open
    setTimeout(() => {
      wheel.classList.remove("spinning");
      door.classList.add("opening");
      if (interior) interior.classList.add("visible");
    }, 2200);

    // Step 4: Dust falls
    setTimeout(() => {
      if (dustEl) spawnParticles(dustEl, 40);
    }, 2400);

    // Step 5: Done
    setTimeout(() => {
      if (onComplete) onComplete();
    }, 3800);
  }

  // ── BADGE MODAL ───────────────────────────────────────────────────────────

  function openBadgeModal(badge) {
    const overlay = document.getElementById("badge-modal");
    const content = document.getElementById("badge-modal-content");
    if (!overlay || !content) return;

    content.innerHTML = `
      <button class="badge-modal-close" id="badge-modal-close">✕ CLOSE</button>
      <div class="badge-modal-symbol" style="color:${badge.color}">${badge.symbol}</div>
      <div class="badge-modal-name">${badge.name}</div>
      <div class="badge-modal-divider">— — — — — —</div>
      <p class="badge-modal-desc">${badge.description}</p>
    `;

    overlay.classList.remove("hidden");
    requestAnimationFrame(() => overlay.classList.add("visible"));

    document.getElementById("badge-modal-close").addEventListener("click", () => {
      overlay.classList.remove("visible");
      setTimeout(() => overlay.classList.add("hidden"), 280);
    });

    overlay.addEventListener("click", (e) => {
      if (e.target === overlay) {
        overlay.classList.remove("visible");
        setTimeout(() => overlay.classList.add("hidden"), 280);
      }
    }, { once: true });
  }

  // ── BONUS REWARD MODAL ────────────────────────────────────────────────────

  function openBonusModal(bonus) {
    const overlay = document.getElementById("bonus-modal");
    const content = document.getElementById("bonus-modal-content");
    if (!overlay || !content) return;

    content.innerHTML = `
      <button class="badge-modal-close" id="bonus-modal-close">✕ CLOSE</button>
      <div class="badge-modal-symbol">${bonus.symbol}</div>
      <div class="badge-modal-name">${bonus.name}</div>
      <div class="badge-modal-divider">— — — — — —</div>
      <p class="badge-modal-desc">${bonus.description}</p>
      <div class="bonus-modal-content-text">${bonus.content}</div>
    `;

    overlay.classList.remove("hidden");
    requestAnimationFrame(() => overlay.classList.add("visible"));

    document.getElementById("bonus-modal-close").addEventListener("click", () => {
      overlay.classList.remove("visible");
      setTimeout(() => overlay.classList.add("hidden"), 280);
    });

    overlay.addEventListener("click", (e) => {
      if (e.target === overlay) {
        overlay.classList.remove("visible");
        setTimeout(() => overlay.classList.add("hidden"), 280);
      }
    }, { once: true });
  }

  // ── FINAL REWARD POPUP ────────────────────────────────────────────────────

  function showRewardPopup(season) {
    const overlay = document.getElementById("reward-overlay");
    if (!overlay) return;

    const particleContainer = overlay.querySelector(".reward-particles");
    if (particleContainer) spawnRewardParticles(particleContainer, 50);

    overlay.classList.remove("hidden");
    requestAnimationFrame(() => overlay.classList.add("visible"));

    playEmberAmbient();

    const headerEl = overlay.querySelector(".reward-header");
    const subEl = overlay.querySelector(".reward-subheader");
    const textEl = overlay.querySelector(".reward-body-text");
    const vaultFileEl = overlay.querySelector(".reward-vault-file");
    const statsEl = overlay.querySelector(".reward-stats");
    const badgesEl = overlay.querySelector(".reward-badges");
    const closeBtn = overlay.querySelector(".reward-close-btn");

    if (closeBtn) {
      closeBtn.classList.add("hidden");
    }

    // Staggered reveals
    setTimeout(() => {
      if (headerEl) {
        headerEl.classList.add("visible");
        typewriter(headerEl, "CONGRATULATIONS", 60);
      }
    }, 600);

    setTimeout(() => {
      if (subEl) {
        subEl.classList.add("visible");
        typewriter(subEl, "SEASON ONE COMPLETE", 55);
      }
    }, 1800);

    setTimeout(() => {
      if (textEl) {
        textEl.classList.add("visible");
        typewriterLines(textEl, season.completionText, 30, 200);
      }
    }, 3000);

    setTimeout(() => {
      if (vaultFileEl) {
        vaultFileEl.classList.add("visible");
      }
    }, 6500);

    setTimeout(() => {
      if (statsEl) {
        statsEl.classList.add("visible");
        renderRewardStats(statsEl, season);
      }
    }, 7200);

    setTimeout(() => {
      if (badgesEl) {
        badgesEl.classList.add("visible");
        renderRewardBadges(badgesEl, season);
      }
    }, 8000);

    setTimeout(() => {
      if (closeBtn) closeBtn.classList.remove("hidden");
    }, 9000);

    if (closeBtn) {
      closeBtn.addEventListener("click", () => {
        overlay.classList.remove("visible");
        setTimeout(() => overlay.classList.add("hidden"), 500);
      });
    }
  }

  function renderRewardStats(container, season) {
    const stats = Storage.getStats();
    const vaultState = getVaultState(season.id);
    const rows = [
      ["Season One Completed", "12 / 12 Cases"],
      ["Recovered Files",       "100%"],
      ["Evidence Cabinet",      "Complete"],
      ["Mysteries Solved",      "12"],
      ["Archive Progress",      "100%"],
      ["Vault Status",          "OPEN"]
    ];
    container.innerHTML = rows.map(([label, value]) =>
      `<div class="reward-stat-row">
        <span class="reward-stat-label">${label}</span>
        <span class="reward-stat-value">${value}</span>
      </div>`
    ).join("");
  }

  function renderRewardBadges(container, season) {
    container.innerHTML = `<div class="reward-badges-label">BADGES EARNED</div>
      <div class="reward-badges-grid">
        ${season.badges.map(b => `
          <div class="reward-badge" data-badge-id="${b.id}" style="--badge-color:${b.color}">
            <div class="reward-badge-symbol">${b.symbol}</div>
            <div class="reward-badge-name">${b.name}</div>
          </div>
        `).join("")}
      </div>`;

    container.querySelectorAll(".reward-badge").forEach(el => {
      el.addEventListener("click", () => {
        const badge = season.badges.find(b => b.id === el.dataset.badgeId);
        if (badge) openBadgeModal(badge);
      });
    });
  }

  // ── MAIN VAULT PAGE RENDER ────────────────────────────────────────────────

  function buildComboDisplay(season, solvedCases) {
    const container = document.getElementById("vault-combo-display");
    if (!container) return;

    container.innerHTML = "";
    const label = document.createElement("div");
    label.className = "combo-label";
    label.textContent = "VAULT COMBINATION";
    container.appendChild(label);

    const slots = document.createElement("div");
    slots.className = "combo-slots";

    season.cases.forEach((c, i) => {
      const slot = document.createElement("div");
      slot.className = "digit-slot";
      slot.setAttribute("data-index", i);
      slot.setAttribute("data-case", c.id);
      slot.setAttribute("title", `Case ${c.id}`);

      if (solvedCases.includes(c.id)) {
        slot.textContent = String(season.digits[i]).padStart(2, "0");
        slot.classList.add("revealed");
      } else {
        slot.textContent = "□";
      }

      slots.appendChild(slot);
    });

    container.appendChild(slots);

    const progress = document.createElement("div");
    progress.className = "combo-progress";
    progress.textContent = `${solvedCases.length} / ${season.totalCases} Evidence Recovered`;
    container.appendChild(progress);
  }

  function buildBonusRewards(season, opened) {
    const container = document.getElementById("vault-bonuses");
    if (!container) return;

    if (!opened) {
      container.classList.add("hidden");
      return;
    }

    container.classList.remove("hidden");

    const heading = document.createElement("div");
    heading.className = "bonus-section-heading";
    heading.textContent = "RECOVERED VAULT CONTENTS";
    container.appendChild(heading);

    const grid = document.createElement("div");
    grid.className = "bonus-grid";

    season.bonusRewards.forEach((bonus, i) => {
      const card = document.createElement("div");
      card.className = "bonus-card";
      card.style.animationDelay = `${i * 0.1}s`;
      card.innerHTML = `
        <div class="bonus-symbol">${bonus.symbol}</div>
        <div class="bonus-name">${bonus.name}</div>
        <div class="bonus-desc">${bonus.description}</div>
      `;
      card.addEventListener("click", () => openBonusModal(bonus));
      grid.appendChild(card);
    });

    container.appendChild(grid);
  }

  function buildBadgesSection(season, opened) {
    const container = document.getElementById("vault-badges");
    if (!container) return;

    if (!opened) {
      container.classList.add("hidden");
      return;
    }

    container.classList.remove("hidden");

    const heading = document.createElement("div");
    heading.className = "bonus-section-heading";
    heading.textContent = "EARNED BADGES";
    container.appendChild(heading);

    const grid = document.createElement("div");
    grid.className = "vault-badges-grid";

    season.badges.forEach((badge, i) => {
      const card = document.createElement("div");
      card.className = "vault-badge-card";
      card.style.setProperty("--badge-color", badge.color);
      card.style.animationDelay = `${i * 0.15}s`;
      card.innerHTML = `
        <div class="vault-badge-symbol">${badge.symbol}</div>
        <div class="vault-badge-name">${badge.name}</div>
      `;
      card.addEventListener("click", () => openBadgeModal(badge));
      grid.appendChild(card);
    });

    container.appendChild(grid);
  }

  function buildSeasonTwoTeaser(container) {
    if (!container) return;
    container.innerHTML = `
      <div class="s2-teaser">
        <div class="s2-folder-label">Season Two</div>
        <div class="s2-status">CLASSIFIED</div>
        <div class="s2-tagline">The story isn't over.</div>
      </div>
    `;
  }

  function buildPlayerStats(season, solvedCount, vaultState) {
    const container = document.getElementById("vault-player-stats");
    if (!container || !vaultState.vaultOpened) {
      if (container) container.classList.add("hidden");
      return;
    }

    container.classList.remove("hidden");
    container.innerHTML = `
      <div class="player-stats-heading">INVESTIGATOR RECORD — SEASON ONE</div>
      <div class="player-stats-grid">
        <div class="pstat"><span class="pstat-label">Season Completed</span><span class="pstat-value">12 / 12 Cases</span></div>
        <div class="pstat"><span class="pstat-label">Recovered Files</span><span class="pstat-value">100%</span></div>
        <div class="pstat"><span class="pstat-label">Evidence Cabinet</span><span class="pstat-value">Complete</span></div>
        <div class="pstat"><span class="pstat-label">Mysteries Solved</span><span class="pstat-value">12</span></div>
        <div class="pstat"><span class="pstat-label">Archive Progress</span><span class="pstat-value">100%</span></div>
        <div class="pstat"><span class="pstat-label">Vault Status</span><span class="pstat-value vault-open-stat">OPEN</span></div>
      </div>
    `;
  }

  // ── INIT ──────────────────────────────────────────────────────────────────

  function initVaultPage() {
    const season = SEASONS_CONFIG[0];
    if (!season) return;

    const progress = Storage.getProgress();
    const solvedCases = progress.solvedCases || [];
    const vaultState = getVaultState(season.id);
    const allSolved = solvedCases.length >= season.totalCases;

    // Update status display
    const statusEl = document.getElementById("vault-status-value");
    const progressEl = document.getElementById("vault-progress-text");

    if (statusEl) statusEl.textContent = vaultState.vaultOpened ? "OPEN" : "LOCKED";
    if (progressEl) progressEl.textContent = `${solvedCases.length} / ${season.totalCases} Evidence Recovered`;

    if (vaultState.vaultOpened) {
      document.getElementById("vault-door")?.classList.add("already-open");
      document.getElementById("vault-interior")?.classList.add("visible");
      document.querySelectorAll(".vault-bolt").forEach(b => b.classList.add("retracted"));
      if (statusEl) {
        statusEl.textContent = "OPEN";
        statusEl.classList.add("status-open");
      }
    }

    // Ambient dust
    const dustEl = document.getElementById("vault-dust");
    if (dustEl) spawnParticles(dustEl, 18);

    // Build combination display
    buildComboDisplay(season, solvedCases);

    // Build unlocked sections
    buildBonusRewards(season, vaultState.vaultOpened);
    buildBadgesSection(season, vaultState.vaultOpened);
    buildPlayerStats(season, solvedCases.length, vaultState);

    // Season Two teaser
    const s2Container = document.getElementById("season-two-teaser");
    buildSeasonTwoTeaser(s2Container);

    // If all cases solved and vault not yet opened — trigger opening sequence
    if (allSolved && !vaultState.vaultOpened) {
      setTimeout(() => triggerVaultOpening(season), 1800);
    }

    // View-reward button for already-opened vault
    const viewRewardBtn = document.getElementById("view-reward-btn");
    if (viewRewardBtn) {
      if (vaultState.vaultOpened) {
        viewRewardBtn.classList.remove("hidden");
        viewRewardBtn.addEventListener("click", () => showRewardPopup(season));
      } else {
        viewRewardBtn.classList.add("hidden");
      }
    }
  }

  function triggerVaultOpening(season) {
    playVaultUnlock();

    animateVaultOpening(() => {
      // Mark opened in storage
      markVaultOpened(season.id);

      // Rebuild sections now that vault is opened
      const solvedCases = Storage.getProgress().solvedCases || [];
      buildBonusRewards(season, true);
      buildBadgesSection(season, true);
      buildPlayerStats(season, solvedCases.length, getVaultState(season.id));

      const statusEl = document.getElementById("vault-status-value");
      if (statusEl) {
        statusEl.textContent = "OPEN";
        statusEl.classList.add("status-open");
      }

      const viewRewardBtn = document.getElementById("view-reward-btn");
      if (viewRewardBtn) viewRewardBtn.classList.remove("hidden");

      // Show reward popup after a short pause
      setTimeout(() => showRewardPopup(season), 800);
    });
  }

  // ── BOOT ──────────────────────────────────────────────────────────────────

  document.addEventListener("DOMContentLoaded", () => {
    if (document.body.dataset.page === "vault") {
      initVaultPage();
    }
  });

})();
