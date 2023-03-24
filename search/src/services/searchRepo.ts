// Octokit.js
// https://github.com/octokit/core.js#readme

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
