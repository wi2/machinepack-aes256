var algo = "aes-256-ctr";

module.exports.isStream = function(stream) {
	return require('isstream')(stream);
}

module.exports.encryptStream = function(stream, secret) {
	var cipher = require('crypto').createCipher(algo, secret);
	return stream.pipe(require('zlib').createGzip()).pipe(cipher)
}

module.exports.decryptStream = function(stream, secret, error) {
	//decrypt
	var decipher = require('crypto').createDecipher(algo, secret);
	var decryptedStream = stream.pipe(decipher);

	//unzip
	try{
		var unzippedStream = decryptedStream.pipe(require('zlib').createGunzip());
	} catch (err) {
		return error({error: "Can't unzip this stream"});
	}
	return unzippedStream;
}
