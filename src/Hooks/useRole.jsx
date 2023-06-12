import useAuth from "./useAuth"
import useAxiosSecure from "./useAxiosSecure"
import { useQuery } from '@tanstack/react-query'


const useRole = (role) =>{
    const {user} = useAuth()
    const [axiosSecure] = useAxiosSecure()
    const {data: userRole } = useQuery({
        queryKey: [role, user?.email],
        queryFn: async () =>{
            const res = await axiosSecure(`/users/${role}/${user?.email}`)
            return res.data.role
        }
    })
    return userRole
}
export default useRole