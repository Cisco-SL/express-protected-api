import React, { useEffect, useState, useContext } from 'react'
import { useParams } from 'react-router-dom'
import { UserContext } from '../context/UserContextProvider';
import { NavLink, useNavigate } from "react-router-dom";

export default function Post() {
    const navigate = useNavigate();

    const { userContext, setUserContext } = useContext(UserContext);

    const { id } = useParams();
    const [post, setPost] = useState("");
    useEffect(() => {
        fetch(`http://localhost:5000/post/${id}`)
            .then(r => r.json()
                .then(r => {
                    setPost(r)
                    console.log(r)
                })
            )
    }, [post.id])
    return (
        <div style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            width: "95%",
            padding: "1rem",
            margin: "0 auto",
            boxShadow: "0 2px 10px 2px #222",
            borderRadius: "10px"
        }}>
            <section style={{
                textAlign: "center",
                marginBottom: "1rem"
            }}>
                {userContext && <div>
                    <NavLink to={`/post/${id}/edit`} >Editar</NavLink>
                </div>}
                <h1>{post.title}</h1>
            </section>

            <section>
                <p>{post.summary}</p>
            </section>
            <section
                dangerouslySetInnerHTML={{ __html: post.body }}>
            </section>

            <section style={{
                display: "flex",
                justifyContent: "space-between",
                width: "100%"
            }}>
                {/* <p>{`Tags: ${post.tags}`}</p> */}
                <p>{post && `Author: ${post.author.username}`}</p>
            </section>
        </div>
    )
}
