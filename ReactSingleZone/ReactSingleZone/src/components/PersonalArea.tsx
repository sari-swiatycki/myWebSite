import { Outlet } from "react-router-dom";
import HeaderPersonalArea from "./HeaderPersonalArea";
import Footer from "./Footer";

const PersonalArea = () => {



    return <>
    <div>
           <HeaderPersonalArea />
               
                <Outlet/>

                <Footer/>
            </div>
    </>
  };
  
  export default PersonalArea;