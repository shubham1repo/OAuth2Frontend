import React, { useEffect, useState } from 'react'
import NavBar from '../components/NavBar'
import Footer from '../components/Footer'
import Card from '../components/Card'
import Carousel from '../components/Carousel'
import OAuth2Service from '../security/Oauth2Config';
import { Link, useNavigate,useLocation } from 'react-router-dom'
import axios from 'axios'


const carouselImages = [
  "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?q=80&w=1899&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?q=80&w=1899&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://images.unsplash.com/photo-1668236543090-82eba5ee5976?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3Dr",
  "https://images.unsplash.com/photo-1709429790175-b02bb1b19207?q=80&w=1932&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://images.unsplash.com/photo-1709429790175-b02bb1b19207?q=80&w=1932&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
];
export default function Home() {
    let navigate = useNavigate()
    const location = useLocation();
    const [search,setSearch]=useState([])
    const [foodCat, setFoodCat] = useState([])
    const [foodItem, setFoodItem] = useState([])
    const loadData = async () => {
        const t=localStorage.getItem('authToken')
        // console.log(localStorage.getItem('authToken'));
       try{ let response = await fetch("http://localhost:8081/api/get/food_item", {
            method: 'GET',
            headers: {
                'Authorization':"Bearer "+t,
            }
        });
        console.log("ok"+response.status)
        if(response.status==401){
            console.log("inside refresh")
            OAuth2Service.refreshToken();
            // response = await fetch("http://localhost:8081/api/get/food_item", {
            //     method: 'GET',
            //    headers: {
            //         'Authorization':"Bearer "+localStorage.getItem('authToken'),
            //     }
            // })
        }
        let response2 = await fetch("http://localhost:8081/api/get/food_category", {
            method: 'GET',
            headers: {
                'Authorization':"Bearer "+localStorage.getItem('authToken'),
            }
        })
      const fooditemData = await response.json()
      const foodcat=await response2.json();
       
        console.log("Food Items Response:", fooditemData);
        console.log("Food Cat Response:", foodcat);
        setFoodItem(fooditemData)
        setFoodCat(foodcat)
    }catch (error) {
        // Handle error gracefully
        console.error("Error fetching data:", error);
        // Optionally, you can set default or error state for foodItem and foodCat
        setFoodItem([]);
        setFoodCat([]);
    }
        
        //console.log(response[0],response[1])
    }

    useEffect(() => {
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
          console.log("response "+response);
          navigate("/")
        }
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
      
        loadData()
        // window.location.href = "http://localhost:3000/";
    }, [location,navigate])

    return (
        <div>
            <div><NavBar /></div>
            <div id="carouselExampleCaptions" class="carousel slide" data-bs-ride="carousel">

                <div className="carousel-inner" id='carousel'>
                    <div className='carousel-caption' style={{ zIndex: "10" }}>
                        <div className="d-flex justify-content-center">
                            <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" value={search} onChange={(e)=>{setSearch(e.target.value)}}/>
                        </div>
                    </div>
                    <div className="carousel-item active">
                        <img src="https://images.unsplash.com/photo-1568901346375-23c9450c58cd?q=80&w=1899&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" className="d-block w-100" style={{ filter: "brightness(30%)", "width": "100px", "maxHeight": "600px", "object-fit": "cover" }} alt="..." />
                    </div>
                    <div className="carousel-item ">
                        <img src="https://images.unsplash.com/photo-1656936632107-0bfa69ea06de?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" className="d-block w-100" style={{ filter: "brightness(30%)", "width": "100px", "maxHeight": "600px", "object-fit": "cover" }} alt="..." />
                    </div>
                    <div className="carousel-item">
                        <img src="https://images.unsplash.com/photo-1668236543090-82eba5ee5976?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3Dr" className="d-block w-100" style={{ filter: "brightness(30%)", "width": "100px", "maxHeight": "600px", "object-fit": "cover" }} alt="..." />
                    </div>
                    <div className="carousel-item">
                        <img src="https://images.unsplash.com/photo-1568901346375-23c9450c58cd?q=80&w=1899&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" className="d-block w-100" style={{ filter: "brightness(30%)", "width": "100px", "maxHeight": "600px", "object-fit": "cover" }} alt="..." />
                    </div>
                    <div className="carousel-item">
                        <img src="https://images.unsplash.com/photo-1709429790175-b02bb1b19207?q=80&w=1932&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" className="d-block w-100" style={{ filter: "brightness(30%)", "width": "100px", "maxHeight": "600px", "object-fit": "cover" }} alt="..." />
                    </div>
                </div>
                <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="prev">
                    <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                    <span class="visually-hidden">Previous</span>
                </button>
                <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="next">
                    <span class="carousel-control-next-icon" aria-hidden="true"></span>
                    <span class="visually-hidden">Next</span>
                </button>
            </div>
            <div className='container'>
             { (localStorage.getItem("authToken")) ?<div> {
                    foodCat != []
                        ?foodCat.map((data) => {
                            return (
                                <div className="row mb-5">
                                    <div key={data.id} className="fs-3 m-3">
                                        {data.category_name}
                                    </div>
                                    <hr />
                                    {
                                        foodItem != [] ?
                                            foodItem.filter((item) =>
                                               (item.category_name === data.category_name)&&(item.name.toLowerCase().includes(search.toLocaleString().toLocaleLowerCase()))
                                            ).map((filterItems) => {
                                                return <div key={filterItems.id} className='col-12 col-md-6 col-lg-3 m-0'>
                                                    <Card foodItem={filterItems}
                                                        options={filterItems.options}
                                                        ></Card>
                                                </div>
                                            })
                                            : <div>No Such Data FOund</div>
                                    }
                                </div>
                            )
                        }) : <div>"""""""</div>
                }
            </div> :<div>No Content</div>

        }


            </div>
            <div><Footer /></div>
        </div>
    )
}
