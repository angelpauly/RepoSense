import express from "express";
import { cloneRepository } from "../services/githubService.js";
import {
    readRepositoryFiles,
    extractCodeFiles
} from "../services/fileService.js";
import {
    chunkCodeFiles
} from "../services/chunkService.js";
import {
    generateEmbedding
} from "../services/embeddingService.js";
import {
    createChunkVectors
} from "../services/vectorService.js";

const router = express.Router();

router.post("/analyze-repo", async (req, res) => {

    try {

        const { repoUrl } = req.body;

        if (!repoUrl) {
            return res.status(400).json({
                error: "Repository URL is required"
            });
        }

        const result =
            await cloneRepository(repoUrl);

        const files =
            await readRepositoryFiles(
                result.localPath
            );

        const codeFiles =
            await extractCodeFiles(files);

        const chunks =
            chunkCodeFiles(codeFiles);

        // Process only first 10 chunks for now
        const sampleChunks =
            chunks.slice(0, 10);

        const vectors =
            await createChunkVectors(
                sampleChunks
            );

        res.json({
            success: true,
            repository: result,
            totalFiles: files.length,
            codeFilesFound: codeFiles.length,
            totalChunks: chunks.length,
            vectorsCreated: vectors.length,
            firstVectorLength:
                vectors[0].embedding.length
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            error: error.message
        });

    }

});

router.get("/test-embedding", async (req, res) => {

    try {

        const vector =
            await generateEmbedding(
                "user authentication login"
            );

        res.json({
            vectorLength: vector.length,
            sample: vector.slice(0, 10)
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            error: error.message
        });

    }

});

export default router;