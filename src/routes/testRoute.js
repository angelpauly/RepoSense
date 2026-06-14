import express from "express";
import { ChromaClient } from "chromadb";

const router = express.Router();

router.get("/test-chroma", async (req, res) => {

    const client = new ChromaClient({
        host: "localhost",
        port: 8001,
        ssl: false
    });

    const collections =
        await client.listCollections();

    res.json({
        success: true,
        collections
    });

});

router.get("/test-chroma-write", async (req, res) => {

    const collection = await getCollection();

    await collection.add({
        ids: ["test1"],
        documents: ["Hello ChromaDB"]
    });

    res.json({
        success: true
    });

});

export default router;