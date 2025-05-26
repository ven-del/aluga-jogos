import { Outlet } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";

const SiteLayout = () => {
    return ( 
        <div className="flex flex-col justify-between min-h-screen bg-(--background-color) text-(--text-color)">
        <Header />
        <Outlet />
        <Footer />
        </div>
     );
}
 
export default SiteLayout;