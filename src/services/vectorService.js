import { generateEmbedding }
from "./embeddingService.js";

export async function createChunkVectors(
    chunks
) {

    const vectors = [];

    for (const chunk of chunks) {

        const embedding =
            await generateEmbedding(
                chunk.content
            );

        vectors.push({
            ...chunk,
            embedding
        });

        console.log(
            `Processed chunk ${chunk.chunkIndex}`
        );
    }

    return vectors;
}