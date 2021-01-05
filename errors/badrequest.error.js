class BadrequestError extends Error {
    constructor(message) {
        super(`Bad Request error : ${message}`);
        this.status = 400;
    }
}

export default BadrequestError;

