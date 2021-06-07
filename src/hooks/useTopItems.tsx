import { useQueries } from "react-query";
import axios from "axios";
import { Session } from "next-auth";
export const useTopItems = (
  type: "artists" | "tracks",
  session: Session,
  [shortTerm, mediumTerm, longTerm] = [undefined, undefined, undefined]
) => {
  return useQueries([
    {
      queryKey: `top-${type}-short-term`,
      queryFn: () =>
        axios({
          url: "/api/top",
          params: { type, time_range: "short_term" },
        }).then(({ data: { data } }) => data),
      staleTime: Infinity,
      initialData: shortTerm,
      enabled: !!session,
    },
    {
      queryKey: `top-${type}-mid-term`,
      queryFn: () =>
        axios({
          url: "/api/top",
          params: { type, time_range: "medium_term" },
        }).then(({ data: { data } }) => data),
      staleTime: Infinity,
      initialData: mediumTerm,
      enabled: !!session,
    },
    {
      queryKey: `top-${type}-long-term`,
      queryFn: () =>
        axios({
          url: "/api/top",
          params: { type, time_range: "long_term" },
        }).then(({ data: { data } }) => data),
      staleTime: Infinity,
      initialData: longTerm,
      enabled: !!session,
    },
  ]);
};
