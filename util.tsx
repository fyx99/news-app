

export const Config = {
    API_URL: "http://138.68.74.3:3000",
    API_BASE_PATH: "/app",
    API_PREFIX: "http://138.68.74.3:3000/app"
}

export const api = async (path: any, options: any) => {

    if (options === undefined) {
        options = {
            headers: {
                Accept: "application/json",
                Content: "application/json"
            },
            method: "GET"
        }
    }

    return await fetch(Config.API_PREFIX + path, options).then((res) => res.json())
        .catch((error) => console.error(error));

}