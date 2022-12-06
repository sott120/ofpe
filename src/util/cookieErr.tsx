const cookieErr = (errText: string) => {
  alert(errText);
  window.location.replace('/login');
};

export default cookieErr;
