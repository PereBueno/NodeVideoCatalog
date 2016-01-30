var fs = require("fs");

var getFilesFromDirWithExtension = function(directory, extension){
	return fs.readdirSync(directory).filter(function(element){
		return element.substr(element.length-3,element.length)==extension;
	});
};

exports.getFilesFromDirWithExtension = getFilesFromDirWithExtension;