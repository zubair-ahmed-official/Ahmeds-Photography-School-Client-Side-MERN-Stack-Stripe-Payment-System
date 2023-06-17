import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";
import useAxiosSecure from "./useAxiosSecure";

const useOrders = () => {
    const {user, loading} = useAuth()
    const [axiosSecure] = useAxiosSecure()
    const { refetch, data: orderedWatches = [] } = useQuery({
        queryKey: ['orderedWatches', user?.email],
        enabled: !loading,
        queryFn: async () => {
            const response = await axiosSecure(`https://12th-assignment-server-side.vercel.app/orderWatch?email=${user?.email}`);
            return response.data;
        },
    })

    

    return [orderedWatches, refetch]

}
export default useOrders;