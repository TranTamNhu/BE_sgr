import DbHelper from '../helpers/DbHelper.js'

const GetAll = async () => {
    const db = await DbHelper.readDb()
    return db.User
}

const GetById = async (id) => {
    const db = await DbHelper.readDb()
    const index = db.User.findIndex(user => user.id === id)
    if (index === -1) throw new Error("Not Found")
    return db.User[index]
}

const Create = async (user) => {
    const db = await DbHelper.readDb()
    user.id = db.User.length ? Math.max(...db.User.map(u => u.id || 0)) + 1 : 1
    db.User.push(user)
    await DbHelper.writeDb(db)
}

const Update = async (id, updatedUser) => {
    const db = await DbHelper.readDb()
    const index = db.User.findIndex(user => user.id === id)
    if (index === -1) throw new Error("Not Found")
    db.User[index] = { ...db.User[index], ...updatedUser }
    await DbHelper.writeDb(db)
}

const Delete = async (id) => {
    const db = await DbHelper.readDb()
    const index = db.User.findIndex(user => user.id === id)
    if (index === -1) throw new Error("Not Found")
    db.User.splice(index, 1)
    await DbHelper.writeDb(db)
}

export default {
    GetAll,
    GetById,
    Create,
    Update,
    Delete
}
