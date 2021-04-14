export const AUTH_ENDPOINT = "https://accounts.spotify.com/authorize";

// Replace with your app's client ID, redirect URI and desired scopes
export const client_id = process.env.NEXT_PUBLIC_CLIENT_ID;
export const redirect_uri = process.env.NEXT_PUBLIC_REDIRECT_URI;
export const scopes = [
  "user-top-read",
  "user-read-currently-playing",
  "user-read-playback-state",
].join("%20");

export const AUTH_URL = `${AUTH_ENDPOINT}?client_id=${client_id}&redirect_uri=${redirect_uri}&scope=${scopes}&response_type=code&show_dialog=true`;
