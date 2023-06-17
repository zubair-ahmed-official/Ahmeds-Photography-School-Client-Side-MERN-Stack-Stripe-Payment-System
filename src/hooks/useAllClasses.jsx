import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";

const useAllClasses = () => {
    const {user} = useAuth()
    const { refetch, data: allClass = [] } = useQuery({
        queryKey: ['allClass'],
        queryFn: async () => {
            const response = await fetch(`https://12th-assignment-server-side.vercel.app/classes`);
            return response.json();
        },
    })
    return [ allClass, refetch]
    
}
export default useAllClasses;