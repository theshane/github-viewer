import {testCommits} from './fixtures/testData';
import {
  getCommits,
  groupByDates,
  processCommit,
} from '../src/services/httpService';
import moxios from 'moxios';

describe('httpService', () => {
  beforeEach(() => {
    moxios.install();
  });

  afterEach(() => {
    moxios.uninstall();
  });

  it('fetches the correct url', async () => {
    moxios.stubRequest(
      'https://api.github.com/repos/theshane/github-viewer/commits',
      {
        status: 200,
        response: testCommits,
      },
    );

    const response = await getCommits();
    expect(response).toBeDefined();
  });

  it('formats the data correctly', async () => {
    const expectedData = [
      {
        sha: '0238d542faa7dcf91af9d31e8ce8c0a90b80a4c5',
        author: {
          name: 'Shane Burgess',
          email: 'shane.burgess@gmail.com',
          date: '2020-02-11T23:37:20Z',
        },
        message: 'Adds more to readme',
      },
    ];
    moxios.stubRequest(
      'https://api.github.com/repos/theshane/github-viewer/commits',
      {
        status: 200,
        response: testCommits,
      },
    );
    const response = await getCommits();
    expect(response[0].sha).toBe(expectedData[0].sha);
    expect(response[0].name).toBe(expectedData[0].author.name);
    expect(response[0].email).toBe(expectedData[0].author.email);
    expect(response[0].date).toBe(expectedData[0].author.date);
    expect(response[0].message).toBe(expectedData[0].message);
  });
});

describe('processCommit', () => {
  it('should process the commit correctly', () => {
    const processedCommits = testCommits.map((commit) => processCommit(commit));
    expect(processedCommits[0].sha).toBe(testCommits[0].sha);
    expect(processedCommits[0].name).toBe(testCommits[0].commit.author.name);
    expect(processedCommits[0].email).toBe(testCommits[0].commit.author.email);
    expect(processedCommits[0].date).toBe(testCommits[0].commit.author.date);
    expect(processedCommits[0].message).toBe(testCommits[0].commit.message);
  });
});

describe('groupByDates', () => {
  it('should group the commits by date', () => {
    const processedCommits = testCommits.map((commit) => processCommit(commit));
    const groupedByDate: any = groupByDates(processedCommits);
    expect(groupedByDate['2020-02-11'][0].sha).toEqual(processedCommits[0].sha);
    expect(groupedByDate['2020-02-11'][0].name).toEqual(
      processedCommits[0].name,
    );
    expect(groupedByDate['2020-02-11'][0].message).toEqual(
      processedCommits[0].message,
    );
    expect(groupedByDate['2020-02-11'][0].date).toEqual(
      processedCommits[0].date,
    );
  });
});
