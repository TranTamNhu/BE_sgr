import { ObjectId } from "mongodb";

export const ValidateUserId = (req, res, next) => {
    if (!ObjectId.isValid(req.params.id)) {
        return next(new Error("ID is invalid"));
    }
    next();
}

export const ValidateUserBody = (req, res, next) => {
    const { name, email, age, gender } = req.body;

    if (!name || !email || !/\S+@\S+\.\S+/.test(email)) {
        return next(new Error("Invalid name or email"));
    }
    if (age && typeof age !== "number") {
        return next(new Error("Age must be a number"));
    }
    if (gender && !["male", "female", "other"].includes(gender.toLowerCase())) {
        return next(new Error("Invalid gender"));
    }
    next();
}
