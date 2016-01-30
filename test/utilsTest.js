var utils = require('../libs/utils');
var chai = require('chai');

var DIR = './test';
var VIDEO_EXT = 'mp4';

describe('getFilesFromDirWithExtension', function(){
	it("Should get any (more than 0) files from the dir", function(){
		chai.assert.isAbove(utils.getFilesFromDirWithExtension(DIR, VIDEO_EXT).length, 0);
	})
});