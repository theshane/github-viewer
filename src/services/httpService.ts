import axios from 'axios';

export const getCommits = () => {
  return axios.get(
    'https://api.github.com/repos/theshane/github-viewer/commits',
  );
};
