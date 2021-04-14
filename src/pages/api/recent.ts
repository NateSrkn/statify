import { getSession } from "next-auth/client";
import { api } from "../../utils/helpers";

export const getRecentlyPlayed = async (session) => {
  const { data } = await api({
    url: "me/player/recently-played",
    headers: { Authorization: `Bearer ${session.accessToken}` },
  });

  return data;
};
export default async function (req, res) {
  try {
    const session = await getSession({ req });
    if (!session) throw session;
    const data = await getRecentlyPlayed(session);
    res.status(200).json({ data });
  } catch (error) {
    res.status(400).json({ error });
  }
}
