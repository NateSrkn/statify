import { useQueries } from "react-query";
import axios from "axios";

export const useTopArtists = () => {
  return useQueries([
    {
      queryKey: "top-artists-short-term",
      queryFn: () =>
        axios({
          url: "/api/top",
          params: { type: "artists", time_range: "short_term" },
        }).then(({ data }) => data),
      staleTime: Infinity,
    },
    {
      queryKey: "top-artists-mid-term",
      queryFn: () =>
        axios({
          url: "/api/top",
          params: { type: "artists", time_range: "medium_term" },
        }).then(({ data }) => data),
      staleTime: Infinity,
    },
    {
      queryKey: "top-artists-long-term",
      queryFn: () =>
        axios({
          url: "/api/top",
          params: { type: "artists", time_range: "long_term" },
        }).then(({ data }) => data),
      staleTime: Infinity,
    },
  ]);
};
