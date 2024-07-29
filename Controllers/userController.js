const User = require("../Models/user")
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken")
const { JWT_SECRET } = require("../utils");
const nodemailer = require("nodemailer");
const userController={
    signup: async (req, res)=>{
        const { name, email, password }= req.body;
        try {
            const user = await User.findOne({ name, email });
            if(!user){
                const passwordHash = await bcrypt.hash(password, 10);
                const newUser = new User({
                    name,
                    email,
                    passwordHash,
                })
                await newUser.save();
                return res.status(200).send({
                    message: "Activation Mail sent successfull to you Mail",
                    newUser,
                })
            }else{
                return res
                    .status(201)
                    .send({ message: "Existing Email Id, please login"})
            }
        } catch(e){
            res.status(500).send({ message: "signup Error", e})
            console.log("error", e);
        }
    },
    signin: async(req, res)=>{
        try{
            const { email, password }=req.body;
            const user= await User.findOne({ email, activated: true })
            console.log(user);
            if(user) {
                const passCheck = await bcrypt.compare(password, user.passwordHash);
                if(!passCheck){
                    return res.send({message: "Password is wrong"})
                }
                let token = await jwt.sign(
                    {
                        email,
                        id: user._id,
                    },
                    JWT_SECRET
                );
                res.status(200).send({ message: "Signin success", token, user})
            }else{
                res.send({ message: "No Users found"})
            }
        }catch(e){
            res.status(500).send({ message: "signin Error", e})
            console.log("error", e);
        }
    },
    activationLink: async(req, res)=>{
        try{
            const { email } = req.params;
            const user = await User.findOne({ email })

            if(!user){
                return res.status(401).json({ message: "User not found"})
            }
            const activationToken = Math.random().toString(36).slice(-7);

            user.activationToken = activationToken;
            await user.save();

            const transporter = nodemailer.createTransport({
                service: "gmail",
                auth: {
                    user: process.env.EMAIL_USER,
                    pass: process.env.EMAIL_PASS,
                }
            })
            const message = {
                from: process.env.EMAIL_USER,
                to: email,
                subject: "Account Activation Link",
                text: `You are requested to Activate your Account ,Click below Link to Activate
                
            }
        }
    }
}