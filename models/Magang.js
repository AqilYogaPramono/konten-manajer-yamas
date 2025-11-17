const connection = require('../configs/database')

class Magang {
    static async countMagang() {
        try {
            const [rows] = await connection.query(`SELECT COUNT(id) AS count_magang FROM magang`)
            return rows
        } catch (err) {
            throw err
        }
    }

    static async getAll() {
        try {
            const [rows] = await connection.query(`SELECT * FROM magang ORDER BY id DESC`)
            return rows
        } catch (err) {
            throw err
        }
    }

    static async getById(id) {
        try {
            const [rows] = await connection.query(`SELECT * FROM magang WHERE id = ?`, [id])
            return rows[0]
        } catch (err) {
            throw err
        }
    }

    static async store(data) {
        try {
            const [result] = await connection.query(`INSERT INTO magang SET ?`, [data])
            return result
        } catch (err) {
            throw err
        }
    }

    static async update(data, id) {
        try {
            const [result] = await connection.query(`UPDATE magang SET ? WHERE id = ?`, [data, id])
            return result
        } catch (err) {
            throw err
        }
    }

    static async delete(id) {
        try {
            const [result] = await connection.query(`DELETE FROM magang WHERE id = ?`, [id])
            return result
        } catch (err) {
            throw err
        }
    }

    static async addPhotos(idMagang, photos = []) {
        if (!photos.length) return
        const insertQuery = `INSERT INTO foto_kegiatan_magang (foto, id_magang) VALUES (?, ?)`

        try {
            for (const foto of photos) {
                await connection.query(insertQuery, [foto, idMagang])
            }
        } catch (err) {
            throw err
        }
    }

    static async getPhotos(idMagang) {
        try {
            const [rows] = await connection.query(`SELECT * FROM foto_kegiatan_magang WHERE id_magang = ? ORDER BY id DESC`, [idMagang])
            return rows
        } catch (err) {
            throw err
        }
    }

    static async getPhotosByIds(ids = []) {
        if (!ids.length) return []
        try {
            const [rows] = await connection.query(`SELECT * FROM foto_kegiatan_magang WHERE id IN (?)`, [ids])
            return rows
        } catch (err) {
            throw err
        }
    }

    static async deletePhotosByIds(ids = []) {
        if (!ids.length) return
        try {
            await connection.query(`DELETE FROM foto_kegiatan_magang WHERE id IN (?)`, [ids])
        } catch (err) {
            throw err
        }
    }
}

module.exports = Magang