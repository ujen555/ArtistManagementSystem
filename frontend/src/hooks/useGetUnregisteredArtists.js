import { useQuery } from "@tanstack/react-query";
import { getUnregisteredArtists } from "../api/artistsService";

export const useGetUnregisteredArtists = () =>
    useQuery({
      queryKey: ['/unregisteredArtists'],
      queryFn: ()=>getUnregisteredArtists(),
      cacheTime: 0,         
    staleTime: 0,         
    refetchOnMount: true,
    refetchOnWindowFocus: true, 
});