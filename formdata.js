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

export default FormdataJS = {

	/**
	 * Function use for convert object to FormData's object.
	 * 
	 * @param {object[]} obj ***requires***must be in format `{ {key: value}, ... }`, otherwise will thrown error.
	 * @param {any} obj[].key can be number, string, boolean, array and object.
     	*/
	build: (obj) => {
		try {
			let formData = new FormData();
			for (let key of Object.keys(obj)) {
				if (acceptDataType[typeof obj[key]]) {
					if (typeof obj[key] === 'object') {
						formData.append(key, JSON.stringify(obj[key]));
					} else {
						formData.append(key, obj[key]);
					}
				} else {
					let accTyp = '';
					for (let types of Object.keys(acceptDataType)) {
						if (acceptDataType[types]) {
							accTyp += types + ", ";
						}
					}

					throw "[WrongType]\nIn:\formdata.js\n\nFrom:\nformData <<Call>> build\n\nMessage:\nType of value of input [ " + key + " ] is not as accept type. The list of accept type are " + accTyp;
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
     	 * @param {object} obj ***requires*** must be valid array or object, otherwise will thrown error.
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
     	 * @param {string} json ***requires*** must be valid JSON string, otherwise will thrown error.
     	*/
	jsonToObject: (json) => {
		try {
			return JSON.parse(json);
		} catch (error) {
			throw error;
		}
	},

	/**
	 * Function to contact with server, APIs or any online target. It can sent both POST and GET request,
	 * will return promise as resolve on success, reject on error or timeout.
	 * 
	 * @param {string} method ***requires*** method to send request, can be `POST` or `GET`.
	 * @param {string} url ***requires*** target url to send request, must be full URL like http://www.example.com/api.
	 * @param {object} params parameters to be sent with request, upon method, for `GET`, it must be in format {key: values}, for `POST`, it must be FormData() object.
	 * @param {object} params[].key can be number, string, boolean and object, for object, it will automated converted into JSON.
	 * @param {object} options options to set on one request, must be in format {option: values}, ***all options is not had to be setted***, option can be
	 * - `async`: If set *false*, functions will wait till got response, if *true*, it will abort when timeout, default is **true**.
	 * - `header`: Kind of header to set with request, default is **{"Content-Type": "multipart/form-data"}**.
	 * - `timeout`: If set async as *true*, request will abort when timeout as setted in miliseconds, default is **3000**.
	 * - `withCredentials`: if set as *true*, it will appiles security rule, such as 'No-Cross-Origin', default is **false**.
	 * - `mimeType`: MIME to be ovverride on response header, default is **''**.
	 * - `onabort`: Callback when request is aborted, default is **() => {}**.
	 * - `onload`: Callback when request is loading, default is **() => {}**.
	 * - `onloadend`: Callback when loading request is done, default is **() => {}**.
	 * - `onloadstart`: Callback to be called once when request is start, default is **() => {}**.
	 * - `onprogress`: Callback when request is in progress, default is **() => {}**.
	 */
	xmlHttpRequest: (method, url, params = {}, options = {}) => {
		try {
			let xhr = new XMLHttpRequest();
			let _options = {
				async: typeof options.async === "boolean" ? options.async : true,
				headers: typeof options.headers === "object" ? options.headers : { "Content-Type": "multipart/form-data" },
				timeout: typeof options.timeout === "number" ? options.timeout : 3000,
				withCredentials: typeof options.withCredentials === "boolean" ? options.withCredentials : false,
				mimeType: typeof options.mimeType === "string" ? mimeType : '',
				onabort: typeof options.onabort === "function" ? options.onabort : () => { },
				onload: typeof options.onload === "function" ? options.onload : () => { },
				onloadend: typeof options.onloadend === "function" ? options.onloadend : () => { },
				onloadstart: typeof options.onloadstart === "function" ? options.onloadstart : () => { },
				onprogress: typeof options.onprogress === "function" ? options.onprogress : () => { },
			};

			xhr.open(method, url, _options.async);
			if (_options.async) {
				xhr.timeout = _options.timeout;
			}
			xhr.withCredentials = _options.withCredentials;

			for (let head of Object.keys(_options.headers)) {
				xhr.setRequestHeader(head, _options.headers[head]);
			}

			if (_options.mimeType.trim() !== '') {
				xhr.overrideMimeType(_options.mimeType);
			}

			xhr.onabort = _options.onabort;
			xhr.onload = _options.onload;
			xhr.onloadend = _options.onloadend;
			xhr.onloadstart = _options.onloadstart;
			xhr.onprogress = _options.onprogress;

			if (params === {}) {
				xhr.send();
			} else {
				if (method.toLowerCase() == "post") {
					if (params instanceof FormData()) {
						xhr.send(params);
					} else {
						xhr.abort();
						throw "params is not valid FormData()";
					}
				} else {
					let paramStr = "";

					for (let key of Object.keys(params)) {
						if (acceptDataType[typeof params[key]]) {
							if (typeof params[key] === 'object') {
								paramStr += key + "=" + JSON.stringify(params[key]) + "&";
							} else {
								paramStr += key + "=" + params[key] + "&";
							}
						} else {
							let accTyp = '';
							for (let types of Object.keys(acceptDataType)) {
								if (acceptDataType[types]) {
									accTyp += types + ", ";
								}
							}

							xhr.abort();
							throw "[WrongType]\nIn:\formdata.js\n\nFrom:\nformData <<Call>> xmlHttpRequest\n\nMessage:\nType of value of input [ " + key + " ] is not as accept type. The list of accept type are " + accTyp;
						}
					}

					xhr.send(paramStr.substr(0, paramStr.length - 1));
				}
			}

			return new Promise((resolve, reject) => {
				xhr.onerror = (event) => {
					reject(event.target);
				};
				xhr.ontimeout = (event) => {
					reject(event.target);
				};
				xhr.onreadystatechange = (event) => {
					if (event.target.readyState == 4 && event.target.status == 200) {
						resolve(event.target);
					}
				};
			});
		} catch (error) {
			throw error;
		}
	},

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
	validation: (value, filter, async = true) => {
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
						case "requires": {
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
							if (isNaN(value) || !isFinite(value)) {
								_flag = false;
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
							if (typeof value !== 'object') {
								_flag = false;
							}
							break;
						}
						case "is_array": {
							if (!Array.isArray(value) || !(value instanceof Array)) {
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
							if (value == check['equal_to']) {
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
};
