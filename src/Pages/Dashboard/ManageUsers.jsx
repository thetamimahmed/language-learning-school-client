import { useQuery } from '@tanstack/react-query'
import Swal from 'sweetalert2';
import useAxiosSecure from '../../Hooks/useAxiosSecure';

const ManageUsers = () => {
    const [axiosSecure] = useAxiosSecure()
    const { data: users = [], refetch } = useQuery({
        queryKey: ['bookedClasses'],
        queryFn: async () => {
            const res = await axiosSecure('/users')
            return res.data;
        },
    })

    const handleRole = (user, newRole) =>{
        axiosSecure.patch(`/users/${newRole}/${user._id}`)
        .then(data => {
            if (data.data.modifiedCount) {
                refetch()
                Swal.fire({
                    position: 'center',
                    icon: 'success',
                    title: `${user.name} is now an ${newRole}`,
                    showConfirmButton: false,
                    timer: 1500
                })
            }
        })
    }

    console.log(users)
    return (
        <div>
            <h1 className='ml-12 text-3xl mt-10 border-b-4 border-[#84D19F] w-1/5 pb-3 text-[#6255A5] font-bold'>Your Added Class List</h1>
            <div className="overflow-x-auto">
                <table className="table my-5">
                    {/* head */}
                    <thead>
                        <tr>
                            <th>
                                #
                            </th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Role</th>
                            <th className='text-center'>Action</th>
                        </tr>
                    </thead>
                    <tbody >
                        {
                            users.map((user, index) => {
                                return <tr key={user._id}>
                                    <th>
                                        {index + 1}
                                    </th>
                                    <td className="font-bold">
                                        {user.name}
                                    </td>
                                    <td>
                                        {user.email}
                                    </td>
                                    <td>
                                        {user.role}
                                    </td>
                                    <td className="flex justify-center">
                                        <button disabled={user.role === 'instructor'} onClick={()=>{handleRole(user, 'instructor')}} className="btn btn-xs bg-[#317047] hover:bg-[#584B9F] text-white">Make Instructor</button>
                                        <button disabled={user.role === 'admin'} onClick={()=>{handleRole(user, 'admin')}} className="btn btn-xs bg-[#317047] hover:bg-[#584B9F] text-white ml-3">Make Admin</button>
                                    </td>
                                </tr>
                            })
                        }
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ManageUsers;