import fs from "fs/promises";
import path from "path";

export async function readRepositoryFiles(dirPath) {

    let allFiles = [];

    const items = await fs.readdir(dirPath, {
        withFileTypes: true
    });

    for (const item of items) {

        const fullPath = path.join(
            dirPath,
            item.name
        );

        if (item.isDirectory()) {

            const nestedFiles =
                await readRepositoryFiles(fullPath);

            allFiles.push(...nestedFiles);

        } else {

            allFiles.push(fullPath);

        }
    }

    return allFiles;
}