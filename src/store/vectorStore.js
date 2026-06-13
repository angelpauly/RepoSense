let repositoryVectors = [];

export function saveVectors(vectors) {
    repositoryVectors = vectors;
}

export function getVectors() {
    return repositoryVectors;
}