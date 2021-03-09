import { getSession, session } from "next-auth/client";
import { api } from "../../utils/helpers";

export const getTopItems = async (
  { type = "tracks", time_range = "short_term" },
  session
) => {
  const { data } = await api({
    url: `me/top/${type}`,
    headers: { Authorization: `Bearer ${session.accessToken}` },
    params: {
      time_range,
    },
  });

  return data;
};
export default async function (req, res) {
  try {
    const session = await getSession({ req });
    if (!session) throw session;
    const data = await getTopItems(req.query, session);
    res.status(200).json({ data });
  } catch (error) {
    res.status(400).json({ error });
  }
}
