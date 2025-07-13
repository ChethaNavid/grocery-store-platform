import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { User } from '../models/user.js';
import { Role } from '../models/role.js';
import dotenv from 'dotenv';
dotenv.config();

// POST /create-account
const createNewAccount = async(req, res) => {

    const {username, email, phoneNumber, password} = req.body;

    if(!username) return res.status(400).json({ error: "Username is required."});

    if(!email) return res.status(400).json({ error: "Email is required." });

    if(!phoneNumber) return res.status(400).json({ error: "Phone number is required." });

    if(!password) return res.status(400).json({ error: "Password is required."});

    try {

        const existingUser = await User.findOne({
            where: { email }
        })

        if(existingUser) {
            return res.status(409).json({ error: true, message: "User already exists." })
        }

        const harshedPassword = await bcrypt.hash(password, 10);
        const defaultRole = await Role.findOne({ where: { name: "customer" } });
        const newUser = await User.create({ username, email, phoneNumber, password: harshedPassword, roleId: defaultRole.id });

        const user = {
            id: newUser.id,
            username: newUser.username,
            email: newUser.email,
            phoneNum: newUser.phoneNumber,
            roleId: newUser.roleId
        };

        const accessToken = jwt.sign(
            { user_id: user.id, email: user.email, role: defaultRole.name},
            process.env.ACCESS_TOKEN_SECRET, {expiresIn: "30m"}
        );
        
        res.status(201).json({ 
            error: false,
            user,
            message: "Registration Successful", 
            token: accessToken,
        });

    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: true, message: "Internal Server Error" });
    }
}

// POST /login
const login = async(req, res) => {

    const {email, phoneNumber, password} = req.body;

    if((!email && !phoneNumber) || (email && phoneNumber)) {
        return res.status(400).json({ error: true, message: "Provide either email or phone number." });
    }

    if(!password) return res.status(400).json({ error: true, message: "Password is required." });

    const existingUser = await User.findOne({
        where: email? {email} : {phoneNumber},
        include: [{
            model: Role, 
            attributes: ['name']
        }]
    });
    if(!existingUser) return res.status(401).json({ error: true, message: "Invalid credentials" });

    const isMatch = await bcrypt.compare(password, existingUser.password);
    if(!isMatch) {
        return res.status(401).json({ error: true, message: "Invalid credentials" });
    }

    const accessToken = jwt.sign(
        { user_id: existingUser.id, username: existingUser.username, email: existingUser.email, role: existingUser.Role?.name },
        process.env.ACCESS_TOKEN_SECRET, {expiresIn: "36000m"}
    );

    res.status(200).json({
        error: false,
        user: {
            email: existingUser.email,
            role: existingUser.Role?.name
        },
        message: "Login successful",
        token: accessToken,
    });
}

// GET /get-user
const getUser = async (req, res) => {

    const { user_id } = req.user;

    const existingUser = await User.findOne({
        where: { id: user_id },
        include: [{
            model: Role, 
            attributes: ['name']
        }]
    })
    if(!existingUser) {
        return res.status(404).json({ error: true, message: "User not found."});
    } 

    const user = {
        id: existingUser.id,
        username: existingUser.username,
        email: existingUser.email,
        phoneNumber: existingUser.phoneNumber,
        role: existingUser.Role?.name
    };

    return res.status(200).json({
        error: false,
        user,
        message: "Logged-in user retrieved successfully.",
    })
}

export {createNewAccount, login, getUser};