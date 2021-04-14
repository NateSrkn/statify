import { useQuery } from "react-query";
import axios from "axios";

let songLength = null;

export const useCurrentlyPlaying = (initialData) => {
  return useQuery(
    "currentlyPlaying",
    async () => {
      const { data } = await axios({
        url: "/api/playing",
      }).then(({ data }) => data);
      if (!!data) {
        songLength = data.duration_ms;
        return data;
      }

      return null;
    },
    {
      staleTime: songLength || 60 * 1000,
      initialData,
    }
  );
};
