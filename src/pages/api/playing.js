import { getSession } from "next-auth/client";
import { api } from "../../utils/helpers";

const transformCurrentlyPlaying = (data) => {
  const { item, progress_ms, is_playing, currently_playing_type } = data;
  const { album, artists, name, duration_ms, preview_url } = item;
  return {
    progress: progress_ms,
    is_playing,
    currently_playing_type,
    album,
    artists,
    song: name,
    duration: duration_ms,
    preview_url,
  };
};

export const getNowPlaying = async (session) => {
  const { data } = await api({
    url: "me/player/currently-playing",
    headers: { Authorization: `Bearer ${session.accessToken}` },
  });
  return transformCurrentlyPlaying(data);
};

export default async function (req, res) {
  try {
    const session = await getSession({ req });
    if (!session) throw session;
    const data = await getNowPlaying(session);
    res.status(200).json({ data });
  } catch (error) {
    res.status(400).json({ error });
  }
}
