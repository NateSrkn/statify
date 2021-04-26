import { getSession } from "next-auth/client";
import { Session } from "next-auth";
import { api } from "../../utils/helpers";
import { NextApiRequest, NextApiResponse } from "next";

const transformCurrentlyPlaying = (data) => {
  if (!!data) {
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
  }
  return {};
};

export const getNowPlaying = async (session: Session) => {
  const { data } = await api({
    url: "me/player/currently-playing",
    headers: { Authorization: `Bearer ${session.accessToken}` },
  });
  return transformCurrentlyPlaying(data);
};

export default async function (req: NextApiRequest, res: NextApiResponse) {
  try {
    const session = await getSession({ req });
    if (!session) throw session;
    const data = await getNowPlaying(session);
    res.status(200).json({ data });
  } catch (error) {
    res.status(400).json({ error });
  }
}
