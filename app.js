import express from 'express'
import bodyParser from 'body-parser'
import {cyberpunk} from "./cyberpunk";
import UnavailableError from "./errors/unavailable.error";
import NotfoundError from "./errors/notfound.error";
import BadrequestError from "./errors/badrequest.error";

const app = express()

app.use(bodyParser.json())
app.use(function (_req, res, next) {
    res.header('Access-Control-Allow-Origin', '*')
    res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE')
    res.header(
        'Access-Control-Allow-Headers',
        'Origin, X-Requested-With, Content-Type, Accept'
    )
    next()
})

app.get('/mercs', async (req, res) => {
    try {
        const mercs = await cyberpunk.getAllMercsAsync();
        return res.status(200).set({ 'Content-Type': 'application/json' }).json(mercs);
    } catch (err) {
        if (err instanceof UnavailableError) {
            return res.status(err.status).send(err.message).end();
        } else if (err instanceof NotfoundError) {
            return res.status(err.status).send(err.message).end();
        }
    }
})

app.put('/mercs/weapons/:idMerc/:idWeapon', async (req, res) => {
    try {
        const {idWeapon, idMerc } = req.params;
        await cyberpunk.getMercByIdAsync(idMerc);
        await cyberpunk.getWeaponByIdAsync(idWeapon);
        await cyberpunk.updateMercWeaponAsync(idMerc, idWeapon);
        res.status(200).end();
    } catch (err) {
        if (err instanceof UnavailableError) {
            return res.status(err.status).send(err.message).end();
        } else if (err instanceof NotfoundError) {
            return res.status(err.status).send(err.message).end();
        }
    }
})

app.post('/mercs', async (req, res) => {
    try {
        const {nickname, legalAge } = req.body;
        const mercIdCreated = await cyberpunk.createMercAsync(nickname, legalAge);
        const mercCreated = await cyberpunk.getMercByIdAsync(mercIdCreated);
        return res.status(200).set({ 'Content-Type': 'application/json' }).json(mercCreated);
    } catch (err) {
        if (err instanceof UnavailableError) {
            return res.status(err.status).send(err.message).end();
        } else if (err instanceof BadrequestError) {
            return res.status(err.status).send(err.message).end();
        }
    }
})

app.get('/weapons', async (req, res) => {
    try {
        const weapons = await cyberpunk.getAllWeaponsAsync();
        return res.status(200).set({ 'Content-Type': 'application/json' }).json(weapons);
    } catch (err) {
        if (err instanceof UnavailableError) {
            return res.status(err.status).send(err.message).end();
        } else if (err instanceof NotfoundError) {
            return res.status(err.status).send(err.message).end();
        }
    }
})

app.get('/jobs', async (req, res) => {
    try {
        const jobs = await cyberpunk.getAllJobsAsync();
        return res.status(200).set({ 'Content-Type': 'application/json' }).json(jobs);
    } catch (err) {
        if (err instanceof UnavailableError) {
            return res.status(err.status).send(err.message).end();
        } else if (err instanceof NotfoundError) {
            return res.status(err.status).send(err.message).end();
        }
    }
})

app.post('/jobs', async (req, res) => {
    try {
        const { fixer, title, description, henchmenCount, reward } = req.body;
        const jobIdCreated = await cyberpunk.createJobAsync(fixer, title, description, henchmenCount, reward);
        const jobCreated = await cyberpunk.getJobByIdAsync(jobIdCreated);
        return res.status(200).set({ 'Content-Type': 'application/json' }).json(jobCreated);
    } catch (err) {
        if (err instanceof UnavailableError) {
            return res.status(err.status).send(err.message).end();
        } else if (err instanceof BadrequestError) {
            return res.status(err.status).send(err.message).end();
        }
    }
})

app.post('/jobs/complete/:idJob/:idMerc', async (req, res) => {
    try {
        const {idJob, idMerc } = req.params;
        const merc = await cyberpunk.getMercByIdAsync(idMerc);
        const job = await cyberpunk.getJobByIdAsync(idJob);

        await cyberpunk.updateJobToComplete(job);
        await cyberpunk.updateMercEddiesAsync(merc, job.reward);
        return res.status(200).end();
    } catch (err) {
        if (err instanceof UnavailableError) {
            return res.status(err.status).send(err.message).end();
        } else if (err instanceof NotfoundError) {
            return res.status(err.status).send(err.message).end();
        } else if (err instanceof BadrequestError) {
            return res.status(err.status).send(err.message).end();
        }
    }
})


export default app
