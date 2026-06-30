// ASHTON VALE ARCHIVES — Main Application
// Orchestrates song loading, form rendering, answer checking, and unlocks.

// ─────────────────────────────────────────────
// STREAMING MODAL
// ─────────────────────────────────────────────

// ─────────────────────────────────────────────
// LYRICS MODAL
// ─────────────────────────────────────────────

// ─────────────────────────────────────────────
// CASE NOTES MODAL
// ─────────────────────────────────────────────

function openCaseNotesModal() {
  const modal = document.getElementById("casenotes-modal");
  const body  = document.getElementById("casenotes-body");
  if (!modal || !body) return;

  if (!body.hasChildNodes() && currentSong && currentSong.caseNotes) {
    body.innerHTML = "";
    for (const section of currentSong.caseNotes) {
      const block = document.createElement("div");
      block.className = "cn-section";

      const heading = document.createElement("div");
      heading.className = "cn-heading";
      heading.innerHTML = `<span class="cn-icon">${section.icon}</span>${section.label}`;
      block.appendChild(heading);

      const list = document.createElement("ul");
      list.className = "cn-list";
      for (const entry of section.entries) {
        const li = document.createElement("li");
        li.className = "cn-entry";
        li.textContent = entry;
        list.appendChild(li);
      }
      block.appendChild(list);
      body.appendChild(block);
    }

    // Progress note at the bottom
    const confirmed = Checker.getConfirmedCount(currentSong.answers, currentSong.id);
    const total = Object.keys(currentSong.answers).length;
    const note = document.createElement("div");
    note.className = "cn-progress-note";
    note.innerHTML = `
      <span class="cn-progress-label">Archive Status</span>
      <span class="cn-progress-value">${confirmed} of ${total} details confirmed</span>
    `;
    body.appendChild(note);
  }

  modal.classList.remove("hidden");
  requestAnimationFrame(() => modal.classList.add("visible"));
}

function closeCaseNotesModal() {
  const modal = document.getElementById("casenotes-modal");
  if (!modal) return;
  modal.classList.remove("visible");
  setTimeout(() => modal.classList.add("hidden"), 280);
}

function openLyricsModal() {
  const modal = document.getElementById("lyrics-modal");
  const body  = document.getElementById("lyrics-body");
  if (!modal || !body) return;

  // Render lyrics from current song data if not already done
  if (!body.hasChildNodes() && currentSong && currentSong.lyrics) {
    body.innerHTML = "";
    for (const section of currentSong.lyrics) {
      const block = document.createElement("div");
      block.className = "lyrics-section lyrics-" + section.type;

      const labelEl = document.createElement("div");
      labelEl.className = "lyrics-section-label";
      labelEl.textContent = section.label;
      block.appendChild(labelEl);

      for (const line of section.lines) {
        const p = document.createElement("p");
        p.className = "lyrics-line";
        p.textContent = line;
        block.appendChild(p);
      }

      body.appendChild(block);
    }
  }

  modal.classList.remove("hidden");
  requestAnimationFrame(() => modal.classList.add("visible"));
}

function closeLyricsModal() {
  const modal = document.getElementById("lyrics-modal");
  if (!modal) return;
  modal.classList.remove("visible");
  setTimeout(() => modal.classList.add("hidden"), 280);
}

function openStreamingModal() {
  const modal = document.getElementById("streaming-modal");
  if (!modal) return;
  modal.classList.remove("hidden");
  requestAnimationFrame(() => modal.classList.add("visible"));
}

function closeStreamingModal() {
  const modal = document.getElementById("streaming-modal");
  if (!modal) return;
  modal.classList.remove("visible");
  setTimeout(() => modal.classList.add("hidden"), 280);
}

// Close on backdrop click
document.addEventListener("click", (e) => {
  if (e.target === document.getElementById("streaming-modal"))  closeStreamingModal();
  if (e.target === document.getElementById("lyrics-modal"))     closeLyricsModal();
  if (e.target === document.getElementById("casenotes-modal"))  closeCaseNotesModal();
});

// Close on Escape
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") {
    closeStreamingModal();
    closeLyricsModal();
    closeCaseNotesModal();
  }
});

// ─────────────────────────────────────────────
// Registry: add new songs here when they release
const SONG_REGISTRY = [SONG_001];

let currentSong = null;

// ─────────────────────────────────────────────
// INIT
// ─────────────────────────────────────────────

document.addEventListener("DOMContentLoaded", () => {
  const page = document.body.dataset.page;

  if (page === "investigation") {
    initInvestigationPage();
  } else if (page === "cabinet") {
    initCabinetPage();
  } else if (page === "home") {
    initHomePage();
  } else if (page === "store") {
    initStorePage();
  }

  updateProgressBadge();
  initModalClose();
});

// ─────────────────────────────────────────────
// HOME PAGE
// ─────────────────────────────────────────────

// ─────────────────────────────────────────────
// STORE PAGE
// ─────────────────────────────────────────────

function initStorePage() {
  const filterBtns = document.querySelectorAll(".filter-btn[data-filter]");
  filterBtns.forEach(btn => {
    btn.addEventListener("click", () => setFilter(btn.dataset.filter));
  });
}

function setFilter(category) {
  // Update active button
  document.querySelectorAll(".filter-btn[data-filter]").forEach(btn => {
    btn.classList.toggle("active", btn.dataset.filter === category);
  });

  // Show/hide cards
  const cards = document.querySelectorAll(".product-card");
  let visible = 0;
  cards.forEach(card => {
    const match = category === "all" || card.dataset.category === category;
    card.classList.toggle("hidden", !match);
    if (match) visible++;
  });

  const empty = document.getElementById("store-empty");
  if (empty) empty.classList.toggle("hidden", visible > 0);
}

function initHomePage() {
  const stats = Storage.getStats();

  // Reflect solved state on Case 001 card
  if (stats.casesSolved > 0) {
    const card = document.querySelector(".case-file-card.active .cf-status");
    if (card) {
      card.textContent = "✦ CLOSED";
      card.classList.remove("open");
      card.classList.add("solved-status");
    }
    const cta = document.querySelector(".cf-cta");
    if (cta) cta.textContent = "View Recovered File →";
  }

  // Season One complete state
  if (Storage.isSeasonComplete("season1") || Storage.isVaultOpen("season1")) {
    const heroCta = document.querySelector(".hero-cta-row");
    if (heroCta) {
      const existing = heroCta.querySelector("a[href='index.html']");
      if (existing) existing.textContent = "Season One — Revisit the Archive";
    }

    // Insert season complete banner if not already present
    const heroInner = document.querySelector(".hero-inner");
    if (heroInner && !document.getElementById("season-complete-banner")) {
      const banner = document.createElement("div");
      banner.id = "season-complete-banner";
      banner.style.cssText = [
        "margin-bottom:2rem",
        "padding:1rem 1.5rem",
        "border:1px solid rgba(142,196,125,0.2)",
        "background:rgba(142,196,125,0.04)",
        "text-align:center"
      ].join(";");
      banner.innerHTML = `
        <div style="font-size:0.6rem;letter-spacing:0.28em;text-transform:uppercase;color:rgba(142,196,125,0.5);margin-bottom:0.4rem;">Season Status</div>
        <div style="font-family:var(--font-header);font-size:1.1rem;letter-spacing:0.2em;color:rgba(142,196,125,0.75);text-transform:uppercase;margin-bottom:0.3rem;">SEASON ONE COMPLETE</div>
        <div style="font-size:0.7rem;letter-spacing:0.12em;color:rgba(201,169,122,0.3);">
          Archive Recovered &nbsp;·&nbsp; Vault Opened &nbsp;·&nbsp; Badges Earned &nbsp;·&nbsp; 100%
        </div>
      `;
      const tagline = heroInner.querySelector(".hero-tagline");
      if (tagline) heroInner.insertBefore(banner, tagline);
    }
  }
}

// ─────────────────────────────────────────────
// INVESTIGATION PAGE
// ─────────────────────────────────────────────

function initInvestigationPage() {
  const caseId = document.body.dataset.caseId || "001";
  currentSong = SONG_REGISTRY.find(s => s.id === caseId);
  if (!currentSong) return;

  renderCaseHeader(currentSong);
  renderInvestigationForm(currentSong);
  checkIfAlreadySolved(currentSong);
  renderEvidenceProgress(currentSong);

  document.getElementById("submit-btn").addEventListener("click", handleSubmit);
}

function renderCaseHeader(song) {
  const el = document.getElementById("case-status");
  if (el) {
    el.textContent = Storage.isCaseSolved(song.id) ? "CASE CLOSED" : "OPEN INVESTIGATION";
    if (Storage.isCaseSolved(song.id)) el.classList.add("solved");
  }
  const prog = document.getElementById("header-progress");
  if (prog) {
    const stats = Storage.getStats();
    const pct = stats.casesSolved > 0 ? Math.round((stats.casesSolved / SONG_REGISTRY.length) * 100) : 0;
    prog.textContent = pct + "%";
  }
}

function renderInvestigationForm(song) {
  const container = document.getElementById("fields-container");
  if (!container) return;
  container.innerHTML = "";

  for (const field of song.fields) {
    const group = document.createElement("div");
    group.className = "field-group";
    group.innerHTML = `
      <label class="field-label" for="field-${field.id}">
        <span class="field-number">◆</span> ${field.label.toUpperCase()}
      </label>
      <input
        type="text"
        id="field-${field.id}"
        name="${field.id}"
        class="field-input"
        placeholder="${field.placeholder}"
        autocomplete="off"
        spellcheck="false"
      />
    `;
    container.appendChild(group);
  }
}

function checkIfAlreadySolved(song) {
  if (Storage.isCaseSolved(song.id)) {
    // Show the lore immediately without animation
    showLoreInstant(song);
    lockForm();
    showSolvedBanner();
  }
}

// ─────────────────────────────────────────────
// SUBMIT HANDLER
// ─────────────────────────────────────────────

function handleSubmit() {
  const btn = document.getElementById("submit-btn");
  if (btn.disabled) return;

  const values = collectFormValues(currentSong);
  const result = Checker.checkAll(values, currentSong.answers, currentSong.id);

  if (result.passed) {
    triggerUnlockSequence(currentSong);
  } else {
    triggerFailSequence(result);
  }
}

function collectFormValues(song) {
  const values = {};
  for (const field of song.fields) {
    const el = document.getElementById("field-" + field.id);
    values[field.id] = el ? el.value : "";
  }
  return values;
}

// ─────────────────────────────────────────────
// FAIL SEQUENCE
// ─────────────────────────────────────────────

function triggerFailSequence(result) {
  const panel = document.getElementById("response-panel");
  const confirmed = result ? result.confirmed : 0;
  const total = result ? result.total : 7;

  // Build an evidence meter (no labels — just count of confirmed vs total)
  // Feels like the archive is "weighing" what was submitted
  const meterFill = Math.round((confirmed / total) * 100);

  panel.className = "response-panel fail visible";
  panel.innerHTML = `
    <div class="response-icon">✗</div>
    <p class="response-headline">The archive could not verify every detail.</p>
    <p class="response-sub">Some evidence may still be missing.</p>
    <p class="response-sub">Keep investigating.</p>
    <div class="evidence-meter" aria-label="Evidence confirmed">
      <div class="meter-bar">
        <div class="meter-fill" style="width: ${meterFill}%"></div>
      </div>
      <div class="meter-label">${confirmed} of ${total} details on record</div>
    </div>
  `;

  animateCabinet("searching");
  setTimeout(() => animateCabinet("closed"), 2200);
}

// ─────────────────────────────────────────────
// UNLOCK SEQUENCE
// ─────────────────────────────────────────────

function triggerUnlockSequence(song) {
  const btn = document.getElementById("submit-btn");
  btn.disabled = true;

  // Phase 1: Cabinet searching
  animateCabinet("searching");
  const panel = document.getElementById("response-panel");
  panel.className = "response-panel searching visible";
  panel.innerHTML = `<p class="response-headline">Cross-referencing archive...</p>`;

  setTimeout(() => {
    // Phase 2: Unlock animations
    animateCabinet("open");
    triggerSealBreak();
    triggerLanternGlow();

    panel.className = "response-panel success visible";
    panel.innerHTML = `
      <div class="response-icon unlock-icon">✦</div>
      <p class="response-headline">RECOVERED FILE ${song.lore.fileId}</p>
      <p class="response-sub">Evidence verified. Archive updated.</p>
    `;

    // Phase 3: Save progress
    Storage.markCaseSolved(song.id, song.lore.fileId);
    const isNew = Collectibles.awardCollectible(song.collectible.id);

    // Phase 4: Show collectible reward
    setTimeout(() => {
      if (isNew) showCollectibleReward(song.collectible);
    }, 800);

    // Phase 5: Typewriter lore
    setTimeout(() => {
      Lore.buildLorePage(song.lore);
      updateProgressBadge();
      renderCaseHeader(song);
    }, isNew ? 3200 : 1200);

  }, 2000);
}

function triggerSealBreak() {
  const seal = document.getElementById("wax-seal");
  if (seal) {
    seal.classList.add("breaking");
    setTimeout(() => seal.classList.add("broken"), 600);
  }
}

function triggerLanternGlow() {
  const lantern = document.getElementById("lantern-glow");
  if (lantern) lantern.classList.add("bright");
  document.body.classList.add("unlocked");
}

function animateCabinet(state) {
  const cabinet = document.getElementById("cabinet-anim");
  if (!cabinet) return;
  cabinet.className = "cabinet-anim " + state;
}

// ─────────────────────────────────────────────
// COLLECTIBLE REWARD OVERLAY
// ─────────────────────────────────────────────

function showCollectibleReward(collectible) {
  const overlay = document.getElementById("collectible-overlay");
  const content = document.getElementById("collectible-content");
  if (!overlay || !content) return;

  content.innerHTML = `
    <div class="reward-pre">NEW EVIDENCE RECOVERED</div>
    <div class="reward-symbol">${collectible.symbol}</div>
    <div class="reward-name">${collectible.name}</div>
    <div class="reward-divider">— — — — — — — —</div>
    <p class="reward-desc">${collectible.description}</p>
    <button class="reward-close" onclick="dismissReward()">ADD TO EVIDENCE CABINET</button>
  `;

  overlay.classList.remove("hidden");
  overlay.classList.add("visible");
}

function dismissReward() {
  const overlay = document.getElementById("collectible-overlay");
  if (overlay) {
    overlay.classList.remove("visible");
    setTimeout(() => overlay.classList.add("hidden"), 400);
  }

  // Start lore if not already started
  const lorePanel = document.getElementById("lore-panel");
  if (lorePanel && lorePanel.innerHTML.trim() === "") {
    Lore.buildLorePage(currentSong.lore);
  }
}

// ─────────────────────────────────────────────
// ALREADY SOLVED STATE
// ─────────────────────────────────────────────

function showLoreInstant(song) {
  const lorePanel = document.getElementById("lore-panel");
  if (!lorePanel) return;

  lorePanel.classList.remove("hidden");
  lorePanel.innerHTML = "";

  const header = document.createElement("div");
  header.className = "lore-header";
  header.innerHTML = `
    <div class="recovered-stamp">RECOVERED FILE ${song.lore.fileId}</div>
    <div class="lore-title">${song.lore.title}</div>
    <div class="lore-date">${song.lore.date}</div>
    <div class="lore-dept">${song.lore.department}</div>
  `;
  lorePanel.appendChild(header);

  const body = document.createElement("div");
  body.className = "lore-body";
  const sep = document.createElement("div");
  sep.className = "lore-separator";
  sep.textContent = "— — — — — — — — — — — — — — — —";
  body.appendChild(sep);

  for (const line of song.lore.lines) {
    const p = document.createElement("p");
    p.className = "lore-line";
    p.textContent = line.trim() ? line : " ";
    body.appendChild(p);
  }

  lorePanel.appendChild(body);

  const footer = document.createElement("div");
  footer.className = "lore-footer";
  footer.innerHTML = `<span class="lore-end-marker">[ FILE ENDS ]</span>`;
  lorePanel.appendChild(footer);

  if (song.lore.cta) {
    const ctaEl = document.createElement("div");
    ctaEl.className = "lore-cta";
    ctaEl.innerHTML = `
      <div class="lore-cta-inner">
        <p class="lore-cta-label">${song.lore.cta.label}</p>
        <p class="lore-cta-sub">${song.lore.cta.sub}</p>
        <a class="lore-cta-btn" href="${song.lore.cta.buttonUrl}" target="_blank" rel="noopener">
          ${song.lore.cta.buttonText}
        </a>
      </div>
    `;
    lorePanel.appendChild(ctaEl);
  }

  triggerLanternGlow();
}

function lockForm() {
  const inputs = document.querySelectorAll(".field-input");
  inputs.forEach(i => { i.disabled = true; i.classList.add("solved-input"); });
  const btn = document.getElementById("submit-btn");
  if (btn) btn.disabled = true;
}

function showSolvedBanner() {
  const panel = document.getElementById("response-panel");
  if (!panel) return;
  panel.className = "response-panel success visible";
  panel.innerHTML = `
    <div class="response-icon">✦</div>
    <p class="response-headline">RECOVERED FILE ${currentSong.lore.fileId}</p>
    <p class="response-sub">This case has been closed. Evidence archived.</p>
  `;
}

// ─────────────────────────────────────────────
// CABINET PAGE
// ─────────────────────────────────────────────

function initCabinetPage() {
  const container = document.getElementById("cabinet-grid");
  if (container) Collectibles.renderCabinet(container);
  renderCabinetStats();
}

function renderCabinetStats() {
  const stats = Storage.getStats();
  setEl("stat-objects", stats.objectsFound + " / 100");
  setEl("stat-mysteries", stats.casesSolved + " / 50");
  setEl("stat-files", stats.filesRecovered + " / 200");
  const tl = Math.round((stats.casesSolved / 50) * 100 * 2) / 100;
  setEl("stat-timeline", tl + "%");
  setEl("stat-archive", Math.round((stats.objectsFound / 100) * 100) + "%");
}

// ─────────────────────────────────────────────
// SHARED UTILITIES
// ─────────────────────────────────────────────

function renderEvidenceProgress(song) {
  if (Storage.isCaseSolved(song.id)) return;
  const confirmed = Checker.getConfirmedCount(song.answers, song.id);
  const total = Object.keys(song.answers).length;
  if (confirmed === 0) return;

  // Show a subtle persistent meter above the submit button
  const wrap = document.querySelector(".submit-wrap");
  if (!wrap) return;
  const existing = document.getElementById("persistent-meter");
  if (existing) existing.remove();

  const meter = document.createElement("div");
  meter.id = "persistent-meter";
  meter.className = "evidence-meter";
  const pct = Math.round((confirmed / total) * 100);
  meter.innerHTML = `
    <div class="meter-bar">
      <div class="meter-fill" style="width: ${pct}%"></div>
    </div>
    <div class="meter-label">${confirmed} of ${total} details on record — keep investigating</div>
  `;
  wrap.parentNode.insertBefore(meter, wrap);
}

function updateProgressBadge() {
  const stats = Storage.getStats();
  const badge = document.getElementById("nav-progress");
  if (badge) badge.textContent = stats.casesSolved + " solved";
}

function setEl(id, text) {
  const el = document.getElementById(id);
  if (el) el.textContent = text;
}

function initModalClose() {
  const modal = document.getElementById("object-modal");
  if (!modal) return;
  modal.addEventListener("click", (e) => {
    if (e.target === modal) Collectibles.closeDetail();
  });
  const closeBtn = modal.querySelector(".modal-close");
  if (closeBtn) closeBtn.addEventListener("click", Collectibles.closeDetail);
}
