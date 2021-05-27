// import Repository from './GitHubAPI/Repository';
// import SearchResults from './GitHubAPI/SearchResults';

const GIT_API_BASE_URL = 'https://api.github.com';

class GitHubAPI {
  public searchRepositories(query: string) : Promise<any> {
    if (query.length === 0) {
      return Promise.resolve();
    }

    const path = `/search/repositories?per_page=100&q=${encodeURIComponent(query)}`;
    return this.fetchPath(path);
  }

  private fetchPath = (path: string) : Promise<any> => {
    return fetch(GIT_API_BASE_URL + path)
      .then(this.checkStatus)
      .then(this.parseJson)
  }

  private checkStatus = (response: any) : Promise<any> => {
    if (response.status < 200 || response.status >= 300) {
      throw(new Error(response.statusText));
    }
    return response;
  }

  private parseJson = (response: any) : Promise<any> => (response.json())
}

export default GitHubAPI;
