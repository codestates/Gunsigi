/* eslint-disable no-param-reassign */
import axios from 'axios';

const refreshInstance = axios.create({
  baseURL: process.env.REACT_APP_API_URL || '',
  withCredentials: true,
});
const authUrl = [
  '/auth/signin',
  '/auth/signup',
  '/callback/google',
  '/callback/kakao',
];

export const updateToken = async () => {
  /**
   * 리프레쉬토큰을 이용해 억세스 토큰을 다시 발급받는다.
   */
  const res = await refreshInstance.post('/auth/refresh');
  axios.defaults.headers.common = {
    Authorization: `Bearer ${res.data?.accessToken}`,
  };
  return res.data;
};

export default async function setAxios(
  setToken,
  setIsLoading,
  handleErrorModalClick,
) {
  axios.defaults.withCredentials = true;
  axios.interceptors.request.use((config) => {
    if (config.loading !== false) setIsLoading(true);
    if (authUrl.includes(config.url)) config.auth = true;
    else if (config.url === '/auth/logout') config.logout = true;
    return config;
  });
  axios.interceptors.response.use(
    /**
     * axios 인터럽트 설정
     * 401일 경우 App내의 상태를 변경해야 해서 여기서 적용...
     */

    (response) => {
      if (response.config.auth) setToken(response.data.accessToken);
      else if (response.config.logout) setToken(false);
      setIsLoading(false);
      return response;
    },
    async (err) => {
      setIsLoading(false);
      if (!err.response) {
        handleErrorModalClick(true, '인터넷 연결이 불안정합니다');
      } else if (err.response.status === 401) {
        /**
         * 토큰이 더 이상 유효하지 않음..
         * 토큰 갱신을 시도해서 성공하면 요청을 재전송한다.
         */
        const res = await updateToken();
        if (res.accessToken) {
          setToken(res.accessToken);
          err.config.headers.Authorization = `Beaer ${res.accessToken}`;
          // 토큰갱신에 성공했으므로 다시 시도해본다.
          // 3번까지만 재시도해본다.
          const retry = err.config.retry || 0;
          err.config.retry = retry + 1;
          if (retry < 3) return axios.request(err.config);
          return Promise.reject(err);
        }
      } else if (err.response.status >= 500) {
        handleErrorModalClick(true, '서버 연결이 불안정합니다');
      }
      return Promise.reject(err);
    },
  );
}
