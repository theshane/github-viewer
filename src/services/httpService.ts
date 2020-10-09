import axios, {AxiosResponse} from 'axios';

export const getCommits = () => {
  return axios
    .get('https://api.github.com/repos/theshane/github-viewer/commits')
    .then((response: any) => {
      const processed = response.map((resp: any) => {
        return {
          sha: resp.sha,
          author: resp.commit.author,
          message: resp.commit.message,
        };
      });
      return processed;
    });
};
