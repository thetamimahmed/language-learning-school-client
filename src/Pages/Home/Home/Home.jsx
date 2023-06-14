import Banner from "../Banner/Banner";
import Information from "../Information/Information";
import PopularClasses from "../PopularClasses/PopularClasses";
import PopularInstructors from "../PopularInstructors/PopularInstructors";
import { motion } from "framer-motion";


const Home = () => {
    return (
        <motion.div
        initial={{ width: 0 }}
        animate={{ width: "100%" }}
        exit={{ width: window.innerWidth }}
        transition={{ duration: 0.2 }}
      >
            <Banner></Banner>
            <PopularClasses></PopularClasses>
            <Information></Information>
            <PopularInstructors></PopularInstructors>
        </motion.div>
    );
};

export default Home;