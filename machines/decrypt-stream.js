

module.exports = {

  friendlyName: 'Decrypt stream',
  description: 'Decrypt stream content and unzip it',
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
      description: 'Unexpected error occurred.',
    },
    errorNotStream: {
      description: "It's not a valid stream"
    },
    errorUnzip: {
      description: "Can not a unzip the stream"
    },
    success: {
      example:  {
        stream: "a stream"
      }
    }
  },

  fn: function (inputs,exits) {
    var helper = require("../lib/helper.js");

    if (helper.isStream(inputs.stream) !== true)
      return exits.errorNotStream({error: "It's not a valid stream"});

    var stream = helper.decryptStream(inputs.stream, inputs.secret, exits.errorUnzip);

    if (inputs.save){
      stream.pipe(fs.createWriteStream(inputs.path+".gz"));
    }

    // Return an a crypted stream
    return exits.success({
      stream: stream
    });
  },

};
