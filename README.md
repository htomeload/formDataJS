# FormdataJS

## What is this project
This project is about library which contain nesscesary function to reducing code to write in working with form. This library create with purpose to make build FormData be more easily and less code to write. Then expanded to such as JSON and object converter and validation.

## Requirement
No any more requirement! this project writes with mind that it should be work with any Framework that base on JavaScript ES6
or higher, with that, this library can be anywhere that use JavaScript.

## Usage
Library writes in Object-Functions format, so just import it into page where it will be used is enough, 
then use `FormdataJS` or whatever name as defined following with function name. For example

```bash
const result = FormdataJS.validation();
```

Available function is 
* build (obj)
    - Function use for convert object to FormData's object. 
    
    ``` bash
    FormdataJS.build({name: 'John', age: 23});
    
    // return: FormData() object.
    ```
* objectToJSON (obj)
    - Function use for convert array/object to JSON string.
    
    ```bash
    FormdataJS.objectToJSON({name: 'John', age: 23});
    
    // return: "{"name":"John","age":23}"
    ```
* jsonToObject (json)
    - Function use for convert JSON string to object.
    
    ```bash
    FormdataJS.jsonToObject("{"name":"John","age":23}");
    
    // return: {name: 'John', age: 23}
    ```
* xmlHttpRequest (method, url, params = {}, options = {})
    - Function to contact with server, APIs or any online target. It can sent both POST and GET request,
	will return promise as resolve on success, reject on error or timeout.

    ```bash
    const request = FormdataJS.xmlHttpRequest("GET", "http://localhost/api/getHellowMsg");
    
    // return: request.then((event) => {}).catch((event) => {})
    ```
    For possible options, those can be
    - `async`: If set *false*, functions will wait till got response, if *true*, it will abort when timeout, default is **true**.
	- `header`: Kind of header to set with request, default is **{"Content-Type": "multipart/form-data"}**.
	- `timeout`: If set async as *true*, request will abort when timeout as setted in miliseconds, default is **3000**.
	- `withCredentials`: if set as *true*, it will appiles security rule, such as 'No-Cross-Origin', default is **false**.
	- `mimeType`: MIME to be ovverride on response header, default is **''**.
	- `onabort`: Callback when request is aborted, default is **() => {}**.
	- `onload`: Callback when request is loading, default is **() => {}**.
	- `onloadend`: Callback when loading request is done, default is **() => {}**.
	- `onloadstart`: Callback to be called once when request is start, default is **() => {}**.
	- `onprogress`: Callback when request is in progress, default is **() => {}**.

* validation (value, filter, async = true)
    - Function use for check provide value with various case, will return false if fail in any case, otherwise return true. Function will also return false in case of provide value not be in valid type.
    Function also can return as Promise by set async to false, resolve on suceess validation, reject on failed in any case.
    
    ```bash
    let input = {
        email: "example@email.com",
        name: "John",
        wallet: "5,000"
    };

    FormdataJS.validation(input.email, ['requires', 'is_valid_email']);
    
    // return: true

    FormdataJS.validation(input.name, ['requires', 'is_string', {match_to: "John"}]);
    
    // return: true

    FormdataJS.validation(input.wallet, ['requires', 'is_numeric']);
    
    // return: false
    ```
    For possible validate cases, those can be
	- `requires`: provide value have to be filled, if boolean, it must be true, if number, it must not be 0.
	- `is_empty`: provide ***object/array*** should not be empty, null and undefined.
	- `is_numeric`: provide value must be in number, for number in string, use is_string, otherwise validation will be failed.
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
