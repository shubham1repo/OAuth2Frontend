
import axios from 'axios';
import queryString from 'query-string';
import pkceChallenge from 'pkce-challenge'


const CLIENT_ID = 'oidc-client';
const CLIENT_SECRET='secret'
const REDIRECT_URI = 'http://localhost:3000/';
// const generateCodeVerifierAndChallenge = () => {
//   const challenge = pkceChallenge();

//   if (!challenge || !challenge.code_verifier || !challenge.code_challenge) {
//     console.error('Failed to generate PKCE challenge');
//     return null;
//   }
//   return challenge;
// }
const OAuth2Service = {
  async refreshToken() {
    const storedRefreshToken = localStorage.getItem('refreshToken');
    console.log("refresh "+ storedRefreshToken)
    const formData = {
      grant_type: 'refresh_token',
      //client_id: CLIENT_ID,
      refresh_token: storedRefreshToken,
      // client_secret: 'pwd' // Only needed for server-side requests
    };
    const headers = {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Authorization': `Basic ${btoa(`${CLIENT_ID}:${CLIENT_SECRET}`)}`, 
    };
    // const response = await axios.post('http://localhost:8080/oauth2/token', queryString.stringify(formData), {headers});

    const response = await fetch('http://localhost:8080/oauth2/token', {
      method: 'POST',
      headers: headers,
      body: queryString.stringify(formData)
  });
    // const response = await fetch('http://localhost:8080/oauth2/token', {
    //     method: 'POST',
    //     headers: {
    //         'Content-Type': 'application/x-www-form-urlencoded'
    //     },
    //     body: new URLSearchParams({
    //         'grant_type': 'refresh_token',
    //         'refresh_token': storedRefreshToken,
    //         'client_id': 'oidc-client',
    //         'client_secret': 'secret' // ensure this matches your client secret
    //     })
    // });

    if (response.status==200) {
        // const data = await response.json();
        localStorage.removeItem("authToken")
    localStorage.removeItem("idToken")
    const authtokenn = await response.json()
        localStorage.setItem('authToken', authtokenn.access_token);
        //localStorage.setItem('refreshToken', response.data.refresh_token);
        // console.log("Access Token R:", response.data.access_token);
    // console.log("TOkenID Token:", idToken);
    console.log("TOkenID Token R:", authtokenn.refresh_token);
    window.location.href = "http://localhost:3000/";
    } else {
        console.error('Failed to refresh token');
        // Handle refresh token failure (e.g., redirect to login)
    }
},
  async getAuthorizationCode() {
    const challenge = await pkceChallenge(128);
  localStorage.setItem('verifier',challenge.code_verifier)
    localStorage.setItem('challenge',challenge.code_challenge)
        console.log('challenge '+challenge.code_challenge)
        console.log('challenge '+challenge.code_verifier)

    // const { code_verifier, code_challenge } = generateCodeVerifierAndChallenge()
    // localStorage.setItem('verifier',code_verifier)
    // localStorage.setItem('challenge',code_challenge)
    // console.log('verifier '+code_verifier)
    // console.log('challenge '+code_challenge)
    const params = {
      response_type: 'code',
      client_id: CLIENT_ID,
      redirect_uri: REDIRECT_URI,
      scope: 'openid read', // Add scopes if necessary
      code_challenge:localStorage.getItem('challenge'),
      code_challenge_method:'S256'
    };
    //const url = `http://localhost:8080/oauth2/authorize?${queryString.stringify(params)}`;
    //const response = axios.post('http://localhost:8086/oauth2/authorize?response_type=code&client_id=online-shop&redirect_uri=http://localhost:3000/&scope=read');
    // const url='http://localhost:8080/oauth2/authorize?response_type=code&client_id=online-shop&redirect_uri=http://localhost:3000/&scope=read';
    
    const url = `http://localhost:8080/oauth2/authorize?${queryString.stringify(params)}`;
    window.location.href = url;
  },

  async getAccessToken(code) {
    const formData = {
      grant_type: 'authorization_code',
      code: code,
      redirect_uri: REDIRECT_URI,
      //client_id: CLIENT_ID,
      scope:'read',
      code_verifier: localStorage.getItem('verifier')
      // client_secret: 'pwd' // Only needed for server-side requests
    };
    const headers = {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Authorization': `Basic ${btoa(`${CLIENT_ID}:${CLIENT_SECRET}`)}`, 
    };
    try {
      const response = await axios.post('http://localhost:8080/oauth2/token', queryString.stringify(formData), {headers});
      
      console.log("response 1 "+response.data)
      const idtoken=response.data.id_token;
      const accessToken = response.data.access_token; // Assuming your access token is in 'access_token' field
      localStorage.setItem('idToken', idtoken); // Store access token in localStorage
      localStorage.setItem('authToken', accessToken); // Store access token in localStorage
      localStorage.setItem('refreshToken', response.data.refresh_token);
      window.location.reload();
    console.log("Access Token:", accessToken);
    const idToken = response.data.id_token;
    console.log("TOkenID Token:", idToken);
    console.log("Refresh Token:", response.data.refresh_token);

      return response.data;
      
    } catch (error) {
      console.error('Error fetching access token:', error);
      throw error;
    }
  },

  async logout() {
    try {
      // await axios.get('http://localhost:8080/logout');
      console.log("logout")
      localStorage.removeItem('authToken');
      localStorage.removeItem('refreshToken');
      window.location.href = "http://localhost:8080/logout"; // Redirect to home or login page
    } catch (error) {
      console.error('Error during logout:', error);
      throw error;
    }
  }
};

export default OAuth2Service;
