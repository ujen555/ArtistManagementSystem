import { useQuery } from "@tanstack/react-query";
import { getSongsOfArtist } from "../api/songsService";

export const useGetSongsOfArtist = (artist_id,{page,limit}) =>
    useQuery({
      queryKey: ['/songs-by-artistid',artist_id,page,limit],
      queryFn: ()=>{
        return getSongsOfArtist(artist_id,{ page, limit })
      },
      keepPreviousData : true
    });