const crypto = require('crypto');

const algorithm = 'aes-256-cbc';
const ENC_KEY = crypto.scryptSync(process.env.ACCESS_SECRET, process.env.SECRET_SALT, 16).toString('hex');
const IV = '677309994c59e6db';

module.exports = {
  encrypt: (val) => {
    const cipher = crypto.createCipheriv(algorithm, ENC_KEY, IV);
    let encrypted = cipher.update(val, 'utf8', 'base64');
    encrypted += cipher.final('base64');
    return encrypted;
  },
  decrypt: (encrypted) => {
    const decipher = crypto.createDecipheriv(algorithm, ENC_KEY, IV);
    const decrypted = decipher.update(encrypted, 'base64', 'utf8');
    return (decrypted + decipher.final('utf8'));
  },
};
