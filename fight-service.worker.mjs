import * as wt from 'worker_threads';
import Merc from "./models/merc.mjs";
import Henchmen from "./models/henchmen.mjs";

const getHenchmens = (henchmenCount) => {
    let henchmens = [];
    for (let i = 1; i <= henchmenCount; i++) {
        henchmens = [...henchmens, new Henchmen(i, `Henchemen n°${i}`)];
    }
    return henchmens;
}

const fightAsync = async (striker, enemy) => {
    wt.parentPort.postMessage( `${striker.nickname} attack ${enemy.nickname} !`);
    const comment = await striker.strikeAsync(enemy);
    wt.parentPort.postMessage(comment);
}

const removeHenchmenKilled = (henchmensToFight, henchmenKilled) =>
    henchmensToFight.filter(h => henchmenKilled.id !== h.id);

wt.parentPort.on('message', async (param) => {
    const {merc, weapon, job} = wt.workerData;
    const mercAsFighter = new Merc(merc.id, merc.nickname, weapon);
    let henchmens = getHenchmens(job.henchmenCount);

    while(!!henchmens.length && mercAsFighter.isAlive) {
        const henchmenToFight = henchmens[0];
        await fightAsync(mercAsFighter, henchmenToFight);

        if (henchmenToFight.isAlive) {
            await fightAsync(henchmenToFight, mercAsFighter);
            continue;
        }

        henchmens = removeHenchmenKilled(henchmens, henchmenToFight);
    }

    const endMessage = mercAsFighter.isAlive
        ? "Yeahhhhh, very good. You congratulated the job !"
        : "Sorry boy, you are a noob...";

    wt.parentPort.postMessage(endMessage);
    wt.parentPort.emit("close");
});
