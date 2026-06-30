// ASHTON VALE ARCHIVES — Collectible Evidence System
// Renders the Evidence Cabinet and individual object cards

const Collectibles = (() => {

  // Master registry — add entries as new songs are released
  const REGISTRY = {
    rusted_lantern: {
      id: "rusted_lantern",
      name: "Rusted Lantern",
      symbol: "🪔",
      description: "Recovered from Black Pine Road near Mile Marker 17. Found still burning after an estimated 36 hours. No owner ever claimed it.",
      discovered: "Case File 001",
      firstAppearance: "The Lantern at Black Pine",
      connectedSongs: ["001"],
      unknownInfo: "Why was it still burning? Who lit it — and why did they leave?"
    }
    // Future entries added here as songs release
  };

  function awardCollectible(id) {
    if (Storage.hasCollectible(id)) return false;
    Storage.addCollectible(id);
    return true;
  }

  function renderCabinet(containerEl) {
    const progress = Storage.getProgress();
    const collected = progress.collectedObjects;

    containerEl.innerHTML = "";

    // Render all known collectibles — greyed out if not yet earned
    const allIds = Object.keys(REGISTRY);

    for (const id of allIds) {
      const item = REGISTRY[id];
      const earned = collected.includes(id);
      const card = buildCard(item, earned);
      containerEl.appendChild(card);
    }

    // Locked placeholders for unearned mystery items
    const unknownCount = Math.max(0, 10 - allIds.length);
    for (let i = 0; i < unknownCount; i++) {
      const locked = buildLockedCard();
      containerEl.appendChild(locked);
    }
  }

  function buildCard(item, earned) {
    const card = document.createElement("div");
    card.className = "evidence-card" + (earned ? " earned" : " locked-card");
    card.setAttribute("data-id", item.id);
    card.setAttribute("aria-label", earned ? item.name : "Unknown Evidence");

    card.innerHTML = `
      <div class="card-symbol">${earned ? item.symbol : "?"}</div>
      <div class="card-name">${earned ? item.name : "UNKNOWN"}</div>
      ${earned ? `<div class="card-case">— ${item.discovered} —</div>` : ""}
    `;

    if (earned) {
      card.addEventListener("click", () => openDetail(item));
    }

    return card;
  }

  function buildLockedCard() {
    const card = document.createElement("div");
    card.className = "evidence-card locked-card mystery";
    card.innerHTML = `
      <div class="card-symbol">?</div>
      <div class="card-name">UNRECOVERED</div>
      <div class="card-case">— solve more cases —</div>
    `;
    return card;
  }

  function openDetail(item) {
    const modal = document.getElementById("object-modal");
    const body = document.getElementById("object-modal-body");
    if (!modal || !body) return;

    body.innerHTML = `
      <div class="modal-symbol">${item.symbol}</div>
      <h2 class="modal-name">${item.name}</h2>
      <div class="modal-divider">— — — — — — — —</div>
      <p class="modal-label">DESCRIPTION</p>
      <p class="modal-text">${item.description}</p>
      <p class="modal-label">FIRST DISCOVERED</p>
      <p class="modal-text">${item.discovered} — ${item.firstAppearance}</p>
      <p class="modal-label">CONNECTED CASES</p>
      <p class="modal-text">Case File ${item.connectedSongs.join(", ")}</p>
      <p class="modal-label">UNKNOWN</p>
      <p class="modal-text modal-unknown">${item.unknownInfo}</p>
    `;

    modal.classList.remove("hidden");
    modal.classList.add("visible");
  }

  function closeDetail() {
    const modal = document.getElementById("object-modal");
    if (modal) {
      modal.classList.remove("visible");
      setTimeout(() => modal.classList.add("hidden"), 300);
    }
  }

  return { awardCollectible, renderCabinet, closeDetail, REGISTRY };
})();
