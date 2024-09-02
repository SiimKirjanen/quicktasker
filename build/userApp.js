/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/hooks/useQueryParams.ts":
/*!*************************************!*\
  !*** ./src/hooks/useQueryParams.ts ***!
  \*************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
const useQueryParams = () => {
  const getQueryParam = param => {
    const searchParams = new URLSearchParams(window.location.search);
    return searchParams.get(param);
  };
  return {
    getQueryParam
  };
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (useQueryParams);

/***/ }),

/***/ "./src/user-page-app/UserPageApp.tsx":
/*!*******************************************!*\
  !*** ./src/user-page-app/UserPageApp.tsx ***!
  \*******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-runtime */ "react/jsx-runtime");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _components_Pages_Page_PageWrap__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./components/Pages/Page/PageWrap */ "./src/user-page-app/components/Pages/Page/PageWrap.tsx");
/* harmony import */ var _providers_UserPageAppContextProvider__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./providers/UserPageAppContextProvider */ "./src/user-page-app/providers/UserPageAppContextProvider.tsx");
/* harmony import */ var _hooks_useCurrentUsePage__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./hooks/useCurrentUsePage */ "./src/user-page-app/hooks/useCurrentUsePage.tsx");




function UserPageApp() {
  return (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_providers_UserPageAppContextProvider__WEBPACK_IMPORTED_MODULE_2__.UserPageAppContextProvider, {
    children: (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(UserPageContent, {})
  });
}
function UserPageContent() {
  const currentPage = (0,_hooks_useCurrentUsePage__WEBPACK_IMPORTED_MODULE_3__.useCurrentUserPage)();
  return (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_Pages_Page_PageWrap__WEBPACK_IMPORTED_MODULE_1__.PageWrap, {
    children: currentPage
  });
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (UserPageApp);

/***/ }),

/***/ "./src/user-page-app/api/user-page-api.ts":
/*!************************************************!*\
  !*** ./src/user-page-app/api/user-page-api.ts ***!
  \************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   getUserPageStatusRequest: () => (/* binding */ getUserPageStatusRequest),
/* harmony export */   setUpUserPageRequest: () => (/* binding */ setUpUserPageRequest)
/* harmony export */ });
/* harmony import */ var _wordpress_api_fetch__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/api-fetch */ "@wordpress/api-fetch");
/* harmony import */ var _wordpress_api_fetch__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_api_fetch__WEBPACK_IMPORTED_MODULE_0__);

function getUserPageStatusRequest(pageHash) {
  return _wordpress_api_fetch__WEBPACK_IMPORTED_MODULE_0___default()({
    path: `/wpqt/v1/user-page/${pageHash}/status`,
    method: "GET"
  });
}
function setUpUserPageRequest(pageHash, data) {
  return _wordpress_api_fetch__WEBPACK_IMPORTED_MODULE_0___default()({
    path: `/wpqt/v1/user-page/${pageHash}/setup`,
    data,
    method: "POST"
  });
}


/***/ }),

/***/ "./src/user-page-app/components/Pages/AssignableTasksPage/AssignableTasksPage.tsx":
/*!****************************************************************************************!*\
  !*** ./src/user-page-app/components/Pages/AssignableTasksPage/AssignableTasksPage.tsx ***!
  \****************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   AssignableTasksPage: () => (/* binding */ AssignableTasksPage)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-runtime */ "react/jsx-runtime");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);

function AssignableTasksPage() {
  return (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
    children: (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("h1", {
      children: "Assignable Tasks"
    })
  });
}


/***/ }),

/***/ "./src/user-page-app/components/Pages/ErrorPage/ErrorPage.tsx":
/*!********************************************************************!*\
  !*** ./src/user-page-app/components/Pages/ErrorPage/ErrorPage.tsx ***!
  \********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   ErrorPage: () => (/* binding */ ErrorPage)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-runtime */ "react/jsx-runtime");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);

function ErrorPage() {
  return (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
    children: (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("h1", {
      children: "Page not found"
    })
  });
}


/***/ }),

/***/ "./src/user-page-app/components/Pages/HomePage/HomePage.tsx":
/*!******************************************************************!*\
  !*** ./src/user-page-app/components/Pages/HomePage/HomePage.tsx ***!
  \******************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   HomePage: () => (/* binding */ HomePage)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-runtime */ "react/jsx-runtime");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);

function HomePage() {
  return (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
    children: (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("h1", {
      children: "Home!"
    })
  });
}


/***/ }),

/***/ "./src/user-page-app/components/Pages/Page/PageWrap.tsx":
/*!**************************************************************!*\
  !*** ./src/user-page-app/components/Pages/Page/PageWrap.tsx ***!
  \**************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   PageWrap: () => (/* binding */ PageWrap)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-runtime */ "react/jsx-runtime");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);

function PageWrap({
  children
}) {
  return (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
    children: children
  });
}


/***/ }),

/***/ "./src/user-page-app/components/Pages/SetUpPage/SetUpPage.tsx":
/*!********************************************************************!*\
  !*** ./src/user-page-app/components/Pages/SetUpPage/SetUpPage.tsx ***!
  \********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   SetUpPage: () => (/* binding */ SetUpPage)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-runtime */ "react/jsx-runtime");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _api_user_page_api__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../api/user-page-api */ "./src/user-page-app/api/user-page-api.ts");
/* harmony import */ var _providers_UserPageAppContextProvider__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../providers/UserPageAppContextProvider */ "./src/user-page-app/providers/UserPageAppContextProvider.tsx");
var __awaiter = undefined && undefined.__awaiter || function (thisArg, _arguments, P, generator) {
  function adopt(value) {
    return value instanceof P ? value : new P(function (resolve) {
      resolve(value);
    });
  }
  return new (P || (P = Promise))(function (resolve, reject) {
    function fulfilled(value) {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    }
    function rejected(value) {
      try {
        step(generator["throw"](value));
      } catch (e) {
        reject(e);
      }
    }
    function step(result) {
      result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
    }
    step((generator = generator.apply(thisArg, _arguments || [])).next());
  });
};




function SetUpPage() {
  const {
    state: {
      pageHash
    }
  } = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useContext)(_providers_UserPageAppContextProvider__WEBPACK_IMPORTED_MODULE_3__.UserPageAppContext);
  const setUpUserPage = () => __awaiter(this, void 0, void 0, function* () {
    const data = {
      password: "siim"
    };
    try {
      yield (0,_api_user_page_api__WEBPACK_IMPORTED_MODULE_2__.setUpUserPageRequest)(pageHash, data);
    } catch (error) {
      console.error(error);
    }
  });
  return (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
    children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("h1", {
      children: "Set Up Page"
    }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("button", {
      onClick: setUpUserPage,
      children: "Setup"
    })]
  });
}


/***/ }),

/***/ "./src/user-page-app/components/Pages/UserTasksPage/UserTasksPage.tsx":
/*!****************************************************************************!*\
  !*** ./src/user-page-app/components/Pages/UserTasksPage/UserTasksPage.tsx ***!
  \****************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   UserTasksPage: () => (/* binding */ UserTasksPage)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-runtime */ "react/jsx-runtime");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);

function UserTasksPage() {
  return (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
    children: (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("h1", {
      children: "Assigned Tasks"
    })
  });
}


/***/ }),

/***/ "./src/user-page-app/constants.ts":
/*!****************************************!*\
  !*** ./src/user-page-app/constants.ts ***!
  \****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   SET_USER_PAGE_STATUS: () => (/* binding */ SET_USER_PAGE_STATUS)
/* harmony export */ });
const SET_USER_PAGE_STATUS = "SET_USER_PAGE_STATUS";


/***/ }),

/***/ "./src/user-page-app/hooks/useCurrentUsePage.tsx":
/*!*******************************************************!*\
  !*** ./src/user-page-app/hooks/useCurrentUsePage.tsx ***!
  \*******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   useCurrentUserPage: () => (/* binding */ useCurrentUserPage)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-runtime */ "react/jsx-runtime");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _components_Pages_HomePage_HomePage__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../components/Pages/HomePage/HomePage */ "./src/user-page-app/components/Pages/HomePage/HomePage.tsx");
/* harmony import */ var _components_Pages_UserTasksPage_UserTasksPage__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../components/Pages/UserTasksPage/UserTasksPage */ "./src/user-page-app/components/Pages/UserTasksPage/UserTasksPage.tsx");
/* harmony import */ var _components_Pages_AssignableTasksPage_AssignableTasksPage__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../components/Pages/AssignableTasksPage/AssignableTasksPage */ "./src/user-page-app/components/Pages/AssignableTasksPage/AssignableTasksPage.tsx");
/* harmony import */ var _providers_UserPageAppContextProvider__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../providers/UserPageAppContextProvider */ "./src/user-page-app/providers/UserPageAppContextProvider.tsx");
/* harmony import */ var _components_Pages_SetUpPage_SetUpPage__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../components/Pages/SetUpPage/SetUpPage */ "./src/user-page-app/components/Pages/SetUpPage/SetUpPage.tsx");
/* harmony import */ var _components_Pages_ErrorPage_ErrorPage__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../components/Pages/ErrorPage/ErrorPage */ "./src/user-page-app/components/Pages/ErrorPage/ErrorPage.tsx");








function useCurrentUserPage() {
  const {
    state: {
      isActiveUser,
      setupCompleted,
      loading
    }
  } = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useContext)(_providers_UserPageAppContextProvider__WEBPACK_IMPORTED_MODULE_5__.UserPageAppContext);
  const [currentPage, setCurrentPage] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useState)(getCurrentPage());
  function getCurrentPage() {
    if (loading) {
      return (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
        children: "Loading..."
      });
    }
    if (!setupCompleted) {
      return (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_Pages_SetUpPage_SetUpPage__WEBPACK_IMPORTED_MODULE_6__.SetUpPage, {});
    }
    if (!isActiveUser) {
      return (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_Pages_ErrorPage_ErrorPage__WEBPACK_IMPORTED_MODULE_7__.ErrorPage, {});
    }
    return getPageFromUrl();
  }
  (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useEffect)(() => {
    const handleUrlChange = () => {
      setCurrentPage(getCurrentPage());
    };
    handleUrlChange();
    window.addEventListener("popstate", handleUrlChange);
    window.addEventListener("hashchange", handleUrlChange);
    return () => {
      window.removeEventListener("popstate", handleUrlChange);
      window.removeEventListener("hashchange", handleUrlChange);
    };
  }, []);
  (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useEffect)(() => {
    setCurrentPage(getCurrentPage());
  }, [isActiveUser, setupCompleted, loading]);
  return currentPage;
}
const getPageFromUrl = () => {
  const {
    hash
  } = getUrlParams();
  switch (hash) {
    case "#/user-tasks":
      return (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_Pages_UserTasksPage_UserTasksPage__WEBPACK_IMPORTED_MODULE_3__.UserTasksPage, {});
    case "#/assignable-tasks":
      return (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_Pages_AssignableTasksPage_AssignableTasksPage__WEBPACK_IMPORTED_MODULE_4__.AssignableTasksPage, {});
    default:
      return (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_Pages_HomePage_HomePage__WEBPACK_IMPORTED_MODULE_2__.HomePage, {});
  }
};
const getUrlParams = () => {
  const hash = window.location.hash;
  return {
    hash
  };
};


/***/ }),

/***/ "./src/user-page-app/providers/UserPageAppContextProvider.tsx":
/*!********************************************************************!*\
  !*** ./src/user-page-app/providers/UserPageAppContextProvider.tsx ***!
  \********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   UserPageAppContext: () => (/* binding */ UserPageAppContext),
/* harmony export */   UserPageAppContextProvider: () => (/* binding */ UserPageAppContextProvider)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-runtime */ "react/jsx-runtime");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _reducers_user_page_app_reducer__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../reducers/user-page-app-reducer */ "./src/user-page-app/reducers/user-page-app-reducer.ts");
/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../constants */ "./src/user-page-app/constants.ts");
/* harmony import */ var _api_user_page_api__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../api/user-page-api */ "./src/user-page-app/api/user-page-api.ts");
/* harmony import */ var _hooks_useQueryParams__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../hooks/useQueryParams */ "./src/hooks/useQueryParams.ts");
var __awaiter = undefined && undefined.__awaiter || function (thisArg, _arguments, P, generator) {
  function adopt(value) {
    return value instanceof P ? value : new P(function (resolve) {
      resolve(value);
    });
  }
  return new (P || (P = Promise))(function (resolve, reject) {
    function fulfilled(value) {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    }
    function rejected(value) {
      try {
        step(generator["throw"](value));
      } catch (e) {
        reject(e);
      }
    }
    function step(result) {
      result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
    }
    step((generator = generator.apply(thisArg, _arguments || [])).next());
  });
};






const initialState = {
  loading: true,
  isActiveUser: false,
  setupCompleted: false,
  pageHash: ""
};
const UserPageAppContext = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createContext)({
  state: initialState,
  userPageAppDispatch: () => {}
});
const UserPageAppContextProvider = ({
  children
}) => {
  const [state, userPageAppDispatch] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useReducer)(_reducers_user_page_app_reducer__WEBPACK_IMPORTED_MODULE_2__.reducer, initialState);
  const {
    getQueryParam
  } = (0,_hooks_useQueryParams__WEBPACK_IMPORTED_MODULE_5__["default"])();
  (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useEffect)(() => {
    getUserPageStatus();
  }, []);
  const getUserPageStatus = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
      const pageHash = getQueryParam("code");
      if (pageHash) {
        const {
          data
        } = yield (0,_api_user_page_api__WEBPACK_IMPORTED_MODULE_4__.getUserPageStatusRequest)(pageHash);
        userPageAppDispatch({
          type: _constants__WEBPACK_IMPORTED_MODULE_3__.SET_USER_PAGE_STATUS,
          payload: Object.assign(Object.assign({}, data), {
            pageHash
          })
        });
      }
    } catch (error) {}
  });
  return (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(UserPageAppContext.Provider, {
    value: {
      state,
      userPageAppDispatch
    },
    children: children
  });
};


/***/ }),

/***/ "./src/user-page-app/reducers/user-page-app-reducer.ts":
/*!*************************************************************!*\
  !*** ./src/user-page-app/reducers/user-page-app-reducer.ts ***!
  \*************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   reducer: () => (/* binding */ reducer)
/* harmony export */ });
/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../constants */ "./src/user-page-app/constants.ts");

const transformServerUserPageStatus = serverPageStatus => Object.assign(Object.assign({}, serverPageStatus), {
  isActiveUser: serverPageStatus.isActiveUser === "1"
});
const reducer = (state, action) => {
  switch (action.type) {
    case _constants__WEBPACK_IMPORTED_MODULE_0__.SET_USER_PAGE_STATUS:
      {
        const serverUserPageStatus = action.payload;
        const userPageStatus = transformServerUserPageStatus(serverUserPageStatus);
        return Object.assign(Object.assign(Object.assign({}, state), userPageStatus), {
          loading: false
        });
      }
    default:
      return state;
  }
};


/***/ }),

/***/ "react/jsx-runtime":
/*!**********************************!*\
  !*** external "ReactJSXRuntime" ***!
  \**********************************/
/***/ ((module) => {

module.exports = window["ReactJSXRuntime"];

/***/ }),

/***/ "@wordpress/api-fetch":
/*!**********************************!*\
  !*** external ["wp","apiFetch"] ***!
  \**********************************/
/***/ ((module) => {

module.exports = window["wp"]["apiFetch"];

/***/ }),

/***/ "@wordpress/element":
/*!*********************************!*\
  !*** external ["wp","element"] ***!
  \*********************************/
/***/ ((module) => {

module.exports = window["wp"]["element"];

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
/*!************************************!*\
  !*** ./src/user-page-app/index.js ***!
  \************************************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _UserPageApp__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./UserPageApp */ "./src/user-page-app/UserPageApp.tsx");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react/jsx-runtime */ "react/jsx-runtime");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__);



(0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.render)( /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)(_UserPageApp__WEBPACK_IMPORTED_MODULE_1__["default"], {}), document.getElementById("wpqt-public-user-app"));
/******/ })()
;
//# sourceMappingURL=userApp.js.map