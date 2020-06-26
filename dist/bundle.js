/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
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
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
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
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./public/app.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./public/app.js":
/*!***********************!*\
  !*** ./public/app.js ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("$(document).ready(function() {\r\n    console.log(1);\r\n    let url = window.location.href.toString().split(window.location.host)[1];\r\n    let isAllWordsRoute = true;\r\n    var urlWord;\r\n    if (url.includes('/words/')) {\r\n        isAllWordsRoute = false;\r\n        urlWord = url.split('/words/')[1];\r\n    }\r\n\r\n    if (isAllWordsRoute) {\r\n        $.getJSON('/api/words')\r\n        .then(addMediaBreakdown)\r\n        .catch((err) => {\r\n            alert(`Uh oh. Something went wrong. ${err}`);\r\n        })\r\n    } else {\r\n        $.getJSON(`/api/words/${urlWord}`)\r\n        .then(addWordBreakdown)\r\n        .catch((err) => {\r\n            alert(`Uh oh. Something went wrong. ${err}`);\r\n        })\r\n    }\r\n    \r\n\r\n});\r\nconsole.log(2);\r\nfunction addMediaBreakdown(mediaSources) {\r\n    $(\"#home-view\").append(Object.keys(mediaSources).map(source => {\r\n        return `<div><h3>${source}</h3><ul class=\"word-count-list\">${Object.keys(mediaSources[source]).map(word => {\r\n            return `<li class=\"first-dummy-class wcl-${source}\"><a href=\"/words/${source}/${word}\">${word}</a>: ${mediaSources[source][word]}</li>`\r\n        }).join('')}</ul></div>`;\r\n    }).join(''));\r\n}\r\n\r\nfunction addWordBreakdown(breakdowns) {\r\n    toggleClasses(document.getElementById(\"home-view\"), \"hide\", \"show\");\r\n    toggleClasses(document.getElementById(\"word-view\"), \"hide\", \"show\");\r\n    let word = Object.keys(breakdowns)[0];\r\n    $(\"#selected-word\").text(word);\r\n    Object.keys(breakdowns[word]).forEach(id => {\r\n        let newCount = `<li><a href=\"https://${breakdowns[word][id].url}\">${breakdowns[word][id].name}</a>: ${breakdowns[word][id].num}</li>`;\r\n        $(\".word-article-list\").append(newCount);\r\n    });\r\n}\r\n\r\nfunction toggleClasses(element, ...classNames) {\r\n    classNames.forEach(name => element.classList.toggle(name));\r\n}\r\n\r\n\r\nfunction toS(obj) {\r\n    Object.keys(obj).forEach(k => {\r\n      console.log(`${k}=${obj[k]}`);\r\n    })\r\n  }\r\n\r\nfunction clog(obj) {\r\n    console.log(`thisObject=${obj}`);\r\n    console.log(`thisObjectKeys=${Object.keys(obj)}`);\r\n}\n\n//# sourceURL=webpack:///./public/app.js?");

/***/ })

/******/ });