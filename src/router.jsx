
import { createBrowserRouter } from "react-router-dom"
import { Default } from "./layouts/Default"
import Home  from "./pages/Home"
import Notfound from "./pages/Notfound"

const router = createBrowserRouter([
    {
        path: "/",
        element: <Default />,
        children: [
            {
                path: "/",
                element: <Home />
            },
            {
                path: "/home",
                element: <Home />
            },
            {
                path: "/Ai-Inspin",
                element: <Home />
            },
        ]
    },
    {
        path: "/*",
        element: <Notfound />
    },

])

export default router