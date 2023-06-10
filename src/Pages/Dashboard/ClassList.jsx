import useAxiosSecure from "../../Hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import useAuth from "../../Hooks/useAuth";

const ClassList = () => {
    const {user, loading} = useAuth()
    const [axiosSecure] = useAxiosSecure()

    const { data: addedClasses = [] } = useQuery({
        queryKey: ['addedClasses', user?.email],
        enabled: !loading,
        queryFn: async () => {
            const res = await axiosSecure(`/addedClasses?email=${user?.email}`)
            return res.data;
        }
    })
    console.log(addedClasses)

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
                            <th>Price</th>
                            <th>Available Seats</th>
                            <th>Status</th>
                            <th>Feedback</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody >
                        {
                            addedClasses.map((addedClass, index) => { return <tr key={addedClass._id}>
                                <th>
                                    {index + 1}
                                </th>
                                <td>
                                    <div className="flex items-center space-x-3">
                                        <div className="avatar">
                                            <div className="mask mask-squircle w-12 h-12">
                                                <img src={addedClass.image} alt="Avatar Tailwind CSS Component" />
                                            </div>
                                        </div>
                                        <div>
                                            <div className="font-bold">{addedClass.name}</div>
                                        </div>
                                    </div>
                                </td>
                                <td>
                                    ${addedClass.price}
                                </td>
                                <td>{addedClass.available_seats}</td>
                                <td>
                                    {addedClass.status}
                                </td>
                                <td>
                                    {addedClass?.feedback ? addedClass.feedback : 'No Feedback'}
                                </td>
                                <td>
                                    <button className="btn btn-sm bg-[#317047] hover:bg-[#584B9F] text-white">Update</button>
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

export default ClassList;