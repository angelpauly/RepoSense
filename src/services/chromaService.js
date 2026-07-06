import { ChromaClient } from "chromadb";

const client = new ChromaClient({
    host: "localhost",
    port: 8001,
    ssl: false
});

async function getCollection() {
    return await client.getOrCreateCollection({
        name: "reposense"
    });
}

export async function storeChunks(chunks) {

    const collection = await getCollection();

    await collection.add({
        ids: chunks.map(chunk => chunk.id),
        embeddings: chunks.map(chunk => chunk.embedding),
        documents: chunks.map(chunk => chunk.content),
        metadatas: chunks.map(chunk => ({
            filePath: chunk.filePath,
            chunkIndex: chunk.chunkIndex
        }))
    });

}

export async function searchChunks(queryEmbedding, topK = 5) {

    const collection = await getCollection();

    const results = await collection.query({
        queryEmbeddings: [queryEmbedding],
        nResults: topK
    });

    return results;
}