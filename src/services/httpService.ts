import axios from 'axios';
import {ItemProps} from '../ui/Page';

export const processCommit = (commit: any) => {
  return {
    sha: commit.sha,
    name: commit.commit.author.name,
    message: commit.commit.message,
    date: commit.commit.author.date,
    email: commit.commit.author.email,
  };
};

export const getCommits = () => {
  return axios
    .get('https://api.github.com/repos/theshane/github-viewer/commits')
    .then((response: any) => {
      const processed = response.data.map((commit: ItemProps) => {
        return processCommit(commit);
      });
      return processed;
    })
    .catch((resp) => {
      return resp;
    });
};
