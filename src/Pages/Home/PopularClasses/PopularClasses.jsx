import { useQuery } from '@tanstack/react-query'

const PopularClasses = () => {
    const { data: classes = [] } = useQuery({
        queryKey: ['classes'],
        queryFn: async () => {
            const res = await fetch("http://localhost:5000/classes")
            return res.json();
        },
    })

    console.log(classes)
    return (
        <div className='bg-gradient-to-t from-[#84D19F]  to-transparent'>
            <h1 className='text-center text-4xl mt-10 text-[#6255A5] font-bold'>Popular Classes</h1>

            <div className='max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 mt-10 pb-10 '>
                {
                    classes.slice(0, 6).map(course => <div key={course._id} className="card w-96 bg-base-100 shadow-xl mx-auto">
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

export default PopularClasses;