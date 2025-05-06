import { useQuery } from "@tanstack/react-query";
import { getSongById } from "../api/songsService";

export const useGetSongById = (songId) =>
    useQuery({
      queryKey: ['songById',String(songId)],
      queryFn: ()=>getSongById(songId),
      refetchOnWindowFocus: false,
      refetchOnMount: true,
      refetchOnReconnect: false,
      refetchInterval: false,
});