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
import {
    saveVectors,
    getVectors
} from "../store/vectorStore.js";

import {
    searchSimilarChunks
} from "../services/searchService.js";
import { generateAnswer } from "../services/llmService.js";

import { buildContext } from "../services/ragService.js";

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
        saveVectors(vectors);

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
router.post("/search", async (req, res) => {

    try {

        const { query } = req.body;

        if (!query) {

            return res.status(400).json({
                error: "Query is required"
            });

        }

        const vectors =
            getVectors();

        if (vectors.length === 0) {

            return res.status(400).json({
                error:
                "No repository analyzed yet"
            });

        }

        const queryEmbedding =
            await generateEmbedding(query);

        const results =
            searchSimilarChunks(
                queryEmbedding,
                vectors,
                3
            );

        const formattedResults = results.map(result => ({
    filePath: result.filePath,
    chunkIndex: result.chunkIndex,
    score: result.score,
     content: result.content.substring(0, 500)
}));

res.json({
    query,
    results: formattedResults
});

    } catch (error) {

        res.status(500).json({
            success: false,
            error: error.message
        });

    }

});
router.post("/ask-repo", async (req, res) => {

    try {

        const { question } = req.body;

        if (!question) {

            return res.status(400).json({
                error: "Question is required"
            });

        }

        const vectors =
            getVectors();

        if (vectors.length === 0) {

            return res.status(400).json({
                error:
                "Analyze a repository first"
            });

        }

        const queryEmbedding =
            await generateEmbedding(
                question
            );

        const relevantChunks =
            searchSimilarChunks(
                queryEmbedding,
                vectors,
                5
            );

        const context =
            buildContext(
                relevantChunks
            );

        const prompt = `
You are a senior software engineer.

Answer the question using ONLY
the provided repository context.

Repository Context:

${context}

Question:

${question}

Answer:
`;

        const answer =
            await generateAnswer(
                prompt
            );

        res.json({
            question,
            answer
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            error: error.message
        });

    }

});

export default router;