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


    async updateMercWeaponAsync(idMerc, idWeapon) {
        const dal = new Dal();
        await dal.updateMercWeaponAsync(idMerc, idWeapon);
    }
}

export const cyberpunk = new Cyberpunk();
