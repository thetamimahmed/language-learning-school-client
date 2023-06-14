import useAxiosSecure from "../../Hooks/useAxiosSecure";
import { useQuery } from '@tanstack/react-query'
import Swal from "sweetalert2";
import { useState } from "react";


const ManageClasses = () => {
    const [classID, setClassID] = useState(null)
    const [axiosSecure] = useAxiosSecure()

    const { data: instructorsClasses = [], refetch } = useQuery({
        queryKey: ['instructorsClasses'],
        queryFn: async () => {
            const res = await axiosSecure.get("/addedClasses")
            return res.data;
        }
    })
    const handleApprove = (id, status) => {
        setClassID(id)
        const approveClass = instructorsClasses.find(instructorsClass => instructorsClass._id === id)
        fetch(`https://languager-learning-school-server.vercel.app/addedClasses/${status}/${id}`, {
            method: 'PATCH'
        })
            .then(res => res.json())
            .then(data => {
                if (data.modifiedCount) {
                    refetch();
                    Swal.fire({
                        position: 'center',
                        icon: 'success',
                        title: `${status} Class`,
                        showConfirmButton: false,
                        timer: 1500
                    })
                    if (status === 'Approve') {
                        approveClass.status = "Approve"
                        axiosSecure.post("/classes", approveClass)
                            .then(data => {
                                if (data.data.insertedId) {
                                    console.log('added in class')
                                }
                            })
                    }
                }
            })

    }

    const openModal = (id) => {
        setClassID(id);
        window.my_modal_2.showModal()
    };

    const handleFeedback = event => {
        event.preventDefault()
        const form = event.target;
        const feedbackField = { feedback: form.feedbackField.value };
        console.log(feedbackField)
        axiosSecure.patch(`/addedClasses/${classID}`, feedbackField)
            .then(data => {
                if (data.data.modifiedCount) {
                    refetch()
                    Swal.fire({
                        position: 'center',
                        icon: 'success',
                        title: 'Class Now In Pending',
                        showConfirmButton: false,
                        timer: 1500
                    })
                }
            })
    }
    return (
        <div>
            <dialog id="my_modal_2" className="modal">
                <form onSubmit={handleFeedback} method="dialog" className="modal-box flex flex-col items-center justify-center">
                    <textarea name="feedbackField" placeholder="Feedback" className="textarea textarea-bordered textarea-lg w-full max-w-xs" ></textarea>
                    <div>
                        <button>
                            <input className="btn btn-sm bg-[#317047] hover:bg-[#584B9F] text-white mt-3 " type="submit" value="Send Feedback" />
                        </button>
                    </div>
                </form>
                <form method="dialog" className="modal-backdrop">
                    <button>close</button>
                </form>
            </dialog>
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
                                        <button disabled={instructorsClass.status === 'Approve'} onClick={() => { handleApprove(instructorsClass._id, "Approve") }} className="btn btn-xs bg-[#317047] hover:bg-[#584B9F] text-white">Approve</button>
                                        <button disabled={instructorsClass.status === 'Deny'} onClick={() => { handleApprove(instructorsClass._id, "Deny") }} className="btn btn-xs bg-red-700 hover:bg-[#584B9F] text-white">Deny</button>
                                        <button disabled={('feedback' in instructorsClass)} onClick={() => openModal(instructorsClass._id)} className="btn btn-xs bg-orange-700 hover:bg-[#584B9F] text-white">Feedback</button>
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