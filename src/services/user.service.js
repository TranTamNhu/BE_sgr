// import DbHelper from '../helpers/DbHelper.js'

// const GetAll = async () => {
//     const db = await DbHelper.readDb()
//     return db.User
// }

// const GetById = async (id) => {
//     const db = await DbHelper.readDb()
//     const index = db.User.findIndex(user => user.id === id)
//     if (index === -1) throw new Error("Not Found")
//     return db.User[index]
// }

// const Create = async (user) => {
//     const db = await DbHelper.readDb()
//     user.id = db.User.length ? Math.max(...db.User.map(u => u.id || 0)) + 1 : 1
//     db.User.push(user)
//     await DbHelper.writeDb(db)
// }

// const Update = async (id, updatedUser) => {
//     const db = await DbHelper.readDb()
//     const index = db.User.findIndex(user => user.id === id)
//     if (index === -1) throw new Error("Not Found")
//     db.User[index] = { ...db.User[index], ...updatedUser }
//     await DbHelper.writeDb(db)
// }

// const Delete = async (id) => {
//     const db = await DbHelper.readDb()
//     const index = db.User.findIndex(user => user.id === id)
//     if (index === -1) throw new Error("Not Found")
//     db.User.splice(index, 1)
//     await DbHelper.writeDb(db)
// }

// export default {
//     GetAll,
//     GetById,
//     Create,
//     Update,
//     Delete
// }
import db from '../database/mongodb.js'
import { ObjectId } from "mongodb"


const mongoDB = await db.getDB()
const userCollection = mongoDB.collection("user")

// Lấy toàn bộ users (có thể thêm filter nếu cần)
const GetAll = async (filter = {}) => {
    const users = await userCollection.find(filter).toArray();
    return users;
}

// Lấy user theo ID
const GetById = async (id) => {
    const objectId = new ObjectId(id);
    const user = await userCollection.findOne({ _id: objectId });
    if (!user) {
        throw new Error("User not found");
    }
    return user;
}

// Thêm user mới
const Post = async (body) => {
    const newUser = {
        name: body.name,
        email: body.email,
        age: body.age,
        gender: body.gender,
        isActive: body.isActive ?? true,
        joinedAt: new Date(),
        roles: body.roles ?? ["user"]
    }
    const result = await userCollection.insertOne(newUser);
    return { ...newUser, _id: result.insertedId };
}

// Cập nhật user theo ID
const PutById = async (id, body) => {
    // Kiểm tra xem ObjectId có hợp lệ không
    if (!ObjectId.isValid(id)) {
        console.log('Invalid ObjectId:', id); // Log ID không hợp lệ
        throw new Error('Invalid ObjectId');
    }

    const objectId = new ObjectId(id);

    try {
        // Thực hiện cập nhật người dùng
        const result = await userCollection.findOneAndUpdate(
            { _id: objectId },
            { $set: body },
            { returnDocument: 'after' }
        );

        // Nếu không tìm thấy người dùng
        if (!result.value) {
            console.log('User not found. ID:', id); // Log khi không tìm thấy người dùng
            throw new Error("User not found");
        }

        console.log('User updated successfully:', result.value); // Log khi cập nhật thành công
        return result.value;
    } catch (error) {
        console.error('Error updating user:', error.message); // Log lỗi
        throw error; // Ném lỗi ra ngoài để xử lý ở tầng gọi
    }
}


// Xoá user theo ID
const DeleteById = async (id) => {
    if (!ObjectId.isValid(id)) {
        throw new Error("Invalid ObjectId");
    }

    const objectId = new ObjectId(id);
    const result = await userCollection.deleteOne({ _id: objectId });

    if (result.deletedCount === 0) {
        throw new Error("User not found");
    }

    return { message: "Deleted successfully", id };
}



const GetByField = async (field, value) => {
    const query = {};

    if (field === '_id') {
        if
// Lấy user theo trường cụ thể (ví dụ: age, email, isActive,...)
 (!ObjectId.isValid(value)) return [];
        query[field] = new ObjectId(value);
    }
    else if (field === 'age') {
        const numericValue = parseInt(value, 10);
        if (isNaN(numericValue)) return []; // Bỏ qua nếu không phải số
        query[field] = numericValue; // Tìm kiếm theo số
    } 
    else if (field === 'isActive') {
        if (value.toLowerCase() === 'true') {
            query[field] = true;
        } else if (value.toLowerCase() === 'false') {
            query[field] = false;
        } else {
            return [];
        }
    }
    else {
        query[field] = value;
    }

    const users = await userCollection.find(query).toArray();
    return users;
};

export default {
    GetAll,
    GetById,
    Post,
    PutById,
    DeleteById,
    GetByField
}
