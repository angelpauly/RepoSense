export function chunkText(text, chunkSize = 1000) {

    const chunks = [];

    for (
        let i = 0;
        i < text.length;
        i += chunkSize
    ) {

        chunks.push(
            text.slice(i, i + chunkSize)
        );
    }

    return chunks;
}

export function chunkCodeFiles(codeFiles) {

    const allChunks = [];

    for (const file of codeFiles) {

        const chunks = chunkText(file.content);

        chunks.forEach((chunk, index) => {

            allChunks.push({
                filePath: file.path,
                chunkIndex: index,
                content: chunk
            });

        });

    }

    return allChunks;
}