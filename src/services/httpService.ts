import axios from 'axios';

export const getCommits = (httpService = axios) => {
  return httpService.get(
    'https://api.github.com/repos/theshane/github-viewer/commits',
  );
};
