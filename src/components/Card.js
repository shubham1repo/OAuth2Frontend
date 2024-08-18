import React,{useEffect, useState,useRef} from 'react'
import { useDispatch,useCart } from './ContextReducer'
export default function 
(props) {
    let data=useCart()
    let dispatch =useDispatch()
    let options=props.options??{}
    // const priceRef=useRef()
    let listOptions=Object.keys(options)
    let foodItem=props.foodItem
    const [qty,setQty]=useState(1)
    const [size,setSize]=useState("")
    // let finalPrice=qty*parseInt(options[size])
    const handleAddTOCart=async()=>{
        let food = []
    for (const item of data) {
      if (item.id === foodItem.id) {
        food = item;

        break;
      }
    }
    if (food !== []) {
        if (food.size === size) {
          await dispatch({ type: "UPDATE", id: foodItem.id})
          return
        }
        else if (food.size !== size) {
          await dispatch({ type: "ADD", id: foodItem.id, name: foodItem.name,img: props.img })
          console.log("Size different so simply ADD one more to the list")
          return
        }
        return
      }
        await dispatch({type:"ADD",id:foodItem.id,name:foodItem.name})
        console.log(data)
    }
  
  return (

    
    <div>  
           <div>
                <div className="card mt-3" style={{ "width": "16rem", "minHeight": "300px" ,"maxHeight": "400px"}}>
                    <img src={foodItem.img} style={{ "width": "16rem","minHeight": "100px" , "maxHeight": "150px","object-fit": "cover" }} className="card-img-top" alt="..." />
                    <div className="card-body p-2">
                        <h5 className="card-title">{foodItem.name}</h5>
                        {/*  <p className="card-text">{props.desc}</p> */}
                        <div className='container w-100 p-0'>
                            {/* <select className='h-10 bg-success rounded' onChange={(e)=>setQty(e.target.value)}>
                                {Array.from(Array(6), (e, i) => {
                                    return (
                                        <option key={i + 1} value={i + 1}>{i + 1} </option>
                                    )
                                })}
                            </select> */}
                            {/* <select className=' m-2 h-10  bg-success rounded' ref={priceRef} onChange={(e)=>setSize(e.target.value)}>
                                {listOptions.map((data)=>{
                                   return <option key={data} value={data}>{data}</option>
                                })}
                            </select> */}
                            
                            <hr/>
                            <button className={'btn btn-success justify-centre ms-2'} onClick={handleAddTOCart}>Add to Cart</button>
                        </div>
                    </div>
                </div>
            </div>
    </div>
  )
}
