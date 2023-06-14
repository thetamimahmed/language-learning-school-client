import { useQuery } from '@tanstack/react-query'
import { AiFillDelete } from "react-icons/ai";
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import useAuth from '../../Hooks/useAuth';
import useAxiosSecure from '../../Hooks/useAxiosSecure';

const MySelectedClasses = () => {
    // const token = localStorage.getItem('access-token')
    const { user } = useAuth()
    const [axiosSecure] = useAxiosSecure()
    const { data: bookedClasses = [], refetch } = useQuery({
        queryKey: ['bookedClasses'],
        queryFn: async () => {
            const res = await axiosSecure(`/bookingclasses?email=${user?.email}`)
            return res.data;
        },
    })

    const deleteClass = id => {
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
            if (result.isConfirmed) {
                fetch(`https://languager-learning-school-server.vercel.app/bookingclasses?id=${id}`, {
                    method: 'DELETE'
                })
                    .then(res => res.json())
                    .then(data => {
                        refetch()
                        if (data.deletedCount > 0) {
                            Swal.fire(
                                'Deleted!',
                                'Your file has been deleted.',
                                'success'
                            )
                        }
                    })
            }
        })
    }
    return (
        <div>
            <h1 className='ml-12 text-3xl mt-10 border-b-4 border-[#84D19F] w-1/5 pb-3 text-[#6255A5] font-bold'>Selected Classes</h1>
            <div className="overflow-x-auto mt-5 mb-10">
                <table className="table">
                    {/* head */}
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Name</th>
                            <th>Instructor</th>
                            <th>Available Seats</th>
                            <th>Price</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            bookedClasses.map((myClass, index) => <tr key={myClass._id}>
                                <th>{index + 1}</th>
                                <td>{myClass.name}</td>
                                <td>{myClass.instructor}</td>
                                <td>{myClass.available_seats}</td>
                                <td>${myClass.price}</td>
                                <td className='flex items-center'>
                                    <Link to="/dashboard/payment" state={myClass}>
                                        <button className="btn btn-xs bg-[#84D19F] text-white hover:bg-[#584B9F]">Pay</button>
                                    </Link>
                                    <button onClick={() => { deleteClass(myClass._id) }} className='text-xl text-red-600 ml-3'><AiFillDelete></AiFillDelete></button>
                                </td>
                            </tr>)
                        }

                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default MySelectedClasses;