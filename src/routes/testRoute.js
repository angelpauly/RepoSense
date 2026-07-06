import express from "express";
import { getCollection } from "../services/chromaService.js";
import { generateEmbedding } from "../services/embeddingService.js";

const router = express.Router();

router.get("/test-chroma", async (req, res) => {
    const collection = await getCollection();

    res.json({
        success: true,
        collection: collection.name
    });
});

router.get("/test-chroma-write", async (req, res) => {

    const collection = await getCollection();

    const embedding = await generateEmbedding("Hello ChromaDB");

    await collection.add({
        ids: ["test1"],
        documents: ["Hello ChromaDB"],
        embeddings: [embedding]
    });

    res.json({
        success: true,
        message: "Data inserted into ChromaDB"
    });

});

export default router;