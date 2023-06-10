import { useQuery } from '@tanstack/react-query'
import { AiFillDelete } from "react-icons/ai";
import useAuth from '../../Hooks/useAuth';

const MySelectedClasses = () => {
    const {user} = useAuth()
    const { data: bookedClasses = [] } = useQuery({
        queryKey: ['bookedClasses'],
        queryFn: async () => {
            const res = await fetch(`http://localhost:5000/bookingclasses?email=${user?.email}`)
            return res.json();
        },
    })
    console.log(bookedClasses)
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
                                    <button className="btn btn-xs bg-[#84D19F] text-white hover:bg-[#584B9F]">Pay</button>
                                    <button className='text-xl text-red-600 ml-3'><AiFillDelete></AiFillDelete></button>
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