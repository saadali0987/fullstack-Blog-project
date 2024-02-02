import User from "../modals/user.model"
import { errorHandler } from "../utils/error.js"
import bcrypt from "bcrypt"

export const test = (req, res) => {
    res.json({ "message": "love u" })
}


export const updateUser = async (req, res, next) => {
    if (req.user.id !== req.params.userId) {
        return next(errorHandler(403, "You are not alowed to update this user"))
    }
    if (req.body.password && req.body.password.length < 6) {
        return next(errorHandler(400, "Password must have at least 6 characters"))
    }
    if (req.body.password) {
        req.body.password = bcrypt.hashSync(req.body.password, 10)
    }


    if (req.body.username) {
        if (req.body.username < 6 || req.body.username > 30) {
            return next(errorHandler(400, "Username must be between 6 and 30 characters "))
        }
        if (req.body.username.includes(' ')) {
            return next(errorHandler(400, "Username must not contain spaces"))
        }
        if (req.body.username !== req.body.username.toLowerCase()) {
            return next(errorHandler(400, "Username should be all lowercase"))
        }
        if (!req.body.username.match(/^[a-zA-z0-9]+$/)) {
            return next(errorHandler(400, "Username must not contain any special characters"))
        }

        try {
            const updatesUser = await User.findByIdAndUpdate(req.params.userId, {
                $set: {
                    username: req.body.username,
                    email: req.body.email,
                    password: req.body.password,
                    profilePicture: req.body.profilePicture
                }
            }, { new: true })

            const { password, ...rest } = updateUser._doc
            res.status(200).json(rest)
        } catch (err) {
            return next(err)
        }
    }
}

