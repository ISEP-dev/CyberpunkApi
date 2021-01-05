import Dal from "./dal";
import NotfoundError from "./errors/notfound.error";

class Cyberpunk {
    constructor() {
    }

    async getAllMercsAsync() {
        const dal = new Dal();
        const mercs = await dal.getAllMercsAsync();
        if (!mercs.length) {
            throw new NotfoundError("Sorry, no mercs was found");
        }
        return mercs;
    }
}

export const cyberpunk = new Cyberpunk();
