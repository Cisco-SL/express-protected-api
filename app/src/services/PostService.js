const API = "http://localhost:5000";

class PostService {

    async post(post) {
        const res = await fetch(API + "/post",
            {
                method: "POST",
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(post)
            }
        ).then( res => res.json())

        console.log(res)

    }

    async logout() {

    }
}

export default new PostService;