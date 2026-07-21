// Pure URL-generation helpers for the sheet-driven Spotify embed.
// Every function returns '' for empty/missing input and never throws.
window.AssetUrlBuilder = (function() {
  function slugify(text) {
    if (!text) return '';
    return String(text)
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, '')
      .trim()
      .replace(/\s+/g, '-');
  }

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

  function buildYoutubeEmbedUrl(videoId) {
    if (!videoId) return '';
    return 'https://www.youtube.com/embed/' + videoId;
  }

  // category: subfolder under the AstenVale-Images repo, e.g. 'Evidence'
  function buildImageUrl(category, filename) {
    if (!category || !filename) return '';
    return 'https://astenvale.github.io/AstenVale-Images/images/' + category + '/' + filename;
  }

  return {
    slugify: slugify,
    buildSpotifyTrackUrl: buildSpotifyTrackUrl,
    buildSpotifyEmbedUrl: buildSpotifyEmbedUrl,
    buildYoutubeWatchUrl: buildYoutubeWatchUrl,
    buildYoutubeEmbedUrl: buildYoutubeEmbedUrl,
    buildImageUrl: buildImageUrl
  };
})();
