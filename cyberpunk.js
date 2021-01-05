import Dal from "./dal";
import NotfoundError from "./errors/notfound.error";
import BadrequestError from "./errors/badrequest.error";

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

    async getMercByIdAsync(idMerc) {
        const dal = new Dal();
        const merc = await dal.getMercByIdAsync(idMerc);
        if (!merc) {
            throw new NotfoundError(`Sorry, no merc n°${idMerc} was found`);
        }
        return merc;
    }

    async getWeaponByIdAsync(idWeapon) {
        const dal = new Dal();
        const weapon = await dal.getWeaponByIdAsync(idWeapon);
        if (!weapon) {
            throw new NotfoundError(`Sorry, no weapon n°${idWeapon} was found`);
        }
        return weapon;
    }

    async createMercAsync(nickname, legalAge) {
        if (legalAge <= 0) {
            throw new BadrequestError(`Sorry, age must be higher than 0`);
        }
        const dal = new Dal();
        await dal.createMercAsync(nickname, legalAge);
    }

    async updateMercWeaponAsync(idMerc, idWeapon) {
        const dal = new Dal();
        await dal.updateMercWeaponAsync(idMerc, idWeapon);
    }
}

export const cyberpunk = new Cyberpunk();
