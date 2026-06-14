import dotenv from "dotenv";
dotenv.config();
//console.log(process.env.GEMINI_API_KEY);
console.log(
    "APP ENV:",
    process.env.GEMINI_API_KEY
);
import express from "express";
import repoRoutes from "./routes/repoRoutes.js";

const app = express();

app.use(express.json());

app.use("/api", repoRoutes);

app.get("/", (req, res) => {
    res.send("RepoSense Running");
});

app.listen(3000, () => {
    console.log("Server running on port 3000");
});