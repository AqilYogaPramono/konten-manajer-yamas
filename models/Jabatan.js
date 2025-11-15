const connection = require('../configs/database')

class Jabatan {
    static async getAll() {
        try {
            const [rows] = await connection.query(`SELECT * FROM jabatan`)
            return rows
        } catch (err) {
            throw err
        }
    }

    static async checkStore(data) {
        try {
            const [rows] = await connection.query(`SELECT id FROM jabatan where nama_jabatan = ?`, [data.nama_jabatan])
            return rows.length > 0
        } catch (err) {
            throw err
        }
    }

    static async store(data) {
        try {
            const [result] = await connection.query(`INSERT INTO jabatan SET ?`, [data])
            return result
        } catch (err) {
            throw err
        }
    }

    static async checkUpdate(data, id) {
        try {
            const [rows] = await connection.query(`SELECT id FROM jabatan where nama_jabatan = ? and id != ?`, [data.nama_jabatan, id])
            return rows.length > 0
        } catch (err) {
            throw err
        }
    }

    static async update(data, id) {
        try {
            const [result] = await connection.query(`UPDATE jabatan SET ? WHERE id = ?`, [data, id])
            return result
        } catch (err) {
            throw err
        }
    }

    static async getById(id) {
        try {
            const [rows] = await connection.query(`SELECT * FROM jabatan WHERE id = ?`, [id])
            return rows[0]
        } catch (err) {
            throw err
        }
    }

    static async checkUsed(id) {
        try {
            const [rows] = await connection.query(`SELECT id FROM anggota where id_jabatan = ?`, [id])
            return rows.length > 0
        } catch (err) {
            throw err
        }
    }

    static async delete(id) {
        try {
            const [result] = await connection.query(`DELETE FROM jabatan WHERE id = ?`, [id])
            return result
        } catch (err) {
            throw err
        }
    }
}

module.exports = Jabatan