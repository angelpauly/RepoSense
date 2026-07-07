import simpleGit from "simple-git";
import path from "path";
import fs from "fs";

const git = simpleGit();

export async function cloneRepository(repoUrl) {
    try {

        const repoName = repoUrl
            .split("/")
            .pop()
            .replace(".git", "");

        const localPath = path.join(
            process.cwd(),
            "data",
            "repositories",
            repoName
        );

        // Repository already exists
        if (fs.existsSync(localPath)) {

            console.log(
                `Repository ${repoName} already exists. Pulling latest changes...`
            );

            const repoGit = simpleGit(localPath);

            try {

                await repoGit.pull();

            } catch (pullError) {

                console.log(
                    "Pull failed. Using existing repository..."
                );

            }

        } else {

            console.log(
                `Cloning repository ${repoName}...`
            );

            await git.clone(
                repoUrl,
                localPath
            );

        }

        return {
            repoName,
            localPath
        };

    } catch (error) {

        console.error(
            "Clone Error:",
            error
        );

        throw error;

    }
}