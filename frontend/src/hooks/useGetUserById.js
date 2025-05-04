import { useQuery } from "@tanstack/react-query";
import { getUserById} from "../api/userService";

export const useGetUserById = (userId) =>
    useQuery({
      queryKey: ['userById',String(userId)],
      queryFn: ()=>getUserById(userId),
      select:(result)=>{
        return ({
            ...result,
            dob: result.dob ? result.dob.split("T")[0] : ""
        })
      },
      refetchOnWindowFocus: false,
      refetchOnMount: true,
      refetchOnReconnect: false,
      refetchInterval: false
});