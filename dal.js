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
}

export default Dal
