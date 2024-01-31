import User from "../modals/user.model.js"
import bcrypt from "bcrypt"
import { errorHandler } from "../utils/error.js"
import jwt from "jsonwebtoken"

export const signup = async(req,res, next) => {
    const {username, email, password} = req.body
    if(!username || !email || !password || username === '' || email === '' || password === '')
    {
        return next(errorHandler(400, "All field are required"))
    }
    const hashedPassword = bcrypt.hashSync(password, 10);

    const newUser = new User({
        username,
        email,
        password:hashedPassword
    })

    try{
        await newUser.save()
    res.json({message: "signup succesful"})
    }catch(err){
        next(err)
    }
}

export const signin = async(req,res,next)=>{
    const {email, password} = req.body
    if(!email || !password || email === '' || password === '')
    {
        return next(errorHandler(400, "All field are required"))
    }

    try{
        const validUser = await User.findOne({email})
        if(!validUser)
        {
            return next(errorHandler(404, "User not found"))
        }

        const validPassword = bcrypt.compareSync(password, validUser.password)
        console.log(validPassword)
        if(!validPassword)
        {
            return next(errorHandler(400, "Invalid password"))
        }

        const token = jwt.sign({
            id: validUser._id
        }, process.env.JWT_SECRET)

        const {password: pass, ...rest} = validUser._doc
        
        res.status(200).cookie('access_token',token, {
            httpOnly: true
        }).json(rest)



    }catch(err)
    {
        next(err)
    }
}