export function buildContext(chunks) {

    return chunks
        .map(chunk =>
            `
FILE: ${chunk.filePath}

CONTENT:
${chunk.content}
`
        )
        .join("\n\n-----------------\n\n");

}