import express from 'express'
import bodyParser from 'body-parser'
import {cyberpunk} from "./cyberpunk";
import UnavaibleError from "./errors/unavaible.error";
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
        if (err instanceof UnavaibleError) {
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
        if (err instanceof UnavaibleError) {
            return res.status(err.status).send(err.message).end();
        } else if (err instanceof NotfoundError) {
            return res.status(err.status).send(err.message).end();
        }
    }
})

app.post('/mercs/:nickname/:legalAge', async (req, res) => {
    try {
        const {nickname, legalAge } = req.params;
        await cyberpunk.createMercAsync(nickname, legalAge);
        return res.status(200).end();
    } catch (err) {
        if (err instanceof UnavaibleError) {
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
        if (err instanceof UnavaibleError) {
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
        if (err instanceof UnavaibleError) {
            return res.status(err.status).send(err.message).end();
        } else if (err instanceof NotfoundError) {
            return res.status(err.status).send(err.message).end();
        }
    }
})


export default app
