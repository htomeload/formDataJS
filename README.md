# FormdataJS

## What is this project
This project is about library which contain nesscesary function to reducing code to write in working with form. This library create with purpose to make build FormData be more easily and less code to write. Then expanded to such as JSON and object converter and validation.

## Requirement
Internet Explorer > 10, Google Chrome > 48–55, Mozilla Firefox > 44–50, Microsoft Edge > 14, Opera > 35–42, Apple Safari > 10, SeaMonkey > 2.24–2.30 or higher with JavaScript ES6 supports, or Framework that support JavaScript ES6.

[ionic]
Ionic Framework >= 3

[react-native]
React Native >= 0.6

## Usage
Just do 

```
<script src="formdata.js"></script>
```

and you're ready to go, use `formdatajs` following with function name. For example

```bash
const result = formdatajs.validation();
```

Available function is 
* objectToJSON (obj)
    - Function use for convert array/object to JSON string.
    
    ```bash
    formdatajs.objectToJSON({name: 'John', age: 23});
    
    // return: "{"name":"John","age":23}"
    ```
* jsonToObject (json)
    - Function use for convert JSON string to object.
    
    ```bash
    formdatajs.jsonToObject("{"name":"John","age":23}");
    
    // return: {name: 'John', age: 23}
    ```
* validation (value, filter, async = true)
    - Function use for check provide value with various case, will return false if fail in any case, otherwise return true. Function will also return false in case of provide value not be in valid type.
    Function also can return as Promise by set async to false, resolve on suceess validation, reject on failed in any case.
    
    ```bash
    let input = {
        email: "example@email.com",
        name: "John",
        wallet: "5,000"
    };

    formdatajs.validation(input.email, ['requires', 'is_valid_email']);
    
    // return: true

    formdatajs.validation(input.name, ['requires', 'is_string', {match_to: "John"}]);
    
    // return: true

    formdatajs.validation(input.wallet, ['requires', 'is_numeric']);
    
    // return: false
    ```
    For possible validate cases, those can be
	- `requires`: provide value have to be filled, if boolean, it must be true, if number, it must not be 0.
	- `is_empty`: provide ***object/array*** should not be empty, null and undefined.
	- `is_numeric`: provide value must be in numeric, value can be number or string that contain only [0-9] characters and may with one dot(.).
	- `is_string`: provide value must be in string.
	- `is_boolean`: provide value must be in boolean, *`true`* and *`false`* can be applied.
	- `is_object`: provide value must be in object format.
	- `is_array`: provide value must be in array format.
	- `min_length`: provide ***string*** value must have characters more than to defined, used is *{min_length: number}*.
	- `max_length`: provide ***string*** value must have characters least than to defined, used is *{max_length: number}*.
	- `equal_length`: provide ***string*** value must have characters equal to defined, used is *{equal_length: number}*.
	- `match_to`: provide ***string*** value must match to defined string exactly, used is *{match_to: string}*.
	- `is_valid_email`: provide ***string*** value must be in valid email format.
	- `is_valid_url`: provide ***string*** value must be in valid URL format, *not support for validate URL like `localhost`*.
	- `password_basic_secure`: provide ***string*** value must contain A-Z, a-z and 0-9.
	- `password_strong_secure`: provide ***string*** value must contain A-Z, a-z, 0-9 and special characters like !, &, #, $, etc.
	- `contain_with`: provide ***string*** value must contain defined string, used is *{contain_with: string}*.
	- `not_contain_with`: provide ***string*** value must not contain defined string, used is *{not_contain_with: string}*.
	- `minimum`: provide ***number*** value must equal to defined or more than defined, used is *{minimum: number}*.
	- `maximum`: provide ***number*** value must equal to defined or less than defined, used is *{maximum: number}*.
	- `equal_to`: provide ***number*** value must only equal to defined, used is *{equal_to: number}*.
	- `between`: provide ***number*** value must equal to defined or more than first defined and less than second defined, used is *{between: [number, number]}*.

For deep information in how to use function is writes in library already, for such as IDE like Visual Studio Code should see while using it.
