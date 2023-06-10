import useAuth from "../../Hooks/useAuth";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import { useQuery } from '@tanstack/react-query'
import Swal from "sweetalert2";


const ManageClasses = () => {
    // const { user } = useAuth()
    const [axiosSecure] = useAxiosSecure()

    const { data: instructorsClasses = [], refetch } = useQuery({
        queryKey: ['instructorsClasses'],
        queryFn: async () => {
            const res = await axiosSecure("/addedClasses")
            return res.data;
        }
    })
    console.log(instructorsClasses)
    const handleApprove = id => {
        const approveClass = instructorsClasses.find(instructorsClass => instructorsClass._id === id)
        fetch(`http://localhost:5000/addedClasses/${id}`, {
            method: 'PATCH'
        })
            .then(res => res.json())
            .then(data => {
                if (data.modifiedCount) {
                    refetch();
                    Swal.fire({
                        position: 'center',
                        icon: 'success',
                        title: 'Approved Class',
                        showConfirmButton: false,
                        timer: 1500
                    })
                    axiosSecure.post("/classes", approveClass)
                    .then(data => {
                        if (data.data.insertedId) {
                            console.log('added in class')
                        }
                    })
                }
            })
    
    }

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
                            <th>Instructor</th>
                            <th>Email</th>
                            <th>Price</th>
                            <th>Available Seats</th>
                            <th>Status</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody >
                        {
                            instructorsClasses.map((instructorsClass, index) => {
                                return <tr key={instructorsClass._id}>
                                    <th>
                                        {index + 1}
                                    </th>
                                    <td>
                                        <div className="flex items-center space-x-3">
                                            <div className="avatar">
                                                <div className="mask mask-squircle w-12 h-12">
                                                    <img src={instructorsClass.image} alt="Avatar Tailwind CSS Component" />
                                                </div>
                                            </div>
                                            <div>
                                                <div className="font-bold">{instructorsClass.name}</div>
                                            </div>
                                        </div>
                                    </td>
                                    <td>
                                        {instructorsClass.instructor}
                                    </td>
                                    <td>
                                        {instructorsClass.email}
                                    </td>
                                    <td>
                                        ${instructorsClass.price}
                                    </td>
                                    <td>{instructorsClass.available_seats}</td>
                                    <td>
                                        {instructorsClass.status}
                                    </td>
                                    <td className="flex flex-col">
                                        <button disabled={instructorsClass.status === 'Approve'} onClick={() => { handleApprove(instructorsClass._id) }} className="btn btn-xs bg-[#317047] hover:bg-[#584B9F] text-white">Approve</button>
                                        <button className="btn btn-xs bg-red-700 hover:bg-[#584B9F] text-white">Deny</button>
                                        <button className="btn btn-xs bg-orange-700 hover:bg-[#584B9F] text-white">Feedback</button>

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

export default ManageClasses;