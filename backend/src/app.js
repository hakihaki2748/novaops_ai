import express from "express";
import cors from "cors";
const app = express();

import authRoutes from "./routes/auth.route.js";
import userRoute from "./routes/user.route.js";
import activityRoute from "./routes/activity.route.js";

app.use(cors());
app.use(express.json());

app.get('/',(req, res) => res.send("Selamat Datang Di NovaOps-AI"));
app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/users', userRoute);
app.use("/api/v1/users", activityRoute);


export default app;