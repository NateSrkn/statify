import { getSession } from "next-auth/client";
import { Session } from "next-auth";
import { api } from "../../utils/helpers";
import { NextApiRequest, NextApiResponse } from "next";

export const getTopItems = async (
  { type = "tracks", time_range = "short_term" },
  session: Session
) => {
  if (session) {
    const { data } = await api({
      url: `me/top/${type}`,
      headers: { Authorization: `Bearer ${session.accessToken}` },
      params: {
        time_range,
        limit: 20,
      },
    });
    return data;
  }
};
export default async function (req: NextApiRequest, res: NextApiResponse) {
  try {
    const session = await getSession({ req });
    if (!session) throw session;
    const data = await getTopItems(req.query, session);
    res.status(200).json({ data });
  } catch (error) {
    res.status(400).json({ error });
  }
}
