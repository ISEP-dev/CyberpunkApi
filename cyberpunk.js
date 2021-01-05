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

    async getAllWeaponsAsync() {
        const dal = new Dal();
        const weapons = await dal.getAllWeaponsAsync();
        if (!weapons.length) {
            throw new NotfoundError("Sorry, no weapons was found");
        }
        return weapons;
    }

    async getAllJobsAsync() {
        const dal = new Dal();
        const jobs = await dal.getAllJobsAsync();
        if (!jobs.length) {
            throw new NotfoundError("Sorry, no jobs was found");
        }
        return jobs;
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

    async getJobByIdAsync(idJob) {
        const dal = new Dal();
        const job = await dal.getJobByIdAsync(idJob);
        if (!job) {
            throw new NotfoundError(`Sorry, no job n°${idJob} was found`);
        }
        return job;
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

    async updateMercEddiesAsync(merc, reward) {
        const dal = new Dal();
        const eddiesAfterJobCompleted = merc.eddies + reward;
        await dal.updateMercEddiesAsync(merc.id, eddiesAfterJobCompleted);
    }

    async updateJobToComplete(job) {
        const dal = new Dal();
        if (!job.isAvailable) {
            throw new BadrequestError(`Sorry the job n°${job.id} is already unavailable`);
        }
        await dal.updateJobToComplete(job.id);
    }

    async createJobAsync(fixer, title, description, henchmenCount, reward) {
        const dal = new Dal();
        if (reward <= 0) {
            throw new BadrequestError(`Sorry the reward must be higher than 0 !`);
        }
        await dal.createJobAsync(fixer, title, description, henchmenCount, reward);
    }
}

export const cyberpunk = new Cyberpunk();
