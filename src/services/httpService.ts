import axios from 'axios';

export const processCommit = (commit: any) => {
  return {
    sha: commit.sha,
    name: commit.commit.author.name,
    message: commit.commit.message,
    date: commit.commit.author.date,
    email: commit.commit.author.email,
  };
};

export const groupByDates = (commits: any) => {
  return commits.reduce((newCommitObject: any, commit: any) => {
    const [dateKey] = commit.date.split('T');
    if (!newCommitObject[dateKey]) {
      newCommitObject[dateKey] = [];
    }
    newCommitObject[dateKey].push(commit);
    return newCommitObject;
  }, {});
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
