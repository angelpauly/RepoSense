import fs from "fs/promises";
import path from "path";

const ALLOWED_EXTENSIONS = [
  ".js",
  ".jsx",
  ".ts",
  ".tsx",
  ".py",
  ".java",
  ".cpp",
  ".c",
  ".md",
  ".json"
];

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

function isUsefulFile(filePath) {

  const extension = path.extname(filePath);

  return ALLOWED_EXTENSIONS.includes(extension);

}

export async function extractCodeFiles(filePaths) {

    const codeFiles = [];

    for (const filePath of filePaths) {

        if (!isUsefulFile(filePath)) {
            continue;
        }

        try {

            const content =
                await fs.readFile(filePath, "utf-8");

            codeFiles.push({
                path: filePath,
                content
            });

        } catch (error) {

            console.log(
                `Failed reading ${filePath}`
            );

        }
    }

    return codeFiles;
}