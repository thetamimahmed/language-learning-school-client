import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";

const Login = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const onSubmit = data => {
        console.log(data)
    };
    console.log(errors)
    return (
        <div className="bg-base-200 w-1/3 mx-auto pb-10 px-5">
            <h1 className="text-2xl text-center py-5 font-bold text-[#6255A5]">Please Login!</h1>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="form-control mb-4">
                    <label className="label">
                        <span className="label-text text-lg">Email</span>
                    </label>
                    <input type="text" {...register("email", { required: true })} placeholder="email" className="input input-bordered" />
                    {errors.email && <span className="text-red-600">Email is required</span>}
                </div>
                <div className="form-control mb-4">
                    <label className="label">
                        <span className="label-text text-lg">Password</span>
                    </label>
                    <input type="password" {...register("password", { required: true })} placeholder="Password" className="input input-bordered" />
                    {errors.password?.type === 'required' && <p className="text-red-600">Password is Required</p>}
                </div>
                <div className="text-center">
                    <input className="btn btn-md bg-[#84D19F] hover:text-white hover:bg-[#6255A5]" type="submit" value="Log in" />
                </div>
            </form>
            <p className="text-center text-[#6255A5] text-lg mt-4">New In This Site? <Link className="text-[#84D19F] hover:underline" to="/register">Register</Link></p>
        </div>
    );
};

export default Login;