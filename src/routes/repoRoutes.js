import express from "express";
import { cloneRepository } from "../services/githubService.js";

const router = express.Router();

router.post("/analyze-repo", async (req, res) => {
    try {

        const { repoUrl } = req.body;

        if (!repoUrl) {
            return res.status(400).json({
                error: "Repository URL is required"
            });
        }

        const result = await cloneRepository(repoUrl);

        res.json({
            success: true,
            message: "Repository cloned successfully",
            data: result
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            error: error.message
        });

    }
});

export default router;