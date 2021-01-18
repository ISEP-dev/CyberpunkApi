import Fighter from "./fighter.mjs";

class Merc extends Fighter {
    constructor(id, nickname, weapon) {
        super(id, nickname, weapon.damage, weapon.firerate, weapon.accuracy);
    }
}

export default Merc;
