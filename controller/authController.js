import User from "../model/user.js";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"

export const signUp = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        if (!name || !email || !password) {
            return res.status(500).send("All fields are required")
        }
        if (password.length < 6) {
            return res.status(500).send("Atleast 6 char needed in password")
        }

        const existingUser = await User.findOne({ email })
        if (existingUser) {
            return res.status(500).send("User Already exists")
        }

        const hashedPassword = await bcrypt.hash(password, 10)

        const newUser = await User.create({
            name,
            email,
            password: hashedPassword
        })

        res.status(201).json({
            message: "User Created...",
            user: {
                id: newUser._id,
                name: newUser.name,
                email: newUser.email
            }
        })
    } catch (error) {
        res.status(500).send({ "Error": error.message })
    }
}


export const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(500).send("All fields are required")
        }

        const existUser = await User.findOne({ email })
        if (!existUser) {
            return res.status(500).send("Invalid Fields..")
        }

        const isMatch = await bcrypt.compare(password, existUser.password)
        if (!isMatch) {
            return res.status(500).send("Invalid Fields..")
        }

        const token = jwt.sign(
            { id: existUser._id, email: existUser.email },
            process.env.SECRET_KEY,
            { expiresIn: "1d" }
        )

        res.status(200).json({
      message: "Login successful",
      token,
      user: {
        id: existUser._id,
        name: existUser.name,
        email: existUser.email,
      },
    });
    } catch (error) {
        res.status(500).send({ "Error": error.message })
    }
}