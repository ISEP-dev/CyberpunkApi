import mysql from 'mysql2/promise'
import UnavaibleError from "./errors/unavaible.error";

class Dal {
    async connect() {
        try {
            return await mysql.createConnection({
                host: '0.0.0.0',
                user: 'root',
                password: 'root',
                database: 'db_cyberpunk2077'
            })
        } catch (err) {
            throw new UnavaibleError();
        }
    }

    async getAllMercsAsync() {
        const connection = await this.connect()
        try {
            const [result] = await connection.query(`SELECT * FROM Mercs`)
            return result
        } catch (err) {
            throw UnavaibleError();
        } finally {
            connection.end()
        }
    }

    async getAllWeaponsAsync() {
        const connection = await this.connect()
        try {
            const [result] = await connection.query(`SELECT * FROM Weapons`)
            return result
        } catch (err) {
            throw UnavaibleError();
        } finally {
            connection.end()
        }
    }

    async getAllJobsAsync() {
        const connection = await this.connect()
        try {
            const [result] = await connection.query(`SELECT * FROM Jobs`)
            return result
        } catch (err) {
            throw UnavaibleError();
        } finally {
            connection.end()
        }
    }

    async getMercByIdAsync(idMerc) {
        const connection = await this.connect()
        try {
            const [result] = await connection.query(`SELECT * FROM Mercs WHERE id=${idMerc}`)
            return result[0]
        } catch (err) {
            throw UnavaibleError();
        } finally {
            connection.end()
        }
    }

    async getWeaponByIdAsync(idWeapon) {
        const connection = await this.connect()
        try {
            const [result] = await connection.query(`SELECT * FROM Weapons WHERE id=${idWeapon}`)
            return result[0]
        } catch (err) {
            throw UnavaibleError();
        } finally {
            connection.end()
        }
    }

    async getJobByIdAsync(idJob) {
        const connection = await this.connect()
        try {
            const [result] = await connection.query(`SELECT * FROM Jobs WHERE id=${idJob}`)
            return result[0]
        } catch (err) {
            throw UnavaibleError();
        } finally {
            connection.end()
        }
    }

    async createMercAsync(nickname, legalAge) {
        const connection = await this.connect();
        try {
            const queryString = `INSERT INTO Mercs (nickname, legalAge) VALUES ('${nickname}', '${legalAge}')`;
            await connection.query(queryString);
        } catch (err) {
            throw UnavaibleError();
        } finally {
            connection.end()
        }
    }

    async updateMercWeaponAsync(idMerc, idWeapon) {
        const connection = await this.connect();
        try {
            const queryString = `UPDATE Mercs SET idWeapon=${idWeapon} WHERE id=${idMerc}`;
            await connection.query(queryString)
        } catch (err) {
            throw UnavaibleError();
        } finally {
            connection.end()
        }
    }

    async updateMercEddiesAsync(idMerc, eddies) {
        const connection = await this.connect();
        try {
            const queryString = `UPDATE Mercs SET eddies=${eddies} WHERE id=${idMerc}`;
            await connection.query(queryString)
        } catch (err) {
            throw UnavaibleError();
        } finally {
            connection.end()
        }
    }

    async updateJobToComplete(idJob) {
        const connection = await this.connect();
        try {
            const queryString = `UPDATE Jobs SET isAvailable=${0} WHERE id=${idJob}`;
            await connection.query(queryString)
        } catch (err) {
            throw UnavaibleError();
        } finally {
            connection.end()
        }
    }
}

export default Dal