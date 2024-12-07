import express from "express";
import imageRouter from "./image.routes";
import aiRouter from "./ai.routes";

interface Routes {
    path: string;
    route: express.Router,
}

const router = express.Router();

const routeList: Array<Routes> = [
    {
        path: "/image",
        route: imageRouter,
    },
    {
        path: '/ai',
        route: aiRouter,
    }
];

routeList.forEach((route) => {
    router.use(route.path, route.route);
});

export default router;
