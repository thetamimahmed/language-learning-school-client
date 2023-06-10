import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import useAxiosSecure from "../../Hooks/useAxiosSecure";


const imgHostingToken = import.meta.env.VITE_Image_Hosting_Token
const imgHostingURL = `https://api.imgbb.com/1/upload?key=${imgHostingToken}`

const AddClass = () => {
    const [axiosSecure] = useAxiosSecure()
    const { register, handleSubmit, formState: { errors } } = useForm();
    const onSubmit = data => {
        const formData = new FormData()
        formData.append('image', data.image[0])
        fetch(imgHostingURL, {
            method: 'POST',
            body: formData
        })
        .then(res=> res.json())
        .then(imgRes => {
            if(imgRes.success){
                const imgURL = imgRes.data.display_url
                const {price} = data
                const addedClass = data;
                addedClass.price = parseFloat(price)
                addedClass.image = imgURL;
                addedClass.total_enroll = 0;
                addedClass.status = 'pending';
                console.log(addedClass)
                axiosSecure.post("/addedClass", addedClass)
                .then(data =>{
                    if(data.data.insertedId){
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
        })
    };
    return (
        <div>
            <h1 className='ml-12 text-3xl mt-10 border-b-4 border-[#84D19F] w-1/5 pb-3 text-[#6255A5] font-bold'>Add A Class</h1>
            <form onSubmit={handleSubmit(onSubmit)} className="mx-12">
                <div className="flex gap-5">
                    <div className="form-control mb-4 w-1/2">
                        <label className="label">
                            <span className="label-text text-lg">Instructor Name</span>
                        </label>
                        <input type="text" {...register("instructor", { required: true })} placeholder="Instructor Name" className="input input-bordered" />
                        {errors.instructor && <span className="text-red-600">Instructor Name is required</span>}
                    </div>
                    <div className="form-control mb-4 w-1/2">
                        <label className="label">
                            <span className="label-text text-lg">Instructor Email</span>
                        </label>
                        <input type="email" {...register("email", { required: true })} placeholder="Instructor Email" className="input input-bordered" />
                        {errors.email && <span className="text-red-600">Instructor Email is required</span>}
                    </div>
                </div>
                <div className="flex gap-5">
                    <div className="form-control mb-4 w-1/2">
                        <label className="label">
                            <span className="label-text text-lg">Class Name</span>
                        </label>
                        <input type="text" {...register("name", { required: true })} placeholder="Class Name" className="input input-bordered" />
                        {errors.name && <span className="text-red-600">Class Name is required</span>}
                    </div>
                    <div className="form-control mb-4 w-1/2">
                        <label className="label">
                            <span className="label-text text-lg">Available Seats</span>
                        </label>
                        <input type="number" {...register("available_seats", { required: true })} placeholder="Available Seats" className="input input-bordered" />
                        {errors.available_seats && <span className="text-red-600">Available Seats is required</span>}
                    </div>
                </div>
                <div className="flex gap-5">
                    <div className="form-control mb-4 w-1/2">
                        <label className="label">
                            <span className="label-text text-lg">Price</span>
                        </label>
                        <input type="number" {...register("price", { required: true })} placeholder="Price" className="input input-bordered" />
                        {errors.price && <span className="text-red-600">Price Is Required</span>}
                    </div>
                    <div className="form-control mb-4 w-1/2">
                        <label className="label">
                            <span className="label-text text-lg">Class Image</span>
                        </label>
                        <input type="file" {...register("image", { required: true })} placeholder="You can't touch this" className="file-input file-input-bordered w-full max-w-xs" />
                        {errors.image && <span className="text-red-600">image is required</span>}
                    </div>
                </div>
                <div className="text-center">
                    <input className="btn btn-md bg-[#317047] hover:bg-[#584B9F] text-white" type="submit" value="Add Class" />
                </div>
            </form>
        </div>
    );
};

export default AddClass;