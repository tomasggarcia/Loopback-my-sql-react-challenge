import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Button, Container } from 'react-bootstrap'
import CSVReader from 'react-csv-reader'
import swal from 'sweetalert'
import {url} from '../config'
import IMovies from '../interfaces/movies'

export default function Input() {
    const [movies, setMovies] = useState<IMovies[]>([]);
    const [input, setInput] = useState<string[]>([])
    const fileLoad = (data:any[],fileInfo:any)=> {
        let movies:string[] = []
        data.forEach(movie => {
            movies.push(movie[0])
        })
        setInput(movies)
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

        let filteredMovies:any[] = []
        console.log(movies)
        console.log(input)
        input.forEach((movie:string) => {
            let includes = false
            movies.forEach((oldMovie:any) => {
                if(oldMovie.name===movie) includes=true
            });
            if (includes===false) {
                if(!filteredMovies.includes(movie)) filteredMovies.push(movie)
            }
        })
        let sendMovies = filteredMovies.map(movie => ({name:movie}))

        console.log(filteredMovies)
        await axios.post(`${url}/movies`,sendMovies).then(resp => console.log(resp))
        // props.afterSubmit()
        swal('Movies updated')
    }

    return (
        <Container className="mt-5 justify-content-center bg-light border shadow w-50 p-5">
            <h3 className='mb-5'>Upload movies from csv file</h3>
            <CSVReader onFileLoaded={fileLoad} />
            <Button className='mt-3' onClick={handleSubmit}>Submit</Button>
        </Container>
    )
}
