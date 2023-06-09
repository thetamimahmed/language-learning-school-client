import { useQuery } from '@tanstack/react-query'

const Classes = () => {
    const { data: classes = [] } = useQuery({
        queryKey: ['classes'],
        queryFn: async () => {
            const res = await fetch("http://localhost:5000/classes")
            return res.json();
        },
    })
    return (
        <div className='bg-gradient-to-t from-transparent via-[#84d19f97]  to-transparent'>
        <h1 className='ml-12 text-3xl mt-10 border-b-4 border-[#84D19F] w-1/5 pb-3 text-[#6255A5] font-bold'>All Classes</h1>

        <div className='max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 mt-10 pb-10 '>
            {
                classes.map(course => <div key={course._id} className="card w-96 bg-base-100 shadow-xl mx-auto">
                <figure><img style={{height:"300px"}} src={course.image} alt="Shoes" /></figure>
                <div className="card-body">
                  <h2 className="card-title">
                    {course.name}
                  </h2>
                  <p>Instructor: {course.instructor}</p>
                  <p>Available Seat: {course.available_seats}</p>              
                  <p>Price: ${course.price}</p>              
                  <p>Enroll: {course.total_enroll} Students</p>              
                </div>
              </div>)
            }
        </div>
    </div>
    );
};

export default Classes;