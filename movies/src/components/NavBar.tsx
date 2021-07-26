import React from 'react'
import { Container,  Nav, Navbar } from 'react-bootstrap'
import SearchBar from './SearchBar'


export default function NavBar() {
    return (
        <Navbar bg="light" expand="lg">
            <Container>
                <Navbar.Brand href="/">Movies-Page</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <Nav.Link href="/">Home</Nav.Link>
                        <Nav.Link href="login">Login</Nav.Link>
                        <Nav.Link href="upload">Upload csv</Nav.Link>
                    </Nav>
                    <SearchBar />
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}
