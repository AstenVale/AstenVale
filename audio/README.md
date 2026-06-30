# Audio Files

Self-hosted investigation recordings for Ashton Vale Archives.

## Folder Structure

audio/
  season-01/
    case-001/
      lantern-at-black-pine.mp3
    case-002/
      the-hollow-letter.mp3
    ...

## Naming Convention

- Folder: case-NNN (zero-padded case number)
- File: song-title-as-slug.mp3 (lowercase, hyphens, no special characters)

The case.html player derives the path automatically from:
  getCaseAudioPath(d) → audio/season-01/case-NNN/song-title-slug.mp3

To add a new recording:
1. Upload the MP3 to the correct folder
2. No code changes needed — the player auto-generates the path from the case ID and title

## Player Features

- Custom archive-styled player (no browser default UI)
- preload="none" — audio loads only when Play is pressed
- Keyboard: Space = play/pause, Arrow keys = seek ±10s, M = mute
- Session position memory — resumes where you left off
- Volume and playback speed controls
- Mobile touch seek support
