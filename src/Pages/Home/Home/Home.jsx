import Banner from "../Banner/Banner";
import Information from "../Information/Information";
import PopularClasses from "../PopularClasses/PopularClasses";
import PopularInstructors from "../PopularInstructors/PopularInstructors";

const Home = () => {
    return (
        <div>
            <Banner></Banner>
            <PopularClasses></PopularClasses>
            <Information></Information>
            <PopularInstructors></PopularInstructors>
        </div>
    );
};

export default Home;