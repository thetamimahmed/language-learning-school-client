import { useState } from "react";
import CountUp from 'react-countup';
import ScrollTrigger from 'react-scroll-trigger';



const Information = () => {
    const [counterOn, setCounterOn] = useState(false)
    return (
        <ScrollTrigger  onEnter={()=>{setCounterOn(true)}} onExit={()=>{setCounterOn(false)}}>
            <div data-aos="zoom-out-down"className="bg-gradient-to-r from-transparent via-[#84d19f79] to-transparent  lg:h-60 my-20">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mx-20 lg:h-60 my-auto">
                    <div className="border-2 border-[#6255A5] rounded flex flex-col justify-center items-center">
                        <img className="w-24" src="https://i.ibb.co/z5N3cT6/icons8-students-100.png" alt="" />
                        <h1 className="text-[#6255A5] font-bold uppercase text-4xl">
                            {counterOn && <CountUp start={0} end={100} duration={2} delay={0.1}></CountUp>}+
                        </h1>
                        <h1 className="text-[#6255A5] font-bold uppercase text-xl">Students</h1>
                    </div>
                    <div className="border-2 border-[#6255A5] rounded flex flex-col justify-center items-center">
                        <img className="w-24" src="https://i.ibb.co/3yv0fss/icons8-training-100.png" alt="" />
                        <h1 className="text-[#6255A5] font-bold uppercase text-4xl">
                            {counterOn && <CountUp start={0} end={20} duration={2} delay={0.1}></CountUp>}+
                        </h1>
                        <h1 className="text-[#6255A5] font-bold uppercase text-xl">Instructors</h1>
                    </div>
                    <div className="border-2 border-[#6255A5] rounded flex flex-col justify-center items-center">
                        <img className="w-24" src="https://i.ibb.co/7YHjP95/icons8-informatics-100.png" alt="" />
                        <h1 className="text-[#6255A5] font-bold uppercase text-4xl">
                            {counterOn && <CountUp start={0} end={15} duration={2} delay={0.1}></CountUp>}+
                        </h1>
                        <h1 className="text-[#6255A5] font-bold uppercase text-xl">Classes</h1>
                    </div>
                    <div className="border-2 border-[#6255A5] rounded flex flex-col justify-center items-center">
                        <img className="w-24" src="https://i.ibb.co/YpPSrch/icons8-country-100.png" alt="" />
                        <h1 className="text-[#6255A5] font-bold uppercase text-4xl">
                            {counterOn && <CountUp start={0} end={8} duration={2} delay={0.1}></CountUp>}+
                        </h1>
                        <h1 className="text-[#6255A5] font-bold uppercase text-xl">Countries</h1>
                    </div>
                </div>
            </div>
        </ScrollTrigger>
    );
};

export default Information;