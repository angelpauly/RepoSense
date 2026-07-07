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
    storeChunks,
    searchChunks
} from "../services/chromaService.js";

import {
    generateAnswer
} from "../services/llmService.js";

const router = express.Router();


// ============================
// ANALYZE REPOSITORY
// ============================

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

        // Development mode
        // Later remove slice()

        const sampleChunks =
            chunks.slice(0, 50);

        const vectors =
            await createChunkVectors(
                sampleChunks
            );

        await storeChunks(vectors);

        res.json({

            success: true,

            repository: result,

            totalFiles:
                files.length,

            codeFilesFound:
                codeFiles.length,

            totalChunks:
                chunks.length,

            vectorsStored:
                vectors.length,

            firstVectorLength:
                vectors[0]?.embedding?.length

        });

    } catch (error) {

        res.status(500).json({

            success: false,

            error: error.message

        });

    }

});


// ============================
// TEST EMBEDDING
// ============================

router.get("/test-embedding", async (req, res) => {

    try {

        const vector =
            await generateEmbedding(
                "user authentication login"
            );

        res.json({

            vectorLength:
                vector.length,

            sample:
                vector.slice(0, 10)

        });

    } catch (error) {

        res.status(500).json({

            success: false,

            error: error.message

        });

    }

});


// ============================
// SEARCH
// ============================

router.post("/search", async (req, res) => {

    try {

        const { query } = req.body;

        if (!query) {

            return res.status(400).json({
                error: "Query is required"
            });

        }

        const queryEmbedding =
            await generateEmbedding(
                query
            );

        const results =
            await searchChunks(
                queryEmbedding,
                5
            );

        const formattedResults =
            results.documents[0].map(
                (doc, index) => ({

                    content:
                        doc.substring(0, 500),

                    filePath:
                        results.metadatas[0][index]
                            .filePath,

                    chunkIndex:
                        results.metadatas[0][index]
                            .chunkIndex,

                    score:
                        results.distances
                            ? results.distances[0][index]
                            : null

                })
            );

        res.json({

            query,

            results:
                formattedResults

        });

    } catch (error) {

        res.status(500).json({

            success: false,

            error: error.message

        });

    }

});


// ============================
// ASK REPOSITORY
// ============================

router.post("/ask-repo", async (req, res) => {

    try {

        const { question } = req.body;

        if (!question) {

            return res.status(400).json({
                error: "Question is required"
            });

        }

        const queryEmbedding =
            await generateEmbedding(
                question
            );

        const relevantChunks =
            await searchChunks(
                queryEmbedding,
                5
            );

        const context =
            relevantChunks.documents[0]
                .join("\n\n");

        const prompt = `
You are a senior software engineer.

Answer ONLY from the repository context.

If the repository context does not contain enough information,
say "The repository does not contain enough information to answer this."

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

            answer,

            retrievedChunks:
                relevantChunks.metadatas[0]

        });

    } catch (error) {

        res.status(500).json({

            success: false,

            error: error.message

        });

    }

});


// ============================
// TEST GEMINI
// ============================

router.get("/test-gemini", async (req, res) => {

    try {

        const answer =
            await generateAnswer(
                "What is Express.js?"
            );

        res.json({

            success: true,

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