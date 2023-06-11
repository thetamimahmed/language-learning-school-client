import { FaGoogle } from "react-icons/fa";
import useAuth from "../../Hooks/useAuth";
import { useLocation, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";


const SocialLogin = () => {
    const {googleSignIn} = useAuth()
    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || "/";


    const handleGoogle = () =>{
        googleSignIn()
        .then(result =>{
            const loggedUser = result.user;
            Swal.fire({
                position: 'center',
                icon: 'success',
                title: 'Sign in Successfully',
                showConfirmButton: false,
                timer: 1500
            })
            navigate(from, { replace: true });
        })
        .catch(error=>{
            console.log(error)
        })
    }
    return (
        <div>
        <div className="divider"></div>
        <div className="w-full text-center my-4">
            <button onClick={handleGoogle} className="btn btn-circle btn-outline">
                <FaGoogle></FaGoogle>
            </button>
        </div>
    </div>
    );
};

export default SocialLogin;
