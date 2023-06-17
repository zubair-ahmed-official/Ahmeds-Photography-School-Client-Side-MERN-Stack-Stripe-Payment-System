import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";

const useMySelectedClasses = () => {
    const {user} = useAuth()
    const { refetch, data: mySelectedClass = [] } = useQuery({
        queryKey: ['mySelectedClass'],
        queryFn: async () => {
            const response = await fetch(`https://12th-assignment-server-side.vercel.app/selectClass?status=pending&email=${user.email}`);
            
            return response.json();
        },
    })
    return [ mySelectedClass, refetch]
    
}
export default useMySelectedClasses;