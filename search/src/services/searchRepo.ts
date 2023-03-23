// Octokit.js
// https://github.com/octokit/core.js#readme

// import { Octokit } from "@octokit/core";

// const octokit = new Octokit({});

// export const getRepo = async () => {
//   const result = await octokit.request("GET /search/repositories", {
//     headers: {
//       "X-GitHub-Api-Version": "2022-11-28",
//     },
//   });
//   return result;
// };

export const getRepo = async (query: string): Promise<any> => {
  try {
    const response = await fetch(
      `https://api.github.com/search/repositories?q=${query}`
    );
    const data = await response.json();
    return data.items;
  } catch (error) {
    console.error(error);
  }
};
