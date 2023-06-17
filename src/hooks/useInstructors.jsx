import { useQuery } from "@tanstack/react-query";

const useInstructors = () => {
    const { refetch, data: instructors = [] } = useQuery({
        queryKey: ['instructors'],
        queryFn: async () => {
            const response = await fetch(`https://12th-assignment-server-side.vercel.app/users?role=instructor`);
            return response.json();
        },
    })
    return [ instructors, refetch]
    
}
export default useInstructors;