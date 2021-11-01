import axios from 'axios';

const refreshInstance = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  withCredentials: true,
});

export const updateToken = async () => {
  /**
   * 리프레쉬토큰을 이용해 억세스 토큰을 다시 발급받는다.
   */
  let res;
  let result;
  try {
    res = await refreshInstance.post('/auth/refresh');
  } catch (err) {
    return Promise.reject(err);
  }
  if (res.data?.result) result = res.data.accessToken;
  return Promise.resolve(result);
};

export default async function setAxios(setToken, setIsLoading) {
  // 리액트 바로 사용시 App.js최상단으로 올려주세요
  axios.defaults.baseURL = process.env.REACT_APP_API_URL;
  axios.defaults.withCredentials = true;
  axios.interceptors.request.use((config) => {
    setIsLoading(true);
    return config;
  });
  axios.interceptors.response.use(
    /**
     * axios 인터럽트 설정
     * 401일 경우 App내의 상태를 변경해야 해서 여기서 적용...
     */

    (config) => {
      setIsLoading(false);
      return config;
    },
    async (err) => {
      setIsLoading(false);
      if (err.response?.status === 401) {
        /**
         * 토큰이 더 이상 유효하지 않음..
         * 토큰 갱신을 시도해서 성공하면 요청을 재전송한다.
         */
        const newToken = await updateToken();
        if (newToken) {
          setToken(newToken);
          // 토큰갱신에 성공했으므로 다시 시도해본다.
          // 3번까지만 재시도해본다.
          const retry = err.config.retry || 0;
          // eslint-disable-next-line no-param-reassign
          err.config.retry = retry + 1;
          if (retry < 3) return axios.request(err.config);
          return Promise.reject(err);
        }
      }
      return Promise.reject(err);
    },
  );
}
