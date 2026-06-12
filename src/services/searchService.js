export function cosineSimilarity(vecA, vecB) {

    let dotProduct = 0;
    let magnitudeA = 0;
    let magnitudeB = 0;

    for (let i = 0; i < vecA.length; i++) {

        dotProduct += vecA[i] * vecB[i];

        magnitudeA += vecA[i] * vecA[i];

        magnitudeB += vecB[i] * vecB[i];
    }

    magnitudeA = Math.sqrt(magnitudeA);
    magnitudeB = Math.sqrt(magnitudeB);

    return dotProduct / (
        magnitudeA * magnitudeB
    );
}

export function searchSimilarChunks(
    queryEmbedding,
    vectors,
    topK = 3
) {

    const scoredChunks =
        vectors.map(chunk => ({

            ...chunk,

            score: cosineSimilarity(
                queryEmbedding,
                chunk.embedding
            )

        }));

    scoredChunks.sort(
        (a, b) => b.score - a.score
    );

    return scoredChunks.slice(0, topK);
}