import {testCommits} from './testData';
import {getCommits} from '../src/services/httpService';

const mockGet = jest
  .fn()
  .mockImplementation(() => Promise.resolve(testCommits));

const mockHttpService = {
  get: mockGet,
};

describe('httpService', () => {
  beforeEach(() => {
    mockGet.mockReset();
  });
  it('fetches the correct url', async () => {
    await getCommits(mockHttpService);
    expect(mockGet).toHaveBeenCalledWith(
      'https://api.github.com/repos/theshane/github-viewer/commits',
    );
  });
});
