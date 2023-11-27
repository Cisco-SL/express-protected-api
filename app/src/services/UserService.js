const UserService = {

    signUp: async (user) => {
        const res = await fetch("/signup",
            {
                method: "POST",
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(user)
            }
        ).then(res => res.json());

        return res;
    },

    login: async user => {
        const res = await fetch("http://localhost:5000/login",
            {
                method: "POST",
                mode: "cors",
                credentials: "include",
                redirect: "follow",
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(user)
            }
        ).then(res => res.json());

        return res;
    },

    logout: async () => {
        return await fetch("http://localhost:5000/logout",
            {
                method: "POST",
                mode: "cors",
                credentials: "include",
                redirect: "follow",
                headers: { 'Content-Type': 'application/json' },
            }
        )
    }
};
export default UserService;