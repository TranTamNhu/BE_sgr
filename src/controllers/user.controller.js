import userService from "../services/user.service.js";

const GetAll = async (req, res, next) => {
    try {
        const users = await userService.GetAll();
        return res.status(200).json({ data: users });
    } catch (error) {
        next(error);
    }
}

const GetById = async (req, res, next) => {
    try {
        const id = req.params.id;
        const user = await userService.GetById(id);
        return res.status(200).json({ data: user });
    } catch (error) {
        next(error);
    }
}
const GetByField = async (req, res, next) => {
    try {
        const { field, value } = req.query;

        // ✅ Nếu không truyền field hoặc value thì gọi GetAll
        if (!field || !value) {
            const users = await userService.GetAll();
            return res.status(200).json({ data: users });
        }

        // ✅ Ngược lại, lọc theo field như bạn đã làm
        const users = await userService.GetByField(field, value);
        return res.status(200).json({ data: users });
    } catch (error) {
        next(error);
    }
};


const Create = async (req, res, next) => {
    try {
        const newUser = req.body;
        const createdUser = await userService.Post(newUser);
        return res.status(201).json({ data: createdUser });
    } catch (error) {
        next(error);
    }
}

const Update = async (req, res, next) => {
    try {
        const id = req.params.id;
        const updatedUser = req.body;

        // Log thông tin để kiểm tra
        console.log('Updating user with ID:', id);
        console.log('Updated user data:', updatedUser);

        // Gọi hàm PutById để cập nhật người dùng
        const result = await userService.PutById(id, updatedUser);
        
        // Trả về kết quả thành công
        return res.status(200).json({ data: result });
    } catch (error) {
        // Log lỗi và chuyển sang middleware xử lý lỗi
        console.error('Error:', error.message);  // Log lỗi chi tiết
        next(error);
    }
}



const Delete = async (req, res, next) => {
    try {
        const id = req.params.id;
        console.log("🟡 Deleting user with ID:", id); // Thêm dòng này

        const deletedUser = await userService.DeleteById(id);
        return res.status(200).json({ data: deletedUser });
    } catch (error) {
        console.error("🔴 Delete error:", error.message); // Ghi log lỗi cụ thể
        next(error);
    }
}
export default {
    GetAll,
    GetById,
    Create,
    Update,
    Delete,
    GetByField
};
