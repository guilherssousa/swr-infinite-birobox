import { preload } from "swr";
import useSWRInfinite from "swr/infinite";

import type { Repository } from "./types";

import Repo from "./components/Repository";

import fetcher from "./lib/fetcher";
import { COLORS_URL, STARRED_API_URL } from "./lib/constants";

import "./App.css";

preload(COLORS_URL, fetcher);

const getKey = (pageIndex: number, previousPageData: Repository[]) => {
  if (previousPageData && !previousPageData.length) return null;

  STARRED_API_URL.searchParams.set("page", (pageIndex + 1).toString());

  return STARRED_API_URL.toString();
};

function App() {
  const {
    data: reposData,
    isValidating,
    size,
    setSize,
  } = useSWRInfinite<Repository[]>(getKey, fetcher);

  return (
    <main className="App">
      <div className="header">
        <h1>
          Biro<sup>3</sup>box
        </h1>
        <p>
          Veja repositórios úteis curtidos pelo{" "}
          <a href="https://github.com/birobirobiro">Biro no GitHub</a>.{" "}
          <a href="https://github.com/guilherssousa/swr-infinite-birobox">
            Source code
          </a>
        </p>
      </div>

      {isValidating && <div className="loading">Atualizando...</div>}

      <div className="card">
        {reposData?.map((repos) =>
          repos.map((repo) => <Repo repo={repo} key={repo.id} />)
        )}

        <button onClick={() => setSize(size + 1)}>Ver mais</button>
      </div>

      <p className="read-the-docs">
        Desenvolvido por{" "}
        <a href="https://github.com/guilherssousa" target="_blank">
          Guilherme Sousa
        </a>{" "}
        com dados de{" "}
        <a href="https://github.com/birobirobiro">João Inácio Neto</a>
      </p>
    </main>
  );
}

export default App;
