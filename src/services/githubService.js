import simpleGit from "simple-git";
import path from "path";

const git = simpleGit();

export async function cloneRepository(repoUrl) {
    try {
        const repoName = repoUrl.split("/").pop().replace(".git", "");

        const localPath = path.join(
            process.cwd(),
            "data",
            "repositories",
            repoName
        );

        await git.clone(repoUrl, localPath);

        return {
            repoName,
            localPath
        };
    } catch (error) {
        console.error("Clone Error:", error);
        throw error;
    }
}