import useAuth from "./useAuth"
import useAxiosSecure from "./useAxiosSecure"
import { useQuery } from '@tanstack/react-query'


const useInstructor = () =>{
    const {user} = useAuth()
    const [axiosSecure] = useAxiosSecure()
    const {data: isInstructor, loading: isInstructorLoading } = useQuery({
        queryKey: ['instructor', user?.email],
        queryFn: async () =>{
            const res = await axiosSecure.get(`/users/instructor/${user?.email}`)
            return res.data.role
        }
    })
    return [isInstructor, isInstructorLoading]
}
export default useInstructor