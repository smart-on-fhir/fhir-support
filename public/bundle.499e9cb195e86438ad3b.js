/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 10);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__h__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__app__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__router__ = __webpack_require__(9);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "h", function() { return __WEBPACK_IMPORTED_MODULE_0__h__["a"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "app", function() { return __WEBPACK_IMPORTED_MODULE_1__app__["a"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "Router", function() { return __WEBPACK_IMPORTED_MODULE_2__router__["a"]; });







/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
var _hyperapp = __webpack_require__(0);
var _actions = __webpack_require__(4);var _actions2 = _interopRequireDefault(_actions);
var _view = __webpack_require__(6);var _view2 = _interopRequireDefault(_view);function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}

(0, _hyperapp.app)({
	model: { uiStatus: "loading" },
	actions: _actions2.default,
	view: _view2.default,
	subscriptions: [_actions2.default.loadConfig],
	root: document.getElementById("main") });

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Array.prototype.find = Array.prototype.find || function(callback) {
  if (this === null) {
    throw new TypeError('Array.prototype.find called on null or undefined');
  } else if (typeof callback !== 'function') {
    throw new TypeError('callback must be a function');
  }
  var list = Object(this);
  // Makes sures is always has an positive integer as length.
  var length = list.length >>> 0;
  var thisArg = arguments[1];
  for (var i = 0; i < length; i++) {
    var element = list[i];
    if ( callback.call(thisArg, element, i, list) ) {
      return element;
    }
  }
};


/***/ }),
/* 3 */
/***/ (function(module, exports) {

(function(self) {
  'use strict';

  if (self.fetch) {
    return
  }

  var support = {
    searchParams: 'URLSearchParams' in self,
    iterable: 'Symbol' in self && 'iterator' in Symbol,
    blob: 'FileReader' in self && 'Blob' in self && (function() {
      try {
        new Blob()
        return true
      } catch(e) {
        return false
      }
    })(),
    formData: 'FormData' in self,
    arrayBuffer: 'ArrayBuffer' in self
  }

  if (support.arrayBuffer) {
    var viewClasses = [
      '[object Int8Array]',
      '[object Uint8Array]',
      '[object Uint8ClampedArray]',
      '[object Int16Array]',
      '[object Uint16Array]',
      '[object Int32Array]',
      '[object Uint32Array]',
      '[object Float32Array]',
      '[object Float64Array]'
    ]

    var isDataView = function(obj) {
      return obj && DataView.prototype.isPrototypeOf(obj)
    }

    var isArrayBufferView = ArrayBuffer.isView || function(obj) {
      return obj && viewClasses.indexOf(Object.prototype.toString.call(obj)) > -1
    }
  }

  function normalizeName(name) {
    if (typeof name !== 'string') {
      name = String(name)
    }
    if (/[^a-z0-9\-#$%&'*+.\^_`|~]/i.test(name)) {
      throw new TypeError('Invalid character in header field name')
    }
    return name.toLowerCase()
  }

  function normalizeValue(value) {
    if (typeof value !== 'string') {
      value = String(value)
    }
    return value
  }

  // Build a destructive iterator for the value list
  function iteratorFor(items) {
    var iterator = {
      next: function() {
        var value = items.shift()
        return {done: value === undefined, value: value}
      }
    }

    if (support.iterable) {
      iterator[Symbol.iterator] = function() {
        return iterator
      }
    }

    return iterator
  }

  function Headers(headers) {
    this.map = {}

    if (headers instanceof Headers) {
      headers.forEach(function(value, name) {
        this.append(name, value)
      }, this)
    } else if (Array.isArray(headers)) {
      headers.forEach(function(header) {
        this.append(header[0], header[1])
      }, this)
    } else if (headers) {
      Object.getOwnPropertyNames(headers).forEach(function(name) {
        this.append(name, headers[name])
      }, this)
    }
  }

  Headers.prototype.append = function(name, value) {
    name = normalizeName(name)
    value = normalizeValue(value)
    var oldValue = this.map[name]
    this.map[name] = oldValue ? oldValue+','+value : value
  }

  Headers.prototype['delete'] = function(name) {
    delete this.map[normalizeName(name)]
  }

  Headers.prototype.get = function(name) {
    name = normalizeName(name)
    return this.has(name) ? this.map[name] : null
  }

  Headers.prototype.has = function(name) {
    return this.map.hasOwnProperty(normalizeName(name))
  }

  Headers.prototype.set = function(name, value) {
    this.map[normalizeName(name)] = normalizeValue(value)
  }

  Headers.prototype.forEach = function(callback, thisArg) {
    for (var name in this.map) {
      if (this.map.hasOwnProperty(name)) {
        callback.call(thisArg, this.map[name], name, this)
      }
    }
  }

  Headers.prototype.keys = function() {
    var items = []
    this.forEach(function(value, name) { items.push(name) })
    return iteratorFor(items)
  }

  Headers.prototype.values = function() {
    var items = []
    this.forEach(function(value) { items.push(value) })
    return iteratorFor(items)
  }

  Headers.prototype.entries = function() {
    var items = []
    this.forEach(function(value, name) { items.push([name, value]) })
    return iteratorFor(items)
  }

  if (support.iterable) {
    Headers.prototype[Symbol.iterator] = Headers.prototype.entries
  }

  function consumed(body) {
    if (body.bodyUsed) {
      return Promise.reject(new TypeError('Already read'))
    }
    body.bodyUsed = true
  }

  function fileReaderReady(reader) {
    return new Promise(function(resolve, reject) {
      reader.onload = function() {
        resolve(reader.result)
      }
      reader.onerror = function() {
        reject(reader.error)
      }
    })
  }

  function readBlobAsArrayBuffer(blob) {
    var reader = new FileReader()
    var promise = fileReaderReady(reader)
    reader.readAsArrayBuffer(blob)
    return promise
  }

  function readBlobAsText(blob) {
    var reader = new FileReader()
    var promise = fileReaderReady(reader)
    reader.readAsText(blob)
    return promise
  }

  function readArrayBufferAsText(buf) {
    var view = new Uint8Array(buf)
    var chars = new Array(view.length)

    for (var i = 0; i < view.length; i++) {
      chars[i] = String.fromCharCode(view[i])
    }
    return chars.join('')
  }

  function bufferClone(buf) {
    if (buf.slice) {
      return buf.slice(0)
    } else {
      var view = new Uint8Array(buf.byteLength)
      view.set(new Uint8Array(buf))
      return view.buffer
    }
  }

  function Body() {
    this.bodyUsed = false

    this._initBody = function(body) {
      this._bodyInit = body
      if (!body) {
        this._bodyText = ''
      } else if (typeof body === 'string') {
        this._bodyText = body
      } else if (support.blob && Blob.prototype.isPrototypeOf(body)) {
        this._bodyBlob = body
      } else if (support.formData && FormData.prototype.isPrototypeOf(body)) {
        this._bodyFormData = body
      } else if (support.searchParams && URLSearchParams.prototype.isPrototypeOf(body)) {
        this._bodyText = body.toString()
      } else if (support.arrayBuffer && support.blob && isDataView(body)) {
        this._bodyArrayBuffer = bufferClone(body.buffer)
        // IE 10-11 can't handle a DataView body.
        this._bodyInit = new Blob([this._bodyArrayBuffer])
      } else if (support.arrayBuffer && (ArrayBuffer.prototype.isPrototypeOf(body) || isArrayBufferView(body))) {
        this._bodyArrayBuffer = bufferClone(body)
      } else {
        throw new Error('unsupported BodyInit type')
      }

      if (!this.headers.get('content-type')) {
        if (typeof body === 'string') {
          this.headers.set('content-type', 'text/plain;charset=UTF-8')
        } else if (this._bodyBlob && this._bodyBlob.type) {
          this.headers.set('content-type', this._bodyBlob.type)
        } else if (support.searchParams && URLSearchParams.prototype.isPrototypeOf(body)) {
          this.headers.set('content-type', 'application/x-www-form-urlencoded;charset=UTF-8')
        }
      }
    }

    if (support.blob) {
      this.blob = function() {
        var rejected = consumed(this)
        if (rejected) {
          return rejected
        }

        if (this._bodyBlob) {
          return Promise.resolve(this._bodyBlob)
        } else if (this._bodyArrayBuffer) {
          return Promise.resolve(new Blob([this._bodyArrayBuffer]))
        } else if (this._bodyFormData) {
          throw new Error('could not read FormData body as blob')
        } else {
          return Promise.resolve(new Blob([this._bodyText]))
        }
      }

      this.arrayBuffer = function() {
        if (this._bodyArrayBuffer) {
          return consumed(this) || Promise.resolve(this._bodyArrayBuffer)
        } else {
          return this.blob().then(readBlobAsArrayBuffer)
        }
      }
    }

    this.text = function() {
      var rejected = consumed(this)
      if (rejected) {
        return rejected
      }

      if (this._bodyBlob) {
        return readBlobAsText(this._bodyBlob)
      } else if (this._bodyArrayBuffer) {
        return Promise.resolve(readArrayBufferAsText(this._bodyArrayBuffer))
      } else if (this._bodyFormData) {
        throw new Error('could not read FormData body as text')
      } else {
        return Promise.resolve(this._bodyText)
      }
    }

    if (support.formData) {
      this.formData = function() {
        return this.text().then(decode)
      }
    }

    this.json = function() {
      return this.text().then(JSON.parse)
    }

    return this
  }

  // HTTP methods whose capitalization should be normalized
  var methods = ['DELETE', 'GET', 'HEAD', 'OPTIONS', 'POST', 'PUT']

  function normalizeMethod(method) {
    var upcased = method.toUpperCase()
    return (methods.indexOf(upcased) > -1) ? upcased : method
  }

  function Request(input, options) {
    options = options || {}
    var body = options.body

    if (input instanceof Request) {
      if (input.bodyUsed) {
        throw new TypeError('Already read')
      }
      this.url = input.url
      this.credentials = input.credentials
      if (!options.headers) {
        this.headers = new Headers(input.headers)
      }
      this.method = input.method
      this.mode = input.mode
      if (!body && input._bodyInit != null) {
        body = input._bodyInit
        input.bodyUsed = true
      }
    } else {
      this.url = String(input)
    }

    this.credentials = options.credentials || this.credentials || 'omit'
    if (options.headers || !this.headers) {
      this.headers = new Headers(options.headers)
    }
    this.method = normalizeMethod(options.method || this.method || 'GET')
    this.mode = options.mode || this.mode || null
    this.referrer = null

    if ((this.method === 'GET' || this.method === 'HEAD') && body) {
      throw new TypeError('Body not allowed for GET or HEAD requests')
    }
    this._initBody(body)
  }

  Request.prototype.clone = function() {
    return new Request(this, { body: this._bodyInit })
  }

  function decode(body) {
    var form = new FormData()
    body.trim().split('&').forEach(function(bytes) {
      if (bytes) {
        var split = bytes.split('=')
        var name = split.shift().replace(/\+/g, ' ')
        var value = split.join('=').replace(/\+/g, ' ')
        form.append(decodeURIComponent(name), decodeURIComponent(value))
      }
    })
    return form
  }

  function parseHeaders(rawHeaders) {
    var headers = new Headers()
    rawHeaders.split(/\r?\n/).forEach(function(line) {
      var parts = line.split(':')
      var key = parts.shift().trim()
      if (key) {
        var value = parts.join(':').trim()
        headers.append(key, value)
      }
    })
    return headers
  }

  Body.call(Request.prototype)

  function Response(bodyInit, options) {
    if (!options) {
      options = {}
    }

    this.type = 'default'
    this.status = 'status' in options ? options.status : 200
    this.ok = this.status >= 200 && this.status < 300
    this.statusText = 'statusText' in options ? options.statusText : 'OK'
    this.headers = new Headers(options.headers)
    this.url = options.url || ''
    this._initBody(bodyInit)
  }

  Body.call(Response.prototype)

  Response.prototype.clone = function() {
    return new Response(this._bodyInit, {
      status: this.status,
      statusText: this.statusText,
      headers: new Headers(this.headers),
      url: this.url
    })
  }

  Response.error = function() {
    var response = new Response(null, {status: 0, statusText: ''})
    response.type = 'error'
    return response
  }

  var redirectStatuses = [301, 302, 303, 307, 308]

  Response.redirect = function(url, status) {
    if (redirectStatuses.indexOf(status) === -1) {
      throw new RangeError('Invalid status code')
    }

    return new Response(null, {status: status, headers: {location: url}})
  }

  self.Headers = Headers
  self.Request = Request
  self.Response = Response

  self.fetch = function(input, init) {
    return new Promise(function(resolve, reject) {
      var request = new Request(input, init)
      var xhr = new XMLHttpRequest()

      xhr.onload = function() {
        var options = {
          status: xhr.status,
          statusText: xhr.statusText,
          headers: parseHeaders(xhr.getAllResponseHeaders() || '')
        }
        options.url = 'responseURL' in xhr ? xhr.responseURL : options.headers.get('X-Request-URL')
        var body = 'response' in xhr ? xhr.response : xhr.responseText
        resolve(new Response(body, options))
      }

      xhr.onerror = function() {
        reject(new TypeError('Network request failed'))
      }

      xhr.ontimeout = function() {
        reject(new TypeError('Network request failed'))
      }

      xhr.open(request.method, request.url, true)

      if (request.credentials === 'include') {
        xhr.withCredentials = true
      }

      if ('responseType' in xhr && support.blob) {
        xhr.responseType = 'blob'
      }

      request.headers.forEach(function(value, name) {
        xhr.setRequestHeader(name, value)
      })

      xhr.send(typeof request._bodyInit === 'undefined' ? null : request._bodyInit)
    })
  }
  self.fetch.polyfill = true
})(typeof self !== 'undefined' ? self : this);


/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
var _extends = Object.assign || function (target) {for (var i = 1; i < arguments.length; i++) {var source = arguments[i];for (var key in source) {if (Object.prototype.hasOwnProperty.call(source, key)) {target[key] = source[key];}}}return target;};function _defineProperty(obj, key, value) {if (key in obj) {Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });} else {obj[key] = value;}return obj;}var handleFetchErrors = function handleFetchErrors(response) {
	if (!response.ok) {
		throw new Error(response.statusText);
	}
	return response;
};

var loadConformance = function loadConformance(name, sandbox, actions) {
	var params = {
		method: "GET", mode: "cors", redirect: "follow",
		headers: { "accept": "application/json+fhir" } };


	return fetch(sandbox.conformance, params).
	then(handleFetchErrors).
	then(function (response) {return response.json();}).
	then(function (json) {
		actions.addConformance({ name: name, conformance: json });
	}).
	catch(function (err) {
		actions.setSandboxStatus({ name: name, error: err.message });
	});
};

var loadConfig = function loadConfig(model, actions) {
	var configUrl = "config" + (
	window.location.href.indexOf("dev") > -1 ? ".dev" : "") + ".json";
	return fetch(configUrl).
	then(handleFetchErrors).
	then(function (response) {return response.json();}).
	then(function (config) {
		actions.setConfig(config);
		return config;
	}).
	then(function (config) {
		loadSandboxes(config, actions);
	}).
	catch(function (err) {
		actions.setUiStatus({ status: "configError", message: err.message });
	});
};

var loadSandboxes = function loadSandboxes(config, actions) {
	config.columns.forEach(function (c) {
		if (config.sandboxes[c] && !config.sandboxes[c].loaded)
		loadConformance(c, config.sandboxes[c], actions);
	});
};

var actions = {
	loadConfig: loadConfig,

	setConfig: function setConfig(model, config, actions) {
		return { config: config, uiStatus: "ready" };
	},

	setUiStatus: function setUiStatus(model, _ref) {var status = _ref.status,message = _ref.message;
		return { uiStatus: status, uiMessage: message };
	},

	setColumn: function setColumn(model, _ref2, actions) {var colNumber = _ref2.colNumber,value = _ref2.value;
		if (value == "-") value = null;

		if (value && !model.config.sandboxes[value].loaded)
		loadConformance(value, model.config.sandboxes[value], actions);

		return { config: _extends({},
			model.config, {
				columns: [0, 1, 2].map(
				function (i) {return i == colNumber ? value : model.config.columns[i] || null;}) }) };


	},

	setSandboxStatus: function setSandboxStatus(model, _ref3) {var name = _ref3.name,error = _ref3.error;
		var sandboxes = _extends({},
		model.config.sandboxes, _defineProperty({},
		name, _extends({},
		model.config.sandboxes[name], {
			loaded: true,
			error: error })));


		return { config: _extends({},
			model.config, {
				sandboxes: sandboxes }) };

	},

	toggleExpanded: function toggleExpanded(model, _ref4) {var targetType = _ref4.targetType,targetValue = _ref4.targetValue,expansionType = _ref4.expansionType;
		return _defineProperty({}, targetType, _extends({},
		model[targetType], _defineProperty({},
		targetValue, _extends({},
		model[targetType][targetValue], _defineProperty({},
		expansionType, !model[targetType][targetValue][expansionType])))));


	},

	addConformance: function addConformance(model, _ref6, actions) {var name = _ref6.name,conformance = _ref6.conformance;

		var _mergeFeature = function _mergeFeature(featureName, value) {
			return _extends({},
			(model.featureSupport || {})[featureName], _defineProperty({},
			name, value));

		};

		var smartSupport =
		conformance.rest[0].security &&
		conformance.rest[0].security.service &&
		conformance.rest[0].security.service.find(function (s) {
			return s.coding.find(function (c) {return c.code == "SMART-on-FHIR";});
		}) ?
		true : false;

		var featureSupport = {
			"FHIR Version":
			_mergeFeature("FHIR Version", conformance.fhirVersion),
			"XML Format":
			_mergeFeature("XML Format", conformance.format.join().indexOf("xml") > -1),
			"JSON Format":
			_mergeFeature("JSON Format", conformance.format.join().indexOf("json") > -1),
			"SMART":
			_mergeFeature("SMART", smartSupport) };


		var resourceSupport = _extends({}, model.resourceSupport);
		conformance.rest[0].resource.forEach(function (resource) {
			if ((model.config.ignoreResources || []).indexOf(resource.type) > -1) return;
			resourceSupport[resource.type] = _extends({},
			resourceSupport[resource.type], _defineProperty({},
			name, {
				interaction: resource.interaction,
				documentation: resource.documentation }));



			if (!resource.searchParam || !resource.searchParam.length) return;
			var searchParam = resourceSupport[resource.type].searchParam || {};
			resource.searchParam.forEach(function (param) {
				var paramTitle = param.name + "+" + param.type;
				searchParam[paramTitle] = _extends({},
				searchParam[paramTitle], _defineProperty({},
				name, { documentation: param.documentation }));

			});
			resourceSupport[resource.type].searchParam = searchParam;
		});
		var sandboxes = _extends({},
		model.config.sandboxes, _defineProperty({},
		name, _extends({},
		model.config.sandboxes[name], {
			loaded: true,
			error: null })));


		var config = _extends({},
		model.config, {
			sandboxes: sandboxes });

		return {
			config: config,
			featureSupport: featureSupport,
			resourceSupport: resourceSupport };

	} };


module.exports = actions;

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
var _hyperapp = __webpack_require__(0);

module.exports = {
	loading:
	(0, _hyperapp.h)("div", null, "Loading..."),
	loadingSpinner:
	(0, _hyperapp.h)("span", null,
		(0, _hyperapp.h)("i", { "class": "fa fa-spinner fa-spin fa-fw" }),
		(0, _hyperapp.h)("span", { "class": "sr-only" }, "Loading...")),

	pageHeader: (0, _hyperapp.h)("h1", null, "EHR FHIR Support",
		(0, _hyperapp.h)("br", null),
		(0, _hyperapp.h)("span", { className: "small" }, "Based on published FHIR conformance resources")),

	emptyCell: (0, _hyperapp.h)("span", null, "-"),
	footer:
	(0, _hyperapp.h)("div", null,
		(0, _hyperapp.h)("div", { className: "row key" }, (0, _hyperapp.h)("div", { className: "col-xs-12" },
				(0, _hyperapp.h)("i", { className: "fa fa-fw fa-file-o" }), " = read \xA0|\xA0",

				(0, _hyperapp.h)("i", { className: "fa fa-fw fa-search" }), " = search \xA0|\xA0",

				(0, _hyperapp.h)("i", { className: "fa fa-fw fa-plus" }), " = create \xA0|\xA0",

				(0, _hyperapp.h)("i", { className: "fa fa-fw fa-pencil" }), " = update \xA0|\xA0",

				(0, _hyperapp.h)("i", { className: "fa fa-fw fa-trash" }), " = delete \xA0|\xA0 * = non-vendor note")),



		(0, _hyperapp.h)("div", { className: "row key" }, (0, _hyperapp.h)("div", { className: "col-sm-12" }, "This is project of ",
				(0, _hyperapp.h)("a", { href: "https://smarthealthit.org", target: "_blank" }, "SMART Health IT"), " and the code that generates this page is available on ", (0, _hyperapp.h)("a", { href: "https://github.com/smart-on-fhir/fhir-support", target: "_blank" }, "Github"), ". To stay updated on the project, please follow ", (0, _hyperapp.h)("a", { href: "https://twitter.com/intent/user?screen_name=gotdan", target: "_blank" }, "@gotdan"), " and ", (0, _hyperapp.h)("a", { href: "https://twitter.com/intent/user?screen_name=smarthealthit", target: "_blank" }, "@smarthealthit"), " on twitter."))),



	error: function error(message) {
		return (0, _hyperapp.h)("div", { className: "row" }, (0, _hyperapp.h)("div", { className: "col-xs-12" },
				(0, _hyperapp.h)("div", { className: "alert alert-warning text-left" },
					message)));


	},
	link: function link(_ref) {var label = _ref.label,href = _ref.href;
		return (0, _hyperapp.h)("a", { target: "_blank", href: href }, label);
	},
	toggle: function toggle(_ref2) {var label = _ref2.label,clickHandler = _ref2.clickHandler;
		return (0, _hyperapp.h)("a", { className: "toggle", href: "#", onClick: clickHandler }, label);
	},
	column: function column(_ref3) {var width = _ref3.width,body = _ref3.body,key = _ref3.key,className = _ref3.className;
		className = "col-xs-" + width + " " + (className || "");
		return (0, _hyperapp.h)("div", { key: key, className: className },
			body);

	},
	titleColumn: function titleColumn(body) {
		return (0, _hyperapp.h)("div", { className: "col-xs-3 row-title" },
			body);

	},
	row: function row(_ref4) {var body = _ref4.body,className = _ref4.className;
		return (0, _hyperapp.h)("div", { "class": "row " + className },
			body);

	},
	multipartTitle: function multipartTitle(_ref5) {var primary = _ref5.primary,secondary = _ref5.secondary,className = _ref5.className;
		return (0, _hyperapp.h)("span", { className: className },
			primary, "\xA0", secondary);

	},
	note: function note(body) {
		return (0, _hyperapp.h)("li", null, body);
	},
	notes: function notes(_notes) {
		return (0, _hyperapp.h)("div", { className: "col-xs-12" }, (0, _hyperapp.h)("ul", { className: "noteList" },
				_notes));

	},
	button: function button(_ref6) {var label = _ref6.label,clickHandler = _ref6.clickHandler;
		return (0, _hyperapp.h)("a", { "class": "btn btn-primary", taget: "#", onClick: clickHandler }, label);
	},
	fa: function fa(_ref7) {var icon = _ref7.icon,title = _ref7.title,fixedWidth = _ref7.fixedWidth,spaceAfter = _ref7.spaceAfter;
		var className = "fa fa-" + icon + " " + (fixedWidth ? "fa-fw" : "");
		if (spaceAfter) {
			return (0, _hyperapp.h)("span", null, (0, _hyperapp.h)("i", { className: className, title: title }), " ");
		} else {
			return (0, _hyperapp.h)("i", { className: className, title: title });
		}
	},
	select: function select(_ref8) {var changeHandler = _ref8.changeHandler,options = _ref8.options;
		return (0, _hyperapp.h)("div", { className: "col-xs-3" },
			(0, _hyperapp.h)("select", { className: "form-control", onChange: changeHandler },
				options));


	},
	selectOption: function selectOption(_ref9) {var name = _ref9.name,value = _ref9.value,selected = _ref9.selected;
		name = name || value;
		return (0, _hyperapp.h)("option", { value: value, selected: selected }, name);
	} };

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
var _hyperapp = __webpack_require__(0);
var _components = __webpack_require__(5);var _components2 = _interopRequireDefault(_components);function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}

var getCustomNote = function getCustomNote(model, sandbox, path) {
	if (!sandbox) return;

	if (!model.config.sandboxes[sandbox].notes) {
		return null;
	} else {
		return model.config.sandboxes[sandbox].notes[
		path.join("/").toLowerCase().replace(/\s+/g, "-")];

	}
};

var mapColumns = function mapColumns(model, fn) {
	var _getColSandboxes = function _getColSandboxes(model, includeNull) {
		return model.config.columns.
		filter(function (c) {return includeNull ? true : c;}).
		slice(0, 3);
	};

	var sandboxes = _getColSandboxes(model, model.uiStatus == "edit_columns");
	var colWidth = model.uiStatus == "edit_columns" ? 3 : Math.floor(9 / sandboxes.length);
	return sandboxes.map(function (sandbox, i) {return fn(sandbox, i, colWidth);});
};

var renderConformanceErrors = function renderConformanceErrors(model, actions) {
	return mapColumns(model, function (sandbox) {
		if (model.config.sandboxes[sandbox] && model.config.sandboxes[sandbox].error) {
			return _components2.default.error("Error loading " +
			sandbox + " conformance statement: " + model.config.sandboxes[sandbox].error);

		};
	});
};

var renderHeaderRow = function renderHeaderRow(model, actions) {
	if (model.uiStatus == "edit_columns") {
		return renderEditableHeaderRow(model, actions);
	} else {
		return renderStaticHeaderRow(model, actions);
	}
};

var renderStaticHeaderRow = function renderStaticHeaderRow(model, actions) {
	var _editColumns = function _editColumns(e) {
		actions.setUiStatus({ status: "edit_columns" });
		e.preventDefault();
	};

	var columns = mapColumns(model, function (sandbox, i, colWidth) {
		var value = _components2.default.link({ label: sandbox, href: model.config.sandboxes[sandbox].documentation });
		return _components2.default.column({ width: colWidth, body: value, key: i });
	});
	var title = _components2.default.titleColumn(
	_components2.default.toggle({ label: "edit columns", clickHandler: _editColumns }));

	return _components2.default.row({ className: "header", body: [title, columns] });
};

var renderEditableHeaderRow = function renderEditableHeaderRow(model, actions) {
	var _endEdit = function _endEdit(e) {
		actions.setUiStatus({ status: "ready" });
		e.preventDefault();
	};

	var allSandboxes = Object.keys(model.config.sandboxes);
	var columns = [0, 1, 2].map(function (colNumber) {
		var _handleChange = function _handleChange(e) {
			actions.setColumn({ colNumber: colNumber, value: e.target.value });
		};
		var selected = model.config.columns[colNumber];
		var options = allSandboxes.map(function (sandbox) {
			return _components2.default.selectOption({ value: sandbox, selected: selected == sandbox });
		});
		options.unshift(_components2.default.selectOption({ value: "-", selected: !selected }));
		return _components2.default.select({ options: options, changeHandler: _handleChange });
	});

	var button = _components2.default.titleColumn(
	_components2.default.button({ label: "Done", clickHandler: _endEdit }));


	return _components2.default.row({ className: "header", body: [button, columns] });
};

var renderLoadingRow = function renderLoadingRow(model) {
	var columns = mapColumns(model, function (sandbox, i, colWidth) {
		var body = void 0;
		if (model.config.sandboxes[sandbox] && !model.config.sandboxes[sandbox].loaded) {
			body = _components2.default.loadingSpinner;
		}
		return _components2.default.column({ width: colWidth, body: body, key: i });
	});
	return _components2.default.row({ body: [_components2.default.titleColumn(""), columns] });
};

var renderSubheadRow = function renderSubheadRow(title) {
	return _components2.default.row({
		body: _components2.default.column({ width: 12, body: title, className: "subhead" }) });

};

var renderBinaryCell = function renderBinaryCell(value) {
	if (value) {
		return _components2.default.fa({ icon: "check", title: "yes" });
	} else if (value === false) {
		return _components2.default.fa({ icon: "times", title: "no" });
	} else {
		return "-";
	}
};

var renderRowTitle = function renderRowTitle(model, actions, name, type, hasNotes, notesVisible, hasParams, paramsVisible) {
	var _toggleNotes = function _toggleNotes(e) {
		actions.toggleExpanded({ targetType: type, targetValue: name, expansionType: "notesVisible" });
		e.preventDefault();
	};
	var _toggleParams = function _toggleParams(e) {
		actions.toggleExpanded({ targetType: type, targetValue: name, expansionType: "paramsVisible" });
		e.preventDefault();
	};

	var paramsToggle = void 0,notesToggle = void 0;
	if (hasParams) {
		var paramsLabel = model[type][name].paramsVisible ? "params [-]" : "params";
		paramsToggle = _components2.default.toggle({ label: paramsLabel, clickHandler: _toggleParams });
	}
	if (hasNotes) {
		var notesLabel = model[type][name].notesVisible ? "notes [-]" : "notes";
		notesToggle = _components2.default.toggle({ label: notesLabel, clickHandler: _toggleNotes });
	}

	return _components2.default.titleColumn([
	name,
	hasNotes || hasParams ? " " : null,
	paramsToggle,
	hasNotes && hasParams ? " | " : null,
	notesToggle]);

};

var renderRowNote = function renderRowNote(sandbox, text, isCustom) {
	return _components2.default.note("" + sandbox + (isCustom ? "*" : "") + ": " + text);
};

var renderFeatureRows = function renderFeatureRows(model, actions) {
	if (!model.featureSupport) return;

	var rows = [
	{ type: "text", name: "FHIR Version" }, { name: "JSON Format" },
	{ name: "XML Format" }, { name: "SMART" }];


	var _notesRenderer = function _notesRenderer(model, sandbox, name) {
		var notes = [];
		var note = getCustomNote(model, sandbox, ["feature", name]);
		if (note) notes.push(renderRowNote(sandbox, note, true));
		note = model.featureSupport[name][sandbox] &&
		model.featureSupport[name][sandbox].documentation;
		if (note) notes.push(renderRowNote(sandbox, note));
		return notes;
	};

	var _cellRenderer = function _cellRenderer(model, sandbox, feature, colWidth, key) {
		var body = model.featureSupport[feature.name][sandbox];
		if (feature.type != "text")
		body = renderBinaryCell(body);
		return _components2.default.column({ width: colWidth, body: body, key: key });
	};

	return rows.map(function (feature, i) {
		var name = feature.name;
		var notes = [];
		var columns = mapColumns(model, function (sandbox, j, colWidth) {
			var sandboxNotes = _notesRenderer(model, sandbox, name);
			notes = notes.concat(sandboxNotes);
			return _cellRenderer(model, sandbox, feature, colWidth, j);
		});
		var hasNotes = notes.length > 0;
		var notesVisible = model.featureSupport[name].notesVisible;
		var title = renderRowTitle(model, actions, name, "featureSupport", hasNotes, notesVisible);
		var renderedNotes = hasNotes && notesVisible ? _components2.default.notes(notes) : null;

		return _components2.default.row({
			className: i % 2 ? "zebra" : "", key: i,
			body: [title, columns, renderedNotes] });

	});

};

var renderResourceCell = function renderResourceCell(resourceDetail) {
	var codeToIcon = [
	["read", "file-o"], ["search-type", "search"],
	["create", "plus"], ["update", "pencil"], ["delete", "trash"]];


	if (!resourceDetail || !resourceDetail.interaction || !resourceDetail.interaction.length) {
		return _components2.default.emptyCell;
	}

	var icons = codeToIcon.filter(function (icon) {
		return resourceDetail.interaction.find(function (c) {return c.code === icon[0];});
	});

	return icons.map(function (i, k) {
		return _components2.default.fa({ icon: i[1], title: i[0], fixedWidth: true, spaceAfter: k < icons.length - 1 });
	});
};

var renderParamRows = function renderParamRows(model, resource, notesVisible, className) {

	var _cellRenderer = function _cellRenderer(model, sandbox, resource, param, colWidth, key) {
		var value = void 0;
		if (!model.resourceSupport[resource][sandbox]) {
			value = null;
		} else if (model.resourceSupport[resource].searchParam[param][sandbox]) {
			value = true;
		} else {
			value = false;
		}
		return _components2.default.column(
		{ width: colWidth, body: renderBinaryCell(value), key: key });

	};

	var _notesRenderer = function _notesRenderer(model, sandbox, resource, param) {
		var notes = [];
		var note = getCustomNote(model, sandbox, ["resource", resource, param]);
		if (note) notes.push(renderRowNote(sandbox, note, true));
		note = model.resourceSupport[resource].searchParam[param][sandbox] &&
		model.resourceSupport[resource].searchParam[param][sandbox].documentation;
		if (note) notes.push(renderRowNote(sandbox, note));
		return notes;
	};

	var _titleRenderer = function _titleRenderer(model, paramName) {
		paramName = paramName.split("+");
		return _components2.default.titleColumn(
		_components2.default.multipartTitle({
			primary: _components2.default.fa({ icon: "search", title: "search parameter", fixedWidth: true }),
			secondary: paramName[0] + " (" + paramName[1] + ")",
			className: "param-title" }));


	};

	var hasParamNotes = void 0;
	var rows = Object.keys(model.resourceSupport[resource].searchParam).map(function (param, i) {
		var notes = [];
		var columns = mapColumns(model, function (sandbox, j, colWidth) {
			var sandboxNotes = _notesRenderer(model, sandbox, resource, param);
			notes = notes.concat(sandboxNotes);
			return _cellRenderer(model, sandbox, resource, param, colWidth, j);
		});
		var title = _titleRenderer(model, param);
		if (notes.length > 0) hasParamNotes = true;
		var renderedNotes = notesVisible && notes.length > 0 ? _components2.default.notes(notes) : null;
		return _components2.default.row({
			className: className, body: [title, columns, renderedNotes], key: i });

	});

	return { rows: rows, hasNotes: hasParamNotes };
};

var renderResourceRows = function renderResourceRows(model, actions) {
	if (!model.resourceSupport) return;

	var _notesRenderer = function _notesRenderer(model, sandbox, resource) {
		var notes = [];
		var note = getCustomNote(model, sandbox, ["resource", resource]);
		if (note) notes.push(renderRowNote(sandbox, note, true));
		note = model.resourceSupport[resource][sandbox] &&
		model.resourceSupport[resource][sandbox].documentation;
		if (note) notes.push(renderRowNote(sandbox, note));
		return notes;
	};

	var _cellRenderer = function _cellRenderer(model, sandbox, resource, colWidth, key) {
		var value = renderResourceCell(model.resourceSupport[resource][sandbox]);
		return _components2.default.column({ width: colWidth, body: value, key: key });
	};

	return Object.keys(model.resourceSupport).sort().map(function (resource, i) {
		var notes = [];
		var columns = mapColumns(model, function (sandbox, j, colWidth) {
			var sandboxNotes = _notesRenderer(model, sandbox, resource);
			notes = notes.concat(sandboxNotes);
			return _cellRenderer(model, sandbox, resource, colWidth, j);
		});

		var hasResourceNotes = notes.length > 0;
		var notesVisible = model.resourceSupport[resource].notesVisible;
		var className = i % 2 ? "zebra" : "";

		var hasParams = model.resourceSupport[resource].searchParam ? true : false;
		var paramsVisible = model.resourceSupport[resource].paramsVisible;

		var paramRows = [];
		var hasParamNotes = false;
		if (paramsVisible) {
			var paramDetails = renderParamRows(model, resource, notesVisible, className);
			paramRows = paramDetails.rows;
			hasParamNotes = paramDetails.hasNotes;
		}

		var hasNotes = hasResourceNotes || hasParamNotes;
		var title = renderRowTitle(model, actions, resource, "resourceSupport",
		hasNotes, notesVisible, hasParams, paramsVisible);
		var renderedNotes = hasResourceNotes && notesVisible ? _components2.default.notes(notes) : null;
		var resourceRow = _components2.default.row({
			className: className, body: [title, columns, renderedNotes], key: i });

		return [resourceRow, paramRows];

	});

};


var view = function view(model, actions) {
	if (model.uiStatus == "loading") {
		return _components2.default.loading;
	} else if (model.uiStatus == "configError") {
		return _components2.default.error("Error loading config file: " + model.uiMessage);
	}

	return (0, _hyperapp.h)("div", null,
		_components2.default.pageHeader,
		renderConformanceErrors(model),
		renderHeaderRow(model, actions),
		renderLoadingRow(model),
		(0, _hyperapp.h)("div", { className: "section" },
			renderSubheadRow("Support:"),
			renderFeatureRows(model, actions)),
		(0, _hyperapp.h)("div", { className: "section" },
			renderSubheadRow("Resources:"),
			renderResourceRows(model, actions)),

		_components2.default.footer);


};

module.exports = view;

/***/ }),
/* 7 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony default export */ __webpack_exports__["a"] = function (app) {
  var view = app.view || function () {
    return ""
  }

  var model
  var actions = {}
  var subscriptions = []
  var hooks = {
    onError: [],
    onAction: [],
    onUpdate: [],
    onRender: []
  }

  var plugins = [app].concat((app.plugins || []).map(function (plugin) {
    return plugin(app)
  }))

  var node
  var root
  var batch = []

  for (var i = 0; i < plugins.length; i++) {
    var plugin = plugins[i]

    if (plugin.model !== undefined) {
      model = merge(model, plugin.model)
    }

    if (plugin.actions) {
      init(actions, plugin.actions)
    }

    if (plugin.subscriptions) {
      subscriptions = subscriptions.concat(plugin.subscriptions)
    }

    var _hooks = plugin.hooks
    if (_hooks) {
      Object.keys(_hooks).forEach(function (key) {
        hooks[key].push(_hooks[key])
      })
    }
  }

  function onError(error) {
    for (var i = 0; i < hooks.onError.length; i++) {
      hooks.onError[i](error)
    }

    if (i <= 0) {
      throw error
    }
  }

  function init(container, group, lastName) {
    Object.keys(group).forEach(function (key) {
      if (!container[key]) {
        container[key] = {}
      }

      var name = lastName ? lastName + "." + key : key
      var action = group[key]
      var i

      if (typeof action === "function") {
        container[key] = function (data) {
          for (i = 0; i < hooks.onAction.length; i++) {
            hooks.onAction[i](name, data)
          }

          var result = action(model, data, actions, onError)

          if (result === undefined || typeof result.then === "function") {
            return result

          } else {
            for (i = 0; i < hooks.onUpdate.length; i++) {
              hooks.onUpdate[i](model, result, data)
            }

            model = merge(model, result)
            render(model, view)
          }
        }
      } else {
        init(container[key], action, name)
      }
    })
  }

  load(function () {
    root = app.root || document.body.appendChild(document.createElement("div"))

    render(model, view)

    for (var i = 0; i < subscriptions.length; i++) {
      subscriptions[i](model, actions, onError)
    }
  })

  function load(fn) {
    if (document.readyState[0] !== "l") {
      fn()
    } else {
      document.addEventListener("DOMContentLoaded", fn)
    }
  }

  function render(model, view) {
    for (i = 0; i < hooks.onRender.length; i++) {
      view = hooks.onRender[i](model, view)
    }

    patch(root, node, node = view(model, actions), 0)

    for (var i = 0; i < batch.length; i++) {
      batch[i]()
    }

    batch = []
  }

  function merge(a, b) {
    var obj = {}
    var key

    if (isPrimitive(b) || Array.isArray(b)) {
      return b
    }

    for (key in a) {
      obj[key] = a[key]
    }
    for (key in b) {
      obj[key] = b[key]
    }

    return obj
  }

  function isPrimitive(type) {
    type = typeof type
    return type === "string" || type === "number" || type === "boolean"
  }

  function defer(fn, data) {
    setTimeout(function () {
      fn(data)
    }, 0)
  }

  function shouldUpdate(a, b) {
    return a.tag !== b.tag || typeof a !== typeof b || isPrimitive(a) && a !== b
  }

  function createElementFrom(node) {
    var element

    // There are only two types of nodes. A string node, which is
    // converted into a Text node or an object that describes an
    // HTML element and may also contain children.

    if (typeof node === "string") {
      element = document.createTextNode(node)

    } else {
      element = node.data && node.data.ns
        ? document.createElementNS(node.data.ns, node.tag)
        : document.createElement(node.tag)

      for (var name in node.data) {
        if (name === "onCreate") {
          defer(node.data[name], element)
        } else {
          setElementData(element, name, node.data[name])
        }
      }

      for (var i = 0; i < node.children.length; i++) {
        element.appendChild(createElementFrom(node.children[i]))
      }
    }

    return element
  }

  function removeElementData(element, name, value) {
    // Hyperx adds a className attribute to nodes we must handle.

    element.removeAttribute(name === "className" ? "class" : name)

    if (typeof value === "boolean" || value === "true" || value === "false") {
      element[name] = false
    }
  }

  function setElementData(element, name, value, oldValue) {
    if (name === "style") {
      for (var i in value) {
        element.style[i] = value[i]
      }

    } else if (name[0] === "o" && name[1] === "n") {
      var event = name.substr(2).toLowerCase()

      element.removeEventListener(event, oldValue)
      element.addEventListener(event, value)

    } else {
      if (value === "false" || value === false) {
        element.removeAttribute(name)
        element[name] = false

      } else {
        element.setAttribute(name, value)
        if (element.namespaceURI !== "http://www.w3.org/2000/svg") {
          // SVG element's props are read only in strict mode.

          element[name] = value
        }
      }
    }
  }

  function updateElementData(element, data, oldData) {
    for (var name in merge(oldData, data)) {
      var value = data[name]
      var oldValue = oldData[name]
      var realValue = element[name]

      if (value === undefined) {
        removeElementData(element, name, oldValue)

      } else if (name === "onUpdate") {
        defer(value, element)

      } else if (
        value !== oldValue ||
        typeof realValue === "boolean" &&
        realValue !== value
      ) {
        // This prevents cases where the node's data is out of sync with
        // the element's. For example, a list of checkboxes in which one
        // of the elements is recycled.

        setElementData(element, name, value, oldValue)
      }
    }
  }

  function patch(parent, oldNode, node, index) {
    if (oldNode === undefined) {
      parent.appendChild(createElementFrom(node))

    } else if (node === undefined) {
      var element = parent.childNodes[index]

      // Removing a child one at a time updates the DOM, so we end up
      // with an index out of date that needs to be adjusted. Instead,
      // collect all the elements and delete them in a batch.

      batch.push(parent.removeChild.bind(parent, element))

      if (oldNode && oldNode.data && oldNode.data.onRemove) {
        defer(oldNode.data.onRemove, element)
      }

    } else if (shouldUpdate(node, oldNode)) {
      parent.replaceChild(createElementFrom(node), parent.childNodes[index])

    } else if (node.tag) {
      var element = parent.childNodes[index]

      updateElementData(element, node.data, oldNode.data)

      var len = node.children.length, oldLen = oldNode.children.length

      for (var i = 0; i < len || i < oldLen; i++) {
        var child = node.children[i]

        patch(element, oldNode.children[i], child, i)
      }
    }
  }
};


/***/ }),
/* 8 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var i, node, children, stack = []

/* harmony default export */ __webpack_exports__["a"] = function (tag, data) {
  var canConcat, oldCanConcat

  children = []
  i = arguments.length

  while (i-- > 2) {
    stack.push(arguments[i])
  }

  while (stack.length) {
    if (Array.isArray(node = stack.pop())) {
      i = node.length

      while (i--) {
        stack.push(node[i])
      }
    } else if (node != null && node !== true && node !== false) {
      // Ignore nulls and booleans; this is conditional rendering.

      if (typeof node === "number") {
        node = node + ""
      }

      // Concatenate contiguous number/string nodes into one string.
      // The idea is to avoid creating unnecessary text nodes.

      canConcat = typeof node === "string"

      if (canConcat && oldCanConcat) {
        children[children.length - 1] += node
      } else {
        children.push(node)
        oldCanConcat = canConcat
      }
    }
  }

  if (typeof tag === "function") {
    return tag(data, children)
  }

  if (tag === "svg") {
    svg(tag, data, children)
  }

  return {
    tag: tag,
    data: data || {},
    children: children
  }
};

function svg(tag, data, children) {
  data.ns = "http://www.w3.org/2000/svg"

  for (var i = 0; i < children.length; i++) {
    var node = children[i]
    if (node.data) {
      svg(node.tag, node.data, node.children)
    }
  }
}


/***/ }),
/* 9 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony default export */ __webpack_exports__["a"] = function (options) {
  return {
    model: {
      router: match(options.view, location.pathname)
    },
    actions: {
      router: {
        match: function (_, data) {
          return {
            router: match(options.view, data)
          }
        },
        go: function (_, data, actions) {
          history.pushState({}, "", data)
          actions.router.match(data)
        }
      }
    },
    hooks: {
      onRender: function (model) {
        return options.view[model.router.match]
      }
    },
    subscriptions: [
      function (_, actions) {
        addEventListener("popstate", function () {
          actions.router.match(location.pathname)
        })
      }
    ]
  }
};

function match(routes, path) {
  var match, params = {}

  for (var route in routes) {
    var keys = []

    if (route === "*") {
      continue
    }

    path.replace(new RegExp("^" + route
      .replace(/\//g, "\\/")
      .replace(/:([A-Za-z0-9_]+)/g, function (_, key) {
        keys.push(key)
        return "([A-Za-z0-9_]+)"
      }) + "/?$", "g"), function () {

        for (var i = 1; i < arguments.length - 2; i++) {
          params[keys.shift()] = arguments[i]
        }
        match = route
      })

    if (match) {
      break
    }
  }

  return {
    match: match || "*",
    params: params
  }
}


/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(3);
__webpack_require__(2);
module.exports = __webpack_require__(1);


/***/ })
/******/ ]);
//# sourceMappingURL=bundle.499e9cb195e86438ad3b.js.map