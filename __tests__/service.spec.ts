import {testCommits} from './fixtures/testData';
import {getCommits} from '../src/services/httpService';
import axios from 'axios';

const mockGet = jest
  .fn()
  .mockImplementation(() => Promise.resolve(testCommits));

jest.mock('axios');

const mockedAxios = axios as jest.Mocked<typeof axios>;

mockedAxios.get.mockResolvedValue(testCommits);

describe('httpService', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });
  it('fetches the correct url', async () => {
    await getCommits();
    expect(mockedAxios.get).toHaveBeenCalledWith(
      'https://api.github.com/repos/theshane/github-viewer/commits',
    );
  });
});
