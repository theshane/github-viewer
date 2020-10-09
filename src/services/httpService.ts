import axios from 'axios';

export const processCommit = (commit: any) => {
  return {
    sha: commit.sha,
    name: commit.commit.author.name,
    message: commit.commit.message,
  };
};

export const getCommits = () => {
  return axios
    .get('https://api.github.com/repos/theshane/github-viewer/commits')
    .then((response: any) => {
      const processed = response.data.map((commit: any) => {
        return processCommit(commit);
      });
      return processed;
    })
    .catch((resp) => {
      return resp;
    });
};
