// Uncomment the code below and write your tests
import axios from 'axios';
import { throttledGetDataFromApi } from './index';
jest.mock('lodash', () => ({
  throttle: jest.fn((fn) => fn),
}));
describe('throttledGetDataFromApi', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    axios.create = jest.fn(() => axios as jest.Mocked<typeof axios>);
    axios.get = jest
      .fn()
      .mockImplementationOnce(() => Promise.resolve({ data: '/todos' }));
  });
  beforeAll(() => {
    jest.useFakeTimers();
  });
  afterAll(() => {
    jest.useRealTimers();
  });
  test('should create instance with provided base url', async () => {
    //const axiosMock = jest.spyOn(axios, 'create');
    await throttledGetDataFromApi('https://jsonplaceholder.typicode.com');
    expect(axios.create).toHaveBeenCalledWith({
      baseURL: 'https://jsonplaceholder.typicode.com',
    });
  });
  test('should perform request to correct provided url', async () => {
    //onst axiosMock = jest.spyOn(axios, 'create');
    //axiosGet.mockResolvedValueOnce(() => Promise.resolve({ data: '/todos' }));
    await throttledGetDataFromApi('/todos');
    expect(axios.get).toHaveBeenCalledWith('/todos');
  });
  test('should return response data', async () => {
    const returnedData = await throttledGetDataFromApi('/todos');
    expect(returnedData).toEqual('/todos');
  });
});
