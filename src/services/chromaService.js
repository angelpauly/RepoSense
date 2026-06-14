import { ChromaClient } from "chromadb";

const client = new ChromaClient({
    path: "http://localhost:8001"
});

export async function getCollection() {
    return await client.getOrCreateCollection({
        name: "reposense"
    });
}