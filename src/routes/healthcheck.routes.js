import { Router } from "express";
import { healthCheck } from "../controllers/healthcheck.controllers.js";



const router=Router ();     // create a new router instance

router.route("/").get(healthCheck);     // define GET /healthcheck route

export default router;      // export the router to be used in app.js