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
      description: 'Unexpected error occurred.',
    },
    errorNotStream: {
      description: "It's not a valid stream"
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

    // Return an a crypted stream
    return exits.success({
      stream: helper.encryptStream(inputs.stream, inputs.secret)
    });

  },

};
