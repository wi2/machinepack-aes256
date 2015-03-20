module.exports = {

  friendlyName: 'Encrypt stream',
  description: 'Encrypt stream content and zip it',
  extendedDescription: '',

  inputs: {
    stream: {
      example: 'a stream',
      description: 'a stream',
      required: true
    },
    secret: {
      example: 'a secure phrase or password',
      description: 'a secure phrase',
      required: true
    }
  },

  defaultExit: 'success',

  exits: {
    error: {
      description: 'An unexpected error occurred.'
    },
    success: {
      example:  {
        stream: "a stream"
      }
    }
  },

  fn: function (inputs,exits) {
    if (require('isstream')(inputs.stream) !== true)
      return exits.error({error: "It's not a valid stream"});

    var algorithm = "aes-256-ctr";
    var cipher = require('crypto').createCipher(algorithm, inputs.secret)
    // Return an a crypted stream
    return exits.success({
      stream: inputs.stream.pipe(require('zlib').createGzip()).pipe(cipher)
    });

  },

};
