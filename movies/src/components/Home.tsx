import { useEffect, useState } from 'react'
import axios from 'axios'
import { url } from '../config'
import { Button, Col, Container, ListGroup, Row } from 'react-bootstrap'
import swal from 'sweetalert';
import IMovies from '../interfaces/movies'
import { FiArrowLeft, FiArrowRight } from "react-icons/fi";



export default function Home() {
    const [movies, setMovies] = useState<IMovies[]>([]);
    const [page, setPage] = useState<number>(1)

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

    // initial request
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

    const prevPage = () => {
        if (page > 1) setPage(page - 1)
    }
    const nextPage = () => {
        if (page < (movies.length / 5)) setPage(page + 1)
    }


    return (
        <Container >
            <Button onClick={addMovie} className='mt-2'>Add Movie</Button>
            <Container className="d-flex justify-content-center">
                <h2>Movies</h2>
            </Container>
            <Container className=" d-flex justify-content-center">
                <Button onClick={prevPage}><FiArrowLeft /></Button>
                <label className='p-2'>{page}</label>
                <Button onClick={nextPage}><FiArrowRight /></Button>
            </Container>
            <Container className="d-flex justify-content-center">
                <ListGroup className='mt-3 w-75 d-flex'>
                    {movies.slice((page-1)*5,page*5).map((movie: IMovies) => (
                        <Row>
                            <ListGroup.Item className='mr-auto p-2 d-flex'>
                                <Col>
                                    <b>Titulo: </b> {movie.name}<br></br>
                                    <b>Sinopsis: </b>{movie.description}<br></br>
                                    <b>Fecha de Lanzamiento: </b>{movie.date}
                                </Col>
                                <Col md={{ span: 3, offset: 1 }}>
                                    {movie.id?(
                                        <div>
                                            <Button className='m-1' name={movie.id.toString()} onClick={handleEdit}>Edit</Button>
                                            <Button className='' name={movie.id.toString()} onClick={handleDelete}>X</Button>
                                        </div>
                                    ):null}
                                </Col>
                            </ListGroup.Item>
                        </Row>
                    ))}
                </ListGroup>
            </Container>
        </Container>
    )
}
