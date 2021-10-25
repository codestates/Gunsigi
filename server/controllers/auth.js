module.exports = {
  logout: (req, res) => {
    res.clearCookie('jwt');
    return res.json({ result: true, message: 'logout success' });
  },
  // 회원가입 - 완료
  signup: async (req, res) => {
  },

  // 로그인 - 완료
  signin: async (req, res) => {
  },
  // 토큰 갱신 - 완료
  refresh: async (req, res) => {
  },
};
