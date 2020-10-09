import {testCommits} from './fixtures/testData';
import {getCommits} from '../src/services/httpService';
import axios from 'axios';
import moxios from 'moxios';

jest.mock('axios');

const mockedAxios = axios as jest.Mocked<typeof axios>;

mockedAxios.get.mockResolvedValue(testCommits);

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
    expect(response[0].author.name).toBe(expectedData[0].author.name);
    expect(response[0].author.email).toBe(expectedData[0].author.email);
    expect(response[0].author.date).toBe(expectedData[0].author.date);
    expect(response[0].message).toBe(expectedData[0].message);
  });
});
