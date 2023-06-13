import { useLocation } from "react-router-dom";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import useAxiosSecure from "../../Hooks/useAxiosSecure";


const UpdateClass = () => {
    const [axiosSecure] = useAxiosSecure()
    const location = useLocation()
    const myClass = location.state;
    const {_id, price, name, available_seats} = myClass;
    const { register, handleSubmit, formState: { errors } } = useForm();
    const onSubmit = data => {
        const name = data.name;
        const price = data.price; 
        const available_seats = data.available_seats;
        const updateData = {name, price, available_seats}
        axiosSecure.put(`/addedclasses/${_id}`, updateData)
        .then(data => {
            if(data.data.modifiedCount> 0){
                Swal.fire({
                    position: 'center',
                    icon: 'success',
                    title: 'Update Successfully',
                    showConfirmButton: false,
                    timer: 1500
                })
            }
        })
        
    }
    return (
        <div>
            <h1 className='ml-12 text-3xl mt-10 border-b-4 border-[#84D19F] w-1/5 pb-3 text-[#6255A5] font-bold'>Update Your Class</h1>
            <form onSubmit={handleSubmit(onSubmit)} className="mx-12">
                <div className="flex gap-5">
                    <div className="form-control mb-4 w-1/2">
                        <label className="label">
                            <span className="label-text text-lg">Class Name</span>
                        </label>
                        <input type="text" {...register("name", { required: true })} placeholder="Class Name" className="input input-bordered" defaultValue={name} />
                        {errors.name && <span className="text-red-600">Class Name is required</span>}
                    </div>
                    <div className="form-control mb-4 w-1/2">
                        <label className="label">
                            <span className="label-text text-lg">Available Seats</span>
                        </label>
                        <input type="number" {...register("available_seats", { required: true })} placeholder="Available Seats" defaultValue={available_seats} className="input input-bordered" />
                        {errors.available_seats && <span className="text-red-600">Available Seats is required</span>}
                    </div>
                </div>
                <div className="flex gap-5">
                    <div className="form-control mb-4 w-1/2">
                        <label className="label">
                            <span className="label-text text-lg">Price</span>
                        </label>
                        <input type="number" {...register("price", { required: true })} placeholder="Price" className="input input-bordered" defaultValue={price} />
                        {errors.price && <span className="text-red-600">Price Is Required</span>}
                    </div>
                </div>
                <div className="text-center">
                    <input className="btn btn-md bg-[#317047] hover:bg-[#584B9F] text-white" type="submit" value="Update Class" />
                </div>
            </form>
        </div>
    );
};

export default UpdateClass;