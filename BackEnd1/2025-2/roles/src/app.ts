import express from "express";
import authRoutes from "./routes/auth";
import userRoutes from "./routes/users";

const app = express();
app.use(express.json());

app.use("/auth", authRoutes);
app.use("/users", userRoutes);

app.get("/", (req, res) => {
    res.send("API User Roles - Express + TS")
});

export default app;