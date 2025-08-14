import { createBrowserRouter } from "react-router";
import MainLayouts from "../Layouts/MainLayouts";
import Home from "../Home/Home";
import LostFoundItemsPage from "../Pages/LostFoundItemsPage/LostFoundItemsPage";
import Login from "../Pages/Login";
import Register from "../Pages/Register";
import ManageMyItems from "../Pages/ManageMyItems/ManageMyItems";
import AllRecoverdItems from "../Pages/AllRecoverdItems/AllRecoverdItems";
import AddLostFoundItem from "../Pages/AddLostFoundItem/AddLostFoundItem";
import PrivateRouts from "./PrivateRouts";
import LatestData from "../Components/LatestItems/LatestData";
import ViewDetails from "../Pages/View/ViewDetails";
import UpdatePage from "../Pages/Update/UpdatePage";
import TeamSlider from "../Pages/Team/TeamSlider";
import ErrorPage from "../Pages/ErrorPage";
import StatsSection from "../Pages/StatsSection";
import SafetyTips from "../Pages/SafetyTips";


const router = createBrowserRouter(
    [
        {
            path: "/",
            element: <MainLayouts></MainLayouts>,
            children: [
                {
                    index: true,
                    loader: () => fetch("https://lost-found-project.vercel.app/items"),
                    element: <Home></Home>
                },
                {
                    path: "/letestData",
                    element: <LatestData></LatestData>
                },
                {
                    path: "/lost-found-items",
                    loader: () => fetch("https://lost-found-project.vercel.app/items"),
                    element:<LostFoundItemsPage></LostFoundItemsPage>
                },
                {
                    path: "/login",
                    element:<Login></Login>
                },
                {
                    path: "/register",
                    element:<Register></Register>
                },
                {
                    path: "/stats-section",
                    element: <StatsSection></StatsSection>
                },
                {
                    path: "/safety-tips",
                    element:<SafetyTips></SafetyTips>
                },
                {
                    path: "/manage-items",
                    element: <PrivateRouts><ManageMyItems></ManageMyItems></PrivateRouts>
                },
                {
                    path: "/recovered",
                    element: <PrivateRouts><AllRecoverdItems></AllRecoverdItems></PrivateRouts>
                },
                {
                    path: "/add-item",
                    element: <PrivateRouts><AddLostFoundItem></AddLostFoundItem></PrivateRouts>
                },
                {
                    path: "/viewDetails/:id",
                    loader: ({ params }) => fetch(`https://lost-found-project.vercel.app/items/${params.id}`),
                    element:<PrivateRouts><ViewDetails></ViewDetails></PrivateRouts>
                },
                {
                    path: "/update/:id",
                    loader: ({ params }) => fetch(`https://lost-found-project.vercel.app/items/${params.id}`),
                    element: <PrivateRouts><UpdatePage></UpdatePage></PrivateRouts>
                },
                {
                    path: "/teamSlider",
                    element: <TeamSlider></TeamSlider>
                },
                {
                    path: "*",
                    element: <ErrorPage></ErrorPage>
                }
            ]
        }
    ]
)
export default router;