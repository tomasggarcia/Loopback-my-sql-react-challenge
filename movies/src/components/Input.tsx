import axios from 'axios'
import React, { useState } from 'react'
import { Button } from 'react-bootstrap'
import CSVReader from 'react-csv-reader'
import {url} from '../config'

export default function Input() {

    const [input, setInput] = useState<string[]>([])
    const fileLoad = (data:any[],fileInfo:any)=> {
        let movies:string[] = []
        data.forEach(movie => {
            movies.push(movie[0])
        })
        setInput(movies)
    }

    const handleSubmit = ()=> {
        console.log(input)
        let moviesPost: string
        let mov = input.map(movie => ({name:movie}))
        console.log(mov)
        moviesPost = JSON.stringify(mov)
        console.log(moviesPost)

        axios.post(`${url}/movies`,mov).then(resp => console.log(resp))
    }
    return (
        <div>
            <CSVReader onFileLoaded={fileLoad} />
            <Button onClick={handleSubmit}>Submit</Button>
        </div>
    )
}
