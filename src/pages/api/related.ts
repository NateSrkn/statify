import { AxiosResponse } from "axios";
import { NextApiRequest, NextApiResponse } from "next";
import { Session } from "next-auth";
import { getSession } from "next-auth/client";
import { Artist } from "../../types/spotify";
import { api } from "../../utils/helpers";

export const getRelatedArtists = async (id: string, session: Session) => {
  const { data }: AxiosResponse<Artist[]> = await api({
    url: `artists/${id}/related-artists`,
    headers: { Authorization: `Bearer ${session.accessToken}` },
  });

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
    const data = await getRelatedArtists(<string>query.id, session);
    res.status(200).json({ data });
  } catch (error) {
    res.status(400).json({ error });
  }
}
