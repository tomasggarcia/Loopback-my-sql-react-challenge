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
        let moviesPost = []
        // input.forEach(movie => {

        // })

        axios.post(`${url}/movies`,{name:input[0]}).then(resp => console.log(resp))
    }
    return (
        <div>
            <CSVReader onFileLoaded={fileLoad} />
            <Button onClick={handleSubmit}>Submit</Button>
        </div>
    )
}
