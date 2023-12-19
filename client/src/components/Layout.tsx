import { Outlet } from "react-router-dom";
import CustomHeader from "./CustomHeader";

export default function Layout(): JSX.Element {
    return (
        <div className="p-4 flex flex-col min-h-screen">
            <CustomHeader />
            <Outlet />
        </div>
    )
}