import { useForm } from "react-hook-form";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import useAuth from "../../Hooks/useAuth";
import SocialLogin from "../SocialLogin/SocialLogin";
import { motion } from "framer-motion";


const Login = () => {
    const { logIn } = useAuth()
    const { register, handleSubmit, formState: { errors } } = useForm();
    const navigate = useNavigate()
    const location = useLocation()
    const from = location.state?.from?.pathname || "/";

    const onSubmit = data => {
        console.log(data)
        logIn(data.email, data.password)
            .then(result => {
                const loggedUser = result.user
                console.log(loggedUser)
                Swal.fire({
                    position: 'center',
                    icon: 'success',
                    title: 'Login Successfully',
                    showConfirmButton: false,
                    timer: 1500
                })
                navigate(from, { replace: true });
            })
            .catch(error => {
                console.log(error)
            })
    };
    console.log(errors)
    return (
        <motion.div initial={{ width: 0 }}
            animate={{ width: "100%" }}
            exit={{ width: window.innerWidth }}
            transition={{ duration: 0.2 }}>
            <div  className="bg-base-200 w-1/3 mx-auto pb-10 px-5">
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
                        <input className="btn btn-md bg-[#317047] hover:bg-[#584B9F] text-white" type="submit" value="Log in" />
                    </div>
                </form>
                <SocialLogin></SocialLogin>
                <p className="text-center text-[#6255A5] text-lg mt-4">New In This Site? <Link className="text-[#84D19F] hover:underline" to="/register">Register</Link></p>
            </div>
        </motion.div>
    );
};

export default Login;