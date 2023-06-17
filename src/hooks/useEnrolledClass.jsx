import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";

const useEnrolledClasses = () => {
    const {user} = useAuth()
    const { refetch, data: myEnrolledClass = [] } = useQuery({
        queryKey: ['myEnrolledClass'],
        queryFn: async () => {
            const response = await fetch(`https://12th-assignment-server-side.vercel.app/selectClass?status=enrolled&email=${user.email}`);
            
            return response.json();
        },
    })
    return [ myEnrolledClass, refetch]
    
}
export default useEnrolledClasses;