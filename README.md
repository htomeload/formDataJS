# FormdataJS

## What is this project
This project is about library which contain nesscesary function to reducing code to write in working with form. This library create with purpose to make build FormData be more easily and less code to write. Then to expand to such as JSON and object converter and validation.

## Requirement
No any more requirement! this project writes with mind that it should be work with any Framework that base on JavaScript ES6
or higher, with that, this library can be anywhere that use JavaScript.

## Usage
Library writes in Object-Functions format, so just import it into page where it will be used is enough, 
then use `FormdataService` or whatever name as defined following with function name. For example

```bash
const result = FormdataService.validation();
```

Available function is 
* build
    - Function use for convert object to FormData's object. 
    
    ``` bash
    FormdataService.build({name: 'John', age: 23});
    
    // return: FormData() object.
    ```
* objectToJSON
    - Function use for convert array/object to JSON string.
    
    ```bash
    FormdataService.objectToJSON({name: 'John', age: 23});
    
    // return: "{"name":"John","age":23}"
    ```
* jsonToObject
    - Function use for convert JSON string to object.
    
    ```bash
    FormdataService.jsonToObject("{"name":"John","age":23}");
    
    // return: {name: 'John', age: 23}
    ```
* validation
    - Function use for check provide value with various case, will return false if fail in any case, otherwise return true. Function will also return false in case of provide value not be in valid type.
    
    ```bash
    let input = {
        email: "example@email.com",
        name: "John",
        wallet: "5,000"
    };

    FormdataService.validation(input.email, ['requires', 'is_valid_email']);
    
    // return: true

    FormdataService.validation(input.name, ['requires', 'is_string', {match_to: "John"}]);
    
    // return: true

    FormdataService.validation(input.wallet, ['requires', 'is_numeric']);
    
    // return: false
    ```

For deep information in how to use function is writes in library already, for such as IDE like Visual Studio Code should see while using it.
