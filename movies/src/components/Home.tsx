import { useEffect, useState } from 'react'
import Input from './Input'
import axios from 'axios'
import { url } from '../config'
import { Button, Container, ListGroup } from 'react-bootstrap'
import swal from 'sweetalert';


interface IMovies {
    id?: number,
    name?: string,
}

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

        swal('Change movie name', {
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
                    if (errorMessage){
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
        <div>
            <Button onClick={addMovie}>Add Movie</Button>
            <Input afterSubmit={getMovies} allMovies={movies}/>
            <Container>
                <ListGroup className='mt-3 w-50'>
                    {movies.map((movie: any) => (
                        <ListGroup.Item>{movie.name} {movie.id}
                            <Button name={movie.id.toString()} onClick={handleEdit}>Edit</Button>
                            <Button name={movie.id.toString()} onClick={handleDelete}>X</Button>
                        </ListGroup.Item>
                    ))}
                </ListGroup>
            </Container>
        </div>
    )
}
