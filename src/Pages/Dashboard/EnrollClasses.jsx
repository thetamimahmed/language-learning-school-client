import { useQuery } from '@tanstack/react-query'
import useAxiosSecure from '../../Hooks/useAxiosSecure';

const EnrollClasses = () => {
    const [axiosSecure] = useAxiosSecure()
    const {data: enrollClasses = []} = useQuery({
        queryKey: ['enrollClass'],
        queryFn: async () =>{
            const res = await axiosSecure('/payments')
            return res.data
        }
    })
    console.log(enrollClasses)
    return (
        <div>
             <h1 className='ml-12 text-3xl mb-5 mt-10 border-b-4 border-[#84D19F] w-1/5 pb-3 text-[#6255A5] font-bold'>Your Enroll Classes</h1>
             <div className='max-w-7xl mx-auto ml-12 grid grid-cols-1 md:grid-cols-2 gap-10 mt-10 pb-10 '>
                {
                    enrollClasses.slice(0, 6).map(enrollClass => <div key={enrollClass._id} className="card w-96 bg-base-100 shadow-xl mx-auto">
                        <figure><img style={{ height: "300px" }} src={enrollClass.classImg} /></figure>
                        <div className="card-body">
                            <h2 className="card-title">
                                {enrollClass.name}
                            </h2>
                            <p>Instructor: {enrollClass.instructor}</p>
                            <p>Price: ${enrollClass.price}</p>
                            <p>Enroll Date: {enrollClass.date}</p>
                        </div>
                    </div>)
                }
            </div>
        </div>
    );
};

export default EnrollClasses;