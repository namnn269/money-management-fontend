import { GoogleLogin } from '@react-oauth/google';
import jwtDecode from 'jwt-decode';

function CustomGoogleLogin() {
  const loginGoogleSuccess = (res) => {
    console.log(res);
    const data = jwtDecode(res.credential);
    console.log(data);
  };

  const loginGoogleError = (err) => {
    console.log(err);
  };

  return (
    <>
      <GoogleLogin
        onSuccess={loginGoogleSuccess}
        onError={loginGoogleError}
      ></GoogleLogin>
    </>
  );
}

export default CustomGoogleLogin;
