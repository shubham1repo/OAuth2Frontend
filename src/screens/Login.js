import React, { useState } from 'react'
import { Link,useNavigate ,useLocation} from 'react-router-dom'
import OAuth2Service from '../security/Oauth2Config'


export default function Login() {
  const [credentials, setcredentials] = useState({ username: "", password: "" })
  const location = useLocation();
  let navigate = useNavigate()
  const handleSubmit = async (e) => {
    e.preventDefault();
  //   console.log(JSON.stringify({ username: credentials.username, password: credentials.password }))
  //   const formData = {
  //     username: credentials.username,
  //     password:credentials.password

  //     // client_secret: 'pwd' // Only needed for server-side requests
  //   };const headers = {
  //     'Content-Type': 'application/x-www-form-urlencoded',
  //     // 'Authorization': `Basic ${btoa(`${CLIENT_ID}:${CLIENT_SECRET}`)}`, 
  //   };
  // //   const response = await axios.get('http://localhost:8080/login')
  // // //   const url = `http://localhost:8080/login`;
  // // // window.location.href = url;
  //   const response = await axios.post('http://localhost:8080/login',queryString.stringify(formData),{headers});
  //   console.log(response)
    // e.preventDefault();
    OAuth2Service.getAuthorizationCode();
    console.log("login");
    console.log('useEffect triggered with location:', location);
      const queryParams = new URLSearchParams(location.search);
      const code = queryParams.get('code');
      if (code) {
        const response =OAuth2Service.getAccessToken(code)
          .then((accessToken) => {
            console.log('Access Token:', accessToken);
            // Handle storing/accessing token as needed
          })
          .catch((error) => {
            console.error('Error fetching access token:', error);
          });
          console.log("response "+response)
          navigate('/')
        }
    // console.log('useEffect triggered with location:', location);
    //   const queryParams = new URLSearchParams(location.search);
    //   const code = queryParams.get('code');
    //   if (code) {
    //     const response =OAuth2Service.getAccessToken(code)
    //       .then((accessToken) => {
    //         console.log('Access Token:', accessToken);
    //         // Handle storing/accessing token as needed
    //       })
    //       .catch((error) => {
    //         console.error('Error fetching access token:', error);
    //       });
    //       console.log("response "+response)
    //     }
    // const json = await response.json()
    // const authorizationHeader = response.headers.get("Authorization");
    // console.log('Authorization:', authorizationHeader);
    // console.log(json)
    // if (!json.success) {
    //   alert("Enter valid credentials")
    // }
    // if (json.success) {
    //   localStorage.setItem("userName", json.jwtToken)
    //   localStorage.setItem("authToken", authorizationHeader)
    //   console.log(localStorage.getItem("authToken"))
    //   console.log(localStorage.getItem("userName"))
    //   navigate("/welcome")
    // }
  }
  const onChange = (event) => {
    setcredentials({ ...credentials, [event.target.name]: event.target.value })
  }
  

  // useEffect(() => {
  //   console.log('useEffect triggered with location:', location);
  //   const queryParams = new URLSearchParams(location.search);
  //   const code = queryParams.get('code');
  //   if (code) {
  //     const response =OAuth2Service.getAccessToken(code)
  //       .then((accessToken) => {
  //         console.log('Access Token:', accessToken);
  //         // Handle storing/accessing token as needed
  //       })
  //       .catch((error) => {
  //         console.error('Error fetching access token:', error);
  //       });
  //       console.log(response.json())
  //   const json =  response.json()
  //   const authorizationHeader = response.headers.get("Authorization");
  //   console.log('Authorization:', authorizationHeader);
  //   console.log(json)
  //   if (!json.success) {
  //     alert("Enter valid credentials")
  //   }
  //   if (json.success) {
  //     localStorage.setItem("userName", json.jwtToken)
  //     localStorage.setItem("authToken", authorizationHeader)
  //     console.log(localStorage.getItem("authToken"))
  //     console.log(localStorage.getItem("userName"))
  //     navigate("/welcome")
  //   }
  //   }
  // }, [location]);
  // const [credentials, setcredentials] = useState({ username: "", password: "" })
  // let navigate = useNavigate()
 
    
   // console.log(JSON.stringify({ username: credentials.username, password: credentials.password }))
  //  const url = `http://localhost:8080/oauth2/authorize?response_type=code&client_id=online-shop&redirect_uri=http://localhost:3000/&scope=read`;
  //   window.location.href = url; 
   //const response = await fetch("http://localhost:8080/oauth2/authorize?response_type=code&client_id=online-shop&redirect_uri=http://localhost:3000/&scope=read")
    // console.log(response.json())
    // const json = await response.json()
    // const authorizationHeader = response.headers.get("Authorization");
    // console.log('Authorization:', authorizationHeader);
    // console.log(json)
    // if (!json.success) {
    //   alert("Enter valid credentials")
    // }
    // if (json.success) {
    //   localStorage.setItem("userName", json.jwtToken)
    //   localStorage.setItem("authToken", authorizationHeader)
    //   console.log(localStorage.getItem("authToken"))
    //   console.log(localStorage.getItem("userName"))
    //   navigate("/welcome")
    // }
  
  // const onChange = (event) => {
  //   setcredentials({ ...credentials, [event.target.name]: event.target.value })
  // }
  return (
    <div className="container">
      <form onSubmit={handleSubmit}>
        {/* <div className="mb-3">
          <label htmlFor="exampleInputEmail1" className="form-label">Username</label>
          <input type="username" className="form-control" name='username' value={credentials.username} onChange={onChange} />
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
          <input type="password" className="form-control" name='password' value={credentials.password} onChange={onChange} />
        </div> */}

        <button type="submit" className="btn btn-primary">login using oauth</button>
        <Link to="/createUser" className="m-3 btn btn-danger">New User</Link>
      </form>
    </div>
  )
  // const [credentials, setcredentials] = useState({ email: "", password: "" })
  // let navigate=useNavigate()
  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   console.log(JSON.stringify({ email: credentials.email, password: credentials.password }))
  //   const response = await fetch("http://localhost:5000/api/loginUser", {
  //     method: 'POST',
  //     headers: {
  //       'Content-Type': 'application/json'
  //     },
  //     body: JSON.stringify({ email: credentials.email, password: credentials.password })
  //   })
  //   const json = await response.json()
  //   console.log(json)
  //   if (!json.sucess) {
  //     alert("Enter valid credentials")
  //   }
  //   if (json.sucess) {
  //     localStorage.setItem("userEmail",credentials.email)
  //     localStorage.setItem("authToken",json.authT)
  //     console.log(localStorage.getItem("authToken"))
  //     console.log(localStorage.getItem("userEmail"))
  //     navigate("/")
  //   }
  // }
  // const onChange = (event) => {
  //   setcredentials({ ...credentials, [event.target.name]: event.target.value })
  // }
  // return (
  //   <>
  //     <div className='container'>
  //       <form onSubmit={handleSubmit}>
  //         <div className="mb-3">
  //           <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
  //           <input type="email" className="form-control" name='email' value={credentials.email} onChange={onChange} />
  //         </div>
  //         <div className="mb-3">
  //           <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
  //           <input type="password" className="form-control" name='password' value={credentials.password} onChange={onChange} />
  //         </div>
  //         <button type="submit" className="m-3 btn btn-success">Submit</button>
  //         <Link to="/createUser" className="m-3 btn btn-danger">New User</Link>
  //       </form>
  //     </div>
  //   </>
  // )
}
