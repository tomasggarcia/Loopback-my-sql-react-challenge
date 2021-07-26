import { useState } from 'react'
import { Button, Form, FormControl } from 'react-bootstrap'
import { useHistory } from 'react-router-dom';


export default function SearchBar() {
    const history = useHistory();
    const [search, setSearch] = useState<string>('');

    const apiPrueba = () => {
        history.push(`/search?filter=${search}`);
    }

    const setSearchChange = (event:any) => {
        setSearch(event?.target.value)
    }

    return (
        <Form className="d-flex">
            <FormControl
                type="search"
                placeholder="Movie name"
                aria-label="Search"
                onChange={setSearchChange}
            />
            <Button  variant="outline-success" onClick={apiPrueba}>Search</Button>
        </Form>
    )
}
