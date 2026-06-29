// ASHTON VALE ARCHIVES — Answer Checker
// Normalizes input and checks answers against accepted lists.
//
// INVESTIGATION LOOP DESIGN:
//   Players discover clues gradually — alone, with friends, across sessions.
//   On each submit we silently merge any newly-correct answers into a
//   persistent "confirmed evidence" set stored in LocalStorage.
//   The archive unlocks only when ALL fields have been confirmed.
//   This means:
//     - A player can fill 2 fields correctly → saved, no feedback on which.
//     - Next session they add 3 more → those merge in silently.
//     - A friend finds the last 2 → final submit triggers the unlock.
//   Wrong answers are ignored. Empty fields are ignored.
//   The archive never says what was right or wrong.

const Checker = (() => {

  function normalize(str) {
    return str
      .toLowerCase()
      .replace(/[^a-z0-9]/g, "")
      .trim();
  }

  function checkField(value, acceptedList) {
    const normed = normalize(value);
    if (!normed) return false;
    return acceptedList.some(a => normalize(a) === normed);
  }

  // Merges newly-correct answers into stored confirmed set for a case.
  // Returns { passed, total, confirmed, newlyConfirmed }
  // "passed" is true only when ALL fields are confirmed.
  function checkAll(formValues, answersMap, caseId) {
    const storageKey = "confirmed_" + caseId;
    const confirmed = new Set(Storage.get(storageKey, []));
    const fields = Object.keys(answersMap);
    let newlyConfirmed = 0;

    for (const field of fields) {
      if (confirmed.has(field)) continue; // already locked in
      const userValue = formValues[field] || "";
      if (!userValue.trim()) continue;    // empty — skip silently
      if (checkField(userValue, answersMap[field])) {
        confirmed.add(field);
        newlyConfirmed++;
      }
    }

    // Persist the updated confirmed set
    Storage.set(storageKey, [...confirmed]);

    const total = fields.length;
    const confirmedCount = confirmed.size;

    return {
      passed: confirmedCount === total,
      total,
      confirmed: confirmedCount,
      newlyConfirmed
    };
  }

  // How many fields are already confirmed (for progress display)
  function getConfirmedCount(answersMap, caseId) {
    const confirmed = Storage.get("confirmed_" + caseId, []);
    return Math.min(confirmed.length, Object.keys(answersMap).length);
  }

  return { checkAll, checkField, normalize, getConfirmedCount };
})();
