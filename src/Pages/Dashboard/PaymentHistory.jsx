import useAxiosSecure from "../../Hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import useAuth from "../../Hooks/useAuth";

const PaymentHistory = () => {
    const {user} = useAuth()
    const [axiosSecure] = useAxiosSecure()

    const { data: payClasses = [] } = useQuery({
        queryKey: ['payClasses'],
        queryFn: async () => {
            const res = await axiosSecure(`/payments/?email=${user?.email}`)
            return res.data;
        }
    })
    console.log('payClasses', payClasses)
    return (
        <div>
            <h1 className='ml-12 text-3xl mt-10 border-b-4 border-[#84D19F] w-1/5 pb-3 text-[#6255A5] font-bold'>Your Payment History</h1>
            <div className="overflow-x-auto">
                <table className="table my-5">
                    {/* head */}
                    <thead>
                        <tr>
                            <th>
                                #
                            </th>
                            <th>Class Name</th>
                            <th>Email</th>
                            <th>Price</th>
                            <th className="text-center">Transaction Id</th>
                            <th className="text-center">Date</th>
                        </tr>
                    </thead>
                    <tbody >
                        {
                            payClasses.map((payClass, index) => {
                                return <tr key={payClass._id}>
                                    <th>
                                        {index + 1}
                                    </th>
                                    <td>
                                        {payClass.className}
                                    </td>
                                    <td>
                                        {payClass.email}
                                    </td>
                                    <td>${payClass.price}</td>
                                    <td className="text-center">
                                        {payClass.transactionId}
                                    </td>
                                    <td className="text-center">
                                        {payClass.date}
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

export default PaymentHistory;