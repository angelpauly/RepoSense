import { pipeline } from "@xenova/transformers";

let embeddingModel = null;

export async function loadEmbeddingModel() {

    if (!embeddingModel) {

        embeddingModel = await pipeline(
            "feature-extraction",
            "Xenova/all-MiniLM-L6-v2"
        );

        console.log(
            "Embedding model loaded"
        );
    }

    return embeddingModel;
}

export async function generateEmbedding(text) {

    const model =
        await loadEmbeddingModel();

    const output =
        await model(text, {
            pooling: "mean",
            normalize: true
        });

    return Array.from(
        output.data
    );
}