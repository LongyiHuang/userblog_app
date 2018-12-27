//AES加密工具
var crypto = require('crypto-js');
//RSA加密工具
const JSEncrypt = require("jsencrypt"); // 引入模块

//AES加密初始向量
const iv = "liangzhanmingrix";

const dataSeparator = "data_separator";


//baize加密
const baizeEncrypt = (data,publicKey) => {
    var result = "";
    if (data != null || data !== ""){
        //获取AES加密秘钥
        const aesKey = getAesKey();
        // console.log("aesKey:"+aesKey);
        //用AES加密明文数据
        const dataAfterAes = getAesEncryptString(data, aesKey, iv);
        // console.log("dataAfterAes:" + dataAfterAes);
        //用RSA加密AES加密秘钥
        const keyAfterRsa = getRsaEncryptString(aesKey, publicKey);
        // console.log("keyAfterRsa:" + keyAfterRsa);
        //拼凑密文
        result = dataAfterAes + dataSeparator + keyAfterRsa;
    }
    return result;
}


//AES加密
const getAesEncryptString = (data, key, iv) => {
    const key2 = crypto.enc.Utf8.parse(key);;
    const iv2 = crypto.enc.Utf8.parse(iv);
    return crypto.AES.encrypt(data, key2, {
        iv: iv2,
        mode: crypto.mode.CBC,
        padding: crypto.pad.ZeroPadding
    });
};


// //RSA加密
const getRsaEncryptString = (data, publicKey) => {
  const jencrypt = new JSEncrypt.JSEncrypt(); // 实例化加密对象
  jencrypt.setPublicKey(publicKey);
  return jencrypt.encrypt(data) // 加密明文
};



//获取随机16位字符串
const randomString = (length) => {
    let text = "";
    const possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    for (let i = 0; i < length; i++) {
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
};

//获取AES加密秘钥
var keyLength = 16;
const getAesKey = () => {
    return randomString(keyLength);
};


export default  {
    baizeEncrypt:baizeEncrypt,
};



