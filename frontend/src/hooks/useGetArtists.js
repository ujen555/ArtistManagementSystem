import { useQuery } from "@tanstack/react-query";
import { getArtists } from "../api/artistsService";

export const useGetArtists = (page,limit) =>
    useQuery({
      queryKey: ['/artists',page,limit],
      queryFn: ()=>{
        return getArtists({ page, limit })
      },
      keepPreviousData : true
    });