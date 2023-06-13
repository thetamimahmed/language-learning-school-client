import { useQuery } from '@tanstack/react-query'
import { useState } from 'react';
import Swal from 'sweetalert2';

import useAuth from '../../Hooks/useAuth';

const Classes = () => {
  const [disabledButtons, setDisabledButtons] = useState([]);

  const {user} = useAuth()
    const { data: classes = [] } = useQuery({
        queryKey: ['classes'],
        queryFn: async () => {
            const res = await fetch("http://localhost:5000/classes")
            return res.json();
        },
    })

    const handleSelectClass = (course) =>{
      const {_id, name, instructor, available_seats, price, image, total_enroll} = course
      if(user && user?.email){
        const selectClass = {classID:_id, name, instructor, available_seats, price, image, total_enroll,  email: user.email}
        fetch('http://localhost:5000/bookingclasses',{
          method: 'POST',
          headers: {
            'content-type':'application/json'
          },
          body: JSON.stringify(selectClass)
        })
        .then(res => res.json())
        .then(data => {
          if(data.insertedId){
            Swal.fire({
                position: 'Center',
                icon: 'success',
                title: 'Class Selected Successfully',
                showConfirmButton: false,
                timer: 1500
              })
        } 
       })
      
      }
      setDisabledButtons(prevState => [...prevState, course._id]);

    }

    return (
        <div className='bg-gradient-to-t from-transparent via-[#84d19f97]  to-transparent'>
        <h1 className='ml-12 text-3xl mt-10 border-b-4 border-[#84D19F] w-1/5 pb-3 text-[#6255A5] font-bold'>All Classes</h1>

        <div className='max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 mt-10 pb-10 '>
            {
                classes.map(course => <div key={course._id} className={course.available_seats === 0 ? "card w-96 bg-red-400 shadow-xl mx-auto" : "card w-96 bg-base-100 shadow-xl mx-auto"}>
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
                <button disabled={disabledButtons.includes(course._id) || course.available_seats===0}   onClick={()=>{handleSelectClass(course)}} className="btn bg-[#84D19F] text-white hover:bg-[#584B9F] rounded-none">Select</button>
              </div>)
            }
        </div>
    </div>
    );
};

export default Classes;