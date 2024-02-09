// Uncomment the code below and write your tests
import {
  readFileAsynchronously,
  doStuffByTimeout,
  doStuffByInterval,
} from './index';
import path from 'path';
import fs from 'fs';

describe('doStuffByTimeout', () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  test('should set timeout with provided callback and timeout', () => {
    const callbackMock = jest.fn();
    const timeout = 100;
    const timeoutMock = jest.spyOn(global, 'setTimeout');
    doStuffByTimeout(callbackMock, timeout);
    //expect(setTimeout).toHaveBeenCalledWith(expect.any(Function), timeout);
    expect(timeoutMock).toHaveBeenCalledTimes(1);
  });

  test('should call callback only after timeout', () => {
    const callbackMock = jest.fn();
    const timeout = 100;
    doStuffByTimeout(callbackMock, timeout);
    expect(callbackMock).not.toBeCalled();
    jest.advanceTimersByTime(timeout);
    expect(callbackMock).toBeCalled();
  });
});

describe('doStuffByInterval', () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  test('should set interval with provided callback and timeout', () => {
    const callbackMock = jest.fn();
    const interval = 100;
    const timeInterval = 100;
    doStuffByInterval(callbackMock, interval);
    jest.advanceTimersByTime(timeInterval);
    expect(callbackMock).toHaveBeenCalledTimes(1);
  });

  test('should call callback multiple times after multiple intervals', () => {
    const callbackMock = jest.fn();
    const timeInterval = 100;
    doStuffByInterval(callbackMock, timeInterval);
    expect(callbackMock).not.toBeCalled();
    jest.advanceTimersByTime(timeInterval);
    expect(callbackMock).toBeCalledTimes(1);
    jest.advanceTimersByTime(timeInterval);
    expect(callbackMock).toBeCalledTimes(2);
    jest.advanceTimersByTime(timeInterval);
    expect(callbackMock).toBeCalledTimes(3);
    jest.advanceTimersByTime(timeInterval);
    expect(callbackMock).toBeCalledTimes(4);
  });
});

describe('readFileAsynchronously', () => {
  test('should call join with pathToFile', async () => {
    const pathFile = '/username/file.txt';
    const dirname = 'user/ivan';
    const fullPath = `${dirname}/${pathFile}`;
    const mockJoin = jest.spyOn(path, 'join');
    //path.join = jest.requireActual('path');
    await readFileAsynchronously(fullPath);
    expect(mockJoin).toBeCalled();
  });

  test('should return null if file does not exist', async () => {
    jest.spyOn(fs, 'existsSync').mockReturnValue(false);
    const pathFile = 'user/username/task1/test.txt';
    const result = await readFileAsynchronously(pathFile);
    expect(result).toBeNull();
  });

  test('should return file content if file exists', async () => {
    jest.spyOn(fs, 'existsSync').mockReturnValue(true);
    const readMock = jest.spyOn(fs.promises, 'readFile');
    readMock.mockResolvedValue('fvdlfglkdj');
    const pathFile = '/username/file.txt';
    const dirname = 'user/ivan';
    const fullPath = `${dirname}/${pathFile}`;
    const result = await readFileAsynchronously(fullPath);
    expect(result).toBe('fvdlfglkdj');
  });
});
