import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'

export default function EditPost() {
    const { id } = useParams();
    const [post, setPost] = useState("");

    useEffect(() => {
        const res = fetch(`http://localhost:5000/post/${id}`)
            .then(r => r.json()
            .then(r => setPost(r)))
    }, [id])

    return (<>

    </>)
}
