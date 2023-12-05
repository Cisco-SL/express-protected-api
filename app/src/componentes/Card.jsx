import React from 'react'
import { NavLink } from "react-router-dom";

export default function Card(props) {
    const { post } = props;


    return (<>
        <div style={{ display: "flex", maxWidth: "90%", gap: "1rem", margin: "3rem auto" }}>
            <NavLink to={`/post/${post._id}`}><img style={{ maxWidth: "150px", objectFit: "contain" }}
                src={`http://localhost:5000/images/${post.img}`} alt="=("
            /></NavLink>
            <section style={{ display: "flex", width: "100%", flexDirection: "column", justifyContent: "space-between" }}>
                <section>
                    <NavLink to={`/post/${post._id}`}><h2>{post.title}</h2></NavLink>
                    <div dangerouslySetInnerHTML={{ __html: post.summary }}></div>
                </section>
                <section style={{ display: "flex", justifyContent: "space-between" }}>
                    {/* <p>Tags: {post.tags}</p> */}
                    <p>By: {post.author.username}</p>
                </section>
            </section>
        </div>
    </>)
}
