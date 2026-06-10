import express from "express";
import { cloneRepository } from "../services/githubService.js";
import { readRepositoryFiles } from "../services/fileService.js";

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
        const files = await readRepositoryFiles(result.localPath);

        res.json({
            success: true,
            repository: result,
            files
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            error: error.message
        });

    }
});

export default router;