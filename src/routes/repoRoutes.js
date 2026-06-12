import express from "express";
import { cloneRepository } from "../services/githubService.js";
import {
  readRepositoryFiles,
  extractCodeFiles
} from "../services/fileService.js";
import {
    chunkCodeFiles
} from "../services/chunkService.js";

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
        const codeFiles = await extractCodeFiles(files);
        const chunks = chunkCodeFiles(codeFiles);

       res.json({
            success: true,
            repository: result,
            totalFiles: files.length,
            codeFilesFound: codeFiles.length,
            totalChunks: chunks.length,
            sampleChunk: chunks[0]
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            error: error.message
        });

    }
});

export default router;