import React, { memo, FC, useState, useCallback, useRef } from "react";
import { getRepo } from "../services/searchRepo";
import Pagination from "../components/Pagination";
// import styles from "./index.module.less";
import styles from "./index.module.css";

interface Repository {
  id: number;
  name: string;
  description: string;
  html_url: string;
}

const SearchPage: FC = memo(() => {
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [searchResults, setSearchResults] = useState<Repository[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [resultsPerPage] = useState(10);

  //   const handleSearch = async () => {
  //     const DEBOUNCE_TIME = 300; // in milliseconds
  //     clearTimeout(timeoutId); // clear previous timeout

  //     timeoutId = setTimeout(async () => {
  //       const searchResult = await getRepo(searchQuery);
  //       setSearchResults(searchResult);
  //     }, DEBOUNCE_TIME);
  //   };

  const lastSearchTimeRef = useRef(0);
  const THROTTLE_TIME = 5000; // limit the function to be called at most once every 1000 milliseconds

  const handleSearch = useCallback(async () => {
    const currentTime = Date.now();

    if (currentTime - lastSearchTimeRef.current >= THROTTLE_TIME) {
      const searchResult = await getRepo(searchQuery);
      setSearchResults(searchResult);
      setCurrentPage(1); // Reset page number to 1 when search query changes
      lastSearchTimeRef.current = currentTime;
    }
  }, [searchQuery]);

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  const indexOfLastResult: number = currentPage * resultsPerPage;
  const indexOfFirstResult: number = indexOfLastResult - resultsPerPage;
  const currentResults: Repository[] = searchResults.slice(
    indexOfFirstResult,
    indexOfLastResult
  );

  const pageNumbers: number[] = [];
  for (
    let i: number = 1;
    i <= Math.ceil(searchResults.length / resultsPerPage);
    i++
  ) {
    pageNumbers.push(i);
  }

  return (
    <div className={styles.container}>
      <input
        className={styles.searchInput}
        type="text"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
      <button onClick={handleSearch} className={styles.searchButton}>
        Search
      </button>

      <table className={styles.table}>
        <thead>
          <tr>
            <th>Index</th>
            <th>Name</th>
            <th>Description</th>
            <th>Link</th>
          </tr>
        </thead>
        <tbody>
          {currentResults.map((repo, index) => (
            <tr key={repo.id}>
              <td>{index + 1}</td>
              <td>{repo.name}</td>
              <td>{repo.description}</td>
              <td>
                <a href={repo.html_url}>View on GitHub</a>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <Pagination
        totalPages={Math.ceil(searchResults.length / resultsPerPage)}
        currentPage={currentPage}
        onPageChange={handlePageChange}
      />
    </div>
  );
});

export default SearchPage;
