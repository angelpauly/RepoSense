import { generateEmbedding }
from "./embeddingService.js";

export async function createChunkVectors(chunks) {

    const vectors = [];

    for (const chunk of chunks) {

        const embedding =
            await generateEmbedding(
                chunk.content
            );

        vectors.push({
            id: `${chunk.filePath}-${chunk.chunkIndex}`,
            filePath: chunk.filePath,
            chunkIndex: chunk.chunkIndex,
            content: chunk.content,
            embedding
        });

        console.log(
            `Processed chunk ${chunk.chunkIndex}`
        );
    }

    return vectors;
}