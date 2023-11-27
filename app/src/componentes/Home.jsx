import '../estilos/Home.css'
import React, { useEffect, useState } from 'react'
import Card from './Card'

export default function Home() {
  let [postList, setPostList] = useState([]);
  useEffect(() => {
    fetch("http://localhost:5000/post")
      .then(r => r.json()
        .then(r => setPostList(r)))
  }, []);

  return (<>
    {postList.length > 0 && postList.map(
      post => <Card key={post._id} post={post} />
    )}

  </>)
}

