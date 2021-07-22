import axios from 'axios'
import React, { useState } from 'react'
import { Button } from 'react-bootstrap'
import CSVReader from 'react-csv-reader'
import swal from 'sweetalert'
import {url} from '../config'

export default function Input(props:any) {

    const [input, setInput] = useState<string[]>([])
    const fileLoad = (data:any[],fileInfo:any)=> {
        let movies:string[] = []
        data.forEach(movie => {
            movies.push(movie[0])
        })
        setInput(movies)
    }

    const handleSubmit = async ()=> {

        console.log('input', input)
        let filteredMovies:any[] = []
        input.forEach((movie:string) => {
            let includes = false
            props.allMovies.forEach((oldMovie:any) => {
                if(oldMovie.name===movie) includes=true
            });
            if (includes===false) {
                if(!filteredMovies.includes(movie)) filteredMovies.push(movie)
            }
        })
        let sendMovies = filteredMovies.map(movie => ({name:movie}))

        console.log(filteredMovies)
        await axios.post(`${url}/movies`,sendMovies).then(resp => console.log(resp))
        props.afterSubmit()
        swal('Movies updated')
    }

    return (
        <div>
            <CSVReader onFileLoaded={fileLoad} />
            <Button onClick={handleSubmit}>Submit</Button>
        </div>
    )
}
