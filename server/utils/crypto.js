// server/utils/crypto.js
// 사용자 규칙 8번(강력한 보안 및 암호화)을 준수하기 위해 작성된 모듈입니다.
// 사용자의 입력 텍스트를 DB에 저장하기 전에 암호화하고, 필요시 복호화합니다.

const crypto = require('crypto');
require('dotenv').config();

// 환경 변수에서 암호화 키를 가져옵니다. (32바이트여야 함)
// .env 파일에 ENCRYPTION_KEY가 정의되어 있어야 합니다.
const ENCRYPTION_KEY = process.env.ENCRYPTION_KEY || 'your-default-secret-key-32-chars!!'; 
const IV_LENGTH = 16; // AES 알고리즘을 위한 초기화 벡터 길이

/**
 * 텍스트를 암호화합니다.
 * @param {string} text - 암호화할 원문
 * @returns {string} - 'iv:암호문' 형태의 문자열
 */
function encrypt(text) {
    if (!text) return text;
    
    const iv = crypto.randomBytes(IV_LENGTH);
    const cipher = crypto.createCipheriv('aes-256-cbc', Buffer.from(ENCRYPTION_KEY), iv);
    let encrypted = cipher.update(text);
    
    encrypted = Buffer.concat([encrypted, cipher.final()]);
    
    // 복호화 시 IV가 필요하므로 함께 저장합니다.
    return iv.toString('hex') + ':' + encrypted.toString('hex');
}

/**
 * 암호화된 텍스트를 복호화합니다.
 * @param {string} text - 'iv:암호문' 형태의 문자열
 * @returns {string} - 복호화된 원문
 */
function decrypt(text) {
    if (!text || !text.includes(':')) return text;
    
    const textParts = text.split(':');
    const iv = Buffer.from(textParts.shift(), 'hex');
    const encryptedText = Buffer.from(textParts.join(':'), 'hex');
    const decipher = crypto.createDecipheriv('aes-256-cbc', Buffer.from(ENCRYPTION_KEY), iv);
    
    let decrypted = decipher.update(encryptedText);
    decrypted = Buffer.concat([decrypted, decipher.final()]);
    
    return decrypted.toString();
}

module.exports = { encrypt, decrypt };
