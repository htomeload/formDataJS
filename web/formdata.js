((window) => {
    const acceptDataType = {
        'string': true,
        'number': true,
        'boolean': true,
        'bigint': true,
        'object': true,
        'function': false,
        'symbol': false,
        'undefined': false
    };

    FormdataJS = () => {
        let fdjs_ = {};

        /**
         * Function use for convert array/object to JSON string.
         * 
             * @param {object} obj ***requires*** must be valid array or object, otherwise will thrown error.
            */
        fdjs_.objectToJSON = (obj) => {
            try {
                return JSON.stringify(obj);
            } catch (error) {
                throw error;
            }
        }

        /**
         * Function use for convert JSON string to object.
         * 
             * @param {string} json ***requires*** must be valid JSON string, otherwise will thrown error.
            */
        fdjs_.jsonToObject = (json) => {
            try {
                return JSON.parse(json);
            } catch (error) {
                throw error;
            }
        }

        /**
        * Function use for validate provide value with various case, will return false if fail in any case, otherwise return true. 
        * Function will also return false in case of provide value not be in valid type.
        * 
        * Function also can return as Promise by set async to false, resolve on suceess validation, reject on failed in any case.
        * 
        * @param {any} value ***requires*** value to be checked, can be *number*, *string*, *boolean*, *array* and *object*.
        * @param {string[]} filter ***requires*** **array** that contain **string/object** validation case.
        * @param {boolean} async if set as false, then function will return Promise.
        */
        fdjs_.validation = (value, filter, async = true) => {
            try {
                let _flag = true;

                if (acceptDataType[typeof value]) {
                    let method = '';
                    filter.forEach(check => {
                        if (typeof check == "string") {
                            method = check;
                        } else if (typeof check == "object") {
                            let key = Object.keys(check);
                            method = key[0];
                        } else {
                            _flag = false;
                        }

                        switch (method) {
                            case "require": {
                                if (typeof value === 'string') {
                                    if (value.trim() == '' || value.trim() == "") {
                                        _flag = false;
                                    }
                                } else if (typeof value == "boolean") {
                                    if (!value) {
                                        _flag = false;
                                    }
                                } else if (value == 0) {
                                    _flag = false;
                                }
                                break;
                            }
                            case "is_empty": {
                                if (value == null || value == [] || value == {} || typeof value === "undefined") {
                                    _flag = false;
                                }
                                break;
                            }
                            case "is_numeric": {
                                if (typeof value === "string") {
                                    if ( !(/^\d+(\.\d+)?$/.test(value)) ) {
                                        _flag = false;
                                    }
                                }else {
                                    if ((!Number.isInteger(value) && !Number.isFinite(value)) || Number.isNaN(value)){
                                        _flag = false;
                                    }
                                }
                                break;
                            }
                            case "is_string": {
                                if (typeof value !== 'string') {
                                    _flag = false;
                                }
                                break;
                            }
                            case "is_boolean": {
                                if (typeof value !== 'boolean') {
                                    _flag = false;
                                }
                                break;
                            }
                            case "is_object": {
                                if (typeof value !== 'object' || !(value instanceof Object)){
                                    _flag = false;
                                }
                                break;
                            }
                            case "is_array": {
                                if (!Array.isArray(value) || !(value instanceof Array)){
                                    _flag = false;
                                }
                                break;
                            }
                            case "min_length": {
                                if (value.length < check["min_length"]) {
                                    _flag = false;
                                }
                                break;
                            }
                            case "max_length": {
                                if (value.length > check["max_length"]) {
                                    _flag = false;
                                }
                                break;
                            }
                            case "equal_length": {
                                if (value.length != check["equal_length"]) {
                                    _flag = false;
                                }
                                break;
                            }
                            case "match_to": {
                                if (value != check["match_to"]) {
                                    _flag = false;
                                }
                                break;
                            }
                            case "is_valid_email": {
                                const is_valid_email = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
                                if (!is_valid_email.test(value)) {
                                    _flag = false;
                                }
                                break;
                            }
                            case "is_valid_url": {
                                const is_valid_url = /^(?:(?:http(s)?|ftp(s)?):\/\/)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})))(?::\d{2,5})?(?:\/\S*)?$/;
                                if (!is_valid_url.test(value)) {
                                    _flag = false;
                                }
                                break;
                            }
                            case "password_basic_secure": {
                                const password_basic_secure = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])/;
                                if (!password_basic_secure.test(value)) {
                                    _flag = false;
                                }
                                break;
                            }
                            case "password_strong_secure": {
                                const password_strong_secure = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])/;
                                if (!password_strong_secure.test(value)) {
                                    _flag = false;
                                }
                                break;
                            }
                            case "contain_with": {
                                if (!(value.match('[^,]*' + check['contain_with'] + '[,$]*'))) {
                                    _flag = false;
                                }
                                break;
                            }
                            case "not_contain_with": {
                                if ((value.match('[^,]*' + check['not_contain_with'] + '[,$]*'))) {
                                    _flag = false;
                                }
                                break;
                            }
                            case "minimum": {
                                if (value < check['minimum']) {
                                    _flag = false;
                                }
                                break;
                            }
                            case "maximum": {
                                if (value > check['maximum']) {
                                    _flag = false;
                                }
                                break;
                            }
                            case "equal_to": {
                                if (value != check['equal_to']) {
                                    _flag = false;
                                }
                                break;
                            }
                            case "between": {
                                if (value < check["between"][0] || value > check["between"][1]) {
                                    _flag = false;
                                }
                                break;
                            }
                        }
                    });
                } else {
                    _flag = false;
                }

                if (async) {
                    return _flag;
                } else {
                    return new Promise((resolve, reject) => {
                        if (_flag) {
                            resolve(_flag);
                        } else {
                            reject(_flag);
                        }
                    });
                }
            } catch (error) {
                throw error;
            }
        }
    }

    if (typeof window.formdatajs === "undefined") {
        window.formdatajs = FormdataJS();
    }
})(window);
