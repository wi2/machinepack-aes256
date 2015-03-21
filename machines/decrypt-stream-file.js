module.exports = {

  friendlyName: 'Decrypt stream file',
  description: 'Decrypt a streamfile with source path',
  extendedDescription: '',

  inputs: {
    path: {
      example: 'file.txt.gz',
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

    if (fs.existsSync(inputs.path) !== true)
      return exits.errorFileNotFind();

    var stream = helper.decryptStream(fs.createReadStream(inputs.path), inputs.secret);

    if (inputs.save){
      var newPath = inputs.path.slice(0, -3);
      console.log("newPath",newPath);
      stream.pipe(fs.createWriteStream(newPath));
    }

    return exits.success({
      stream: stream,
      path: inputs.save ? inputs.path.slice(0, -3) : inputs.path
    });
  },

};
