import CryptoJS from 'crypto-js';
export const encryptData = (data, salt) =>
    CryptoJS.AES.encrypt(JSON.stringify(data), salt).toString();
