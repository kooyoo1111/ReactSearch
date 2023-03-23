import React, { memo, FC, useEffect, useState } from "react";
import { getRepo } from "../services/searchRepo";

interface Repository {
  id: number;
  name: string;
  description: string;
  html_url: string;
}

const SearchPage: FC = () => {
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [searchResults, setSearchResults] = useState<Repository[]>([]);

  const handleSearch = async () => {
    const searchResult = await getRepo(searchQuery);
    setSearchResults(searchResult);
  };

  return (
    <div>
      <input
        type="text"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
      <button onClick={handleSearch}>Search</button>

      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Description</th>
            <th>Link</th>
          </tr>
        </thead>
        <tbody>
          {searchResults.map((repo) => (
            <tr key={repo.id}>
              <td>{repo.name}</td>
              <td>{repo.description}</td>
              <td>
                <a href={repo.html_url}>View on GitHub</a>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default SearchPage;
