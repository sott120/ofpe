const cookieErr = (errNum: number) => {
  if (errNum === 401) {
    alert('로그인 후 이용해주세요.');
  } else if (errNum === 403) {
    alert('토큰이 만료되었습니다. 다시 로그인해주세요.');
  }
  window.location.replace('/login');
};

const pageErr = (chkId: string | undefined) => {
  if (chkId) {
    alert('이미 로그인 되어있습니다!');
    window.location.replace('/');
  }
};

export { cookieErr, pageErr };
