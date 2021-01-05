class NotfoundError extends Error {
    constructor(message) {
        super(`Notfound error : ${message}`);
        this.status = 404;
    }
}

export default NotfoundError;

