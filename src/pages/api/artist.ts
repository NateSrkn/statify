import { AxiosResponse } from "axios";
import { NextApiRequest, NextApiResponse } from "next";
import { Session } from "next-auth";
import { getSession } from "next-auth/client";
import { Album, Artist, Track } from "../../types/spotify";
import { api } from "../../utils/helpers";

export const getRelatedArtists = async (id: string, session: Session) => {
  const { data }: AxiosResponse<Artist[]> = await api({
    url: `artists/${id}`,
    headers: { Authorization: `Bearer ${session.accessToken}` },
  });

  return data;
};

export const getArtistData = async (id: string, session: Session) => {
  const data = await Promise.all([
    api({
      url: `artists/${id}`,
      headers: { Authorization: `Bearer ${session.accessToken}` },
    }),
    api({
      url: `artists/${id}/related-artists`,
      headers: { Authorization: `Bearer ${session.accessToken}` },
    }),
    api({
      url: `artists/${id}/top-tracks`,
      headers: { Authorization: `Bearer ${session.accessToken}` },
      params: {
        market: "from_token",
      },
    }),
    api({
      url: `artists/${id}/albums`,
      headers: { Authorization: `Bearer ${session.accessToken}` },
      params: {
        include_groups: "album",
        market: "from_token",
        country: "from_token",
      },
    }),
  ]).then(
    ([
      { data: artist },
      { data: related },
      { data: topTracks },
      { data: albums },
    ]: [
      AxiosResponse<Artist>,
      AxiosResponse<{ artists: Artist[] }>,
      AxiosResponse<{ tracks: Track[] }>,
      AxiosResponse<{ items: Album[]; total: number }>
    ]) => ({
      id,
      type: artist.type,
      name: artist.name,
      images: artist.images,
      genres: artist.genres,
      followers: artist.followers.total,
      albums: { items: albums.items, total: albums.total },
      tracks: topTracks.tracks,
      related_artists: related.artists,
    })
  );

  return data;
};

export default async function related(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const session = await getSession({ req });
    if (!session) throw session;
    const { query } = req;
    const data = await getArtistData(<string>query.id, session);
    res.status(200).json({ data });
  } catch (error) {
    res.status(400).json({ error });
  }
}
