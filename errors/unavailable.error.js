class UnavailableError extends Error {
    constructor() {
        super(`Unavailable error : Sorry, the server is unavailable`);
        this.status = 503;
    }
}

export default UnavailableError;

