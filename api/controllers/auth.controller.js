import User from "../modals/user.model.js"
import bcrypt from "bcrypt"
import { errorHandler } from "../utils/error.js"

export const signup = async(req,res, next) => {
    const {username, email, password} = req.body

    if(!username || !email || !password || username === '' || email === '' || password === '')
    {
        next(errorHandler(400, "All field are required"))
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