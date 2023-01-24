class Backend {

    public url = 'https://localhost:3002'

    async signIn(login: string, password: string): Promise<{ access_token?: string, message?: string}> {
        const data = {
            email: login,
            password: password
        }

        const result = await fetch(`${this.url}/user/signIn`, {
            method: 'POST',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
            credentials: "same-origin"
        })

        const answer = await result.json()
        console.log(answer)
        return answer
    }

    async signUp(email: string, password: string) {
        const data = {
            email,
            password: password
        }

        const result = await fetch(`${this.url}/user/signUp`, {
            method: 'POST',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
            credentials: "same-origin"
        })
        return result?.json()
    }

    async files(token: string) {
        const result = await fetch(`${this.url}/file`, {
            method: 'GET',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}` 
            },
            credentials: "same-origin"
        })

        return result?.json()
    }
}

export default new Backend()