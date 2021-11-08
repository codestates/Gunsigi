// * 이메일 유효성 검사
export const emailValidator = (email) => {
  const emailRegExp = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;

  return emailRegExp.test(email);
};

// * 닉네임 유효성 검사
export const nicknameValidator = (nickname) => {
  // 닉네임 특수 문자 제외 2~10자리
  const nicknameRegExp = /^[\w\Wㄱ-ㅎㅏ-ㅣ가-힣]{2,10}$/;

  return nicknameRegExp.test(nickname);
};

// * 비밀번호 유효성 검사
export const passwordValidator = (password) => {
  // 비밀번호 영문, 숫자 혼합하여 8~20자리 (특수문자 가능)
  const passwordRegExp = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d~!@#$%^&*()+|=]{8,20}$/;

  return passwordRegExp.test(password);
};
