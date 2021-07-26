import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Button, Container } from 'react-bootstrap'
import CSVReader from 'react-csv-reader'
import swal from 'sweetalert'
import {url} from '../config'
import IMovies from '../interfaces/movies'


export default function Input() {
    const [movies, setMovies] = useState<IMovies[]>([]);
    const [input, setInput] = useState<IMovies[]>([])

    const fileLoad = (data:any[],fileInfo:any)=> {
        console.log(data)
        let inputMovies:IMovies[] = []
        data.forEach(movie => {
            inputMovies.push({name: movie[0],description: movie[1],date: movie[2]})
        })
        setInput(inputMovies)
    }

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


    const handleSubmit = async ()=> {
        console.log(input)
        let filteredMovies:IMovies[] = []
        input.forEach((movie:IMovies) => {
            let includes = false
            movies.forEach((oldMovie:IMovies) => {
                if(oldMovie.name===movie.name) includes=true
            });
            if (includes===false) {
                if(!filteredMovies.some(filterMovie => filterMovie.name === movie.name)) filteredMovies.push(movie)
            }
        })
        if(filteredMovies.length===0){
            swal('Movies already exist')
        } else {
            await axios.post(`${url}/movies`,filteredMovies).then(resp => console.log(resp))
            // props.afterSubmit()
            swal('Movies updated')
        }
    }

    return (
        <Container className="mt-5 justify-content-center bg-light border shadow w-50 p-5">
            <h3 className='mb-5'>Upload movies from csv file</h3>
            <CSVReader onFileLoaded={fileLoad} />
            <Button className='mt-3' onClick={handleSubmit}>Submit</Button>
        </Container>
    )
}
