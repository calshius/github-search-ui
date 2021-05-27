import * as React from 'react';
import GitHubAPI from './GitHubAPI';
import './GitHubSearch.css';
import RepositoryList from './RepositoryList';
import SearchInput from './SearchInput';

interface IGitHubSearchState {
  error: string | null;
  isLoading: boolean;
  results: any | null;
}

class GitHubSearch extends React.Component<{}, IGitHubSearchState> {
  private gitHubAPI: GitHubAPI;

  constructor(props: {}) {
    super(props);

    this.gitHubAPI = new GitHubAPI();

    this.state = {
      error: null,
      isLoading: false,
      results: []
    };
  }

  public render() {
    const { results, error, isLoading } = this.state;

    return (
      <main className="GitHubSearch has-background-white">
        <header className="GitHubSearch__header hero is-bold">
          <div className="hero-body">
            <h1 className="title has-text-centered">
              GitHub Search Demo
            </h1>
          </div>
        </header>
        <section className="GitHubSearch__form section columns">
          <div className="column is-half container">
              <SearchInput
                isLoading={ isLoading }
                placeholder="Search repositories on GitHub"
                onSubmit={ this.submitSearch }
              />
          </div>
        </section>
        <section className="GitHubSearch__results columns">
          <div className="column is-8 is-offset-2">
              {
                error && (
                  <div className="notification is-danger has-text-centered has-text-weight-bold">
                    Error: '{ error }'
                  </div>
                )
              }
              {
                isLoading ?
                  (
                    <div className="has-text-centered">
                      <div className="GitHubSearch__spinner" />
                    </div>
                  ) :
                  (
                    <RepositoryList
                      repositories={ results && results.items }
                      totalCount={ results && results.total_count }
                    />
                  )
              }
          </div>
        </section>
        <footer className="GitHubSearch__footer footer has-text-centered is-paddingless is-code">
          Author: Aike van Deursen<br />
          Built with:
          <span>
            <a href="https://reactjs.org/">React</a>
          </span>
           |
          <a href="https://www.typescriptlang.org/">TypeScript</a>
           |
          <a href="https://bulma.io/">Bulma CSS</a>
           |
          <a href="https://fontawesome.com/">Font Awesome</a>
        </footer>
      </main>
    );
  }

  private submitSearch = (query: string) => {
    this.setState({ isLoading: true });
    this.gitHubAPI
      .searchRepositories(query)
      .then(this.processSearchResults)
      .catch(this.handleError);
  }

  private processSearchResults = (searchResults: any) => {
    this.setState({
      error: null,
      isLoading: false,
      results: searchResults
    });
  }

  private handleError = (error : Error) => {
    this.setState({
      error: error.message,
      isLoading: false
    });
  }
}

export default GitHubSearch;
