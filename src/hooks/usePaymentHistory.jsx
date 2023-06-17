import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";

const usePaymentHistory = () => {
    const {user} = useAuth()
    const { refetch, data: myPaymentHistory = [] } = useQuery({
        queryKey: ['myPaymentHistory'],
        queryFn: async () => {
            const response = await fetch(`https://12th-assignment-server-side.vercel.app/payments?email=${user.email}`);
            
            return response.json();
        },
    })
    return [ myPaymentHistory, refetch]
    
}
export default usePaymentHistory;