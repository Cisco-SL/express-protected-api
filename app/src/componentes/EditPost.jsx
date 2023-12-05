import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useNavigate } from "react-router-dom";
import Editor from './Editor';

export default function EditPost() {
    const { id } = useParams();
    const [title, setTitle] = useState("");
    const [summary, setSummary] = useState("");
    const [body, setBody] = useState("");
    const [tags, setTags] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        fetch(`http://localhost:5000/post/${id}`)
            .then(r => r.json()
                .then(r => {
                    setTitle(r.title);
                    setSummary(r.summary);
                    setBody(r.body);
                    setTags(r.tags);
                }))
    }, [id])


    async function handleForm(form) {
        form.preventDefault();
        fetch(`http://localhost:5000/post/${id}`,
            {
                "method": "PUT",
                "mode": "cors",
                "headers": {
                    'Content-Type': 'application/json'
                },
                "body": JSON.stringify({
                    title,
                    summary,
                    body,
                    tags
                }),
                "credentials": "include",
            }).then(p => p.json())
            .then(res => console.log(res))
    }

    return (<>
        <form id="postForm" onSubmit={handleForm}>

            <input value={title} name="title" htmlFor="title" placeholder='Set a title'
                onChange={e => setTitle(e.target.value)} />

            <input value={summary} name="summary" htmlFor="summary" placeholder='Summary'
                onChange={e => setSummary(e.target.value)} />
                
            <section style={{
                margin: "1rem auto",
                marginBottom: "3rem"
            }}>
                < Editor value={body} onChange={setBody} />
            </section>

            <section>
                <input value={tags} placeholder='Tags'
                    onChange={e => setTags(e.target.value)}
                />
            </section>

            <button id="submitButton" type='submit'>Save</button>
        </form>
    </>)
}
