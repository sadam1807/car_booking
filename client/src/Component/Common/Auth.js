import jwt from 'jsonwebtoken';

const Auth = {
  setToken : (token) => {
    localStorage.setItem('token', token);
    return true;
  },
  getToken : () => {
    const token =  localStorage.getItem('token');
    if(!token) {
      console.log('token expires')
    return false;
    }
    return token;
  },
  removeToken : () => {
    localStorage.removeItem('token');
    return true;
  },
  isAuthenticated : () => {
    return(Auth.getToken());
  },
  getUserType: () => {
    const payload = Auth.getToken();
    if(!payload) return false;
    const decodedPayload = jwt.verify(payload, "This is the secret");
    return decodedPayload.userType;
  }
}



export default Auth;
