import fs from "fs/promises";
import path from "path";
export async function readRepositoryFiles(repoPath) {
    const items = await fs.readdir(repoPath);

    return items;

}