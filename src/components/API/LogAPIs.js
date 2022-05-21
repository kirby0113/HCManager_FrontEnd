import {LogsAPI} from '../../APILink';
import {getLogsErrorCatch} from './error/Log';

class LogError extends Error {
  constructor(response) {
    super(`${response.status} for ${response.url}`);
    this.name = 'LogError';
    this.status = response.status;
  }
}

export const getLogs = async () => {
  return fetch(LogsAPI)
    .then((res) => {
      if (!res.ok) {
        throw new LogError(res);
      }
      return res.json();
    })
    .then((json) => {
      return {status: 'success', content: json};
    })
    .catch((error) => {
      console.error(error);
      if (error.status === undefined) {
        return getLogsErrorCatch(-1);
      } else {
        return getLogsErrorCatch(error.status);
      }
    });
};
