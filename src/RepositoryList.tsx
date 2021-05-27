import * as React from "react";
import './RepositoryList.css';

interface IRepositoryListProps {
  repositories: any[] | null;
  totalCount: number
}

class RepositoryList extends React.Component<IRepositoryListProps, {}> {
  public render () {
    const { repositories, totalCount = 0 } = this.props;

    if (repositories == null) {
      return null;
    }

    return(
      <article>
        <header className="RepositoryList__header section has-text-centered">
          Showing { repositories.length } { repositories.length === 1 ? 'result' : 'results' } out of { totalCount.toLocaleString() }
        </header>
        <section>
          {
            repositories.map(repo => (
              <article
                key={ repo.id }
                className="has-background-light box is-12 has-icons-left RepositoryList__entry">

                <div className="has-icons-left">
                  <span className="icon is-left">
                    <i className="fas fa-code-branch" />
                  </span>
                  <span className="RepositoryList__entry__name is-size-5">
                    <a href={ repo.html_url } target="_blank">{ repo.name }</a>
                  </span>
                  <p className="is-italic">
                    { repo.description }
                  </p>
                </div>
              </article>
            ))
          }
        </section>
      </article>
    )
  }
}

export default RepositoryList;
