import React, { useState,useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Badge from 'react-bootstrap/Badge'
import Modal from '../Modal';
import Cart from '../screens/Cart';
import { useDispatch, useCart } from './ContextReducer'
import OAuth2Service from '../security/Oauth2Config';
import { jwtDecode } from 'jwt-decode';


export default function NavBar() {
  const [username, setUsername] = useState('');
  useEffect(() => {
    const token = localStorage.getItem("idToken");
    if (token) {
      setUsername(jwtDecode(token).sub)
      console.log("parsing token")
      // const decodedToken = parseJwt(token);
      // setUsername(decodedToken.username || '');
    }
  }, []);

  const parseJwt = (token) => {
    try {
      const base64Url = token.split('.')[1];
      const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
      const jsonPayload = decodeURIComponent(
        atob(base64)
          .split('')
          .map((c) => `%${('00' + c.charCodeAt(0).toString(16)).slice(-2)}`)
          .join('')
      );
      return JSON.parse(jsonPayload);
    } catch (e) {
      return {};
    }
  };
  
  
  let navigate=useNavigate()
  const [cartView, setCartView] = useState(false)
  let data = useCart()
  const handleLogOut = () => {
    OAuth2Service.logout()
        .then(() => {
          console.log('Logged out successfully');
        })
        .catch((error) => {
          console.error('Error during logout:', error);
        });
    localStorage.removeItem("authToken")
    localStorage.removeItem("idToken")
    // window.location.reload();
    navigate('/login')
  }
  return (
    <div>

      <nav className="navbar navbar-expand-lg navbar-dark bg-success">
        <div className="container-fluid">
          <Link className="navbar-brand fs-1 fst-italic" to="/">BiteBounty</Link>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav me-auto mb-2">
              <li className="nav-item">
                <Link className="nav-link active fs-5" aria-current="page" to="/">Home</Link>
              </li>
              {(localStorage.getItem("idToken")) ? <li className="nav-item">
                <Link className="nav-link active fs-5" aria-current="page" to="/myOrder">My Orders</Link>
              </li> : ""}
            </ul>
            <div className='d-flex'>
              {(localStorage.getItem("idToken")) ?
                <div>
                  <Link className="btn bg-white text-success mx-2" onClick={() => { setCartView(true) }}>MyCart
                    <Badge pill bg="danger">{data.length}</Badge>
                  </Link>
                  {cartView ? <Modal onClose={() => setCartView(false)}><Cart></Cart></Modal> : ""}
                  <Link className="btn bg-white text-danger mx-2" >Hello...{username}</Link>
                  <Link className="btn bg-white text-danger mx-2" onClick={handleLogOut}>SignOut</Link>
                </div>
                : <div><Link className="btn bg-white text-success mx-1" to="/login">Login</Link>
               
                  <Link className="btn bg-white text-success mx-1" to="/createUser">SignUp</Link></div>}


            </div>

          </div>
        </div>
      </nav>
    </div>
  )
}
