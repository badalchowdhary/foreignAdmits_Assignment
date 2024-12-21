const authService = require('../services/authService');


const register = async (req, res) => {
    try {
        const { name, email, password, isAdmin } = req.body;
        if (!name || !email || !password) {
            return res.status(400).json({ error: "All fields are required" });
        }

        const result = await authService.registerUser({ name, email, password, isAdmin });
        res.status(201).json(result);
    } catch (error) {
        console.log(`Error in register controller: ${error.message}`);
        if (error.message) {
            res.status(400).json({ error: error.message });
        } else {
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }
}

const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({ error: "All fields are required" });
        }

        const result = await authService.loginUser({ email, password });
        
        res.status(200).json(result);
    } catch (error) {
        console.log(`Error in login controller: ${error.message}`);
        if (error.message) {
            res.status(400).json({ error: error.message });
        } else {
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }
}

module.exports = {
    register,
    login,
}