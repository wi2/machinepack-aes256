module.exports = {

  friendlyName: 'Encrypt stream file',
  description: 'Encrypt a streamfile with source path',
  extendedDescription: '',

  inputs: {
    path: {
      example: 'file.txt',
      description: 'a path',
      required: true
    },
    secret: {
      example: 'a secure phrase or password',
      description: 'a secure phrase',
      required: true
    },
    save: {
      example: true,
      description: 'a boolean, saving in the same folder',
      required: false
    }
  },

  defaultExit: 'success',

  exits: {
    error: {
      description: 'Unexpected error occurred.',
    },
    errorFileNotFind: {
      description: 'Error: File not find.',
    },
    success: {
      description: 'Done.',
    },
  },

  fn: function (inputs,exits) {
    var helper = require("../lib/helper.js");
    var fs = require("fs");
    if (require('exists-sync')(inputs.path) !== true)
      return exits.errorFileNotFind();

    var stream = helper.encryptStream(fs.createReadStream(inputs.path), inputs.secret);

    if (inputs.save){
      stream.pipe(fs.createWriteStream(inputs.path+".gz"));
    }

    return exits.success({
      stream: stream,
      path: inputs.save ? inputs.path+".gz" : inputs.path
    });
  },

};
