import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import useAuth from "../../Hooks/useAuth";

const Register = () => {
    const { signUp, updateUserProfile } = useAuth()
    const { register, handleSubmit, watch, formState: { errors } } = useForm();
    const onSubmit = data => {
        console.log(data)
        signUp(data.email, data.password)
            .then(result => {
                const loggedUser = result.user
                console.log(loggedUser)
                updateUserProfile(data.name, data.photoURL)
                    .then(() => {
                        Swal.fire({
                            position: 'center',
                            icon: 'success',
                            title: 'Your work has been saved',
                            showConfirmButton: false,
                            timer: 1500
                        })
                    })
                    .catch(error => { console.log(error) })
            })
            .catch(error => {
                console.log(error)
            })
    };
    console.log(errors)
    return (
        <div className="bg-base-200 w-1/3 mx-auto pb-10 px-5">
            <h1 className="text-2xl text-center py-5 font-bold text-[#6255A5]">Please Regiser! {name}</h1>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="form-control mb-4">
                    <label className="label">
                        <span className="label-text text-lg">Name</span>
                    </label>
                    <input type="text" {...register("name", { required: true })} placeholder="name" className="input input-bordered" />
                    {errors.name && <span className="text-red-600">Name is required</span>}
                </div>
                <div className="form-control mb-4">
                    <label className="label">
                        <span className="label-text text-lg">Email</span>
                    </label>
                    <input type="text" {...register("email", { required: true })} placeholder="email" className="input input-bordered" />
                    {errors.email && <span className="text-red-600">Email is required</span>}
                </div>
                <div className="form-control mb-4">
                    <label className="label">
                        <span className="label-text text-lg">PhotoURL</span>
                    </label>
                    <input type="text" {...register("photoURL", { required: true })} placeholder="Photo" className="input input-bordered" />
                    {errors.photoURL && <span className="text-red-600">Photo Url required</span>}
                </div>
                <div className="form-control mb-4">
                    <label className="label">
                        <span className="label-text text-lg">Password</span>
                    </label>
                    <input type="password" {...register("password", { required: true, minLength: 6, pattern: /(?=.*[A-Z])(?=.*[!@#$&*])/ })} placeholder="Password" className="input input-bordered" />
                    {errors.password?.type === 'required' && <p className="text-red-600">Password is Required</p>}
                    {errors.password?.type === 'minLength' && <p className="text-red-600">Password should be 6 characters</p>}
                    {errors.password?.type === 'pattern' && <p className="text-red-600">Password should have at least one uppercase and special character.</p>}
                </div>
                <div className="form-control mb-4">
                    <label className="label">
                        <span className="label-text text-lg">Confirm Password</span>
                    </label>
                    <input type="password" {...register("confirmPassword", { required: true, validate: (value) => value === watch('password') })} placeholder="Confirm Password" className="input input-bordered" />
                    {errors.confirmPassword && <span className="text-red-600">Not Matched Password</span>}
                </div>
                <div className="text-center">
                    <input className="btn btn-md bg-[#317047] hover:bg-[#584B9F] text-white" type="submit" value="Register" />
                </div>
            </form>
            <p className="text-center text-[#6255A5] text-lg mt-4">Already Have An Account? <Link className="text-[#84D19F] hover:underline" to="/login">Login</Link></p>
        </div>
    );
};

export default Register;