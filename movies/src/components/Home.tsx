import { useEffect, useState } from 'react'
import axios from 'axios'
import { url } from '../config'
import { Button, Col, Container, ListGroup, Row } from 'react-bootstrap'
import swal from 'sweetalert';
import IMovies from '../interfaces/movies'



export default function Home() {
    const [movies, setMovies] = useState<IMovies[]>([]);

    // get all movies request
    async function getMovies() {
        try {
            let resp = await axios.get(`${url}/movies`)

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
    }, [])


    const addMovie = (event: any) => {

        swal('Enter movie name', {
            content: {
                element: 'input',
                attributes: {
                    placeholder: 'New name',
                }
            }
        } as any)
            .then(async (value) => {
                try {
                    await axios.post(`${url}/movie`, { name: value })
                    swal('Movie Created')
                    getMovies()
                } catch (error) {
                    let errorMessage = error.response.data.error.message
                    if (errorMessage) {
                        swal(errorMessage)
                    }
                }
            })

    }

    const handleEdit = (event: any) => {
        swal('Change movie name', {
            content: {
                element: 'input',
                attributes: {
                    placeholder: 'New name',
                }
            }
        } as any)
            .then(async (value) => {
                let id = parseInt(event.target.name)
                console.log(id)
                try {
                    let resp = await axios.put(`${url}/movies/${id}`, { id: id, name: value })
                    console.log(resp)
                } catch (error) {
                    console.log(error)
                }
                getMovies()
            })
    }

    const handleDelete = (event: any) => {
        swal('Are you sure you want to delete the movie', {
            buttons: ["No", "Yes"],
        })
            .then(async (value) => {
                if (value === true) {
                    let resp = await axios.delete(`${url}/movies/${event.target.name}`)
                    console.log(resp)
                    getMovies()
                }
            })
    }


    return (
        <Container >
            {/* <Input afterSubmit={getMovies} allMovies={movies} /> */}
            <Button onClick={addMovie} >Add Movie</Button>
            <Container className="d-flex justify-content-center">
                <ListGroup className='mt-3 w-50 d-flex'>
                    {movies.map((movie: any) => (
                        <Row>
                            <ListGroup.Item className='mr-auto p-2 d-flex'>
                                <Col>
                                    {movie.name}
                                    {/* {movie.id} */}
                                </Col>
                                <Col md={{ span: 3, offset: 1 }}>
                                    <Button className='m-1' name={movie.id.toString()} onClick={handleEdit}>Edit</Button>
                                    <Button className='' name={movie.id.toString()} onClick={handleDelete}>X</Button>
                                </Col>
                            </ListGroup.Item>
                        </Row>
                    ))}
                </ListGroup>
            </Container>
        </Container>
    )
}
