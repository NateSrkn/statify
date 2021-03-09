import { useQueries } from "react-query";
import axios from "axios";
export const useTopItems = (type, [shortTerm, mediumTerm, longTerm]) => {
  return useQueries([
    {
      queryKey: `top-${type}-short-term`,
      queryFn: () =>
        axios({
          url: "/api/top",
          params: { type, time_range: "short_term" },
        }).then(({ data }) => data),
      staleTime: Infinity,
      initialData: shortTerm,
    },
    {
      queryKey: `top-${type}-mid-term`,
      queryFn: () =>
        axios({
          url: "/api/top",
          params: { type, time_range: "medium_term" },
        }).then(({ data }) => data),
      staleTime: Infinity,
      initialData: mediumTerm,
    },
    {
      queryKey: `top-${type}-long-term`,
      queryFn: () =>
        axios({
          url: "/api/top",
          params: { type, time_range: "long_term" },
        }).then(({ data }) => data),
      staleTime: Infinity,
      initialData: longTerm,
    },
  ]);
};
