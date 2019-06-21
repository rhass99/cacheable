const crypto = require('crypto');

// Generares a unique MD5 Hash for the user ID from user Email
const generateMD5Hash = (inputToHash) => {
  let MD5Hash = crypto.createHash('md5')
  MD5Hash.update(inputToHash)
  return resultHash = MD5Hash.digest('hex')
}

module.exports  = {generateMD5Hash};
