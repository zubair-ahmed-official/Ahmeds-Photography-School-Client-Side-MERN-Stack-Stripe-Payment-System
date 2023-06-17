import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";

const useMyClasses = () => {
    const {user} = useAuth()
    const { refetch, data: myClass = [] } = useQuery({
        queryKey: ['myClass'],
        queryFn: async () => {
            const response = await fetch(`https://12th-assignment-server-side.vercel.app/classes?instructor_email=${user.email}`);
            return response.json();
        },
    })
    return [ myClass, refetch]
    
}
export default useMyClasses;