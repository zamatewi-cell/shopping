
//导入加密模块
let crypto = require('crypto');

//导入jsonwebtoken模块
let jsonwebtoken = require('jsonwebtoken');

//导入发邮件模块
let nodemailer = require('nodemailer');

//导入时间格式化模块
let moment = require('moment');

const { v1 } = require('uuid');

const fs = require('fs');

//创建发邮件实例
let transporter = nodemailer.createTransport({
  host: config.emailOptions.host,

  port: config.emailOptions.port,

  //授权验证
  auth: {
    //授权用户邮箱地址
    user: config.emailOptions.user,

    //授权码
    pass: config.emailOptions.pass
  }
});

//工具库
class Utils {

  //字符串加密
  encodeString(value) {
    //value: 被加密的字符串
    value = config.saltOptions.pwdSalt + value;

    //使用md5方式加密
    let md5 = crypto.createHash('md5');

    //对value加密
    md5.update(value);

    return md5.digest('hex');

  }


  //随机生成6位验证码
  getValidCode() {
    let codes = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z', 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z', 0, 1, 2, 3, 4, 5, 6, 7, 8, 9];

    let codeString = '';

    for (let i = 0; i < 6; i++) {
      let randomIndex = Math.floor(Math.random() * codes.length);

      codeString += codes[randomIndex];
    }

    return codeString;
  }

  //将cookie转换为普通对象
  transformCookieObject(value) {

    if (value) {
      let cookieObject = {};
      value = value.split(/; /);
      for (let i = 0; i < value.length; i++) {
        let v = value[i].split('=');
        cookieObject[v[0]] = v[1];
      }

      return cookieObject;
    }

    return null;
    
  }

  //生成token
  getToken(value, salt, time) {
    //data: 生成token的数据
    //expiresIn: 过期时间, '7d'(天), '7h'(小时), '2 days'(天), 60(秒), '1000'(毫秒)
    //salt: token加盐
    let codeToken = jsonwebtoken.sign({

      //签名数据
      data: value

    }, salt, { expiresIn: time });

    return codeToken;
  }

  //记录邮箱验证码的有效时间
  setValidExpires(o) {
    //o.success = function (err, info) {}
    jsonwebtoken.sign({

      //签名数据
      data: o.value

    }, o.salt, { expiresIn: o.expires }, o.success);
  }

  //验证token
  validToken(token, salt, fn) {
    //fn(err, info) {}
    jsonwebtoken.verify(token, salt, fn);
  }

  //格式化时间
  formatDate(dateString, format) {
    return moment(dateString).format(format);
  }

  // 获取当前时间
  nowDate() {
    return moment().format('YYYY-MM-DD hh:mm:ss');
  }

  //发邮件
  sendEmail(emails, validCode, fn) {

    //emails: 接收邮件地址列表，array
    //fn(error, info) {}
  
    //发送邮件
    transporter.sendMail({
      from: config.emailOptions.user, //邮件发送地址
      to: emails.join(','), // 邮件接收地址
      subject: "深浅咖啡-找回密码", //主题
      text: `验证码：${validCode}，5分钟内有效`
    }, fn);

  }

    //上传图片
  uploadImg(base64, imgType, imgName = '') {

    return new Promise((resolve, reject) => {
      //将图片的base64转换成二进制的Buffer类型数据
      let buffer = Buffer.from(base64, 'base64');

      //生成图片名称
      let fileName = `${imgName}${v1()}.${imgType}`;

      fs.writeFile(`${__basename}/upload/${fileName}`, buffer, err => {
        if (err) {
          reject(err);
        } else {
          //生成后台服务器的图片链接
          let imgUrl = `${config.serverOptions.hostname}/assets/${fileName}`;

          resolve(imgUrl);
        }
      })
    })


  }

}

module.exports = new Utils();