import '../estilos/NewPost.css'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import Editor from './Editor';


export default function NewPost() {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [summary, setSummary] = useState("");
  const [body, setBody] = useState("");
  const [tags, setTags] = useState("");
  const [img, setImg] = useState("");

  async function handleForm(form) {
    form.preventDefault();
    const post = new FormData();
    post.set("title", title);
    post.set("body", body);
    post.set("summary", summary);
    post.set("tags", tags);
    post.set("img", img);
    fetch("http://localhost:5000/post",
      {
        "method": "POST",
        "mode": "cors",
        "body": post,
        "credentials": "include",
      })
      .then(r => r.json()
        .then(r => {
          if (r.ok) {
            navigate("/", { replace: true })

          } else {
            alert(r.error)
          }
        }))
  }
  return (
    <form id="postForm" encType="multipart/form-data" onSubmit={handleForm}>

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

        <input type='file' placeholder='img'
          onChange={e => setImg(e.target.files[0])}
        />
      </section>

      <button id="submitButton" type='submit'>Post</button>
    </form>
  )
}

