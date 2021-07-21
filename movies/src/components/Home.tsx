import React, { useEffect, useState } from 'react'
import Input from './Input'
import axios from 'axios'
import { url } from '../config'
import { Container, ListGroup } from 'react-bootstrap'

interface IMovies {
    id?: number,
    name?: string,
}

export default function Home() {
    const [movies, setMovies] = useState<IMovies[]>([]);

    // get all movies request
    useEffect(() => {
        (async function () {
            try {
                let resp = await axios.get(`${url}/movies`)

                let newMovies: any = []
                resp.data.forEach((movie: any) => {
                    newMovies.push(movie)
                });
                setMovies(newMovies)
            } catch (error) {
                console.log(error)
            }
        })()
    }, [])

    return (
        <div>
            <Input />
            <Container>
                <ListGroup className='mt-3 w-50'>
                    {movies.map((movie: any) => (
                        <ListGroup.Item>{movie.name}</ListGroup.Item>
                    ))}
                </ListGroup>
            </Container>
        </div>
    )
}
