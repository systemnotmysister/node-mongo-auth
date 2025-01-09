const Users = require("../models/user");

const registerUser = async (request, response) => {
    const { username, password, email } = request.body;

    if (username && password && email) {
        try {
            const existingUser = await Users.findOne({ $or: [{ username }, { email }] });

            if (existingUser) {
                response.status(400).send(`User ${username} or email ${email} already exists`);
                console.log(`User ${username} or email ${email} already exists`);
            } else {
                const newUser = new Users({ username, password, email });
                await newUser.save();
                console.log(`User ${username} registered successfully`);
                response.send(`User ${username} registered successfully`);
            }
        } catch (err) {
            console.error(err);
            response.status(500).send("Server error");
        }
    } else {
        response.status(400).send("Missing username, password or email");
    }
};

const authenticateUser = async (request, response) => {
    const { username, password } = request.body;

    try {
        const user = await Users.findOne({ username, password });

        if (user) {
            console.log(`Congrats ${username}, authentication succeeded!`);
            response.send(`User ${username} authenticated successfully`);
        } else {
            response.status(401).send("User doesn't exist");
            console.log("User doesn't exist");
        }
    } catch (err) {
        console.error(err);
        response.status(500).send("Server error");
    }
};

const addUser = async (request, response) => {
    const { username } = request.query;
    const generatedPassword = Math.random().toString(36).slice(-8);

    try {
        const existingUser = await Users.findOne({ username });

        if (existingUser) {
            response.status(400).send(`User ${username} already exists`);
            console.log(`User ${username} already exists`);
        } else {
            const newUser = new Users({ username, password: generatedPassword });
            await newUser.save();
            console.log(`User ${username} has been added successfully`);
            response.send(`User ${username} has been added successfully`);
        }
    } catch (err) {
        console.error(err);
        response.status(500).send("Server error");
    }
};

const deleteUser = async (request, response) => {
    const { username } = request.body;

    try {
        const user = await Users.findOne({ username });

        if (user) {
            await Users.deleteOne({ username });
            console.log(`User ${username} has been deleted successfully`);
            response.send(`User ${username} has been deleted successfully`);
        } else {
            response.status(404).send(`User ${username} doesn't exist`);
            console.log(`User ${username} doesn't exist`);
        }
    } catch (err) {
        console.error(err);
        response.status(500).send("Server error");
    }
};

const patchUser = async (request, response) => {
    const [userPrePatch, userPatch] = request.body;

    try {
        const existingUser = await Users.findOne({ username: userPrePatch.username });

        if (existingUser) {
            await Users.updateOne({ username: userPrePatch.username }, userPatch);
            console.log(`User ${userPrePatch.username} has been patched successfully`);
            response.send(`User ${userPrePatch.username} has been patched successfully, new username: ${userPatch.username}`);
        } else {
            response.status(404).send(`User ${userPrePatch.username} doesn't exist`);
            console.log(`User ${userPrePatch.username} doesn't exist`);
        }
    } catch (err) {
        console.error(err);
        response.status(500).send("Server error");
    }
};

module.exports = {
    registerUser,
    authenticateUser,
    addUser,
    deleteUser,
    patchUser,
    
};