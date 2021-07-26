import React from 'react'
import { Container, Nav, Navbar } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import SearchBar from './SearchBar'


export default function NavBar() {
    // const history = useHistory();
    return (
        <Navbar bg="light" expand="lg">
            <Container>
                <Navbar.Brand href="/">Movies-Page</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        {/* <Button className='btn btn-dark p-3' style={{marginRight: '5px'}} onClick={() => history.push('/')}>Home</Button>
                        <Button className='btn btn-dark p-3' style={{marginRight: '5px'}} onClick={() => history.push('/login')}>Login</Button> */}
                        <Link className='mt-2 p-2' style={{textDecoration: 'none'}} to="/">Home </Link>
                        <Link className='mt-2 p-2' style={{textDecoration: 'none'}} to="/login">Login</Link>
                        <Link className='mt-2 p-2' style={{textDecoration: 'none'}} to="/upload">Upload csv</Link>
                    </Nav>
                    <SearchBar />
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}
