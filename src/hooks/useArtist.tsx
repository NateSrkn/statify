import axios from "axios";
import { useQuery } from "react-query";

export const useArtist = (id: string | null = null) => {
  return useQuery(
    ["related-artists", id],
    () =>
      axios({
        url: "/api/artist",
        params: {
          id,
        },
      }),
    {
      enabled: id ? true : false,
      staleTime: Infinity,
    }
  );
};
