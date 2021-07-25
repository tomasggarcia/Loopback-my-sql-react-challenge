import React, { useEffect, useState } from 'react'
import { url } from '../config'
import axios from 'axios';
import { Button, Container, ListGroup } from 'react-bootstrap';
import { useLocation } from 'react-router-dom';
import IMovies from '../interfaces/movies'

export default function SearchResult() {
    const [movies, setMovies] = useState<IMovies[]>([]);
    
    let query = new URLSearchParams(useLocation().search)
    let filter = query.get('filter')

    async function getMovies() {
        try {
            let resp = await axios.get(`${url}/movies?filter=%7B"where":%7B"name":%7B"like"%3A"%25${filter}%25"%7D%7D%7D`)

            let newMovies: IMovies[] = []
            resp.data.forEach((movie: IMovies) => {
                newMovies.push(movie)
            });
            setMovies(newMovies)
        } catch (error) {
            console.log(error)
        }
    }
    useEffect(() => {
        getMovies()
    }, [filter])


    return (
        <Container>
            <ListGroup className='mt-3 w-50'>
                {movies.map((movie: any) => (
                    <ListGroup.Item>{movie.name} {movie.id}
                        {/* <Button name={movie.id.toString()} onClick={handleEdit}>Edit</Button>
                        <Button name={movie.id.toString()} onClick={handleDelete}>X</Button> */}
                    </ListGroup.Item>
                ))}
            </ListGroup>
        </Container>
    )
}
