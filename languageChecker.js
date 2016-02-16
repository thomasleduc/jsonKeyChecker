/**
 * Language Checker compare the key missing or unnecessary keys in json file.
 * 
 * Usage : 
 * node languageChecker.js <file1> <file2> [<file3>...]
 *
 * Check the following files' (file2 ...) missing keys according to the file1's keys
 */

var DEBUG = false;

function isArray(value) {
	return value && typeof value === "object" && value.constructor === Array;
}

function typeofReal(value) {
	return isArray(value) ? "array" : typeof value;
}

function compareJsonKeys(mode, referenceJson, comparedJson, keyPath) {
	if (typeof keyPath === 'undefined' || keyPath === null) {
		keyPath = '';
	}

	// missing keys
	Object.keys(referenceJson).forEach(function(key) {
		var valueKeyPath = (keyPath === '') ? key : (keyPath + ' : ' + key);

		if (DEBUG) {
			console.log(valueKeyPath);
		}

		// check the existing of the key in compared json object
		if (!comparedJson[key]) {
			console.error(mode + ' key [' + valueKeyPath + ']');
			return; // continue
		}

		if (mode === 'missing') {
			var typeOfReference = typeofReal(referenceJson[key]);
			var typeOfCompared = typeofReal(comparedJson[key]);

			if (typeOfReference !== typeOfCompared) {
				console.error('key [' + valueKeyPath + '] type mismatch');
				return;
			}

			if (typeOfReference === 'array') {
				if (referenceJson[key].length !== comparedJson[key].length) {
					console.error('arrays with key :' + valueKeyPath + ' have not the same length');
				}
				return; // continue
			}

			if (typeOfReference === 'object') {
				compareJsonKeys(mode, referenceJson[key], comparedJson[key], valueKeyPath);
				return; // continue;
			}
		}
	});
}

/********************************************************
 **																										 **
 ** Programe																					 **
 **																										 **
 ********************************************************/

var reference = {},
		referenceName = "",
		comparedFile = {};

process.argv.forEach(function (val, index, array) {

  if (DEBUG) {
  	console.log('index : ' + index + ', val : ', val);
	}

  if (index < 2) {
  	// index 0 : node
  	// index 1 : languageCheck.js
  }
  else if (index === 2) {
  	// reference file
  	reference = require(val);
  	referenceName = val;
  } else {
  	// compared file
  	comparedFile = require(val);

  	console.log('');
  	console.log('');
  	console.log('--------------------------------------------------------------------------');
  	console.log('-- compare ' + val + ' with reference ' + referenceName + ' --');
  	console.log('--------------------------------------------------------------------------');
  	console.log('');

  	compareJsonKeys('missing', reference, comparedFile);
  	console.log('');
  	compareJsonKeys('unnecessary', comparedFile, reference);
  }
});

console.log('');
console.log('');