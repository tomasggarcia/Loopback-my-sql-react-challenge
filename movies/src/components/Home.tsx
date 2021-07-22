import React, { useEffect, useState } from 'react'
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


    const addMovie =(event: any)=>{
       
        swal('Change movie name', {
            content: {
                element: 'input',
                attributes: {
                    placeholder: 'New name',
                }
            }
        } as any)
            .then(async(value) => {
                let resp = await axios.post(`${url}/movies`,{name:value})
                console.log(resp)
                getMovies()
            })

    }

    const swalEdit = (event: any) => {
        swal('Change movie name', {
            content: {
                element: 'input',
                attributes: {
                    placeholder: 'New name',
                }
            }
        } as any)
            .then((value) => {
                handleEdit(event, value)
            })
    }

    const swalDelete = (event: any) => {
        swal('Are you sure you want to delete the movie',{
            buttons: ["No", "Yes"],
          })
          .then((value)=>{
              if(value===true){
                  handleDelete(event)
              }
          })
    }

    const handleEdit = async (event: any, value: string) => {
        let id = parseInt(event.target.name)
        console.log(id)
        try {
            let resp = await axios.put(`${url}/movies/${id}`, { id: id, name: value })
            console.log(resp)
        } catch (error) {
            console.log(error)
        }
        getMovies()
    }

    const handleDelete = async (event: any) => {
        let resp = await axios.delete(`${url}/movies/${event.target.name}`)
        console.log(resp)
        getMovies()
    }
    return (
        <div>
            <Button onClick={addMovie}>Add Movie</Button>
            <Input />
            <Container>
                <ListGroup className='mt-3 w-50'>
                    {movies.map((movie: any) => (
                        <ListGroup.Item>{movie.name} {movie.id}
                            <Button name={movie.id.toString()} onClick={swalEdit}>Edit</Button>
                            <Button name={movie.id.toString()} onClick={swalDelete}>X</Button>
                        </ListGroup.Item>
                    ))}
                </ListGroup>
            </Container>
        </div>
    )
}
