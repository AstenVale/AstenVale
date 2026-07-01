// Pure URL-generation helpers for the sheet-driven Spotify embed.
// Every function returns '' for empty/missing input and never throws.
window.AssetUrlBuilder = (function() {
  function buildSpotifyTrackUrl(trackId) {
    if (!trackId) return '';
    return 'https://open.spotify.com/track/' + trackId;
  }

  function buildSpotifyEmbedUrl(trackId) {
    if (!trackId) return '';
    return 'https://open.spotify.com/embed/track/' + trackId;
  }

  function buildYoutubeWatchUrl(videoId) {
    if (!videoId) return '';
    return 'https://www.youtube.com/watch?v=' + videoId;
  }

  return {
    buildSpotifyTrackUrl: buildSpotifyTrackUrl,
    buildSpotifyEmbedUrl: buildSpotifyEmbedUrl,
    buildYoutubeWatchUrl: buildYoutubeWatchUrl
  };
})();
