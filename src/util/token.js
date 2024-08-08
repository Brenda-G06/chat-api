const jwt = require('jsonwebtoken');

const checktoken = async (token, id, key) => {
    return new Promise((resolve, reject) => {
        jwt.verify(token, key, (err, decoded) => {
            if (err) {
                return reject(err);
            }
            return resolve(decoded);
        });
    });
};

const setToken = async (id, key) => {
    if (id) {
        return jwt.sign({ id }, key, { expiresIn: 28800 });
    }
    return false;
};

module.exports = {
    checktoken,
    setToken,
};
