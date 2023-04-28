import React, { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { DLT,ADD,DEC } from "../redux/actions/action";

const CardsDetails = () => {
    const [data,setData] = useState([]);
    const getdata = useSelector((state) => state.cartreducer.carts);
    //   console.log(getdata);
    const {id} = useParams();
    
    const history = useNavigate();

    const dispatch = useDispatch();
    let compare = ()=>{
        let  comparedata = getdata.filter((e)=>{
            return e.id == id;

        })
        setData(comparedata);
    }

    useEffect(()=>{
     compare();
    },[id])

    const send =(e)=>{
        dispatch(ADD(e));   
       }
       
   const dlt = (id)=>{
        dispatch(DLT(id));
        history('/');
    }

    
   const dec = (items)=>{
    dispatch(DEC(items));
}


  return (
    <>
      <div className="container">
        <h5 className="text-center mt-3">Items Details</h5>
        <section className="container mt-3 d-flex justify-content-center">
            {
                data.map((ele)=>{
                return(<>
          <div className="itemdetails d-flex column">
            <div className="items_img">
              <img
                src={ele.image}
                alt=""
              />
            </div>
            <div className="details">
              <Table>
                <tr>
                  <td>
                    <p>
                      <strong>Description</strong> : {ele.title}
                    </p>
                    <p>
                      <strong>Price</strong> : ₹ {ele.price}
                    </p>
                    <p>
                      <strong>Category</strong> : {ele.category}
                    </p>
                    <p>
                      <strong>Total</strong> : {ele.price *ele.qnty}
                                          </p>
                   <div className="mt-5 d-flex justify-content-between align-items-center" style={{width:80,cursor:'pointer',backgroundColor:'#ddd',color:'#111'}}>
                                   <span style={{fontSize:20}} onClick={ele.qnty <=1 ? ()=>dlt(ele.id) : ()=>dec(ele)}>-</span>
                                   <span style={{fontSize:16}}>{ele.qnty}</span>
                                   <span style={{fontSize:20}} onClick={()=>send(ele)}>+</span>
                   </div>
                    <td>
                   
                  </td>
                  </td>
                     <td>
                    <p><strong>Rating : </strong><span style={{backgroundColor:'green',color:'#fff',padding:'2px 5px',borderRadius:'5px'}}>{ele.rating.rate} ★</span></p>
                    <p><strong>Order Review : </strong><span> Customer {ele.rating.count} + order placed here recently</span></p>
                    <p><strong>Remove : </strong><span><i className="fas fa-trash" onClick={()=>dlt(ele.id)} style={{color:'red',fontSize:'20px',cursor:'pointer'}}></i></span></p>

                  </td>
                </tr>
              </Table>
            </div>
      </div>          
                </>)
                })
            }
        </section>
      </div>
    </>
  );
};
export default CardsDetails;
