import useSWR from "swr";

import type { Repository } from "../types";

import fetcher from "../lib/fetcher";
import { COLORS_URL } from "../lib/constants";

export default function Repository({ repo }: { repo: Repository }) {
  const { data: colors } = useSWR(COLORS_URL, fetcher);

  const color = colors?.[repo.language];

  // wasUpdatedRcently is true if the repo was updated in the last 7 days
  const wasUpdatedRecently =
    new Date(repo.updated_at) > new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);

  return (
    <a href={repo.html_url} target="_blank">
      <div className="repo">
        <div className="repo__container">
          <div className="repo__title">
            <div className="repo__icon">📦</div>
            <h2 className="repo__name">{repo.full_name}</h2>
          </div>

          <p className="repo__description">{repo.description}</p>

          <div className="repo__description__container">

            <div className="repo__info">
              <div>⭐ {repo.stargazers_count}</div>

              <div>
                {color && (
                  <div
                    className="repo__language-circle"
                    style={{
                      backgroundColor: color.color,
                    }}
                  ></div>
                )}{" "}
                {repo.language}
              </div>
            </div>

            {wasUpdatedRecently && <div>🆕 foi atualizado recentemente</div>}
          </div>
        </div>
      </div>
    </a>
  );
}
