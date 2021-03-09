import { useQuery } from "react-query";
import axios from "axios";

export const useRecentlyPlayed = (initialData) => {
  return useQuery(
    "recentlyPlayed",
    async () => {
      const { data } = await axios({
        url: "/api/recent",
      }).then(({ data }) => data);
      return { data: data.items };
    },
    {
      staleTime: 60 * 3000,
      initialData,
    }
  );
};
