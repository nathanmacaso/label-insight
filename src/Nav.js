import React from 'react';
import Navbar from 'react-bootstrap/Navbar';
import logo from './palette-logo.png'

export default function Nav() {
  return (
    <Navbar bg="dark" variant="dark">
      <Navbar.Brand href="/">
        <img
          alt="logo"
          src={logo}
          width="210"
          className="d-inline-block align-top"
        />
      </Navbar.Brand>
    </Navbar>
  )
}
