class Fighter {
    constructor(id, nickname, damage, firerate, accuracy) {
        this.life = 100;
        this.damage = damage;
        this.id = id;
        this.nickname = nickname;
        this.firerate = firerate;
        this.accuracy = accuracy;
        this.isAlive = true;
    }

    strike(enemy) {
        const random = Math.random();
        if (random > this.accuracy) {
            return `The ${this.nickname}\'s knock failed...`;
        }

        const totalDamages = this.damage * this.firerate;
        enemy.life = enemy.life - totalDamages;
        let message = `${this.nickname} stike ${enemy.nickname} with ${totalDamages}PH`
        if (enemy.life <= 0) {
            enemy.isAlive = false;
            return `${message}. ${enemy.nickname} die!`;
        }

        return `${message}. ${enemy.nickname} has ${enemy.life}PH`;
    }

    strikeAsync = async (ennemy) => {
        let timeoutToClear;
        const promise =  await new Promise(resolve => {
            timeoutToClear = setTimeout(() => resolve(this.strike(ennemy)), 2000);
        })
        clearTimeout(timeoutToClear);
        return promise;
    }
}

export default Fighter;
