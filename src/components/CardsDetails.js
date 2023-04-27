import React, { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";

const CardsDetails = () => {
    const [data,setData] = useState([]);
    const getdata = useSelector((state) => state.cartreducer.carts);
    //   console.log(getdata);
    const {id} = useParams();

    let compare = ()=>{
        let  comparedata = getdata.filter((e)=>{
            return e.id == id;

        })
        setData(comparedata);
    }

    useEffect(()=>{
     compare();
    },[id])

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
                      <strong>Total</strong> : Masala Theoryyy
                    </p>
                    <td>
                    <p>Price: 2200</p>
                
                  </td>
                  </td>
                     <td>
                    <p><strong>Rating : </strong><span style={{backgroundColor:'green',color:'#fff',padding:'2px 5px',borderRadius:'5px'}}>{ele.rating.rate} ★</span></p>
                    <p><strong>Order Review : </strong><span> Customer {ele.rating.count} + order placed here recently</span></p>
                    <p><strong>Remove : </strong><span><i className="fas fa-trash" style={{color:'red',fontSize:'20px',cursor:'pointer'}}></i></span></p>

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
