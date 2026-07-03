// Ashton Vale — Vault Reward claim popup.
//
// Reward availability always comes from Supabase (player_vault_rewards --
// only ever returns a row when the signed-in player has actually unlocked
// that vault and it's released with a real reward_url). "Claimed" state is
// purely local -- it only controls whether this reminder popup shows again,
// never whether the reward itself is considered available. Used by
// vaults.html, progress.html, and archive.html.
(function () {
  function vaultIdToNum(id) {
    var m = /^s(\d+)_vault$/.exec(id || '');
    return m ? parseInt(m[1], 10) : null;
  }

  function getClaimed() {
    try { return JSON.parse(localStorage.getItem('av_claimed_vault_rewards') || '[]'); } catch (e) { return []; }
  }

  function markClaimed(vaultNum) {
    try {
      var claimed = getClaimed();
      if (claimed.indexOf(vaultNum) === -1) {
        claimed.push(vaultNum);
        localStorage.setItem('av_claimed_vault_rewards', JSON.stringify(claimed));
      }
    } catch (e) {}
  }

  function isDismissedThisSession(vaultNum) {
    try { return sessionStorage.getItem('av_reward_popup_dismissed_' + vaultNum) === '1'; } catch (e) { return false; }
  }

  function dismissThisSession(vaultNum) {
    try { sessionStorage.setItem('av_reward_popup_dismissed_' + vaultNum, '1'); } catch (e) {}
  }

  // Exposed so the existing "Open Reward" links/buttons already on each
  // page can mark the same vault claimed when clicked directly, not just
  // when opened from this popup.
  window.AVVaultRewardClaim = {
    markClaimed: markClaimed,
    isClaimed: function (vaultNum) { return getClaimed().indexOf(vaultNum) !== -1; }
  };

  function buildPopup(vaultNum, vaultName, rewardUrl) {
    var numStr = (vaultNum < 10 ? '0' : '') + vaultNum;

    var overlay = document.createElement('div');
    overlay.id = 'avRewardPopupOverlay';
    overlay.style.cssText = 'position:fixed;inset:0;z-index:100000;background:rgba(0,0,0,0.75);display:flex;align-items:center;justify-content:center;padding:1.5rem;';

    var box = document.createElement('div');
    box.style.cssText = 'background:#1c130a;border:1px solid rgba(201,169,122,0.35);max-width:380px;width:100%;padding:2rem 1.75rem;text-align:center;font-family:"Courier Prime","Courier New",monospace;color:#c9a97a;box-shadow:0 8px 40px rgba(0,0,0,0.6);';
    box.innerHTML =
      '<div style="font-family:\'Special Elite\',\'Courier New\',serif;font-size:1.1rem;letter-spacing:0.1em;text-transform:uppercase;color:rgba(220,190,140,0.95);margin-bottom:0.85rem;">Vault Reward Available</div>' +
      '<p style="font-size:0.85rem;line-height:1.6;color:rgba(201,169,122,0.75);margin-bottom:1.25rem;">You have unlocked a reward from:<br><strong style="color:rgba(220,190,140,0.9);">Vault ' + numStr + ' — ' + vaultName + '</strong></p>' +
      '<div style="display:flex;gap:0.75rem;flex-wrap:wrap;justify-content:center;">' +
        '<button id="avRewardPopupOpen" type="button" style="font-family:\'Special Elite\',\'Courier New\',serif;font-size:0.8rem;letter-spacing:0.1em;text-transform:uppercase;background:#7a1f1f;color:#fff;border:none;padding:0.7rem 1.4rem;cursor:pointer;">Open Reward</button>' +
        '<button id="avRewardPopupRemind" type="button" style="font-family:\'Courier Prime\',\'Courier New\',monospace;font-size:0.75rem;letter-spacing:0.08em;text-transform:uppercase;background:none;color:rgba(201,169,122,0.6);border:1px solid rgba(201,169,122,0.3);padding:0.7rem 1.2rem;cursor:pointer;">Remind Me Later</button>' +
      '</div>';
    overlay.appendChild(box);
    document.body.appendChild(overlay);

    document.getElementById('avRewardPopupOpen').addEventListener('click', function () {
      window.open(rewardUrl, '_blank', 'noopener');
      markClaimed(vaultNum);
      overlay.remove();
    });
    document.getElementById('avRewardPopupRemind').addEventListener('click', function () {
      dismissThisSession(vaultNum);
      overlay.remove();
    });
  }

  function init() {
    if (!window.AVProgressSync) return;
    window.AVProgressSync.getUser().then(function (user) {
      if (!user) return;
      var client = window.AVProgressSync.getClient();
      if (!client) return;
      Promise.all([
        window.AVProgressSync.getSupabaseProgress(user),
        client.from('player_vault_rewards').select('vault, reward_title, reward_url').then(function (res) {
          return res.error || !res.data ? [] : res.data;
        })
      ]).then(function (results) {
        var progress = results[0];
        var rewards = results[1];
        var unlockedVaultIds = (progress && progress.unlocked_vaults) || [];
        var claimed = getClaimed();

        var rewardsByVault = {};
        rewards.forEach(function (r) { rewardsByVault[r.vault] = r; });

        var candidate = null;
        for (var i = 0; i < unlockedVaultIds.length; i++) {
          var num = vaultIdToNum(unlockedVaultIds[i]);
          if (num == null) continue;
          var reward = rewardsByVault[num];
          if (!reward || !reward.reward_url) continue;
          if (claimed.indexOf(num) !== -1) continue;
          if (isDismissedThisSession(num)) continue;
          candidate = { num: num, reward: reward };
          break;
        }

        if (!candidate) return;
        if (typeof SEASONS_CONFIG === 'undefined') return;
        var season = SEASONS_CONFIG[candidate.num - 1];
        var vaultName = season ? (season.subtitle || season.title) : '';

        buildPopup(candidate.num, vaultName, candidate.reward.reward_url);
      }).catch(function () {});
    }).catch(function () {});
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
