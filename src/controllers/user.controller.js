import userService from "../services/user.service.js";
import {mailService} from "../configs/sendMail.config.js";
import jwt from "jsonwebtoken";

class UserController {

  async SendEmail(req, res, next) {
    try {
      const email = req.body.email;
      
      if (!email) {
        return res.status(400).json({message: "Email is required"});
      }

      const mailOptions = {
        emailFrom: process.env.EMAIL_FROM || "DucHuySGroup@gmail.com",
        emailTo: email,
        emailSubject: "Test Email",
        emailText: "This is a test email",
      }
    
      const result = await mailService.sendMail(mailOptions);
      if(!result) {
        return res.status(404).json({message: "Error sending email"});
      }
      console.log("result: ", result);
      return res.status(200).json({message: "Email sent successfully", data: result});
    } catch (err) {
      next(err);
      return res.status(500).json({message: "Error sending email", error: err.message});
    }
  }

  async Login(req, res, next) {
    try {
      const {email, password} = req.body;
      if (!email || !password) {
        return res.status(400).json({message: "Email and password are required"});
      }
      console.log("controller: ", email, password);

      const token = await userService.Login(email, password);
      if (!token) {
        return res.status(404).json({message: "Error logging in user at service"});
      }
      
      return res.status(200).json({message: "Login successfully", data: token});
    } catch (err) {
      next(err);
      return res.status(500).json({message: "Error logging in user", error: err.message});
    }
  }

  async Register(req, res) {
    try {
      const {username, email, password} = req.body;
      
      if (!username || !email || !password) {
        return res.status(400).json({message: "Username, email and password are required"});
      }

      const user = await userService.Register(username, email, password);
      if (!user) {
        return res.status(404).json({message: "Error registering user at service"});
      }
      return res.status(201).json({message: "User registered successfully", data: user});
    } catch (err) {
      return res.status(500).json({message: "Error registering user", error: err.message});
    }
  }

  async GetAll(req, res, next) {
    try {
      const users = await userService.GetAll();
      return res.status(200).json({ data: users });
    } catch (error) {
      next(error);
    }
  } 

  async GetById(req, res, next) {
    try {
      const id = req.params.id;
      const user = await userService.GetById(id);
      if (!user) {
        return res.status(404).json({message: "User not found"});
      }
      return res.status(200).json({ data: user });
    } catch (error) {
      next(error);
    }
  }

  async Create(req, res, next) {
    try {
      const body = req.body;
      const newUser = await userService.Create(body);
      if (!newUser) {
        return res.status(400).json({message: "Bad Request"});
      }
      return res.status(201).json({ data: newUser });
    } catch (error) {
      next(error);
    }
  }

  async Update(req, res, next) {
    try {
      const id = req.params.id;
      const body = req.body;
      const updatedUser = await userService.Update(id, body);
      if (!updatedUser) {
        return res.status(404).json({message: "User not found"});
      }
      return res.status(200).json({message: "Updated Successfully", data: updatedUser});
    } catch (error) {
      next(error);
    }
  }

  async Delete(req, res, next) {
    try {
      const id = req.params.id;
      const deleted = await userService.Delete(id);
      if (!deleted) {
        return res.status(404).json({message: "User not found"});
      }
      return res.status(200).json({message: "Deleted Successfully"});
    } catch (error) {
      next(error);
    }
  }

  async ForgotPassword(req, res, next) {
    try {
      const email = req.body.email;
      if (!email) {
        return res.status(400).json({message: "Email is required"});
      }
      const result = await userService.ForgotPassword(email);
      if (!result) {
        return res.status(404).json({message: "Error sending email"});
      }
      return res.status(200).json({message: "OTP sent successfully to your email"});
    } catch (error) {
      next(error);
      return res.status(500).json({message: "Error in forgot password process", error: error.message});
    }
  }

  async ResetPassword(req, res, next) {
    try {
      const otp = req.body.otp;
      const email = req.body.email;
      const password = req.body.password;
      
      if (!otp || !email || !password) {
        return res.status(400).json({message: "OTP, email and new password are required"});
      }
      
      const result = await userService.ResetPassword(otp, email, password);
      if (!result) {
        return res.status(404).json({message: "Error resetting password"});
      }
      return res.status(200).json({message: "Password reset successfully"});
    } catch (error) {
      next(error);
      return res.status(500).json({message: "Error resetting password", error: error.message});
    }
  }
}

export default new UserController();