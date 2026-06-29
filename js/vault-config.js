// ASTEN VALE ARCHIVES — Vault Configuration
// Edit digits and case metadata here. Do not touch vault.js logic.

const SEASONS_CONFIG = [
  {
    id: "season1",
    title: "Season One",
    subtitle: "The Lantern at Black Pine",
    totalCases: 12,

    // ── VAULT COMBINATION ──────────────────────────────
    // One digit per case. Index 0 = Case 001, index 11 = Case 012.
    // Change these numbers freely — vault.js reads them at runtime.
    digits: [17, 27, 43, 91, 12, 56, 84, 33, 72, 18, 49, 65],

    // ── CASES ──────────────────────────────────────────
    // To release a new episode: set released: true
    // desc: two lines shown on the case card
    // gradient: [accentColor, darkColor] for the card illustration
    cases: [
      {
        id: "001",
        title: "Lantern at Black Pine",
        url: "case.html?id=1",
        released: true,
        scene: "lantern",
        desc: ["A remote cabin. A missing hiker.", "And a light that wasn't supposed to be there."],
        gradient: ["#c8853a", "#1a100a"]
      },
      {
        id: "002",
        title: "The Hollow Letter",
        url: "case.html?id=2",
        released: true,
        scene: "letter",
        desc: ["A letter with no return address.", "A message that was never meant to be read."],
        gradient: ["#8a4a20", "#1a100a"]
      },
      {
        id: "003",
        title: "The Rusted Key",
        url: "case.html?id=3",
        released: true,
        scene: "key",
        desc: ["A key found in the ruins.", "It opens more than one door."],
        gradient: ["#7a5a18", "#1a0e08"]
      },
      {
        id: "004",
        title: "The Widow Knows",
        url: "case.html?id=4",
        released: true,
        scene: "church",
        desc: ["A church. A bell toll.", "And a woman who won't say what she saw."],
        gradient: ["#3a2a4a", "#0c0a10"]
      },
      {
        id: "005",
        title: "Three Minutes Past",
        url: "case.html?id=5",
        released: false,
        scene: "clock",
        desc: ["Three minutes unaccounted for.", "Every clock in town stopped at the same time."],
        gradient: ["#2a3a3a", "#080c0c"]
      },
      {
        id: "006",
        title: "Across Pine Hollow",
        url: "case.html?id=6",
        released: false,
        scene: "forest",
        desc: ["Something crossed the hollow.", "No one agrees on what it was."],
        gradient: ["#1a2a1a", "#080c08"]
      },
      {
        id: "007",
        title: "Stranger's Matchbook",
        url: "case.html?id=7",
        released: false,
        scene: "matchbook",
        desc: ["A matchbook from a town that doesn't exist.", "Found in the pocket of a dead man."],
        gradient: ["#3a2a1a", "#0c0808"]
      },
      {
        id: "008",
        title: "Church Bell Never Rang",
        url: "case.html?id=8",
        released: false,
        scene: "bell",
        desc: ["It was supposed to ring at noon.", "The whole town heard the silence instead."],
        gradient: ["#2a2a3a", "#080810"]
      },
      {
        id: "009",
        title: "Cabin Without Smoke",
        url: "case.html?id=9",
        released: false,
        scene: "cabin",
        desc: ["The fire was lit. The smoke never came.", "Someone else was in that cabin."],
        gradient: ["#2a1a1a", "#0c0808"]
      },
      {
        id: "010",
        title: "Westbound Shadows",
        url: "case.html?id=10",
        released: false,
        scene: "road",
        desc: ["They all left heading west.", "None of them arrived."],
        gradient: ["#1a1a2a", "#080810"]
      },
      {
        id: "011",
        title: "Name in the Snow",
        url: "case.html?id=11",
        released: false,
        scene: "snow",
        desc: ["A name written in the snow.", "Gone by morning. Remembered by no one."],
        gradient: ["#2a2a2a", "#0a0a0c"]
      },
      {
        id: "012",
        title: "Black Pine Files",
        url: "case.html?id=12",
        released: false,
        scene: "files",
        desc: ["Everything that was hidden.", "The file that closes the case — or opens it."],
        gradient: ["#1a1a1a", "#080808"]
      }
    ],

    // ── COMPLETION BADGES ──────────────────────────────
    badges: [
      {
        id: "s1_archive",
        name: "Season One Archive Badge",
        symbol: "🗄",
        color: "#c9960c",
        description: "Awarded to those who opened every case file in Season One of the Asten Vale Archives. You did not merely listen — you investigated."
      },
      {
        id: "s1_master",
        name: "Master Investigator",
        symbol: "🔍",
        color: "#c9a97a",
        description: "Twelve cases. Twelve recovered files. Every trail followed to its end. The sheriff's department would have been grateful for someone like you."
      },
      {
        id: "s1_evidence",
        name: "Evidence Collector",
        symbol: "📦",
        color: "#8b6914",
        description: "Every piece of evidence from Season One has been recovered and logged. The cabinet is full. The archive is satisfied."
      },
      {
        id: "s1_survivor",
        name: "Black Pine Survivor",
        symbol: "🪔",
        color: "#7a1f1f",
        description: "You found the lantern. You followed it to the end. Whatever happened on Black Pine Road in 1987 — you know now. You are one of very few who do."
      }
    ],

    // ── BONUS REWARDS ─────────────────────────────────
    bonusRewards: [
      {
        id: "s1_timeline",
        name: "Complete Timeline",
        symbol: "📅",
        description: "A full chronological record of every known event in Asten Vale, 1979–1989. Cross-referenced with all twelve recovered files.",
        content: "The complete timeline of Asten Vale events will be revealed here. Coming as the investigation deepens."
      },
      {
        id: "s1_character_notes",
        name: "Hidden Character Notes",
        symbol: "📝",
        description: "Handwritten character sketches never shared publicly. These are the people behind the songs.",
        content: "Character notes will be revealed here. The people of Asten Vale deserve to be remembered."
      },
      {
        id: "s1_sheriff_report",
        name: "Deleted Sheriff Report",
        symbol: "📋",
        description: "A report that was officially stricken from the county record in November 1987. It survived one photocopy.",
        content: "This document was sealed. You are now one of the few to read it."
      },
      {
        id: "s1_hollow_letter",
        name: "Original Hollow Letter",
        symbol: "✉",
        description: "The letter referenced in Track 7. The one that was never sent. Found folded inside a hollow tree on Black Pine Road.",
        content: "The letter reads as it was written — in November, by someone who expected to still be alive in December."
      },
      {
        id: "s1_behind",
        name: "Behind the Investigation",
        symbol: "🎙",
        description: "A written account of how Season One was conceived, written, and hidden inside twelve songs.",
        content: "Every mystery begins somewhere. This one began with a question that had no easy answer."
      },
      {
        id: "s1_map",
        name: "Season One Map",
        symbol: "🗺",
        description: "A hand-drawn map of Asten Vale as it appeared in 1987. Every location from every case file is marked.",
        content: "The map of Asten Vale — every road, every building, every shadow."
      },
      {
        id: "s1_gallery",
        name: "Evidence Gallery",
        symbol: "🖼",
        description: "All twelve evidence objects displayed together in high resolution. The full collection, side by side.",
        content: "Twelve objects. Twelve stories. One investigation."
      },
      {
        id: "s1_artwork",
        name: "High Resolution Artwork",
        symbol: "🎨",
        description: "Original artwork from Season One in full resolution, including details not visible in the album thumbnails.",
        content: "The artwork was painted before the lyrics were written. Some details have never been explained."
      },
      {
        id: "s1_commentary",
        name: "Developer Commentary",
        symbol: "💬",
        description: "Track-by-track notes on how each puzzle was designed, hidden, and intended to be solved.",
        content: "Every case was designed to be solvable. Most were designed to be noticed only on a second listen."
      },
      {
        id: "s1_s2_teaser",
        name: "Season Two Teaser",
        symbol: "📂",
        description: "One page. One image. One sentence. The only preview of what comes next.",
        content: "The story isn't over. It never was."
      }
    ],

    // ── FINAL REWARD TEXT ─────────────────────────────
    completionText: [
      "You followed every trail.",
      "Recovered every piece of evidence.",
      "Collected every object.",
      "Unlocked every archive file.",
      "",
      "Most people heard twelve songs.",
      "",
      "You uncovered an entire forgotten story.",
      "",
      "Welcome to the Asten Vale Archives."
    ],

    // ── PLAYER STATS LABELS ───────────────────────────
    stats: [
      { label: "Season One Completed",  valueKey: "casesSolved",    format: (v) => `${v} / 12 Cases` },
      { label: "Recovered Files",        valueKey: "filesRecovered", format: (v) => "100%" },
      { label: "Evidence Cabinet",       valueKey: "objectsFound",   format: (v) => "Complete" },
      { label: "Mysteries Solved",       valueKey: "casesSolved",    format: (v) => String(v) },
      { label: "Archive Progress",       valueKey: "casesSolved",    format: (v) => "100%" },
      { label: "Vault Status",           valueKey: "vaultOpened",    format: (v) => v ? "OPEN" : "LOCKED" }
    ]
  }
];
