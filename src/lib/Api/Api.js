export default class Api {

    static host = "localhost"
    static port = 3030

    getApiUrl() {
        return `http://${Api.host}`
    }

    async getUserData() {
        let data
        await fetch(`/account`)
            .then(res => res.json())
            .then(res => {
                data = res
            })
        return data
    }
}
