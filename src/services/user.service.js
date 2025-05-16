import User from '../models/user.model.js'
import bcrypt from "bcryptjs"
import { ObjectId } from 'mongodb'
import jwt from "jsonwebtoken"
import { mailService } from '../configs/sendMail.config.js'
import { GetExpiredOtp, RandomOTP } from '../util/otpUtil.js'
import { GetTimeNow,  GetCurrentDate} from '../util/dateUtil.js'
class UserService{
    constructor()
    {
        this.user = User
    }
    async ResetPassword(otp, email, newPassword) {
    try {
        const user = await User.findOne({ 
            email,
            otp,
            otpExpire: { $gt: GetTimeNow() } 
        });

        if (!user) {
            return null; 
        }

        user.password = newPassword;
        user.otp = undefined;
        user.otpExpire = undefined;
        
        const updatedUser = await user.save();

        await mailService.sendMail({
            emailFrom: process.env.MAIL_FROM,
            emailTo: email,
            emailSubject: 'Password Reset Successful',
            emailText: 'Your password has been successfully reset.'
        });

        return updatedUser;
    } catch (error) {
        throw error;
        }
    }
    async ForgotPassword(email)
    {
      try
      {
        const user = await this.user.findOne({email})
        if(!user)
        {
          throw new Error("User with " + email + " not found!");
        }
        const otp = RandomOTP();
        const otpExpire = GetExpiredOtp();
        const updatedUser = await this.user.findByIdAndUpdate(
            user._id,
            { 
                otp: otp,
                otpExpire: otpExpire 
            },
            { new: true } 
        );
        const mailOptions = {
            emailFrom: "supabakaniga@gmail.com",
            emailTo: email,
            emailSubject: "Reset Password OTP",
            emailText: `Your password reset OTP: ${otp}\nThis OTP will expire in 5 minutes.`
        };

        const result = await mailService.sendMail(mailOptions);
        if(!result)
        {
            throw new Error("Error while reset pw: " + error.message);
        }
        return {
            message: "OTP sent successfully",
            userId: updatedUser._id,
            otpExpiresAt: new Date(otpExpire)
        };
      }
      catch(error)
      {
        throw new Error("Error: " + error.message)
      }
    }

    async Login(data)
    {
        try
        {
            const user = await this.user.findOne({email: data.email})
            console.log(user)
            const isMatch = await bcrypt.compare(data.password, user.password);
            console.log(data.password)
            console.log(user.password)
            console.log(isMatch)
            if(!user || !isMatch)
            {
                throw new Error("Wrong email or password!");
            }
            const accessToken = jwt.sign({userId: user._id}, process.env.SECRET_KEY, {expiresIn: '30m'})
            const refreshToken = jwt.sign({userId: user._id}, process.env.SECRET_KEY, {expiresIn: '3d'})
            console.log(accessToken)
            console.log(refreshToken)
            return {accessToken, refreshToken}
        }
        catch(error)
        {
            throw new Error('Error while loginn!' + error.message);
        }
    }
    async Register(user)
    {
        try
        {
        const isExist = await this.user.findOne({email: user.email});
        if(isExist)
        {
            throw new Error("User already exists")
        }
        const hashedPassword = await bcrypt.hash(user.password, 10);
        console.log(hashedPassword)
        const newUser = new this.user({
            ...user,
            password: hashedPassword,
        });
        const save = await newUser.save();
        return save
        }
        catch(error)
        {
            throw new Error("Error while registering user!: " + error.message);
        }
    }  
    async GetAll() {
        try
        {
            return await this.user.find();
        }
        catch(error)
        {
            throw new Error('Error while getting users: ' + error.message)
        }
    }
  
    async GetById(id) {
        try
        {
            const user = await this.user.findById(id)
            if(!user)
            {
                throw new Error("User not found")
            }
            return user
        }
        catch(error)
        {
            throw new Error("Error while find user by id: " + + error.message)
        }
    }
  
    async Create(user) {
        try
        {
            const newUser = new this.user(user)
            return await newUser.save()
        }
        catch(error)
        {
            throw new Error("Error while create new user: " + error.message)
        }
    }
  
    async Update(id, user) {
        try
        {
            const updateUser = this.user.findByIdAndUpdate(
                id,
                user,
                {new: true}
            )
            if(!updateUser)
            {
                throw new Error("User not found")
            }
            return updateUser;
        }
        catch(error)
        {
            throw new Error("Error while update user: " + + error.message)
        }
    }
  
    async Delete(id) {
        try{
            const deleteUser = this.user.findByIdAndDelete(id)
            if (!deleteUser) {
                throw new Error('User not found')
            }
            return deleteUser
        }
        catch(error)
        {
            throw new Error('Error while delete user: ' + + error.message)
        }
    }
}

export default new UserService()