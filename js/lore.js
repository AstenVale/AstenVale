// ASHTON VALE ARCHIVES — Lore Page Renderer
// Typewriter animation + recovered file display

const Lore = (() => {

  const CHAR_DELAY = 28;   // ms per character
  const LINE_DELAY = 180;  // ms between lines

  function buildLorePage(loreData) {
    const el = document.getElementById("lore-panel");
    if (!el) return;

    el.innerHTML = "";
    el.classList.remove("hidden");

    // File header
    const header = document.createElement("div");
    header.className = "lore-header";
    header.innerHTML = `
      <div class="recovered-stamp">RECOVERED FILE ${loreData.fileId}</div>
      <div class="lore-title">${loreData.title}</div>
      <div class="lore-date">${loreData.date}</div>
      <div class="lore-dept">${loreData.department}</div>
    `;
    el.appendChild(header);

    // Typewriter body
    const body = document.createElement("div");
    body.className = "lore-body";
    el.appendChild(body);

    // Separator
    const sep = document.createElement("div");
    sep.className = "lore-separator";
    sep.textContent = "— — — — — — — — — — — — — — — —";
    body.appendChild(sep);

    typeLines(loreData.lines, body, 0, () => {
      const footer = document.createElement("div");
      footer.className = "lore-footer";
      footer.innerHTML = `<span class="lore-end-marker">[ FILE ENDS ]</span>`;
      el.appendChild(footer);

      if (loreData.cta) {
        setTimeout(() => {
          el.appendChild(buildCTA(loreData.cta));
        }, 600);
      }

      el.scrollIntoView({ behavior: "smooth" });
    });
  }

  function typeLines(lines, container, index, onComplete) {
    if (index >= lines.length) {
      if (onComplete) onComplete();
      return;
    }

    const line = lines[index];
    const p = document.createElement("p");
    p.className = "lore-line";
    if (!line.trim()) p.innerHTML = "&nbsp;";
    container.appendChild(p);

    if (!line.trim()) {
      setTimeout(() => typeLines(lines, container, index + 1, onComplete), LINE_DELAY / 2);
      return;
    }

    typeText(p, line, 0, () => {
      setTimeout(() => typeLines(lines, container, index + 1, onComplete), LINE_DELAY);
    });
  }

  function typeText(el, text, charIndex, onComplete) {
    if (charIndex >= text.length) {
      if (onComplete) onComplete();
      return;
    }
    el.textContent += text[charIndex];
    setTimeout(() => typeText(el, text, charIndex + 1, onComplete), CHAR_DELAY);
  }

  function buildCTA(cta) {
    const wrap = document.createElement("div");
    wrap.className = "lore-cta";
    wrap.innerHTML = `
      <div class="lore-cta-inner">
        <p class="lore-cta-label">${cta.label}</p>
        <p class="lore-cta-sub">${cta.sub}</p>
        <a class="lore-cta-btn" href="${cta.buttonUrl}" target="_blank" rel="noopener">
          ${cta.buttonText}
        </a>
      </div>
    `;
    return wrap;
  }

  return { buildLorePage };
})();
