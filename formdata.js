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

export default FormdataService = {

	/**
	 * Function use for convert object to FormData's object.
	 * 
	 * @param {object[]} obj - must be in format { {key: value}, ... }, otherwise will thrown error.
	 * @param {any} obj[].key - can be number, string, boolean, array and object.
     	*/
	build: (obj) => {
		try {
			let formData = new FormData();
			for(let key of Object.keys(obj)){
				if (acceptDataType[ typeof obj[key] ]){
					if (typeof obj[key]['uri'] === 'undefined'){
						formData.append(key, obj[key]);
					}else{
						let fileURL = obj[key]['uri'];
						formData.append(key, fileURL.replace("file://", ""));
					}
				}else{
					let accTyp = '';
					for(let types of Object.keys(acceptDataType)){
						if (acceptDataType[ types ]){
							accTyp += types+", ";
						}
					}
	
					throw "[WrongType]\nIn:\formdata.js\n\nFrom:\nformData <<Call>> build\n\nMessage:\nType of value of input [ "+key+" ] is not as accept type. The list of accept type are "+accTyp;
				}
			}
			return formData;
		} catch (error) {
			throw error;
		}
	},

	/**
	 * Function use for convert array/object to JSON string.
	 * 
     	 * @param {object} obj - must be valid array or object, otherwise will thrown error.
     	*/
	objectToJSON: (obj) => {
		try {
			return JSON.stringify(obj);
		} catch (error) {
			throw error;
		}
	},

	/**
	 * Function use for convert JSON string to object.
	 * 
     	 * @param {string} json - must be valid JSON string, otherwise will thrown error.
     	*/
	jsonToObject: (json) => {
		try {
			return JSON.parse(json);
		} catch (error) {
			throw error;
		}
    	},
    
    	/**
	 * Function use for check provide value with various case, will return false if fail in any case, otherwise return true. 
	 * Function will also return false in case of provide value not be in valid type.
	 * 
     	 * @param {any} value - can be number, string, boolean, array and object.
     	 * @param {string[]} filter - string can be 
     	 * - requires: provide value have to be filled, if boolean, it must be true, if number, it must not be 0.
	 * - is_empty: provide object/array should not be empty, null and undefined.
	 * - is_numeric: provide value must be in number, for number in string, use is_string, otherwise validation will be failed.
	 * - is_string: provide value must be in string.
	 * - is_boolean: provide value must be in boolean, true and false can be applied.
	 * - is_object: provide value must be in object format.
	 * - min_length: provide string value must have characters more than to defined, used is {min_length: number}.
	 * - max_length: provide string value must have characters least than to defined, used is {max_length: number}.
	 * - equal_length: provide string value must have characters equal to defined, used is {equal_length: number}.
	 * - match_to: provide string value must match to defined string exactly, used is {match_to: string}.
	 * - is_valid_email: provide string value must be in valid email format.
	 * - password_basic_secure: provide string value must contain A-Z, a-z and 0-9.
	 * - password_strong_secure: provide string value must contain A-Z, a-z, 0-9 and special characters like !, &, #, $, etc.
	 * - contain_with: provide string value must contain defined string, used is {contain_with: string}.
	 * - not_contain_with: provide string value must not contain defined string, used is {not_contain_with: string}.
     	*/
	validation: (value, filter) => {
		try {
			let _flag = true;

			if (acceptDataType[ typeof value ]){
				let method = '';
				filter.forEach(check => {
					if (typeof check == "string"){
						method = check;
					}else if (typeof check == "object"){
						let key = Object.keys(check);
						method = key[0];
					}else{
						_flag = false;
					}

					switch(method) {
						case "requires": {
							if (typeof value === 'string'){
								if (value.trim() == '' || value.trim() == ""){
									_flag = false;
								}
							}else if (typeof value == "boolean"){
								if (!value){
									_flag = false;
								}
							}else if (value == 0){
								_flag = false;
							}
							break;
						}
						case "is_empty": {
							if (value == null || value == [] || value == {} || typeof value === "undefined"){
								_flag = false;
							}
							break;
						}
						case "is_numeric": {
							if (isNaN(value) || !isFinite(value)){
								_flag = false;
							}
							break;
						}
						case "is_string": {
							if (typeof value !== 'string'){
								_flag = false;
							}
							break;
						}
						case "is_boolean": {
							if (typeof value !== 'boolean'){
								_flag = false;
							}
							break;
						}
						case "is_object": {
							if (typeof value !== 'object'){
								_flag = false;
							}
							break;
						}
						case "min_length": {
							if (value.length < check["min_length"]){
								_flag = false;
							}
							break;
						}
						case "max_length": {
							if (value.length > check["max_length"]){
								_flag = false;
							}
							break;
						}
						case "equal_length": {
							if (value.length != check["equal_length"]){
								_flag = false;
							}
							break;
						}
						case "match_to": {
							if (value != check["match_to"]){
								_flag = false;
							}
							break;
						}
						case "is_valid_email": {
							if ( !(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(value)) ){
								_flag = false;
							}
							break;
						}
						case "password_basic_secure": {
							if ( !(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])/.test(value)) ){
								_flag = false;
							}
							break;
						}
						case "password_strong_secure": {
							if ( !(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])/.test(value)) ){
								_flag = false;
							}
							break;
						}
						case "contain_with": {
							if ( !(value.match('[^,]*'+check['contain_with']+'[,$]*')) ){
								_flag = false;
							}
						}
						case "not_contain_with": {
							if ( (value.match('[^,]*'+check['not_contain_with']+'[,$]*')) ){
								_flag = false;
							}
						}
					}
				});
			}else{
				_flag = false;
			}

			return _flag;
		} catch (error) {
			throw error;
		}
	}
};
