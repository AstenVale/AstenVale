// ASTEN VALE ARCHIVES — Vault Configuration
// 50 seasons, 12 cases each, 600 total cases.

const SEASONS_CONFIG = [
  {
    id: "season1",
    title: "Season One",
    subtitle: "The Stranger",
    totalCases: 12,
    digits: [17,27,43,12,55,8,61,9,72,81,91,99],
    vault: {
      id: "s01_vault",
      name: "The Stranger Vault",
      coupon: "VAULT-S01",
      badge: { id: "s01_badge", name: "The Stranger Vault Badge", symbol: "🏛", description: "Awarded for recovering all 12 cases in Season One." },
      lore: "All The Stranger case files recovered. Season One archive unsealed."
    },
    cases: [
      { id: "001", title: "Lantern at Black Pine", url: "case.html?id=1", released: true, releaseDate: null, gradient: ["#c8853a","#1a100a"], streaming: {} },
      { id: "002", title: "The Hollow Letter", url: "case.html?id=2", released: false, releaseDate: null, gradient: ["#4a6a8a","#0a100f"], streaming: {} },
      { id: "003", title: "The Rusted Key", url: "case.html?id=3", released: false, releaseDate: null, gradient: ["#6a4a8a","#100a10"], streaming: {} },
      { id: "004", title: "The Widow Knows", url: "case.html?id=4", released: false, releaseDate: null, gradient: ["#3a6a4a","#0a100a"], streaming: {} },
      { id: "005", title: "Three Minutes Past", url: "case.html?id=5", released: false, releaseDate: null, gradient: ["#8a8a4a","#10100a"], streaming: {} },
      { id: "006", title: "Across Pine Hollow", url: "case.html?id=6", released: false, releaseDate: null, gradient: ["#4a4a6a","#0a0a10"], streaming: {} },
      { id: "007", title: "Stranger's Matchbook", url: "case.html?id=7", released: false, releaseDate: null, gradient: ["#8a4a4a","#100a0a"], streaming: {} },
      { id: "008", title: "Church Bell Never Rang", url: "case.html?id=8", released: false, releaseDate: null, gradient: ["#c85a2a","#1a0e08"], streaming: {} },
      { id: "009", title: "Cabin Without Smoke", url: "case.html?id=9", released: false, releaseDate: null, gradient: ["#2a6a6a","#080e0e"], streaming: {} },
      { id: "010", title: "Westbound Shadows", url: "case.html?id=10", released: false, releaseDate: null, gradient: ["#6a6a2a","#0e0e08"], streaming: {} },
      { id: "011", title: "Name in the Snow", url: "case.html?id=11", released: false, releaseDate: null, gradient: ["#5a3a6a","#0e0810"], streaming: {} },
      { id: "012", title: "Black Pine Files", url: "case.html?id=12", released: false, releaseDate: null, gradient: ["#3a5a3a","#080e08"], streaming: {} }
    ]
  },
  {
    id: "season2",
    title: "Season Two",
    subtitle: "The Before",
    totalCases: 12,
    digits: [110,121,132,143,154,165,176,187,198,209,220,231],
    vault: {
      id: "s02_vault",
      name: "The Before Vault",
      coupon: "VAULT-S02",
      badge: { id: "s02_badge", name: "The Before Vault Badge", symbol: "🏛", description: "Awarded for recovering all 12 cases in Season Two." },
      lore: "All The Before case files recovered. Season Two archive unsealed."
    },
    cases: [
      { id: "013", title: "The Wedding Dance", url: "case.html?id=13", released: false, releaseDate: null, gradient: ["#4a6a8a","#0a100f"], streaming: {} },
      { id: "014", title: "The Promise", url: "case.html?id=14", released: false, releaseDate: null, gradient: ["#6a4a8a","#100a10"], streaming: {} },
      { id: "015", title: "The First Crack", url: "case.html?id=15", released: false, releaseDate: null, gradient: ["#3a6a4a","#0a100a"], streaming: {} },
      { id: "016", title: "The Confession", url: "case.html?id=16", released: false, releaseDate: null, gradient: ["#8a8a4a","#10100a"], streaming: {} },
      { id: "017", title: "The Leaving", url: "case.html?id=17", released: false, releaseDate: null, gradient: ["#4a4a6a","#0a0a10"], streaming: {} },
      { id: "018", title: "The Vigil", url: "case.html?id=18", released: false, releaseDate: null, gradient: ["#8a4a4a","#100a0a"], streaming: {} },
      { id: "019", title: "The Letters", url: "case.html?id=19", released: false, releaseDate: null, gradient: ["#c85a2a","#1a0e08"], streaming: {} },
      { id: "020", title: "The Year Passed", url: "case.html?id=20", released: false, releaseDate: null, gradient: ["#2a6a6a","#080e0e"], streaming: {} },
      { id: "021", title: "The Burnt Pages", url: "case.html?id=21", released: false, releaseDate: null, gradient: ["#6a6a2a","#0e0e08"], streaming: {} },
      { id: "022", title: "The Return to Black Pine", url: "case.html?id=22", released: false, releaseDate: null, gradient: ["#5a3a6a","#0e0810"], streaming: {} },
      { id: "023", title: "The Empty Chair", url: "case.html?id=23", released: false, releaseDate: null, gradient: ["#3a5a3a","#080e08"], streaming: {} },
      { id: "024", title: "The Pine Road Home", url: "case.html?id=24", released: false, releaseDate: null, gradient: ["#7a3a5a","#100810"], streaming: {} }
    ]
  },
  {
    id: "season3",
    title: "Season Three",
    subtitle: "The Disappearance",
    totalCases: 12,
    digits: [307,316,325,334,343,352,361,370,379,388,397,406],
    vault: {
      id: "s03_vault",
      name: "The Disappearance Vault",
      coupon: "VAULT-S03",
      badge: { id: "s03_badge", name: "The Disappearance Vault Badge", symbol: "🏛", description: "Awarded for recovering all 12 cases in Season Three." },
      lore: "All The Disappearance case files recovered. Season Three archive unsealed."
    },
    cases: [
      { id: "025", title: "The Last Sighting", url: "case.html?id=25", released: false, releaseDate: null, gradient: ["#6a4a8a","#100a10"], streaming: {} },
      { id: "026", title: "The Empty Bed", url: "case.html?id=26", released: false, releaseDate: null, gradient: ["#3a6a4a","#0a100a"], streaming: {} },
      { id: "027", title: "The Unlocked Door", url: "case.html?id=27", released: false, releaseDate: null, gradient: ["#8a8a4a","#10100a"], streaming: {} },
      { id: "028", title: "Three Days Gone", url: "case.html?id=28", released: false, releaseDate: null, gradient: ["#4a4a6a","#0a0a10"], streaming: {} },
      { id: "029", title: "The Search Party", url: "case.html?id=29", released: false, releaseDate: null, gradient: ["#8a4a4a","#100a0a"], streaming: {} },
      { id: "030", title: "The False Trail", url: "case.html?id=30", released: false, releaseDate: null, gradient: ["#c85a2a","#1a0e08"], streaming: {} },
      { id: "031", title: "The Other Name", url: "case.html?id=31", released: false, releaseDate: null, gradient: ["#2a6a6a","#080e0e"], streaming: {} },
      { id: "032", title: "The Missing Hours", url: "case.html?id=32", released: false, releaseDate: null, gradient: ["#6a6a2a","#0e0e08"], streaming: {} },
      { id: "033", title: "What the Neighbor Saw", url: "case.html?id=33", released: false, releaseDate: null, gradient: ["#5a3a6a","#0e0810"], streaming: {} },
      { id: "034", title: "The Turned Earth", url: "case.html?id=34", released: false, releaseDate: null, gradient: ["#3a5a3a","#080e08"], streaming: {} },
      { id: "035", title: "The Hollow Tree", url: "case.html?id=35", released: false, releaseDate: null, gradient: ["#7a3a5a","#100810"], streaming: {} },
      { id: "036", title: "The Closed Case", url: "case.html?id=36", released: false, releaseDate: null, gradient: ["#2a4a7a","#08080e"], streaming: {} }
    ]
  },
  {
    id: "season4",
    title: "Season Four",
    subtitle: "The River Speaks",
    totalCases: 12,
    digits: [407,416,425,434,443,452,461,470,479,488,497,506],
    vault: {
      id: "s04_vault",
      name: "The River Speaks Vault",
      coupon: "VAULT-S04",
      badge: { id: "s04_badge", name: "The River Speaks Vault Badge", symbol: "🏛", description: "Awarded for recovering all 12 cases in Season Four." },
      lore: "All The River Speaks case files recovered. Season Four archive unsealed."
    },
    cases: [
      { id: "037", title: "Before the Flood", url: "case.html?id=37", released: false, releaseDate: null, gradient: ["#3a6a4a","#0a100a"], streaming: {} },
      { id: "038", title: "The Drowned Watch", url: "case.html?id=38", released: false, releaseDate: null, gradient: ["#8a8a4a","#10100a"], streaming: {} },
      { id: "039", title: "What Surfaces", url: "case.html?id=39", released: false, releaseDate: null, gradient: ["#4a4a6a","#0a0a10"], streaming: {} },
      { id: "040", title: "The Current Knows", url: "case.html?id=40", released: false, releaseDate: null, gradient: ["#8a4a4a","#100a0a"], streaming: {} },
      { id: "041", title: "Low Water Mark", url: "case.html?id=41", released: false, releaseDate: null, gradient: ["#c85a2a","#1a0e08"], streaming: {} },
      { id: "042", title: "What the River Kept", url: "case.html?id=42", released: false, releaseDate: null, gradient: ["#2a6a6a","#080e0e"], streaming: {} },
      { id: "043", title: "The Stone Says", url: "case.html?id=43", released: false, releaseDate: null, gradient: ["#6a6a2a","#0e0e08"], streaming: {} },
      { id: "044", title: "Underneath", url: "case.html?id=44", released: false, releaseDate: null, gradient: ["#5a3a6a","#0e0810"], streaming: {} },
      { id: "045", title: "The Fisherman's Truth", url: "case.html?id=45", released: false, releaseDate: null, gradient: ["#3a5a3a","#080e08"], streaming: {} },
      { id: "046", title: "The Far Bank", url: "case.html?id=46", released: false, releaseDate: null, gradient: ["#7a3a5a","#100810"], streaming: {} },
      { id: "047", title: "High Water", url: "case.html?id=47", released: false, releaseDate: null, gradient: ["#2a4a7a","#08080e"], streaming: {} },
      { id: "048", title: "The River's End", url: "case.html?id=48", released: false, releaseDate: null, gradient: ["#c8a02a","#10100a"], streaming: {} }
    ]
  },
  {
    id: "season5",
    title: "Season Five",
    subtitle: "The Last Winter",
    totalCases: 12,
    digits: [507,516,525,534,543,552,561,570,579,588,597,606],
    vault: {
      id: "s05_vault",
      name: "The Last Winter Vault",
      coupon: "VAULT-S05",
      badge: { id: "s05_badge", name: "The Last Winter Vault Badge", symbol: "🏛", description: "Awarded for recovering all 12 cases in Season Five." },
      lore: "All The Last Winter case files recovered. Season Five archive unsealed."
    },
    cases: [
      { id: "049", title: "First Frost", url: "case.html?id=49", released: false, releaseDate: null, gradient: ["#8a8a4a","#10100a"], streaming: {} },
      { id: "050", title: "The Cold House", url: "case.html?id=50", released: false, releaseDate: null, gradient: ["#4a4a6a","#0a0a10"], streaming: {} },
      { id: "051", title: "Snow on the Roof", url: "case.html?id=51", released: false, releaseDate: null, gradient: ["#8a4a4a","#100a0a"], streaming: {} },
      { id: "052", title: "The Long Night", url: "case.html?id=52", released: false, releaseDate: null, gradient: ["#c85a2a","#1a0e08"], streaming: {} },
      { id: "053", title: "What Didn't Freeze", url: "case.html?id=53", released: false, releaseDate: null, gradient: ["#2a6a6a","#080e0e"], streaming: {} },
      { id: "054", title: "The Fire Went Out", url: "case.html?id=54", released: false, releaseDate: null, gradient: ["#6a6a2a","#0e0e08"], streaming: {} },
      { id: "055", title: "Ice Road", url: "case.html?id=55", released: false, releaseDate: null, gradient: ["#5a3a6a","#0e0810"], streaming: {} },
      { id: "056", title: "The Frozen Clock", url: "case.html?id=56", released: false, releaseDate: null, gradient: ["#3a5a3a","#080e08"], streaming: {} },
      { id: "057", title: "What He Left Behind", url: "case.html?id=57", released: false, releaseDate: null, gradient: ["#7a3a5a","#100810"], streaming: {} },
      { id: "058", title: "The Drift", url: "case.html?id=58", released: false, releaseDate: null, gradient: ["#2a4a7a","#08080e"], streaming: {} },
      { id: "059", title: "The Thaw", url: "case.html?id=59", released: false, releaseDate: null, gradient: ["#c8a02a","#10100a"], streaming: {} },
      { id: "060", title: "Spring Without Him", url: "case.html?id=60", released: false, releaseDate: null, gradient: ["#7a7a7a","#0e0e0e"], streaming: {} }
    ]
  },
  {
    id: "season6",
    title: "Season Six",
    subtitle: "The Underground",
    totalCases: 12,
    digits: [607,616,625,634,643,652,661,670,679,688,697,706],
    vault: {
      id: "s06_vault",
      name: "The Underground Vault",
      coupon: "VAULT-S06",
      badge: { id: "s06_badge", name: "The Underground Vault Badge", symbol: "🏛", description: "Awarded for recovering all 12 cases in Season Six." },
      lore: "All The Underground case files recovered. Season Six archive unsealed."
    },
    cases: [
      { id: "061", title: "The Tunnel Entry", url: "case.html?id=61", released: false, releaseDate: null, gradient: ["#4a4a6a","#0a0a10"], streaming: {} },
      { id: "062", title: "Blind Direction", url: "case.html?id=62", released: false, releaseDate: null, gradient: ["#8a4a4a","#100a0a"], streaming: {} },
      { id: "063", title: "The Echo", url: "case.html?id=63", released: false, releaseDate: null, gradient: ["#c85a2a","#1a0e08"], streaming: {} },
      { id: "064", title: "Below the Church", url: "case.html?id=64", released: false, releaseDate: null, gradient: ["#2a6a6a","#080e0e"], streaming: {} },
      { id: "065", title: "What They Buried", url: "case.html?id=65", released: false, releaseDate: null, gradient: ["#6a6a2a","#0e0e08"], streaming: {} },
      { id: "066", title: "The Map of Below", url: "case.html?id=66", released: false, releaseDate: null, gradient: ["#5a3a6a","#0e0810"], streaming: {} },
      { id: "067", title: "The Second Room", url: "case.html?id=67", released: false, releaseDate: null, gradient: ["#3a5a3a","#080e08"], streaming: {} },
      { id: "068", title: "Old Stone", url: "case.html?id=68", released: false, releaseDate: null, gradient: ["#7a3a5a","#100810"], streaming: {} },
      { id: "069", title: "Underground Water", url: "case.html?id=69", released: false, releaseDate: null, gradient: ["#2a4a7a","#08080e"], streaming: {} },
      { id: "070", title: "The Vault", url: "case.html?id=70", released: false, releaseDate: null, gradient: ["#c8a02a","#10100a"], streaming: {} },
      { id: "071", title: "What Grows in Dark", url: "case.html?id=71", released: false, releaseDate: null, gradient: ["#7a7a7a","#0e0e0e"], streaming: {} },
      { id: "072", title: "Surface", url: "case.html?id=72", released: false, releaseDate: null, gradient: ["#2a6a3a","#080e08"], streaming: {} }
    ]
  },
  {
    id: "season7",
    title: "Season Seven",
    subtitle: "The Second Family",
    totalCases: 12,
    digits: [707,716,725,734,743,752,761,770,779,788,797,806],
    vault: {
      id: "s07_vault",
      name: "The Second Family Vault",
      coupon: "VAULT-S07",
      badge: { id: "s07_badge", name: "The Second Family Vault Badge", symbol: "🏛", description: "Awarded for recovering all 12 cases in Season Seven." },
      lore: "All The Second Family case files recovered. Season Seven archive unsealed."
    },
    cases: [
      { id: "073", title: "The Other House", url: "case.html?id=73", released: false, releaseDate: null, gradient: ["#8a4a4a","#100a0a"], streaming: {} },
      { id: "074", title: "A Different Name", url: "case.html?id=74", released: false, releaseDate: null, gradient: ["#c85a2a","#1a0e08"], streaming: {} },
      { id: "075", title: "Two Rings", url: "case.html?id=75", released: false, releaseDate: null, gradient: ["#2a6a6a","#080e0e"], streaming: {} },
      { id: "076", title: "What She Didn't Tell", url: "case.html?id=76", released: false, releaseDate: null, gradient: ["#6a6a2a","#0e0e08"], streaming: {} },
      { id: "077", title: "The Children", url: "case.html?id=77", released: false, releaseDate: null, gradient: ["#5a3a6a","#0e0810"], streaming: {} },
      { id: "078", title: "The Other Witness", url: "case.html?id=78", released: false, releaseDate: null, gradient: ["#3a5a3a","#080e08"], streaming: {} },
      { id: "079", title: "The Parallel Life", url: "case.html?id=79", released: false, releaseDate: null, gradient: ["#7a3a5a","#100810"], streaming: {} },
      { id: "080", title: "The Sunday Pattern", url: "case.html?id=80", released: false, releaseDate: null, gradient: ["#2a4a7a","#08080e"], streaming: {} },
      { id: "081", title: "What the Letter Said", url: "case.html?id=81", released: false, releaseDate: null, gradient: ["#c8a02a","#10100a"], streaming: {} },
      { id: "082", title: "The Other Town", url: "case.html?id=82", released: false, releaseDate: null, gradient: ["#7a7a7a","#0e0e0e"], streaming: {} },
      { id: "083", title: "Recognition", url: "case.html?id=83", released: false, releaseDate: null, gradient: ["#2a6a3a","#080e08"], streaming: {} },
      { id: "084", title: "The Confrontation", url: "case.html?id=84", released: false, releaseDate: null, gradient: ["#6a3a3a","#0e0808"], streaming: {} }
    ]
  },
  {
    id: "season8",
    title: "Season Eight",
    subtitle: "The Fire Year",
    totalCases: 12,
    digits: [807,816,825,834,843,852,861,870,879,888,897,906],
    vault: {
      id: "s08_vault",
      name: "The Fire Year Vault",
      coupon: "VAULT-S08",
      badge: { id: "s08_badge", name: "The Fire Year Vault Badge", symbol: "🏛", description: "Awarded for recovering all 12 cases in Season Eight." },
      lore: "All The Fire Year case files recovered. Season Eight archive unsealed."
    },
    cases: [
      { id: "085", title: "The First Smoke", url: "case.html?id=85", released: false, releaseDate: null, gradient: ["#c85a2a","#1a0e08"], streaming: {} },
      { id: "086", title: "What Started It", url: "case.html?id=86", released: false, releaseDate: null, gradient: ["#2a6a6a","#080e0e"], streaming: {} },
      { id: "087", title: "The Running", url: "case.html?id=87", released: false, releaseDate: null, gradient: ["#6a6a2a","#0e0e08"], streaming: {} },
      { id: "088", title: "The House That Burned", url: "case.html?id=88", released: false, releaseDate: null, gradient: ["#5a3a6a","#0e0810"], streaming: {} },
      { id: "089", title: "After the Ash", url: "case.html?id=89", released: false, releaseDate: null, gradient: ["#3a5a3a","#080e08"], streaming: {} },
      { id: "090", title: "What Didn't Burn", url: "case.html?id=90", released: false, releaseDate: null, gradient: ["#7a3a5a","#100810"], streaming: {} },
      { id: "091", title: "The Cause", url: "case.html?id=91", released: false, releaseDate: null, gradient: ["#2a4a7a","#08080e"], streaming: {} },
      { id: "092", title: "The Investigation", url: "case.html?id=92", released: false, releaseDate: null, gradient: ["#c8a02a","#10100a"], streaming: {} },
      { id: "093", title: "The Survivor", url: "case.html?id=93", released: false, releaseDate: null, gradient: ["#7a7a7a","#0e0e0e"], streaming: {} },
      { id: "094", title: "What Fire Does to Memory", url: "case.html?id=94", released: false, releaseDate: null, gradient: ["#2a6a3a","#080e08"], streaming: {} },
      { id: "095", title: "Rebuilt", url: "case.html?id=95", released: false, releaseDate: null, gradient: ["#6a3a3a","#0e0808"], streaming: {} },
      { id: "096", title: "The Scar", url: "case.html?id=96", released: false, releaseDate: null, gradient: ["#3a3a6a","#08080e"], streaming: {} }
    ]
  },
  {
    id: "season9",
    title: "Season Nine",
    subtitle: "The Keeper",
    totalCases: 12,
    digits: [907,916,925,934,943,952,961,970,979,988,997,1006],
    vault: {
      id: "s09_vault",
      name: "The Keeper Vault",
      coupon: "VAULT-S09",
      badge: { id: "s09_badge", name: "The Keeper Vault Badge", symbol: "🏛", description: "Awarded for recovering all 12 cases in Season Nine." },
      lore: "All The Keeper case files recovered. Season Nine archive unsealed."
    },
    cases: [
      { id: "097", title: "The Archive", url: "case.html?id=97", released: false, releaseDate: null, gradient: ["#2a6a6a","#080e0e"], streaming: {} },
      { id: "098", title: "What She Saved", url: "case.html?id=98", released: false, releaseDate: null, gradient: ["#6a6a2a","#0e0e08"], streaming: {} },
      { id: "099", title: "The Record Room", url: "case.html?id=99", released: false, releaseDate: null, gradient: ["#5a3a6a","#0e0810"], streaming: {} },
      { id: "100", title: "The Locked Cabinet", url: "case.html?id=100", released: false, releaseDate: null, gradient: ["#3a5a3a","#080e08"], streaming: {} },
      { id: "101", title: "What the Index Says", url: "case.html?id=101", released: false, releaseDate: null, gradient: ["#7a3a5a","#100810"], streaming: {} },
      { id: "102", title: "The Missing Page", url: "case.html?id=102", released: false, releaseDate: null, gradient: ["#2a4a7a","#08080e"], streaming: {} },
      { id: "103", title: "The Other Keeper", url: "case.html?id=103", released: false, releaseDate: null, gradient: ["#c8a02a","#10100a"], streaming: {} },
      { id: "104", title: "The Catalog", url: "case.html?id=104", released: false, releaseDate: null, gradient: ["#7a7a7a","#0e0e0e"], streaming: {} },
      { id: "105", title: "Cross Reference", url: "case.html?id=105", released: false, releaseDate: null, gradient: ["#2a6a3a","#080e08"], streaming: {} },
      { id: "106", title: "The Annotation", url: "case.html?id=106", released: false, releaseDate: null, gradient: ["#6a3a3a","#0e0808"], streaming: {} },
      { id: "107", title: "What Was Redacted", url: "case.html?id=107", released: false, releaseDate: null, gradient: ["#3a3a6a","#08080e"], streaming: {} },
      { id: "108", title: "The Final Entry", url: "case.html?id=108", released: false, releaseDate: null, gradient: ["#5a2a7a","#0e0810"], streaming: {} }
    ]
  },
  {
    id: "season10",
    title: "Season Ten",
    subtitle: "The Forgotten Road",
    totalCases: 12,
    digits: [1007,1016,1025,1034,1043,1052,1061,1070,1079,1088,1097,1106],
    vault: {
      id: "s10_vault",
      name: "The Forgotten Road Vault",
      coupon: "VAULT-S10",
      badge: { id: "s10_badge", name: "The Forgotten Road Vault Badge", symbol: "🏛", description: "Awarded for recovering all 12 cases in Season Ten." },
      lore: "All The Forgotten Road case files recovered. Season Ten archive unsealed."
    },
    cases: [
      { id: "109", title: "The Unmapped Mile", url: "case.html?id=109", released: false, releaseDate: null, gradient: ["#6a6a2a","#0e0e08"], streaming: {} },
      { id: "110", title: "What the Road Remembers", url: "case.html?id=110", released: false, releaseDate: null, gradient: ["#5a3a6a","#0e0810"], streaming: {} },
      { id: "111", title: "The Overgrown Path", url: "case.html?id=111", released: false, releaseDate: null, gradient: ["#3a5a3a","#080e08"], streaming: {} },
      { id: "112", title: "Mile Marker", url: "case.html?id=112", released: false, releaseDate: null, gradient: ["#7a3a5a","#100810"], streaming: {} },
      { id: "113", title: "The Old Route", url: "case.html?id=113", released: false, releaseDate: null, gradient: ["#2a4a7a","#08080e"], streaming: {} },
      { id: "114", title: "What Happened Here", url: "case.html?id=114", released: false, releaseDate: null, gradient: ["#c8a02a","#10100a"], streaming: {} },
      { id: "115", title: "The Crossroads Again", url: "case.html?id=115", released: false, releaseDate: null, gradient: ["#7a7a7a","#0e0e0e"], streaming: {} },
      { id: "116", title: "Abandoned", url: "case.html?id=116", released: false, releaseDate: null, gradient: ["#2a6a3a","#080e08"], streaming: {} },
      { id: "117", title: "The Junction", url: "case.html?id=117", released: false, releaseDate: null, gradient: ["#6a3a3a","#0e0808"], streaming: {} },
      { id: "118", title: "Detour", url: "case.html?id=118", released: false, releaseDate: null, gradient: ["#3a3a6a","#08080e"], streaming: {} },
      { id: "119", title: "Dead End", url: "case.html?id=119", released: false, releaseDate: null, gradient: ["#5a2a7a","#0e0810"], streaming: {} },
      { id: "120", title: "The Road Opens", url: "case.html?id=120", released: false, releaseDate: null, gradient: ["#4a7a2a","#080e08"], streaming: {} }
    ]
  },
  {
    id: "season11",
    title: "Season Eleven",
    subtitle: "The Map Maker",
    totalCases: 12,
    digits: [1107,1116,1125,1134,1143,1152,1161,1170,1179,1188,1197,1206],
    vault: {
      id: "s11_vault",
      name: "The Map Maker Vault",
      coupon: "VAULT-S11",
      badge: { id: "s11_badge", name: "The Map Maker Vault Badge", symbol: "🏛", description: "Awarded for recovering all 12 cases in Season Eleven." },
      lore: "All The Map Maker case files recovered. Season Eleven archive unsealed."
    },
    cases: [
      { id: "121", title: "First Survey", url: "case.html?id=121", released: false, releaseDate: null, gradient: ["#5a3a6a","#0e0810"], streaming: {} },
      { id: "122", title: "What the Map Shows", url: "case.html?id=122", released: false, releaseDate: null, gradient: ["#3a5a3a","#080e08"], streaming: {} },
      { id: "123", title: "The Boundary", url: "case.html?id=123", released: false, releaseDate: null, gradient: ["#7a3a5a","#100810"], streaming: {} },
      { id: "124", title: "Disputed Land", url: "case.html?id=124", released: false, releaseDate: null, gradient: ["#2a4a7a","#08080e"], streaming: {} },
      { id: "125", title: "The Corner Stone", url: "case.html?id=125", released: false, releaseDate: null, gradient: ["#c8a02a","#10100a"], streaming: {} },
      { id: "126", title: "What's Not on the Map", url: "case.html?id=126", released: false, releaseDate: null, gradient: ["#7a7a7a","#0e0e0e"], streaming: {} },
      { id: "127", title: "The Other Map", url: "case.html?id=127", released: false, releaseDate: null, gradient: ["#2a6a3a","#080e08"], streaming: {} },
      { id: "128", title: "Scale", url: "case.html?id=128", released: false, releaseDate: null, gradient: ["#6a3a3a","#0e0808"], streaming: {} },
      { id: "129", title: "The Legend", url: "case.html?id=129", released: false, releaseDate: null, gradient: ["#3a3a6a","#08080e"], streaming: {} },
      { id: "130", title: "The Compass Rose", url: "case.html?id=130", released: false, releaseDate: null, gradient: ["#5a2a7a","#0e0810"], streaming: {} },
      { id: "131", title: "What the Surveyor Knew", url: "case.html?id=131", released: false, releaseDate: null, gradient: ["#4a7a2a","#080e08"], streaming: {} },
      { id: "132", title: "Terrain", url: "case.html?id=132", released: false, releaseDate: null, gradient: ["#7a4a2a","#100e08"], streaming: {} }
    ]
  },
  {
    id: "season12",
    title: "Season Twelve",
    subtitle: "The Inheritance",
    totalCases: 12,
    digits: [1207,1216,1225,1234,1243,1252,1261,1270,1279,1288,1297,1306],
    vault: {
      id: "s12_vault",
      name: "The Inheritance Vault",
      coupon: "VAULT-S12",
      badge: { id: "s12_badge", name: "The Inheritance Vault Badge", symbol: "🏛", description: "Awarded for recovering all 12 cases in Season Twelve." },
      lore: "All The Inheritance case files recovered. Season Twelve archive unsealed."
    },
    cases: [
      { id: "133", title: "The Reading", url: "case.html?id=133", released: false, releaseDate: null, gradient: ["#3a5a3a","#080e08"], streaming: {} },
      { id: "134", title: "What Was Left", url: "case.html?id=134", released: false, releaseDate: null, gradient: ["#7a3a5a","#100810"], streaming: {} },
      { id: "135", title: "The Other Name in the Will", url: "case.html?id=135", released: false, releaseDate: null, gradient: ["#2a4a7a","#08080e"], streaming: {} },
      { id: "136", title: "Contested", url: "case.html?id=136", released: false, releaseDate: null, gradient: ["#c8a02a","#10100a"], streaming: {} },
      { id: "137", title: "The Estate", url: "case.html?id=137", released: false, releaseDate: null, gradient: ["#7a7a7a","#0e0e0e"], streaming: {} },
      { id: "138", title: "What She Found", url: "case.html?id=138", released: false, releaseDate: null, gradient: ["#2a6a3a","#080e08"], streaming: {} },
      { id: "139", title: "The Old Account", url: "case.html?id=139", released: false, releaseDate: null, gradient: ["#6a3a3a","#0e0808"], streaming: {} },
      { id: "140", title: "The Deed", url: "case.html?id=140", released: false, releaseDate: null, gradient: ["#3a3a6a","#08080e"], streaming: {} },
      { id: "141", title: "Family Claim", url: "case.html?id=141", released: false, releaseDate: null, gradient: ["#5a2a7a","#0e0810"], streaming: {} },
      { id: "142", title: "What Grandfather Kept", url: "case.html?id=142", released: false, releaseDate: null, gradient: ["#4a7a2a","#080e08"], streaming: {} },
      { id: "143", title: "The Vault Contents", url: "case.html?id=143", released: false, releaseDate: null, gradient: ["#7a4a2a","#100e08"], streaming: {} },
      { id: "144", title: "After Probate", url: "case.html?id=144", released: false, releaseDate: null, gradient: ["#2a5a5a","#08100e"], streaming: {} }
    ]
  },
  {
    id: "season13",
    title: "Season Thirteen",
    subtitle: "The Twin Hollows",
    totalCases: 12,
    digits: [1307,1316,1325,1334,1343,1352,1361,1370,1379,1388,1397,1406],
    vault: {
      id: "s13_vault",
      name: "The Twin Hollows Vault",
      coupon: "VAULT-S13",
      badge: { id: "s13_badge", name: "The Twin Hollows Vault Badge", symbol: "🏛", description: "Awarded for recovering all 12 cases in Season Thirteen." },
      lore: "All The Twin Hollows case files recovered. Season Thirteen archive unsealed."
    },
    cases: [
      { id: "145", title: "The Mirror Road", url: "case.html?id=145", released: false, releaseDate: null, gradient: ["#7a3a5a","#100810"], streaming: {} },
      { id: "146", title: "Two of Everything", url: "case.html?id=146", released: false, releaseDate: null, gradient: ["#2a4a7a","#08080e"], streaming: {} },
      { id: "147", title: "Which One", url: "case.html?id=147", released: false, releaseDate: null, gradient: ["#c8a02a","#10100a"], streaming: {} },
      { id: "148", title: "The Difference", url: "case.html?id=148", released: false, releaseDate: null, gradient: ["#7a7a7a","#0e0e0e"], streaming: {} },
      { id: "149", title: "Same Face", url: "case.html?id=149", released: false, releaseDate: null, gradient: ["#2a6a3a","#080e08"], streaming: {} },
      { id: "150", title: "What Changed", url: "case.html?id=150", released: false, releaseDate: null, gradient: ["#6a3a3a","#0e0808"], streaming: {} },
      { id: "151", title: "The Other Hollow", url: "case.html?id=151", released: false, releaseDate: null, gradient: ["#3a3a6a","#08080e"], streaming: {} },
      { id: "152", title: "The Switch", url: "case.html?id=152", released: false, releaseDate: null, gradient: ["#5a2a7a","#0e0810"], streaming: {} },
      { id: "153", title: "Before the Divide", url: "case.html?id=153", released: false, releaseDate: null, gradient: ["#4a7a2a","#080e08"], streaming: {} },
      { id: "154", title: "After", url: "case.html?id=154", released: false, releaseDate: null, gradient: ["#7a4a2a","#100e08"], streaming: {} },
      { id: "155", title: "The One Who Stayed", url: "case.html?id=155", released: false, releaseDate: null, gradient: ["#2a5a5a","#08100e"], streaming: {} },
      { id: "156", title: "The Twin's Word", url: "case.html?id=156", released: false, releaseDate: null, gradient: ["#6a2a6a","#0e080e"], streaming: {} }
    ]
  },
  {
    id: "season14",
    title: "Season Fourteen",
    subtitle: "The Flood Year",
    totalCases: 12,
    digits: [1407,1416,1425,1434,1443,1452,1461,1470,1479,1488,1497,1506],
    vault: {
      id: "s14_vault",
      name: "The Flood Year Vault",
      coupon: "VAULT-S14",
      badge: { id: "s14_badge", name: "The Flood Year Vault Badge", symbol: "🏛", description: "Awarded for recovering all 12 cases in Season Fourteen." },
      lore: "All The Flood Year case files recovered. Season Fourteen archive unsealed."
    },
    cases: [
      { id: "157", title: "Before the Rain", url: "case.html?id=157", released: false, releaseDate: null, gradient: ["#2a4a7a","#08080e"], streaming: {} },
      { id: "158", title: "The Warning", url: "case.html?id=158", released: false, releaseDate: null, gradient: ["#c8a02a","#10100a"], streaming: {} },
      { id: "159", title: "Water Rising", url: "case.html?id=159", released: false, releaseDate: null, gradient: ["#7a7a7a","#0e0e0e"], streaming: {} },
      { id: "160", title: "The Last Dry Hour", url: "case.html?id=160", released: false, releaseDate: null, gradient: ["#2a6a3a","#080e08"], streaming: {} },
      { id: "161", title: "What the Flood Took", url: "case.html?id=161", released: false, releaseDate: null, gradient: ["#6a3a3a","#0e0808"], streaming: {} },
      { id: "162", title: "What It Left", url: "case.html?id=162", released: false, releaseDate: null, gradient: ["#3a3a6a","#08080e"], streaming: {} },
      { id: "163", title: "High Water Line", url: "case.html?id=163", released: false, releaseDate: null, gradient: ["#5a2a7a","#0e0810"], streaming: {} },
      { id: "164", title: "After the Water", url: "case.html?id=164", released: false, releaseDate: null, gradient: ["#4a7a2a","#080e08"], streaming: {} },
      { id: "165", title: "The Mud Below", url: "case.html?id=165", released: false, releaseDate: null, gradient: ["#7a4a2a","#100e08"], streaming: {} },
      { id: "166", title: "Debris", url: "case.html?id=166", released: false, releaseDate: null, gradient: ["#2a5a5a","#08100e"], streaming: {} },
      { id: "167", title: "The Count", url: "case.html?id=167", released: false, releaseDate: null, gradient: ["#6a2a6a","#0e080e"], streaming: {} },
      { id: "168", title: "Recovery", url: "case.html?id=168", released: false, releaseDate: null, gradient: ["#3a7a6a","#080e10"], streaming: {} }
    ]
  },
  {
    id: "season15",
    title: "Season Fifteen",
    subtitle: "The Lantern Keeper",
    totalCases: 12,
    digits: [1507,1516,1525,1534,1543,1552,1561,1570,1579,1588,1597,1606],
    vault: {
      id: "s15_vault",
      name: "The Lantern Keeper Vault",
      coupon: "VAULT-S15",
      badge: { id: "s15_badge", name: "The Lantern Keeper Vault Badge", symbol: "🏛", description: "Awarded for recovering all 12 cases in Season Fifteen." },
      lore: "All The Lantern Keeper case files recovered. Season Fifteen archive unsealed."
    },
    cases: [
      { id: "169", title: "First Light", url: "case.html?id=169", released: false, releaseDate: null, gradient: ["#c8a02a","#10100a"], streaming: {} },
      { id: "170", title: "The Light Schedule", url: "case.html?id=170", released: false, releaseDate: null, gradient: ["#7a7a7a","#0e0e0e"], streaming: {} },
      { id: "171", title: "The Dark Night", url: "case.html?id=171", released: false, releaseDate: null, gradient: ["#2a6a3a","#080e08"], streaming: {} },
      { id: "172", title: "What the Lantern Showed", url: "case.html?id=172", released: false, releaseDate: null, gradient: ["#6a3a3a","#0e0808"], streaming: {} },
      { id: "173", title: "The Shadow", url: "case.html?id=173", released: false, releaseDate: null, gradient: ["#3a3a6a","#08080e"], streaming: {} },
      { id: "174", title: "Oil and Flame", url: "case.html?id=174", released: false, releaseDate: null, gradient: ["#5a2a7a","#0e0810"], streaming: {} },
      { id: "175", title: "The Keeper's Log", url: "case.html?id=175", released: false, releaseDate: null, gradient: ["#4a7a2a","#080e08"], streaming: {} },
      { id: "176", title: "What He Saw", url: "case.html?id=176", released: false, releaseDate: null, gradient: ["#7a4a2a","#100e08"], streaming: {} },
      { id: "177", title: "The Unlit Window", url: "case.html?id=177", released: false, releaseDate: null, gradient: ["#2a5a5a","#08100e"], streaming: {} },
      { id: "178", title: "Someone Moved the Light", url: "case.html?id=178", released: false, releaseDate: null, gradient: ["#6a2a6a","#0e080e"], streaming: {} },
      { id: "179", title: "The Signal", url: "case.html?id=179", released: false, releaseDate: null, gradient: ["#3a7a6a","#080e10"], streaming: {} },
      { id: "180", title: "The Last Flame", url: "case.html?id=180", released: false, releaseDate: null, gradient: ["#8a2a3a","#100808"], streaming: {} }
    ]
  },
  {
    id: "season16",
    title: "Season Sixteen",
    subtitle: "The Glass House",
    totalCases: 12,
    digits: [1607,1616,1625,1634,1643,1652,1661,1670,1679,1688,1697,1706],
    vault: {
      id: "s16_vault",
      name: "The Glass House Vault",
      coupon: "VAULT-S16",
      badge: { id: "s16_badge", name: "The Glass House Vault Badge", symbol: "🏛", description: "Awarded for recovering all 12 cases in Season Sixteen." },
      lore: "All The Glass House case files recovered. Season Sixteen archive unsealed."
    },
    cases: [
      { id: "181", title: "What Everyone Saw", url: "case.html?id=181", released: false, releaseDate: null, gradient: ["#7a7a7a","#0e0e0e"], streaming: {} },
      { id: "182", title: "The Transparent Life", url: "case.html?id=182", released: false, releaseDate: null, gradient: ["#2a6a3a","#080e08"], streaming: {} },
      { id: "183", title: "The Crack", url: "case.html?id=183", released: false, releaseDate: null, gradient: ["#6a3a3a","#0e0808"], streaming: {} },
      { id: "184", title: "What Shattered", url: "case.html?id=184", released: false, releaseDate: null, gradient: ["#3a3a6a","#08080e"], streaming: {} },
      { id: "185", title: "Glass in the Wound", url: "case.html?id=185", released: false, releaseDate: null, gradient: ["#5a2a7a","#0e0810"], streaming: {} },
      { id: "186", title: "The Reflection", url: "case.html?id=186", released: false, releaseDate: null, gradient: ["#4a7a2a","#080e08"], streaming: {} },
      { id: "187", title: "What Hid in Plain Sight", url: "case.html?id=187", released: false, releaseDate: null, gradient: ["#7a4a2a","#100e08"], streaming: {} },
      { id: "188", title: "The Window", url: "case.html?id=188", released: false, releaseDate: null, gradient: ["#2a5a5a","#08100e"], streaming: {} },
      { id: "189", title: "The Blind Spot", url: "case.html?id=189", released: false, releaseDate: null, gradient: ["#6a2a6a","#0e080e"], streaming: {} },
      { id: "190", title: "Refraction", url: "case.html?id=190", released: false, releaseDate: null, gradient: ["#3a7a6a","#080e10"], streaming: {} },
      { id: "191", title: "What Glass Remembers", url: "case.html?id=191", released: false, releaseDate: null, gradient: ["#8a2a3a","#100808"], streaming: {} },
      { id: "192", title: "The Fall", url: "case.html?id=192", released: false, releaseDate: null, gradient: ["#4a5a2a","#080e08"], streaming: {} }
    ]
  },
  {
    id: "season17",
    title: "Season Seventeen",
    subtitle: "The Cold Season",
    totalCases: 12,
    digits: [1707,1716,1725,1734,1743,1752,1761,1770,1779,1788,1797,1806],
    vault: {
      id: "s17_vault",
      name: "The Cold Season Vault",
      coupon: "VAULT-S17",
      badge: { id: "s17_badge", name: "The Cold Season Vault Badge", symbol: "🏛", description: "Awarded for recovering all 12 cases in Season Seventeen." },
      lore: "All The Cold Season case files recovered. Season Seventeen archive unsealed."
    },
    cases: [
      { id: "193", title: "September's End", url: "case.html?id=193", released: false, releaseDate: null, gradient: ["#2a6a3a","#080e08"], streaming: {} },
      { id: "194", title: "The Turning", url: "case.html?id=194", released: false, releaseDate: null, gradient: ["#6a3a3a","#0e0808"], streaming: {} },
      { id: "195", title: "The Last Warm Day", url: "case.html?id=195", released: false, releaseDate: null, gradient: ["#3a3a6a","#08080e"], streaming: {} },
      { id: "196", title: "What Cold Preserves", url: "case.html?id=196", released: false, releaseDate: null, gradient: ["#5a2a7a","#0e0810"], streaming: {} },
      { id: "197", title: "The Frozen Evidence", url: "case.html?id=197", released: false, releaseDate: null, gradient: ["#4a7a2a","#080e08"], streaming: {} },
      { id: "198", title: "What the Ground Held", url: "case.html?id=198", released: false, releaseDate: null, gradient: ["#7a4a2a","#100e08"], streaming: {} },
      { id: "199", title: "Winter Witness", url: "case.html?id=199", released: false, releaseDate: null, gradient: ["#2a5a5a","#08100e"], streaming: {} },
      { id: "200", title: "The Ice", url: "case.html?id=200", released: false, releaseDate: null, gradient: ["#6a2a6a","#0e080e"], streaming: {} },
      { id: "201", title: "The Cold Case", url: "case.html?id=201", released: false, releaseDate: null, gradient: ["#3a7a6a","#080e10"], streaming: {} },
      { id: "202", title: "Thaw Reveals", url: "case.html?id=202", released: false, releaseDate: null, gradient: ["#8a2a3a","#100808"], streaming: {} },
      { id: "203", title: "What Cold Distorts", url: "case.html?id=203", released: false, releaseDate: null, gradient: ["#4a5a2a","#080e08"], streaming: {} },
      { id: "204", title: "First Spring", url: "case.html?id=204", released: false, releaseDate: null, gradient: ["#2a3a8a","#08080e"], streaming: {} }
    ]
  },
  {
    id: "season18",
    title: "Season Eighteen",
    subtitle: "The Hollow Names",
    totalCases: 12,
    digits: [1807,1816,1825,1834,1843,1852,1861,1870,1879,1888,1897,1906],
    vault: {
      id: "s18_vault",
      name: "The Hollow Names Vault",
      coupon: "VAULT-S18",
      badge: { id: "s18_badge", name: "The Hollow Names Vault Badge", symbol: "🏛", description: "Awarded for recovering all 12 cases in Season Eighteen." },
      lore: "All The Hollow Names case files recovered. Season Eighteen archive unsealed."
    },
    cases: [
      { id: "205", title: "A Name With No Face", url: "case.html?id=205", released: false, releaseDate: null, gradient: ["#6a3a3a","#0e0808"], streaming: {} },
      { id: "206", title: "The Alias", url: "case.html?id=206", released: false, releaseDate: null, gradient: ["#3a3a6a","#08080e"], streaming: {} },
      { id: "207", title: "What They Called Themselves", url: "case.html?id=207", released: false, releaseDate: null, gradient: ["#5a2a7a","#0e0810"], streaming: {} },
      { id: "208", title: "The Register", url: "case.html?id=208", released: false, releaseDate: null, gradient: ["#4a7a2a","#080e08"], streaming: {} },
      { id: "209", title: "The Wrong Name", url: "case.html?id=209", released: false, releaseDate: null, gradient: ["#7a4a2a","#100e08"], streaming: {} },
      { id: "210", title: "The Changed Identity", url: "case.html?id=210", released: false, releaseDate: null, gradient: ["#2a5a5a","#08100e"], streaming: {} },
      { id: "211", title: "The Name Before", url: "case.html?id=211", released: false, releaseDate: null, gradient: ["#6a2a6a","#0e080e"], streaming: {} },
      { id: "212", title: "The Signature", url: "case.html?id=212", released: false, releaseDate: null, gradient: ["#3a7a6a","#080e10"], streaming: {} },
      { id: "213", title: "What Records Say", url: "case.html?id=213", released: false, releaseDate: null, gradient: ["#8a2a3a","#100808"], streaming: {} },
      { id: "214", title: "Named and Unnamed", url: "case.html?id=214", released: false, releaseDate: null, gradient: ["#4a5a2a","#080e08"], streaming: {} },
      { id: "215", title: "Who Answered", url: "case.html?id=215", released: false, releaseDate: null, gradient: ["#2a3a8a","#08080e"], streaming: {} },
      { id: "216", title: "The True Name", url: "case.html?id=216", released: false, releaseDate: null, gradient: ["#7a2a7a","#100810"], streaming: {} }
    ]
  },
  {
    id: "season19",
    title: "Season Nineteen",
    subtitle: "The Bridge Burner",
    totalCases: 12,
    digits: [1907,1916,1925,1934,1943,1952,1961,1970,1979,1988,1997,2006],
    vault: {
      id: "s19_vault",
      name: "The Bridge Burner Vault",
      coupon: "VAULT-S19",
      badge: { id: "s19_badge", name: "The Bridge Burner Vault Badge", symbol: "🏛", description: "Awarded for recovering all 12 cases in Season Nineteen." },
      lore: "All The Bridge Burner case files recovered. Season Nineteen archive unsealed."
    },
    cases: [
      { id: "217", title: "Before the Crossing", url: "case.html?id=217", released: false, releaseDate: null, gradient: ["#3a3a6a","#08080e"], streaming: {} },
      { id: "218", title: "The Last Transit", url: "case.html?id=218", released: false, releaseDate: null, gradient: ["#5a2a7a","#0e0810"], streaming: {} },
      { id: "219", title: "Torched", url: "case.html?id=219", released: false, releaseDate: null, gradient: ["#4a7a2a","#080e08"], streaming: {} },
      { id: "220", title: "Who Set It", url: "case.html?id=220", released: false, releaseDate: null, gradient: ["#7a4a2a","#100e08"], streaming: {} },
      { id: "221", title: "The Evidence", url: "case.html?id=221", released: false, releaseDate: null, gradient: ["#2a5a5a","#08100e"], streaming: {} },
      { id: "222", title: "Cut Off", url: "case.html?id=222", released: false, releaseDate: null, gradient: ["#6a2a6a","#0e080e"], streaming: {} },
      { id: "223", title: "The Other Side", url: "case.html?id=223", released: false, releaseDate: null, gradient: ["#3a7a6a","#080e10"], streaming: {} },
      { id: "224", title: "Smoke on the Water", url: "case.html?id=224", released: false, releaseDate: null, gradient: ["#8a2a3a","#100808"], streaming: {} },
      { id: "225", title: "Why the Bridge", url: "case.html?id=225", released: false, releaseDate: null, gradient: ["#4a5a2a","#080e08"], streaming: {} },
      { id: "226", title: "What Was Crossing", url: "case.html?id=226", released: false, releaseDate: null, gradient: ["#2a3a8a","#08080e"], streaming: {} },
      { id: "227", title: "The Gap", url: "case.html?id=227", released: false, releaseDate: null, gradient: ["#7a2a7a","#100810"], streaming: {} },
      { id: "228", title: "The New Bridge", url: "case.html?id=228", released: false, releaseDate: null, gradient: ["#3a6a7a","#08100e"], streaming: {} }
    ]
  },
  {
    id: "season20",
    title: "Season Twenty",
    subtitle: "The Midnight Circuit",
    totalCases: 12,
    digits: [2007,2016,2025,2034,2043,2052,2061,2070,2079,2088,2097,2106],
    vault: {
      id: "s20_vault",
      name: "The Midnight Circuit Vault",
      coupon: "VAULT-S20",
      badge: { id: "s20_badge", name: "The Midnight Circuit Vault Badge", symbol: "🏛", description: "Awarded for recovering all 12 cases in Season Twenty." },
      lore: "All The Midnight Circuit case files recovered. Season Twenty archive unsealed."
    },
    cases: [
      { id: "229", title: "The Night Route", url: "case.html?id=229", released: false, releaseDate: null, gradient: ["#5a2a7a","#0e0810"], streaming: {} },
      { id: "230", title: "The 12 AM Stop", url: "case.html?id=230", released: false, releaseDate: null, gradient: ["#4a7a2a","#080e08"], streaming: {} },
      { id: "231", title: "What Runs at Midnight", url: "case.html?id=231", released: false, releaseDate: null, gradient: ["#7a4a2a","#100e08"], streaming: {} },
      { id: "232", title: "The Night Worker", url: "case.html?id=232", released: false, releaseDate: null, gradient: ["#2a5a5a","#08100e"], streaming: {} },
      { id: "233", title: "The Shift", url: "case.html?id=233", released: false, releaseDate: null, gradient: ["#6a2a6a","#0e080e"], streaming: {} },
      { id: "234", title: "Graveyard Hours", url: "case.html?id=234", released: false, releaseDate: null, gradient: ["#3a7a6a","#080e10"], streaming: {} },
      { id: "235", title: "The Night Evidence", url: "case.html?id=235", released: false, releaseDate: null, gradient: ["#8a2a3a","#100808"], streaming: {} },
      { id: "236", title: "What Wakes", url: "case.html?id=236", released: false, releaseDate: null, gradient: ["#4a5a2a","#080e08"], streaming: {} },
      { id: "237", title: "The Circuit", url: "case.html?id=237", released: false, releaseDate: null, gradient: ["#2a3a8a","#08080e"], streaming: {} },
      { id: "238", title: "Dark Movement", url: "case.html?id=238", released: false, releaseDate: null, gradient: ["#7a2a7a","#100810"], streaming: {} },
      { id: "239", title: "Night Witness", url: "case.html?id=239", released: false, releaseDate: null, gradient: ["#3a6a7a","#08100e"], streaming: {} },
      { id: "240", title: "The Morning After", url: "case.html?id=240", released: false, releaseDate: null, gradient: ["#5a7a3a","#0a0e08"], streaming: {} }
    ]
  },
  {
    id: "season21",
    title: "Season Twenty-One",
    subtitle: "The Witness Tree",
    totalCases: 12,
    digits: [2107,2116,2125,2134,2143,2152,2161,2170,2179,2188,2197,2206],
    vault: {
      id: "s21_vault",
      name: "The Witness Tree Vault",
      coupon: "VAULT-S21",
      badge: { id: "s21_badge", name: "The Witness Tree Vault Badge", symbol: "🏛", description: "Awarded for recovering all 12 cases in Season Twenty-One." },
      lore: "All The Witness Tree case files recovered. Season Twenty-One archive unsealed."
    },
    cases: [
      { id: "241", title: "The Old Oak", url: "case.html?id=241", released: false, releaseDate: null, gradient: ["#4a7a2a","#080e08"], streaming: {} },
      { id: "242", title: "What the Tree Saw", url: "case.html?id=242", released: false, releaseDate: null, gradient: ["#7a4a2a","#100e08"], streaming: {} },
      { id: "243", title: "Carved in Bark", url: "case.html?id=243", released: false, releaseDate: null, gradient: ["#2a5a5a","#08100e"], streaming: {} },
      { id: "244", title: "The Ring Count", url: "case.html?id=244", released: false, releaseDate: null, gradient: ["#6a2a6a","#0e080e"], streaming: {} },
      { id: "245", title: "Growing Over", url: "case.html?id=245", released: false, releaseDate: null, gradient: ["#3a7a6a","#080e10"], streaming: {} },
      { id: "246", title: "What the Roots Hold", url: "case.html?id=246", released: false, releaseDate: null, gradient: ["#8a2a3a","#100808"], streaming: {} },
      { id: "247", title: "The Tree Line", url: "case.html?id=247", released: false, releaseDate: null, gradient: ["#4a5a2a","#080e08"], streaming: {} },
      { id: "248", title: "The Hollow", url: "case.html?id=248", released: false, releaseDate: null, gradient: ["#2a3a8a","#08080e"], streaming: {} },
      { id: "249", title: "Evidence in Wood", url: "case.html?id=249", released: false, releaseDate: null, gradient: ["#7a2a7a","#100810"], streaming: {} },
      { id: "250", title: "The Grove", url: "case.html?id=250", released: false, releaseDate: null, gradient: ["#3a6a7a","#08100e"], streaming: {} },
      { id: "251", title: "What Grew Here", url: "case.html?id=251", released: false, releaseDate: null, gradient: ["#5a7a3a","#0a0e08"], streaming: {} },
      { id: "252", title: "The Felled Tree", url: "case.html?id=252", released: false, releaseDate: null, gradient: ["#2a7a5a","#080e0a"], streaming: {} }
    ]
  },
  {
    id: "season22",
    title: "Season Twenty-Two",
    subtitle: "The Bone Road",
    totalCases: 12,
    digits: [2207,2216,2225,2234,2243,2252,2261,2270,2279,2288,2297,2306],
    vault: {
      id: "s22_vault",
      name: "The Bone Road Vault",
      coupon: "VAULT-S22",
      badge: { id: "s22_badge", name: "The Bone Road Vault Badge", symbol: "🏛", description: "Awarded for recovering all 12 cases in Season Twenty-Two." },
      lore: "All The Bone Road case files recovered. Season Twenty-Two archive unsealed."
    },
    cases: [
      { id: "253", title: "What the Ground Gives", url: "case.html?id=253", released: false, releaseDate: null, gradient: ["#7a4a2a","#100e08"], streaming: {} },
      { id: "254", title: "The Excavation", url: "case.html?id=254", released: false, releaseDate: null, gradient: ["#2a5a5a","#08100e"], streaming: {} },
      { id: "255", title: "Identification", url: "case.html?id=255", released: false, releaseDate: null, gradient: ["#6a2a6a","#0e080e"], streaming: {} },
      { id: "256", title: "The Old Burial", url: "case.html?id=256", released: false, releaseDate: null, gradient: ["#3a7a6a","#080e10"], streaming: {} },
      { id: "257", title: "The Unmarked", url: "case.html?id=257", released: false, releaseDate: null, gradient: ["#8a2a3a","#100808"], streaming: {} },
      { id: "258", title: "What Bones Say", url: "case.html?id=258", released: false, releaseDate: null, gradient: ["#4a5a2a","#080e08"], streaming: {} },
      { id: "259", title: "Time of Death", url: "case.html?id=259", released: false, releaseDate: null, gradient: ["#2a3a8a","#08080e"], streaming: {} },
      { id: "260", title: "The Coroner's Note", url: "case.html?id=260", released: false, releaseDate: null, gradient: ["#7a2a7a","#100810"], streaming: {} },
      { id: "261", title: "Cause", url: "case.html?id=261", released: false, releaseDate: null, gradient: ["#3a6a7a","#08100e"], streaming: {} },
      { id: "262", title: "The Connection", url: "case.html?id=262", released: false, releaseDate: null, gradient: ["#5a7a3a","#0a0e08"], streaming: {} },
      { id: "263", title: "The Other Body", url: "case.html?id=263", released: false, releaseDate: null, gradient: ["#2a7a5a","#080e0a"], streaming: {} },
      { id: "264", title: "The Living", url: "case.html?id=264", released: false, releaseDate: null, gradient: ["#7a5a2a","#100e08"], streaming: {} }
    ]
  },
  {
    id: "season23",
    title: "Season Twenty-Three",
    subtitle: "The Paper Trail",
    totalCases: 12,
    digits: [2307,2316,2325,2334,2343,2352,2361,2370,2379,2388,2397,2406],
    vault: {
      id: "s23_vault",
      name: "The Paper Trail Vault",
      coupon: "VAULT-S23",
      badge: { id: "s23_badge", name: "The Paper Trail Vault Badge", symbol: "🏛", description: "Awarded for recovering all 12 cases in Season Twenty-Three." },
      lore: "All The Paper Trail case files recovered. Season Twenty-Three archive unsealed."
    },
    cases: [
      { id: "265", title: "The First Document", url: "case.html?id=265", released: false, releaseDate: null, gradient: ["#2a5a5a","#08100e"], streaming: {} },
      { id: "266", title: "The Receipt", url: "case.html?id=266", released: false, releaseDate: null, gradient: ["#6a2a6a","#0e080e"], streaming: {} },
      { id: "267", title: "Cross-Reference", url: "case.html?id=267", released: false, releaseDate: null, gradient: ["#3a7a6a","#080e10"], streaming: {} },
      { id: "268", title: "The Letter Chain", url: "case.html?id=268", released: false, releaseDate: null, gradient: ["#8a2a3a","#100808"], streaming: {} },
      { id: "269", title: "What the Paper Proves", url: "case.html?id=269", released: false, releaseDate: null, gradient: ["#4a5a2a","#080e08"], streaming: {} },
      { id: "270", title: "The Missing Document", url: "case.html?id=270", released: false, releaseDate: null, gradient: ["#2a3a8a","#08080e"], streaming: {} },
      { id: "271", title: "The Copy", url: "case.html?id=271", released: false, releaseDate: null, gradient: ["#7a2a7a","#100810"], streaming: {} },
      { id: "272", title: "The Signature Match", url: "case.html?id=272", released: false, releaseDate: null, gradient: ["#3a6a7a","#08100e"], streaming: {} },
      { id: "273", title: "Filed Wrong", url: "case.html?id=273", released: false, releaseDate: null, gradient: ["#5a7a3a","#0a0e08"], streaming: {} },
      { id: "274", title: "The Archive", url: "case.html?id=274", released: false, releaseDate: null, gradient: ["#2a7a5a","#080e0a"], streaming: {} },
      { id: "275", title: "Watermark", url: "case.html?id=275", released: false, releaseDate: null, gradient: ["#7a5a2a","#100e08"], streaming: {} },
      { id: "276", title: "The Last Page", url: "case.html?id=276", released: false, releaseDate: null, gradient: ["#4a2a8a","#0a0810"], streaming: {} }
    ]
  },
  {
    id: "season24",
    title: "Season Twenty-Four",
    subtitle: "The Missing Hours",
    totalCases: 12,
    digits: [2407,2416,2425,2434,2443,2452,2461,2470,2479,2488,2497,2506],
    vault: {
      id: "s24_vault",
      name: "The Missing Hours Vault",
      coupon: "VAULT-S24",
      badge: { id: "s24_badge", name: "The Missing Hours Vault Badge", symbol: "🏛", description: "Awarded for recovering all 12 cases in Season Twenty-Four." },
      lore: "All The Missing Hours case files recovered. Season Twenty-Four archive unsealed."
    },
    cases: [
      { id: "277", title: "11 PM", url: "case.html?id=277", released: false, releaseDate: null, gradient: ["#6a2a6a","#0e080e"], streaming: {} },
      { id: "278", title: "What Happened at Midnight", url: "case.html?id=278", released: false, releaseDate: null, gradient: ["#3a7a6a","#080e10"], streaming: {} },
      { id: "279", title: "The Hour Nobody Saw", url: "case.html?id=279", released: false, releaseDate: null, gradient: ["#8a2a3a","#100808"], streaming: {} },
      { id: "280", title: "The Timeline", url: "case.html?id=280", released: false, releaseDate: null, gradient: ["#4a5a2a","#080e08"], streaming: {} },
      { id: "281", title: "The Alibi Gap", url: "case.html?id=281", released: false, releaseDate: null, gradient: ["#2a3a8a","#08080e"], streaming: {} },
      { id: "282", title: "What the Clock Proves", url: "case.html?id=282", released: false, releaseDate: null, gradient: ["#7a2a7a","#100810"], streaming: {} },
      { id: "283", title: "The Lost Hour", url: "case.html?id=283", released: false, releaseDate: null, gradient: ["#3a6a7a","#08100e"], streaming: {} },
      { id: "284", title: "Who Was Where", url: "case.html?id=284", released: false, releaseDate: null, gradient: ["#5a7a3a","#0a0e08"], streaming: {} },
      { id: "285", title: "The Window", url: "case.html?id=285", released: false, releaseDate: null, gradient: ["#2a7a5a","#080e0a"], streaming: {} },
      { id: "286", title: "Minutes Matter", url: "case.html?id=286", released: false, releaseDate: null, gradient: ["#7a5a2a","#100e08"], streaming: {} },
      { id: "287", title: "The Reconstruction", url: "case.html?id=287", released: false, releaseDate: null, gradient: ["#4a2a8a","#0a0810"], streaming: {} },
      { id: "288", title: "What the Hours Say", url: "case.html?id=288", released: false, releaseDate: null, gradient: ["#6a7a2a","#0a0e08"], streaming: {} }
    ]
  },
  {
    id: "season25",
    title: "Season Twenty-Five",
    subtitle: "The Echo Chamber",
    totalCases: 12,
    digits: [2507,2516,2525,2534,2543,2552,2561,2570,2579,2588,2597,2606],
    vault: {
      id: "s25_vault",
      name: "The Echo Chamber Vault",
      coupon: "VAULT-S25",
      badge: { id: "s25_badge", name: "The Echo Chamber Vault Badge", symbol: "🏛", description: "Awarded for recovering all 12 cases in Season Twenty-Five." },
      lore: "All The Echo Chamber case files recovered. Season Twenty-Five archive unsealed."
    },
    cases: [
      { id: "289", title: "The Repeated Story", url: "case.html?id=289", released: false, releaseDate: null, gradient: ["#3a7a6a","#080e10"], streaming: {} },
      { id: "290", title: "What Changed", url: "case.html?id=290", released: false, releaseDate: null, gradient: ["#8a2a3a","#100808"], streaming: {} },
      { id: "291", title: "The Inconsistency", url: "case.html?id=291", released: false, releaseDate: null, gradient: ["#4a5a2a","#080e08"], streaming: {} },
      { id: "292", title: "The Third Version", url: "case.html?id=292", released: false, releaseDate: null, gradient: ["#2a3a8a","#08080e"], streaming: {} },
      { id: "293", title: "Why She Keeps Telling", url: "case.html?id=293", released: false, releaseDate: null, gradient: ["#7a2a7a","#100810"], streaming: {} },
      { id: "294", title: "The Detail That Shifts", url: "case.html?id=294", released: false, releaseDate: null, gradient: ["#3a6a7a","#08100e"], streaming: {} },
      { id: "295", title: "The Listener", url: "case.html?id=295", released: false, releaseDate: null, gradient: ["#5a7a3a","#0a0e08"], streaming: {} },
      { id: "296", title: "What Echo Reveals", url: "case.html?id=296", released: false, releaseDate: null, gradient: ["#2a7a5a","#080e0a"], streaming: {} },
      { id: "297", title: "The Source Story", url: "case.html?id=297", released: false, releaseDate: null, gradient: ["#7a5a2a","#100e08"], streaming: {} },
      { id: "298", title: "Distortion", url: "case.html?id=298", released: false, releaseDate: null, gradient: ["#4a2a8a","#0a0810"], streaming: {} },
      { id: "299", title: "What Gets Louder", url: "case.html?id=299", released: false, releaseDate: null, gradient: ["#6a7a2a","#0a0e08"], streaming: {} },
      { id: "300", title: "The Original", url: "case.html?id=300", released: false, releaseDate: null, gradient: ["#2a4a6a","#08080e"], streaming: {} }
    ]
  },
  {
    id: "season26",
    title: "Season Twenty-Six",
    subtitle: "The Red Door",
    totalCases: 12,
    digits: [2607,2616,2625,2634,2643,2652,2661,2670,2679,2688,2697,2706],
    vault: {
      id: "s26_vault",
      name: "The Red Door Vault",
      coupon: "VAULT-S26",
      badge: { id: "s26_badge", name: "The Red Door Vault Badge", symbol: "🏛", description: "Awarded for recovering all 12 cases in Season Twenty-Six." },
      lore: "All The Red Door case files recovered. Season Twenty-Six archive unsealed."
    },
    cases: [
      { id: "301", title: "The House on Mill Road", url: "case.html?id=301", released: false, releaseDate: null, gradient: ["#8a2a3a","#100808"], streaming: {} },
      { id: "302", title: "What's Behind It", url: "case.html?id=302", released: false, releaseDate: null, gradient: ["#4a5a2a","#080e08"], streaming: {} },
      { id: "303", title: "Who Has the Key", url: "case.html?id=303", released: false, releaseDate: null, gradient: ["#2a3a8a","#08080e"], streaming: {} },
      { id: "304", title: "The Paint", url: "case.html?id=304", released: false, releaseDate: null, gradient: ["#7a2a7a","#100810"], streaming: {} },
      { id: "305", title: "The Door Before", url: "case.html?id=305", released: false, releaseDate: null, gradient: ["#3a6a7a","#08100e"], streaming: {} },
      { id: "306", title: "What Changed Inside", url: "case.html?id=306", released: false, releaseDate: null, gradient: ["#5a7a3a","#0a0e08"], streaming: {} },
      { id: "307", title: "The Visitor", url: "case.html?id=307", released: false, releaseDate: null, gradient: ["#2a7a5a","#080e0a"], streaming: {} },
      { id: "308", title: "Why Red", url: "case.html?id=308", released: false, releaseDate: null, gradient: ["#7a5a2a","#100e08"], streaming: {} },
      { id: "309", title: "What the Door Kept", url: "case.html?id=309", released: false, releaseDate: null, gradient: ["#4a2a8a","#0a0810"], streaming: {} },
      { id: "310", title: "Entry", url: "case.html?id=310", released: false, releaseDate: null, gradient: ["#6a7a2a","#0a0e08"], streaming: {} },
      { id: "311", title: "What Left", url: "case.html?id=311", released: false, releaseDate: null, gradient: ["#2a4a6a","#08080e"], streaming: {} },
      { id: "312", title: "The Door Stays Locked", url: "case.html?id=312", released: false, releaseDate: null, gradient: ["#7a3a7a","#0e0810"], streaming: {} }
    ]
  },
  {
    id: "season27",
    title: "Season Twenty-Seven",
    subtitle: "The Salt Flats",
    totalCases: 12,
    digits: [2707,2716,2725,2734,2743,2752,2761,2770,2779,2788,2797,2806],
    vault: {
      id: "s27_vault",
      name: "The Salt Flats Vault",
      coupon: "VAULT-S27",
      badge: { id: "s27_badge", name: "The Salt Flats Vault Badge", symbol: "🏛", description: "Awarded for recovering all 12 cases in Season Twenty-Seven." },
      lore: "All The Salt Flats case files recovered. Season Twenty-Seven archive unsealed."
    },
    cases: [
      { id: "313", title: "The Open Ground", url: "case.html?id=313", released: false, releaseDate: null, gradient: ["#4a5a2a","#080e08"], streaming: {} },
      { id: "314", title: "What the Salt Preserves", url: "case.html?id=314", released: false, releaseDate: null, gradient: ["#2a3a8a","#08080e"], streaming: {} },
      { id: "315", title: "The Track", url: "case.html?id=315", released: false, releaseDate: null, gradient: ["#7a2a7a","#100810"], streaming: {} },
      { id: "316", title: "No Cover", url: "case.html?id=316", released: false, releaseDate: null, gradient: ["#3a6a7a","#08100e"], streaming: {} },
      { id: "317", title: "The Distance", url: "case.html?id=317", released: false, releaseDate: null, gradient: ["#5a7a3a","#0a0e08"], streaming: {} },
      { id: "318", title: "What Crossed It", url: "case.html?id=318", released: false, releaseDate: null, gradient: ["#2a7a5a","#080e0a"], streaming: {} },
      { id: "319", title: "The Marker in Salt", url: "case.html?id=319", released: false, releaseDate: null, gradient: ["#7a5a2a","#100e08"], streaming: {} },
      { id: "320", title: "The White Expanse", url: "case.html?id=320", released: false, releaseDate: null, gradient: ["#4a2a8a","#0a0810"], streaming: {} },
      { id: "321", title: "The Figure", url: "case.html?id=321", released: false, releaseDate: null, gradient: ["#6a7a2a","#0a0e08"], streaming: {} },
      { id: "322", title: "What Dissolves", url: "case.html?id=322", released: false, releaseDate: null, gradient: ["#2a4a6a","#08080e"], streaming: {} },
      { id: "323", title: "The Far Side", url: "case.html?id=323", released: false, releaseDate: null, gradient: ["#7a3a7a","#0e0810"], streaming: {} },
      { id: "324", title: "The Return", url: "case.html?id=324", released: false, releaseDate: null, gradient: ["#3a7a3a","#080e08"], streaming: {} }
    ]
  },
  {
    id: "season28",
    title: "Season Twenty-Eight",
    subtitle: "The Buried Signal",
    totalCases: 12,
    digits: [2807,2816,2825,2834,2843,2852,2861,2870,2879,2888,2897,2906],
    vault: {
      id: "s28_vault",
      name: "The Buried Signal Vault",
      coupon: "VAULT-S28",
      badge: { id: "s28_badge", name: "The Buried Signal Vault Badge", symbol: "🏛", description: "Awarded for recovering all 12 cases in Season Twenty-Eight." },
      lore: "All The Buried Signal case files recovered. Season Twenty-Eight archive unsealed."
    },
    cases: [
      { id: "325", title: "Frequency", url: "case.html?id=325", released: false, releaseDate: null, gradient: ["#2a3a8a","#08080e"], streaming: {} },
      { id: "326", title: "The Old Transmitter", url: "case.html?id=326", released: false, releaseDate: null, gradient: ["#7a2a7a","#100810"], streaming: {} },
      { id: "327", title: "What the Signal Said", url: "case.html?id=327", released: false, releaseDate: null, gradient: ["#3a6a7a","#08100e"], streaming: {} },
      { id: "328", title: "Static", url: "case.html?id=328", released: false, releaseDate: null, gradient: ["#5a7a3a","#0a0e08"], streaming: {} },
      { id: "329", title: "The Broadcast", url: "case.html?id=329", released: false, releaseDate: null, gradient: ["#2a7a5a","#080e0a"], streaming: {} },
      { id: "330", title: "Who Was Listening", url: "case.html?id=330", released: false, releaseDate: null, gradient: ["#7a5a2a","#100e08"], streaming: {} },
      { id: "331", title: "The Coded Transmission", url: "case.html?id=331", released: false, releaseDate: null, gradient: ["#4a2a8a","#0a0810"], streaming: {} },
      { id: "332", title: "The Receiver", url: "case.html?id=332", released: false, releaseDate: null, gradient: ["#6a7a2a","#0a0e08"], streaming: {} },
      { id: "333", title: "When It Stopped", url: "case.html?id=333", released: false, releaseDate: null, gradient: ["#2a4a6a","#08080e"], streaming: {} },
      { id: "334", title: "What It Started", url: "case.html?id=334", released: false, releaseDate: null, gradient: ["#7a3a7a","#0e0810"], streaming: {} },
      { id: "335", title: "The Source", url: "case.html?id=335", released: false, releaseDate: null, gradient: ["#3a7a3a","#080e08"], streaming: {} },
      { id: "336", title: "Clear Signal", url: "case.html?id=336", released: false, releaseDate: null, gradient: ["#5a2a5a","#0e080e"], streaming: {} }
    ]
  },
  {
    id: "season29",
    title: "Season Twenty-Nine",
    subtitle: "The Unmarked Grave",
    totalCases: 12,
    digits: [2907,2916,2925,2934,2943,2952,2961,2970,2979,2988,2997,3006],
    vault: {
      id: "s29_vault",
      name: "The Unmarked Grave Vault",
      coupon: "VAULT-S29",
      badge: { id: "s29_badge", name: "The Unmarked Grave Vault Badge", symbol: "🏛", description: "Awarded for recovering all 12 cases in Season Twenty-Nine." },
      lore: "All The Unmarked Grave case files recovered. Season Twenty-Nine archive unsealed."
    },
    cases: [
      { id: "337", title: "No Name", url: "case.html?id=337", released: false, releaseDate: null, gradient: ["#7a2a7a","#100810"], streaming: {} },
      { id: "338", title: "The Location", url: "case.html?id=338", released: false, releaseDate: null, gradient: ["#3a6a7a","#08100e"], streaming: {} },
      { id: "339", title: "The Digger", url: "case.html?id=339", released: false, releaseDate: null, gradient: ["#5a7a3a","#0a0e08"], streaming: {} },
      { id: "340", title: "When It Was Made", url: "case.html?id=340", released: false, releaseDate: null, gradient: ["#2a7a5a","#080e0a"], streaming: {} },
      { id: "341", title: "What It Contains", url: "case.html?id=341", released: false, releaseDate: null, gradient: ["#7a5a2a","#100e08"], streaming: {} },
      { id: "342", title: "Who Knows", url: "case.html?id=342", released: false, releaseDate: null, gradient: ["#4a2a8a","#0a0810"], streaming: {} },
      { id: "343", title: "The Second Grave", url: "case.html?id=343", released: false, releaseDate: null, gradient: ["#6a7a2a","#0a0e08"], streaming: {} },
      { id: "344", title: "The Connection", url: "case.html?id=344", released: false, releaseDate: null, gradient: ["#2a4a6a","#08080e"], streaming: {} },
      { id: "345", title: "What Was Done Right", url: "case.html?id=345", released: false, releaseDate: null, gradient: ["#7a3a7a","#0e0810"], streaming: {} },
      { id: "346", title: "What Was Wrong", url: "case.html?id=346", released: false, releaseDate: null, gradient: ["#3a7a3a","#080e08"], streaming: {} },
      { id: "347", title: "The Investigation", url: "case.html?id=347", released: false, releaseDate: null, gradient: ["#5a2a5a","#0e080e"], streaming: {} },
      { id: "348", title: "The Marking", url: "case.html?id=348", released: false, releaseDate: null, gradient: ["#2a8a4a","#080e0a"], streaming: {} }
    ]
  },
  {
    id: "season30",
    title: "Season Thirty",
    subtitle: "The Last Train",
    totalCases: 12,
    digits: [3007,3016,3025,3034,3043,3052,3061,3070,3079,3088,3097,3106],
    vault: {
      id: "s30_vault",
      name: "The Last Train Vault",
      coupon: "VAULT-S30",
      badge: { id: "s30_badge", name: "The Last Train Vault Badge", symbol: "🏛", description: "Awarded for recovering all 12 cases in Season Thirty." },
      lore: "All The Last Train case files recovered. Season Thirty archive unsealed."
    },
    cases: [
      { id: "349", title: "Final Departure", url: "case.html?id=349", released: false, releaseDate: null, gradient: ["#3a6a7a","#08100e"], streaming: {} },
      { id: "350", title: "The Ticket", url: "case.html?id=350", released: false, releaseDate: null, gradient: ["#5a7a3a","#0a0e08"], streaming: {} },
      { id: "351", title: "Who Was on It", url: "case.html?id=351", released: false, releaseDate: null, gradient: ["#2a7a5a","#080e0a"], streaming: {} },
      { id: "352", title: "The Passenger", url: "case.html?id=352", released: false, releaseDate: null, gradient: ["#7a5a2a","#100e08"], streaming: {} },
      { id: "353", title: "What Was Left on Board", url: "case.html?id=353", released: false, releaseDate: null, gradient: ["#4a2a8a","#0a0810"], streaming: {} },
      { id: "354", title: "The Conductor's Memory", url: "case.html?id=354", released: false, releaseDate: null, gradient: ["#6a7a2a","#0a0e08"], streaming: {} },
      { id: "355", title: "The Manifest", url: "case.html?id=355", released: false, releaseDate: null, gradient: ["#2a4a6a","#08080e"], streaming: {} },
      { id: "356", title: "The Stop That Wasn't", url: "case.html?id=356", released: false, releaseDate: null, gradient: ["#7a3a7a","#0e0810"], streaming: {} },
      { id: "357", title: "What Got Off", url: "case.html?id=357", released: false, releaseDate: null, gradient: ["#3a7a3a","#080e08"], streaming: {} },
      { id: "358", title: "The Last Car", url: "case.html?id=358", released: false, releaseDate: null, gradient: ["#5a2a5a","#0e080e"], streaming: {} },
      { id: "359", title: "The Destination", url: "case.html?id=359", released: false, releaseDate: null, gradient: ["#2a8a4a","#080e0a"], streaming: {} },
      { id: "360", title: "After the Line Closed", url: "case.html?id=360", released: false, releaseDate: null, gradient: ["#6a4a6a","#0e080e"], streaming: {} }
    ]
  },
  {
    id: "season31",
    title: "Season Thirty-One",
    subtitle: "The Cipher Garden",
    totalCases: 12,
    digits: [3107,3116,3125,3134,3143,3152,3161,3170,3179,3188,3197,3206],
    vault: {
      id: "s31_vault",
      name: "The Cipher Garden Vault",
      coupon: "VAULT-S31",
      badge: { id: "s31_badge", name: "The Cipher Garden Vault Badge", symbol: "🏛", description: "Awarded for recovering all 12 cases in Season Thirty-One." },
      lore: "All The Cipher Garden case files recovered. Season Thirty-One archive unsealed."
    },
    cases: [
      { id: "361", title: "The Pattern", url: "case.html?id=361", released: false, releaseDate: null, gradient: ["#5a7a3a","#0a0e08"], streaming: {} },
      { id: "362", title: "What Grows Where", url: "case.html?id=362", released: false, releaseDate: null, gradient: ["#2a7a5a","#080e0a"], streaming: {} },
      { id: "363", title: "The Code in the Planting", url: "case.html?id=363", released: false, releaseDate: null, gradient: ["#7a5a2a","#100e08"], streaming: {} },
      { id: "364", title: "The Gardener", url: "case.html?id=364", released: false, releaseDate: null, gradient: ["#4a2a8a","#0a0810"], streaming: {} },
      { id: "365", title: "Hidden Message", url: "case.html?id=365", released: false, releaseDate: null, gradient: ["#6a7a2a","#0a0e08"], streaming: {} },
      { id: "366", title: "The Seasonal Key", url: "case.html?id=366", released: false, releaseDate: null, gradient: ["#2a4a6a","#08080e"], streaming: {} },
      { id: "367", title: "What Blooms When", url: "case.html?id=367", released: false, releaseDate: null, gradient: ["#7a3a7a","#0e0810"], streaming: {} },
      { id: "368", title: "The Arrangement", url: "case.html?id=368", released: false, releaseDate: null, gradient: ["#3a7a3a","#080e08"], streaming: {} },
      { id: "369", title: "The Dead Section", url: "case.html?id=369", released: false, releaseDate: null, gradient: ["#5a2a5a","#0e080e"], streaming: {} },
      { id: "370", title: "What the Garden Hides", url: "case.html?id=370", released: false, releaseDate: null, gradient: ["#2a8a4a","#080e0a"], streaming: {} },
      { id: "371", title: "The Overgrowth", url: "case.html?id=371", released: false, releaseDate: null, gradient: ["#6a4a6a","#0e080e"], streaming: {} },
      { id: "372", title: "Reading the Garden", url: "case.html?id=372", released: false, releaseDate: null, gradient: ["#4a6a2a","#080e08"], streaming: {} }
    ]
  },
  {
    id: "season32",
    title: "Season Thirty-Two",
    subtitle: "The Deep Current",
    totalCases: 12,
    digits: [3207,3216,3225,3234,3243,3252,3261,3270,3279,3288,3297,3306],
    vault: {
      id: "s32_vault",
      name: "The Deep Current Vault",
      coupon: "VAULT-S32",
      badge: { id: "s32_badge", name: "The Deep Current Vault Badge", symbol: "🏛", description: "Awarded for recovering all 12 cases in Season Thirty-Two." },
      lore: "All The Deep Current case files recovered. Season Thirty-Two archive unsealed."
    },
    cases: [
      { id: "373", title: "Below the Surface", url: "case.html?id=373", released: false, releaseDate: null, gradient: ["#2a7a5a","#080e0a"], streaming: {} },
      { id: "374", title: "The Undertow", url: "case.html?id=374", released: false, releaseDate: null, gradient: ["#7a5a2a","#100e08"], streaming: {} },
      { id: "375", title: "What the Depth Holds", url: "case.html?id=375", released: false, releaseDate: null, gradient: ["#4a2a8a","#0a0810"], streaming: {} },
      { id: "376", title: "The Dive", url: "case.html?id=376", released: false, releaseDate: null, gradient: ["#6a7a2a","#0a0e08"], streaming: {} },
      { id: "377", title: "What Came Up", url: "case.html?id=377", released: false, releaseDate: null, gradient: ["#2a4a6a","#08080e"], streaming: {} },
      { id: "378", title: "The Current's Direction", url: "case.html?id=378", released: false, releaseDate: null, gradient: ["#7a3a7a","#0e0810"], streaming: {} },
      { id: "379", title: "The Bottom", url: "case.html?id=379", released: false, releaseDate: null, gradient: ["#3a7a3a","#080e08"], streaming: {} },
      { id: "380", title: "What Sank", url: "case.html?id=380", released: false, releaseDate: null, gradient: ["#5a2a5a","#0e080e"], streaming: {} },
      { id: "381", title: "The Depth Mark", url: "case.html?id=381", released: false, releaseDate: null, gradient: ["#2a8a4a","#080e0a"], streaming: {} },
      { id: "382", title: "What the Current Moved", url: "case.html?id=382", released: false, releaseDate: null, gradient: ["#6a4a6a","#0e080e"], streaming: {} },
      { id: "383", title: "The Surface Break", url: "case.html?id=383", released: false, releaseDate: null, gradient: ["#4a6a2a","#080e08"], streaming: {} },
      { id: "384", title: "What Rose", url: "case.html?id=384", released: false, releaseDate: null, gradient: ["#8a3a2a","#100808"], streaming: {} }
    ]
  },
  {
    id: "season33",
    title: "Season Thirty-Three",
    subtitle: "The Pale Season",
    totalCases: 12,
    digits: [3307,3316,3325,3334,3343,3352,3361,3370,3379,3388,3397,3406],
    vault: {
      id: "s33_vault",
      name: "The Pale Season Vault",
      coupon: "VAULT-S33",
      badge: { id: "s33_badge", name: "The Pale Season Vault Badge", symbol: "🏛", description: "Awarded for recovering all 12 cases in Season Thirty-Three." },
      lore: "All The Pale Season case files recovered. Season Thirty-Three archive unsealed."
    },
    cases: [
      { id: "385", title: "Bleached", url: "case.html?id=385", released: false, releaseDate: null, gradient: ["#7a5a2a","#100e08"], streaming: {} },
      { id: "386", title: "The White Month", url: "case.html?id=386", released: false, releaseDate: null, gradient: ["#4a2a8a","#0a0810"], streaming: {} },
      { id: "387", title: "What Fades", url: "case.html?id=387", released: false, releaseDate: null, gradient: ["#6a7a2a","#0a0e08"], streaming: {} },
      { id: "388", title: "The Color That Left", url: "case.html?id=388", released: false, releaseDate: null, gradient: ["#2a4a6a","#08080e"], streaming: {} },
      { id: "389", title: "Washed Out", url: "case.html?id=389", released: false, releaseDate: null, gradient: ["#7a3a7a","#0e0810"], streaming: {} },
      { id: "390", title: "The Pale Witness", url: "case.html?id=390", released: false, releaseDate: null, gradient: ["#3a7a3a","#080e08"], streaming: {} },
      { id: "391", title: "Faded Evidence", url: "case.html?id=391", released: false, releaseDate: null, gradient: ["#5a2a5a","#0e080e"], streaming: {} },
      { id: "392", title: "What the Light Did", url: "case.html?id=392", released: false, releaseDate: null, gradient: ["#2a8a4a","#080e0a"], streaming: {} },
      { id: "393", title: "The Pallor", url: "case.html?id=393", released: false, releaseDate: null, gradient: ["#6a4a6a","#0e080e"], streaming: {} },
      { id: "394", title: "Bleached Record", url: "case.html?id=394", released: false, releaseDate: null, gradient: ["#4a6a2a","#080e08"], streaming: {} },
      { id: "395", title: "What White Hides", url: "case.html?id=395", released: false, releaseDate: null, gradient: ["#8a3a2a","#100808"], streaming: {} },
      { id: "396", title: "Return of Color", url: "case.html?id=396", released: false, releaseDate: null, gradient: ["#2a6a8a","#08100e"], streaming: {} }
    ]
  },
  {
    id: "season34",
    title: "Season Thirty-Four",
    subtitle: "The Locked Ward",
    totalCases: 12,
    digits: [3407,3416,3425,3434,3443,3452,3461,3470,3479,3488,3497,3506],
    vault: {
      id: "s34_vault",
      name: "The Locked Ward Vault",
      coupon: "VAULT-S34",
      badge: { id: "s34_badge", name: "The Locked Ward Vault Badge", symbol: "🏛", description: "Awarded for recovering all 12 cases in Season Thirty-Four." },
      lore: "All The Locked Ward case files recovered. Season Thirty-Four archive unsealed."
    },
    cases: [
      { id: "397", title: "Admission", url: "case.html?id=397", released: false, releaseDate: null, gradient: ["#4a2a8a","#0a0810"], streaming: {} },
      { id: "398", title: "The Record", url: "case.html?id=398", released: false, releaseDate: null, gradient: ["#6a7a2a","#0a0e08"], streaming: {} },
      { id: "399", title: "What She Said Inside", url: "case.html?id=399", released: false, releaseDate: null, gradient: ["#2a4a6a","#08080e"], streaming: {} },
      { id: "400", title: "The Doctor's Note", url: "case.html?id=400", released: false, releaseDate: null, gradient: ["#7a3a7a","#0e0810"], streaming: {} },
      { id: "401", title: "Discharged", url: "case.html?id=401", released: false, releaseDate: null, gradient: ["#3a7a3a","#080e08"], streaming: {} },
      { id: "402", title: "The Treatment", url: "case.html?id=402", released: false, releaseDate: null, gradient: ["#5a2a5a","#0e080e"], streaming: {} },
      { id: "403", title: "What the Ward Kept", url: "case.html?id=403", released: false, releaseDate: null, gradient: ["#2a8a4a","#080e0a"], streaming: {} },
      { id: "404", title: "The Other Patient", url: "case.html?id=404", released: false, releaseDate: null, gradient: ["#6a4a6a","#0e080e"], streaming: {} },
      { id: "405", title: "The Missing Week", url: "case.html?id=405", released: false, releaseDate: null, gradient: ["#4a6a2a","#080e08"], streaming: {} },
      { id: "406", title: "The Visit", url: "case.html?id=406", released: false, releaseDate: null, gradient: ["#8a3a2a","#100808"], streaming: {} },
      { id: "407", title: "Release", url: "case.html?id=407", released: false, releaseDate: null, gradient: ["#2a6a8a","#08100e"], streaming: {} },
      { id: "408", title: "What Came Out With Her", url: "case.html?id=408", released: false, releaseDate: null, gradient: ["#5a5a2a","#0e0e08"], streaming: {} }
    ]
  },
  {
    id: "season35",
    title: "Season Thirty-Five",
    subtitle: "The Archive Keeper",
    totalCases: 12,
    digits: [3507,3516,3525,3534,3543,3552,3561,3570,3579,3588,3597,3606],
    vault: {
      id: "s35_vault",
      name: "The Archive Keeper Vault",
      coupon: "VAULT-S35",
      badge: { id: "s35_badge", name: "The Archive Keeper Vault Badge", symbol: "🏛", description: "Awarded for recovering all 12 cases in Season Thirty-Five." },
      lore: "All The Archive Keeper case files recovered. Season Thirty-Five archive unsealed."
    },
    cases: [
      { id: "409", title: "The Collection", url: "case.html?id=409", released: false, releaseDate: null, gradient: ["#6a7a2a","#0a0e08"], streaming: {} },
      { id: "410", title: "What Was Kept", url: "case.html?id=410", released: false, releaseDate: null, gradient: ["#2a4a6a","#08080e"], streaming: {} },
      { id: "411", title: "The Missing Item", url: "case.html?id=411", released: false, releaseDate: null, gradient: ["#7a3a7a","#0e0810"], streaming: {} },
      { id: "412", title: "The Catalog", url: "case.html?id=412", released: false, releaseDate: null, gradient: ["#3a7a3a","#080e08"], streaming: {} },
      { id: "413", title: "Access Denied", url: "case.html?id=413", released: false, releaseDate: null, gradient: ["#5a2a5a","#0e080e"], streaming: {} },
      { id: "414", title: "The Restricted Section", url: "case.html?id=414", released: false, releaseDate: null, gradient: ["#2a8a4a","#080e0a"], streaming: {} },
      { id: "415", title: "What the Keeper Knows", url: "case.html?id=415", released: false, releaseDate: null, gradient: ["#6a4a6a","#0e080e"], streaming: {} },
      { id: "416", title: "The Old File", url: "case.html?id=416", released: false, releaseDate: null, gradient: ["#4a6a2a","#080e08"], streaming: {} },
      { id: "417", title: "The Burn Order", url: "case.html?id=417", released: false, releaseDate: null, gradient: ["#8a3a2a","#100808"], streaming: {} },
      { id: "418", title: "What Survived", url: "case.html?id=418", released: false, releaseDate: null, gradient: ["#2a6a8a","#08100e"], streaming: {} },
      { id: "419", title: "The Index Error", url: "case.html?id=419", released: false, releaseDate: null, gradient: ["#5a5a2a","#0e0e08"], streaming: {} },
      { id: "420", title: "The Sealed Box", url: "case.html?id=420", released: false, releaseDate: null, gradient: ["#3a2a7a","#080810"], streaming: {} }
    ]
  },
  {
    id: "season36",
    title: "Season Thirty-Six",
    subtitle: "The Night Caller",
    totalCases: 12,
    digits: [3607,3616,3625,3634,3643,3652,3661,3670,3679,3688,3697,3706],
    vault: {
      id: "s36_vault",
      name: "The Night Caller Vault",
      coupon: "VAULT-S36",
      badge: { id: "s36_badge", name: "The Night Caller Vault Badge", symbol: "🏛", description: "Awarded for recovering all 12 cases in Season Thirty-Six." },
      lore: "All The Night Caller case files recovered. Season Thirty-Six archive unsealed."
    },
    cases: [
      { id: "421", title: "The First Call", url: "case.html?id=421", released: false, releaseDate: null, gradient: ["#2a4a6a","#08080e"], streaming: {} },
      { id: "422", title: "What Was Said", url: "case.html?id=422", released: false, releaseDate: null, gradient: ["#7a3a7a","#0e0810"], streaming: {} },
      { id: "423", title: "2 AM", url: "case.html?id=423", released: false, releaseDate: null, gradient: ["#3a7a3a","#080e08"], streaming: {} },
      { id: "424", title: "The Voice", url: "case.html?id=424", released: false, releaseDate: null, gradient: ["#5a2a5a","#0e080e"], streaming: {} },
      { id: "425", title: "The Pattern", url: "case.html?id=425", released: false, releaseDate: null, gradient: ["#2a8a4a","#080e0a"], streaming: {} },
      { id: "426", title: "Who Was Calling", url: "case.html?id=426", released: false, releaseDate: null, gradient: ["#6a4a6a","#0e080e"], streaming: {} },
      { id: "427", title: "The Recording", url: "case.html?id=427", released: false, releaseDate: null, gradient: ["#4a6a2a","#080e08"], streaming: {} },
      { id: "428", title: "The Number", url: "case.html?id=428", released: false, releaseDate: null, gradient: ["#8a3a2a","#100808"], streaming: {} },
      { id: "429", title: "When It Stopped", url: "case.html?id=429", released: false, releaseDate: null, gradient: ["#2a6a8a","#08100e"], streaming: {} },
      { id: "430", title: "What the Calls Mean", url: "case.html?id=430", released: false, releaseDate: null, gradient: ["#5a5a2a","#0e0e08"], streaming: {} },
      { id: "431", title: "The Response", url: "case.html?id=431", released: false, releaseDate: null, gradient: ["#3a2a7a","#080810"], streaming: {} },
      { id: "432", title: "The Last Call", url: "case.html?id=432", released: false, releaseDate: null, gradient: ["#6a2a4a","#0e0808"], streaming: {} }
    ]
  },
  {
    id: "season37",
    title: "Season Thirty-Seven",
    subtitle: "The Abandoned Post",
    totalCases: 12,
    digits: [3707,3716,3725,3734,3743,3752,3761,3770,3779,3788,3797,3806],
    vault: {
      id: "s37_vault",
      name: "The Abandoned Post Vault",
      coupon: "VAULT-S37",
      badge: { id: "s37_badge", name: "The Abandoned Post Vault Badge", symbol: "🏛", description: "Awarded for recovering all 12 cases in Season Thirty-Seven." },
      lore: "All The Abandoned Post case files recovered. Season Thirty-Seven archive unsealed."
    },
    cases: [
      { id: "433", title: "The Outpost", url: "case.html?id=433", released: false, releaseDate: null, gradient: ["#7a3a7a","#0e0810"], streaming: {} },
      { id: "434", title: "Who Staffed It", url: "case.html?id=434", released: false, releaseDate: null, gradient: ["#3a7a3a","#080e08"], streaming: {} },
      { id: "435", title: "Why It Closed", url: "case.html?id=435", released: false, releaseDate: null, gradient: ["#5a2a5a","#0e080e"], streaming: {} },
      { id: "436", title: "What Was Left", url: "case.html?id=436", released: false, releaseDate: null, gradient: ["#2a8a4a","#080e0a"], streaming: {} },
      { id: "437", title: "The Equipment", url: "case.html?id=437", released: false, releaseDate: null, gradient: ["#6a4a6a","#0e080e"], streaming: {} },
      { id: "438", title: "The Log", url: "case.html?id=438", released: false, releaseDate: null, gradient: ["#4a6a2a","#080e08"], streaming: {} },
      { id: "439", title: "The Last Entry", url: "case.html?id=439", released: false, releaseDate: null, gradient: ["#8a3a2a","#100808"], streaming: {} },
      { id: "440", title: "The Discovery", url: "case.html?id=440", released: false, releaseDate: null, gradient: ["#2a6a8a","#08100e"], streaming: {} },
      { id: "441", title: "What Still Works", url: "case.html?id=441", released: false, releaseDate: null, gradient: ["#5a5a2a","#0e0e08"], streaming: {} },
      { id: "442", title: "The Signal", url: "case.html?id=442", released: false, releaseDate: null, gradient: ["#3a2a7a","#080810"], streaming: {} },
      { id: "443", title: "Who Sent It", url: "case.html?id=443", released: false, releaseDate: null, gradient: ["#6a2a4a","#0e0808"], streaming: {} },
      { id: "444", title: "The Response", url: "case.html?id=444", released: false, releaseDate: null, gradient: ["#2a8a6a","#080e0a"], streaming: {} }
    ]
  },
  {
    id: "season38",
    title: "Season Thirty-Eight",
    subtitle: "The Signal Fire",
    totalCases: 12,
    digits: [3807,3816,3825,3834,3843,3852,3861,3870,3879,3888,3897,3906],
    vault: {
      id: "s38_vault",
      name: "The Signal Fire Vault",
      coupon: "VAULT-S38",
      badge: { id: "s38_badge", name: "The Signal Fire Vault Badge", symbol: "🏛", description: "Awarded for recovering all 12 cases in Season Thirty-Eight." },
      lore: "All The Signal Fire case files recovered. Season Thirty-Eight archive unsealed."
    },
    cases: [
      { id: "445", title: "Who Lit It", url: "case.html?id=445", released: false, releaseDate: null, gradient: ["#3a7a3a","#080e08"], streaming: {} },
      { id: "446", title: "The Location", url: "case.html?id=446", released: false, releaseDate: null, gradient: ["#5a2a5a","#0e080e"], streaming: {} },
      { id: "447", title: "The Response", url: "case.html?id=447", released: false, releaseDate: null, gradient: ["#2a8a4a","#080e0a"], streaming: {} },
      { id: "448", title: "What It Meant", url: "case.html?id=448", released: false, releaseDate: null, gradient: ["#6a4a6a","#0e080e"], streaming: {} },
      { id: "449", title: "The Code", url: "case.html?id=449", released: false, releaseDate: null, gradient: ["#4a6a2a","#080e08"], streaming: {} },
      { id: "450", title: "The Night of the Fire", url: "case.html?id=450", released: false, releaseDate: null, gradient: ["#8a3a2a","#100808"], streaming: {} },
      { id: "451", title: "Who Saw It", url: "case.html?id=451", released: false, releaseDate: null, gradient: ["#2a6a8a","#08100e"], streaming: {} },
      { id: "452", title: "The Distance", url: "case.html?id=452", released: false, releaseDate: null, gradient: ["#5a5a2a","#0e0e08"], streaming: {} },
      { id: "453", title: "The Message Sent", url: "case.html?id=453", released: false, releaseDate: null, gradient: ["#3a2a7a","#080810"], streaming: {} },
      { id: "454", title: "What Came After", url: "case.html?id=454", released: false, releaseDate: null, gradient: ["#6a2a4a","#0e0808"], streaming: {} },
      { id: "455", title: "The Second Signal", url: "case.html?id=455", released: false, releaseDate: null, gradient: ["#2a8a6a","#080e0a"], streaming: {} },
      { id: "456", title: "Dark", url: "case.html?id=456", released: false, releaseDate: null, gradient: ["#7a6a2a","#100e08"], streaming: {} }
    ]
  },
  {
    id: "season39",
    title: "Season Thirty-Nine",
    subtitle: "The Pale Horse",
    totalCases: 12,
    digits: [3907,3916,3925,3934,3943,3952,3961,3970,3979,3988,3997,4006],
    vault: {
      id: "s39_vault",
      name: "The Pale Horse Vault",
      coupon: "VAULT-S39",
      badge: { id: "s39_badge", name: "The Pale Horse Vault Badge", symbol: "🏛", description: "Awarded for recovering all 12 cases in Season Thirty-Nine." },
      lore: "All The Pale Horse case files recovered. Season Thirty-Nine archive unsealed."
    },
    cases: [
      { id: "457", title: "The Animal", url: "case.html?id=457", released: false, releaseDate: null, gradient: ["#5a2a5a","#0e080e"], streaming: {} },
      { id: "458", title: "The Owner", url: "case.html?id=458", released: false, releaseDate: null, gradient: ["#2a8a4a","#080e0a"], streaming: {} },
      { id: "459", title: "What It Carried", url: "case.html?id=459", released: false, releaseDate: null, gradient: ["#6a4a6a","#0e080e"], streaming: {} },
      { id: "460", title: "The Route", url: "case.html?id=460", released: false, releaseDate: null, gradient: ["#4a6a2a","#080e08"], streaming: {} },
      { id: "461", title: "The Night Ride", url: "case.html?id=461", released: false, releaseDate: null, gradient: ["#8a3a2a","#100808"], streaming: {} },
      { id: "462", title: "What the Horse Knew", url: "case.html?id=462", released: false, releaseDate: null, gradient: ["#2a6a8a","#08100e"], streaming: {} },
      { id: "463", title: "The Stable", url: "case.html?id=463", released: false, releaseDate: null, gradient: ["#5a5a2a","#0e0e08"], streaming: {} },
      { id: "464", title: "Where It Came From", url: "case.html?id=464", released: false, releaseDate: null, gradient: ["#3a2a7a","#080810"], streaming: {} },
      { id: "465", title: "What It Left", url: "case.html?id=465", released: false, releaseDate: null, gradient: ["#6a2a4a","#0e0808"], streaming: {} },
      { id: "466", title: "The Rider", url: "case.html?id=466", released: false, releaseDate: null, gradient: ["#2a8a6a","#080e0a"], streaming: {} },
      { id: "467", title: "The Unridden", url: "case.html?id=467", released: false, releaseDate: null, gradient: ["#7a6a2a","#100e08"], streaming: {} },
      { id: "468", title: "The Finding", url: "case.html?id=468", released: false, releaseDate: null, gradient: ["#4a3a5a","#0a080e"], streaming: {} }
    ]
  },
  {
    id: "season40",
    title: "Season Forty",
    subtitle: "The Coded Letter",
    totalCases: 12,
    digits: [4007,4016,4025,4034,4043,4052,4061,4070,4079,4088,4097,4106],
    vault: {
      id: "s40_vault",
      name: "The Coded Letter Vault",
      coupon: "VAULT-S40",
      badge: { id: "s40_badge", name: "The Coded Letter Vault Badge", symbol: "🏛", description: "Awarded for recovering all 12 cases in Season Forty." },
      lore: "All The Coded Letter case files recovered. Season Forty archive unsealed."
    },
    cases: [
      { id: "469", title: "The Message", url: "case.html?id=469", released: false, releaseDate: null, gradient: ["#2a8a4a","#080e0a"], streaming: {} },
      { id: "470", title: "The Cipher", url: "case.html?id=470", released: false, releaseDate: null, gradient: ["#6a4a6a","#0e080e"], streaming: {} },
      { id: "471", title: "Who Wrote It", url: "case.html?id=471", released: false, releaseDate: null, gradient: ["#4a6a2a","#080e08"], streaming: {} },
      { id: "472", title: "Who Received It", url: "case.html?id=472", released: false, releaseDate: null, gradient: ["#8a3a2a","#100808"], streaming: {} },
      { id: "473", title: "The Translation", url: "case.html?id=473", released: false, releaseDate: null, gradient: ["#2a6a8a","#08100e"], streaming: {} },
      { id: "474", title: "What It Said", url: "case.html?id=474", released: false, releaseDate: null, gradient: ["#5a5a2a","#0e0e08"], streaming: {} },
      { id: "475", title: "The Key", url: "case.html?id=475", released: false, releaseDate: null, gradient: ["#3a2a7a","#080810"], streaming: {} },
      { id: "476", title: "The Second Letter", url: "case.html?id=476", released: false, releaseDate: null, gradient: ["#6a2a4a","#0e0808"], streaming: {} },
      { id: "477", title: "What the Code Hid", url: "case.html?id=477", released: false, releaseDate: null, gradient: ["#2a8a6a","#080e0a"], streaming: {} },
      { id: "478", title: "The Decoder", url: "case.html?id=478", released: false, releaseDate: null, gradient: ["#7a6a2a","#100e08"], streaming: {} },
      { id: "479", title: "The Response", url: "case.html?id=479", released: false, releaseDate: null, gradient: ["#4a3a5a","#0a080e"], streaming: {} },
      { id: "480", title: "The Final Message", url: "case.html?id=480", released: false, releaseDate: null, gradient: ["#c8853a","#1a100a"], streaming: {} }
    ]
  },
  {
    id: "season41",
    title: "Season Forty-One",
    subtitle: "The Ghost Road",
    totalCases: 12,
    digits: [4107,4116,4125,4134,4143,4152,4161,4170,4179,4188,4197,4206],
    vault: {
      id: "s41_vault",
      name: "The Ghost Road Vault",
      coupon: "VAULT-S41",
      badge: { id: "s41_badge", name: "The Ghost Road Vault Badge", symbol: "🏛", description: "Awarded for recovering all 12 cases in Season Forty-One." },
      lore: "All The Ghost Road case files recovered. Season Forty-One archive unsealed."
    },
    cases: [
      { id: "481", title: "The Road That Isn't There", url: "case.html?id=481", released: false, releaseDate: null, gradient: ["#6a4a6a","#0e080e"], streaming: {} },
      { id: "482", title: "The Map Error", url: "case.html?id=482", released: false, releaseDate: null, gradient: ["#4a6a2a","#080e08"], streaming: {} },
      { id: "483", title: "What Was There Before", url: "case.html?id=483", released: false, releaseDate: null, gradient: ["#8a3a2a","#100808"], streaming: {} },
      { id: "484", title: "Who Traveled It", url: "case.html?id=484", released: false, releaseDate: null, gradient: ["#2a6a8a","#08100e"], streaming: {} },
      { id: "485", title: "The Old Name", url: "case.html?id=485", released: false, releaseDate: null, gradient: ["#5a5a2a","#0e0e08"], streaming: {} },
      { id: "486", title: "What Remains", url: "case.html?id=486", released: false, releaseDate: null, gradient: ["#3a2a7a","#080810"], streaming: {} },
      { id: "487", title: "The Night Road", url: "case.html?id=487", released: false, releaseDate: null, gradient: ["#6a2a4a","#0e0808"], streaming: {} },
      { id: "488", title: "The Figure", url: "case.html?id=488", released: false, releaseDate: null, gradient: ["#2a8a6a","#080e0a"], streaming: {} },
      { id: "489", title: "What the Road Remembers", url: "case.html?id=489", released: false, releaseDate: null, gradient: ["#7a6a2a","#100e08"], streaming: {} },
      { id: "490", title: "The Crossing", url: "case.html?id=490", released: false, releaseDate: null, gradient: ["#4a3a5a","#0a080e"], streaming: {} },
      { id: "491", title: "The End", url: "case.html?id=491", released: false, releaseDate: null, gradient: ["#c8853a","#1a100a"], streaming: {} },
      { id: "492", title: "The Road Returns", url: "case.html?id=492", released: false, releaseDate: null, gradient: ["#4a6a8a","#0a100f"], streaming: {} }
    ]
  },
  {
    id: "season42",
    title: "Season Forty-Two",
    subtitle: "The Dry Season",
    totalCases: 12,
    digits: [4207,4216,4225,4234,4243,4252,4261,4270,4279,4288,4297,4306],
    vault: {
      id: "s42_vault",
      name: "The Dry Season Vault",
      coupon: "VAULT-S42",
      badge: { id: "s42_badge", name: "The Dry Season Vault Badge", symbol: "🏛", description: "Awarded for recovering all 12 cases in Season Forty-Two." },
      lore: "All The Dry Season case files recovered. Season Forty-Two archive unsealed."
    },
    cases: [
      { id: "493", title: "The Water Gone", url: "case.html?id=493", released: false, releaseDate: null, gradient: ["#4a6a2a","#080e08"], streaming: {} },
      { id: "494", title: "The Dried Bed", url: "case.html?id=494", released: false, releaseDate: null, gradient: ["#8a3a2a","#100808"], streaming: {} },
      { id: "495", title: "What the Drought Revealed", url: "case.html?id=495", released: false, releaseDate: null, gradient: ["#2a6a8a","#08100e"], streaming: {} },
      { id: "496", title: "The Cracked Earth", url: "case.html?id=496", released: false, releaseDate: null, gradient: ["#5a5a2a","#0e0e08"], streaming: {} },
      { id: "497", title: "The Thirst", url: "case.html?id=497", released: false, releaseDate: null, gradient: ["#3a2a7a","#080810"], streaming: {} },
      { id: "498", title: "What Remains", url: "case.html?id=498", released: false, releaseDate: null, gradient: ["#6a2a4a","#0e0808"], streaming: {} },
      { id: "499", title: "The Dry Record", url: "case.html?id=499", released: false, releaseDate: null, gradient: ["#2a8a6a","#080e0a"], streaming: {} },
      { id: "500", title: "What Was Hidden Below", url: "case.html?id=500", released: false, releaseDate: null, gradient: ["#7a6a2a","#100e08"], streaming: {} },
      { id: "501", title: "The Wells", url: "case.html?id=501", released: false, releaseDate: null, gradient: ["#4a3a5a","#0a080e"], streaming: {} },
      { id: "502", title: "The Wait", url: "case.html?id=502", released: false, releaseDate: null, gradient: ["#c8853a","#1a100a"], streaming: {} },
      { id: "503", title: "The Break", url: "case.html?id=503", released: false, releaseDate: null, gradient: ["#4a6a8a","#0a100f"], streaming: {} },
      { id: "504", title: "The Rain Returns", url: "case.html?id=504", released: false, releaseDate: null, gradient: ["#6a4a8a","#100a10"], streaming: {} }
    ]
  },
  {
    id: "season43",
    title: "Season Forty-Three",
    subtitle: "The False Name",
    totalCases: 12,
    digits: [4307,4316,4325,4334,4343,4352,4361,4370,4379,4388,4397,4406],
    vault: {
      id: "s43_vault",
      name: "The False Name Vault",
      coupon: "VAULT-S43",
      badge: { id: "s43_badge", name: "The False Name Vault Badge", symbol: "🏛", description: "Awarded for recovering all 12 cases in Season Forty-Three." },
      lore: "All The False Name case files recovered. Season Forty-Three archive unsealed."
    },
    cases: [
      { id: "505", title: "The Register", url: "case.html?id=505", released: false, releaseDate: null, gradient: ["#8a3a2a","#100808"], streaming: {} },
      { id: "506", title: "Who She Wasn't", url: "case.html?id=506", released: false, releaseDate: null, gradient: ["#2a6a8a","#08100e"], streaming: {} },
      { id: "507", title: "The Real Name", url: "case.html?id=507", released: false, releaseDate: null, gradient: ["#5a5a2a","#0e0e08"], streaming: {} },
      { id: "508", title: "The Papers", url: "case.html?id=508", released: false, releaseDate: null, gradient: ["#3a2a7a","#080810"], streaming: {} },
      { id: "509", title: "The Life Built", url: "case.html?id=509", released: false, releaseDate: null, gradient: ["#6a2a4a","#0e0808"], streaming: {} },
      { id: "510", title: "What She Left", url: "case.html?id=510", released: false, releaseDate: null, gradient: ["#2a8a6a","#080e0a"], streaming: {} },
      { id: "511", title: "The Discovery", url: "case.html?id=511", released: false, releaseDate: null, gradient: ["#7a6a2a","#100e08"], streaming: {} },
      { id: "512", title: "The Confrontation", url: "case.html?id=512", released: false, releaseDate: null, gradient: ["#4a3a5a","#0a080e"], streaming: {} },
      { id: "513", title: "Who Knew", url: "case.html?id=513", released: false, releaseDate: null, gradient: ["#c8853a","#1a100a"], streaming: {} },
      { id: "514", title: "The Why", url: "case.html?id=514", released: false, releaseDate: null, gradient: ["#4a6a8a","#0a100f"], streaming: {} },
      { id: "515", title: "The Old Record", url: "case.html?id=515", released: false, releaseDate: null, gradient: ["#6a4a8a","#100a10"], streaming: {} },
      { id: "516", title: "The True Story", url: "case.html?id=516", released: false, releaseDate: null, gradient: ["#3a6a4a","#0a100a"], streaming: {} }
    ]
  },
  {
    id: "season44",
    title: "Season Forty-Four",
    subtitle: "The Mirror Case",
    totalCases: 12,
    digits: [4407,4416,4425,4434,4443,4452,4461,4470,4479,4488,4497,4506],
    vault: {
      id: "s44_vault",
      name: "The Mirror Case Vault",
      coupon: "VAULT-S44",
      badge: { id: "s44_badge", name: "The Mirror Case Vault Badge", symbol: "🏛", description: "Awarded for recovering all 12 cases in Season Forty-Four." },
      lore: "All The Mirror Case case files recovered. Season Forty-Four archive unsealed."
    },
    cases: [
      { id: "517", title: "The Reflection", url: "case.html?id=517", released: false, releaseDate: null, gradient: ["#2a6a8a","#08100e"], streaming: {} },
      { id: "518", title: "Two Stories", url: "case.html?id=518", released: false, releaseDate: null, gradient: ["#5a5a2a","#0e0e08"], streaming: {} },
      { id: "519", title: "The Same Crime", url: "case.html?id=519", released: false, releaseDate: null, gradient: ["#3a2a7a","#080810"], streaming: {} },
      { id: "520", title: "Different Town", url: "case.html?id=520", released: false, releaseDate: null, gradient: ["#6a2a4a","#0e0808"], streaming: {} },
      { id: "521", title: "What Connects Them", url: "case.html?id=521", released: false, releaseDate: null, gradient: ["#2a8a6a","#080e0a"], streaming: {} },
      { id: "522", title: "The Pattern", url: "case.html?id=522", released: false, releaseDate: null, gradient: ["#7a6a2a","#100e08"], streaming: {} },
      { id: "523", title: "The Other Victim", url: "case.html?id=523", released: false, releaseDate: null, gradient: ["#4a3a5a","#0a080e"], streaming: {} },
      { id: "524", title: "The Link", url: "case.html?id=524", released: false, releaseDate: null, gradient: ["#c8853a","#1a100a"], streaming: {} },
      { id: "525", title: "The Copy", url: "case.html?id=525", released: false, releaseDate: null, gradient: ["#4a6a8a","#0a100f"], streaming: {} },
      { id: "526", title: "What the Mirror Says", url: "case.html?id=526", released: false, releaseDate: null, gradient: ["#6a4a8a","#100a10"], streaming: {} },
      { id: "527", title: "The Original", url: "case.html?id=527", released: false, releaseDate: null, gradient: ["#3a6a4a","#0a100a"], streaming: {} },
      { id: "528", title: "The Resolution", url: "case.html?id=528", released: false, releaseDate: null, gradient: ["#8a8a4a","#10100a"], streaming: {} }
    ]
  },
  {
    id: "season45",
    title: "Season Forty-Five",
    subtitle: "The Hollow Crown",
    totalCases: 12,
    digits: [4507,4516,4525,4534,4543,4552,4561,4570,4579,4588,4597,4606],
    vault: {
      id: "s45_vault",
      name: "The Hollow Crown Vault",
      coupon: "VAULT-S45",
      badge: { id: "s45_badge", name: "The Hollow Crown Vault Badge", symbol: "🏛", description: "Awarded for recovering all 12 cases in Season Forty-Five." },
      lore: "All The Hollow Crown case files recovered. Season Forty-Five archive unsealed."
    },
    cases: [
      { id: "529", title: "The Leader", url: "case.html?id=529", released: false, releaseDate: null, gradient: ["#5a5a2a","#0e0e08"], streaming: {} },
      { id: "530", title: "What Was Built", url: "case.html?id=530", released: false, releaseDate: null, gradient: ["#3a2a7a","#080810"], streaming: {} },
      { id: "531", title: "The Followers", url: "case.html?id=531", released: false, releaseDate: null, gradient: ["#6a2a4a","#0e0808"], streaming: {} },
      { id: "532", title: "The Promise", url: "case.html?id=532", released: false, releaseDate: null, gradient: ["#2a8a6a","#080e0a"], streaming: {} },
      { id: "533", title: "The Cracks", url: "case.html?id=533", released: false, releaseDate: null, gradient: ["#7a6a2a","#100e08"], streaming: {} },
      { id: "534", title: "The Leaving", url: "case.html?id=534", released: false, releaseDate: null, gradient: ["#4a3a5a","#0a080e"], streaming: {} },
      { id: "535", title: "What Fell Apart", url: "case.html?id=535", released: false, releaseDate: null, gradient: ["#c8853a","#1a100a"], streaming: {} },
      { id: "536", title: "Who Stayed", url: "case.html?id=536", released: false, releaseDate: null, gradient: ["#4a6a8a","#0a100f"], streaming: {} },
      { id: "537", title: "What Was Left", url: "case.html?id=537", released: false, releaseDate: null, gradient: ["#6a4a8a","#100a10"], streaming: {} },
      { id: "538", title: "The Record", url: "case.html?id=538", released: false, releaseDate: null, gradient: ["#3a6a4a","#0a100a"], streaming: {} },
      { id: "539", title: "The Reckoning", url: "case.html?id=539", released: false, releaseDate: null, gradient: ["#8a8a4a","#10100a"], streaming: {} },
      { id: "540", title: "The After", url: "case.html?id=540", released: false, releaseDate: null, gradient: ["#4a4a6a","#0a0a10"], streaming: {} }
    ]
  },
  {
    id: "season46",
    title: "Season Forty-Six",
    subtitle: "The Storm Season",
    totalCases: 12,
    digits: [4607,4616,4625,4634,4643,4652,4661,4670,4679,4688,4697,4706],
    vault: {
      id: "s46_vault",
      name: "The Storm Season Vault",
      coupon: "VAULT-S46",
      badge: { id: "s46_badge", name: "The Storm Season Vault Badge", symbol: "🏛", description: "Awarded for recovering all 12 cases in Season Forty-Six." },
      lore: "All The Storm Season case files recovered. Season Forty-Six archive unsealed."
    },
    cases: [
      { id: "541", title: "Before the Storm", url: "case.html?id=541", released: false, releaseDate: null, gradient: ["#3a2a7a","#080810"], streaming: {} },
      { id: "542", title: "The Warning", url: "case.html?id=542", released: false, releaseDate: null, gradient: ["#6a2a4a","#0e0808"], streaming: {} },
      { id: "543", title: "What the Storm Did", url: "case.html?id=543", released: false, releaseDate: null, gradient: ["#2a8a6a","#080e0a"], streaming: {} },
      { id: "544", title: "What It Revealed", url: "case.html?id=544", released: false, releaseDate: null, gradient: ["#7a6a2a","#100e08"], streaming: {} },
      { id: "545", title: "The Damage", url: "case.html?id=545", released: false, releaseDate: null, gradient: ["#4a3a5a","#0a080e"], streaming: {} },
      { id: "546", title: "The Found Object", url: "case.html?id=546", released: false, releaseDate: null, gradient: ["#c8853a","#1a100a"], streaming: {} },
      { id: "547", title: "The Storm Witness", url: "case.html?id=547", released: false, releaseDate: null, gradient: ["#4a6a8a","#0a100f"], streaming: {} },
      { id: "548", title: "After", url: "case.html?id=548", released: false, releaseDate: null, gradient: ["#6a4a8a","#100a10"], streaming: {} },
      { id: "549", title: "What the Storm Moved", url: "case.html?id=549", released: false, releaseDate: null, gradient: ["#3a6a4a","#0a100a"], streaming: {} },
      { id: "550", title: "The Changed Landscape", url: "case.html?id=550", released: false, releaseDate: null, gradient: ["#8a8a4a","#10100a"], streaming: {} },
      { id: "551", title: "What the Storm Took", url: "case.html?id=551", released: false, releaseDate: null, gradient: ["#4a4a6a","#0a0a10"], streaming: {} },
      { id: "552", title: "The Calm", url: "case.html?id=552", released: false, releaseDate: null, gradient: ["#8a4a4a","#100a0a"], streaming: {} }
    ]
  },
  {
    id: "season47",
    title: "Season Forty-Seven",
    subtitle: "The Long Way Round",
    totalCases: 12,
    digits: [4707,4716,4725,4734,4743,4752,4761,4770,4779,4788,4797,4806],
    vault: {
      id: "s47_vault",
      name: "The Long Way Round Vault",
      coupon: "VAULT-S47",
      badge: { id: "s47_badge", name: "The Long Way Round Vault Badge", symbol: "🏛", description: "Awarded for recovering all 12 cases in Season Forty-Seven." },
      lore: "All The Long Way Round case files recovered. Season Forty-Seven archive unsealed."
    },
    cases: [
      { id: "553", title: "The Detour", url: "case.html?id=553", released: false, releaseDate: null, gradient: ["#6a2a4a","#0e0808"], streaming: {} },
      { id: "554", title: "Why the Long Way", url: "case.html?id=554", released: false, releaseDate: null, gradient: ["#2a8a6a","#080e0a"], streaming: {} },
      { id: "555", title: "What Was Passed", url: "case.html?id=555", released: false, releaseDate: null, gradient: ["#7a6a2a","#100e08"], streaming: {} },
      { id: "556", title: "The Extra Miles", url: "case.html?id=556", released: false, releaseDate: null, gradient: ["#4a3a5a","#0a080e"], streaming: {} },
      { id: "557", title: "Who Was Avoided", url: "case.html?id=557", released: false, releaseDate: null, gradient: ["#c8853a","#1a100a"], streaming: {} },
      { id: "558", title: "What Was Found", url: "case.html?id=558", released: false, releaseDate: null, gradient: ["#4a6a8a","#0a100f"], streaming: {} },
      { id: "559", title: "The Junction", url: "case.html?id=559", released: false, releaseDate: null, gradient: ["#6a4a8a","#100a10"], streaming: {} },
      { id: "560", title: "The Road Back", url: "case.html?id=560", released: false, releaseDate: null, gradient: ["#3a6a4a","#0a100a"], streaming: {} },
      { id: "561", title: "The Time Lost", url: "case.html?id=561", released: false, releaseDate: null, gradient: ["#8a8a4a","#10100a"], streaming: {} },
      { id: "562", title: "Why It Mattered", url: "case.html?id=562", released: false, releaseDate: null, gradient: ["#4a4a6a","#0a0a10"], streaming: {} },
      { id: "563", title: "What the Long Way Showed", url: "case.html?id=563", released: false, releaseDate: null, gradient: ["#8a4a4a","#100a0a"], streaming: {} },
      { id: "564", title: "Arrival", url: "case.html?id=564", released: false, releaseDate: null, gradient: ["#c85a2a","#1a0e08"], streaming: {} }
    ]
  },
  {
    id: "season48",
    title: "Season Forty-Eight",
    subtitle: "The Broken Signal",
    totalCases: 12,
    digits: [4807,4816,4825,4834,4843,4852,4861,4870,4879,4888,4897,4906],
    vault: {
      id: "s48_vault",
      name: "The Broken Signal Vault",
      coupon: "VAULT-S48",
      badge: { id: "s48_badge", name: "The Broken Signal Vault Badge", symbol: "🏛", description: "Awarded for recovering all 12 cases in Season Forty-Eight." },
      lore: "All The Broken Signal case files recovered. Season Forty-Eight archive unsealed."
    },
    cases: [
      { id: "565", title: "The Interruption", url: "case.html?id=565", released: false, releaseDate: null, gradient: ["#2a8a6a","#080e0a"], streaming: {} },
      { id: "566", title: "What Was Being Sent", url: "case.html?id=566", released: false, releaseDate: null, gradient: ["#7a6a2a","#100e08"], streaming: {} },
      { id: "567", title: "The Gap", url: "case.html?id=567", released: false, releaseDate: null, gradient: ["#4a3a5a","#0a080e"], streaming: {} },
      { id: "568", title: "Who Noticed", url: "case.html?id=568", released: false, releaseDate: null, gradient: ["#c8853a","#1a100a"], streaming: {} },
      { id: "569", title: "The Partial Message", url: "case.html?id=569", released: false, releaseDate: null, gradient: ["#4a6a8a","#0a100f"], streaming: {} },
      { id: "570", title: "What Was Lost", url: "case.html?id=570", released: false, releaseDate: null, gradient: ["#6a4a8a","#100a10"], streaming: {} },
      { id: "571", title: "The Interference", url: "case.html?id=571", released: false, releaseDate: null, gradient: ["#3a6a4a","#0a100a"], streaming: {} },
      { id: "572", title: "The Source", url: "case.html?id=572", released: false, releaseDate: null, gradient: ["#8a8a4a","#10100a"], streaming: {} },
      { id: "573", title: "What Got Through", url: "case.html?id=573", released: false, releaseDate: null, gradient: ["#4a4a6a","#0a0a10"], streaming: {} },
      { id: "574", title: "The Reconstruction", url: "case.html?id=574", released: false, releaseDate: null, gradient: ["#8a4a4a","#100a0a"], streaming: {} },
      { id: "575", title: "The Full Message", url: "case.html?id=575", released: false, releaseDate: null, gradient: ["#c85a2a","#1a0e08"], streaming: {} },
      { id: "576", title: "The Response", url: "case.html?id=576", released: false, releaseDate: null, gradient: ["#2a6a6a","#080e0e"], streaming: {} }
    ]
  },
  {
    id: "season49",
    title: "Season Forty-Nine",
    subtitle: "The Final Witness",
    totalCases: 12,
    digits: [4907,4916,4925,4934,4943,4952,4961,4970,4979,4988,4997,5006],
    vault: {
      id: "s49_vault",
      name: "The Final Witness Vault",
      coupon: "VAULT-S49",
      badge: { id: "s49_badge", name: "The Final Witness Vault Badge", symbol: "🏛", description: "Awarded for recovering all 12 cases in Season Forty-Nine." },
      lore: "All The Final Witness case files recovered. Season Forty-Nine archive unsealed."
    },
    cases: [
      { id: "577", title: "The Last One Who Knows", url: "case.html?id=577", released: false, releaseDate: null, gradient: ["#7a6a2a","#100e08"], streaming: {} },
      { id: "578", title: "What She Remembers", url: "case.html?id=578", released: false, releaseDate: null, gradient: ["#4a3a5a","#0a080e"], streaming: {} },
      { id: "579", title: "The Detail", url: "case.html?id=579", released: false, releaseDate: null, gradient: ["#c8853a","#1a100a"], streaming: {} },
      { id: "580", title: "Why She Waited", url: "case.html?id=580", released: false, releaseDate: null, gradient: ["#4a6a8a","#0a100f"], streaming: {} },
      { id: "581", title: "The Statement", url: "case.html?id=581", released: false, releaseDate: null, gradient: ["#6a4a8a","#100a10"], streaming: {} },
      { id: "582", title: "What She Left Out", url: "case.html?id=582", released: false, releaseDate: null, gradient: ["#3a6a4a","#0a100a"], streaming: {} },
      { id: "583", title: "The Contradiction", url: "case.html?id=583", released: false, releaseDate: null, gradient: ["#8a8a4a","#10100a"], streaming: {} },
      { id: "584", title: "The Truth", url: "case.html?id=584", released: false, releaseDate: null, gradient: ["#4a4a6a","#0a0a10"], streaming: {} },
      { id: "585", title: "What She's Protecting", url: "case.html?id=585", released: false, releaseDate: null, gradient: ["#8a4a4a","#100a0a"], streaming: {} },
      { id: "586", title: "The Deathbed Word", url: "case.html?id=586", released: false, releaseDate: null, gradient: ["#c85a2a","#1a0e08"], streaming: {} },
      { id: "587", title: "What Changed", url: "case.html?id=587", released: false, releaseDate: null, gradient: ["#2a6a6a","#080e0e"], streaming: {} },
      { id: "588", title: "The Complete Account", url: "case.html?id=588", released: false, releaseDate: null, gradient: ["#6a6a2a","#0e0e08"], streaming: {} }
    ]
  },
  {
    id: "season50",
    title: "Season Fifty",
    subtitle: "The Resolution",
    totalCases: 12,
    digits: [5007,5016,5025,5034,5043,5052,5061,5070,5079,5088,5097,5106],
    vault: {
      id: "s50_vault",
      name: "The Resolution Vault",
      coupon: "VAULT-S50",
      badge: { id: "s50_badge", name: "The Resolution Vault Badge", symbol: "🏛", description: "Awarded for recovering all 12 cases in Season Fifty." },
      lore: "All The Resolution case files recovered. Season Fifty archive unsealed."
    },
    cases: [
      { id: "589", title: "All Roads Lead", url: "case.html?id=589", released: false, releaseDate: null, gradient: ["#4a3a5a","#0a080e"], streaming: {} },
      { id: "590", title: "The Connection", url: "case.html?id=590", released: false, releaseDate: null, gradient: ["#c8853a","#1a100a"], streaming: {} },
      { id: "591", title: "What Was Always There", url: "case.html?id=591", released: false, releaseDate: null, gradient: ["#4a6a8a","#0a100f"], streaming: {} },
      { id: "592", title: "The Answer", url: "case.html?id=592", released: false, releaseDate: null, gradient: ["#6a4a8a","#100a10"], streaming: {} },
      { id: "593", title: "The Vault Opens", url: "case.html?id=593", released: false, releaseDate: null, gradient: ["#3a6a4a","#0a100a"], streaming: {} },
      { id: "594", title: "What Was In It", url: "case.html?id=594", released: false, releaseDate: null, gradient: ["#8a8a4a","#10100a"], streaming: {} },
      { id: "595", title: "Who Did It", url: "case.html?id=595", released: false, releaseDate: null, gradient: ["#4a4a6a","#0a0a10"], streaming: {} },
      { id: "596", title: "Why", url: "case.html?id=596", released: false, releaseDate: null, gradient: ["#8a4a4a","#100a0a"], streaming: {} },
      { id: "597", title: "The Before and After", url: "case.html?id=597", released: false, releaseDate: null, gradient: ["#c85a2a","#1a0e08"], streaming: {} },
      { id: "598", title: "What It Cost", url: "case.html?id=598", released: false, releaseDate: null, gradient: ["#2a6a6a","#080e0e"], streaming: {} },
      { id: "599", title: "What Was Saved", url: "case.html?id=599", released: false, releaseDate: null, gradient: ["#6a6a2a","#0e0e08"], streaming: {} },
      { id: "600", title: "Black Pine Closes", url: "case.html?id=600", released: false, releaseDate: null, gradient: ["#5a3a6a","#0e0810"], streaming: {} }
    ]
  }
];
