import { useQuery } from '@tanstack/react-query'

const PopularInstructors = () => {
    const { data: instructors = [] } = useQuery({
        queryKey: ['instructors'],
        queryFn: async () => {
            const res = await fetch("https://languager-learning-school-server.vercel.app/instructors")
            return res.json();
        },
    })
    console.log(instructors)
    return (
    <div data-aos="zoom-out-down" className='bg-gradient-to-t from-transparent via-[#84d19f97]  to-transparent'>
            <h1 className='ml-12 text-3xl mt-10 border-b-4 border-[#84D19F] w-1/5 pb-3 text-[#6255A5] font-bold'>Popular Instructors</h1>

            <div className='max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 mt-10 pb-10 '>
                {
                    instructors.slice(0, 6).map(instructor => <div key={instructor._id} className="card w-96 bg-base-100 shadow-xl mx-auto">
                    <figure><img src={instructor.image} alt="Shoes" /></figure>
                    <div className="card-body text-center">
                      <h2 className="text-2xl font-bold">
                        {instructor.name}
                      </h2> 
                      <p>Email : {instructor.email}</p>       
                    </div>
                  </div>)
                }
            </div>
        </div>
    );
};

export default PopularInstructors;