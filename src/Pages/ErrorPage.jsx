import { Link } from "react-router-dom";

const ErrorPage = () => {
    return (
        <div className="flex justify-center flex-col items-center">
            <img  className="w-1/3 mt-20" src="https://i.ibb.co/2Sfz6d8/internet-network-warning-404-error-page-file-found-web-page-internet-error-page-issue-found-network.jpg" alt="" />
            <h1 className="text-[#6255A5] text-5xl uppercase font-bold">404 Not FOund</h1>
            <Link to="/" className="btn mt-4 bg-[#84D19F] text-black hover:bg-[#584B9F]">Back To Homepage</Link>
        </div>
    );
};

export default ErrorPage;