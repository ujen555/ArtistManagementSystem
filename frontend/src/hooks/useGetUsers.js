import { useQuery } from "@tanstack/react-query";
import { getUsers } from "../api/userService";

export const useGetUser = (page,limit) =>
    useQuery({
      queryKey: ['/users',page,limit],
      queryFn: ()=>{
        return getUsers({ page, limit })
      },
      keepPreviousData : true
    });