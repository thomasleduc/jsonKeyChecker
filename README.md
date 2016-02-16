# jsonKeyChecker
Compare the key missing or unnecessary keys in Json file.

This script has been created to check the differences between two translation files (ng-translate).

The aim is to compare the first parameter file with the following ones and get the missing and unnecessary keys.

### Usage :

Check the following files' (file2 ...) missing keys according to the file1's keys

```
node languageChecker.js <file1> <file2> [<file3>...]
```

### Development :

```
var DEBUG = true;
```

### Warning :

Be carefull, the key in array are not check. Just the length of them.


