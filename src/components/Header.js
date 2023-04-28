import React, { useEffect, useState } from "react";
import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import Badge from "@mui/material/Badge";
import Nav from "react-bootstrap/Nav";
import { NavLink } from "react-router-dom";
import Menu from "@mui/material/Menu";
import cartImg from "../Images/372 (2).gif";
import { useDispatch, useSelector } from "react-redux";
import { Table } from "react-bootstrap";
import { DLT } from "../redux/actions/action";

const Header = () => {
  const [price, setPrice] = useState(0);
  const getdata = useSelector((state) => state.cartreducer.carts);

  const dispatch = useDispatch();

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const dlt = (id) => {
    dispatch(DLT(id));
  };

  const total = () => {
    let price = 0;
    getdata.map((ele, k) => {
      price = ele.price*ele.qnty + price;
    });
    setPrice(price);
  };

  useEffect(() => {
    total();
  },[total]);

  return (
    <div>
      <Navbar variant="dark" style={{ height: "60px",backgroundColor:'#222262' }}>
        <Container>
          <NavLink to="/" className="text-decoration-none text-light mx-3">
            Products
          </NavLink>
          <Nav className="me-auto">
            <NavLink to="/" className="text-decoration-none text-light">
              Home
            </NavLink>
          </Nav>
          <Badge
            badgeContent={getdata.length}
            color="primary"
            id="basic-button"
            aria-controls={open ? "basic-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={open ? "true" : undefined}
            onClick={handleClick}
          >
            <i
              className="fa fa-shopping-cart text-light"
              aria-hidden="true"
              style={{ fontSize: "25px", cursor: "pointer" }}
            ></i>
          </Badge>
        </Container>

        <Menu
          id="basic-menu"
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          MenuListProps={{
            "aria-labelledby": "basic-button",
          }}
        >
          {getdata.length ? (
            <div
              className="card-details"
              style={{ width: "30rem", padding: "10px" }}
            >
              <Table>
                <thead>
                  <tr>
                    <th>Photo</th>
                    <th>Product Name</th>
                  </tr>
                </thead>
                <tbody>
                  {getdata.map((e) => {
                    return (
                      <>
                        <tr>
                          <td>
                            <NavLink to={`/cart/${e.id}`}>
                              <img
                                src={e.image}
                                style={{ width: "5rem", height: "5rem" }}
                                onClick={handleClose}
                                alt=" "
                              />
                            </NavLink>
                          </td>
                          <td>
                            <p>{e.title}</p>
                            <p>Price : ₹ {e.price}</p>
                            <p>Quantity : {e.qnty}</p>
                            <p
                              style={{
                                color: "red",
                                fontSize: "20px",
                                cursor: "pointer",
                              }}
                              onClick={() => dlt(e.id)}
                            >
                              <i className="fas fa-trash smalltrash"></i>
                            </p>
                          </td>
                          <td
                            className="mt-5"
                            style={{
                              color: "red",
                              fontSize: "20px",
                              cursor: "pointer",
                            }}
                            onClick={() => dlt(e.id)}
                          >
                            <i className="fas fa-trash largetrash"></i>
                          </td>
                        </tr>
                      </>
                    );
                  })}
                  <p className="text-center">Total :₹ {price}</p>
                </tbody>
              </Table>
            </div>
          ) : (
            <div
              className="card-details d-flex justify-content-center align-items-center"
              style={{ width: "20rem", padding: 10, position: "relative" }}
            >
              <i
                className="fa fa-times smallclose"
                onClick={handleClose}
                aria-hidden="true"
                style={{
                  position: "absolute",
                  top: 2,
                  right: 20,
                  fontSize: 23,
                  cursor: "pointer",
                }}
              ></i>
              <p style={{ fontSize: 16 }}>Your Cart is Empty</p>
              <img
                src={cartImg}
                alt=" "
                className="cart_image"
                style={{ width: "4rem", padding: 10 }}
              />
            </div>
          )}
        </Menu>
      </Navbar>
    </div>
  );
};

export default Header;
