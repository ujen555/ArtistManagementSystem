import { useQuery } from "@tanstack/react-query";
import { getArtistById } from "../api/artistsService";

export const useGetArtistById = (artistId,options) =>
    useQuery({
      queryKey: ['artistById',String(artistId)],
      queryFn: ()=>getArtistById(artistId),
      select:(result)=>{
        return ({
            ...result,
            dob: result.dob ? result.dob.split("T")[0] : ""
        })
      },
      refetchOnWindowFocus: false,
      refetchOnMount: true,
      refetchOnReconnect: false,
      refetchInterval: false,
      ...options
});