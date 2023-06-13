import useAuth from "./useAuth"
import useAxiosSecure from "./useAxiosSecure"
import { useQuery } from '@tanstack/react-query'


const useAdmin = () =>{
    const {user} = useAuth()
    const [axiosSecure] = useAxiosSecure()
    const {data: isAdmin, loading: isAdminLoading } = useQuery({
        queryKey: ['admin', user?.email],
        queryFn: async () =>{
            const res = await axiosSecure.get(`/users/admin/${user?.email}`)
            return res.data.role
        }
    })
    return [isAdmin, isAdminLoading]
}
export default useAdmin