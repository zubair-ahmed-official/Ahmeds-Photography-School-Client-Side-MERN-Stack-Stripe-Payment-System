//https://12th-assignment-server-side.vercel.app/classes?status=approved
import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";

const useApprovedClasses = () => {
    const {user} = useAuth()
    const { refetch, data: approvedClass = [] } = useQuery({
        queryKey: ['approvedClass'],
        queryFn: async () => {
            const response = await fetch(`https://12th-assignment-server-side.vercel.app/classes?status=approved`);
            return response.json();
        },
    })
    return [ approvedClass, refetch]
    
}
export default useApprovedClasses;