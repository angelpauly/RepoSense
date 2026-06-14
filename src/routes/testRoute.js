import express from "express";
import { ChromaClient } from "chromadb";

const router = express.Router();

router.get("/test-chroma", async (req, res) => {

    const client = new ChromaClient({
        host: "localhost",
        port: 8001,
        ssl: false
    });

    const heartbeat = await client.heartbeat();

    res.json({
        success: true,
        heartbeat
    });

});

export default router;