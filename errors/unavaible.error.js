class UnavaibleError extends Error {
    constructor() {
        super(`Unavaible error : Sorry, the server is unavaible`);
        this.status = 503;
    }
}

export default UnavaibleError;

