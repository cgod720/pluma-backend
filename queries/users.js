const db = require('../db/dbConfig');
const bcrypt = require('bcrypt');


const createUser = async (user) => {
    const salt = 10;
    const hash = await bcrypt.hash(user.password, salt);
    const newUser = await db.one("INSERT INTO users (username, email, password, profile_picture) VALUES($1, $2, $3) RETURNING *", [user.username, user.email, hash]);
    return newUser;
}

const getUsers = async () => {
    const users = await db.any("SELECT * FROM users");
    return users;
};

const getUser = async (userId) => {
    const user = await db.one("SELECT * FROM users WHERE user_id=$1", userId);
    return user;
};

const logInUser = async (user) => {
    console.log(user);
    const loggedInUser = await db.oneOrNone("SELECT * FROM users WHERE username=$1", [user.username]);
    console.log(loggedInUser);

    if (!loggedInUser) {
        return res.status(401).json({ error: 'Invalid username or password.' });
    }

    const passwordMatch = await bcrypt.compare(user.password, loggedInUser.password);


    if (!passwordMatch) {
        return res.status(401).json({ error: 'Invalid username or password.' });
    }

    return loggedInUser;
};



module.exports = { createUser, getUsers, logInUser, getUser };