import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { Cardsdata } from "./CardsData";
import { useDispatch } from "react-redux";
import {ADD}  from '../redux/actions/action';

const Cards = () => {
  const [data, setData] = useState(Cardsdata);
 
  const dispatch = useDispatch();
 

  const send =(e)=>{
   dispatch(ADD(e));   
  }
  

  return (
    <div className="container mt-3">
      <h5 className="text-center">Add to Cart Projects</h5>
      <div className="row d-flex justify-content-center align-items-center">
        {data.map((elements, id) => {
          return (
            <Card
              style={{ width: "18rem", border: "none", padding: 20 }}
              className="mx-2 mt-4 card_style"
              key={id}
            >
              <Card.Img
                variant="top"
                src={elements.image}
                style={{ height: "15rem" }}
              />
              <Card.Body>
                <Card.Title>{elements.title}</Card.Title>
                <Card.Text>₹ {elements.price}</Card.Text>
                <div className="button_div d-flex justify-content-center flex-end">
                  <Button variant="primary" className="col-lg-12" onClick={()=>send(elements)}>Add to Cart</Button>
                </div>
              </Card.Body>
            </Card>
          );
        })}
      </div>
    </div>
  );
};

export default Cards;
