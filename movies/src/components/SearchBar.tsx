import axios from 'axios';
import React, { useState } from 'react'
import { Button, Form, FormControl } from 'react-bootstrap'
import { url } from '../config'

export default function SearchBar() {
    const [search, setSearch] = useState<string>('');

    const apiPrueba = async() => {
        let resp = await axios.get(`${url}/movies?filter=%7B"where":%7B"name":%7B"like"%3A"%25${search}%25"%7D%7D%7D`)
        console.log(resp)
    }

    const setSearchChange = (event:any) => {
        setSearch(event?.target.value)
    }

    return (
        <Form className="d-flex">
            <FormControl
                type="search"
                placeholder="Search"
                className="mr-2"
                aria-label="Search"
                onChange={setSearchChange}
            />
            <Button variant="outline-success" onClick={apiPrueba}>Search</Button>
        </Form>
    )
}
