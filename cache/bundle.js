(function () {
  'use strict';

  // Define global constants
  const PromptPlaceholder = '[PROMPT]';
  const TargetLanguagePlaceholder = '[TARGETLANGUAGE]';
  // Database global constants

  const EndpointConversation = "https:\/\/chat\\.openai\\.com\/backend-api\/(conversation|complete)$";
  const AppSlogan = 'IN_BOUND';
  const ExportFilePrefix = 'IN_BOUND-export-chatgpt-thread_';
  const ExportHeaderPrefix =
    '\n```\n';
  const APIEndpoint = "https://api.workengine.ai/api";

  /** @enum {string} */
  const PromptTemplatesType = {
    PUBLIC: 'public',
    OWN: 'own',
  };

  /** @enum {string} */
  const NotificationSeverity = {
    SUCCESS: 'success',
    WARNING: 'warning',
    ERROR: 'error',
  };

  /** @enum {number} */
  const PromptTypeNo = {
    UNKNOWN: 0,
    PRIVATE: 1,
    PUBLIC: 2,
    PAID: 3,
  };

  /** @enum {number} */
  const FeedbackTypeNo = {
    UNKNOWN: 0,
    GENERIC_CONCERN: 1,
    GENERIC_LEGAL_CONCERN: 2,
    LEGAL_COPYRIGHT: 10,
    LEGAL_DMCA: 11,
    LEGAL_TRADEMARK: 12,
    PERSONAL_INFO: 20,
    ABUSIVE: 21,
    ILLEGAL: 22,
    NOT_MULTILINGUAL: 51,
    NOT_GENERIC: 52,
    SPAM: 91,
    PROMPT_SUPPORT_FREE: 101,
    PROMPT_SUPPORT_PAID: 102,
    PROMPT_SUPPORT_WANT_PAID: 103,
  };

  /** @enum {number} */
  const VoteTypeNo = {
    UNKNOWN: 0,
    PROMPT_TEASER_THUMBS: 1,
    RESULT_THUMBS: 2,
    FOLLOW_UP_THUMBS: 4,
    MESSAGE_CONFIRM: 8,
    MESSAGE_LIKE: 16,
    MESSAGE_DISLIKE: 32,
  };

  /** @enum {number} */
  const SortModeNo = {
    //UNKNOWN: 0, // not used & not displayed in the "Sort by" dropdown
    TOP_VIEWS: 1,
    TOP_VOTES: 2,
    LATEST_UPDATES: 4,
  };

  /** @enum {number} */
  const MessageStatusNo = {
    UNKNOWN: 0,
    DELETE_MARK: 20,
    DELETE_DONE: 29,
    INACTIVE: 99,
    ACTIVE: 100,
  };

  /** @enum {number} */
  const MessageSeverityNo = {
    UNKNOWN: 0,
    INFO: 1,
    SUCCESS: 2,
    UPDATE: 4,
    MANDATORY_MUST_CONFIRM: 8,
  };

  /** @enum {number} */
  const MessageVoteTypeNo = {
    UNKNOWN: VoteTypeNo.UNKNOWN,
    MESSAGE_LIKE: VoteTypeNo.MESSAGE_LIKE,
    MESSAGE_DISLIKE: VoteTypeNo.MESSAGE_DISLIKE,
  };

  /** @enum {number} */
  const UserStatusNo = {
    UNKNOWN: 0,
    NORMAL: 1,
    ADMIN: 2,
    BLACKLIST_BAN: 4,
    BLACKLIST_NO_WRITE: 8,
    BLACKLIST_NO_PUBLIC: 16,
  };

  /** @enum {number} */
  const ReactionNo = {
    RXN_INBOUND_ACCESS_FORBIDDEN: 70005,

    RXN_INBOUND_OVER_LIMIT_PROMPTS: 70009,

    RXN_INBOUND_INVALID_PROMPT_TITLE_LANG: 70100,
    RXN_INBOUND_INVALID_PROMPT_TEASER_LANG: 70101,
    RXN_INBOUND_INVALID_PROMPT_HINT_LANG: 70102,
    RXN_INBOUND_INVALID_PROMPT_TITLE_UPPERCASE: 70103,
    RXN_INBOUND_INVALID_PROMPT_TITLE_WORD_COUNT: 70104,
    RXN_INBOUND_INVALID_PROMPT_TEASER_UPPERCASE: 70105,
    RXN_INBOUND_INVALID_PROMPT_HINT_UPPERCASE: 70106,
  };

  /** @enum {string} */
  const ReactionMessage = {
    [ReactionNo.RXN_INBOUND_ACCESS_FORBIDDEN]:
      'The requested action is not allowed.',

    [ReactionNo.RXN_INBOUND_OVER_LIMIT_PROMPTS]:
      "You've reached the maximum number of prompts.",

    [ReactionNo.RXN_INBOUND_INVALID_PROMPT_TITLE_LANG]:
      'The prompt title is not in English.',
    [ReactionNo.RXN_INBOUND_INVALID_PROMPT_TEASER_LANG]:
      'The prompt teaser is not in English.',
    [ReactionNo.RXN_INBOUND_INVALID_PROMPT_HINT_LANG]:
      'The prompt hint is not in English.',
    [ReactionNo.RXN_INBOUND_INVALID_PROMPT_TITLE_UPPERCASE]:
      'The prompt title has too many uppercase letters.',
    [ReactionNo.RXN_INBOUND_INVALID_PROMPT_TITLE_WORD_COUNT]:
      'The prompt title is too long.',
    [ReactionNo.RXN_INBOUND_INVALID_PROMPT_TEASER_UPPERCASE]:
      'The prompt teaser has too many uppercase letters.',
    [ReactionNo.RXN_INBOUND_INVALID_PROMPT_HINT_UPPERCASE]:
      'The prompt hint has too many uppercase letters.',
  };

  class Reaction extends Error {
    /** @type {string} - mapped reaction message shown to user */
    message = '';

    /** @param {string} message */
    constructor(message) {
      super(message);

      this.message = message;
    }

    /**
     * Maps a ReactionNo to a ReactionMessage and returns a new Reaction
     *
     * @param {ReactionNo} currentReactionNo
     * @returns {Reaction}
     */
    static mapReactionNo(currentReactionNo) {
      return new Reaction(
        ReactionMessage[currentReactionNo]
          ? ReactionMessage[currentReactionNo]
          : 'Something went wrong, please try again later.'
      );
    }
  }

  // generate anonymous user footprint using FingerprintJS to prevent abuse
  // async function generateUserFootprint() {
  //   const fpPromise = FingerprintJS.load({
  //     monitoring: false,
  //   });

  //   const fp = await fpPromise;
  //   const result = await fp.get();

  //   return `${userFootprintVersion}-${result.visitorId}`;
  // }

  const IN_BOUNDClient = {
    APIEndpoint,

    /** @type {{ExternalID: string, ExternalSystemNo: ExternalSystemNo, Email: string, Name: string, UserStatusNo: UserStatusNo, UserFootprint: string, MaxNewPublicPromptsAllowed: number, MaxNewPrivatePromptsAllowed: number}} */
    User: null,

    // fetch the user profile from ChatGPT session API endpoint
    async init() {
      // const UserFootprint = await generateUserFootprint();

      return (
        fetch('/api/auth/session')
          // check if the response is OK
          .then((response) => {
            if (response.ok) {
              // parse the JSON response
              return response.json();
            }
            throw new Error('Network response was not OK.');
          })
          // set the user object
          .then((res) => {
            this.User = {
              // Send the anonymous, not identifiable OpenAI hashed user ID to IN_BOUND to link the user to his own prompts
              // ExternalID: res.user.id,
              // ExternalSystemNo: ExternalSystemNo.OPENAI,
              // So far no reason to send email and name to IN_BOUND. This may change in the future, but needs consent from the user.
              Email: res.user.email,
              // Email: "iqbalnawaz072@gmail.com",
              // Name: "Iqbal",
              Name: res.user.name,
              // UserStatusNo: UserStatusNo.UNKNOWN,
              // UserFootprint,
              // MaxNewPrivatePromptsAllowed: 0,
              // MaxNewPublicPromptsAllowed: 0,
            };
          })
      );
    },

    // save the prompt using IN_BOUND API endpoint
    savePrompt(prompt) {
      // console.log(prompt)
      let newPromptSchema = prompt;
      newPromptSchema.RevisionTime = (new Date()).toISOString();
      newPromptSchema.AuthorName = this.User.Name;
      newPromptSchema.AuthorURL = this.User.Email;


      const url = `${this.APIEndpoint}/prompts?user=${this.User.Email}&company=${IN_BOUND.Company}&id=${prompt.ID}`;
      const options = { 
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          ...newPromptSchema
        }),
      };
      document.dispatchEvent(new CustomEvent('IN_BOUND.SendBgMsg', { detail: { url, options, type: "IN_BOUND.postRequest", returnType: "savePrompt" }, bubbles: true }));



      // return (
      //   fetch(`${this.APIEndpoint}/prompts?user=${this.User.Email}&company=${IN_BOUND.Company}&id=${prompt.ID}`, { 
      //     method: 'POST',
      //     headers: {
      //       'Content-Type': 'application/json'
      //     },
      //     body: JSON.stringify({
      //       ...newPromptSchema
      //     }),
      //   })
      //     .then((response) => {
      //       return Promise.all([response.json(), response]);
      //     })
      //     // check if the response is OK
      //     .then(([json, response]) => {
      //       if (response.ok) {
      //         // parse the JSON response
      //         return json;
      //       }

      //       if (json && json.ReactionNo) {
      //         throw Reaction.mapReactionNo(json.ReactionNo);
      //       }

      //       throw new Error('Network response was not OK.');
      //     })
      // );
    },


      /**
     * Pin Action for a prompt using IN_BOUND API endpoint
     *
     * @param {string} PromptID
     * @param {(1|-1)} Vote
     */
      pinActionForPrompt(PromptID, Vote) {

        const url = `${this.APIEndpoint}/prompts?user=${this.User.Email}&company=${IN_BOUND.Company}&id=${PromptID}`;
      const options = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          pin: Vote === 1
        }),
      };
      document.dispatchEvent(new CustomEvent('IN_BOUND.SendBgMsg', { detail: { url, options, type: "IN_BOUND.postRequest", returnType: "pinActionForPrompt" }, bubbles: true }));
        
        return (
            fetch(`${this.APIEndpoint}/prompts?user=${this.User.Email}&company=${IN_BOUND.Company}&id=${PromptID}`, {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json'
              },
              body: JSON.stringify({
                pin: Vote === 1
              }),
            })
            // check if response is OK
            .then((res) => {
              if (!res.ok) {
                throw new Error('Network response was not OK');
              }

              return res;
            })
        );
      },


    /**
     * Report a prompt using IN_BOUND API endpoint
     *
     * @param {string} PromptID
     * @param {FeedbackTypeNo} FeedbackTypeNo
     * @param {string} FeedbackText
     * @param {string} FeedbackContact
     */
    reportPrompt(PromptID, FeedbackTypeNo, FeedbackText, FeedbackContact) {

      const url = `${this.APIEndpoint}?act=promptsFeedback&promptID=${PromptID}`;
      const options = {
        method: 'POST',
        headers: {
          'Content-Type': 'text/plain',
        },
        body: JSON.stringify({
          FeedbackContact,
          FeedbackText,
          FeedbackTypeNo,
          PromptID,
          User: this.User,
        }),
      };
      document.dispatchEvent(new CustomEvent('IN_BOUND.SendBgMsg', { detail: { url, options, type: "IN_BOUND.postRequest", returnType: "reportPrompt" }, bubbles: true }));


      // return (
      //   fetch(`${this.APIEndpoint}?act=promptsFeedback&promptID=${PromptID}`, {
      //     method: 'POST',
      //     headers: {
      //       'Content-Type': 'text/plain',
      //     },
      //     body: JSON.stringify({
      //       FeedbackContact,
      //       FeedbackText,
      //       FeedbackTypeNo,
      //       PromptID,
      //       User: this.User,
      //     }),
      //   })
      //     // check if response is OK
      //     .then((res) => {
      //       if (!res.ok) {
      //         throw new Error('Network response was not OK');
      //       }

      //       return res;
      //     })
      // );
    },

    saveNewTone(tone) {

      const url = `${this.APIEndpoint}variations?user=${this.User.Email}&company=${IN_BOUND.Company}&id=${tone.id}`;
      const options = {
        method: 'POST',
        body: JSON.stringify({
          ...tone
        }),
      };
      document.dispatchEvent(new CustomEvent('IN_BOUND.SendBgMsg', { detail: { url, options, type: "IN_BOUND.postRequest", returnType: "saveNewTone" }, bubbles: true }));


      // return (
      //   fetch(`${this.APIEndpoint}variations?user=${this.User.Email}&company=${IN_BOUND.Company}&id=${tone.id}`, {
      //     method: 'POST',
      //     body: JSON.stringify({
      //       ...tone
      //     }),
      //   })
      //     // check if response is OK
      //     .then((res) => {
      //       if (!res.ok) {
      //         throw new Error('Network response was not OK');
      //       }

      //       return res;
      //     })
      // );
    },

    saveEditTone(tone) {
      // console.log(tone)

      const url = `${this.APIEndpoint}/variations?user=${this.User.Email}&company=${IN_BOUND.Company}&id=${tone.id}`;
      const options = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(tone),
      };
      document.dispatchEvent(new CustomEvent('IN_BOUND.SendBgMsg', { detail: { url, options, type: "IN_BOUND.postRequest", returnType: "saveEditTone" }, bubbles: true }));

      // return (
      //   fetch(`${this.APIEndpoint}/variations?user=${this.User.Email}&company=${IN_BOUND.Company}&id=${tone.id}`, {
      //     method: 'POST',
      //     headers: {
      //       'Content-Type': 'application/json'
      //     },
      //     body: JSON.stringify(tone),
      //   })
      //     // check if response is OK
      //     .then((res) => {
      //       if (!res.ok) {
      //         throw new Error('Network response was not OK');
      //       }

      //       return res;
      //     })
      // );
    },

    deleteTone(ID) {
      // console.log(ID)

      const url = `${this.APIEndpoint}/variations?user=${this.User.Email}&company=${IN_BOUND.Company}&id=${ID}`;
      const options = {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json'
        },
      };
      document.dispatchEvent(new CustomEvent('IN_BOUND.SendBgMsg', { detail: { url, options, type: "IN_BOUND.postRequest", returnType: "deleteTone" }, bubbles: true }));


      // return (
      //   fetch(
      //     `${this.APIEndpoint}/variations?user=${this.User.Email}&company=${IN_BOUND.Company}&id=${ID}`,
      //     {
      //       method: 'DELETE',
      //       headers: {
      //         'Content-Type': 'application/json'
      //       },
      //     }
      //   )
      //     // check if response is OK
      //     .then((res) => {
      //       if (!res.ok) {
      //         throw new Error('Network response was not OK');
      //       }
      //     })
      // );
    },

    // delete prompt using IN_BOUND API endpoint
    deletePrompt(PromptID) {

      const url = `${this.APIEndpoint}/prompt?user=${this.User.Email}&company=${IN_BOUND.Company}&id=${PromptID}`;
      const options = {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json'
        }
      };
      document.dispatchEvent(new CustomEvent('IN_BOUND.SendBgMsg', { detail: { url, options, type: "IN_BOUND.postRequest", returnType: "deletePrompt" }, bubbles: true }));

      // return (
      //   fetch(
      //     `${this.APIEndpoint}/prompt?user=${this.User.Email}&company=${IN_BOUND.Company}&id=${PromptID}`,
      //     {
      //       method: 'DELETE',
      //       headers: {
      //         'Content-Type': 'application/json'
      //       }
      //     }
      //   )
      //     // check if response is OK
      //     .then((res) => {
      //       if (!res.ok) {
      //         throw new Error('Network response was not OK');
      //       }
      //     })
      // );
    },

    /**
     * vote for a prompt using IN_BOUND API endpoint
     *
     * @param {string} PromptID
     * @param {(1|-1)} Vote
     */
    voteForPrompt(PromptID, Vote) {
      const url = `${this.APIEndpoint}/prompts?user=${this.User.Email}&company=${IN_BOUND.Company}&id=${PromptID}`;
      const options = { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ favourite: Vote === 1 }) };
      document.dispatchEvent(new CustomEvent('IN_BOUND.SendBgMsg', { detail: { url, options, type: "IN_BOUND.postRequest", returnType: "voteForPrompt" }, bubbles: true }));

      // return (
      //   fetch(`${this.APIEndpoint}/prompts?user=${this.User.Email}&company=${IN_BOUND.Company}&id=${PromptID}`, {
      //     method: 'POST',
      //     headers: {
      //       'Content-Type': 'application/json'
      //     },
      //     body: JSON.stringify({
      //       favourite: Vote === 1
      //     }),
      //   })
      //     // check if response is OK
      //     .then((res) => {
      //       if (!res.ok) {
      //         throw new Error('Network response was not OK');
      //       }

      //       return res;
      //     })
      // );
    },

    getBingResults(query){
      // IN_BOUND.showNotification(
      //   NotificationSeverity.SUCCESS,
      //   'Fetching web results...'
      // );

      // const url = `https://www.bing.com/search?q=${query}`
      // document.dispatchEvent( new CustomEvent('IN_BOUND.SendBgMsg', {detail: {url, type:"IN_BOUND.getRequest", returnType:"getBingResults"}, bubbles:true }));
      
      // return (
      //   fetch(`${this.APIEndpoint}/bing-search?user=${this.User.Email}&company=${IN_BOUND.Company}&query=${query.replace(/\n/gi, " ")}`)
      //     // check if response is OK
      //     .then((res) => {
      //       if (!res.ok) {
      //         throw new Error('Network response was not OK');
      //       }
      //       return res.text()
      //     }).then( res => {
      //       return res
      //     })
      // );
      
    },

    getDdgResults(query){
      // IN_BOUND.showNotification(
      //   NotificationSeverity.SUCCESS,
      //   'Fetching web results...'
      // );

      // const url = `https://html.duckduckgo.com/html/?q=${query}`
      // document.dispatchEvent( new CustomEvent('IN_BOUND.SendBgMsg', {detail: {url, type:"IN_BOUND.getRequest", returnType:"getDdgResults"}, bubbles:true }));
      
      // return (
      //   fetch(`${this.APIEndpoint}/ddg-search?user=${this.User.Email}&company=${IN_BOUND.Company}&query=${query.replace(/\n/gi, " ")}`)
      //     // check if response is OK
      //     .then((res) => {
      //       if (!res.ok) {
      //         throw new Error('Network response was not OK');
      //       }
      //       return res.text()
      //     }).then( res => {
      //       return res
      //     })
      // );
      
    },

    getGoogleNewsResults(query){
      // IN_BOUND.showNotification(
      //   NotificationSeverity.SUCCESS,
      //   'Fetching web results...'
      // );

      // const url = `https://www.google.com/search?q=${query}&tbm=nws`
      // document.dispatchEvent( new CustomEvent('IN_BOUND.SendBgMsg', {detail: {url, type:"IN_BOUND.getRequest", returnType:"getGoogleNewsResults"}, bubbles:true }));
      
      // return (
      //   fetch(`${this.APIEndpoint}/google-news?user=${this.User.Email}&company=${IN_BOUND.Company}&query=${query.replace(/\n/gi, " ")}`)
      //     // check if response is OK
      //     .then((res) => {
      //       if (!res.ok) {
      //         throw new Error('Network response was not OK');
      //       }
      //       return res.text()
      //     }).then( res => {
      //       return res
      //     })
      // );
      
    },

    getWebContentResults(query){
      // IN_BOUND.showNotification(
      //   NotificationSeverity.SUCCESS,
      //   'Fetching webcontent...'
      // );

      // const urlList = query.split("https://");
      // urlList.forEach((url, index) => {
      //   setTimeout(function(){
      //     document.dispatchEvent( new CustomEvent('IN_BOUND.SendBgMsg', {detail: {url : 'https://'+url, type:"IN_BOUND.getRequest", returnType:"getWebContentResults"}, bubbles:true }));
      //   }, 200*index)
      // });
      
      
    },


  };

  /**!
   * Sortable 1.15.0
   * @author	RubaXa   <trash@rubaxa.org>
   * @author	owenm    <owen23355@gmail.com>
   * @license MIT
   */
  function ownKeys(object, enumerableOnly) {
    var keys = Object.keys(object);

    if (Object.getOwnPropertySymbols) {
      var symbols = Object.getOwnPropertySymbols(object);

      if (enumerableOnly) {
        symbols = symbols.filter(function (sym) {
          return Object.getOwnPropertyDescriptor(object, sym).enumerable;
        });
      }

      keys.push.apply(keys, symbols);
    }

    return keys;
  }

  function _objectSpread2(target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i] != null ? arguments[i] : {};

      if (i % 2) {
        ownKeys(Object(source), true).forEach(function (key) {
          _defineProperty(target, key, source[key]);
        });
      } else if (Object.getOwnPropertyDescriptors) {
        Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));
      } else {
        ownKeys(Object(source)).forEach(function (key) {
          Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
        });
      }
    }

    return target;
  }

  function _typeof(obj) {
    "@babel/helpers - typeof";

    if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
      _typeof = function (obj) {
        return typeof obj;
      };
    } else {
      _typeof = function (obj) {
        return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
      };
    }

    return _typeof(obj);
  }

  function _defineProperty(obj, key, value) {
    if (key in obj) {
      Object.defineProperty(obj, key, {
        value: value,
        enumerable: true,
        configurable: true,
        writable: true
      });
    } else {
      obj[key] = value;
    }

    return obj;
  }

  function _extends() {
    _extends = Object.assign || function (target) {
      for (var i = 1; i < arguments.length; i++) {
        var source = arguments[i];

        for (var key in source) {
          if (Object.prototype.hasOwnProperty.call(source, key)) {
            target[key] = source[key];
          }
        }
      }

      return target;
    };

    return _extends.apply(this, arguments);
  }

  function _objectWithoutPropertiesLoose(source, excluded) {
    if (source == null) return {};
    var target = {};
    var sourceKeys = Object.keys(source);
    var key, i;

    for (i = 0; i < sourceKeys.length; i++) {
      key = sourceKeys[i];
      if (excluded.indexOf(key) >= 0) continue;
      target[key] = source[key];
    }

    return target;
  }

  function _objectWithoutProperties(source, excluded) {
    if (source == null) return {};

    var target = _objectWithoutPropertiesLoose(source, excluded);

    var key, i;

    if (Object.getOwnPropertySymbols) {
      var sourceSymbolKeys = Object.getOwnPropertySymbols(source);

      for (i = 0; i < sourceSymbolKeys.length; i++) {
        key = sourceSymbolKeys[i];
        if (excluded.indexOf(key) >= 0) continue;
        if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue;
        target[key] = source[key];
      }
    }

    return target;
  }

  function _toConsumableArray(arr) {
    return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread();
  }

  function _arrayWithoutHoles(arr) {
    if (Array.isArray(arr)) return _arrayLikeToArray(arr);
  }

  function _iterableToArray(iter) {
    if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter);
  }

  function _unsupportedIterableToArray(o, minLen) {
    if (!o) return;
    if (typeof o === "string") return _arrayLikeToArray(o, minLen);
    var n = Object.prototype.toString.call(o).slice(8, -1);
    if (n === "Object" && o.constructor) n = o.constructor.name;
    if (n === "Map" || n === "Set") return Array.from(o);
    if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
  }

  function _arrayLikeToArray(arr, len) {
    if (len == null || len > arr.length) len = arr.length;

    for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];

    return arr2;
  }

  function _nonIterableSpread() {
    throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
  }

  var version = "1.15.0";

  function userAgent(pattern) {
    if (typeof window !== 'undefined' && window.navigator) {
      return !! /*@__PURE__*/navigator.userAgent.match(pattern);
    }
  }

  var IE11OrLess = userAgent(/(?:Trident.*rv[ :]?11\.|msie|iemobile|Windows Phone)/i);
  var Edge = userAgent(/Edge/i);
  var FireFox = userAgent(/firefox/i);
  var Safari = userAgent(/safari/i) && !userAgent(/chrome/i) && !userAgent(/android/i);
  var IOS = userAgent(/iP(ad|od|hone)/i);
  var ChromeForAndroid = userAgent(/chrome/i) && userAgent(/android/i);

  var captureMode = {
    capture: false,
    passive: false
  };

  function on(el, event, fn) {
    el.addEventListener(event, fn, !IE11OrLess && captureMode);
  }

  function off(el, event, fn) {
    el.removeEventListener(event, fn, !IE11OrLess && captureMode);
  }

  function matches(
  /**HTMLElement*/
  el,
  /**String*/
  selector) {
    if (!selector) return;
    selector[0] === '>' && (selector = selector.substring(1));

    if (el) {
      try {
        if (el.matches) {
          return el.matches(selector);
        } else if (el.msMatchesSelector) {
          return el.msMatchesSelector(selector);
        } else if (el.webkitMatchesSelector) {
          return el.webkitMatchesSelector(selector);
        }
      } catch (_) {
        return false;
      }
    }

    return false;
  }

  function getParentOrHost(el) {
    return el.host && el !== document && el.host.nodeType ? el.host : el.parentNode;
  }

  function closest(
  /**HTMLElement*/
  el,
  /**String*/
  selector,
  /**HTMLElement*/
  ctx, includeCTX) {
    if (el) {
      ctx = ctx || document;

      do {
        if (selector != null && (selector[0] === '>' ? el.parentNode === ctx && matches(el, selector) : matches(el, selector)) || includeCTX && el === ctx) {
          return el;
        }

        if (el === ctx) break;
        /* jshint boss:true */
      } while (el = getParentOrHost(el));
    }

    return null;
  }

  var R_SPACE = /\s+/g;

  function toggleClass(el, name, state) {
    if (el && name) {
      if (el.classList) {
        el.classList[state ? 'add' : 'remove'](name);
      } else {
        var className = (' ' + el.className + ' ').replace(R_SPACE, ' ').replace(' ' + name + ' ', ' ');
        el.className = (className + (state ? ' ' + name : '')).replace(R_SPACE, ' ');
      }
    }
  }

  function css$1(el, prop, val) {
    var style = el && el.style;

    if (style) {
      if (val === void 0) {
        if (document.defaultView && document.defaultView.getComputedStyle) {
          val = document.defaultView.getComputedStyle(el, '');
        } else if (el.currentStyle) {
          val = el.currentStyle;
        }

        return prop === void 0 ? val : val[prop];
      } else {
        if (!(prop in style) && prop.indexOf('webkit') === -1) {
          prop = '-webkit-' + prop;
        }

        style[prop] = val + (typeof val === 'string' ? '' : 'px');
      }
    }
  }

  function matrix(el, selfOnly) {
    var appliedTransforms = '';

    if (typeof el === 'string') {
      appliedTransforms = el;
    } else {
      do {
        var transform = css$1(el, 'transform');

        if (transform && transform !== 'none') {
          appliedTransforms = transform + ' ' + appliedTransforms;
        }
        /* jshint boss:true */

      } while (!selfOnly && (el = el.parentNode));
    }

    var matrixFn = window.DOMMatrix || window.WebKitCSSMatrix || window.CSSMatrix || window.MSCSSMatrix;
    /*jshint -W056 */

    return matrixFn && new matrixFn(appliedTransforms);
  }

  function find(ctx, tagName, iterator) {
    if (ctx) {
      var list = ctx.getElementsByTagName(tagName),
          i = 0,
          n = list.length;

      if (iterator) {
        for (; i < n; i++) {
          iterator(list[i], i);
        }
      }

      return list;
    }

    return [];
  }

  function getWindowScrollingElement() {
    var scrollingElement = document.scrollingElement;

    if (scrollingElement) {
      return scrollingElement;
    } else {
      return document.documentElement;
    }
  }
  /**
   * Returns the "bounding client rect" of given element
   * @param  {HTMLElement} el                       The element whose boundingClientRect is wanted
   * @param  {[Boolean]} relativeToContainingBlock  Whether the rect should be relative to the containing block of (including) the container
   * @param  {[Boolean]} relativeToNonStaticParent  Whether the rect should be relative to the relative parent of (including) the contaienr
   * @param  {[Boolean]} undoScale                  Whether the container's scale() should be undone
   * @param  {[HTMLElement]} container              The parent the element will be placed in
   * @return {Object}                               The boundingClientRect of el, with specified adjustments
   */


  function getRect(el, relativeToContainingBlock, relativeToNonStaticParent, undoScale, container) {
    if (!el.getBoundingClientRect && el !== window) return;
    var elRect, top, left, bottom, right, height, width;

    if (el !== window && el.parentNode && el !== getWindowScrollingElement()) {
      elRect = el.getBoundingClientRect();
      top = elRect.top;
      left = elRect.left;
      bottom = elRect.bottom;
      right = elRect.right;
      height = elRect.height;
      width = elRect.width;
    } else {
      top = 0;
      left = 0;
      bottom = window.innerHeight;
      right = window.innerWidth;
      height = window.innerHeight;
      width = window.innerWidth;
    }

    if ((relativeToContainingBlock || relativeToNonStaticParent) && el !== window) {
      // Adjust for translate()
      container = container || el.parentNode; // solves #1123 (see: https://stackoverflow.com/a/37953806/6088312)
      // Not needed on <= IE11

      if (!IE11OrLess) {
        do {
          if (container && container.getBoundingClientRect && (css$1(container, 'transform') !== 'none' || relativeToNonStaticParent && css$1(container, 'position') !== 'static')) {
            var containerRect = container.getBoundingClientRect(); // Set relative to edges of padding box of container

            top -= containerRect.top + parseInt(css$1(container, 'border-top-width'));
            left -= containerRect.left + parseInt(css$1(container, 'border-left-width'));
            bottom = top + elRect.height;
            right = left + elRect.width;
            break;
          }
          /* jshint boss:true */

        } while (container = container.parentNode);
      }
    }

    if (undoScale && el !== window) {
      // Adjust for scale()
      var elMatrix = matrix(container || el),
          scaleX = elMatrix && elMatrix.a,
          scaleY = elMatrix && elMatrix.d;

      if (elMatrix) {
        top /= scaleY;
        left /= scaleX;
        width /= scaleX;
        height /= scaleY;
        bottom = top + height;
        right = left + width;
      }
    }

    return {
      top: top,
      left: left,
      bottom: bottom,
      right: right,
      width: width,
      height: height
    };
  }
  /**
   * Checks if a side of an element is scrolled past a side of its parents
   * @param  {HTMLElement}  el           The element who's side being scrolled out of view is in question
   * @param  {String}       elSide       Side of the element in question ('top', 'left', 'right', 'bottom')
   * @param  {String}       parentSide   Side of the parent in question ('top', 'left', 'right', 'bottom')
   * @return {HTMLElement}               The parent scroll element that the el's side is scrolled past, or null if there is no such element
   */


  function isScrolledPast(el, elSide, parentSide) {
    var parent = getParentAutoScrollElement(el, true),
        elSideVal = getRect(el)[elSide];
    /* jshint boss:true */

    while (parent) {
      var parentSideVal = getRect(parent)[parentSide],
          visible = void 0;

      if (parentSide === 'top' || parentSide === 'left') {
        visible = elSideVal >= parentSideVal;
      } else {
        visible = elSideVal <= parentSideVal;
      }

      if (!visible) return parent;
      if (parent === getWindowScrollingElement()) break;
      parent = getParentAutoScrollElement(parent, false);
    }

    return false;
  }
  /**
   * Gets nth child of el, ignoring hidden children, sortable's elements (does not ignore clone if it's visible)
   * and non-draggable elements
   * @param  {HTMLElement} el       The parent element
   * @param  {Number} childNum      The index of the child
   * @param  {Object} options       Parent Sortable's options
   * @return {HTMLElement}          The child at index childNum, or null if not found
   */


  function getChild(el, childNum, options, includeDragEl) {
    var currentChild = 0,
        i = 0,
        children = el.children;

    while (i < children.length) {
      if (children[i].style.display !== 'none' && children[i] !== Sortable.ghost && (includeDragEl || children[i] !== Sortable.dragged) && closest(children[i], options.draggable, el, false)) {
        if (currentChild === childNum) {
          return children[i];
        }

        currentChild++;
      }

      i++;
    }

    return null;
  }
  /**
   * Gets the last child in the el, ignoring ghostEl or invisible elements (clones)
   * @param  {HTMLElement} el       Parent element
   * @param  {selector} selector    Any other elements that should be ignored
   * @return {HTMLElement}          The last child, ignoring ghostEl
   */


  function lastChild(el, selector) {
    var last = el.lastElementChild;

    while (last && (last === Sortable.ghost || css$1(last, 'display') === 'none' || selector && !matches(last, selector))) {
      last = last.previousElementSibling;
    }

    return last || null;
  }
  /**
   * Returns the index of an element within its parent for a selected set of
   * elements
   * @param  {HTMLElement} el
   * @param  {selector} selector
   * @return {number}
   */


  function index(el, selector) {
    var index = 0;

    if (!el || !el.parentNode) {
      return -1;
    }
    /* jshint boss:true */


    while (el = el.previousElementSibling) {
      if (el.nodeName.toUpperCase() !== 'TEMPLATE' && el !== Sortable.clone && (!selector || matches(el, selector))) {
        index++;
      }
    }

    return index;
  }
  /**
   * Returns the scroll offset of the given element, added with all the scroll offsets of parent elements.
   * The value is returned in real pixels.
   * @param  {HTMLElement} el
   * @return {Array}             Offsets in the format of [left, top]
   */


  function getRelativeScrollOffset(el) {
    var offsetLeft = 0,
        offsetTop = 0,
        winScroller = getWindowScrollingElement();

    if (el) {
      do {
        var elMatrix = matrix(el),
            scaleX = elMatrix.a,
            scaleY = elMatrix.d;
        offsetLeft += el.scrollLeft * scaleX;
        offsetTop += el.scrollTop * scaleY;
      } while (el !== winScroller && (el = el.parentNode));
    }

    return [offsetLeft, offsetTop];
  }
  /**
   * Returns the index of the object within the given array
   * @param  {Array} arr   Array that may or may not hold the object
   * @param  {Object} obj  An object that has a key-value pair unique to and identical to a key-value pair in the object you want to find
   * @return {Number}      The index of the object in the array, or -1
   */


  function indexOfObject(arr, obj) {
    for (var i in arr) {
      if (!arr.hasOwnProperty(i)) continue;

      for (var key in obj) {
        if (obj.hasOwnProperty(key) && obj[key] === arr[i][key]) return Number(i);
      }
    }

    return -1;
  }

  function getParentAutoScrollElement(el, includeSelf) {
    // skip to window
    if (!el || !el.getBoundingClientRect) return getWindowScrollingElement();
    var elem = el;
    var gotSelf = false;

    do {
      // we don't need to get elem css if it isn't even overflowing in the first place (performance)
      if (elem.clientWidth < elem.scrollWidth || elem.clientHeight < elem.scrollHeight) {
        var elemCSS = css$1(elem);

        if (elem.clientWidth < elem.scrollWidth && (elemCSS.overflowX == 'auto' || elemCSS.overflowX == 'scroll') || elem.clientHeight < elem.scrollHeight && (elemCSS.overflowY == 'auto' || elemCSS.overflowY == 'scroll')) {
          if (!elem.getBoundingClientRect || elem === document.body) return getWindowScrollingElement();
          if (gotSelf || includeSelf) return elem;
          gotSelf = true;
        }
      }
      /* jshint boss:true */

    } while (elem = elem.parentNode);

    return getWindowScrollingElement();
  }

  function extend(dst, src) {
    if (dst && src) {
      for (var key in src) {
        if (src.hasOwnProperty(key)) {
          dst[key] = src[key];
        }
      }
    }

    return dst;
  }

  function isRectEqual(rect1, rect2) {
    return Math.round(rect1.top) === Math.round(rect2.top) && Math.round(rect1.left) === Math.round(rect2.left) && Math.round(rect1.height) === Math.round(rect2.height) && Math.round(rect1.width) === Math.round(rect2.width);
  }

  var _throttleTimeout;

  function throttle(callback, ms) {
    return function () {
      if (!_throttleTimeout) {
        var args = arguments,
            _this = this;

        if (args.length === 1) {
          callback.call(_this, args[0]);
        } else {
          callback.apply(_this, args);
        }

        _throttleTimeout = setTimeout(function () {
          _throttleTimeout = void 0;
        }, ms);
      }
    };
  }

  function cancelThrottle() {
    clearTimeout(_throttleTimeout);
    _throttleTimeout = void 0;
  }

  function scrollBy(el, x, y) {
    el.scrollLeft += x;
    el.scrollTop += y;
  }

  function clone(el) {
    var Polymer = window.Polymer;
    var $ = window.jQuery || window.Zepto;

    if (Polymer && Polymer.dom) {
      return Polymer.dom(el).cloneNode(true);
    } else if ($) {
      return $(el).clone(true)[0];
    } else {
      return el.cloneNode(true);
    }
  }

  function setRect(el, rect) {
    css$1(el, 'position', 'absolute');
    css$1(el, 'top', rect.top);
    css$1(el, 'left', rect.left);
    css$1(el, 'width', rect.width);
    css$1(el, 'height', rect.height);
  }

  function unsetRect(el) {
    css$1(el, 'position', '');
    css$1(el, 'top', '');
    css$1(el, 'left', '');
    css$1(el, 'width', '');
    css$1(el, 'height', '');
  }

  var expando = 'Sortable' + new Date().getTime();

  function AnimationStateManager() {
    var animationStates = [],
        animationCallbackId;
    return {
      captureAnimationState: function captureAnimationState() {
        animationStates = [];
        if (!this.options.animation) return;
        var children = [].slice.call(this.el.children);
        children.forEach(function (child) {
          if (css$1(child, 'display') === 'none' || child === Sortable.ghost) return;
          animationStates.push({
            target: child,
            rect: getRect(child)
          });

          var fromRect = _objectSpread2({}, animationStates[animationStates.length - 1].rect); // If animating: compensate for current animation


          if (child.thisAnimationDuration) {
            var childMatrix = matrix(child, true);

            if (childMatrix) {
              fromRect.top -= childMatrix.f;
              fromRect.left -= childMatrix.e;
            }
          }

          child.fromRect = fromRect;
        });
      },
      addAnimationState: function addAnimationState(state) {
        animationStates.push(state);
      },
      removeAnimationState: function removeAnimationState(target) {
        animationStates.splice(indexOfObject(animationStates, {
          target: target
        }), 1);
      },
      animateAll: function animateAll(callback) {
        var _this = this;

        if (!this.options.animation) {
          clearTimeout(animationCallbackId);
          if (typeof callback === 'function') callback();
          return;
        }

        var animating = false,
            animationTime = 0;
        animationStates.forEach(function (state) {
          var time = 0,
              target = state.target,
              fromRect = target.fromRect,
              toRect = getRect(target),
              prevFromRect = target.prevFromRect,
              prevToRect = target.prevToRect,
              animatingRect = state.rect,
              targetMatrix = matrix(target, true);

          if (targetMatrix) {
            // Compensate for current animation
            toRect.top -= targetMatrix.f;
            toRect.left -= targetMatrix.e;
          }

          target.toRect = toRect;

          if (target.thisAnimationDuration) {
            // Could also check if animatingRect is between fromRect and toRect
            if (isRectEqual(prevFromRect, toRect) && !isRectEqual(fromRect, toRect) && // Make sure animatingRect is on line between toRect & fromRect
            (animatingRect.top - toRect.top) / (animatingRect.left - toRect.left) === (fromRect.top - toRect.top) / (fromRect.left - toRect.left)) {
              // If returning to same place as started from animation and on same axis
              time = calculateRealTime(animatingRect, prevFromRect, prevToRect, _this.options);
            }
          } // if fromRect != toRect: animate


          if (!isRectEqual(toRect, fromRect)) {
            target.prevFromRect = fromRect;
            target.prevToRect = toRect;

            if (!time) {
              time = _this.options.animation;
            }

            _this.animate(target, animatingRect, toRect, time);
          }

          if (time) {
            animating = true;
            animationTime = Math.max(animationTime, time);
            clearTimeout(target.animationResetTimer);
            target.animationResetTimer = setTimeout(function () {
              target.animationTime = 0;
              target.prevFromRect = null;
              target.fromRect = null;
              target.prevToRect = null;
              target.thisAnimationDuration = null;
            }, time);
            target.thisAnimationDuration = time;
          }
        });
        clearTimeout(animationCallbackId);

        if (!animating) {
          if (typeof callback === 'function') callback();
        } else {
          animationCallbackId = setTimeout(function () {
            if (typeof callback === 'function') callback();
          }, animationTime);
        }

        animationStates = [];
      },
      animate: function animate(target, currentRect, toRect, duration) {
        if (duration) {
          css$1(target, 'transition', '');
          css$1(target, 'transform', '');
          var elMatrix = matrix(this.el),
              scaleX = elMatrix && elMatrix.a,
              scaleY = elMatrix && elMatrix.d,
              translateX = (currentRect.left - toRect.left) / (scaleX || 1),
              translateY = (currentRect.top - toRect.top) / (scaleY || 1);
          target.animatingX = !!translateX;
          target.animatingY = !!translateY;
          css$1(target, 'transform', 'translate3d(' + translateX + 'px,' + translateY + 'px,0)');
          this.forRepaintDummy = repaint(target); // repaint

          css$1(target, 'transition', 'transform ' + duration + 'ms' + (this.options.easing ? ' ' + this.options.easing : ''));
          css$1(target, 'transform', 'translate3d(0,0,0)');
          typeof target.animated === 'number' && clearTimeout(target.animated);
          target.animated = setTimeout(function () {
            css$1(target, 'transition', '');
            css$1(target, 'transform', '');
            target.animated = false;
            target.animatingX = false;
            target.animatingY = false;
          }, duration);
        }
      }
    };
  }

  function repaint(target) {
    return target.offsetWidth;
  }

  function calculateRealTime(animatingRect, fromRect, toRect, options) {
    return Math.sqrt(Math.pow(fromRect.top - animatingRect.top, 2) + Math.pow(fromRect.left - animatingRect.left, 2)) / Math.sqrt(Math.pow(fromRect.top - toRect.top, 2) + Math.pow(fromRect.left - toRect.left, 2)) * options.animation;
  }

  var plugins = [];
  var defaults = {
    initializeByDefault: true
  };
  var PluginManager = {
    mount: function mount(plugin) {
      // Set default static properties
      for (var option in defaults) {
        if (defaults.hasOwnProperty(option) && !(option in plugin)) {
          plugin[option] = defaults[option];
        }
      }

      plugins.forEach(function (p) {
        if (p.pluginName === plugin.pluginName) {
          throw "Sortable: Cannot mount plugin ".concat(plugin.pluginName, " more than once");
        }
      });
      plugins.push(plugin);
    },
    pluginEvent: function pluginEvent(eventName, sortable, evt) {
      var _this = this;

      this.eventCanceled = false;

      evt.cancel = function () {
        _this.eventCanceled = true;
      };

      var eventNameGlobal = eventName + 'Global';
      plugins.forEach(function (plugin) {
        if (!sortable[plugin.pluginName]) return; // Fire global events if it exists in this sortable

        if (sortable[plugin.pluginName][eventNameGlobal]) {
          sortable[plugin.pluginName][eventNameGlobal](_objectSpread2({
            sortable: sortable
          }, evt));
        } // Only fire plugin event if plugin is enabled in this sortable,
        // and plugin has event defined


        if (sortable.options[plugin.pluginName] && sortable[plugin.pluginName][eventName]) {
          sortable[plugin.pluginName][eventName](_objectSpread2({
            sortable: sortable
          }, evt));
        }
      });
    },
    initializePlugins: function initializePlugins(sortable, el, defaults, options) {
      plugins.forEach(function (plugin) {
        var pluginName = plugin.pluginName;
        if (!sortable.options[pluginName] && !plugin.initializeByDefault) return;
        var initialized = new plugin(sortable, el, sortable.options);
        initialized.sortable = sortable;
        initialized.options = sortable.options;
        sortable[pluginName] = initialized; // Add default options from plugin

        _extends(defaults, initialized.defaults);
      });

      for (var option in sortable.options) {
        if (!sortable.options.hasOwnProperty(option)) continue;
        var modified = this.modifyOption(sortable, option, sortable.options[option]);

        if (typeof modified !== 'undefined') {
          sortable.options[option] = modified;
        }
      }
    },
    getEventProperties: function getEventProperties(name, sortable) {
      var eventProperties = {};
      plugins.forEach(function (plugin) {
        if (typeof plugin.eventProperties !== 'function') return;

        _extends(eventProperties, plugin.eventProperties.call(sortable[plugin.pluginName], name));
      });
      return eventProperties;
    },
    modifyOption: function modifyOption(sortable, name, value) {
      var modifiedValue;
      plugins.forEach(function (plugin) {
        // Plugin must exist on the Sortable
        if (!sortable[plugin.pluginName]) return; // If static option listener exists for this option, call in the context of the Sortable's instance of this plugin

        if (plugin.optionListeners && typeof plugin.optionListeners[name] === 'function') {
          modifiedValue = plugin.optionListeners[name].call(sortable[plugin.pluginName], value);
        }
      });
      return modifiedValue;
    }
  };

  function dispatchEvent(_ref) {
    var sortable = _ref.sortable,
        rootEl = _ref.rootEl,
        name = _ref.name,
        targetEl = _ref.targetEl,
        cloneEl = _ref.cloneEl,
        toEl = _ref.toEl,
        fromEl = _ref.fromEl,
        oldIndex = _ref.oldIndex,
        newIndex = _ref.newIndex,
        oldDraggableIndex = _ref.oldDraggableIndex,
        newDraggableIndex = _ref.newDraggableIndex,
        originalEvent = _ref.originalEvent,
        putSortable = _ref.putSortable,
        extraEventProperties = _ref.extraEventProperties;
    sortable = sortable || rootEl && rootEl[expando];
    if (!sortable) return;
    var evt,
        options = sortable.options,
        onName = 'on' + name.charAt(0).toUpperCase() + name.substr(1); // Support for new CustomEvent feature

    if (window.CustomEvent && !IE11OrLess && !Edge) {
      evt = new CustomEvent(name, {
        bubbles: true,
        cancelable: true
      });
    } else {
      evt = document.createEvent('Event');
      evt.initEvent(name, true, true);
    }

    evt.to = toEl || rootEl;
    evt.from = fromEl || rootEl;
    evt.item = targetEl || rootEl;
    evt.clone = cloneEl;
    evt.oldIndex = oldIndex;
    evt.newIndex = newIndex;
    evt.oldDraggableIndex = oldDraggableIndex;
    evt.newDraggableIndex = newDraggableIndex;
    evt.originalEvent = originalEvent;
    evt.pullMode = putSortable ? putSortable.lastPutMode : undefined;

    var allEventProperties = _objectSpread2(_objectSpread2({}, extraEventProperties), PluginManager.getEventProperties(name, sortable));

    for (var option in allEventProperties) {
      evt[option] = allEventProperties[option];
    }

    if (rootEl) {
      rootEl.dispatchEvent(evt);
    }

    if (options[onName]) {
      options[onName].call(sortable, evt);
    }
  }

  var _excluded = ["evt"];

  var pluginEvent = function pluginEvent(eventName, sortable) {
    var _ref = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {},
        originalEvent = _ref.evt,
        data = _objectWithoutProperties(_ref, _excluded);

    PluginManager.pluginEvent.bind(Sortable)(eventName, sortable, _objectSpread2({
      dragEl: dragEl,
      parentEl: parentEl,
      ghostEl: ghostEl,
      rootEl: rootEl,
      nextEl: nextEl,
      lastDownEl: lastDownEl,
      cloneEl: cloneEl,
      cloneHidden: cloneHidden,
      dragStarted: moved,
      putSortable: putSortable,
      activeSortable: Sortable.active,
      originalEvent: originalEvent,
      oldIndex: oldIndex,
      oldDraggableIndex: oldDraggableIndex,
      newIndex: newIndex,
      newDraggableIndex: newDraggableIndex,
      hideGhostForTarget: _hideGhostForTarget,
      unhideGhostForTarget: _unhideGhostForTarget,
      cloneNowHidden: function cloneNowHidden() {
        cloneHidden = true;
      },
      cloneNowShown: function cloneNowShown() {
        cloneHidden = false;
      },
      dispatchSortableEvent: function dispatchSortableEvent(name) {
        _dispatchEvent({
          sortable: sortable,
          name: name,
          originalEvent: originalEvent
        });
      }
    }, data));
  };

  function _dispatchEvent(info) {
    dispatchEvent(_objectSpread2({
      putSortable: putSortable,
      cloneEl: cloneEl,
      targetEl: dragEl,
      rootEl: rootEl,
      oldIndex: oldIndex,
      oldDraggableIndex: oldDraggableIndex,
      newIndex: newIndex,
      newDraggableIndex: newDraggableIndex
    }, info));
  }

  var dragEl,
      parentEl,
      ghostEl,
      rootEl,
      nextEl,
      lastDownEl,
      cloneEl,
      cloneHidden,
      oldIndex,
      newIndex,
      oldDraggableIndex,
      newDraggableIndex,
      activeGroup,
      putSortable,
      awaitingDragStarted = false,
      ignoreNextClick = false,
      sortables = [],
      tapEvt,
      touchEvt,
      lastDx,
      lastDy,
      tapDistanceLeft,
      tapDistanceTop,
      moved,
      lastTarget,
      lastDirection,
      pastFirstInvertThresh = false,
      isCircumstantialInvert = false,
      targetMoveDistance,
      // For positioning ghost absolutely
  ghostRelativeParent,
      ghostRelativeParentInitialScroll = [],
      // (left, top)
  _silent = false,
      savedInputChecked = [];
  /** @const */

  var documentExists = typeof document !== 'undefined',
      PositionGhostAbsolutely = IOS,
      CSSFloatProperty = Edge || IE11OrLess ? 'cssFloat' : 'float',
      // This will not pass for IE9, because IE9 DnD only works on anchors
  supportDraggable = documentExists && !ChromeForAndroid && !IOS && 'draggable' in document.createElement('div'),
      supportCssPointerEvents = function () {
    if (!documentExists) return; // false when <= IE11

    if (IE11OrLess) {
      return false;
    }

    var el = document.createElement('x');
    el.style.cssText = 'pointer-events:auto';
    return el.style.pointerEvents === 'auto';
  }(),
      _detectDirection = function _detectDirection(el, options) {
    var elCSS = css$1(el),
        elWidth = parseInt(elCSS.width) - parseInt(elCSS.paddingLeft) - parseInt(elCSS.paddingRight) - parseInt(elCSS.borderLeftWidth) - parseInt(elCSS.borderRightWidth),
        child1 = getChild(el, 0, options),
        child2 = getChild(el, 1, options),
        firstChildCSS = child1 && css$1(child1),
        secondChildCSS = child2 && css$1(child2),
        firstChildWidth = firstChildCSS && parseInt(firstChildCSS.marginLeft) + parseInt(firstChildCSS.marginRight) + getRect(child1).width,
        secondChildWidth = secondChildCSS && parseInt(secondChildCSS.marginLeft) + parseInt(secondChildCSS.marginRight) + getRect(child2).width;

    if (elCSS.display === 'flex') {
      return elCSS.flexDirection === 'column' || elCSS.flexDirection === 'column-reverse' ? 'vertical' : 'horizontal';
    }

    if (elCSS.display === 'grid') {
      return elCSS.gridTemplateColumns.split(' ').length <= 1 ? 'vertical' : 'horizontal';
    }

    if (child1 && firstChildCSS["float"] && firstChildCSS["float"] !== 'none') {
      var touchingSideChild2 = firstChildCSS["float"] === 'left' ? 'left' : 'right';
      return child2 && (secondChildCSS.clear === 'both' || secondChildCSS.clear === touchingSideChild2) ? 'vertical' : 'horizontal';
    }

    return child1 && (firstChildCSS.display === 'block' || firstChildCSS.display === 'flex' || firstChildCSS.display === 'table' || firstChildCSS.display === 'grid' || firstChildWidth >= elWidth && elCSS[CSSFloatProperty] === 'none' || child2 && elCSS[CSSFloatProperty] === 'none' && firstChildWidth + secondChildWidth > elWidth) ? 'vertical' : 'horizontal';
  },
      _dragElInRowColumn = function _dragElInRowColumn(dragRect, targetRect, vertical) {
    var dragElS1Opp = vertical ? dragRect.left : dragRect.top,
        dragElS2Opp = vertical ? dragRect.right : dragRect.bottom,
        dragElOppLength = vertical ? dragRect.width : dragRect.height,
        targetS1Opp = vertical ? targetRect.left : targetRect.top,
        targetS2Opp = vertical ? targetRect.right : targetRect.bottom,
        targetOppLength = vertical ? targetRect.width : targetRect.height;
    return dragElS1Opp === targetS1Opp || dragElS2Opp === targetS2Opp || dragElS1Opp + dragElOppLength / 2 === targetS1Opp + targetOppLength / 2;
  },

  /**
   * Detects first nearest empty sortable to X and Y position using emptyInsertThreshold.
   * @param  {Number} x      X position
   * @param  {Number} y      Y position
   * @return {HTMLElement}   Element of the first found nearest Sortable
   */
  _detectNearestEmptySortable = function _detectNearestEmptySortable(x, y) {
    var ret;
    sortables.some(function (sortable) {
      var threshold = sortable[expando].options.emptyInsertThreshold;
      if (!threshold || lastChild(sortable)) return;
      var rect = getRect(sortable),
          insideHorizontally = x >= rect.left - threshold && x <= rect.right + threshold,
          insideVertically = y >= rect.top - threshold && y <= rect.bottom + threshold;

      if (insideHorizontally && insideVertically) {
        return ret = sortable;
      }
    });
    return ret;
  },
      _prepareGroup = function _prepareGroup(options) {
    function toFn(value, pull) {
      return function (to, from, dragEl, evt) {
        var sameGroup = to.options.group.name && from.options.group.name && to.options.group.name === from.options.group.name;

        if (value == null && (pull || sameGroup)) {
          // Default pull value
          // Default pull and put value if same group
          return true;
        } else if (value == null || value === false) {
          return false;
        } else if (pull && value === 'clone') {
          return value;
        } else if (typeof value === 'function') {
          return toFn(value(to, from, dragEl, evt), pull)(to, from, dragEl, evt);
        } else {
          var otherGroup = (pull ? to : from).options.group.name;
          return value === true || typeof value === 'string' && value === otherGroup || value.join && value.indexOf(otherGroup) > -1;
        }
      };
    }

    var group = {};
    var originalGroup = options.group;

    if (!originalGroup || _typeof(originalGroup) != 'object') {
      originalGroup = {
        name: originalGroup
      };
    }

    group.name = originalGroup.name;
    group.checkPull = toFn(originalGroup.pull, true);
    group.checkPut = toFn(originalGroup.put);
    group.revertClone = originalGroup.revertClone;
    options.group = group;
  },
      _hideGhostForTarget = function _hideGhostForTarget() {
    if (!supportCssPointerEvents && ghostEl) {
      css$1(ghostEl, 'display', 'none');
    }
  },
      _unhideGhostForTarget = function _unhideGhostForTarget() {
    if (!supportCssPointerEvents && ghostEl) {
      css$1(ghostEl, 'display', '');
    }
  }; // #1184 fix - Prevent click event on fallback if dragged but item not changed position


  if (documentExists && !ChromeForAndroid) {
    document.addEventListener('click', function (evt) {
      if (ignoreNextClick) {
        evt.preventDefault();
        evt.stopPropagation && evt.stopPropagation();
        evt.stopImmediatePropagation && evt.stopImmediatePropagation();
        ignoreNextClick = false;
        return false;
      }
    }, true);
  }

  var nearestEmptyInsertDetectEvent = function nearestEmptyInsertDetectEvent(evt) {
    if (dragEl) {
      evt = evt.touches ? evt.touches[0] : evt;

      var nearest = _detectNearestEmptySortable(evt.clientX, evt.clientY);

      if (nearest) {
        // Create imitation event
        var event = {};

        for (var i in evt) {
          if (evt.hasOwnProperty(i)) {
            event[i] = evt[i];
          }
        }

        event.target = event.rootEl = nearest;
        event.preventDefault = void 0;
        event.stopPropagation = void 0;

        nearest[expando]._onDragOver(event);
      }
    }
  };

  var _checkOutsideTargetEl = function _checkOutsideTargetEl(evt) {
    if (dragEl) {
      dragEl.parentNode[expando]._isOutsideThisEl(evt.target);
    }
  };
  /**
   * @class  Sortable
   * @param  {HTMLElement}  el
   * @param  {Object}       [options]
   */


  function Sortable(el, options) {
    if (!(el && el.nodeType && el.nodeType === 1)) {
      throw "Sortable: `el` must be an HTMLElement, not ".concat({}.toString.call(el));
    }

    this.el = el; // root element

    this.options = options = _extends({}, options); // Export instance

    el[expando] = this;
    var defaults = {
      group: null,
      sort: true,
      disabled: false,
      store: null,
      handle: null,
      draggable: /^[uo]l$/i.test(el.nodeName) ? '>li' : '>*',
      swapThreshold: 1,
      // percentage; 0 <= x <= 1
      invertSwap: false,
      // invert always
      invertedSwapThreshold: null,
      // will be set to same as swapThreshold if default
      removeCloneOnHide: true,
      direction: function direction() {
        return _detectDirection(el, this.options);
      },
      ghostClass: 'sortable-ghost',
      chosenClass: 'sortable-chosen',
      dragClass: 'sortable-drag',
      ignore: 'a, img',
      filter: null,
      preventOnFilter: true,
      animation: 0,
      easing: null,
      setData: function setData(dataTransfer, dragEl) {
        dataTransfer.setData('Text', dragEl.textContent);
      },
      dropBubble: false,
      dragoverBubble: false,
      dataIdAttr: 'data-id',
      delay: 0,
      delayOnTouchOnly: false,
      touchStartThreshold: (Number.parseInt ? Number : window).parseInt(window.devicePixelRatio, 10) || 1,
      forceFallback: false,
      fallbackClass: 'sortable-fallback',
      fallbackOnBody: false,
      fallbackTolerance: 0,
      fallbackOffset: {
        x: 0,
        y: 0
      },
      supportPointer: Sortable.supportPointer !== false && 'PointerEvent' in window && !Safari,
      emptyInsertThreshold: 5
    };
    PluginManager.initializePlugins(this, el, defaults); // Set default options

    for (var name in defaults) {
      !(name in options) && (options[name] = defaults[name]);
    }

    _prepareGroup(options); // Bind all private methods


    for (var fn in this) {
      if (fn.charAt(0) === '_' && typeof this[fn] === 'function') {
        this[fn] = this[fn].bind(this);
      }
    } // Setup drag mode


    this.nativeDraggable = options.forceFallback ? false : supportDraggable;

    if (this.nativeDraggable) {
      // Touch start threshold cannot be greater than the native dragstart threshold
      this.options.touchStartThreshold = 1;
    } // Bind events


    if (options.supportPointer) {
      on(el, 'pointerdown', this._onTapStart);
    } else {
      on(el, 'mousedown', this._onTapStart);
      on(el, 'touchstart', this._onTapStart);
    }

    if (this.nativeDraggable) {
      on(el, 'dragover', this);
      on(el, 'dragenter', this);
    }

    sortables.push(this.el); // Restore sorting

    options.store && options.store.get && this.sort(options.store.get(this) || []); // Add animation state manager

    _extends(this, AnimationStateManager());
  }

  Sortable.prototype =
  /** @lends Sortable.prototype */
  {
    constructor: Sortable,
    _isOutsideThisEl: function _isOutsideThisEl(target) {
      if (!this.el.contains(target) && target !== this.el) {
        lastTarget = null;
      }
    },
    _getDirection: function _getDirection(evt, target) {
      return typeof this.options.direction === 'function' ? this.options.direction.call(this, evt, target, dragEl) : this.options.direction;
    },
    _onTapStart: function _onTapStart(
    /** Event|TouchEvent */
    evt) {
      if (!evt.cancelable) return;

      var _this = this,
          el = this.el,
          options = this.options,
          preventOnFilter = options.preventOnFilter,
          type = evt.type,
          touch = evt.touches && evt.touches[0] || evt.pointerType && evt.pointerType === 'touch' && evt,
          target = (touch || evt).target,
          originalTarget = evt.target.shadowRoot && (evt.path && evt.path[0] || evt.composedPath && evt.composedPath()[0]) || target,
          filter = options.filter;

      _saveInputCheckedState(el); // Don't trigger start event when an element is been dragged, otherwise the evt.oldindex always wrong when set option.group.


      if (dragEl) {
        return;
      }

      if (/mousedown|pointerdown/.test(type) && evt.button !== 0 || options.disabled) {
        return; // only left button and enabled
      } // cancel dnd if original target is content editable


      if (originalTarget.isContentEditable) {
        return;
      } // Safari ignores further event handling after mousedown


      if (!this.nativeDraggable && Safari && target && target.tagName.toUpperCase() === 'SELECT') {
        return;
      }

      target = closest(target, options.draggable, el, false);

      if (target && target.animated) {
        return;
      }

      if (lastDownEl === target) {
        // Ignoring duplicate `down`
        return;
      } // Get the index of the dragged element within its parent


      oldIndex = index(target);
      oldDraggableIndex = index(target, options.draggable); // Check filter

      if (typeof filter === 'function') {
        if (filter.call(this, evt, target, this)) {
          _dispatchEvent({
            sortable: _this,
            rootEl: originalTarget,
            name: 'filter',
            targetEl: target,
            toEl: el,
            fromEl: el
          });

          pluginEvent('filter', _this, {
            evt: evt
          });
          preventOnFilter && evt.cancelable && evt.preventDefault();
          return; // cancel dnd
        }
      } else if (filter) {
        filter = filter.split(',').some(function (criteria) {
          criteria = closest(originalTarget, criteria.trim(), el, false);

          if (criteria) {
            _dispatchEvent({
              sortable: _this,
              rootEl: criteria,
              name: 'filter',
              targetEl: target,
              fromEl: el,
              toEl: el
            });

            pluginEvent('filter', _this, {
              evt: evt
            });
            return true;
          }
        });

        if (filter) {
          preventOnFilter && evt.cancelable && evt.preventDefault();
          return; // cancel dnd
        }
      }

      if (options.handle && !closest(originalTarget, options.handle, el, false)) {
        return;
      } // Prepare `dragstart`


      this._prepareDragStart(evt, touch, target);
    },
    _prepareDragStart: function _prepareDragStart(
    /** Event */
    evt,
    /** Touch */
    touch,
    /** HTMLElement */
    target) {
      var _this = this,
          el = _this.el,
          options = _this.options,
          ownerDocument = el.ownerDocument,
          dragStartFn;

      if (target && !dragEl && target.parentNode === el) {
        var dragRect = getRect(target);
        rootEl = el;
        dragEl = target;
        parentEl = dragEl.parentNode;
        nextEl = dragEl.nextSibling;
        lastDownEl = target;
        activeGroup = options.group;
        Sortable.dragged = dragEl;
        tapEvt = {
          target: dragEl,
          clientX: (touch || evt).clientX,
          clientY: (touch || evt).clientY
        };
        tapDistanceLeft = tapEvt.clientX - dragRect.left;
        tapDistanceTop = tapEvt.clientY - dragRect.top;
        this._lastX = (touch || evt).clientX;
        this._lastY = (touch || evt).clientY;
        dragEl.style['will-change'] = 'all';

        dragStartFn = function dragStartFn() {
          pluginEvent('delayEnded', _this, {
            evt: evt
          });

          if (Sortable.eventCanceled) {
            _this._onDrop();

            return;
          } // Delayed drag has been triggered
          // we can re-enable the events: touchmove/mousemove


          _this._disableDelayedDragEvents();

          if (!FireFox && _this.nativeDraggable) {
            dragEl.draggable = true;
          } // Bind the events: dragstart/dragend


          _this._triggerDragStart(evt, touch); // Drag start event


          _dispatchEvent({
            sortable: _this,
            name: 'choose',
            originalEvent: evt
          }); // Chosen item


          toggleClass(dragEl, options.chosenClass, true);
        }; // Disable "draggable"


        options.ignore.split(',').forEach(function (criteria) {
          find(dragEl, criteria.trim(), _disableDraggable);
        });
        on(ownerDocument, 'dragover', nearestEmptyInsertDetectEvent);
        on(ownerDocument, 'mousemove', nearestEmptyInsertDetectEvent);
        on(ownerDocument, 'touchmove', nearestEmptyInsertDetectEvent);
        on(ownerDocument, 'mouseup', _this._onDrop);
        on(ownerDocument, 'touchend', _this._onDrop);
        on(ownerDocument, 'touchcancel', _this._onDrop); // Make dragEl draggable (must be before delay for FireFox)

        if (FireFox && this.nativeDraggable) {
          this.options.touchStartThreshold = 4;
          dragEl.draggable = true;
        }

        pluginEvent('delayStart', this, {
          evt: evt
        }); // Delay is impossible for native DnD in Edge or IE

        if (options.delay && (!options.delayOnTouchOnly || touch) && (!this.nativeDraggable || !(Edge || IE11OrLess))) {
          if (Sortable.eventCanceled) {
            this._onDrop();

            return;
          } // If the user moves the pointer or let go the click or touch
          // before the delay has been reached:
          // disable the delayed drag


          on(ownerDocument, 'mouseup', _this._disableDelayedDrag);
          on(ownerDocument, 'touchend', _this._disableDelayedDrag);
          on(ownerDocument, 'touchcancel', _this._disableDelayedDrag);
          on(ownerDocument, 'mousemove', _this._delayedDragTouchMoveHandler);
          on(ownerDocument, 'touchmove', _this._delayedDragTouchMoveHandler);
          options.supportPointer && on(ownerDocument, 'pointermove', _this._delayedDragTouchMoveHandler);
          _this._dragStartTimer = setTimeout(dragStartFn, options.delay);
        } else {
          dragStartFn();
        }
      }
    },
    _delayedDragTouchMoveHandler: function _delayedDragTouchMoveHandler(
    /** TouchEvent|PointerEvent **/
    e) {
      var touch = e.touches ? e.touches[0] : e;

      if (Math.max(Math.abs(touch.clientX - this._lastX), Math.abs(touch.clientY - this._lastY)) >= Math.floor(this.options.touchStartThreshold / (this.nativeDraggable && window.devicePixelRatio || 1))) {
        this._disableDelayedDrag();
      }
    },
    _disableDelayedDrag: function _disableDelayedDrag() {
      dragEl && _disableDraggable(dragEl);
      clearTimeout(this._dragStartTimer);

      this._disableDelayedDragEvents();
    },
    _disableDelayedDragEvents: function _disableDelayedDragEvents() {
      var ownerDocument = this.el.ownerDocument;
      off(ownerDocument, 'mouseup', this._disableDelayedDrag);
      off(ownerDocument, 'touchend', this._disableDelayedDrag);
      off(ownerDocument, 'touchcancel', this._disableDelayedDrag);
      off(ownerDocument, 'mousemove', this._delayedDragTouchMoveHandler);
      off(ownerDocument, 'touchmove', this._delayedDragTouchMoveHandler);
      off(ownerDocument, 'pointermove', this._delayedDragTouchMoveHandler);
    },
    _triggerDragStart: function _triggerDragStart(
    /** Event */
    evt,
    /** Touch */
    touch) {
      touch = touch || evt.pointerType == 'touch' && evt;

      if (!this.nativeDraggable || touch) {
        if (this.options.supportPointer) {
          on(document, 'pointermove', this._onTouchMove);
        } else if (touch) {
          on(document, 'touchmove', this._onTouchMove);
        } else {
          on(document, 'mousemove', this._onTouchMove);
        }
      } else {
        on(dragEl, 'dragend', this);
        on(rootEl, 'dragstart', this._onDragStart);
      }

      try {
        if (document.selection) {
          // Timeout neccessary for IE9
          _nextTick(function () {
            document.selection.empty();
          });
        } else {
          window.getSelection().removeAllRanges();
        }
      } catch (err) {}
    },
    _dragStarted: function _dragStarted(fallback, evt) {

      awaitingDragStarted = false;

      if (rootEl && dragEl) {
        pluginEvent('dragStarted', this, {
          evt: evt
        });

        if (this.nativeDraggable) {
          on(document, 'dragover', _checkOutsideTargetEl);
        }

        var options = this.options; // Apply effect

        !fallback && toggleClass(dragEl, options.dragClass, false);
        toggleClass(dragEl, options.ghostClass, true);
        Sortable.active = this;
        fallback && this._appendGhost(); // Drag start event

        _dispatchEvent({
          sortable: this,
          name: 'start',
          originalEvent: evt
        });
      } else {
        this._nulling();
      }
    },
    _emulateDragOver: function _emulateDragOver() {
      if (touchEvt) {
        this._lastX = touchEvt.clientX;
        this._lastY = touchEvt.clientY;

        _hideGhostForTarget();

        var target = document.elementFromPoint(touchEvt.clientX, touchEvt.clientY);
        var parent = target;

        while (target && target.shadowRoot) {
          target = target.shadowRoot.elementFromPoint(touchEvt.clientX, touchEvt.clientY);
          if (target === parent) break;
          parent = target;
        }

        dragEl.parentNode[expando]._isOutsideThisEl(target);

        if (parent) {
          do {
            if (parent[expando]) {
              var inserted = void 0;
              inserted = parent[expando]._onDragOver({
                clientX: touchEvt.clientX,
                clientY: touchEvt.clientY,
                target: target,
                rootEl: parent
              });

              if (inserted && !this.options.dragoverBubble) {
                break;
              }
            }

            target = parent; // store last element
          }
          /* jshint boss:true */
          while (parent = parent.parentNode);
        }

        _unhideGhostForTarget();
      }
    },
    _onTouchMove: function _onTouchMove(
    /**TouchEvent*/
    evt) {
      if (tapEvt) {
        var options = this.options,
            fallbackTolerance = options.fallbackTolerance,
            fallbackOffset = options.fallbackOffset,
            touch = evt.touches ? evt.touches[0] : evt,
            ghostMatrix = ghostEl && matrix(ghostEl, true),
            scaleX = ghostEl && ghostMatrix && ghostMatrix.a,
            scaleY = ghostEl && ghostMatrix && ghostMatrix.d,
            relativeScrollOffset = PositionGhostAbsolutely && ghostRelativeParent && getRelativeScrollOffset(ghostRelativeParent),
            dx = (touch.clientX - tapEvt.clientX + fallbackOffset.x) / (scaleX || 1) + (relativeScrollOffset ? relativeScrollOffset[0] - ghostRelativeParentInitialScroll[0] : 0) / (scaleX || 1),
            dy = (touch.clientY - tapEvt.clientY + fallbackOffset.y) / (scaleY || 1) + (relativeScrollOffset ? relativeScrollOffset[1] - ghostRelativeParentInitialScroll[1] : 0) / (scaleY || 1); // only set the status to dragging, when we are actually dragging

        if (!Sortable.active && !awaitingDragStarted) {
          if (fallbackTolerance && Math.max(Math.abs(touch.clientX - this._lastX), Math.abs(touch.clientY - this._lastY)) < fallbackTolerance) {
            return;
          }

          this._onDragStart(evt, true);
        }

        if (ghostEl) {
          if (ghostMatrix) {
            ghostMatrix.e += dx - (lastDx || 0);
            ghostMatrix.f += dy - (lastDy || 0);
          } else {
            ghostMatrix = {
              a: 1,
              b: 0,
              c: 0,
              d: 1,
              e: dx,
              f: dy
            };
          }

          var cssMatrix = "matrix(".concat(ghostMatrix.a, ",").concat(ghostMatrix.b, ",").concat(ghostMatrix.c, ",").concat(ghostMatrix.d, ",").concat(ghostMatrix.e, ",").concat(ghostMatrix.f, ")");
          css$1(ghostEl, 'webkitTransform', cssMatrix);
          css$1(ghostEl, 'mozTransform', cssMatrix);
          css$1(ghostEl, 'msTransform', cssMatrix);
          css$1(ghostEl, 'transform', cssMatrix);
          lastDx = dx;
          lastDy = dy;
          touchEvt = touch;
        }

        evt.cancelable && evt.preventDefault();
      }
    },
    _appendGhost: function _appendGhost() {
      // Bug if using scale(): https://stackoverflow.com/questions/2637058
      // Not being adjusted for
      if (!ghostEl) {
        var container = this.options.fallbackOnBody ? document.body : rootEl,
            rect = getRect(dragEl, true, PositionGhostAbsolutely, true, container),
            options = this.options; // Position absolutely

        if (PositionGhostAbsolutely) {
          // Get relatively positioned parent
          ghostRelativeParent = container;

          while (css$1(ghostRelativeParent, 'position') === 'static' && css$1(ghostRelativeParent, 'transform') === 'none' && ghostRelativeParent !== document) {
            ghostRelativeParent = ghostRelativeParent.parentNode;
          }

          if (ghostRelativeParent !== document.body && ghostRelativeParent !== document.documentElement) {
            if (ghostRelativeParent === document) ghostRelativeParent = getWindowScrollingElement();
            rect.top += ghostRelativeParent.scrollTop;
            rect.left += ghostRelativeParent.scrollLeft;
          } else {
            ghostRelativeParent = getWindowScrollingElement();
          }

          ghostRelativeParentInitialScroll = getRelativeScrollOffset(ghostRelativeParent);
        }

        ghostEl = dragEl.cloneNode(true);
        toggleClass(ghostEl, options.ghostClass, false);
        toggleClass(ghostEl, options.fallbackClass, true);
        toggleClass(ghostEl, options.dragClass, true);
        css$1(ghostEl, 'transition', '');
        css$1(ghostEl, 'transform', '');
        css$1(ghostEl, 'box-sizing', 'border-box');
        css$1(ghostEl, 'margin', 0);
        css$1(ghostEl, 'top', rect.top);
        css$1(ghostEl, 'left', rect.left);
        css$1(ghostEl, 'width', rect.width);
        css$1(ghostEl, 'height', rect.height);
        css$1(ghostEl, 'opacity', '0.8');
        css$1(ghostEl, 'position', PositionGhostAbsolutely ? 'absolute' : 'fixed');
        css$1(ghostEl, 'zIndex', '100000');
        css$1(ghostEl, 'pointerEvents', 'none');
        Sortable.ghost = ghostEl;
        container.appendChild(ghostEl); // Set transform-origin

        css$1(ghostEl, 'transform-origin', tapDistanceLeft / parseInt(ghostEl.style.width) * 100 + '% ' + tapDistanceTop / parseInt(ghostEl.style.height) * 100 + '%');
      }
    },
    _onDragStart: function _onDragStart(
    /**Event*/
    evt,
    /**boolean*/
    fallback) {
      var _this = this;

      var dataTransfer = evt.dataTransfer;
      var options = _this.options;
      pluginEvent('dragStart', this, {
        evt: evt
      });

      if (Sortable.eventCanceled) {
        this._onDrop();

        return;
      }

      pluginEvent('setupClone', this);

      if (!Sortable.eventCanceled) {
        cloneEl = clone(dragEl);
        cloneEl.removeAttribute("id");
        cloneEl.draggable = false;
        cloneEl.style['will-change'] = '';

        this._hideClone();

        toggleClass(cloneEl, this.options.chosenClass, false);
        Sortable.clone = cloneEl;
      } // #1143: IFrame support workaround


      _this.cloneId = _nextTick(function () {
        pluginEvent('clone', _this);
        if (Sortable.eventCanceled) return;

        if (!_this.options.removeCloneOnHide) {
          rootEl.insertBefore(cloneEl, dragEl);
        }

        _this._hideClone();

        _dispatchEvent({
          sortable: _this,
          name: 'clone'
        });
      });
      !fallback && toggleClass(dragEl, options.dragClass, true); // Set proper drop events

      if (fallback) {
        ignoreNextClick = true;
        _this._loopId = setInterval(_this._emulateDragOver, 50);
      } else {
        // Undo what was set in _prepareDragStart before drag started
        off(document, 'mouseup', _this._onDrop);
        off(document, 'touchend', _this._onDrop);
        off(document, 'touchcancel', _this._onDrop);

        if (dataTransfer) {
          dataTransfer.effectAllowed = 'move';
          options.setData && options.setData.call(_this, dataTransfer, dragEl);
        }

        on(document, 'drop', _this); // #1276 fix:

        css$1(dragEl, 'transform', 'translateZ(0)');
      }

      awaitingDragStarted = true;
      _this._dragStartId = _nextTick(_this._dragStarted.bind(_this, fallback, evt));
      on(document, 'selectstart', _this);
      moved = true;

      if (Safari) {
        css$1(document.body, 'user-select', 'none');
      }
    },
    // Returns true - if no further action is needed (either inserted or another condition)
    _onDragOver: function _onDragOver(
    /**Event*/
    evt) {
      var el = this.el,
          target = evt.target,
          dragRect,
          targetRect,
          revert,
          options = this.options,
          group = options.group,
          activeSortable = Sortable.active,
          isOwner = activeGroup === group,
          canSort = options.sort,
          fromSortable = putSortable || activeSortable,
          vertical,
          _this = this,
          completedFired = false;

      if (_silent) return;

      function dragOverEvent(name, extra) {
        pluginEvent(name, _this, _objectSpread2({
          evt: evt,
          isOwner: isOwner,
          axis: vertical ? 'vertical' : 'horizontal',
          revert: revert,
          dragRect: dragRect,
          targetRect: targetRect,
          canSort: canSort,
          fromSortable: fromSortable,
          target: target,
          completed: completed,
          onMove: function onMove(target, after) {
            return _onMove(rootEl, el, dragEl, dragRect, target, getRect(target), evt, after);
          },
          changed: changed
        }, extra));
      } // Capture animation state


      function capture() {
        dragOverEvent('dragOverAnimationCapture');

        _this.captureAnimationState();

        if (_this !== fromSortable) {
          fromSortable.captureAnimationState();
        }
      } // Return invocation when dragEl is inserted (or completed)


      function completed(insertion) {
        dragOverEvent('dragOverCompleted', {
          insertion: insertion
        });

        if (insertion) {
          // Clones must be hidden before folding animation to capture dragRectAbsolute properly
          if (isOwner) {
            activeSortable._hideClone();
          } else {
            activeSortable._showClone(_this);
          }

          if (_this !== fromSortable) {
            // Set ghost class to new sortable's ghost class
            toggleClass(dragEl, putSortable ? putSortable.options.ghostClass : activeSortable.options.ghostClass, false);
            toggleClass(dragEl, options.ghostClass, true);
          }

          if (putSortable !== _this && _this !== Sortable.active) {
            putSortable = _this;
          } else if (_this === Sortable.active && putSortable) {
            putSortable = null;
          } // Animation


          if (fromSortable === _this) {
            _this._ignoreWhileAnimating = target;
          }

          _this.animateAll(function () {
            dragOverEvent('dragOverAnimationComplete');
            _this._ignoreWhileAnimating = null;
          });

          if (_this !== fromSortable) {
            fromSortable.animateAll();
            fromSortable._ignoreWhileAnimating = null;
          }
        } // Null lastTarget if it is not inside a previously swapped element


        if (target === dragEl && !dragEl.animated || target === el && !target.animated) {
          lastTarget = null;
        } // no bubbling and not fallback


        if (!options.dragoverBubble && !evt.rootEl && target !== document) {
          dragEl.parentNode[expando]._isOutsideThisEl(evt.target); // Do not detect for empty insert if already inserted


          !insertion && nearestEmptyInsertDetectEvent(evt);
        }

        !options.dragoverBubble && evt.stopPropagation && evt.stopPropagation();
        return completedFired = true;
      } // Call when dragEl has been inserted


      function changed() {
        newIndex = index(dragEl);
        newDraggableIndex = index(dragEl, options.draggable);

        _dispatchEvent({
          sortable: _this,
          name: 'change',
          toEl: el,
          newIndex: newIndex,
          newDraggableIndex: newDraggableIndex,
          originalEvent: evt
        });
      }

      if (evt.preventDefault !== void 0) {
        evt.cancelable && evt.preventDefault();
      }

      target = closest(target, options.draggable, el, true);
      dragOverEvent('dragOver');
      if (Sortable.eventCanceled) return completedFired;

      if (dragEl.contains(evt.target) || target.animated && target.animatingX && target.animatingY || _this._ignoreWhileAnimating === target) {
        return completed(false);
      }

      ignoreNextClick = false;

      if (activeSortable && !options.disabled && (isOwner ? canSort || (revert = parentEl !== rootEl) // Reverting item into the original list
      : putSortable === this || (this.lastPutMode = activeGroup.checkPull(this, activeSortable, dragEl, evt)) && group.checkPut(this, activeSortable, dragEl, evt))) {
        vertical = this._getDirection(evt, target) === 'vertical';
        dragRect = getRect(dragEl);
        dragOverEvent('dragOverValid');
        if (Sortable.eventCanceled) return completedFired;

        if (revert) {
          parentEl = rootEl; // actualization

          capture();

          this._hideClone();

          dragOverEvent('revert');

          if (!Sortable.eventCanceled) {
            if (nextEl) {
              rootEl.insertBefore(dragEl, nextEl);
            } else {
              rootEl.appendChild(dragEl);
            }
          }

          return completed(true);
        }

        var elLastChild = lastChild(el, options.draggable);

        if (!elLastChild || _ghostIsLast(evt, vertical, this) && !elLastChild.animated) {
          // Insert to end of list
          // If already at end of list: Do not insert
          if (elLastChild === dragEl) {
            return completed(false);
          } // if there is a last element, it is the target


          if (elLastChild && el === evt.target) {
            target = elLastChild;
          }

          if (target) {
            targetRect = getRect(target);
          }

          if (_onMove(rootEl, el, dragEl, dragRect, target, targetRect, evt, !!target) !== false) {
            capture();

            if (elLastChild && elLastChild.nextSibling) {
              // the last draggable element is not the last node
              el.insertBefore(dragEl, elLastChild.nextSibling);
            } else {
              el.appendChild(dragEl);
            }

            parentEl = el; // actualization

            changed();
            return completed(true);
          }
        } else if (elLastChild && _ghostIsFirst(evt, vertical, this)) {
          // Insert to start of list
          var firstChild = getChild(el, 0, options, true);

          if (firstChild === dragEl) {
            return completed(false);
          }

          target = firstChild;
          targetRect = getRect(target);

          if (_onMove(rootEl, el, dragEl, dragRect, target, targetRect, evt, false) !== false) {
            capture();
            el.insertBefore(dragEl, firstChild);
            parentEl = el; // actualization

            changed();
            return completed(true);
          }
        } else if (target.parentNode === el) {
          targetRect = getRect(target);
          var direction = 0,
              targetBeforeFirstSwap,
              differentLevel = dragEl.parentNode !== el,
              differentRowCol = !_dragElInRowColumn(dragEl.animated && dragEl.toRect || dragRect, target.animated && target.toRect || targetRect, vertical),
              side1 = vertical ? 'top' : 'left',
              scrolledPastTop = isScrolledPast(target, 'top', 'top') || isScrolledPast(dragEl, 'top', 'top'),
              scrollBefore = scrolledPastTop ? scrolledPastTop.scrollTop : void 0;

          if (lastTarget !== target) {
            targetBeforeFirstSwap = targetRect[side1];
            pastFirstInvertThresh = false;
            isCircumstantialInvert = !differentRowCol && options.invertSwap || differentLevel;
          }

          direction = _getSwapDirection(evt, target, targetRect, vertical, differentRowCol ? 1 : options.swapThreshold, options.invertedSwapThreshold == null ? options.swapThreshold : options.invertedSwapThreshold, isCircumstantialInvert, lastTarget === target);
          var sibling;

          if (direction !== 0) {
            // Check if target is beside dragEl in respective direction (ignoring hidden elements)
            var dragIndex = index(dragEl);

            do {
              dragIndex -= direction;
              sibling = parentEl.children[dragIndex];
            } while (sibling && (css$1(sibling, 'display') === 'none' || sibling === ghostEl));
          } // If dragEl is already beside target: Do not insert


          if (direction === 0 || sibling === target) {
            return completed(false);
          }

          lastTarget = target;
          lastDirection = direction;
          var nextSibling = target.nextElementSibling,
              after = false;
          after = direction === 1;

          var moveVector = _onMove(rootEl, el, dragEl, dragRect, target, targetRect, evt, after);

          if (moveVector !== false) {
            if (moveVector === 1 || moveVector === -1) {
              after = moveVector === 1;
            }

            _silent = true;
            setTimeout(_unsilent, 30);
            capture();

            if (after && !nextSibling) {
              el.appendChild(dragEl);
            } else {
              target.parentNode.insertBefore(dragEl, after ? nextSibling : target);
            } // Undo chrome's scroll adjustment (has no effect on other browsers)


            if (scrolledPastTop) {
              scrollBy(scrolledPastTop, 0, scrollBefore - scrolledPastTop.scrollTop);
            }

            parentEl = dragEl.parentNode; // actualization
            // must be done before animation

            if (targetBeforeFirstSwap !== undefined && !isCircumstantialInvert) {
              targetMoveDistance = Math.abs(targetBeforeFirstSwap - getRect(target)[side1]);
            }

            changed();
            return completed(true);
          }
        }

        if (el.contains(dragEl)) {
          return completed(false);
        }
      }

      return false;
    },
    _ignoreWhileAnimating: null,
    _offMoveEvents: function _offMoveEvents() {
      off(document, 'mousemove', this._onTouchMove);
      off(document, 'touchmove', this._onTouchMove);
      off(document, 'pointermove', this._onTouchMove);
      off(document, 'dragover', nearestEmptyInsertDetectEvent);
      off(document, 'mousemove', nearestEmptyInsertDetectEvent);
      off(document, 'touchmove', nearestEmptyInsertDetectEvent);
    },
    _offUpEvents: function _offUpEvents() {
      var ownerDocument = this.el.ownerDocument;
      off(ownerDocument, 'mouseup', this._onDrop);
      off(ownerDocument, 'touchend', this._onDrop);
      off(ownerDocument, 'pointerup', this._onDrop);
      off(ownerDocument, 'touchcancel', this._onDrop);
      off(document, 'selectstart', this);
    },
    _onDrop: function _onDrop(
    /**Event*/
    evt) {
      var el = this.el,
          options = this.options; // Get the index of the dragged element within its parent

      newIndex = index(dragEl);
      newDraggableIndex = index(dragEl, options.draggable);
      pluginEvent('drop', this, {
        evt: evt
      });
      parentEl = dragEl && dragEl.parentNode; // Get again after plugin event

      newIndex = index(dragEl);
      newDraggableIndex = index(dragEl, options.draggable);

      if (Sortable.eventCanceled) {
        this._nulling();

        return;
      }

      awaitingDragStarted = false;
      isCircumstantialInvert = false;
      pastFirstInvertThresh = false;
      clearInterval(this._loopId);
      clearTimeout(this._dragStartTimer);

      _cancelNextTick(this.cloneId);

      _cancelNextTick(this._dragStartId); // Unbind events


      if (this.nativeDraggable) {
        off(document, 'drop', this);
        off(el, 'dragstart', this._onDragStart);
      }

      this._offMoveEvents();

      this._offUpEvents();

      if (Safari) {
        css$1(document.body, 'user-select', '');
      }

      css$1(dragEl, 'transform', '');

      if (evt) {
        if (moved) {
          evt.cancelable && evt.preventDefault();
          !options.dropBubble && evt.stopPropagation();
        }

        ghostEl && ghostEl.parentNode && ghostEl.parentNode.removeChild(ghostEl);

        if (rootEl === parentEl || putSortable && putSortable.lastPutMode !== 'clone') {
          // Remove clone(s)
          cloneEl && cloneEl.parentNode && cloneEl.parentNode.removeChild(cloneEl);
        }

        if (dragEl) {
          if (this.nativeDraggable) {
            off(dragEl, 'dragend', this);
          }

          _disableDraggable(dragEl);

          dragEl.style['will-change'] = ''; // Remove classes
          // ghostClass is added in dragStarted

          if (moved && !awaitingDragStarted) {
            toggleClass(dragEl, putSortable ? putSortable.options.ghostClass : this.options.ghostClass, false);
          }

          toggleClass(dragEl, this.options.chosenClass, false); // Drag stop event

          _dispatchEvent({
            sortable: this,
            name: 'unchoose',
            toEl: parentEl,
            newIndex: null,
            newDraggableIndex: null,
            originalEvent: evt
          });

          if (rootEl !== parentEl) {
            if (newIndex >= 0) {
              // Add event
              _dispatchEvent({
                rootEl: parentEl,
                name: 'add',
                toEl: parentEl,
                fromEl: rootEl,
                originalEvent: evt
              }); // Remove event


              _dispatchEvent({
                sortable: this,
                name: 'remove',
                toEl: parentEl,
                originalEvent: evt
              }); // drag from one list and drop into another


              _dispatchEvent({
                rootEl: parentEl,
                name: 'sort',
                toEl: parentEl,
                fromEl: rootEl,
                originalEvent: evt
              });

              _dispatchEvent({
                sortable: this,
                name: 'sort',
                toEl: parentEl,
                originalEvent: evt
              });
            }

            putSortable && putSortable.save();
          } else {
            if (newIndex !== oldIndex) {
              if (newIndex >= 0) {
                // drag & drop within the same list
                _dispatchEvent({
                  sortable: this,
                  name: 'update',
                  toEl: parentEl,
                  originalEvent: evt
                });

                _dispatchEvent({
                  sortable: this,
                  name: 'sort',
                  toEl: parentEl,
                  originalEvent: evt
                });
              }
            }
          }

          if (Sortable.active) {
            /* jshint eqnull:true */
            if (newIndex == null || newIndex === -1) {
              newIndex = oldIndex;
              newDraggableIndex = oldDraggableIndex;
            }

            _dispatchEvent({
              sortable: this,
              name: 'end',
              toEl: parentEl,
              originalEvent: evt
            }); // Save sorting


            this.save();
          }
        }
      }

      this._nulling();
    },
    _nulling: function _nulling() {
      pluginEvent('nulling', this);
      rootEl = dragEl = parentEl = ghostEl = nextEl = cloneEl = lastDownEl = cloneHidden = tapEvt = touchEvt = moved = newIndex = newDraggableIndex = oldIndex = oldDraggableIndex = lastTarget = lastDirection = putSortable = activeGroup = Sortable.dragged = Sortable.ghost = Sortable.clone = Sortable.active = null;
      savedInputChecked.forEach(function (el) {
        el.checked = true;
      });
      savedInputChecked.length = lastDx = lastDy = 0;
    },
    handleEvent: function handleEvent(
    /**Event*/
    evt) {
      switch (evt.type) {
        case 'drop':
        case 'dragend':
          this._onDrop(evt);

          break;

        case 'dragenter':
        case 'dragover':
          if (dragEl) {
            this._onDragOver(evt);

            _globalDragOver(evt);
          }

          break;

        case 'selectstart':
          evt.preventDefault();
          break;
      }
    },

    /**
     * Serializes the item into an array of string.
     * @returns {String[]}
     */
    toArray: function toArray() {
      var order = [],
          el,
          children = this.el.children,
          i = 0,
          n = children.length,
          options = this.options;

      for (; i < n; i++) {
        el = children[i];

        if (closest(el, options.draggable, this.el, false)) {
          order.push(el.getAttribute(options.dataIdAttr) || _generateId(el));
        }
      }

      return order;
    },

    /**
     * Sorts the elements according to the array.
     * @param  {String[]}  order  order of the items
     */
    sort: function sort(order, useAnimation) {
      var items = {},
          rootEl = this.el;
      this.toArray().forEach(function (id, i) {
        var el = rootEl.children[i];

        if (closest(el, this.options.draggable, rootEl, false)) {
          items[id] = el;
        }
      }, this);
      useAnimation && this.captureAnimationState();
      order.forEach(function (id) {
        if (items[id]) {
          rootEl.removeChild(items[id]);
          rootEl.appendChild(items[id]);
        }
      });
      useAnimation && this.animateAll();
    },

    /**
     * Save the current sorting
     */
    save: function save() {
      var store = this.options.store;
      store && store.set && store.set(this);
    },

    /**
     * For each element in the set, get the first element that matches the selector by testing the element itself and traversing up through its ancestors in the DOM tree.
     * @param   {HTMLElement}  el
     * @param   {String}       [selector]  default: `options.draggable`
     * @returns {HTMLElement|null}
     */
    closest: function closest$1(el, selector) {
      return closest(el, selector || this.options.draggable, this.el, false);
    },

    /**
     * Set/get option
     * @param   {string} name
     * @param   {*}      [value]
     * @returns {*}
     */
    option: function option(name, value) {
      var options = this.options;

      if (value === void 0) {
        return options[name];
      } else {
        var modifiedValue = PluginManager.modifyOption(this, name, value);

        if (typeof modifiedValue !== 'undefined') {
          options[name] = modifiedValue;
        } else {
          options[name] = value;
        }

        if (name === 'group') {
          _prepareGroup(options);
        }
      }
    },

    /**
     * Destroy
     */
    destroy: function destroy() {
      pluginEvent('destroy', this);
      var el = this.el;
      el[expando] = null;
      off(el, 'mousedown', this._onTapStart);
      off(el, 'touchstart', this._onTapStart);
      off(el, 'pointerdown', this._onTapStart);

      if (this.nativeDraggable) {
        off(el, 'dragover', this);
        off(el, 'dragenter', this);
      } // Remove draggable attributes


      Array.prototype.forEach.call(el.querySelectorAll('[draggable]'), function (el) {
        el.removeAttribute('draggable');
      });

      this._onDrop();

      this._disableDelayedDragEvents();

      sortables.splice(sortables.indexOf(this.el), 1);
      this.el = el = null;
    },
    _hideClone: function _hideClone() {
      if (!cloneHidden) {
        pluginEvent('hideClone', this);
        if (Sortable.eventCanceled) return;
        css$1(cloneEl, 'display', 'none');

        if (this.options.removeCloneOnHide && cloneEl.parentNode) {
          cloneEl.parentNode.removeChild(cloneEl);
        }

        cloneHidden = true;
      }
    },
    _showClone: function _showClone(putSortable) {
      if (putSortable.lastPutMode !== 'clone') {
        this._hideClone();

        return;
      }

      if (cloneHidden) {
        pluginEvent('showClone', this);
        if (Sortable.eventCanceled) return; // show clone at dragEl or original position

        if (dragEl.parentNode == rootEl && !this.options.group.revertClone) {
          rootEl.insertBefore(cloneEl, dragEl);
        } else if (nextEl) {
          rootEl.insertBefore(cloneEl, nextEl);
        } else {
          rootEl.appendChild(cloneEl);
        }

        if (this.options.group.revertClone) {
          this.animate(dragEl, cloneEl);
        }

        css$1(cloneEl, 'display', '');
        cloneHidden = false;
      }
    }
  };

  function _globalDragOver(
  /**Event*/
  evt) {
    if (evt.dataTransfer) {
      evt.dataTransfer.dropEffect = 'move';
    }

    evt.cancelable && evt.preventDefault();
  }

  function _onMove(fromEl, toEl, dragEl, dragRect, targetEl, targetRect, originalEvent, willInsertAfter) {
    var evt,
        sortable = fromEl[expando],
        onMoveFn = sortable.options.onMove,
        retVal; // Support for new CustomEvent feature

    if (window.CustomEvent && !IE11OrLess && !Edge) {
      evt = new CustomEvent('move', {
        bubbles: true,
        cancelable: true
      });
    } else {
      evt = document.createEvent('Event');
      evt.initEvent('move', true, true);
    }

    evt.to = toEl;
    evt.from = fromEl;
    evt.dragged = dragEl;
    evt.draggedRect = dragRect;
    evt.related = targetEl || toEl;
    evt.relatedRect = targetRect || getRect(toEl);
    evt.willInsertAfter = willInsertAfter;
    evt.originalEvent = originalEvent;
    fromEl.dispatchEvent(evt);

    if (onMoveFn) {
      retVal = onMoveFn.call(sortable, evt, originalEvent);
    }

    return retVal;
  }

  function _disableDraggable(el) {
    el.draggable = false;
  }

  function _unsilent() {
    _silent = false;
  }

  function _ghostIsFirst(evt, vertical, sortable) {
    var rect = getRect(getChild(sortable.el, 0, sortable.options, true));
    var spacer = 10;
    return vertical ? evt.clientX < rect.left - spacer || evt.clientY < rect.top && evt.clientX < rect.right : evt.clientY < rect.top - spacer || evt.clientY < rect.bottom && evt.clientX < rect.left;
  }

  function _ghostIsLast(evt, vertical, sortable) {
    var rect = getRect(lastChild(sortable.el, sortable.options.draggable));
    var spacer = 10;
    return vertical ? evt.clientX > rect.right + spacer || evt.clientX <= rect.right && evt.clientY > rect.bottom && evt.clientX >= rect.left : evt.clientX > rect.right && evt.clientY > rect.top || evt.clientX <= rect.right && evt.clientY > rect.bottom + spacer;
  }

  function _getSwapDirection(evt, target, targetRect, vertical, swapThreshold, invertedSwapThreshold, invertSwap, isLastTarget) {
    var mouseOnAxis = vertical ? evt.clientY : evt.clientX,
        targetLength = vertical ? targetRect.height : targetRect.width,
        targetS1 = vertical ? targetRect.top : targetRect.left,
        targetS2 = vertical ? targetRect.bottom : targetRect.right,
        invert = false;

    if (!invertSwap) {
      // Never invert or create dragEl shadow when target movemenet causes mouse to move past the end of regular swapThreshold
      if (isLastTarget && targetMoveDistance < targetLength * swapThreshold) {
        // multiplied only by swapThreshold because mouse will already be inside target by (1 - threshold) * targetLength / 2
        // check if past first invert threshold on side opposite of lastDirection
        if (!pastFirstInvertThresh && (lastDirection === 1 ? mouseOnAxis > targetS1 + targetLength * invertedSwapThreshold / 2 : mouseOnAxis < targetS2 - targetLength * invertedSwapThreshold / 2)) {
          // past first invert threshold, do not restrict inverted threshold to dragEl shadow
          pastFirstInvertThresh = true;
        }

        if (!pastFirstInvertThresh) {
          // dragEl shadow (target move distance shadow)
          if (lastDirection === 1 ? mouseOnAxis < targetS1 + targetMoveDistance // over dragEl shadow
          : mouseOnAxis > targetS2 - targetMoveDistance) {
            return -lastDirection;
          }
        } else {
          invert = true;
        }
      } else {
        // Regular
        if (mouseOnAxis > targetS1 + targetLength * (1 - swapThreshold) / 2 && mouseOnAxis < targetS2 - targetLength * (1 - swapThreshold) / 2) {
          return _getInsertDirection(target);
        }
      }
    }

    invert = invert || invertSwap;

    if (invert) {
      // Invert of regular
      if (mouseOnAxis < targetS1 + targetLength * invertedSwapThreshold / 2 || mouseOnAxis > targetS2 - targetLength * invertedSwapThreshold / 2) {
        return mouseOnAxis > targetS1 + targetLength / 2 ? 1 : -1;
      }
    }

    return 0;
  }
  /**
   * Gets the direction dragEl must be swapped relative to target in order to make it
   * seem that dragEl has been "inserted" into that element's position
   * @param  {HTMLElement} target       The target whose position dragEl is being inserted at
   * @return {Number}                   Direction dragEl must be swapped
   */


  function _getInsertDirection(target) {
    if (index(dragEl) < index(target)) {
      return 1;
    } else {
      return -1;
    }
  }
  /**
   * Generate id
   * @param   {HTMLElement} el
   * @returns {String}
   * @private
   */


  function _generateId(el) {
    var str = el.tagName + el.className + el.src + el.href + el.textContent,
        i = str.length,
        sum = 0;

    while (i--) {
      sum += str.charCodeAt(i);
    }

    return sum.toString(36);
  }

  function _saveInputCheckedState(root) {
    savedInputChecked.length = 0;
    var inputs = root.getElementsByTagName('input');
    var idx = inputs.length;

    while (idx--) {
      var el = inputs[idx];
      el.checked && savedInputChecked.push(el);
    }
  }

  function _nextTick(fn) {
    return setTimeout(fn, 0);
  }

  function _cancelNextTick(id) {
    return clearTimeout(id);
  } // Fixed #973:


  if (documentExists) {
    on(document, 'touchmove', function (evt) {
      if ((Sortable.active || awaitingDragStarted) && evt.cancelable) {
        evt.preventDefault();
      }
    });
  } // Export utils


  Sortable.utils = {
    on: on,
    off: off,
    css: css$1,
    find: find,
    is: function is(el, selector) {
      return !!closest(el, selector, el, false);
    },
    extend: extend,
    throttle: throttle,
    closest: closest,
    toggleClass: toggleClass,
    clone: clone,
    index: index,
    nextTick: _nextTick,
    cancelNextTick: _cancelNextTick,
    detectDirection: _detectDirection,
    getChild: getChild
  };
  /**
   * Get the Sortable instance of an element
   * @param  {HTMLElement} element The element
   * @return {Sortable|undefined}         The instance of Sortable
   */

  Sortable.get = function (element) {
    return element[expando];
  };
  /**
   * Mount a plugin to Sortable
   * @param  {...SortablePlugin|SortablePlugin[]} plugins       Plugins being mounted
   */


  Sortable.mount = function () {
    for (var _len = arguments.length, plugins = new Array(_len), _key = 0; _key < _len; _key++) {
      plugins[_key] = arguments[_key];
    }

    if (plugins[0].constructor === Array) plugins = plugins[0];
    plugins.forEach(function (plugin) {
      if (!plugin.prototype || !plugin.prototype.constructor) {
        throw "Sortable: Mounted plugin must be a constructor function, not ".concat({}.toString.call(plugin));
      }

      if (plugin.utils) Sortable.utils = _objectSpread2(_objectSpread2({}, Sortable.utils), plugin.utils);
      PluginManager.mount(plugin);
    });
  };
  /**
   * Create sortable instance
   * @param {HTMLElement}  el
   * @param {Object}      [options]
   */


  Sortable.create = function (el, options) {
    return new Sortable(el, options);
  }; // Export


  Sortable.version = version;

  var autoScrolls = [],
      scrollEl,
      scrollRootEl,
      scrolling = false,
      lastAutoScrollX,
      lastAutoScrollY,
      touchEvt$1,
      pointerElemChangedInterval;

  function AutoScrollPlugin() {
    function AutoScroll() {
      this.defaults = {
        scroll: true,
        forceAutoScrollFallback: false,
        scrollSensitivity: 30,
        scrollSpeed: 10,
        bubbleScroll: true
      }; // Bind all private methods

      for (var fn in this) {
        if (fn.charAt(0) === '_' && typeof this[fn] === 'function') {
          this[fn] = this[fn].bind(this);
        }
      }
    }

    AutoScroll.prototype = {
      dragStarted: function dragStarted(_ref) {
        var originalEvent = _ref.originalEvent;

        if (this.sortable.nativeDraggable) {
          on(document, 'dragover', this._handleAutoScroll);
        } else {
          if (this.options.supportPointer) {
            on(document, 'pointermove', this._handleFallbackAutoScroll);
          } else if (originalEvent.touches) {
            on(document, 'touchmove', this._handleFallbackAutoScroll);
          } else {
            on(document, 'mousemove', this._handleFallbackAutoScroll);
          }
        }
      },
      dragOverCompleted: function dragOverCompleted(_ref2) {
        var originalEvent = _ref2.originalEvent;

        // For when bubbling is canceled and using fallback (fallback 'touchmove' always reached)
        if (!this.options.dragOverBubble && !originalEvent.rootEl) {
          this._handleAutoScroll(originalEvent);
        }
      },
      drop: function drop() {
        if (this.sortable.nativeDraggable) {
          off(document, 'dragover', this._handleAutoScroll);
        } else {
          off(document, 'pointermove', this._handleFallbackAutoScroll);
          off(document, 'touchmove', this._handleFallbackAutoScroll);
          off(document, 'mousemove', this._handleFallbackAutoScroll);
        }

        clearPointerElemChangedInterval();
        clearAutoScrolls();
        cancelThrottle();
      },
      nulling: function nulling() {
        touchEvt$1 = scrollRootEl = scrollEl = scrolling = pointerElemChangedInterval = lastAutoScrollX = lastAutoScrollY = null;
        autoScrolls.length = 0;
      },
      _handleFallbackAutoScroll: function _handleFallbackAutoScroll(evt) {
        this._handleAutoScroll(evt, true);
      },
      _handleAutoScroll: function _handleAutoScroll(evt, fallback) {
        var _this = this;

        var x = (evt.touches ? evt.touches[0] : evt).clientX,
            y = (evt.touches ? evt.touches[0] : evt).clientY,
            elem = document.elementFromPoint(x, y);
        touchEvt$1 = evt; // IE does not seem to have native autoscroll,
        // Edge's autoscroll seems too conditional,
        // MACOS Safari does not have autoscroll,
        // Firefox and Chrome are good

        if (fallback || this.options.forceAutoScrollFallback || Edge || IE11OrLess || Safari) {
          autoScroll(evt, this.options, elem, fallback); // Listener for pointer element change

          var ogElemScroller = getParentAutoScrollElement(elem, true);

          if (scrolling && (!pointerElemChangedInterval || x !== lastAutoScrollX || y !== lastAutoScrollY)) {
            pointerElemChangedInterval && clearPointerElemChangedInterval(); // Detect for pointer elem change, emulating native DnD behaviour

            pointerElemChangedInterval = setInterval(function () {
              var newElem = getParentAutoScrollElement(document.elementFromPoint(x, y), true);

              if (newElem !== ogElemScroller) {
                ogElemScroller = newElem;
                clearAutoScrolls();
              }

              autoScroll(evt, _this.options, newElem, fallback);
            }, 10);
            lastAutoScrollX = x;
            lastAutoScrollY = y;
          }
        } else {
          // if DnD is enabled (and browser has good autoscrolling), first autoscroll will already scroll, so get parent autoscroll of first autoscroll
          if (!this.options.bubbleScroll || getParentAutoScrollElement(elem, true) === getWindowScrollingElement()) {
            clearAutoScrolls();
            return;
          }

          autoScroll(evt, this.options, getParentAutoScrollElement(elem, false), false);
        }
      }
    };
    return _extends(AutoScroll, {
      pluginName: 'scroll',
      initializeByDefault: true
    });
  }

  function clearAutoScrolls() {
    autoScrolls.forEach(function (autoScroll) {
      clearInterval(autoScroll.pid);
    });
    autoScrolls = [];
  }

  function clearPointerElemChangedInterval() {
    clearInterval(pointerElemChangedInterval);
  }

  var autoScroll = throttle(function (evt, options, rootEl, isFallback) {
    // Bug: https://bugzilla.mozilla.org/show_bug.cgi?id=505521
    if (!options.scroll) return;
    var x = (evt.touches ? evt.touches[0] : evt).clientX,
        y = (evt.touches ? evt.touches[0] : evt).clientY,
        sens = options.scrollSensitivity,
        speed = options.scrollSpeed,
        winScroller = getWindowScrollingElement();
    var scrollThisInstance = false,
        scrollCustomFn; // New scroll root, set scrollEl

    if (scrollRootEl !== rootEl) {
      scrollRootEl = rootEl;
      clearAutoScrolls();
      scrollEl = options.scroll;
      scrollCustomFn = options.scrollFn;

      if (scrollEl === true) {
        scrollEl = getParentAutoScrollElement(rootEl, true);
      }
    }

    var layersOut = 0;
    var currentParent = scrollEl;

    do {
      var el = currentParent,
          rect = getRect(el),
          top = rect.top,
          bottom = rect.bottom,
          left = rect.left,
          right = rect.right,
          width = rect.width,
          height = rect.height,
          canScrollX = void 0,
          canScrollY = void 0,
          scrollWidth = el.scrollWidth,
          scrollHeight = el.scrollHeight,
          elCSS = css$1(el),
          scrollPosX = el.scrollLeft,
          scrollPosY = el.scrollTop;

      if (el === winScroller) {
        canScrollX = width < scrollWidth && (elCSS.overflowX === 'auto' || elCSS.overflowX === 'scroll' || elCSS.overflowX === 'visible');
        canScrollY = height < scrollHeight && (elCSS.overflowY === 'auto' || elCSS.overflowY === 'scroll' || elCSS.overflowY === 'visible');
      } else {
        canScrollX = width < scrollWidth && (elCSS.overflowX === 'auto' || elCSS.overflowX === 'scroll');
        canScrollY = height < scrollHeight && (elCSS.overflowY === 'auto' || elCSS.overflowY === 'scroll');
      }

      var vx = canScrollX && (Math.abs(right - x) <= sens && scrollPosX + width < scrollWidth) - (Math.abs(left - x) <= sens && !!scrollPosX);
      var vy = canScrollY && (Math.abs(bottom - y) <= sens && scrollPosY + height < scrollHeight) - (Math.abs(top - y) <= sens && !!scrollPosY);

      if (!autoScrolls[layersOut]) {
        for (var i = 0; i <= layersOut; i++) {
          if (!autoScrolls[i]) {
            autoScrolls[i] = {};
          }
        }
      }

      if (autoScrolls[layersOut].vx != vx || autoScrolls[layersOut].vy != vy || autoScrolls[layersOut].el !== el) {
        autoScrolls[layersOut].el = el;
        autoScrolls[layersOut].vx = vx;
        autoScrolls[layersOut].vy = vy;
        clearInterval(autoScrolls[layersOut].pid);

        if (vx != 0 || vy != 0) {
          scrollThisInstance = true;
          /* jshint loopfunc:true */

          autoScrolls[layersOut].pid = setInterval(function () {
            // emulate drag over during autoscroll (fallback), emulating native DnD behaviour
            if (isFallback && this.layer === 0) {
              Sortable.active._onTouchMove(touchEvt$1); // To move ghost if it is positioned absolutely

            }

            var scrollOffsetY = autoScrolls[this.layer].vy ? autoScrolls[this.layer].vy * speed : 0;
            var scrollOffsetX = autoScrolls[this.layer].vx ? autoScrolls[this.layer].vx * speed : 0;

            if (typeof scrollCustomFn === 'function') {
              if (scrollCustomFn.call(Sortable.dragged.parentNode[expando], scrollOffsetX, scrollOffsetY, evt, touchEvt$1, autoScrolls[this.layer].el) !== 'continue') {
                return;
              }
            }

            scrollBy(autoScrolls[this.layer].el, scrollOffsetX, scrollOffsetY);
          }.bind({
            layer: layersOut
          }), 24);
        }
      }

      layersOut++;
    } while (options.bubbleScroll && currentParent !== winScroller && (currentParent = getParentAutoScrollElement(currentParent, false)));

    scrolling = scrollThisInstance; // in case another function catches scrolling as false in between when it is not
  }, 30);

  var drop = function drop(_ref) {
    var originalEvent = _ref.originalEvent,
        putSortable = _ref.putSortable,
        dragEl = _ref.dragEl,
        activeSortable = _ref.activeSortable,
        dispatchSortableEvent = _ref.dispatchSortableEvent,
        hideGhostForTarget = _ref.hideGhostForTarget,
        unhideGhostForTarget = _ref.unhideGhostForTarget;
    if (!originalEvent) return;
    var toSortable = putSortable || activeSortable;
    hideGhostForTarget();
    var touch = originalEvent.changedTouches && originalEvent.changedTouches.length ? originalEvent.changedTouches[0] : originalEvent;
    var target = document.elementFromPoint(touch.clientX, touch.clientY);
    unhideGhostForTarget();

    if (toSortable && !toSortable.el.contains(target)) {
      dispatchSortableEvent('spill');
      this.onSpill({
        dragEl: dragEl,
        putSortable: putSortable
      });
    }
  };

  function Revert() {}

  Revert.prototype = {
    startIndex: null,
    dragStart: function dragStart(_ref2) {
      var oldDraggableIndex = _ref2.oldDraggableIndex;
      this.startIndex = oldDraggableIndex;
    },
    onSpill: function onSpill(_ref3) {
      var dragEl = _ref3.dragEl,
          putSortable = _ref3.putSortable;
      this.sortable.captureAnimationState();

      if (putSortable) {
        putSortable.captureAnimationState();
      }

      var nextSibling = getChild(this.sortable.el, this.startIndex, this.options);

      if (nextSibling) {
        this.sortable.el.insertBefore(dragEl, nextSibling);
      } else {
        this.sortable.el.appendChild(dragEl);
      }

      this.sortable.animateAll();

      if (putSortable) {
        putSortable.animateAll();
      }
    },
    drop: drop
  };

  _extends(Revert, {
    pluginName: 'revertOnSpill'
  });

  function Remove() {}

  Remove.prototype = {
    onSpill: function onSpill(_ref4) {
      var dragEl = _ref4.dragEl,
          putSortable = _ref4.putSortable;
      var parentSortable = putSortable || this.sortable;
      parentSortable.captureAnimationState();
      dragEl.parentNode && dragEl.parentNode.removeChild(dragEl);
      parentSortable.animateAll();
    },
    drop: drop
  };

  _extends(Remove, {
    pluginName: 'removeOnSpill'
  });

  var lastSwapEl;

  function SwapPlugin() {
    function Swap() {
      this.defaults = {
        swapClass: 'sortable-swap-highlight'
      };
    }

    Swap.prototype = {
      dragStart: function dragStart(_ref) {
        var dragEl = _ref.dragEl;
        lastSwapEl = dragEl;
      },
      dragOverValid: function dragOverValid(_ref2) {
        var completed = _ref2.completed,
            target = _ref2.target,
            onMove = _ref2.onMove,
            activeSortable = _ref2.activeSortable,
            changed = _ref2.changed,
            cancel = _ref2.cancel;
        if (!activeSortable.options.swap) return;
        var el = this.sortable.el,
            options = this.options;

        if (target && target !== el) {
          var prevSwapEl = lastSwapEl;

          if (onMove(target) !== false) {
            toggleClass(target, options.swapClass, true);
            lastSwapEl = target;
          } else {
            lastSwapEl = null;
          }

          if (prevSwapEl && prevSwapEl !== lastSwapEl) {
            toggleClass(prevSwapEl, options.swapClass, false);
          }
        }

        changed();
        completed(true);
        cancel();
      },
      drop: function drop(_ref3) {
        var activeSortable = _ref3.activeSortable,
            putSortable = _ref3.putSortable,
            dragEl = _ref3.dragEl;
        var toSortable = putSortable || this.sortable;
        var options = this.options;
        lastSwapEl && toggleClass(lastSwapEl, options.swapClass, false);

        if (lastSwapEl && (options.swap || putSortable && putSortable.options.swap)) {
          if (dragEl !== lastSwapEl) {
            toSortable.captureAnimationState();
            if (toSortable !== activeSortable) activeSortable.captureAnimationState();
            swapNodes(dragEl, lastSwapEl);
            toSortable.animateAll();
            if (toSortable !== activeSortable) activeSortable.animateAll();
          }
        }
      },
      nulling: function nulling() {
        lastSwapEl = null;
      }
    };
    return _extends(Swap, {
      pluginName: 'swap',
      eventProperties: function eventProperties() {
        return {
          swapItem: lastSwapEl
        };
      }
    });
  }

  function swapNodes(n1, n2) {
    var p1 = n1.parentNode,
        p2 = n2.parentNode,
        i1,
        i2;
    if (!p1 || !p2 || p1.isEqualNode(n2) || p2.isEqualNode(n1)) return;
    i1 = index(n1);
    i2 = index(n2);

    if (p1.isEqualNode(p2) && i1 < i2) {
      i2++;
    }

    p1.insertBefore(n2, p1.children[i1]);
    p2.insertBefore(n1, p2.children[i2]);
  }

  var multiDragElements = [],
      multiDragClones = [],
      lastMultiDragSelect,
      // for selection with modifier key down (SHIFT)
  multiDragSortable,
      initialFolding = false,
      // Initial multi-drag fold when drag started
  folding = false,
      // Folding any other time
  dragStarted = false,
      dragEl$1,
      clonesFromRect,
      clonesHidden;

  function MultiDragPlugin() {
    function MultiDrag(sortable) {
      // Bind all private methods
      for (var fn in this) {
        if (fn.charAt(0) === '_' && typeof this[fn] === 'function') {
          this[fn] = this[fn].bind(this);
        }
      }

      if (!sortable.options.avoidImplicitDeselect) {
        if (sortable.options.supportPointer) {
          on(document, 'pointerup', this._deselectMultiDrag);
        } else {
          on(document, 'mouseup', this._deselectMultiDrag);
          on(document, 'touchend', this._deselectMultiDrag);
        }
      }

      on(document, 'keydown', this._checkKeyDown);
      on(document, 'keyup', this._checkKeyUp);
      this.defaults = {
        selectedClass: 'sortable-selected',
        multiDragKey: null,
        avoidImplicitDeselect: false,
        setData: function setData(dataTransfer, dragEl) {
          var data = '';

          if (multiDragElements.length && multiDragSortable === sortable) {
            multiDragElements.forEach(function (multiDragElement, i) {
              data += (!i ? '' : ', ') + multiDragElement.textContent;
            });
          } else {
            data = dragEl.textContent;
          }

          dataTransfer.setData('Text', data);
        }
      };
    }

    MultiDrag.prototype = {
      multiDragKeyDown: false,
      isMultiDrag: false,
      delayStartGlobal: function delayStartGlobal(_ref) {
        var dragged = _ref.dragEl;
        dragEl$1 = dragged;
      },
      delayEnded: function delayEnded() {
        this.isMultiDrag = ~multiDragElements.indexOf(dragEl$1);
      },
      setupClone: function setupClone(_ref2) {
        var sortable = _ref2.sortable,
            cancel = _ref2.cancel;
        if (!this.isMultiDrag) return;

        for (var i = 0; i < multiDragElements.length; i++) {
          multiDragClones.push(clone(multiDragElements[i]));
          multiDragClones[i].sortableIndex = multiDragElements[i].sortableIndex;
          multiDragClones[i].draggable = false;
          multiDragClones[i].style['will-change'] = '';
          toggleClass(multiDragClones[i], this.options.selectedClass, false);
          multiDragElements[i] === dragEl$1 && toggleClass(multiDragClones[i], this.options.chosenClass, false);
        }

        sortable._hideClone();

        cancel();
      },
      clone: function clone(_ref3) {
        var sortable = _ref3.sortable,
            rootEl = _ref3.rootEl,
            dispatchSortableEvent = _ref3.dispatchSortableEvent,
            cancel = _ref3.cancel;
        if (!this.isMultiDrag) return;

        if (!this.options.removeCloneOnHide) {
          if (multiDragElements.length && multiDragSortable === sortable) {
            insertMultiDragClones(true, rootEl);
            dispatchSortableEvent('clone');
            cancel();
          }
        }
      },
      showClone: function showClone(_ref4) {
        var cloneNowShown = _ref4.cloneNowShown,
            rootEl = _ref4.rootEl,
            cancel = _ref4.cancel;
        if (!this.isMultiDrag) return;
        insertMultiDragClones(false, rootEl);
        multiDragClones.forEach(function (clone) {
          css$1(clone, 'display', '');
        });
        cloneNowShown();
        clonesHidden = false;
        cancel();
      },
      hideClone: function hideClone(_ref5) {
        var _this = this;

        _ref5.sortable;
            var cloneNowHidden = _ref5.cloneNowHidden,
            cancel = _ref5.cancel;
        if (!this.isMultiDrag) return;
        multiDragClones.forEach(function (clone) {
          css$1(clone, 'display', 'none');

          if (_this.options.removeCloneOnHide && clone.parentNode) {
            clone.parentNode.removeChild(clone);
          }
        });
        cloneNowHidden();
        clonesHidden = true;
        cancel();
      },
      dragStartGlobal: function dragStartGlobal(_ref6) {
        _ref6.sortable;

        if (!this.isMultiDrag && multiDragSortable) {
          multiDragSortable.multiDrag._deselectMultiDrag();
        }

        multiDragElements.forEach(function (multiDragElement) {
          multiDragElement.sortableIndex = index(multiDragElement);
        }); // Sort multi-drag elements

        multiDragElements = multiDragElements.sort(function (a, b) {
          return a.sortableIndex - b.sortableIndex;
        });
        dragStarted = true;
      },
      dragStarted: function dragStarted(_ref7) {
        var _this2 = this;

        var sortable = _ref7.sortable;
        if (!this.isMultiDrag) return;

        if (this.options.sort) {
          // Capture rects,
          // hide multi drag elements (by positioning them absolute),
          // set multi drag elements rects to dragRect,
          // show multi drag elements,
          // animate to rects,
          // unset rects & remove from DOM
          sortable.captureAnimationState();

          if (this.options.animation) {
            multiDragElements.forEach(function (multiDragElement) {
              if (multiDragElement === dragEl$1) return;
              css$1(multiDragElement, 'position', 'absolute');
            });
            var dragRect = getRect(dragEl$1, false, true, true);
            multiDragElements.forEach(function (multiDragElement) {
              if (multiDragElement === dragEl$1) return;
              setRect(multiDragElement, dragRect);
            });
            folding = true;
            initialFolding = true;
          }
        }

        sortable.animateAll(function () {
          folding = false;
          initialFolding = false;

          if (_this2.options.animation) {
            multiDragElements.forEach(function (multiDragElement) {
              unsetRect(multiDragElement);
            });
          } // Remove all auxiliary multidrag items from el, if sorting enabled


          if (_this2.options.sort) {
            removeMultiDragElements();
          }
        });
      },
      dragOver: function dragOver(_ref8) {
        var target = _ref8.target,
            completed = _ref8.completed,
            cancel = _ref8.cancel;

        if (folding && ~multiDragElements.indexOf(target)) {
          completed(false);
          cancel();
        }
      },
      revert: function revert(_ref9) {
        var fromSortable = _ref9.fromSortable,
            rootEl = _ref9.rootEl,
            sortable = _ref9.sortable,
            dragRect = _ref9.dragRect;

        if (multiDragElements.length > 1) {
          // Setup unfold animation
          multiDragElements.forEach(function (multiDragElement) {
            sortable.addAnimationState({
              target: multiDragElement,
              rect: folding ? getRect(multiDragElement) : dragRect
            });
            unsetRect(multiDragElement);
            multiDragElement.fromRect = dragRect;
            fromSortable.removeAnimationState(multiDragElement);
          });
          folding = false;
          insertMultiDragElements(!this.options.removeCloneOnHide, rootEl);
        }
      },
      dragOverCompleted: function dragOverCompleted(_ref10) {
        var sortable = _ref10.sortable,
            isOwner = _ref10.isOwner,
            insertion = _ref10.insertion,
            activeSortable = _ref10.activeSortable,
            parentEl = _ref10.parentEl,
            putSortable = _ref10.putSortable;
        var options = this.options;

        if (insertion) {
          // Clones must be hidden before folding animation to capture dragRectAbsolute properly
          if (isOwner) {
            activeSortable._hideClone();
          }

          initialFolding = false; // If leaving sort:false root, or already folding - Fold to new location

          if (options.animation && multiDragElements.length > 1 && (folding || !isOwner && !activeSortable.options.sort && !putSortable)) {
            // Fold: Set all multi drag elements's rects to dragEl's rect when multi-drag elements are invisible
            var dragRectAbsolute = getRect(dragEl$1, false, true, true);
            multiDragElements.forEach(function (multiDragElement) {
              if (multiDragElement === dragEl$1) return;
              setRect(multiDragElement, dragRectAbsolute); // Move element(s) to end of parentEl so that it does not interfere with multi-drag clones insertion if they are inserted
              // while folding, and so that we can capture them again because old sortable will no longer be fromSortable

              parentEl.appendChild(multiDragElement);
            });
            folding = true;
          } // Clones must be shown (and check to remove multi drags) after folding when interfering multiDragElements are moved out


          if (!isOwner) {
            // Only remove if not folding (folding will remove them anyways)
            if (!folding) {
              removeMultiDragElements();
            }

            if (multiDragElements.length > 1) {
              var clonesHiddenBefore = clonesHidden;

              activeSortable._showClone(sortable); // Unfold animation for clones if showing from hidden


              if (activeSortable.options.animation && !clonesHidden && clonesHiddenBefore) {
                multiDragClones.forEach(function (clone) {
                  activeSortable.addAnimationState({
                    target: clone,
                    rect: clonesFromRect
                  });
                  clone.fromRect = clonesFromRect;
                  clone.thisAnimationDuration = null;
                });
              }
            } else {
              activeSortable._showClone(sortable);
            }
          }
        }
      },
      dragOverAnimationCapture: function dragOverAnimationCapture(_ref11) {
        var dragRect = _ref11.dragRect,
            isOwner = _ref11.isOwner,
            activeSortable = _ref11.activeSortable;
        multiDragElements.forEach(function (multiDragElement) {
          multiDragElement.thisAnimationDuration = null;
        });

        if (activeSortable.options.animation && !isOwner && activeSortable.multiDrag.isMultiDrag) {
          clonesFromRect = _extends({}, dragRect);
          var dragMatrix = matrix(dragEl$1, true);
          clonesFromRect.top -= dragMatrix.f;
          clonesFromRect.left -= dragMatrix.e;
        }
      },
      dragOverAnimationComplete: function dragOverAnimationComplete() {
        if (folding) {
          folding = false;
          removeMultiDragElements();
        }
      },
      drop: function drop(_ref12) {
        var evt = _ref12.originalEvent,
            rootEl = _ref12.rootEl,
            parentEl = _ref12.parentEl,
            sortable = _ref12.sortable,
            dispatchSortableEvent = _ref12.dispatchSortableEvent,
            oldIndex = _ref12.oldIndex,
            putSortable = _ref12.putSortable;
        var toSortable = putSortable || this.sortable;
        if (!evt) return;
        var options = this.options,
            children = parentEl.children; // Multi-drag selection

        if (!dragStarted) {
          if (options.multiDragKey && !this.multiDragKeyDown) {
            this._deselectMultiDrag();
          }

          toggleClass(dragEl$1, options.selectedClass, !~multiDragElements.indexOf(dragEl$1));

          if (!~multiDragElements.indexOf(dragEl$1)) {
            multiDragElements.push(dragEl$1);
            dispatchEvent({
              sortable: sortable,
              rootEl: rootEl,
              name: 'select',
              targetEl: dragEl$1,
              originalEvent: evt
            }); // Modifier activated, select from last to dragEl

            if (evt.shiftKey && lastMultiDragSelect && sortable.el.contains(lastMultiDragSelect)) {
              var lastIndex = index(lastMultiDragSelect),
                  currentIndex = index(dragEl$1);

              if (~lastIndex && ~currentIndex && lastIndex !== currentIndex) {
                // Must include lastMultiDragSelect (select it), in case modified selection from no selection
                // (but previous selection existed)
                var n, i;

                if (currentIndex > lastIndex) {
                  i = lastIndex;
                  n = currentIndex;
                } else {
                  i = currentIndex;
                  n = lastIndex + 1;
                }

                for (; i < n; i++) {
                  if (~multiDragElements.indexOf(children[i])) continue;
                  toggleClass(children[i], options.selectedClass, true);
                  multiDragElements.push(children[i]);
                  dispatchEvent({
                    sortable: sortable,
                    rootEl: rootEl,
                    name: 'select',
                    targetEl: children[i],
                    originalEvent: evt
                  });
                }
              }
            } else {
              lastMultiDragSelect = dragEl$1;
            }

            multiDragSortable = toSortable;
          } else {
            multiDragElements.splice(multiDragElements.indexOf(dragEl$1), 1);
            lastMultiDragSelect = null;
            dispatchEvent({
              sortable: sortable,
              rootEl: rootEl,
              name: 'deselect',
              targetEl: dragEl$1,
              originalEvent: evt
            });
          }
        } // Multi-drag drop


        if (dragStarted && this.isMultiDrag) {
          folding = false; // Do not "unfold" after around dragEl if reverted

          if ((parentEl[expando].options.sort || parentEl !== rootEl) && multiDragElements.length > 1) {
            var dragRect = getRect(dragEl$1),
                multiDragIndex = index(dragEl$1, ':not(.' + this.options.selectedClass + ')');
            if (!initialFolding && options.animation) dragEl$1.thisAnimationDuration = null;
            toSortable.captureAnimationState();

            if (!initialFolding) {
              if (options.animation) {
                dragEl$1.fromRect = dragRect;
                multiDragElements.forEach(function (multiDragElement) {
                  multiDragElement.thisAnimationDuration = null;

                  if (multiDragElement !== dragEl$1) {
                    var rect = folding ? getRect(multiDragElement) : dragRect;
                    multiDragElement.fromRect = rect; // Prepare unfold animation

                    toSortable.addAnimationState({
                      target: multiDragElement,
                      rect: rect
                    });
                  }
                });
              } // Multi drag elements are not necessarily removed from the DOM on drop, so to reinsert
              // properly they must all be removed


              removeMultiDragElements();
              multiDragElements.forEach(function (multiDragElement) {
                if (children[multiDragIndex]) {
                  parentEl.insertBefore(multiDragElement, children[multiDragIndex]);
                } else {
                  parentEl.appendChild(multiDragElement);
                }

                multiDragIndex++;
              }); // If initial folding is done, the elements may have changed position because they are now
              // unfolding around dragEl, even though dragEl may not have his index changed, so update event
              // must be fired here as Sortable will not.

              if (oldIndex === index(dragEl$1)) {
                var update = false;
                multiDragElements.forEach(function (multiDragElement) {
                  if (multiDragElement.sortableIndex !== index(multiDragElement)) {
                    update = true;
                    return;
                  }
                });

                if (update) {
                  dispatchSortableEvent('update');
                }
              }
            } // Must be done after capturing individual rects (scroll bar)


            multiDragElements.forEach(function (multiDragElement) {
              unsetRect(multiDragElement);
            });
            toSortable.animateAll();
          }

          multiDragSortable = toSortable;
        } // Remove clones if necessary


        if (rootEl === parentEl || putSortable && putSortable.lastPutMode !== 'clone') {
          multiDragClones.forEach(function (clone) {
            clone.parentNode && clone.parentNode.removeChild(clone);
          });
        }
      },
      nullingGlobal: function nullingGlobal() {
        this.isMultiDrag = dragStarted = false;
        multiDragClones.length = 0;
      },
      destroyGlobal: function destroyGlobal() {
        this._deselectMultiDrag();

        off(document, 'pointerup', this._deselectMultiDrag);
        off(document, 'mouseup', this._deselectMultiDrag);
        off(document, 'touchend', this._deselectMultiDrag);
        off(document, 'keydown', this._checkKeyDown);
        off(document, 'keyup', this._checkKeyUp);
      },
      _deselectMultiDrag: function _deselectMultiDrag(evt) {
        if (typeof dragStarted !== "undefined" && dragStarted) return; // Only deselect if selection is in this sortable

        if (multiDragSortable !== this.sortable) return; // Only deselect if target is not item in this sortable

        if (evt && closest(evt.target, this.options.draggable, this.sortable.el, false)) return; // Only deselect if left click

        if (evt && evt.button !== 0) return;

        while (multiDragElements.length) {
          var el = multiDragElements[0];
          toggleClass(el, this.options.selectedClass, false);
          multiDragElements.shift();
          dispatchEvent({
            sortable: this.sortable,
            rootEl: this.sortable.el,
            name: 'deselect',
            targetEl: el,
            originalEvent: evt
          });
        }
      },
      _checkKeyDown: function _checkKeyDown(evt) {
        if (evt.key === this.options.multiDragKey) {
          this.multiDragKeyDown = true;
        }
      },
      _checkKeyUp: function _checkKeyUp(evt) {
        if (evt.key === this.options.multiDragKey) {
          this.multiDragKeyDown = false;
        }
      }
    };
    return _extends(MultiDrag, {
      // Static methods & properties
      pluginName: 'multiDrag',
      utils: {
        /**
         * Selects the provided multi-drag item
         * @param  {HTMLElement} el    The element to be selected
         */
        select: function select(el) {
          var sortable = el.parentNode[expando];
          if (!sortable || !sortable.options.multiDrag || ~multiDragElements.indexOf(el)) return;

          if (multiDragSortable && multiDragSortable !== sortable) {
            multiDragSortable.multiDrag._deselectMultiDrag();

            multiDragSortable = sortable;
          }

          toggleClass(el, sortable.options.selectedClass, true);
          multiDragElements.push(el);
        },

        /**
         * Deselects the provided multi-drag item
         * @param  {HTMLElement} el    The element to be deselected
         */
        deselect: function deselect(el) {
          var sortable = el.parentNode[expando],
              index = multiDragElements.indexOf(el);
          if (!sortable || !sortable.options.multiDrag || !~index) return;
          toggleClass(el, sortable.options.selectedClass, false);
          multiDragElements.splice(index, 1);
        }
      },
      eventProperties: function eventProperties() {
        var _this3 = this;

        var oldIndicies = [],
            newIndicies = [];
        multiDragElements.forEach(function (multiDragElement) {
          oldIndicies.push({
            multiDragElement: multiDragElement,
            index: multiDragElement.sortableIndex
          }); // multiDragElements will already be sorted if folding

          var newIndex;

          if (folding && multiDragElement !== dragEl$1) {
            newIndex = -1;
          } else if (folding) {
            newIndex = index(multiDragElement, ':not(.' + _this3.options.selectedClass + ')');
          } else {
            newIndex = index(multiDragElement);
          }

          newIndicies.push({
            multiDragElement: multiDragElement,
            index: newIndex
          });
        });
        return {
          items: _toConsumableArray(multiDragElements),
          clones: [].concat(multiDragClones),
          oldIndicies: oldIndicies,
          newIndicies: newIndicies
        };
      },
      optionListeners: {
        multiDragKey: function multiDragKey(key) {
          key = key.toLowerCase();

          if (key === 'ctrl') {
            key = 'Control';
          } else if (key.length > 1) {
            key = key.charAt(0).toUpperCase() + key.substr(1);
          }

          return key;
        }
      }
    });
  }

  function insertMultiDragElements(clonesInserted, rootEl) {
    multiDragElements.forEach(function (multiDragElement, i) {
      var target = rootEl.children[multiDragElement.sortableIndex + (clonesInserted ? Number(i) : 0)];

      if (target) {
        rootEl.insertBefore(multiDragElement, target);
      } else {
        rootEl.appendChild(multiDragElement);
      }
    });
  }
  /**
   * Insert multi-drag clones
   * @param  {[Boolean]} elementsInserted  Whether the multi-drag elements are inserted
   * @param  {HTMLElement} rootEl
   */


  function insertMultiDragClones(elementsInserted, rootEl) {
    multiDragClones.forEach(function (clone, i) {
      var target = rootEl.children[clone.sortableIndex + (elementsInserted ? Number(i) : 0)];

      if (target) {
        rootEl.insertBefore(clone, target);
      } else {
        rootEl.appendChild(clone);
      }
    });
  }

  function removeMultiDragElements() {
    multiDragElements.forEach(function (multiDragElement) {
      if (multiDragElement === dragEl$1) return;
      multiDragElement.parentNode && multiDragElement.parentNode.removeChild(multiDragElement);
    });
  }

  Sortable.mount(new AutoScrollPlugin());
  Sortable.mount(Remove, Revert);

  Sortable.mount(new SwapPlugin());
  Sortable.mount(new MultiDragPlugin());

  // The programming goals of Split.js are to deliver readable, understandable and
  // maintainable code, while at the same time manually optimizing for tiny minified file size,
  // browser compatibility without additional requirements
  // and very few assumptions about the user's page layout.
  const global = typeof window !== 'undefined' ? window : null;
  const ssr = global === null;
  const document$1 = !ssr ? global.document : undefined;

  // Save a couple long function names that are used frequently.
  // This optimization saves around 400 bytes.
  const addEventListener = 'addEventListener';
  const removeEventListener = 'removeEventListener';
  const getBoundingClientRect = 'getBoundingClientRect';
  const gutterStartDragging = '_a';
  const aGutterSize = '_b';
  const bGutterSize = '_c';
  const HORIZONTAL = 'horizontal';
  const NOOP = () => false;

  // Helper function determines which prefixes of CSS calc we need.
  // We only need to do this once on startup, when this anonymous function is called.
  //
  // Tests -webkit, -moz and -o prefixes. Modified from StackOverflow:
  // http://stackoverflow.com/questions/16625140/js-feature-detection-to-detect-the-usage-of-webkit-calc-over-calc/16625167#16625167
  const calc = ssr
      ? 'calc'
      : `${['', '-webkit-', '-moz-', '-o-']
          .filter(prefix => {
              const el = document$1.createElement('div');
              el.style.cssText = `width:${prefix}calc(9px)`;

              return !!el.style.length
          })
          .shift()}calc`;

  // Helper function checks if its argument is a string-like type
  const isString = v => typeof v === 'string' || v instanceof String;

  // Helper function allows elements and string selectors to be used
  // interchangeably. In either case an element is returned. This allows us to
  // do `Split([elem1, elem2])` as well as `Split(['#id1', '#id2'])`.
  const elementOrSelector = el => {
      if (isString(el)) {
          const ele = document$1.querySelector(el);
          if (!ele) {
              throw new Error(`Selector ${el} did not match a DOM element`)
          }
          return ele
      }

      return el
  };

  // Helper function gets a property from the properties object, with a default fallback
  const getOption = (options, propName, def) => {
      const value = options[propName];
      if (value !== undefined) {
          return value
      }
      return def
  };

  const getGutterSize = (gutterSize, isFirst, isLast, gutterAlign) => {
      if (isFirst) {
          if (gutterAlign === 'end') {
              return 0
          }
          if (gutterAlign === 'center') {
              return gutterSize / 2
          }
      } else if (isLast) {
          if (gutterAlign === 'start') {
              return 0
          }
          if (gutterAlign === 'center') {
              return gutterSize / 2
          }
      }

      return gutterSize
  };

  // Default options
  const defaultGutterFn = (i, gutterDirection) => {
      const gut = document$1.createElement('div');
      gut.className = `gutter gutter-${gutterDirection}`;
      return gut
  };

  const defaultElementStyleFn = (dim, size, gutSize) => {
      const style = {};

      if (!isString(size)) {
          style[dim] = `${calc}(${size}% - ${gutSize}px)`;
      } else {
          style[dim] = size;
      }

      return style
  };

  const defaultGutterStyleFn = (dim, gutSize) => ({ [dim]: `${gutSize}px` });

  // The main function to initialize a split. Split.js thinks about each pair
  // of elements as an independant pair. Dragging the gutter between two elements
  // only changes the dimensions of elements in that pair. This is key to understanding
  // how the following functions operate, since each function is bound to a pair.
  //
  // A pair object is shaped like this:
  //
  // {
  //     a: DOM element,
  //     b: DOM element,
  //     aMin: Number,
  //     bMin: Number,
  //     dragging: Boolean,
  //     parent: DOM element,
  //     direction: 'horizontal' | 'vertical'
  // }
  //
  // The basic sequence:
  //
  // 1. Set defaults to something sane. `options` doesn't have to be passed at all.
  // 2. Initialize a bunch of strings based on the direction we're splitting.
  //    A lot of the behavior in the rest of the library is paramatized down to
  //    rely on CSS strings and classes.
  // 3. Define the dragging helper functions, and a few helpers to go with them.
  // 4. Loop through the elements while pairing them off. Every pair gets an
  //    `pair` object and a gutter.
  // 5. Actually size the pair elements, insert gutters and attach event listeners.
  const Split = (idsOption, options = {}) => {
      if (ssr) return {}

      let ids = idsOption;
      let dimension;
      let clientAxis;
      let position;
      let positionEnd;
      let clientSize;
      let elements;

      // Allow HTMLCollection to be used as an argument when supported
      if (Array.from) {
          ids = Array.from(ids);
      }

      // All DOM elements in the split should have a common parent. We can grab
      // the first elements parent and hope users read the docs because the
      // behavior will be whacky otherwise.
      const firstElement = elementOrSelector(ids[0]);
      const parent = firstElement.parentNode;
      const parentStyle = getComputedStyle ? getComputedStyle(parent) : null;
      const parentFlexDirection = parentStyle ? parentStyle.flexDirection : null;

      // Set default options.sizes to equal percentages of the parent element.
      let sizes = getOption(options, 'sizes') || ids.map(() => 100 / ids.length);

      // Standardize minSize and maxSize to an array if it isn't already.
      // This allows minSize and maxSize to be passed as a number.
      const minSize = getOption(options, 'minSize', 100);
      const minSizes = Array.isArray(minSize) ? minSize : ids.map(() => minSize);
      const maxSize = getOption(options, 'maxSize', Infinity);
      const maxSizes = Array.isArray(maxSize) ? maxSize : ids.map(() => maxSize);

      // Get other options
      const expandToMin = getOption(options, 'expandToMin', false);
      const gutterSize = getOption(options, 'gutterSize', 10);
      const gutterAlign = getOption(options, 'gutterAlign', 'center');
      const snapOffset = getOption(options, 'snapOffset', 30);
      const snapOffsets = Array.isArray(snapOffset) ? snapOffset : ids.map(() => snapOffset);
      const dragInterval = getOption(options, 'dragInterval', 1);
      const direction = getOption(options, 'direction', HORIZONTAL);
      const cursor = getOption(
          options,
          'cursor',
          direction === HORIZONTAL ? 'col-resize' : 'row-resize',
      );
      const gutter = getOption(options, 'gutter', defaultGutterFn);
      const elementStyle = getOption(
          options,
          'elementStyle',
          defaultElementStyleFn,
      );
      const gutterStyle = getOption(options, 'gutterStyle', defaultGutterStyleFn);

      // 2. Initialize a bunch of strings based on the direction we're splitting.
      // A lot of the behavior in the rest of the library is paramatized down to
      // rely on CSS strings and classes.
      if (direction === HORIZONTAL) {
          dimension = 'width';
          clientAxis = 'clientX';
          position = 'left';
          positionEnd = 'right';
          clientSize = 'clientWidth';
      } else if (direction === 'vertical') {
          dimension = 'height';
          clientAxis = 'clientY';
          position = 'top';
          positionEnd = 'bottom';
          clientSize = 'clientHeight';
      }

      // 3. Define the dragging helper functions, and a few helpers to go with them.
      // Each helper is bound to a pair object that contains its metadata. This
      // also makes it easy to store references to listeners that that will be
      // added and removed.
      //
      // Even though there are no other functions contained in them, aliasing
      // this to self saves 50 bytes or so since it's used so frequently.
      //
      // The pair object saves metadata like dragging state, position and
      // event listener references.

      function setElementSize(el, size, gutSize, i) {
          // Split.js allows setting sizes via numbers (ideally), or if you must,
          // by string, like '300px'. This is less than ideal, because it breaks
          // the fluid layout that `calc(% - px)` provides. You're on your own if you do that,
          // make sure you calculate the gutter size by hand.
          const style = elementStyle(dimension, size, gutSize, i);

          Object.keys(style).forEach(prop => {
              // eslint-disable-next-line no-param-reassign
              el.style[prop] = style[prop];
          });
      }

      function setGutterSize(gutterElement, gutSize, i) {
          const style = gutterStyle(dimension, gutSize, i);

          Object.keys(style).forEach(prop => {
              // eslint-disable-next-line no-param-reassign
              gutterElement.style[prop] = style[prop];
          });
      }

      function getSizes() {
          return elements.map(element => element.size)
      }

      // Supports touch events, but not multitouch, so only the first
      // finger `touches[0]` is counted.
      function getMousePosition(e) {
          if ('touches' in e) return e.touches[0][clientAxis]
          return e[clientAxis]
      }

      // Actually adjust the size of elements `a` and `b` to `offset` while dragging.
      // calc is used to allow calc(percentage + gutterpx) on the whole split instance,
      // which allows the viewport to be resized without additional logic.
      // Element a's size is the same as offset. b's size is total size - a size.
      // Both sizes are calculated from the initial parent percentage,
      // then the gutter size is subtracted.
      function adjust(offset) {
          const a = elements[this.a];
          const b = elements[this.b];
          const percentage = a.size + b.size;

          a.size = (offset / this.size) * percentage;
          b.size = percentage - (offset / this.size) * percentage;

          setElementSize(a.element, a.size, this[aGutterSize], a.i);
          setElementSize(b.element, b.size, this[bGutterSize], b.i);
      }

      // drag, where all the magic happens. The logic is really quite simple:
      //
      // 1. Ignore if the pair is not dragging.
      // 2. Get the offset of the event.
      // 3. Snap offset to min if within snappable range (within min + snapOffset).
      // 4. Actually adjust each element in the pair to offset.
      //
      // ---------------------------------------------------------------------
      // |    | <- a.minSize               ||              b.minSize -> |    |
      // |    |  | <- this.snapOffset      ||     this.snapOffset -> |  |    |
      // |    |  |                         ||                        |  |    |
      // |    |  |                         ||                        |  |    |
      // ---------------------------------------------------------------------
      // | <- this.start                                        this.size -> |
      function drag(e) {
          let offset;
          const a = elements[this.a];
          const b = elements[this.b];

          if (!this.dragging) return

          // Get the offset of the event from the first side of the
          // pair `this.start`. Then offset by the initial position of the
          // mouse compared to the gutter size.
          offset =
              getMousePosition(e) -
              this.start +
              (this[aGutterSize] - this.dragOffset);

          if (dragInterval > 1) {
              offset = Math.round(offset / dragInterval) * dragInterval;
          }

          // If within snapOffset of min or max, set offset to min or max.
          // snapOffset buffers a.minSize and b.minSize, so logic is opposite for both.
          // Include the appropriate gutter sizes to prevent overflows.
          if (offset <= a.minSize + a.snapOffset + this[aGutterSize]) {
              offset = a.minSize + this[aGutterSize];
          } else if (
              offset >=
              this.size - (b.minSize + b.snapOffset + this[bGutterSize])
          ) {
              offset = this.size - (b.minSize + this[bGutterSize]);
          }

          if (offset >= a.maxSize - a.snapOffset + this[aGutterSize]) {
              offset = a.maxSize + this[aGutterSize];
          } else if (
              offset <=
              this.size - (b.maxSize - b.snapOffset + this[bGutterSize])
          ) {
              offset = this.size - (b.maxSize + this[bGutterSize]);
          }

          // Actually adjust the size.
          adjust.call(this, offset);

          // Call the drag callback continously. Don't do anything too intensive
          // in this callback.
          getOption(options, 'onDrag', NOOP)(getSizes());
      }

      // Cache some important sizes when drag starts, so we don't have to do that
      // continously:
      //
      // `size`: The total size of the pair. First + second + first gutter + second gutter.
      // `start`: The leading side of the first element.
      //
      // ------------------------------------------------
      // |      aGutterSize -> |||                      |
      // |                     |||                      |
      // |                     |||                      |
      // |                     ||| <- bGutterSize       |
      // ------------------------------------------------
      // | <- start                             size -> |
      function calculateSizes() {
          // Figure out the parent size minus padding.
          const a = elements[this.a].element;
          const b = elements[this.b].element;

          const aBounds = a[getBoundingClientRect]();
          const bBounds = b[getBoundingClientRect]();

          this.size =
              aBounds[dimension] +
              bBounds[dimension] +
              this[aGutterSize] +
              this[bGutterSize];
          this.start = aBounds[position];
          this.end = aBounds[positionEnd];
      }

      function innerSize(element) {
          // Return nothing if getComputedStyle is not supported (< IE9)
          // Or if parent element has no layout yet
          if (!getComputedStyle) return null

          const computedStyle = getComputedStyle(element);

          if (!computedStyle) return null

          let size = element[clientSize];

          if (size === 0) return null

          if (direction === HORIZONTAL) {
              size -=
                  parseFloat(computedStyle.paddingLeft) +
                  parseFloat(computedStyle.paddingRight);
          } else {
              size -=
                  parseFloat(computedStyle.paddingTop) +
                  parseFloat(computedStyle.paddingBottom);
          }

          return size
      }

      // When specifying percentage sizes that are less than the computed
      // size of the element minus the gutter, the lesser percentages must be increased
      // (and decreased from the other elements) to make space for the pixels
      // subtracted by the gutters.
      function trimToMin(sizesToTrim) {
          // Try to get inner size of parent element.
          // If it's no supported, return original sizes.
          const parentSize = innerSize(parent);
          if (parentSize === null) {
              return sizesToTrim
          }

          if (minSizes.reduce((a, b) => a + b, 0) > parentSize) {
              return sizesToTrim
          }

          // Keep track of the excess pixels, the amount of pixels over the desired percentage
          // Also keep track of the elements with pixels to spare, to decrease after if needed
          let excessPixels = 0;
          const toSpare = [];

          const pixelSizes = sizesToTrim.map((size, i) => {
              // Convert requested percentages to pixel sizes
              const pixelSize = (parentSize * size) / 100;
              const elementGutterSize = getGutterSize(
                  gutterSize,
                  i === 0,
                  i === sizesToTrim.length - 1,
                  gutterAlign,
              );
              const elementMinSize = minSizes[i] + elementGutterSize;

              // If element is too smal, increase excess pixels by the difference
              // and mark that it has no pixels to spare
              if (pixelSize < elementMinSize) {
                  excessPixels += elementMinSize - pixelSize;
                  toSpare.push(0);
                  return elementMinSize
              }

              // Otherwise, mark the pixels it has to spare and return it's original size
              toSpare.push(pixelSize - elementMinSize);
              return pixelSize
          });

          // If nothing was adjusted, return the original sizes
          if (excessPixels === 0) {
              return sizesToTrim
          }

          return pixelSizes.map((pixelSize, i) => {
              let newPixelSize = pixelSize;

              // While there's still pixels to take, and there's enough pixels to spare,
              // take as many as possible up to the total excess pixels
              if (excessPixels > 0 && toSpare[i] - excessPixels > 0) {
                  const takenPixels = Math.min(
                      excessPixels,
                      toSpare[i] - excessPixels,
                  );

                  // Subtract the amount taken for the next iteration
                  excessPixels -= takenPixels;
                  newPixelSize = pixelSize - takenPixels;
              }

              // Return the pixel size adjusted as a percentage
              return (newPixelSize / parentSize) * 100
          })
      }

      // stopDragging is very similar to startDragging in reverse.
      function stopDragging() {
          const self = this;
          const a = elements[self.a].element;
          const b = elements[self.b].element;

          if (self.dragging) {
              getOption(options, 'onDragEnd', NOOP)(getSizes());
          }

          self.dragging = false;

          // Remove the stored event listeners. This is why we store them.
          global[removeEventListener]('mouseup', self.stop);
          global[removeEventListener]('touchend', self.stop);
          global[removeEventListener]('touchcancel', self.stop);
          global[removeEventListener]('mousemove', self.move);
          global[removeEventListener]('touchmove', self.move);

          // Clear bound function references
          self.stop = null;
          self.move = null;

          a[removeEventListener]('selectstart', NOOP);
          a[removeEventListener]('dragstart', NOOP);
          b[removeEventListener]('selectstart', NOOP);
          b[removeEventListener]('dragstart', NOOP);

          a.style.userSelect = '';
          a.style.webkitUserSelect = '';
          a.style.MozUserSelect = '';
          a.style.pointerEvents = '';

          b.style.userSelect = '';
          b.style.webkitUserSelect = '';
          b.style.MozUserSelect = '';
          b.style.pointerEvents = '';

          self.gutter.style.cursor = '';
          self.parent.style.cursor = '';
          document$1.body.style.cursor = '';
      }

      // startDragging calls `calculateSizes` to store the inital size in the pair object.
      // It also adds event listeners for mouse/touch events,
      // and prevents selection while dragging so avoid the selecting text.
      function startDragging(e) {
          // Right-clicking can't start dragging.
          if ('button' in e && e.button !== 0) {
              return
          }

          // Alias frequently used variables to save space. 200 bytes.
          const self = this;
          const a = elements[self.a].element;
          const b = elements[self.b].element;

          // Call the onDragStart callback.
          if (!self.dragging) {
              getOption(options, 'onDragStart', NOOP)(getSizes());
          }

          // Don't actually drag the element. We emulate that in the drag function.
          e.preventDefault();

          // Set the dragging property of the pair object.
          self.dragging = true;

          // Create two event listeners bound to the same pair object and store
          // them in the pair object.
          self.move = drag.bind(self);
          self.stop = stopDragging.bind(self);

          // All the binding. `window` gets the stop events in case we drag out of the elements.
          global[addEventListener]('mouseup', self.stop);
          global[addEventListener]('touchend', self.stop);
          global[addEventListener]('touchcancel', self.stop);
          global[addEventListener]('mousemove', self.move);
          global[addEventListener]('touchmove', self.move);

          // Disable selection. Disable!
          a[addEventListener]('selectstart', NOOP);
          a[addEventListener]('dragstart', NOOP);
          b[addEventListener]('selectstart', NOOP);
          b[addEventListener]('dragstart', NOOP);

          a.style.userSelect = 'none';
          a.style.webkitUserSelect = 'none';
          a.style.MozUserSelect = 'none';
          a.style.pointerEvents = 'none';

          b.style.userSelect = 'none';
          b.style.webkitUserSelect = 'none';
          b.style.MozUserSelect = 'none';
          b.style.pointerEvents = 'none';

          // Set the cursor at multiple levels
          self.gutter.style.cursor = cursor;
          self.parent.style.cursor = cursor;
          document$1.body.style.cursor = cursor;

          // Cache the initial sizes of the pair.
          calculateSizes.call(self);

          // Determine the position of the mouse compared to the gutter
          self.dragOffset = getMousePosition(e) - self.end;
      }

      // adjust sizes to ensure percentage is within min size and gutter.
      sizes = trimToMin(sizes);

      // 5. Create pair and element objects. Each pair has an index reference to
      // elements `a` and `b` of the pair (first and second elements).
      // Loop through the elements while pairing them off. Every pair gets a
      // `pair` object and a gutter.
      //
      // Basic logic:
      //
      // - Starting with the second element `i > 0`, create `pair` objects with
      //   `a = i - 1` and `b = i`
      // - Set gutter sizes based on the _pair_ being first/last. The first and last
      //   pair have gutterSize / 2, since they only have one half gutter, and not two.
      // - Create gutter elements and add event listeners.
      // - Set the size of the elements, minus the gutter sizes.
      //
      // -----------------------------------------------------------------------
      // |     i=0     |         i=1         |        i=2       |      i=3     |
      // |             |                     |                  |              |
      // |           pair 0                pair 1             pair 2           |
      // |             |                     |                  |              |
      // -----------------------------------------------------------------------
      const pairs = [];
      elements = ids.map((id, i) => {
          // Create the element object.
          const element = {
              element: elementOrSelector(id),
              size: sizes[i],
              minSize: minSizes[i],
              maxSize: maxSizes[i],
              snapOffset: snapOffsets[i],
              i,
          };

          let pair;

          if (i > 0) {
              // Create the pair object with its metadata.
              pair = {
                  a: i - 1,
                  b: i,
                  dragging: false,
                  direction,
                  parent,
              };

              pair[aGutterSize] = getGutterSize(
                  gutterSize,
                  i - 1 === 0,
                  false,
                  gutterAlign,
              );
              pair[bGutterSize] = getGutterSize(
                  gutterSize,
                  false,
                  i === ids.length - 1,
                  gutterAlign,
              );

              // if the parent has a reverse flex-direction, switch the pair elements.
              if (
                  parentFlexDirection === 'row-reverse' ||
                  parentFlexDirection === 'column-reverse'
              ) {
                  const temp = pair.a;
                  pair.a = pair.b;
                  pair.b = temp;
              }
          }

          // Determine the size of the current element. IE8 is supported by
          // staticly assigning sizes without draggable gutters. Assigns a string
          // to `size`.
          //
          // Create gutter elements for each pair.
          if (i > 0) {
              const gutterElement = gutter(i, direction, element.element);
              setGutterSize(gutterElement, gutterSize, i);

              // Save bound event listener for removal later
              pair[gutterStartDragging] = startDragging.bind(pair);

              // Attach bound event listener
              gutterElement[addEventListener](
                  'mousedown',
                  pair[gutterStartDragging],
              );
              gutterElement[addEventListener](
                  'touchstart',
                  pair[gutterStartDragging],
              );

              parent.insertBefore(gutterElement, element.element);

              pair.gutter = gutterElement;
          }

          setElementSize(
              element.element,
              element.size,
              getGutterSize(
                  gutterSize,
                  i === 0,
                  i === ids.length - 1,
                  gutterAlign,
              ),
              i,
          );

          // After the first iteration, and we have a pair object, append it to the
          // list of pairs.
          if (i > 0) {
              pairs.push(pair);
          }

          return element
      });

      function adjustToMin(element) {
          const isLast = element.i === pairs.length;
          const pair = isLast ? pairs[element.i - 1] : pairs[element.i];

          calculateSizes.call(pair);

          const size = isLast
              ? pair.size - element.minSize - pair[bGutterSize]
              : element.minSize + pair[aGutterSize];

          adjust.call(pair, size);
      }

      elements.forEach(element => {
          const computedSize = element.element[getBoundingClientRect]()[dimension];

          if (computedSize < element.minSize) {
              if (expandToMin) {
                  adjustToMin(element);
              } else {
                  // eslint-disable-next-line no-param-reassign
                  element.minSize = computedSize;
              }
          }
      });

      function setSizes(newSizes) {
          const trimmed = trimToMin(newSizes);
          trimmed.forEach((newSize, i) => {
              if (i > 0) {
                  const pair = pairs[i - 1];

                  const a = elements[pair.a];
                  const b = elements[pair.b];

                  a.size = trimmed[i - 1];
                  b.size = newSize;

                  setElementSize(a.element, a.size, pair[aGutterSize], a.i);
                  setElementSize(b.element, b.size, pair[bGutterSize], b.i);
              }
          });
      }

      function destroy(preserveStyles, preserveGutter) {
          pairs.forEach(pair => {
              if (preserveGutter !== true) {
                  pair.parent.removeChild(pair.gutter);
              } else {
                  pair.gutter[removeEventListener](
                      'mousedown',
                      pair[gutterStartDragging],
                  );
                  pair.gutter[removeEventListener](
                      'touchstart',
                      pair[gutterStartDragging],
                  );
              }

              if (preserveStyles !== true) {
                  const style = elementStyle(
                      dimension,
                      pair.a.size,
                      pair[aGutterSize],
                  );

                  Object.keys(style).forEach(prop => {
                      elements[pair.a].element.style[prop] = '';
                      elements[pair.b].element.style[prop] = '';
                  });
              }
          });
      }

      return {
          setSizes,
          getSizes,
          collapse(i) {
              adjustToMin(elements[i]);
          },
          destroy,
          parent,
          pairs,
      }
  };

  let company_features = {
          variations: {
            allow: true,
          },
          languages: {
            allow: true,
          },
          writing_styles: {
            allow: true,
          },
          favourites: {
            allow: true,
          },
          pin: {
            allow: true,
          },
          import_export: {
            allow: true,
          },
          copy: {
            allow: true,
          },
          delete: {
            allow: true,
          },
          edit: {
              allow: true
          },
          public_prompts: {
            allow: true,
          },
          private_prompts: {
            allow: true,
          },
          search: {
            allow: true,
          },
          setting: {
            allow: true,
          },
          expanded_view: {
            allow: true,
          },
          collapsed_view: {
              allow: true,
            },
          variables:{
            allow:true
          },
          reload: {
              allow: true
          },
          add_prompt: {
              allow: true
          },

  };

  const svg = function (name) {
    name = Array.isArray(name) ? name[0] : name;
    switch (name) {
      case 'Logo-dark':
        return `<?xml version="1.0" encoding="utf-8"?>
      <!-- Generator: Adobe Illustrator 25.2.1, SVG Export Plug-In . SVG Version: 6.00 Build 0)  -->
      <svg version="1.1" class="logo-bg" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
         viewBox="0 0 940.4 196.4" style="enable-background:new 0 0 940.4 196.4;" xml:space="preserve">
      <style type="text/css">
        .st0{enable-background:new    ;}
        .st1{fill:#1E303A;}
        .st2{fill:none;stroke:#1E303A;stroke-width:2;stroke-miterlimit:10;}
        .st3{fill:#505D69;stroke:#505D69;stroke-width:4;stroke-miterlimit:10;}
        .st4{fill:#FFFFFF;}
      </style>
      <g class="st0">
        <path class="st1" d="M247.6,63.1L271,126l23.1-61l11.2,0.1l23.3,60.9l23.4-62.9h11.4l-29.1,76.6h-10.9l-23.6-62.3l-23.7,62.3h-10.9
          l-29-76.6H247.6z"/>
      </g>
      <g class="st0">
        <path class="st2" d="M247.6,63.1L271,126l23.1-61l11.2,0.1l23.3,60.9l23.4-62.9h11.4l-29.1,76.6h-10.9l-23.6-62.3l-23.7,62.3h-10.9
          l-29-76.6H247.6z"/>
      </g>
      <g class="st0">
        <path class="st1" d="M442.5,63.1c4.8,0,8.9,1.7,12.4,5.1c3.4,3.4,5.1,7.4,5.1,12.2v42c0,4.8-1.7,8.8-5.1,12.2
          c-3.4,3.4-7.6,5.1-12.4,5.1h-46.7c-4.8,0-8.9-1.7-12.3-5.1c-3.4-3.4-5.1-7.4-5.1-12.2v-42c0-4.8,1.7-8.8,5.1-12.2
          c3.4-3.4,7.5-5.1,12.3-5.1H442.5z M391.6,75.2c-1.7,1.8-2.6,4-2.6,6.6V121c0,2.7,0.9,4.9,2.6,6.6c1.7,1.7,4,2.6,6.6,2.6H440
          c2.7,0,4.9-0.9,6.7-2.6c1.8-1.8,2.7-3.9,2.7-6.5V81.8c0-2.6-0.9-4.8-2.7-6.6c-1.8-1.8-4-2.7-6.7-2.7h-41.7
          C395.6,72.6,393.4,73.4,391.6,75.2z"/>
      </g>
      <g class="st0">
        <path class="st2" d="M442.5,63.1c4.8,0,8.9,1.7,12.4,5.1c3.4,3.4,5.1,7.4,5.1,12.2v42c0,4.8-1.7,8.8-5.1,12.2
          c-3.4,3.4-7.6,5.1-12.4,5.1h-46.7c-4.8,0-8.9-1.7-12.3-5.1c-3.4-3.4-5.1-7.4-5.1-12.2v-42c0-4.8,1.7-8.8,5.1-12.2
          c3.4-3.4,7.5-5.1,12.3-5.1H442.5z M391.6,75.2c-1.7,1.8-2.6,4-2.6,6.6V121c0,2.7,0.9,4.9,2.6,6.6c1.7,1.7,4,2.6,6.6,2.6H440
          c2.7,0,4.9-0.9,6.7-2.6c1.8-1.8,2.7-3.9,2.7-6.5V81.8c0-2.6-0.9-4.8-2.7-6.6c-1.8-1.8-4-2.7-6.7-2.7h-41.7
          C395.6,72.6,393.4,73.4,391.6,75.2z"/>
      </g>
      <g class="st0">
        <path class="st1" d="M537.3,63.1c5.2,0,9.4,1.1,12.6,3.4c3.3,2.3,4.9,5.7,4.9,10.2v12.8c0,4.8-0.9,8-2.6,9.6
          c-1.7,1.6-4.5,2.4-8.2,2.4c3.7,0.9,6.5,2.5,8.2,4.6c1.7,2.1,2.6,5.5,2.6,10.2v23.3h-11.1v-25.1c0-4.5-3.1-6.7-9.3-6.7h-45.5v31.8
          h-10.7V63.1H537.3z M488.9,98.3h45.5c6.2,0,9.3-2.2,9.3-6.7V78.8c0-4.5-3.1-6.7-9.3-6.7h-45.5V98.3z"/>
      </g>
      <g class="st0">
        <path class="st2" d="M537.3,63.1c5.2,0,9.4,1.1,12.6,3.4c3.3,2.3,4.9,5.7,4.9,10.2v12.8c0,4.8-0.9,8-2.6,9.6
          c-1.7,1.6-4.5,2.4-8.2,2.4c3.7,0.9,6.5,2.5,8.2,4.6c1.7,2.1,2.6,5.5,2.6,10.2v23.3h-11.1v-25.1c0-4.5-3.1-6.7-9.3-6.7h-45.5v31.8
          h-10.7V63.1H537.3z M488.9,98.3h45.5c6.2,0,9.3-2.2,9.3-6.7V78.8c0-4.5-3.1-6.7-9.3-6.7h-45.5V98.3z"/>
      </g>
      <g class="st0">
        <path class="st1" d="M583.9,63.1v38.9l47.4-38.9h15.8l-44,36.3l44,40.2H631l-36.6-33.3l-10.5,8.7v24.6h-10.7V63.1H583.9z"/>
      </g>
      <g class="st0">
        <path class="st2" d="M583.9,63.1v38.9l47.4-38.9h15.8l-44,36.3l44,40.2H631l-36.6-33.3l-10.5,8.7v24.6h-10.7V63.1H583.9z"/>
      </g>
      <g class="st0">
        <path class="st1" d="M734.8,63.1v9.4h-54.7c-2.7,0-4.9,0.9-6.6,2.6c-1.7,1.7-2.6,3.9-2.6,6.6V121c0,2.7,0.9,4.9,2.6,6.6
          c1.7,1.7,4,2.6,6.6,2.6h40.1c2.7,0,4.9-0.9,6.7-2.6c1.8-1.8,2.7-3.9,2.7-6.5v-16.6h-21.2V95h31.9v27.5c0,4.8-1.7,8.8-5.1,12.2
          c-3.4,3.4-7.6,5-12.4,5h-45.1c-4.8,0-8.9-1.7-12.3-5c-3.4-3.4-5.1-7.4-5.1-12.2V80.4c0-4.8,1.7-8.8,5.1-12.2
          c3.4-3.4,7.5-5.1,12.3-5.1H734.8z"/>
      </g>
      <g class="st0">
        <path class="st1" d="M768.8,63.1h44.9c4.8,0,8.9,1.7,12.3,5.1c3.4,3.4,5.1,7.4,5.1,12.2v12.8c0,4.8-1.7,8.8-5.1,12.2s-7.5,5-12.3,5
          h-44.9v29.2h-10.6v-29.2V63.1H768.8z M768.8,101h42.4c2.7,0,4.9-0.9,6.7-2.6c1.8-1.7,2.7-3.9,2.7-6.5v-10c0-2.6-0.9-4.8-2.7-6.6
          c-1.8-1.8-4-2.7-6.7-2.7h-42.4V101z"/>
      </g>
      <g class="st0">
        <path class="st1" d="M922.4,63.1v9.4h-31.6v67.1h-10.7V72.6h-31.6v-9.4H922.4z"/>
      </g>
      <path class="st3" d="M22,2h152.4c11,0,20,9,20,20v152.4c0,11-9,20-20,20H22c-11,0-20-9-20-20V22C2,11,11,2,22,2z"/>
      <path class="st4" d="M118.8,131.2l-13.1-16.4L87.8,92.6l0,0l-32-40.1c-0.9-1.2-2.4-1.9-3.9-1.9l0,0H33.1c-2.8,0-5,2.2-5.1,4.9
        c0,1,0.3,1.9,0.8,2.7L70.4,143c1.2,2.5,4.2,3.5,6.7,2.3c0,0,0,0,0,0c0.6-0.3,1.2-0.8,1.7-1.3l12.8-15.6l-6.4-8l-9.2,11.2L41.2,60.6
        h8.3l40,50l12.3,15.4l0,0l14,17.5c0.5,0.7,1.2,1.3,2,1.7c2.5,1.2,5.5,0.1,6.7-2.4c0,0,0,0,0,0l42.7-84.7c0.4-0.8,0.6-1.6,0.6-2.5
        c0-2.8-2.2-5-5-5h-18l0,0c-1.5,0-2.9,0.7-3.9,1.8l-37,45.1l6.4,8l36.8-44.9h7.6L118.8,131.2L118.8,131.2z"/>
      </svg>
      `
      case 'Logo-light':
        return `<?xml version="1.0" encoding="utf-8"?>
      <!-- Generator: Adobe Illustrator 25.2.1, SVG Export Plug-In . SVG Version: 6.00 Build 0)  -->
      <svg class="logo-bg" version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
         viewBox="0 0 959.5 196.4" style="enable-background:new 0 0 959.5 196.4;" xml:space="preserve">
      <style type="text/css">
        .st0{enable-background:new    ;}
        .st1{fill:#FFFFFF;}
        .st2{fill:none;stroke:#FFFFFF;stroke-width:2;stroke-miterlimit:10;}
        .st3{fill:none;stroke:#FFFFFF;stroke-width:4;stroke-miterlimit:10;}
      </style>
      <g class="st0">
        <path class="st1" d="M260.2,63.1l23.3,62.9l23.1-61l11.2,0.1l23.3,60.9l23.4-62.9H376L347,139.7H336l-23.6-62.3l-23.7,62.3h-10.9
          l-29-76.6H260.2z"/>
      </g>
      <g class="st0">
        <path class="st2" d="M260.2,63.1l23.3,62.9l23.1-61l11.2,0.1l23.3,60.9l23.4-62.9H376L347,139.7H336l-23.6-62.3l-23.7,62.3h-10.9
          l-29-76.6H260.2z"/>
      </g>
      <g class="st0">
        <path class="st1" d="M455,63.1c4.8,0,8.9,1.7,12.4,5.1c3.4,3.4,5.1,7.4,5.1,12.2v42c0,4.8-1.7,8.8-5.1,12.2
          c-3.4,3.4-7.6,5.1-12.4,5.1h-46.7c-4.8,0-8.9-1.7-12.3-5.1c-3.4-3.4-5.1-7.4-5.1-12.2v-42c0-4.8,1.7-8.8,5.1-12.2
          c3.4-3.4,7.5-5.1,12.3-5.1H455z M404.2,75.2c-1.7,1.8-2.6,4-2.6,6.6V121c0,2.7,0.9,4.9,2.6,6.6c1.7,1.7,4,2.6,6.6,2.6h41.7
          c2.7,0,4.9-0.9,6.7-2.6c1.8-1.8,2.7-3.9,2.7-6.5V81.8c0-2.6-0.9-4.8-2.7-6.6c-1.8-1.8-4-2.7-6.7-2.7h-41.7
          C408.1,72.6,405.9,73.4,404.2,75.2z"/>
      </g>
      <g class="st0">
        <path class="st2" d="M455,63.1c4.8,0,8.9,1.7,12.4,5.1c3.4,3.4,5.1,7.4,5.1,12.2v42c0,4.8-1.7,8.8-5.1,12.2
          c-3.4,3.4-7.6,5.1-12.4,5.1h-46.7c-4.8,0-8.9-1.7-12.3-5.1c-3.4-3.4-5.1-7.4-5.1-12.2v-42c0-4.8,1.7-8.8,5.1-12.2
          c3.4-3.4,7.5-5.1,12.3-5.1H455z M404.2,75.2c-1.7,1.8-2.6,4-2.6,6.6V121c0,2.7,0.9,4.9,2.6,6.6c1.7,1.7,4,2.6,6.6,2.6h41.7
          c2.7,0,4.9-0.9,6.7-2.6c1.8-1.8,2.7-3.9,2.7-6.5V81.8c0-2.6-0.9-4.8-2.7-6.6c-1.8-1.8-4-2.7-6.7-2.7h-41.7
          C408.1,72.6,405.9,73.4,404.2,75.2z"/>
      </g>
      <g class="st0">
        <path class="st1" d="M549.8,63.1c5.2,0,9.4,1.1,12.6,3.4c3.3,2.3,4.9,5.7,4.9,10.2v12.8c0,4.8-0.9,8-2.6,9.6
          c-1.7,1.6-4.5,2.4-8.2,2.4c3.7,0.9,6.5,2.5,8.2,4.6c1.7,2.1,2.6,5.5,2.6,10.2v23.3h-11.1v-25.1c0-4.5-3.1-6.7-9.3-6.7h-45.5v31.8
          h-10.7V63.1H549.8z M501.4,98.3h45.5c6.2,0,9.3-2.2,9.3-6.7V78.8c0-4.5-3.1-6.7-9.3-6.7h-45.5V98.3z"/>
      </g>
      <g class="st0">
        <path class="st2" d="M549.8,63.1c5.2,0,9.4,1.1,12.6,3.4c3.3,2.3,4.9,5.7,4.9,10.2v12.8c0,4.8-0.9,8-2.6,9.6
          c-1.7,1.6-4.5,2.4-8.2,2.4c3.7,0.9,6.5,2.5,8.2,4.6c1.7,2.1,2.6,5.5,2.6,10.2v23.3h-11.1v-25.1c0-4.5-3.1-6.7-9.3-6.7h-45.5v31.8
          h-10.7V63.1H549.8z M501.4,98.3h45.5c6.2,0,9.3-2.2,9.3-6.7V78.8c0-4.5-3.1-6.7-9.3-6.7h-45.5V98.3z"/>
      </g>
      <g class="st0">
        <path class="st1" d="M596.4,63.1v38.9l47.4-38.9h15.8l-44,36.3l44,40.2h-16.1l-36.6-33.3l-10.5,8.7v24.6h-10.7V63.1H596.4z"/>
      </g>
      <g class="st0">
        <path class="st2" d="M596.4,63.1v38.9l47.4-38.9h15.8l-44,36.3l44,40.2h-16.1l-36.6-33.3l-10.5,8.7v24.6h-10.7V63.1H596.4z"/>
      </g>
      <g class="st0">
        <path class="st1" d="M753.9,63.1v9.4h-54.7c-2.7,0-4.9,0.9-6.6,2.6c-1.7,1.7-2.6,3.9-2.6,6.6V121c0,2.7,0.9,4.9,2.6,6.6
          c1.7,1.7,4,2.6,6.6,2.6h40.1c2.7,0,4.9-0.9,6.7-2.6c1.8-1.8,2.7-3.9,2.7-6.5v-16.6h-21.2V95h31.9v27.5c0,4.8-1.7,8.8-5.1,12.2
          c-3.4,3.4-7.6,5-12.4,5h-45.1c-4.8,0-8.9-1.7-12.3-5c-3.4-3.4-5.1-7.4-5.1-12.2V80.4c0-4.8,1.7-8.8,5.1-12.2
          c3.4-3.4,7.5-5.1,12.3-5.1H753.9z"/>
      </g>
      <g class="st0">
        <path class="st1" d="M787.9,63.1h44.9c4.8,0,8.9,1.7,12.3,5.1c3.4,3.4,5.1,7.4,5.1,12.2v12.8c0,4.8-1.7,8.8-5.1,12.2s-7.5,5-12.3,5
          h-44.9v29.2h-10.6v-29.2V63.1H787.9z M787.9,101h42.4c2.7,0,4.9-0.9,6.7-2.6c1.8-1.7,2.7-3.9,2.7-6.5v-10c0-2.6-0.9-4.8-2.7-6.6
          c-1.8-1.8-4-2.7-6.7-2.7h-42.4V101z"/>
      </g>
      <g class="st0">
        <path class="st1" d="M941.4,63.1v9.4h-31.6v67.1h-10.7V72.6h-31.6v-9.4H941.4z"/>
      </g>
      <path class="st3" d="M22,2h152.4c11,0,20,9,20,20v152.4c0,11-9,20-20,20H22c-11,0-20-9-20-20V22C2,11,11,2,22,2z"/>
      <path class="st1" d="M118.8,131.2l-13.1-16.3L87.8,92.6h0.1L55.8,52.5c-1-1.2-2.4-1.9-3.9-1.9l0,0H33.1c-2.8,0-5,2.2-5.1,4.9
        c0,1,0.3,1.9,0.8,2.7L70.4,143c1.2,2.5,4.2,3.5,6.7,2.3c0,0,0,0,0,0c0.6-0.3,1.2-0.8,1.7-1.3l12.8-15.6l-6.4-8L76,131.6L41.2,60.7
        h8.3l40,50l12.4,15.4l0,0l13.9,17.5c0.5,0.7,1.2,1.3,2,1.7c2.5,1.2,5.5,0.1,6.7-2.4c0,0,0,0,0,0l42.7-84.7c1.4-2.4,0.6-5.4-1.8-6.8
        c-0.8-0.4-1.7-0.7-2.6-0.7h-18l0,0c-1.5,0-2.9,0.7-3.9,1.8l-37,45.1l6.4,8L147,60.7h7.6l-36,70.6L118.8,131.2z"/>
      </svg>
      `
      case 'Rocket':
        return '<svg fill="#f1c40f" height="1rem" width="1rem" version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="-25.91 -25.91 310.92 310.92" xml:space="preserve"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_iconCarrier"> <g> <g> <g> <path d="M256.468,2.637c-1.907-1.907-4.575-2.855-7.25-2.593L228.027,2.14c-33.604,3.324-65.259,18.304-89.135,42.18 l-0.365,0.365l-5.298-2.038c-23.593-9.073-50.386-3.388-68.262,14.486l-54.008,54.008c-0.096,0.091-0.188,0.184-0.279,0.279 l-8.044,8.043c-3.515,3.515-3.515,9.213,0,12.728c3.516,3.515,9.213,3.515,12.729,0l4.051-4.051l32.714,12.582 c0.372,0.618,0.813,1.206,1.347,1.739l3.65,3.65l-10.583,10.583c-3.49,3.49-3.51,9.129-0.071,12.649 c-17.598,19.116-23.107,33.004-32.352,56.335c-1.229,3.099-2.53,6.384-3.942,9.889c-1.543,3.823-0.657,8.178,2.257,11.095 c1.965,1.966,4.584,3.011,7.255,3.011c1.291,0,2.595-0.244,3.842-0.746c3.509-1.414,6.793-2.715,9.892-3.943 c23.33-9.246,37.219-14.755,56.336-32.353c1.748,1.707,4.015,2.564,6.285,2.564c2.304,0,4.606-0.879,6.364-2.636l10.582-10.582 l3.649,3.649c0.525,0.524,1.112,0.968,1.738,1.344l12.583,32.718l-4.051,4.051c-3.515,3.515-3.515,9.213,0,12.728 c1.758,1.758,4.061,2.636,6.364,2.636c2.303,0,4.606-0.879,6.364-2.636l8.043-8.043c0.096-0.091,0.188-0.185,0.279-0.28 l54.01-54.009c17.874-17.875,23.56-44.669,14.485-68.261l-2.037-5.298l0.365-0.365c23.876-23.876,38.856-55.532,42.18-89.135 l2.096-21.191C259.325,7.204,258.374,4.543,256.468,2.637z M33.343,114.214l44.353-44.352 c12.291-12.291,30.45-16.558,46.85-11.196l-65.453,65.452L33.343,114.214z M33.537,225.569 c7.256-18.099,12.332-28.892,25.667-43.484l17.816,17.816C62.428,213.236,51.633,218.313,33.537,225.569z M96.044,193.469 L65.635,163.06l4.219-4.219l30.409,30.409L96.044,193.469z M123.005,186.536L72.568,136.1l59.424-59.423l50.436,50.436 L123.005,186.536z M189.242,181.409l-44.352,44.352l-9.904-25.751l65.451-65.451 C205.801,150.958,201.534,169.117,189.242,181.409z M239.052,29.306c-2.915,29.473-16.054,57.237-36.996,78.179l-6.9,6.9 L144.72,63.949l6.901-6.901c20.94-20.941,48.705-34.08,78.178-36.995l10.27-1.016L239.052,29.306z"></path> <path d="M195.926,40.017c-6.187,0-12.003,2.409-16.378,6.784c-9.03,9.03-9.03,23.725,0,32.755 c4.375,4.375,10.191,6.784,16.378,6.784s12.003-2.409,16.378-6.784c9.03-9.03,9.03-23.725,0-32.755 C207.929,42.426,202.113,40.017,195.926,40.017z M199.575,66.828c-0.975,0.975-2.271,1.512-3.649,1.512 c-1.378,0-2.675-0.537-3.649-1.512c-2.013-2.013-2.013-5.287,0-7.3c0.975-0.975,2.271-1.512,3.649-1.512 c1.378,0,2.675,0.537,3.649,1.512C201.588,61.541,201.588,64.816,199.575,66.828z"></path> </g> </g> </g> </g></svg>';
      case 'Export':
        return '<svg fill="#FFC300" height="1rem" width="1rem" version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 29.978 29.978" xml:space="preserve" stroke="#ffffff"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_iconCarrier"> <g> <path d="M25.462,19.105v6.848H4.515v-6.848H0.489v8.861c0,1.111,0.9,2.012,2.016,2.012h24.967c1.115,0,2.016-0.9,2.016-2.012 v-8.861H25.462z"></path> <path d="M14.62,18.426l-5.764-6.965c0,0-0.877-0.828,0.074-0.828s3.248,0,3.248,0s0-0.557,0-1.416c0-2.449,0-6.906,0-8.723 c0,0-0.129-0.494,0.615-0.494c0.75,0,4.035,0,4.572,0c0.536,0,0.524,0.416,0.524,0.416c0,1.762,0,6.373,0,8.742 c0,0.768,0,1.266,0,1.266s1.842,0,2.998,0c1.154,0,0.285,0.867,0.285,0.867s-4.904,6.51-5.588,7.193 C15.092,18.979,14.62,18.426,14.62,18.426z"></path> <g> </g> <g> </g> <g> </g> <g> </g> <g> </g> <g> </g> <g> </g> <g> </g> <g> </g> <g> </g> <g> </g> <g> </g> <g> </g> <g> </g> <g> </g> </g> </g></svg>';
      case 'PromptBubble':
        return `<img class="logo-bg" src="" />`;
      case 'Save':
        return `<svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" viewBox="0 0 24 24" fill="none">
      <path d="M16 8.98987V20.3499C16 21.7999 14.96 22.4099 13.69 21.7099L9.76001 19.5199C9.34001 19.2899 8.65999 19.2899 8.23999 19.5199L4.31 21.7099C3.04 22.4099 2 21.7999 2 20.3499V8.98987C2 7.27987 3.39999 5.87988 5.10999 5.87988H12.89C14.6 5.87988 16 7.27987 16 8.98987Z" stroke="#FFC300" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
      <path d="M22 5.10999V16.47C22 17.92 20.96 18.53 19.69 17.83L16 15.77V8.98999C16 7.27999 14.6 5.88 12.89 5.88H8V5.10999C8 3.39999 9.39999 2 11.11 2H18.89C20.6 2 22 3.39999 22 5.10999Z" stroke="#FFC300" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
      <path d="M7 12H11" stroke="#FFC300" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
      <path d="M9 14V10" stroke="#FFC300" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>`
      case 'Cross':
        return '<svg stroke="gray" fill="none" stroke-width="2" viewBox="0 0 24 24" stroke-linecap="round" stroke-linejoin="round" class="h-4 w-4" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>';
      case 'Cross-Round':
        return `<svg xmlns="http://www.w3.org/2000/svg" fill="gray" class="h-5 w-5" viewBox="0 0 32 32" version="1.1">
      <path d="M0 16q0 3.264 1.28 6.208t3.392 5.12 5.12 3.424 6.208 1.248 6.208-1.248 5.12-3.424 3.392-5.12 1.28-6.208-1.28-6.208-3.392-5.12-5.088-3.392-6.24-1.28q-3.264 0-6.208 1.28t-5.12 3.392-3.392 5.12-1.28 6.208zM4 16q0-3.264 1.6-6.016t4.384-4.352 6.016-1.632 6.016 1.632 4.384 4.352 1.6 6.016-1.6 6.048-4.384 4.352-6.016 1.6-6.016-1.6-4.384-4.352-1.6-6.048zM9.76 20.256q0 0.832 0.576 1.408t1.44 0.608 1.408-0.608l2.816-2.816 2.816 2.816q0.576 0.608 1.408 0.608t1.44-0.608 0.576-1.408-0.576-1.408l-2.848-2.848 2.848-2.816q0.576-0.576 0.576-1.408t-0.576-1.408-1.44-0.608-1.408 0.608l-2.816 2.816-2.816-2.816q-0.576-0.608-1.408-0.608t-1.44 0.608-0.576 1.408 0.576 1.408l2.848 2.816-2.848 2.848q-0.576 0.576-0.576 1.408z"/>
      </svg>`;
      case 'Cross_Round_h4':
        return `<svg xmlns="http://www.w3.org/2000/svg" fill="gray" class="h-4 w-4" viewBox="0 0 32 32" version="1.1">
      <path d="M0 16q0 3.264 1.28 6.208t3.392 5.12 5.12 3.424 6.208 1.248 6.208-1.248 5.12-3.424 3.392-5.12 1.28-6.208-1.28-6.208-3.392-5.12-5.088-3.392-6.24-1.28q-3.264 0-6.208 1.28t-5.12 3.392-3.392 5.12-1.28 6.208zM4 16q0-3.264 1.6-6.016t4.384-4.352 6.016-1.632 6.016 1.632 4.384 4.352 1.6 6.016-1.6 6.048-4.384 4.352-6.016 1.6-6.016-1.6-4.384-4.352-1.6-6.048zM9.76 20.256q0 0.832 0.576 1.408t1.44 0.608 1.408-0.608l2.816-2.816 2.816 2.816q0.576 0.608 1.408 0.608t1.44-0.608 0.576-1.408-0.576-1.408l-2.848-2.848 2.848-2.816q0.576-0.576 0.576-1.408t-0.576-1.408-1.44-0.608-1.408 0.608l-2.816 2.816-2.816-2.816q-0.576-0.608-1.408-0.608t-1.44 0.608-0.576 1.408 0.576 1.408l2.848 2.816-2.848 2.848q-0.576 0.576-0.576 1.408z"/>
      </svg>`;
      case 'trash':
        return `<svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" viewBox="0 0 24 24" fill="none">
      <path d="M5.16565 10.1534C5.07629 8.99181 5.99473 8 7.15975 8H16.8402C18.0053 8 18.9237 8.9918 18.8344 10.1534L18.142 19.1534C18.0619 20.1954 17.193 21 16.1479 21H7.85206C6.80699 21 5.93811 20.1954 5.85795 19.1534L5.16565 10.1534Z" stroke="gray" stroke-width="2"/>
      <path d="M19.5 5H4.5" stroke="gray" stroke-width="2" stroke-linecap="round"/>
      <path d="M10 3C10 2.44772 10.4477 2 11 2H13C13.5523 2 14 2.44772 14 3V5H10V3Z" stroke="gray" stroke-width="2"/>
      </svg>`
      case 'info':
        return `<svg xmlns="http://www.w3.org/2000/svg" fill="gray" class="h-5 w-5" viewBox="0 0 1920 1920">
          <path d="M960 0c530.193 0 960 429.807 960 960s-429.807 960-960 960S0 1490.193 0 960 429.807 0 960 0Zm0 101.053c-474.384 0-858.947 384.563-858.947 858.947S485.616 1818.947 960 1818.947 1818.947 1434.384 1818.947 960 1434.384 101.053 960 101.053Zm-42.074 626.795c-85.075 39.632-157.432 107.975-229.844 207.898-10.327 14.249-10.744 22.907-.135 30.565 7.458 5.384 11.792 3.662 22.656-7.928 1.453-1.562 1.453-1.562 2.94-3.174 9.391-10.17 16.956-18.8 33.115-37.565 53.392-62.005 79.472-87.526 120.003-110.867 35.075-20.198 65.9 9.485 60.03 47.471-1.647 10.664-4.483 18.534-11.791 35.432-2.907 6.722-4.133 9.646-5.496 13.23-13.173 34.63-24.269 63.518-47.519 123.85l-1.112 2.886c-7.03 18.242-7.03 18.242-14.053 36.48-30.45 79.138-48.927 127.666-67.991 178.988l-1.118 3.008a10180.575 10180.575 0 0 0-10.189 27.469c-21.844 59.238-34.337 97.729-43.838 138.668-1.484 6.37-1.484 6.37-2.988 12.845-5.353 23.158-8.218 38.081-9.82 53.42-2.77 26.522-.543 48.24 7.792 66.493 9.432 20.655 29.697 35.43 52.819 38.786 38.518 5.592 75.683 5.194 107.515-2.048 17.914-4.073 35.638-9.405 53.03-15.942 50.352-18.932 98.861-48.472 145.846-87.52 41.11-34.26 80.008-76 120.788-127.872 3.555-4.492 3.555-4.492 7.098-8.976 12.318-15.707 18.352-25.908 20.605-36.683 2.45-11.698-7.439-23.554-15.343-19.587-3.907 1.96-7.993 6.018-14.22 13.872-4.454 5.715-6.875 8.77-9.298 11.514-9.671 10.95-19.883 22.157-30.947 33.998-18.241 19.513-36.775 38.608-63.656 65.789-13.69 13.844-30.908 25.947-49.42 35.046-29.63 14.559-56.358-3.792-53.148-36.635 2.118-21.681 7.37-44.096 15.224-65.767 17.156-47.367 31.183-85.659 62.216-170.048 13.459-36.6 19.27-52.41 26.528-72.201 21.518-58.652 38.696-105.868 55.04-151.425 20.19-56.275 31.596-98.224 36.877-141.543 3.987-32.673-5.103-63.922-25.834-85.405-22.986-23.816-55.68-34.787-96.399-34.305-45.053.535-97.607 15.256-145.963 37.783Zm308.381-388.422c-80.963-31.5-178.114 22.616-194.382 108.33-11.795 62.124 11.412 115.76 58.78 138.225 93.898 44.531 206.587-26.823 206.592-130.826.005-57.855-24.705-97.718-70.99-115.729Z" fill-rule="evenodd"/>
        </svg>`;
      case 'CrossOrange':
        return '<svg stroke="#E06C2B" fill="none" stroke-width="2" viewBox="0 0 24 24" stroke-linecap="round" stroke-linejoin="round" class="h-4 w-4" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>';
      case 'Edit':
        return `<svg xmlns="http://www.w3.org/2000/svg" fill="gray" class="h-4 w-4" viewBox="0 0 32 32" version="1.1">
      <path d="M7.263 19.051l-1.656 5.797c-0.030 0.102-0.048 0.22-0.048 0.342 0 0.691 0.559 1.251 1.25 1.252h0c0.126-0 0.248-0.019 0.363-0.053l-0.009 0.002 5.622-1.656c0.206-0.063 0.383-0.17 0.527-0.311l-0 0 17.568-17.394c0.229-0.227 0.371-0.541 0.371-0.889 0-0.345-0.14-0.657-0.365-0.883l-4.141-4.142c-0.227-0.226-0.539-0.366-0.885-0.366s-0.658 0.14-0.885 0.366v0l-17.394 17.394c-0.146 0.146-0.256 0.329-0.316 0.532l-0.002 0.009zM25.859 3.768l2.369 2.369-2.369 2.346-2.37-2.345zM9.578 20.049l12.144-12.144 2.361 2.336-12.307 12.184-3.141 0.924zM30 12.75c-0.69 0-1.25 0.56-1.25 1.25v14.75h-25.5v-25.5h14.75c0.69 0 1.25-0.56 1.25-1.25s-0.56-1.25-1.25-1.25v0h-16c-0.69 0-1.25 0.56-1.25 1.25v0 28c0 0.69 0.56 1.25 1.25 1.25h28c0.69-0.001 1.249-0.56 1.25-1.25v-16c-0-0.69-0.56-1.25-1.25-1.25h-0z"/>
      </svg>`;
      case 'EditOrange':
        return '<svg stroke="#E06C2B" fill="none" stroke-width="2" viewBox="0 0 24 24" stroke-linecap="round" stroke-linejoin="round" class="h-4 w-4" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path></svg>';
      case 'ThumbUp':
        return '<svg stroke="#2ecc71" fill="none" stroke-width="2" viewBox="0 0 24 24" class="h-4 w-4" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path xmlns="http://www.w3.org/2000/svg" d="M4.42602 12.9469L10.1622 19.1217C11.1546 20.1899 12.8454 20.1899 13.8378 19.1217L19.574 12.9469C21.4753 10.9002 21.4753 7.58179 19.574 5.53505C17.6726 3.48832 14.5899 3.48832 12.6885 5.53505V5.53505C12.3168 5.93527 11.6832 5.93527 11.3115 5.53505V5.53505C9.4101 3.48832 6.32738 3.48832 4.42602 5.53505C2.52466 7.58178 2.52466 10.9002 4.42602 12.9469Z"  stroke-width="2"/></svg>';
      case 'ThumbDown':
        return '<svg stroke="#e74c3c" fill="none" stroke-width="2" viewBox="0 0 24 24" stroke-linecap="round" stroke-linejoin="round" class="h-4 w-4" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M10 15v4a3 3 0 0 0 3 3l4-9V2H5.72a2 2 0 0 0-2 1.7l-1.38 9a2 2 0 0 0 2 2.3zm7-13h2.67A2.31 2.31 0 0 1 22 4v7a2.31 2.31 0 0 1-2.33 2H17"></path></svg>';
      case 'Report':
        return '<svg stroke="#f39c12" fill="none" stroke-width="1.5" viewBox="0 0 24 24" stroke-linecap="round" stroke-linejoin="round" class="h-4 w-4" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path><line x1="12" y1="9" x2="12" y2="13"></line><line x1="12" y1="17" x2="12.01" y2="17"></line></svg>';
      case 'Plus':
        return '<svg stroke="#f39c12" fill="none" stroke-width="2" viewBox="0 0 24 24" stroke-linecap="round" stroke-linejoin="round" class="h-4 w-4" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>';
      case 'Globe':
        return '<svg fill="none" stroke="gray" stroke-width="1.5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" class="h-4 w-4" height="1em" width="1em"><path stroke-linecap="round" stroke-linejoin="round" d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 013 12c0-1.605.42-3.113 1.157-4.418"></path></svg>';
      case 'Lock':
        return '<svg fill="none" stroke="gray" stroke-width="1.5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" class="h-4 w-4" height="1em" width="1em"><path stroke-linecap="round" stroke-linejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z"></path></svg>';
      case 'Eye':
        return '<svg fill="none" stroke="#8e44ad" stroke-width="1.5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" class="h-4 w-4" height="1em" width="1em"><path stroke-linecap="round" stroke-linejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z"></path><path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>';
      case 'Quote':
        return '<svg stroke="#FFC300" fill="none" stroke-width="2" viewBox="0 0 24 24" stroke-linecap="round" stroke-linejoin="round" class="h-4 w-4" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path></svg>';
      case 'Link':
        return '<svg fill="none" stroke="gray" stroke-width="1.5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" class="h-4 w-4" height="1em" width="1em" stroke-linecap="round" stroke-linejoin="round" class="feather feather-share-2" ><circle cx="18" cy="5" r="3"></circle><circle cx="6" cy="12" r="3"></circle><circle cx="18" cy="19" r="3"></circle><line x1="8.59" y1="13.51" x2="15.42" y2="17.49"></line><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"></line></svg>';
      case 'Community':
        return '<svg fill="none" stroke="#e67e22" stroke-width="1.5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" class="h-4 w-4"><path stroke-linecap="round" stroke-linejoin="round" d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z"></path></svg>';
      case 'star-gray':
        return `<svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" viewBox="0 0 24 24" fill="none">
      <g id="Interface / Star">
      <path id="Vector" d="M2.33496 10.3368C2.02171 10.0471 2.19187 9.52339 2.61557 9.47316L8.61914 8.76107C8.79182 8.74059 8.94181 8.63215 9.01465 8.47425L11.5469 2.98446C11.7256 2.59703 12.2764 2.59695 12.4551 2.98439L14.9873 8.47413C15.0601 8.63204 15.2092 8.74077 15.3818 8.76124L21.3857 9.47316C21.8094 9.52339 21.9791 10.0472 21.6659 10.3369L17.2278 14.4419C17.1001 14.56 17.0433 14.7357 17.0771 14.9063L18.255 20.8359C18.3382 21.2544 17.8928 21.5787 17.5205 21.3703L12.2451 18.4166C12.0934 18.3317 11.9091 18.3321 11.7573 18.417L6.48144 21.3695C6.10913 21.5779 5.66294 21.2544 5.74609 20.8359L6.92414 14.9066C6.95803 14.7361 6.90134 14.5599 6.77367 14.4419L2.33496 10.3368Z" stroke="gray" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      </g>
      </svg>`;
      case 'star-yellow':
        return `<svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" viewBox="0 0 24 24" fill="none">
      <g id="Interface / Star">
      <path id="Vector" d="M2.33496 10.3368C2.02171 10.0471 2.19187 9.52339 2.61557 9.47316L8.61914 8.76107C8.79182 8.74059 8.94181 8.63215 9.01465 8.47425L11.5469 2.98446C11.7256 2.59703 12.2764 2.59695 12.4551 2.98439L14.9873 8.47413C15.0601 8.63204 15.2092 8.74077 15.3818 8.76124L21.3857 9.47316C21.8094 9.52339 21.9791 10.0472 21.6659 10.3369L17.2278 14.4419C17.1001 14.56 17.0433 14.7357 17.0771 14.9063L18.255 20.8359C18.3382 21.2544 17.8928 21.5787 17.5205 21.3703L12.2451 18.4166C12.0934 18.3317 11.9091 18.3321 11.7573 18.417L6.48144 21.3695C6.10913 21.5779 5.66294 21.2544 5.74609 20.8359L6.92414 14.9066C6.95803 14.7361 6.90134 14.5599 6.77367 14.4419L2.33496 10.3368Z" stroke="#FFC300" fill="#FFC300" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      </g>
      </svg>
      `;
      case 'grid':
        return `<svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" viewBox="0 -5 20 20" id="meteor-icon-kit__solid-grip-lines" fill="none"><path fill-rule="evenodd" clip-rule="evenodd" d="M0 8.5C0 7.6716 0.67157 7 1.5 7H18.5C19.3284 7 20 7.6716 20 8.5C20 9.3284 19.3284 10 18.5 10H1.5C0.67157 10 0 9.3284 0 8.5zM0 1.5C0 0.67157 0.67157 0 1.5 0H18.5C19.3284 0 20 0.67157 20 1.5C20 2.32843 19.3284 3 18.5 3H1.5C0.67157 3 0 2.32843 0 1.5z" fill="gray"/></svg>`;
      case 'grid-yellow':
        return `<svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" viewBox="0 -5 20 20" id="meteor-icon-kit__solid-grip-lines" fill="none"><path fill-rule="evenodd" clip-rule="evenodd" d="M0 8.5C0 7.6716 0.67157 7 1.5 7H18.5C19.3284 7 20 7.6716 20 8.5C20 9.3284 19.3284 10 18.5 10H1.5C0.67157 10 0 9.3284 0 8.5zM0 1.5C0 0.67157 0.67157 0 1.5 0H18.5C19.3284 0 20 0.67157 20 1.5C20 2.32843 19.3284 3 18.5 3H1.5C0.67157 3 0 2.32843 0 1.5z" fill="#FFC300"/></svg>`;
      case 'list':
        return `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" class="h-4 w-4" viewBox="0 0 24 24" version="1.1">
      <g id="页面-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
          <g id="Design" transform="translate(-528.000000, -192.000000)" fill-rule="nonzero">
              <g id="distribute_spacing_vertical_line" transform="translate(528.000000, 192.000000)">
                  <path d="M24,0 L24,24 L0,24 L0,0 L24,0 Z M12.5934901,23.257841 L12.5819402,23.2595131 L12.5108777,23.2950439 L12.4918791,23.2987469 L12.4918791,23.2987469 L12.4767152,23.2950439 L12.4056548,23.2595131 C12.3958229,23.2563662 12.3870493,23.2590235 12.3821421,23.2649074 L12.3780323,23.275831 L12.360941,23.7031097 L12.3658947,23.7234994 L12.3769048,23.7357139 L12.4804777,23.8096931 L12.4953491,23.8136134 L12.4953491,23.8136134 L12.5071152,23.8096931 L12.6106902,23.7357139 L12.6232938,23.7196733 L12.6232938,23.7196733 L12.6266527,23.7031097 L12.609561,23.275831 C12.6075724,23.2657013 12.6010112,23.2592993 12.5934901,23.257841 L12.5934901,23.257841 Z M12.8583906,23.1452862 L12.8445485,23.1473072 L12.6598443,23.2396597 L12.6498822,23.2499052 L12.6498822,23.2499052 L12.6471943,23.2611114 L12.6650943,23.6906389 L12.6699349,23.7034178 L12.6699349,23.7034178 L12.678386,23.7104931 L12.8793402,23.8032389 C12.8914285,23.8068999 12.9022333,23.8029875 12.9078286,23.7952264 L12.9118235,23.7811639 L12.8776777,23.1665331 C12.8752882,23.1545897 12.8674102,23.1470016 12.8583906,23.1452862 L12.8583906,23.1452862 Z M12.1430473,23.1473072 C12.1332178,23.1423925 12.1221763,23.1452606 12.1156365,23.1525954 L12.1099173,23.1665331 L12.0757714,23.7811639 C12.0751323,23.7926639 12.0828099,23.8018602 12.0926481,23.8045676 L12.108256,23.8032389 L12.3092106,23.7104931 L12.3186497,23.7024347 L12.3186497,23.7024347 L12.3225043,23.6906389 L12.340401,23.2611114 L12.337245,23.2485176 L12.337245,23.2485176 L12.3277531,23.2396597 L12.1430473,23.1473072 Z" id="MingCute" fill-rule="nonzero">
  
  </path>
                  <path d="M20,19 C20.5523,19 21,19.4477 21,20 C21,20.5523 20.5523,21 20,21 L4,21 C3.44772,21 3,20.5523 3,20 C3,19.4477 3.44772,19 4,19 L20,19 Z M17,8 C18.1046,8 19,8.89543 19,10 L19,14 C19,15.1046 18.1046,16 17,16 L7,16 C5.89543,16 5,15.1046 5,14 L5,10 C5,8.89543 5.89543,8 7,8 L17,8 Z M17,10 L7,10 L7,14 L17,14 L17,10 Z M20,3 C20.5523,3 21,3.44772 21,4 C21,4.51283143 20.613973,4.93550653 20.1166239,4.9932722 L20,5 L4,5 C3.44772,5 3,4.55228 3,4 C3,3.48716857 3.38604429,3.06449347 3.88337975,3.0067278 L4,3 L20,3 Z" id="形状" fill="gray">
  
  </path>
              </g>
          </g>
      </g>
  </svg>`;
      case 'list-yellow':
        return `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" class="h-4 w-4" viewBox="0 0 24 24" version="1.1">
      <g id="页面-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
          <g id="Design" transform="translate(-528.000000, -192.000000)" fill-rule="nonzero">
              <g id="distribute_spacing_vertical_line" transform="translate(528.000000, 192.000000)">
                  <path d="M24,0 L24,24 L0,24 L0,0 L24,0 Z M12.5934901,23.257841 L12.5819402,23.2595131 L12.5108777,23.2950439 L12.4918791,23.2987469 L12.4918791,23.2987469 L12.4767152,23.2950439 L12.4056548,23.2595131 C12.3958229,23.2563662 12.3870493,23.2590235 12.3821421,23.2649074 L12.3780323,23.275831 L12.360941,23.7031097 L12.3658947,23.7234994 L12.3769048,23.7357139 L12.4804777,23.8096931 L12.4953491,23.8136134 L12.4953491,23.8136134 L12.5071152,23.8096931 L12.6106902,23.7357139 L12.6232938,23.7196733 L12.6232938,23.7196733 L12.6266527,23.7031097 L12.609561,23.275831 C12.6075724,23.2657013 12.6010112,23.2592993 12.5934901,23.257841 L12.5934901,23.257841 Z M12.8583906,23.1452862 L12.8445485,23.1473072 L12.6598443,23.2396597 L12.6498822,23.2499052 L12.6498822,23.2499052 L12.6471943,23.2611114 L12.6650943,23.6906389 L12.6699349,23.7034178 L12.6699349,23.7034178 L12.678386,23.7104931 L12.8793402,23.8032389 C12.8914285,23.8068999 12.9022333,23.8029875 12.9078286,23.7952264 L12.9118235,23.7811639 L12.8776777,23.1665331 C12.8752882,23.1545897 12.8674102,23.1470016 12.8583906,23.1452862 L12.8583906,23.1452862 Z M12.1430473,23.1473072 C12.1332178,23.1423925 12.1221763,23.1452606 12.1156365,23.1525954 L12.1099173,23.1665331 L12.0757714,23.7811639 C12.0751323,23.7926639 12.0828099,23.8018602 12.0926481,23.8045676 L12.108256,23.8032389 L12.3092106,23.7104931 L12.3186497,23.7024347 L12.3186497,23.7024347 L12.3225043,23.6906389 L12.340401,23.2611114 L12.337245,23.2485176 L12.337245,23.2485176 L12.3277531,23.2396597 L12.1430473,23.1473072 Z" id="MingCute" fill-rule="nonzero">
  
  </path>
                  <path d="M20,19 C20.5523,19 21,19.4477 21,20 C21,20.5523 20.5523,21 20,21 L4,21 C3.44772,21 3,20.5523 3,20 C3,19.4477 3.44772,19 4,19 L20,19 Z M17,8 C18.1046,8 19,8.89543 19,10 L19,14 C19,15.1046 18.1046,16 17,16 L7,16 C5.89543,16 5,15.1046 5,14 L5,10 C5,8.89543 5.89543,8 7,8 L17,8 Z M17,10 L7,10 L7,14 L17,14 L17,10 Z M20,3 C20.5523,3 21,3.44772 21,4 C21,4.51283143 20.613973,4.93550653 20.1166239,4.9932722 L20,5 L4,5 C3.44772,5 3,4.55228 3,4 C3,3.48716857 3.38604429,3.06449347 3.88337975,3.0067278 L4,3 L20,3 Z" id="形状" fill="#FFC300">
  
  </path>
              </g>
          </g>
      </g>
  </svg>`;
      case 'next':
        return `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" fill="gray" class="h-4 w-4 " version="1.1" id="Layer_1" width="800px" height="800px" viewBox="0 0 8 8" enable-background="new 0 0 8 8" xml:space="preserve">
      <rect x="2.95" y="1.921" transform="matrix(-0.7071 -0.7071 0.7071 -0.7071 7.6689 8.4842)" width="5.283" height="1.466"/>
      <rect x="0.024" y="3.157" width="6.375" height="1.683"/>
      <rect x="2.956" y="4.615" transform="matrix(-0.7069 0.7073 -0.7073 -0.7069 13.3369 5.1684)" width="5.284" height="1.465"/>
      </svg>`  
      case 'previous':
        return `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" fill="gray" class="h-4 w-4 " version="1.1" id="Layer_1"  viewBox="0 0 8 8" enable-background="new 0 0 8 8" xml:space="preserve">
      <rect x="-0.226" y="4.614" transform="matrix(0.7071 0.7071 -0.7071 0.7071 4.4884 -0.1417)" width="5.283" height="1.466"/>
      <rect x="1.607" y="3.161" width="6.375" height="1.683"/>
      <rect x="-0.233" y="1.921" transform="matrix(0.7069 -0.7073 0.7073 0.7069 -1.1708 2.4817)" width="5.284" height="1.465"/>
      </svg>`   
      case 'setting':
        return `<svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 " viewBox="0 0 24 24" fill="none">
      <path fill-rule="evenodd" clip-rule="evenodd" d="M12 8.00002C9.79085 8.00002 7.99999 9.79088 7.99999 12C7.99999 14.2092 9.79085 16 12 16C14.2091 16 16 14.2092 16 12C16 9.79088 14.2091 8.00002 12 8.00002ZM9.99999 12C9.99999 10.8955 10.8954 10 12 10C13.1046 10 14 10.8955 14 12C14 13.1046 13.1046 14 12 14C10.8954 14 9.99999 13.1046 9.99999 12Z" fill="gray"/>
      <path fill-rule="evenodd" clip-rule="evenodd" d="M12 8.00002C9.79085 8.00002 7.99999 9.79088 7.99999 12C7.99999 14.2092 9.79085 16 12 16C14.2091 16 16 14.2092 16 12C16 9.79088 14.2091 8.00002 12 8.00002ZM9.99999 12C9.99999 10.8955 10.8954 10 12 10C13.1046 10 14 10.8955 14 12C14 13.1046 13.1046 14 12 14C10.8954 14 9.99999 13.1046 9.99999 12Z" fill="gray"/>
      <path fill-rule="evenodd" clip-rule="evenodd" d="M10.7673 1.01709C10.9925 0.999829 11.2454 0.99993 11.4516 1.00001L12.5484 1.00001C12.7546 0.99993 13.0075 0.999829 13.2327 1.01709C13.4989 1.03749 13.8678 1.08936 14.2634 1.26937C14.7635 1.49689 15.1915 1.85736 15.5007 2.31147C15.7454 2.67075 15.8592 3.0255 15.9246 3.2843C15.9799 3.50334 16.0228 3.75249 16.0577 3.9557L16.1993 4.77635L16.2021 4.77788C16.2369 4.79712 16.2715 4.81659 16.306 4.8363L16.3086 4.83774L17.2455 4.49865C17.4356 4.42978 17.6693 4.34509 17.8835 4.28543C18.1371 4.2148 18.4954 4.13889 18.9216 4.17026C19.4614 4.20998 19.9803 4.39497 20.4235 4.70563C20.7734 4.95095 21.0029 5.23636 21.1546 5.4515C21.2829 5.63326 21.4103 5.84671 21.514 6.02029L22.0158 6.86003C22.1256 7.04345 22.2594 7.26713 22.3627 7.47527C22.4843 7.7203 22.6328 8.07474 22.6777 8.52067C22.7341 9.08222 22.6311 9.64831 22.3803 10.1539C22.1811 10.5554 21.9171 10.8347 21.7169 11.0212C21.5469 11.1795 21.3428 11.3417 21.1755 11.4746L20.5 12L21.1755 12.5254C21.3428 12.6584 21.5469 12.8205 21.7169 12.9789C21.9171 13.1653 22.1811 13.4446 22.3802 13.8461C22.631 14.3517 22.7341 14.9178 22.6776 15.4794C22.6328 15.9253 22.4842 16.2797 22.3626 16.5248C22.2593 16.7329 22.1255 16.9566 22.0158 17.14L21.5138 17.9799C21.4102 18.1535 21.2828 18.3668 21.1546 18.5485C21.0028 18.7637 20.7734 19.0491 20.4234 19.2944C19.9803 19.6051 19.4613 19.7901 18.9216 19.8298C18.4954 19.8612 18.1371 19.7852 17.8835 19.7146C17.6692 19.6549 17.4355 19.5703 17.2454 19.5014L16.3085 19.1623L16.306 19.1638C16.2715 19.1835 16.2369 19.2029 16.2021 19.2222L16.1993 19.2237L16.0577 20.0443C16.0228 20.2475 15.9799 20.4967 15.9246 20.7157C15.8592 20.9745 15.7454 21.3293 15.5007 21.6886C15.1915 22.1427 14.7635 22.5032 14.2634 22.7307C13.8678 22.9107 13.4989 22.9626 13.2327 22.983C13.0074 23.0002 12.7546 23.0001 12.5484 23H11.4516C11.2454 23.0001 10.9925 23.0002 10.7673 22.983C10.5011 22.9626 10.1322 22.9107 9.73655 22.7307C9.23648 22.5032 8.80849 22.1427 8.49926 21.6886C8.25461 21.3293 8.14077 20.9745 8.07542 20.7157C8.02011 20.4967 7.97723 20.2475 7.94225 20.0443L7.80068 19.2237L7.79791 19.2222C7.7631 19.2029 7.72845 19.1835 7.69396 19.1637L7.69142 19.1623L6.75458 19.5014C6.5645 19.5702 6.33078 19.6549 6.11651 19.7146C5.86288 19.7852 5.50463 19.8611 5.07841 19.8298C4.53866 19.7901 4.01971 19.6051 3.57654 19.2944C3.2266 19.0491 2.99714 18.7637 2.84539 18.5485C2.71718 18.3668 2.58974 18.1534 2.4861 17.9798L1.98418 17.14C1.87447 16.9566 1.74067 16.7329 1.63737 16.5248C1.51575 16.2797 1.36719 15.9253 1.32235 15.4794C1.26588 14.9178 1.36897 14.3517 1.61976 13.8461C1.81892 13.4446 2.08289 13.1653 2.28308 12.9789C2.45312 12.8205 2.65717 12.6584 2.82449 12.5254L3.47844 12.0054V11.9947L2.82445 11.4746C2.65712 11.3417 2.45308 11.1795 2.28304 11.0212C2.08285 10.8347 1.81888 10.5554 1.61972 10.1539C1.36893 9.64832 1.26584 9.08224 1.3223 8.52069C1.36714 8.07476 1.51571 7.72032 1.63732 7.47528C1.74062 7.26715 1.87443 7.04347 1.98414 6.86005L2.48605 6.02026C2.58969 5.84669 2.71714 5.63326 2.84534 5.45151C2.9971 5.23637 3.22655 4.95096 3.5765 4.70565C4.01966 4.39498 4.53862 4.20999 5.07837 4.17027C5.50458 4.1389 5.86284 4.21481 6.11646 4.28544C6.33072 4.34511 6.56444 4.4298 6.75451 4.49867L7.69141 4.83775L7.69394 4.8363C7.72844 4.8166 7.7631 4.79712 7.79791 4.77788L7.80068 4.77635L7.94225 3.95571C7.97723 3.7525 8.02011 3.50334 8.07542 3.2843C8.14077 3.0255 8.25461 2.67075 8.49926 2.31147C8.80849 1.85736 9.23648 1.49689 9.73655 1.26937C10.1322 1.08936 10.5011 1.03749 10.7673 1.01709ZM14.0938 4.3363C14.011 3.85634 13.9696 3.61637 13.8476 3.43717C13.7445 3.2858 13.6019 3.16564 13.4352 3.0898C13.2378 3.00002 12.9943 3.00002 12.5073 3.00002H11.4927C11.0057 3.00002 10.7621 3.00002 10.5648 3.0898C10.3981 3.16564 10.2555 3.2858 10.1524 3.43717C10.0304 3.61637 9.98895 3.85634 9.90615 4.3363L9.75012 5.24064C9.69445 5.56333 9.66662 5.72467 9.60765 5.84869C9.54975 5.97047 9.50241 6.03703 9.40636 6.13166C9.30853 6.22804 9.12753 6.3281 8.76554 6.52822C8.73884 6.54298 8.71227 6.55791 8.68582 6.57302C8.33956 6.77078 8.16643 6.86966 8.03785 6.90314C7.91158 6.93602 7.83293 6.94279 7.70289 6.93196C7.57049 6.92094 7.42216 6.86726 7.12551 6.7599L6.11194 6.39308C5.66271 6.2305 5.43809 6.14921 5.22515 6.16488C5.04524 6.17811 4.87225 6.23978 4.72453 6.34333C4.5497 6.46589 4.42715 6.67094 4.18206 7.08103L3.72269 7.84965C3.46394 8.2826 3.33456 8.49907 3.31227 8.72078C3.29345 8.90796 3.32781 9.09665 3.41141 9.26519C3.51042 9.4648 3.7078 9.62177 4.10256 9.9357L4.82745 10.5122C5.07927 10.7124 5.20518 10.8126 5.28411 10.9199C5.36944 11.036 5.40583 11.1114 5.44354 11.2504C5.47844 11.379 5.47844 11.586 5.47844 12C5.47844 12.414 5.47844 12.621 5.44354 12.7497C5.40582 12.8887 5.36944 12.9641 5.28413 13.0801C5.20518 13.1875 5.07927 13.2876 4.82743 13.4879L4.10261 14.0643C3.70785 14.3783 3.51047 14.5352 3.41145 14.7349C3.32785 14.9034 3.29349 15.0921 3.31231 15.2793C3.33461 15.501 3.46398 15.7174 3.72273 16.1504L4.1821 16.919C4.4272 17.3291 4.54974 17.5342 4.72457 17.6567C4.8723 17.7603 5.04528 17.8219 5.2252 17.8352C5.43813 17.8508 5.66275 17.7695 6.11199 17.607L7.12553 17.2402C7.42216 17.1328 7.5705 17.0791 7.7029 17.0681C7.83294 17.0573 7.91159 17.064 8.03786 17.0969C8.16644 17.1304 8.33956 17.2293 8.68582 17.427C8.71228 17.4421 8.73885 17.4571 8.76554 17.4718C9.12753 17.6719 9.30853 17.772 9.40635 17.8684C9.50241 17.963 9.54975 18.0296 9.60765 18.1514C9.66662 18.2754 9.69445 18.4367 9.75012 18.7594L9.90615 19.6637C9.98895 20.1437 10.0304 20.3837 10.1524 20.5629C10.2555 20.7142 10.3981 20.8344 10.5648 20.9102C10.7621 21 11.0057 21 11.4927 21H12.5073C12.9943 21 13.2378 21 13.4352 20.9102C13.6019 20.8344 13.7445 20.7142 13.8476 20.5629C13.9696 20.3837 14.011 20.1437 14.0938 19.6637L14.2499 18.7594C14.3055 18.4367 14.3334 18.2754 14.3923 18.1514C14.4502 18.0296 14.4976 17.963 14.5936 17.8684C14.6915 17.772 14.8725 17.6719 15.2344 17.4718C15.2611 17.4571 15.2877 17.4421 15.3141 17.427C15.6604 17.2293 15.8335 17.1304 15.9621 17.0969C16.0884 17.064 16.167 17.0573 16.2971 17.0681C16.4295 17.0791 16.5778 17.1328 16.8744 17.2402L17.888 17.607C18.3372 17.7696 18.5619 17.8509 18.7748 17.8352C18.9547 17.8219 19.1277 17.7603 19.2754 17.6567C19.4502 17.5342 19.5728 17.3291 19.8179 16.919L20.2773 16.1504C20.536 15.7175 20.6654 15.501 20.6877 15.2793C20.7065 15.0921 20.6721 14.9034 20.5885 14.7349C20.4895 14.5353 20.2921 14.3783 19.8974 14.0643L19.1726 13.4879C18.9207 13.2876 18.7948 13.1875 18.7159 13.0801C18.6306 12.9641 18.5942 12.8887 18.5564 12.7497C18.5215 12.6211 18.5215 12.414 18.5215 12C18.5215 11.586 18.5215 11.379 18.5564 11.2504C18.5942 11.1114 18.6306 11.036 18.7159 10.9199C18.7948 10.8126 18.9207 10.7124 19.1725 10.5122L19.8974 9.9357C20.2922 9.62176 20.4896 9.46479 20.5886 9.26517C20.6722 9.09664 20.7065 8.90795 20.6877 8.72076C20.6654 8.49906 20.5361 8.28259 20.2773 7.84964L19.8179 7.08102C19.5728 6.67093 19.4503 6.46588 19.2755 6.34332C19.1277 6.23977 18.9548 6.1781 18.7748 6.16486C18.5619 6.14919 18.3373 6.23048 17.888 6.39307L16.8745 6.75989C16.5778 6.86725 16.4295 6.92093 16.2971 6.93195C16.167 6.94278 16.0884 6.93601 15.9621 6.90313C15.8335 6.86965 15.6604 6.77077 15.3142 6.57302C15.2877 6.55791 15.2611 6.54298 15.2345 6.52822C14.8725 6.3281 14.6915 6.22804 14.5936 6.13166C14.4976 6.03703 14.4502 5.97047 14.3923 5.84869C14.3334 5.72467 14.3055 5.56332 14.2499 5.24064L14.0938 4.3363Z" fill="gray"/>
      </svg>` 
      case 'add':
        return `<svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 "  viewBox="0 0 22 22" fill="none">
      <path d="M7 12L12 12M12 12L17 12M12 12V7M12 12L12 17" stroke="gray" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      <circle cx="12" cy="12" r="9" stroke="gray" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>`
      case 'add-5':
        return `<svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 "  viewBox="0 0 22 22" fill="none">
      <path d="M7 12L12 12M12 12L17 12M12 12V7M12 12L12 17" stroke="gray" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      <circle cx="12" cy="12" r="9" stroke="gray" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>`
      case 'add-white':
        return `<svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 "  viewBox="0 0 22 22" fill="none">
      <path d="M7 12L12 12M12 12L17 12M12 12V7M12 12L12 17" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      <circle cx="12" cy="12" r="9" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>`
      case 'add-go':
        return `<svg xmlns="http://www.w3.org/2000/svg" class="h-3 w-3 "  viewBox="0 0 22 22" fill="none">
      <path d="M7 12L12 12M12 12L17 12M12 12V7M12 12L12 17" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      <circle cx="12" cy="12" r="9" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>`
      case 'pin-yellow':
        return `<svg xmlns="http://www.w3.org/2000/svg" fill="#FFC300" class="h-4 w-4 " viewBox="0 0 16 16"><link xmlns="" type="text/css" rel="stylesheet" id="dark-mode-custom-link"/><link xmlns="" type="text/css" rel="stylesheet" id="dark-mode-general-link"/><style xmlns="" lang="en" type="text/css" id="dark-mode-custom-style"/><style xmlns="" lang="en" type="text/css" id="dark-mode-native-style"/><style xmlns="" lang="en" type="text/css" id="dark-mode-native-sheet"/>

      <g>
      
      <polygon points="13 8 11 6 11 3 12 3 12 1 4 1 4 3 5 3 5 6 3 8 3 10 7.3 10 7.3 16 8.7 16 8.7 10 13 10 13 8"/>
      
      </g>
      
      </svg>`
      case 'pin-gray':
        return `<svg xmlns="http://www.w3.org/2000/svg" transform="rotate(-45)" class="h-4 w-4 " viewBox="0 0 15 15" fill="none">
      <path d="M0.5 14.5L5 10M0.5 5.5L9.5 14.5M8.5 0.5L14.5 6.5M1.5 6.5L9.5 1.5M8.5 13.5L13.5 5.5" stroke="gray"/>
      </svg>`
      case 'fork':
        return `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" fill="gray" class="h-4 w-4 " viewBox="0 0 36 36" version="1.1" preserveAspectRatio="xMidYMid meet">
      <path d="M24,10V6a2,2,0,0,0-2-2H6A2,2,0,0,0,4,6V22a2,2,0,0,0,2,2h4V12a2,2,0,0,1,2-2Z" class="clr-i-solid clr-i-solid-path-1"/><path d="M30,12H14a2,2,0,0,0-2,2V30a2,2,0,0,0,2,2H30a2,2,0,0,0,2-2V14A2,2,0,0,0,30,12ZM28,23H23v5H21V23H16V21h5V16h2v5h5Z" class="clr-i-solid clr-i-solid-path-2"/>
      <rect x="0" y="0" width="36" height="36" fill-opacity="0"/>
  </svg>`
      case 'fork-yellow':
        return `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" fill="#FFC300" class="h-4 w-4 " viewBox="0 0 36 36" version="1.1" preserveAspectRatio="xMidYMid meet">
      <path d="M24,10V6a2,2,0,0,0-2-2H6A2,2,0,0,0,4,6V22a2,2,0,0,0,2,2h4V12a2,2,0,0,1,2-2Z" class="clr-i-solid clr-i-solid-path-1"/><path d="M30,12H14a2,2,0,0,0-2,2V30a2,2,0,0,0,2,2H30a2,2,0,0,0,2-2V14A2,2,0,0,0,30,12ZM28,23H23v5H21V23H16V21h5V16h2v5h5Z" class="clr-i-solid clr-i-solid-path-2"/>
      <rect x="0" y="0" width="36" height="36" fill-opacity="0"/>
  </svg>`
      case 'import':
        return `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="gray" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-arrow-down-square w-4 h-4 "><rect width="18" height="18" x="3" y="3" rx="2"/><path d="M12 8v8"/><path d="m8 12 4 4 4-4"/></svg>`
      case 'import-h5':
        return `<svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 " viewBox="0 0 24 24" fill="none">
      <path d="M12.44 14.75H3.75C3.34 14.75 3 14.41 3 14C3 13.59 3.34 13.25 3.75 13.25H12.44L10.72 11.53C10.43 11.24 10.43 10.76 10.72 10.47C11.01 10.18 11.49 10.18 11.78 10.47L14.78 13.47C14.85 13.54 14.9 13.62 14.94 13.71C15.02 13.89 15.02 14.1 14.94 14.28C14.9 14.37 14.85 14.45 14.78 14.52L11.78 17.52C11.63 17.67 11.44 17.74 11.25 17.74C11.06 17.74 10.87 17.67 10.72 17.52C10.43 17.23 10.43 16.75 10.72 16.46L12.44 14.74V14.75ZM21 9.5V18C21 19.52 19.77 20.75 18.25 20.75H10.75C9.23 20.75 8 19.52 8 18V17C8 16.59 8.34 16.25 8.75 16.25C9.16 16.25 9.5 16.59 9.5 17V18C9.5 18.69 10.06 19.25 10.75 19.25H18.25C18.94 19.25 19.5 18.69 19.5 18V10.25H14.75C14.34 10.25 14 9.91 14 9.5V4.75H10.75C10.06 4.75 9.5 5.31 9.5 6V11C9.5 11.41 9.16 11.75 8.75 11.75C8.34 11.75 8 11.41 8 11V6C8 4.48 9.23 3.25 10.75 3.25H14.75C14.95 3.25 15.14 3.33 15.28 3.47L20.78 8.97C20.92 9.11 21 9.3 21 9.5ZM15.5 8.75H18.44L15.5 5.81V8.75Z" fill="gray"/>
      </svg>`
      case 'import-yellow':
        return `<svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 "  viewBox="0 0 16 16">
      <path fill="#FFC300" fill-rule="evenodd" d="M14,9 C14.5523,9 15,9.44772 15,10 L15,13 C15,14.1046 14.1046,15 13,15 L3,15 C1.89543,15 1,14.1046 1,13 L1,10 C1,9.44772 1.44772,9 2,9 C2.55228,9 3,9.44771 3,10 L3,13 L13,13 L13,10 C13,9.44771 13.4477,9 14,9 Z M8,1 C8.55228,1 9,1.44772 9,2 L9,6.58579 L10.2929,5.29289 C10.6834,4.90237 11.3166,4.90237 11.7071,5.29289 C12.0976,5.68342 12.0976,6.31658 11.7071,6.70711 L8,10.4142 L4.29289,6.70711 C3.90237,6.31658 3.90237,5.68342 4.29289,5.29289 C4.68342,4.90237 5.31658,4.90237 5.70711,5.29289 L7,6.58579 L7,2 C7,1.44772 7.44772,1 8,1 Z"/>
    </svg>`
      case 'export':
     return  `<svg xmlns="http://www.w3.org/2000/svg" fill="gray" class="h-4 w-4 " viewBox="0 0 256 256" id="Flat">
   <path d="M71.51465,88.48535a12.0001,12.0001,0,0,1,16.9707-16.9707L116,99.0293V24a12,12,0,0,1,24,0V99.0293l27.51465-27.51465a12.0001,12.0001,0,0,1,16.9707,16.9707l-48,48c-.01855.01856-.03906.03369-.05762.05225q-.394.38892-.82128.7417c-.14112.11621-.29.21728-.43555.32617-.168.12549-.33252.25586-.50733.37305-.17138.11425-.34912.21386-.5249.31836-.16015.09619-.31738.19677-.48291.28564-.17822.09521-.36133.17578-.543.26172-.17334.08154-.34326.168-.521.2417-.17676.07324-.35742.13183-.53711.19629-.18946.06836-.377.14111-.57129.20019-.17969.0542-.36182.09375-.543.13965-.19824.04981-.394.10547-.59619.14551-.2085.041-.41944.06592-.62988.09619-.17676.02539-.35108.05908-.53077.07666C128.79,139.979,128.395,140,128,140s-.79-.021-1.18359-.05957c-.17969-.01758-.354-.05127-.53077-.07666-.21044-.03027-.42138-.05518-.62988-.09619-.20215-.04-.39795-.0957-.59619-.14551-.18115-.0459-.36328-.08545-.543-.13965-.19433-.05908-.38232-.13183-.57226-.20019-.1792-.06446-.35938-.12305-.53614-.19629-.17773-.07373-.34814-.16016-.52148-.24219-.18164-.08545-.36475-.166-.54248-.26123-.16553-.08887-.32276-.18945-.48291-.28564-.17578-.1045-.35352-.20411-.5249-.31836-.17481-.11719-.33936-.24756-.50733-.37305-.14551-.10889-.29443-.21-.43555-.32617q-.42846-.35157-.82128-.7417c-.01856-.01856-.03907-.03369-.05762-.05225ZM204,168a16,16,0,1,0-16,16A16.01833,16.01833,0,0,0,204,168Zm20-52H184.56836a12,12,0,1,0,0,24H220v56H36V140H71.43164a12,12,0,1,0,0-24H32a20.02229,20.02229,0,0,0-20,20v64a20.02229,20.02229,0,0,0,20,20H224a20.02229,20.02229,0,0,0,20-20V136A20.02229,20.02229,0,0,0,224,116Z"/>
 </svg>`
      case 'go-back':
        return `<svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 " viewBox="0 0 16 16">
      <path fill="gray" fill-rule="evenodd" d="M4.297105,3.29289 L0.59,7 L4.297105,10.7071 C4.687635,11.0976 5.320795,11.0976 5.711315,10.7071 C6.101845,10.3166 6.101845,9.68342 5.711315,9.29289 L4.418425,8 L11.504215,8 C12.332615,8 13.004215,8.67157 13.004215,9.5 C13.004215,10.3284 12.332615,11 11.504215,11 L10.004215,11 C9.451935,11 9.004215,11.4477 9.004215,12 C9.004215,12.5523 9.451935,13 10.004215,13 L11.504215,13 C13.437215,13 15.004215,11.433 15.004215,9.5 C15.004215,7.567 13.437215,6 11.504215,6 L4.418425,6 L5.711315,4.70711 C6.101845,4.31658 6.101845,3.68342 5.711315,3.29289 C5.320795,2.90237 4.687635,2.90237 4.297105,3.29289 Z"/>
    </svg>`
      case 'copy':
        return `<svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 " viewBox="0 0 24 24" fill="none">
      <g id="Edit / Copy">
      <path id="Vector" d="M9 9V6.2002C9 5.08009 9 4.51962 9.21799 4.0918C9.40973 3.71547 9.71547 3.40973 10.0918 3.21799C10.5196 3 11.0801 3 12.2002 3H17.8002C18.9203 3 19.4801 3 19.9079 3.21799C20.2842 3.40973 20.5905 3.71547 20.7822 4.0918C21.0002 4.51962 21.0002 5.07967 21.0002 6.19978V11.7998C21.0002 12.9199 21.0002 13.48 20.7822 13.9078C20.5905 14.2841 20.2839 14.5905 19.9076 14.7822C19.4802 15 18.921 15 17.8031 15H15M9 9H6.2002C5.08009 9 4.51962 9 4.0918 9.21799C3.71547 9.40973 3.40973 9.71547 3.21799 10.0918C3 10.5196 3 11.0801 3 12.2002V17.8002C3 18.9203 3 19.4801 3.21799 19.9079C3.40973 20.2842 3.71547 20.5905 4.0918 20.7822C4.5192 21 5.07899 21 6.19691 21H11.8036C12.9215 21 13.4805 21 13.9079 20.7822C14.2842 20.5905 14.5905 20.2839 14.7822 19.9076C15 19.4802 15 18.921 15 17.8031V15M9 9H11.8002C12.9203 9 13.4801 9 13.9079 9.21799C14.2842 9.40973 14.5905 9.71547 14.7822 10.0918C15 10.5192 15 11.079 15 12.1969L15 15" stroke="gray" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      </g>
      </svg>`
      case 'horizontal-menu':
        return `<svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 " viewBox="0 0 24 24" fill="none">
      <path fill-rule="evenodd" clip-rule="evenodd" d="M4 12C4 11.4477 4.44772 11 5 11C5.55228 11 6 11.4477 6 12C6 12.5523 5.55228 13 5 13C4.44772 13 4 12.5523 4 12ZM5 15C6.65685 15 8 13.6569 8 12C8 10.3431 6.65685 9 5 9C3.34315 9 2 10.3431 2 12C2 13.6569 3.34315 15 5 15ZM12 11C11.4477 11 11 11.4477 11 12C11 12.5523 11.4477 13 12 13C12.5523 13 13 12.5523 13 12C13 11.4477 12.5523 11 12 11ZM15 12C15 13.6569 13.6569 15 12 15C10.3431 15 9 13.6569 9 12C9 10.3431 10.3431 9 12 9C13.6569 9 15 10.3431 15 12ZM19 11C18.4477 11 18 11.4477 18 12C18 12.5523 18.4477 13 19 13C19.5523 13 20 12.5523 20 12C20 11.4477 19.5523 11 19 11ZM22 12C22 13.6569 20.6569 15 19 15C17.3431 15 16 13.6569 16 12C16 10.3431 17.3431 9 19 9C20.6569 9 22 10.3431 22 12Z" fill="gray"/>
      </svg>`
      case 'drag-hand':
        return `<svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 " fill="gray" width="800px" height="800px" viewBox="0 0 24 24"><script xmlns=""/>
      <path d="M6,7 L3.70710678,7 L3.85355339,7.14644661 C4.04881554,7.34170876 4.04881554,7.65829124 3.85355339,7.85355339 C3.65829124,8.04881554 3.34170876,8.04881554 3.14644661,7.85355339 L2.14644661,6.85355339 C1.95118446,6.65829124 1.95118446,6.34170876 2.14644661,6.14644661 L3.14644661,5.14644661 C3.34170876,4.95118446 3.65829124,4.95118446 3.85355339,5.14644661 C4.04881554,5.34170876 4.04881554,5.65829124 3.85355339,5.85355339 L3.70710678,6 L6,6 L6,3.70710678 L5.85355339,3.85355339 C5.65829124,4.04881554 5.34170876,4.04881554 5.14644661,3.85355339 C4.95118446,3.65829124 4.95118446,3.34170876 5.14644661,3.14644661 L6.14644661,2.14644661 C6.34170876,1.95118446 6.65829124,1.95118446 6.85355339,2.14644661 L7.85355339,3.14644661 C8.04881554,3.34170876 8.04881554,3.65829124 7.85355339,3.85355339 C7.65829124,4.04881554 7.34170876,4.04881554 7.14644661,3.85355339 L7,3.70710678 L7,6 L9.29289322,6 L9.14644661,5.85355339 C8.95118446,5.65829124 8.95118446,5.34170876 9.14644661,5.14644661 C9.34170876,4.95118446 9.65829124,4.95118446 9.85355339,5.14644661 L10.8535534,6.14644661 C11.0488155,6.34170876 11.0488155,6.65829124 10.8535534,6.85355339 L9.85355339,7.85355339 C9.65829124,8.04881554 9.34170876,8.04881554 9.14644661,7.85355339 C8.95118446,7.65829124 8.95118446,7.34170876 9.14644661,7.14644661 L9.29289322,7 L7,7 L7,9.29289322 L7.14644661,9.14644661 C7.34170876,8.95118446 7.65829124,8.95118446 7.85355339,9.14644661 C8.04881554,9.34170876 8.04881554,9.65829124 7.85355339,9.85355339 L6.85355339,10.8535534 C6.65829124,11.0488155 6.34170876,11.0488155 6.14644661,10.8535534 L5.14644661,9.85355339 C4.95118446,9.65829124 4.95118446,9.34170876 5.14644661,9.14644661 C5.34170876,8.95118446 5.65829124,8.95118446 5.85355339,9.14644661 L6,9.29289322 L6,7 Z M14,9.5 L14,12.0474376 C14,12.3783481 13.8839855,12.698786 13.6721417,12.9529985 C13.1720143,13.5531514 12.2800608,13.6342381 11.6799078,13.1341106 L10.7560738,12.3642489 C10.4736449,12.1288916 10.11764,12 9.75,12 C9.48363526,12 9.24082605,12.1526146 9.12532205,12.3926334 L9.08962348,12.4668155 C8.95447865,12.7476481 8.99541029,13.0814869 9.19439734,13.321352 L13.607865,18.6414804 C14.3217788,19.502054 15.3818498,20 16.5,20 C18.9852814,20 21,17.9852814 21,15.5 L21,11.5 C21,11.2238576 20.7761424,11 20.5,11 C20.2238576,11 20,11.2238576 20,11.5 L20,12.5 C20,12.7761424 19.7761424,13 19.5,13 C19.2238576,13 19,12.7761424 19,12.5 L19,10.5 C19,10.2238576 18.7761424,10 18.5,10 C18.2238576,10 18,10.2238576 18,10.5 L18,12.5 C18,12.7761424 17.7761424,13 17.5,13 C17.2238576,13 17,12.7761424 17,12.5 L17,9.5 C17,9.22385763 16.7761424,9 16.5,9 C16.2238576,9 16,9.22385763 16,9.5 L16,12.5 C16,12.7761424 15.7761424,13 15.5,13 C15.2238576,13 15,12.7761424 15,12.5 L15,5.5 C15,5.22385763 14.7761424,5 14.5,5 C14.2238576,5 14,5.22385763 14,5.5 L14,9.5 Z M13,9.49999997 L13,5.5 C13,4.67157288 13.6715729,4 14.5,4 C15.3284271,4 16,4.67157288 16,5.5 L16,8.08535285 C16.1563895,8.03007711 16.3246823,8 16.5,8 C17.191734,8 17.7741062,8.46823386 17.9474595,9.10504462 C18.1184541,9.03725677 18.3048761,9 18.5,9 C19.191734,9 19.7741062,9.46823386 19.9474595,10.1050446 C20.1184541,10.0372568 20.3048761,10 20.5,10 C21.3284271,10 22,10.6715729 22,11.5 L22,15.5 C22,18.5375661 19.5375661,21 16.5,21 C15.0842933,21 13.7421216,20.3695431 12.8382246,19.279958 L8.42475695,13.9598296 C7.97611908,13.4190278 7.88383427,12.6663521 8.18853292,12.0331845 L8.2242315,11.9590024 C8.50634865,11.3727595 9.09940726,11 9.75,11 C10.3515765,11 10.9341143,11.2109078 11.3962582,11.5960277 L12.3200922,12.3658894 C12.4959683,12.5124527 12.7573571,12.4886901 12.9039205,12.3128141 C12.9660017,12.2383166 13,12.1444116 13,12.0474376 L13,9.5 Z"/>
    </svg>`
      case `drag-lines`:
        return `<svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 drag-icon cursor-move " fill="gray" viewBox="0 0 48 48"><link xmlns="" type="text/css" rel="stylesheet" id="dark-mode-custom-link"/><link xmlns="" type="text/css" rel="stylesheet" id="dark-mode-general-link"/><style xmlns="" lang="en" type="text/css" id="dark-mode-custom-style"/><style xmlns="" lang="en" type="text/css" id="dark-mode-native-style"/><style xmlns="" lang="en" type="text/css" id="dark-mode-native-sheet"/>
      
      <g id="Layer_2" data-name="Layer 2">
        <g id="invisible_box" data-name="invisible box">
          <rect width="48" height="48" fill="none"/>
        </g>
        <g id="icons_Q2" data-name="icons Q2">
          <g>
            <path d="M46,20a2,2,0,0,1-2,2H4a2,2,0,0,1-2-2H2a2,2,0,0,1,2-2H44a2,2,0,0,1,2,2Z"/>
            <path d="M46,28a2,2,0,0,1-2,2H4a2,2,0,0,1-2-2H2a2,2,0,0,1,2-2H44a2,2,0,0,1,2,2Z"/>
          </g>
        </g>
      </g>
    </svg>`
      case `drag-prompt`:
        return `<svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 drag-icon-prompt cursor-grab " fill="gray" viewBox="0 0 48 48"><link xmlns="" type="text/css" rel="stylesheet" id="dark-mode-custom-link"/><link xmlns="" type="text/css" rel="stylesheet" id="dark-mode-general-link"/><style xmlns="" lang="en" type="text/css" id="dark-mode-custom-style"/><style xmlns="" lang="en" type="text/css" id="dark-mode-native-style"/><style xmlns="" lang="en" type="text/css" id="dark-mode-native-sheet"/>
      
      <g id="Layer_2" data-name="Layer 2">
        <g id="invisible_box" data-name="invisible box">
          <rect width="48" height="48" fill="none"/>
        </g>
        <g id="icons_Q2" data-name="icons Q2">
          <g>
            <path d="M46,20a2,2,0,0,1-2,2H4a2,2,0,0,1-2-2H2a2,2,0,0,1,2-2H44a2,2,0,0,1,2,2Z"/>
            <path d="M46,28a2,2,0,0,1-2,2H4a2,2,0,0,1-2-2H2a2,2,0,0,1,2-2H44a2,2,0,0,1,2,2Z"/>
          </g>
        </g>
      </g>
    </svg>`
  //     case `drag-prompt`:
  //       return `
      
  //     <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 drag-icon-prompt cursor-grab " viewBox="0 0 24 24" fill="none">
  // <path d="M5 10H19M14 19L12 21L10 19M14 5L12 3L10 5M5 14H19" stroke="gray" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
  // </svg>`
      case 'no-txt-logo-light':
        return `<svg id="Layer_1" style="width:5em; margin-left:25%;"  data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 198.6 198.6"><defs><style>.cls-1{fill:#505d69;stroke:#505d69;stroke-miterlimit:10;stroke-width:4px;}.cls-2{fill:#fff;}</style></defs><rect class="cls-1" x="3.35" y="3.11" width="192.39" height="192.39" rx="20"/><path class="cls-2" d="M120.14,132.35,107.07,116,89.16,93.72l0,0L57.14,53.6a5,5,0,0,0-3.91-1.88v0H34.45a5,5,0,0,0-4.3,7.67L71.79,144.1a5,5,0,0,0,6.71,2.3,5,5,0,0,0,1.67-1.32L93,129.5l-6.43-8-9.16,11.18L42.51,61.76h8.33l40,49.95,12.35,15.38,0,0,14,17.47a5,5,0,0,0,2,1.72,5,5,0,0,0,6.69-2.4l42.68-84.71a5,5,0,0,0,.64-2.46,5,5,0,0,0-5-5h-18v0a5,5,0,0,0-3.87,1.83l-37,45.11,6.42,8,36.8-44.88h7.65l-36,70.59Z"/></svg>`
      case 'no-txt-logo-dark':
        return `<svg id="Layer_1" style="width:5em; margin-left:25%;" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200.7 200.7"><defs><style>.cls-1{fill:none;stroke:#fff;stroke-miterlimit:10;stroke-width:4px;}.cls-2{fill:#fff;}</style></defs><rect class="cls-1" x="4.3" y="4.51" width="192.39" height="192.39" rx="20"/><path class="cls-2" d="M121.08,133.74,108,117.41,90.1,95.12l.05,0L58.09,55a5,5,0,0,0-3.92-1.88v0H35.39a5,5,0,0,0-4.29,7.67L72.73,145.5a5,5,0,0,0,6.71,2.3,4.85,4.85,0,0,0,1.67-1.32L93.89,130.9l-6.42-8L78.3,134.09,43.45,63.16h8.34l39.95,50,12.36,15.37,0,0L118,146a4.94,4.94,0,0,0,2,1.71,5,5,0,0,0,6.68-2.39l42.68-84.71a5,5,0,0,0-4.39-7.5h-18v0a5,5,0,0,0-3.87,1.83l-37,45.11,6.42,8,36.8-44.88h7.65l-36,70.59Z"/></svg>`
      case 'reload':
        return `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" fill="gray" class="h-4 w-4 " version="1.1" id="Capa_1" viewBox="0 0 489.533 489.533" xml:space="preserve"><link xmlns="" type="text/css" rel="stylesheet" id="dark-mode-custom-link"/><link xmlns="" type="text/css" rel="stylesheet" id="dark-mode-general-link"/><style xmlns="" lang="en" type="text/css" id="dark-mode-custom-style"/><style xmlns="" lang="en" type="text/css" id="dark-mode-native-style"/><style xmlns="" lang="en" type="text/css" id="dark-mode-native-sheet"/>
      <g>
        <path d="M268.175,488.161c98.2-11,176.9-89.5,188.1-187.7c14.7-128.4-85.1-237.7-210.2-239.1v-57.6c0-3.2-4-4.9-6.7-2.9   l-118.6,87.1c-2,1.5-2,4.4,0,5.9l118.6,87.1c2.7,2,6.7,0.2,6.7-2.9v-57.5c87.9,1.4,158.3,76.2,152.3,165.6   c-5.1,76.9-67.8,139.3-144.7,144.2c-81.5,5.2-150.8-53-163.2-130c-2.3-14.3-14.8-24.7-29.2-24.7c-17.9,0-31.9,15.9-29.1,33.6   C49.575,418.961,150.875,501.261,268.175,488.161z"/>
      </g>
      </svg>`
      case 'menu-vertical':
        return `<svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 " viewBox="0 0 24 24" fill="none">
      <path fill-rule="evenodd" clip-rule="evenodd" d="M12 4C11.4477 4 11 4.44772 11 5C11 5.55228 11.4477 6 12 6C12.5523 6 13 5.55228 13 5C13 4.44772 12.5523 4 12 4ZM15 5C15 6.65685 13.6569 8 12 8C10.3431 8 9 6.65685 9 5C9 3.34315 10.3431 2 12 2C13.6569 2 15 3.34315 15 5ZM12 11C11.4477 11 11 11.4477 11 12C11 12.5523 11.4477 13 12 13C12.5523 13 13 12.5523 13 12C13 11.4477 12.5523 11 12 11ZM15 12C15 13.6569 13.6569 15 12 15C10.3431 15 9 13.6569 9 12C9 10.3431 10.3431 9 12 9C13.6569 9 15 10.3431 15 12ZM11 19C11 18.4477 11.4477 18 12 18C12.5523 18 13 18.4477 13 19C13 19.5523 12.5523 20 12 20C11.4477 20 11 19.5523 11 19ZM12 22C13.6569 22 15 20.6569 15 19C15 17.3431 13.6569 16 12 16C10.3431 16 9 17.3431 9 19C9 20.6569 10.3431 22 12 22Z" fill="gray"/>
      </svg>`
      case 'document':
        return `<svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 " viewBox="0 0 24 24" fill="none">
      <path fill-rule="evenodd" clip-rule="evenodd" d="M9.29289 1.29289C9.48043 1.10536 9.73478 1 10 1H18C19.6569 1 21 2.34315 21 4V20C21 21.6569 19.6569 23 18 23H6C4.34315 23 3 21.6569 3 20V8C3 7.73478 3.10536 7.48043 3.29289 7.29289L9.29289 1.29289ZM18 3H11V8C11 8.55228 10.5523 9 10 9H5V20C5 20.5523 5.44772 21 6 21H18C18.5523 21 19 20.5523 19 20V4C19 3.44772 18.5523 3 18 3ZM6.41421 7H9V4.41421L6.41421 7ZM7 13C7 12.4477 7.44772 12 8 12H16C16.5523 12 17 12.4477 17 13C17 13.5523 16.5523 14 16 14H8C7.44772 14 7 13.5523 7 13ZM7 17C7 16.4477 7.44772 16 8 16H16C16.5523 16 17 16.4477 17 17C17 17.5523 16.5523 18 16 18H8C7.44772 18 7 17.5523 7 17Z" fill="gray"/>
      </svg>`
      case 'html-doc':
        return `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" fill="gray" class="h-4 w-4 " version="1.1" id="Capa_1" viewBox="0 0 511 511" xml:space="preserve">
      <g>
        <path d="M498.962,102.751c-0.018-0.182-0.049-0.359-0.08-0.537c-0.011-0.063-0.016-0.128-0.029-0.191   c-0.042-0.21-0.096-0.416-0.156-0.619c-0.009-0.03-0.014-0.061-0.023-0.091c-0.063-0.207-0.138-0.409-0.218-0.608   c-0.011-0.027-0.019-0.055-0.03-0.081c-0.078-0.189-0.168-0.372-0.261-0.552c-0.019-0.037-0.034-0.075-0.054-0.112   c-0.09-0.167-0.189-0.327-0.291-0.486c-0.031-0.048-0.057-0.098-0.088-0.145c-0.101-0.151-0.212-0.295-0.324-0.438   c-0.039-0.05-0.073-0.102-0.113-0.151c-0.156-0.189-0.32-0.372-0.493-0.545L400.804,2.198c-0.173-0.173-0.355-0.338-0.545-0.493   c-0.049-0.04-0.101-0.074-0.151-0.113c-0.143-0.112-0.287-0.223-0.438-0.324c-0.047-0.032-0.097-0.058-0.145-0.088   c-0.159-0.101-0.319-0.201-0.486-0.291c-0.036-0.02-0.075-0.035-0.112-0.054c-0.181-0.093-0.364-0.183-0.552-0.261   c-0.027-0.011-0.054-0.019-0.081-0.03c-0.199-0.08-0.401-0.155-0.608-0.218c-0.03-0.009-0.061-0.015-0.091-0.023   c-0.203-0.059-0.409-0.114-0.619-0.156c-0.063-0.013-0.128-0.018-0.191-0.029c-0.177-0.031-0.355-0.062-0.537-0.08   C396.001,0.013,395.751,0,395.5,0h-224C149.72,0,132,17.72,132,39.5V80H43.5C26.131,80,12,94.131,12,111.5v80   c0,17.369,14.131,31.5,31.5,31.5H132v248.5c0,21.78,17.72,39.5,39.5,39.5h288c21.78,0,39.5-17.72,39.5-39.5v-368   C499,103.249,498.987,102.999,498.962,102.751z M403,25.606L473.394,96H427.5C413.991,96,403,85.009,403,71.5V25.606z M27,191.5   v-80c0-9.098,7.402-16.5,16.5-16.5h304c9.098,0,16.5,7.402,16.5,16.5v80c0,9.098-7.402,16.5-16.5,16.5H139.519   c-0.007,0-0.013-0.001-0.019-0.001S139.487,208,139.481,208H43.5C34.402,208,27,200.598,27,191.5z M459.5,496h-288   c-13.509,0-24.5-10.991-24.5-24.5V223h200.5c17.369,0,31.5-14.131,31.5-31.5v-80c0-17.369-14.131-31.5-31.5-31.5H147V39.5   c0-13.509,10.991-24.5,24.5-24.5H388v56.5c0,21.78,17.72,39.5,39.5,39.5H484v360.5C484,485.009,473.009,496,459.5,496z"/>
        <path d="M115.5,112c-4.142,0-7.5,3.358-7.5,7.5V152H67v-32.5c0-4.142-3.358-7.5-7.5-7.5s-7.5,3.358-7.5,7.5v64   c0,4.142,3.358,7.5,7.5,7.5s7.5-3.358,7.5-7.5V167h41v16.5c0,4.142,3.358,7.5,7.5,7.5s7.5-3.358,7.5-7.5v-64   C123,115.358,119.642,112,115.5,112z"/>
        <path d="M211.5,191c4.142,0,7.5-3.358,7.5-7.5v-36.923l10.069,16.782c1.355,2.259,3.797,3.641,6.431,3.641h8   c2.634,0,5.076-1.382,6.431-3.641L260,146.577V183.5c0,4.142,3.358,7.5,7.5,7.5s7.5-3.358,7.5-7.5v-64   c0-3.371-2.249-6.328-5.498-7.228c-3.249-0.9-6.698,0.478-8.433,3.369L239.5,151.589l-21.569-35.948   c-1.734-2.891-5.186-4.267-8.433-3.369c-3.249,0.9-5.498,3.857-5.498,7.228v64C204,187.642,207.358,191,211.5,191z"/>
        <path d="M139.5,127H156v56.5c0,4.142,3.358,7.5,7.5,7.5s7.5-3.358,7.5-7.5V127h16.5c4.142,0,7.5-3.358,7.5-7.5s-3.358-7.5-7.5-7.5   h-48c-4.142,0-7.5,3.358-7.5,7.5S135.358,127,139.5,127z"/>
        <path d="M299.5,191h40c4.142,0,7.5-3.358,7.5-7.5s-3.358-7.5-7.5-7.5H307v-56.5c0-4.142-3.358-7.5-7.5-7.5s-7.5,3.358-7.5,7.5v64   C292,187.642,295.358,191,299.5,191z"/>
        <path d="M341.872,280.385c-3.929-1.309-8.177,0.814-9.487,4.744l-48,144c-1.31,3.929,0.814,8.177,4.744,9.487   c0.787,0.262,1.586,0.387,2.373,0.387c3.14,0,6.066-1.988,7.114-5.13l48-144C347.925,285.942,345.801,281.695,341.872,280.385z"/>
        <path d="M272.803,298.197c-2.929-2.929-7.678-2.929-10.606,0l-56,56c-2.929,2.929-2.929,7.678,0,10.606l56,56   c1.464,1.464,3.384,2.197,5.303,2.197s3.839-0.732,5.303-2.197c2.929-2.929,2.929-7.678,0-10.606L222.106,359.5l50.697-50.697   C275.732,305.875,275.732,301.125,272.803,298.197z"/>
        <path d="M368.803,298.197c-2.929-2.929-7.678-2.929-10.606,0c-2.929,2.929-2.929,7.678,0,10.606l50.697,50.697l-50.697,50.697   c-2.929,2.929-2.929,7.678,0,10.606c1.464,1.464,3.384,2.197,5.303,2.197s3.839-0.732,5.303-2.197l56-56   c2.929-2.929,2.929-7.678,0-10.606L368.803,298.197z"/>
      </g>
      </svg>
      `
      case 'save':
        return `<svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 " viewBox="0 0 24 24" fill="none">
      <path fill-rule="evenodd" clip-rule="evenodd" d="M6.85665 2.30447C8.2922 2.16896 10.3981 2 12 2C13.6019 2 15.7078 2.16896 17.1433 2.30447C18.4976 2.4323 19.549 3.51015 19.6498 4.85178C19.7924 6.74918 20 9.90785 20 12.2367C20 14.022 19.8781 16.2915 19.7575 18.1035C19.697 19.0119 19.6365 19.8097 19.5911 20.3806C19.5685 20.6661 19.5496 20.8949 19.5363 21.0526L19.5209 21.234L19.5154 21.2966L19.5153 21.2976C19.5153 21.2977 19.5153 21.2977 18.7441 21.2308L19.5153 21.2976C19.4927 21.5553 19.3412 21.7845 19.1122 21.9075C18.8831 22.0305 18.6072 22.0309 18.3779 21.9085L12.1221 18.5713C12.0458 18.5307 11.9542 18.5307 11.8779 18.5713L5.62213 21.9085C5.39277 22.0309 5.11687 22.0305 4.88784 21.9075C4.65881 21.7845 4.50732 21.5554 4.48466 21.2977L5.25591 21.2308C4.48466 21.2977 4.48467 21.2978 4.48466 21.2977L4.47913 21.234L4.46371 21.0526C4.45045 20.8949 4.43154 20.6661 4.40885 20.3806C4.3635 19.8097 4.30303 19.0119 4.24255 18.1035C4.12191 16.2915 4 14.022 4 12.2367C4 9.90785 4.20763 6.74918 4.3502 4.85178C4.45102 3.51015 5.50236 2.4323 6.85665 2.30447ZM5.93179 19.9971L11.1455 17.2159C11.6791 16.9312 12.3209 16.9312 12.8545 17.2159L18.0682 19.9971C18.1101 19.4598 18.1613 18.7707 18.2124 18.0019C18.3327 16.1962 18.4516 13.9687 18.4516 12.2367C18.4516 9.97099 18.2482 6.86326 18.1057 4.96632C18.0606 4.366 17.5938 3.89237 16.9969 3.83603C15.5651 3.70088 13.5225 3.53846 12 3.53846C10.4775 3.53846 8.43487 3.70088 7.00309 3.83603C6.40624 3.89237 5.9394 4.366 5.89429 4.96632C5.75175 6.86326 5.54839 9.97099 5.54839 12.2367C5.54839 13.9687 5.66734 16.1962 5.78756 18.0019C5.83874 18.7707 5.88993 19.4598 5.93179 19.9971Z" fill="gray"/>
      </svg>`
      case 'empty_checkbox':
        return `<svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 " viewBox="0 0 24 24" fill="none">
      <g id="Interface / Checkbox_Unchecked">
      <path id="Vector" d="M4 7.2002V16.8002C4 17.9203 4 18.4801 4.21799 18.9079C4.40973 19.2842 4.71547 19.5905 5.0918 19.7822C5.5192 20 6.07899 20 7.19691 20H16.8031C17.921 20 18.48 20 18.9074 19.7822C19.2837 19.5905 19.5905 19.2842 19.7822 18.9079C20 18.4805 20 17.9215 20 16.8036V7.19691C20 6.07899 20 5.5192 19.7822 5.0918C19.5905 4.71547 19.2837 4.40973 18.9074 4.21799C18.4796 4 17.9203 4 16.8002 4H7.2002C6.08009 4 5.51962 4 5.0918 4.21799C4.71547 4.40973 4.40973 4.71547 4.21799 5.0918C4 5.51962 4 6.08009 4 7.2002Z" stroke="gray" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      </g>
      </svg>`
      case 'checked_checkbox':
        return `<svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 " viewBox="0 0 24 24" fill="none">
      <path fill-rule="evenodd" clip-rule="evenodd" d="M7 2C4.23858 2 2 4.23858 2 7V17C2 19.7614 4.23858 22 7 22H17C19.7614 22 22 19.7614 22 17V7C22 4.23858 19.7614 2 17 2H7ZM15.7295 10.6839C16.1073 10.281 16.0869 9.6482 15.684 9.27047C15.281 8.89274 14.6482 8.91315 14.2705 9.31606L11.1865 12.6056L9.66437 11.2526C9.25159 10.8857 8.61952 10.9229 8.2526 11.3356C7.88568 11.7484 7.92286 12.3805 8.33565 12.7474L10.5856 14.7474C10.9907 15.1075 11.6089 15.0793 11.9795 14.6839L15.7295 10.6839Z" fill="#FFC300"/>
      </svg>`
      case 'folder':
        return `<svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 " viewBox="0 0 24 24">
        <title/>
        <g id="Complete">
        <g id="folder">
        <path d="M2,18.8V5.3A2.3,2.3,0,0,1,4.3,3H9.6a1.1,1.1,0,0,1,.8.4l2.8,3.2a1.1,1.1,0,0,0,.8.4h5.6A2.2,2.2,0,0,1,22,9.2v9.7A2.2,2.2,0,0,1,19.8,21H4.2A2.2,2.2,0,0,1,2,18.8Z" fill="none" stroke="gray" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"/>
        </g>
        </g>
      </svg>`
      case 'eye_off':
        return `<svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 " viewBox="0 0 24 24" fill="none">
      <g id="Edit / Hide">
      <path id="Vector" d="M3.99989 4L19.9999 20M16.4999 16.7559C15.1473 17.4845 13.6185 17.9999 11.9999 17.9999C8.46924 17.9999 5.36624 15.5478 3.5868 13.7788C3.1171 13.3119 2.88229 13.0784 2.7328 12.6201C2.62619 12.2933 2.62616 11.7066 2.7328 11.3797C2.88233 10.9215 3.11763 10.6875 3.58827 10.2197C4.48515 9.32821 5.71801 8.26359 7.17219 7.42676M19.4999 14.6335C19.8329 14.3405 20.138 14.0523 20.4117 13.7803L20.4146 13.7772C20.8832 13.3114 21.1182 13.0779 21.2674 12.6206C21.374 12.2938 21.3738 11.7068 21.2672 11.38C21.1178 10.9219 20.8827 10.6877 20.4133 10.2211C18.6338 8.45208 15.5305 6 11.9999 6C11.6624 6 11.3288 6.02241 10.9999 6.06448M13.3228 13.5C12.9702 13.8112 12.5071 14 11.9999 14C10.8953 14 9.99989 13.1046 9.99989 12C9.99989 11.4605 10.2135 10.9711 10.5608 10.6113" stroke="gray" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      </g>
      </svg>`
      case 'eye':
        return `<svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 " viewBox="0 0 24 24" fill="none">
      <path fill-rule="evenodd" clip-rule="evenodd" d="M6.30147 15.5771C4.77832 14.2684 3.6904 12.7726 3.18002 12C3.6904 11.2274 4.77832 9.73158 6.30147 8.42294C7.87402 7.07185 9.81574 6 12 6C14.1843 6 16.1261 7.07185 17.6986 8.42294C19.2218 9.73158 20.3097 11.2274 20.8201 12C20.3097 12.7726 19.2218 14.2684 17.6986 15.5771C16.1261 16.9282 14.1843 18 12 18C9.81574 18 7.87402 16.9282 6.30147 15.5771ZM12 4C9.14754 4 6.75717 5.39462 4.99812 6.90595C3.23268 8.42276 2.00757 10.1376 1.46387 10.9698C1.05306 11.5985 1.05306 12.4015 1.46387 13.0302C2.00757 13.8624 3.23268 15.5772 4.99812 17.0941C6.75717 18.6054 9.14754 20 12 20C14.8525 20 17.2429 18.6054 19.002 17.0941C20.7674 15.5772 21.9925 13.8624 22.5362 13.0302C22.947 12.4015 22.947 11.5985 22.5362 10.9698C21.9925 10.1376 20.7674 8.42276 19.002 6.90595C17.2429 5.39462 14.8525 4 12 4ZM10 12C10 10.8954 10.8955 10 12 10C13.1046 10 14 10.8954 14 12C14 13.1046 13.1046 14 12 14C10.8955 14 10 13.1046 10 12ZM12 8C9.7909 8 8.00004 9.79086 8.00004 12C8.00004 14.2091 9.7909 16 12 16C14.2092 16 16 14.2091 16 12C16 9.79086 14.2092 8 12 8Z" fill="gray"/>
      </svg>`

    }
  };

  const css = function (name) {
    name = Array.isArray(name) ? name[0] : name;

    switch (name) {
      case 'VersionInfo':
        return 'flex py-3 px-3 items-center gap-3 rounded-md hover:bg-gray-500/10 transition-colors duration-200 text-white cursor-pointer text-sm';
      case 'ExportButton':
        return 'flex py-3 px-3 items-center gap-3 rounded-md hover:bg-gray-500/10 transition-colors duration-200 text-white cursor-pointer text-sm';
      case 'column':
        return 'flex flex-col gap-3.5 flex-1';
      case 'h2':
        return (
          'text-lg font-normal">' +
          AppSlogan +
          '</h2><ul class="flex flex-col gap-3.5 mb-4'
        );
      case 'h3':
        return 'm-0 cursor-pointer tracking-tight leading-8 text-gray-900 dark:text-gray-100 text-lg font-bold';
      case 'ul':
        return 'gap-3.5';
      case 'card':
        return ' cursor-default flex flex-col gap-1 bg-gray-50 dark:bg-white/5 p-2 rounded-md hover:bg-gray-200 dark:hover:bg-gray-900 text-left border shadow border-gray-300 dark:border-gray-700 hover:shadow-lg transition duration-300 ease-in-out tw-border-2 tw-border-blue-500 tw-rounded-xl';
      case 'p':
        return 'm-0 cursor-pointer font-light text-gray-500';
      case 'paginationText':
        return 'text-sm text-gray-700 dark:text-gray-400';
      case 'paginationNumber':
        return 'font-semibold text-gray-900 dark:text-white';
      case 'paginationButtonGroup':
        return 'inline-flex xs:mt-0';
      case 'paginationButton':
        return 'px-1 py-1 font-small bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-400 dark:hover:text-white';
      case 'saveSearchChips':
        return 'px-2 py-1 rounded font-small bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-400 dark:hover:text-white';
      case 'continueButton':
        return ' font-medium bg-gray-100 hover:bg-gray-200 dark:bg-gray-600 dark:border-gray-600 dark:hover:bg-gray-800 bg-gray disabled:text-gray-300 disabled:hover:bg-transparent rounded-l-md px-4';
      case 'continueActionSelect':
        return 'bg-gray-100 border-0 p-1 border-l text-xs rounded-r-md block w-2 dark:bg-gray-600 border-gray-200 dark:border-gray-600 dark:hover:bg-gray-800 dark:placeholder-gray-400 dark:text-white hover:bg-gray-200 focus:ring-0 focus:border-gray-200 pr-6';
      case 'action':
        return 'p-1 rounded-md hover:bg-gray-100 hover:text-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-gray-200 disabled:dark:hover:text-gray-400 md:invisible md:group-hover:visible';
      case 'tag':
        return 'inline-flex flex-col w-full items-start py-1 px-2 mr-2 mb-2 text-sm font-medium text-white rounded bg-gray-600 whitespace-nowrap';
      case 'languageSelectWrapper':
        return 'flex my-2 gap-3  lg:max-w-3xl md:last:mb-6  pt-0 stretch justify-around text-xs items-end lg:-mb-4 pb-9 mb-0  sm:flex-col  ';
      case 'select':
        return 'bg-gray-100 p-1 px-2 border-0 text-xs rounded block w-full dark:bg-gray-600 dark:border-gray-600 dark:hover:bg-gray-800 dark:placeholder-gray-400 dark:text-white hover:bg-gray-200 focus:ring-0';
      case 'select-v2':
          return 'bg-gray-100 p-1 px-2 border-0 text-xs w-full dark:bg-gray-600 dark:border-gray-600 dark:hover:bg-gray-800 dark:placeholder-gray-400 dark:text-white hover:bg-gray-200 focus:ring-0';
      case 'selectLabel':
        return 'block text-xs font-thin';
    }
  };

  // See also https://developer.chrome.com/docs/extensions/mv3/security/#sanitize
  const sanitizeInput = function (input) {
    return input
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/"/g, '&quot;');
  };

  // hide modal with modalID
  const hideModal = function (modalID) {
    const modal = document.getElementById(modalID);

    if (!modal) {
      return;
    }

    modal.style = 'display: none;';
  };

  // format the date and time as YYYY-MM-DD HH:MM:SS
  const formatDateTime = function (timestamp) {
    const d = new Date(timestamp);

    if (!d || d == 'Invalid Date') {
      return '';
    }

    const date = d.toISOString().split('T')[0];
    const time = d.toTimeString().split(' ')[0];

    return `${date} ${time}`;
  };

  // format the timestamp as X {unit} ago
  const formatAgo = function (timestamp) {
    const d = new Date(timestamp);

    if (!d || d == 'Invalid Date') {
      return '';
    }

    const now = new Date();
    const diff = Math.max(0, now - d);

    const units = [
      { name: 'year', value: 31556952000 },
      { name: 'month', value: 2629746000 },
      { name: 'week', value: 604800000 },
      { name: 'day', value: 86400000 },
      { name: 'hour', value: 3600000 },
      { name: 'minute', value: 60000 },
      { name: 'second', value: 1000 },
    ];

    for (let i = 0; i < units.length; i++) {
      const unit = units[i];

      if (diff >= unit.value) {
        const unitCount = Math.floor(diff / unit.value);
        const unitName = unitCount > 1 ? unit.name + 's' : unit.name;

        return `${unitCount} ${unitName} ago`;
      }
    }

    return 'just now';
  };

  /**
   * Create modal to report feedback for a prompt
   *
   * @param {number} PromptIndex
   * @param {PromptTemplatesType} CurrentPromptTemplatesType
   * @param {import('./app.js').Prompt[]} PromptTemplates
   * @param {function(Event)} reportPrompt
   */
  const createReportPromptModal = function (
    PromptIndex,
    CurrentPromptTemplatesType,
    PromptTemplates,
    reportPrompt
  ) {
    // cannot report own prompts
    if (CurrentPromptTemplatesType === PromptTemplatesType.OWN) {
      return;
    }

    const prompt = PromptTemplates[PromptIndex];

    // prompt does not exist
    if (!prompt) {
      return;
    }

    let reportPromptModal = document.getElementById('reportPromptModal');

    // if modal does not exist, create it, add event listener on submit and append it to body
    if (!reportPromptModal) {
      reportPromptModal = document.createElement('div');
      reportPromptModal.id = 'reportPromptModal';

      reportPromptModal.addEventListener('submit', reportPrompt);

      document.body.appendChild(reportPromptModal);
    }

    reportPromptModal.innerHTML = /*html*/ `
      <div class="fixed inset-0 text-center transition-opacity z-50">
        <div class="absolute bg-gray-900 inset-0 opacity-90">
        </div>

        <div class="fixed inset-0 overflow-y-auto">
          <div class="flex items-center justify-center min-h-full">
            <div
              class="align-center bg-white dark:bg-gray-800 dark:text-gray-200 inline-block overflow-hidden sm:rounded-lg shadow-xl sm:align-middle sm:max-w-lg sm:my-8 sm:w-full text-left transform transition-all"
              role="dialog" aria-modal="true" aria-labelledby="modal-headline" style="text-align: left;">

              <div class="bg-white dark:bg-gray-800 px-4 pt-5 pb-4 sm:p-6 sm:pb-4">

                <div id="reportPromptIntroText">
                  <p class="mb-6">
                    Thanks for helping us improve.<br><br>

                    We need you to answer a few questions so we can better understand what's going on with this Prompt.<br><br>

                    You'll also have the option to add more info in your own words and add more details to the report.<br><br>

                    We take reports seriously.<br><br>

                    If we find a rule violation, we'll either remove the Prompt immediately or ask them to revise, or lock or suspend the account.
                  </p>

                  <div class="mt-2">
                    <label for="FeedbackTypeNo" class="block">What would you like to report?</label>
                    <select data-prompt-id="${prompt.ID}" id="FeedbackTypeNo" name="FeedbackTypeNo" class="mt-2 mb-3 dark:bg-gray-700 dark:border-gray-700 dark:hover:bg-gray-900 rounded w-full" required>
                      <option value="${FeedbackTypeNo.GENERIC_LEGAL_CONCERN}">
                      Legal concerns
                      </option>
                      <optgroup label="Result concerns">                        
                        <option value="${FeedbackTypeNo.NOT_MULTILINGUAL}">
                          Result in wrong language
                        </option>
                        <option value="${FeedbackTypeNo.NOT_GENERIC}">
                          Result on wrong topic/keywords
                        </option>                        
                        <option value="${FeedbackTypeNo.GENERIC_CONCERN}">
                          Prompt not working as expected
                        </option>
                      </optgroup>                  
                      <option value="${FeedbackTypeNo.SPAM}">Spam</option>
                    </select>
                  </div>
                </div>

                <div class="reportPromptFeedbackContainer hidden overflow-y-auto" id="reportPromptFeedbackForm"></div>
              </div>

              <div class="bg-gray-200 dark:bg-gray-700 px-4 py-3 text-right">
                <button type="button" class="bg-gray-600 hover:bg-gray-800 mr-2 px-4 py-2 rounded text-white"
                        onclick="IN_BOUND.hideModal('reportPromptModal')"> Cancel
                </button>
                <button type="button" id="reportPromptSubmitButton" class="bg-green-600 hover:bg-green-700 mr-2 px-4 py-2 rounded text-white">Start Report
                </button>
              </div>
            </div>
          </div>
        </div>

      </div>`;

    // add event listener to change button text and type on click
    reportPromptModal.querySelector('#reportPromptSubmitButton').addEventListener(
      'click',
      (e) => {
        // hide intro text
        document.getElementById('reportPromptIntroText').style = 'display: none;';

        const feedbackTypeNoSelect = document.getElementById('FeedbackTypeNo');

        // show feedback type specific text & form
        const feedbackForm = document.getElementById('reportPromptFeedbackForm');

        feedbackForm.innerHTML = getFeedbackFormTemplate(
          +feedbackTypeNoSelect.value,
          feedbackTypeNoSelect.dataset.promptId
        );

        feedbackForm.classList.remove('hidden');

        // change button text to "Send Report" and replace event listener
        e.target.innerText = 'Send Report';

        e.target.addEventListener('click', () => {
          // submit the visible form in reportPromptModal
          document
            .querySelector(
              '#reportPromptModal .reportPromptFeedbackContainer:not(.hidden) form'
            )
            .requestSubmit();
        });
      },
      { once: true }
    );

    reportPromptModal.style = 'display: block;';

    // add event listener to close the modal on ESC
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        hideModal('reportPromptModal');
      }
    });
  };


  /**
   * Get the feedback form template for a specific feedback type
   * 
   * @param {FeedbackTypeNo} selectedFeedbackTypeNo
   * @param {string} promptID
   * @returns {string} - HTML string
   s*/
  const getFeedbackFormTemplate = (selectedFeedbackTypeNo, promptID) => {
    const requiresFeedbackContactText = [
      FeedbackTypeNo.GENERIC_CONCERN,
      FeedbackTypeNo.GENERIC_LEGAL_CONCERN,
    ].includes(selectedFeedbackTypeNo);

    return /*html*/ `
    <p class="mb-6">
      Since we are not affiliated with OpenAI or ChatGPT,
      we are not responsible for the output of ChatGPT.<br><br>

      ${
        selectedFeedbackTypeNo === FeedbackTypeNo.GENERIC_CONCERN
          ? /*html*/ `
          But we can try to help you with results.<br><br>

          We can do this by looking at the prompt reported,
          and the output generated.
        `
          : 'But we will take your report about the prompt and evaluate it.'
      }
    </p>

    <form>
      <input type="hidden" name="PromptID" value="${promptID}" />

      ${
        selectedFeedbackTypeNo !== FeedbackTypeNo.GENERIC_CONCERN
          ? /*html*/ `<input type="hidden" name="FeedbackTypeNo" value="${selectedFeedbackTypeNo}" />`
          : ''
      }

      <label>Contact Email${
        !requiresFeedbackContactText
          ? ' <span class="text-sm text-gray-500">(optional)</span>'
          : ''
      }</label>
      <input name="FeedbackContact" 
        ${requiresFeedbackContactText ? ' required ' : ''} type="email"
        title="Email address to contact you in case we need more information"
        class="w-full bg-gray-100 dark:bg-gray-700 dark:border-gray-700 rounded p-2 mt-2 mb-3"
        placeholder="example@example.com" />

      <label>Feedback${
        !requiresFeedbackContactText
          ? ' <span class="text-sm text-gray-500">(optional)</span>'
          : ''
      }</label>
      <textarea name="FeedbackText" 
        ${requiresFeedbackContactText ? ' required ' : ''}
        title="Short description of the issue"
        class="w-full bg-gray-100 dark:bg-gray-700 dark:border-gray-700 rounded p-2 mt-2 mb-3" style="height: 140px;"
        placeholder="Please describe the issue you are having with this prompt.${
          selectedFeedbackTypeNo === FeedbackTypeNo.GENERIC_CONCERN
            ? ' Please include your full history of the prompt including the original prompt used.'
            : ''
        }"></textarea>

      ${
        selectedFeedbackTypeNo === FeedbackTypeNo.GENERIC_CONCERN
          ? /*html*/ `
            <label class="block">Are you a customer paying for IN_BOUND support? Would you like to hire us to improve your prompt and create a private prompt specifically for you?</label>
            <select name="FeedbackTypeNo" class="mt-2 mb-3 dark:bg-gray-700 dark:border-gray-700 dark:hover:bg-gray-900 rounded w-full" required>
              <option value="${FeedbackTypeNo.PROMPT_SUPPORT_FREE}">I want free support</option>
              <option value="${FeedbackTypeNo.PROMPT_SUPPORT_WANT_PAID}">I want to pay for support</option>
              <option value="${FeedbackTypeNo.PROMPT_SUPPORT_PAID}">I am already paying for support</option>
            </select>
          `
          : ''
      }
    </form>
  `;
  };

  /* eslint-disable no-unused-vars */

  // Mapping of MessageSeverityNo to the corresponding CSS class name for the notification message
  const NotificationMessageSeverityClassName = {
    [MessageSeverityNo.INFO]: 'bg-gray-500',
    [MessageSeverityNo.SUCCESS]: 'bg-green-500',
    [MessageSeverityNo.UPDATE]: 'bg-[#5436DA]',
  };

  /**
   * Show the first active and not expired message with MessageSeverityNo.MANDATORY_MUST_CONFIRM (if any)
   * otherwise show the first active and not expired message with other MessageSeverityNo (if any)
   *
   * @param {import("./client").Message[]} messages
   * @param {(MessageID: string)} confirmCallback
   * @param {(MessageID: string, Vote: MessageVoteTypeNo)} voteCallback
   */
  const showMessage = (messages, confirmCallback, voteCallback) => {
    // get the first active and not expired message with MessageSeverityNo.MANDATORY_MUST_CONFIRM
    let message = messages.find(
      (message) =>
        message.MessageStatusNo === MessageStatusNo.ACTIVE &&
        message.MessageSeverityNo === MessageSeverityNo.MANDATORY_MUST_CONFIRM &&
        (!message.ExpiryTime || new Date(message.ExpiryTime) > new Date())
    );

    // if there is a message with MessageSeverityNo.MANDATORY_MUST_CONFIRM, show it
    if (message) {
      createConfirmMessageModal(message, confirmCallback);

      return;
    }

    // otherwise, get the first active and not expired message with other MessageSeverityNo (if any)
    message = messages.find(
      (message) =>
        message.MessageStatusNo === MessageStatusNo.ACTIVE &&
        message.MessageSeverityNo !== MessageSeverityNo.MANDATORY_MUST_CONFIRM &&
        (!message.ExpiryTime || new Date(message.ExpiryTime) > new Date())
    );

    // if there is no message, return - otherwise show it
    if (!message) {
      return;
    }

    createNotificationMessage(message, voteCallback);
  };

  /**
   * Create a modal to confirm a message with MessageSeverityNo.MANDATORY_MUST_CONFIRM
   *
   * @param {import("./client").Message} message
   * @param {(MessageID: string)} confirmCallback
   */
  const createConfirmMessageModal = (message, confirmCallback) => {
    let confirmMessageModal = document.getElementById('confirmMessageModal');

    // if modal does not exist, create it, add event listener on submit and append it to body
    if (!confirmMessageModal) {
      confirmMessageModal = document.createElement('div');
      confirmMessageModal.id = 'confirmMessageModal';

      // add event listener on submit to call confirmCallback and hide modal on success
      confirmMessageModal.addEventListener('submit', async (e) => {
        e.preventDefault();

        const MessageID = e.target.MessageID.value;

        if (await confirmCallback(MessageID)) {
          hideModal('confirmMessageModal');
        }
      });

      document.body.appendChild(confirmMessageModal);
    }

    confirmMessageModal.innerHTML = /*html*/ `
      <div class="fixed inset-0 text-center transition-opacity z-50">
        <div class="absolute bg-gray-900 inset-0 opacity-90">
        </div>

        <div class="fixed inset-0 overflow-y-auto">
          <div class="flex items-center justify-center min-h-full">
            <form>
              <div
                class="align-center bg-white dark:bg-gray-800 dark:text-gray-200 inline-block overflow-hidden sm:rounded-lg shadow-xl sm:align-middle sm:max-w-2xl sm:my-8 sm:w-full text-left transform transition-all prose dark:prose-invert"
                role="dialog" aria-modal="true" aria-labelledby="modal-headline" style="text-align: left;">

                <div class="bg-white dark:bg-gray-800 px-4 pt-5 pb-4 sm:p-6 sm:pb-4">

                  <h3 class="mt-1 mb-6">${message.MessageSubject}</h3>

                  <div class="mb-6 overflow-y-auto">${message.MessageBodyHTML}</div>

                  <label class="font-semibold">
                    <input name="MessageID" value="${message.MessageID}" type="checkbox" class="mr-2 dark:bg-gray-700" required> 
                    I read and accept these terms & conditions
                  </label>
                </div>

                <div class="bg-gray-200 dark:bg-gray-700 px-4 py-3 text-right">
                  <button type="submit" id="reportPromptSubmitButton" class="bg-green-600 hover:bg-green-700 mr-2 px-4 py-2 rounded text-white">Confirm
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>

      </div>`;

    confirmMessageModal.style = 'display: block;';
  };

  /**
   * Create a notification message with thumb up/down buttons
   *
   * @param {import("./client").Message} message
   * @param {(MessageID: string, Vote: MessageVoteTypeNo)} voteCallback
   */
  const createNotificationMessage = (message, voteCallback) => {
    const className =
      NotificationMessageSeverityClassName[message.MessageSeverityNo];

    const notificationElement = document.createElement('div');

    notificationElement.innerHTML = /*html*/ `
      <div class="fixed flex justify-center w-full top-2 px-2 z-50 pointer-events-none">
        <div class="${className} flex pointer-events-auto px-6 py-3 rounded-md text-white" role="alert" style="min-width: 30rem;">
          <div class="flex flex-col gap-2 w-full">

            <h4 class="w-full">${message.MessageSubject}</h4>

            <div class="prose w-full text-white">
              ${message.MessageBodyHTML}
            </div> 

            <div class="flex gap-4 mt-4" style="justify-content: end;">
              <button data-message-vote-type-no="${
                MessageVoteTypeNo.MESSAGE_LIKE
              }" title="I like this">${svg('ThumbUp')}</button>
              <button data-message-vote-type-no="${
                MessageVoteTypeNo.MESSAGE_DISLIKE
              }" title="I don't like this">${svg('ThumbDown')}</button>
            </div>

          </div>
        </div>
      </div>
    `;

    // add event listener on like and dislike button to call voteCallback with MessageVoteTypeNo from data attribute and hide notification on success
    notificationElement.querySelectorAll('button').forEach((button) => {
      button.addEventListener('click', async (e) => {
        if (
          await voteCallback(
            message.MessageID,
            +e.target.closest('button').dataset.messageVoteTypeNo
          )
        ) {
          notificationElement.remove();
        }
      });
    });

    document.body.appendChild(notificationElement);
  };

  const extensionLanguages = {
    english: {
      tabsLabel: ["All Shared", "My Prompts"],
      topicLabel: "Topic",
      activityLabel: "Activity",
      sortLabel: "Sort by",
      feedLabel: "Feed type",
      search: "Search",
      newPromptLabel: "Add new prompt template",
      likeTitle: ["Vote ", "Vote for this prompt with thumbs up"],
      dislikeTitle: "Vote for this prompt with thumbs down",
      forkTitle: ["Copy to My Prompts", "Prompt already copied!"],
      labelsOverTextareaElems: ["Output in", "Tone", "Writing Style"],
      titleOnTopIcons: ["Setting", "Add New Prompt Templates", "Import Prompt Template", "Expanded View", "Collapsed View", "View Favorites"],
      cardIconsTitle: ["Add prompt to favorites", "Remove prompt from favorites", "Save it as My Prompts", "Prompt already copied!", "Pin this prompt", "UnPin this prompt", "Download prompt template"],
      plusOnTextarea: "Add to My Prompts",
      reportTitle: "Report this prompt",
      useTitle: "Usages",
      topicTitle: "Topic: ",
      activityTitle: "Activity: ",
      authorTitle: "Created by ",
      timeTitle: "Last updated on ",
      shareTitle: "Copy link to this prompt ",
      editPrmptTitle: "Edit this prompt",
      dltPrmptTitle: "Delete this prompt",
      publicTitle: "Public",
      ownTitle: "Private",
      textareaPlaceholderIdentifier: "Enter: ",
      inputform: {
        saveAsNew: "Save as New Template",
        title: {
          label: "Template Name",
          placeholder: "Keyword Stretegy"
        },
        teaser: {
          label: "Short Description",
          placeholder: "Create a keyword strategy and SEO cotent plan from 1 [KEYWORD]"
        },
        promptHint: {
          label: "Hint - What to enter in the input field",
          placeholder: "[KEYWORD] or [Your list of keywords]"
        },
        promptTemplate: {
          label: "Prompt Template",
          placeholer: "Prompt text including placeholders"
        },
        addPromptBtn: "Add New Prompt",
        topic: "Topic",
        activity: "Tags",
        share: "Add to shared prompts",
        author: {
          label: "Author Name",
          placeholder: "Author Name"
        },
        authorUrl: {
          label: "Author URL",
          placeholder: "https://www.example.com"
        },
        agreeText: "Please be mindful of what you share, and do not include any confidential information, as we are not responsible for any actions taken by others with the information you choose to share.",
        save: "Save Prompt",
        cancel: "Cancel"
      }
    },
    danish: {
      tabsLabel: ["Delte prompts", "Mine prompts"],
      topicLabel: "Emne",
      activityLabel: "Aktivitet",
      sortLabel: "Sortér efter",
      feedLabel: "Feed type",
      search: "Søg",
      newPromptLabel: "Tilføj nyt prompt-mal",
      likeTitle: ["Stem ", "Stem på dette prompt med en tommelfinger op"],
      dislikeTitle: "Stem på dette prompt med en tommelfinger nedad",
      forkTitle: ["Kopier til mine meddelelser", "Prompt er allerede kopieret!"],
      labelsOverTextareaElems: ["Output ind", "Tone", "Skrivestil"],
      titleOnTopIcons: ["Indstilling", "Tilføj nye promptskabeloner", "Importer promptskabelon", "Udvidet visning", "Skjult visning", "Se favoritter"],
      cardIconsTitle: ["Tilføj prompt til favoritter", "Fjern prompt fra favoritter", "Gem det som Mine prompter", "Prompt er allerede kopieret!", "Fastgør denne prompt", "Fjern fastgør denne prompt", "Download prompt skabelon"],
      plusOnTextarea: "Føj til mine meddelelser",
      reportTitle: "Rapporter dette prompt",
      useTitle: "Anvendelser",
      topicTitle: "Emne: ",
      activityTitle: "Aktivitet: ",
      authorTitle: "Oprettet af ",
      timeTitle: "Sidst opdateret den ",
      shareTitle: "Kopier link til dette prompt ",
      editPrmptTitle: "Rediger dette prompt",
      dltPrmptTitle: "Slet dette prompt",
      publicTitle: "Offentligt",
      ownTitle: "Privat",
      textareaPlaceholderIdentifier: "Indtast: ",
      inputform: {
        saveAsNew: "Gem som ny skabelon",
        title: {
          label: "Skabelonnavn",
          placeholder: "Nøgleord Strategi"
        },
        teaser: {
          label: "Kort beskrivelse",
          placeholder: "Opret en nøgleordsstrategi og SEO-indholdsplan fra 1 [NØGLEORD]"
        },
        promptHint: {
          label: "Hint - Hvad skal indtastes i inputfeltet",
          placeholder: "[NØGLEORD] eller [Din liste af nøgleord]"
        },
        promptTemplate: {
          label: "Prompt Skabelon",
          placeholer: "Prompt tekst inklusive pladsholdere"
        },
        addPromptBtn: "Tilføj ny prompt",
        topic: "Emne",
        activity: "Tags",
        share: "Tilføj til delte prompts",
        author: {
            label: "Forfatternavn",
            placeholder: "Forfatternavn"
        },
        authorUrl: {
            label: "Forfatter-URL",
            placeholder: "https://www.eksempel.com"
        },
        agreeText: "Vær opmærksom på, hvad du deler, og inkluder ikke fortrolige oplysninger, da vi ikke er ansvarlige for handlinger foretaget af andre med de oplysninger, du vælger at dele.",
        save: "Gem Prompt",
        cancel: "Annuller"
    }
    }

  };

  // (c) 2023 KudoAI & contributors under the MIT license
  // Source: https://github.com/kudoai/chatgpt.js
  // Latest minified release: https://code.chatgptjs.org/chatgpt-latest-min.js

  // Init OpenAI endpoints
  const endpoints = {
      session: 'https://chat.openai.com/api/auth/session',
      chats: 'https://chat.openai.com/backend-api/conversations',
      chat: 'https://chat.openai.com/backend-api/conversation',
      share_create: 'https://chat.openai.com/backend-api/share/create',
      share: 'https://chat.openai.com/backend-api/share',
      instructions: 'https://chat.openai.com/backend-api/user_system_messages'
  };

  // Init queues for feedback methods
  var alertQueue = [],
      notifyQueue = { quadrants: { topRight: [], bottomRight: [], bottomLeft: [], topLeft: [] }};
  localStorage.alertQueue = JSON.stringify(alertQueue);
  localStorage.notifyQueue = JSON.stringify(notifyQueue);

  // Define chatgpt.methods
  const chatgpt = {
      openAIaccessToken: {},

      actAs: function(persona) {
      // Prompts ChatGPT to act as a persona from https://github.com/KudoAI/chat-prompts/blob/main/personas.json

          const promptsUrl = 'https://raw.githubusercontent.com/KudoAI/chat-prompts/main/dist/personas.min.json';
          return new Promise((resolve, reject) => {
              const xhr = new XMLHttpRequest();
              xhr.open('GET', promptsUrl, true); xhr.send();
              xhr.onload = () => {
                  if (xhr.status !== 200) return reject('🤖 chatgpt.js >> Request failed. Cannot retrieve prompts data.');
                  const data = JSON.parse(xhr.responseText).personas;
                  if (!persona) {
                      console.log('\n%c🤖 chatgpt.js personas\n',
                          'font-family: sans-serif ; font-size: xxx-large ; font-weight: bold');
                      for (const prompt of data) // list personas
                          console.log(`%c${ prompt.title }`, 'font-family: monospace ; font-size: larger ;');
                      return resolve();
                  }
                  const selectedPrompt = data.find(obj => obj.title.toLowerCase() === persona.toLowerCase());
                  if (!selectedPrompt)
                      return reject(`🤖 chatgpt.js >> Persona '${ persona }' was not found!`);
                  chatgpt.send(selectedPrompt.prompt, 'click');
                  console.info(`Loading ${ persona } persona...`);
                  chatgpt.isIdle().then(() => { console.info('Persona activated!'); });
                  return resolve();
              };
          });
      },

      activateDarkMode: function() {
          document.documentElement.classList.replace('light', 'dark');
          document.documentElement.style.colorScheme = 'dark';
          localStorage.setItem('theme', 'dark');
      },

      activateLightMode: function() {
          document.documentElement.classList.replace('dark', 'light');
          document.documentElement.style.colorScheme = 'light';
          localStorage.setItem('theme', 'light');
      },

      alert: function(title, msg, btns, checkbox, width) {
      // [ title/msg = strings, btns = [named functions], checkbox = named function, width (px) = int ] = optional
      // * Spaces are inserted into button labels by parsing function names in camel/kebab/snake case

          // Create modal parent/children elements
          const modalContainer = document.createElement('div');
          modalContainer.id = Math.floor(chatgpt.randomFloat() * 1000000) + Date.now();
          modalContainer.classList.add('chatgpt-modal'); // add class to main div
          const modal = document.createElement('div');
          const modalTitle = document.createElement('h2');
          const modalMessage = document.createElement('p');

          // Select or crate/append style
          let modalStyle;
          if (!document.querySelector('#chatgpt-alert-style')) {
              modalStyle = document.createElement('style');
              modalStyle.id = 'chatgpt-alert-style';
              document.head.appendChild(modalStyle);
          } else modalStyle = document.querySelector('#chatgpt-alert-style');

          // Define styles
          const scheme = chatgpt.isDarkMode() ? 'dark' : 'light';
          modalStyle.innerText = (

              // Background styles
              '.chatgpt-modal {' 
                  + 'position: fixed ; top: 0 ; left: 0 ; width: 100% ; height: 100% ;' // expand to full view-port
                  + 'background-color: rgba(67, 70, 72, 0.75) ;' // dim bg
                  + 'display: flex ; justify-content: center ; align-items: center ; z-index: 9999 }' // align

              // Alert styles
              + '.chatgpt-modal > div {'
                  + `background-color: ${ scheme == 'dark' ? 'black' : 'white' } ;`
                  + ( width ? `width: ${ width }px` : 'max-width: 458px ') + ' ;'
                  + 'padding: 20px ; margin: 12px 23px ; border-radius: 5px ; box-shadow: 0 2px 4px rgba(0, 0, 0, 0.3) }'
              + '.chatgpt-modal h2 { margin-bottom: 9px }'
              + `.chatgpt-modal a { color: ${ scheme == 'dark' ? '#00cfff' : '#1e9ebb' }}`

              // Button styles
              + '.modal-buttons { display: flex ; justify-content: flex-end ; margin: 20px -5px -3px 0 }'
              + '.chatgpt-modal button {'
                  + 'margin-left: 10px ; padding: 4px 18px ; border-radius: 15px ;'
                  + `border: 1px solid ${ scheme == 'dark' ? 'white' : 'black' }}`
              + '.primary-modal-btn {'
                  + `border: 1px solid ${ scheme == 'dark' ? 'white' : 'black' } ;`
                  + `background: ${ scheme == 'dark' ? 'white' : 'black' } ;`
                  + `color: ${ scheme == 'dark' ? 'black' : 'white' }}`
              + '.chatgpt-modal button:hover { background-color: #42B4BF ; border-color: #42B4BF ; color: black }'

              /* Checkbox styles */
              + '.chatgpt-modal .checkbox-group { display: flex ; margin-top: -18px }'
              + '.chatgpt-modal .checkbox-group label {'
                  + 'font-size: .7rem ; margin: -.04rem 0 0px .3rem ;'
                  + `color: ${ scheme == 'dark' ? '#e1e1e1' : '#1e1e1e' }}`
              + '.chatgpt-modal input[type="checkbox"] { transform: scale(0.7) ;'
                  + `border: 1px solid ${ scheme == 'dark' ? 'white' : 'black' }}`
              + '.chatgpt-modal input[type="checkbox"]:checked {'
                  + `border: 1px solid ${ scheme == 'dark' ? 'white' : 'black' } ;`
                  + 'background-color: black ; position: inherit }'
              + '.chatgpt-modal input[type="checkbox"]:focus { outline: none ; box-shadow: none }'
          );

          // Insert text into elements
          modalTitle.innerText = title || '';
          modalMessage.innerText = msg || ''; this.renderHTML(modalMessage);

          // Create/append buttons (if provided) to buttons div
          const modalButtons = document.createElement('div');
          modalButtons.classList.add('modal-buttons');
          if (btns) { // are supplied
              if (!Array.isArray(btns)) btns = [btns]; // convert single button to array if necessary
              btns.forEach((buttonFn) => { // create title-cased labels + attach listeners
                  const button = document.createElement('button');
                  button.textContent = buttonFn.name
                      .replace(/[_-]\w/g, match => match.slice(1).toUpperCase()) // convert snake/kebab to camel case
                      .replace(/([A-Z])/g, ' $1') // insert spaces
                      .replace(/^\w/, firstChar => firstChar.toUpperCase()); // capitalize first letter
                  button.addEventListener('click', () => { destroyAlert(); buttonFn(); });
                  modalButtons.insertBefore(button, modalButtons.firstChild); // insert button to left
              });
          }

          // Create/append OK/dismiss button to buttons div
          const dismissBtn = document.createElement('button');
          dismissBtn.textContent = btns ? 'Dismiss' : 'OK';
          dismissBtn.addEventListener('click', destroyAlert);
          modalButtons.insertBefore(dismissBtn, modalButtons.firstChild);

          // Highlight primary button
          modalButtons.lastChild.classList.add('primary-modal-btn');

          // Create/append checkbox (if provided) to checkbox group div
          const checkboxDiv = document.createElement('div');
          if (checkbox) { // is supplied
              checkboxDiv.classList.add('checkbox-group');
              const checkboxFn = checkbox; // assign the named function to checkboxFn
              const checkboxInput = document.createElement('input');
              checkboxInput.type = 'checkbox';
              checkboxInput.addEventListener('change', checkboxFn);

              // Create/show label
              const checkboxLabel = document.createElement('label');
              checkboxLabel.addEventListener('click', function() {
                  checkboxInput.checked = !checkboxInput.checked; checkboxFn(); });
              checkboxLabel.textContent = checkboxFn.name.charAt(0).toUpperCase() // capitalize first char
                  + checkboxFn.name.slice(1) // format remaining chars
                      .replace(/([A-Z])/g, (match, letter) => ' ' + letter.toLowerCase()) // insert spaces, convert to lowercase
                      .replace(/\b(\w+)nt\b/gi, '$1n\'t') // insert apostrophe in 'nt' suffixes
                      .trim(); // trim leading/trailing spaces

              checkboxDiv.appendChild(checkboxInput); checkboxDiv.appendChild(checkboxLabel);
          }

          // Assemble/append div
          const elements = [modalTitle, modalMessage, modalButtons, checkboxDiv];
          elements.forEach((element) => { modal.appendChild(element); });
          modalContainer.appendChild(modal); document.body.appendChild(modalContainer); 

          // Enqueue alert
          alertQueue = JSON.parse(localStorage.alertQueue);
          alertQueue.push(modalContainer.id);
          localStorage.alertQueue = JSON.stringify(alertQueue);

          // Add listeners
          document.addEventListener('keydown', keyHandler);
          modalContainer.addEventListener('click', (event) => {
              if (event.target === modalContainer) destroyAlert(); });

          // Show alert if none active
          modalContainer.style.display = (alertQueue.length === 1) ? '' : 'none';

          function destroyAlert() {
              modalContainer.remove(); // remove from DOM
              alertQueue = JSON.parse(localStorage.alertQueue);
              alertQueue.shift(); // + memory
              localStorage.alertQueue = JSON.stringify(alertQueue); // + storage

              // Prevent memory leaks
              modalContainer.removeEventListener('click', destroyAlert);
              document.removeEventListener('keydown', keyHandler);
              dismissBtn.removeEventListener('click', destroyAlert);

              // Check for pending alerts in queue
              if (alertQueue.length > 0) {
                  const nextAlert = document.getElementById(alertQueue[0]);
                  setTimeout(() => { nextAlert.style.display = 'flex'; }, 500 );
              }
          }

          function keyHandler(event) {
              const dismissKeys = [13, 27]; // enter/esc
              if (dismissKeys.includes(event.keyCode)) {
                  for (const alertId of alertQueue) { // look to handle only if triggering alert is active
                      const alert = document.getElementById(alertId);
                      if (alert && alert.style.display !== 'none') { // active alert found
                          if (event.keyCode === 27) destroyAlert(); // if esc pressed, dismiss alert & do nothing
                          else if (event.keyCode === 13) { // else if enter pressed
                              const mainButton = alert.querySelector('.modal-buttons').lastChild; // look for main button
                              if (mainButton) { mainButton.click(); event.preventDefault(); } // click if found
                          } return;
          }}}}

          return modalContainer.id;
      },

      askAndGetReply: async function(query) {
          chatgpt.send(query); await chatgpt.isIdle();
          return chatgpt.getChatData('active', 'msg', 'chatgpt', 'latest');
      },

      autoRefresh: {
          activate: function(interval) {
              if (this.isActive) { // already running, do nothing
                  console.log('↻ ChatGPT >> [' + chatgpt.autoRefresh.nowTimeStamp() + '] Auto refresh already active!'); return; }

              const autoRefresh = this;

              // Run main activate routine
              this.toggle.refreshFrame();
              scheduleRefreshes( interval ? parseInt(interval, 10) : 30 );
              console.log('↻ ChatGPT >> [' + chatgpt.autoRefresh.nowTimeStamp() + '] Auto refresh activated');

              // Add listener to send beacons in Chromium to thwart auto-discards if Page Visibility API supported
              if (navigator.userAgent.includes('Chrome') && typeof document.hidden !== 'undefined') {
                  document.addEventListener('visibilitychange', this.toggle.beacons); }

              function scheduleRefreshes(interval) {
                  const randomDelay = Math.max(2, Math.floor(chatgpt.randomFloat() * 21 - 10)); // set random delay up to ±10 secs
                  autoRefresh.isActive = setTimeout(() => {
                      const manifestScript = document.querySelector('script[src*="_ssgManifest.js"]');
                      document.querySelector('#refresh-frame').src = manifestScript.src + '?' + Date.now();
                      console.log('↻ ChatGPT >> [' + autoRefresh.nowTimeStamp() + '] ChatGPT session refreshed');
                      scheduleRefreshes(interval);
                  }, (interval + randomDelay) * 1000);
              }
          },

          deactivate: function() {
              if (this.isActive) {
                  this.toggle.refreshFrame();
                  document.removeEventListener('visibilitychange', this.toggle.beacons);
                  clearTimeout(this.isActive); this.isActive = null;
                  console.log('↻ ChatGPT >> [' + chatgpt.autoRefresh.nowTimeStamp() + '] Auto refresh de-activated');
              } else { console.log('↻ ChatGPT >> [' + chatgpt.autoRefresh.nowTimeStamp() + '] Auto refresh already inactive!'); }
          },

          nowTimeStamp: function() {
              const now = new Date();
              const hours = now.getHours() % 12 || 12; // Convert to 12-hour format
              let minutes = now.getMinutes(), seconds = now.getSeconds();
              if (minutes < 10) minutes = '0' + minutes; if (seconds < 10) seconds = '0' + seconds;
              const meridiem = now.getHours() < 12 ? 'AM' : 'PM';
              return hours + ':' + minutes + ':' + seconds + ' ' + meridiem;
          },

          toggle: {

              beacons: function() {
                  if (chatgpt.autoRefresh.beaconID) {
                      clearInterval(chatgpt.autoRefresh.beaconID); chatgpt.autoRefresh.beaconID = null;
                      console.log('↻ ChatGPT >> [' + chatgpt.autoRefresh.nowTimeStamp() + '] Beacons de-activated');
                  } else {
                      chatgpt.autoRefresh.beaconID = setInterval(function() {
                          navigator.sendBeacon('https://httpbin.org/post', new Uint8Array());
                          console.log('↻ ChatGPT >> [' + chatgpt.autoRefresh.nowTimeStamp() + '] Beacon sent');
                      }, 90000);
                      console.log('↻ ChatGPT >> [' + chatgpt.autoRefresh.nowTimeStamp() + '] Beacons activated');
                  }
              },

              refreshFrame: function() {
                  let refreshFrame = document.querySelector('#refresh-frame');
                  if (refreshFrame) refreshFrame.remove();
                  else {
                      refreshFrame = Object.assign(document.createElement('iframe'),
                          { id: 'refresh-frame', style: 'display: none' });
                      document.head.prepend(refreshFrame);
                  }
              }
          }
      },

      clearChats: async function(method) {

          // Validate method arg
          const validMethods = ['api', 'dom'];
          method = (method || 'dom').trim().toLowerCase(); // set to 'dom' by default
          if (method && !validMethods.includes(method))
              return console.log(`Method argument must be one of: [${ validMethods }]`);

          if (method === 'dom') {
              try { await chatgpt.getChatData(); } catch { return; } // check if chat history exists
              chatgpt.menu.open();
              setTimeout(() => {
                  const menuItems = document.querySelectorAll('a[role="menuitem"]') || [];
                  for (const menuItem of menuItems)
                      if (/settings/i.test(menuItem.text)) { menuItem.click(); break; }
                  setTimeout(() => { // clear chats
                      const settingsBtns = document.querySelectorAll('[id*=radix] button');
                      for (const settingsBtn of settingsBtns)
                          if (/^clear/i.test(settingsBtn.textContent)) { settingsBtn.click(); break; }
                      setTimeout(() => { // confirm clear
                          document.querySelector('[id*=radix] button').click();
                          setTimeout(exitMenu, 10);
              }, 10); }, 10); }, 10);
              function exitMenu() { document.querySelector('div[id*=radix] button').click(); }

          } else { // API method
          // NOTE: DOM is not updated to reflect new empty chat list (until session refresh)

              return new Promise((resolve) => {
                  chatgpt.getAccessToken().then(token => {
                      sendClearRequest(token).then(() => resolve());
              });});

              function sendClearRequest(token) {
                  return new Promise((resolve, reject) => {
                      const xhr = new XMLHttpRequest();
                      xhr.open('PATCH', endpoints.chats, true);
                      xhr.setRequestHeader('Content-Type', 'application/json');
                      xhr.setRequestHeader('Authorization', 'Bearer ' + token);
                      xhr.onload = () => {
                          if (xhr.status !== 200) return reject('🤖 chatgpt.js >> Request failed. Cannot clear chats.');
                          console.info('Chats successfully cleared');
                          return resolve();
                      };
                      xhr.send(JSON.stringify( { is_visible: false } ));
              });}
          }
      },

      code: {
      // Tip: Use template literals for easier passing of code arguments. Ensure backticks and `$`s are escaped (using `\`)

          execute: async function(code) {
              if (!code) return console.error('Code argument not supplied. Pass some code!');
              if (typeof code !== 'string') return console.error('Code argument must be a string!');
              chatgpt.send('Display the output as if you were terminal:\n\n' + code);
              console.info('Executing code...');
              await chatgpt.isIdle();
              return chatgpt.code.extract(await chatgpt.getChatData('active', 'msg', 'chatgpt', 'latest'));
          },

          extract: function(msg) { // extract pure code from response (targets last block)
              const codeBlocks = msg.match(/(?<=```.*\n)[\s\S]*?(?=```)/g);
              return codeBlocks ? codeBlocks[codeBlocks.length - 1] : msg;
          },

          minify: async function(code) {
              if (!code) return console.error('Code argument not supplied. Pass some code!');
              if (typeof code !== 'string') return console.error('Code argument must be a string!');
              chatgpt.send('Minify the following code:\n\n' + code);
              console.info('Minifying code...');
              await chatgpt.isIdle();
              return chatgpt.code.extract(await chatgpt.getChatData('active', 'msg', 'chatgpt', 'latest'));
          },

          obfuscate: async function(code) {
              if (!code) return console.error('Code argument not supplied. Pass some code!');
              if (typeof code !== 'string') return console.error('Code argument must be a string!');
              chatgpt.send('Obfuscate the following code:\n\n' + code);
              console.info('Obfuscating code...');
              await chatgpt.isIdle();
              return chatgpt.code.extract(await chatgpt.getChatData('active', 'msg', 'chatgpt', 'latest'));
          },

          refactor: async function(code, objective) {
              if (!code) return console.error('Code (1st) argument not supplied. Pass some code!');
              for (let i = 0; i < arguments.length; i++) if (typeof arguments[i] !== 'string')
                  return console.error(`Argument ${ i + 1 } must be a string.`);
              chatgpt.send('Refactor the following code for ' + (objective || 'brevity') + ':\n\n' + code);
              console.info('Refactoring code...');
              await chatgpt.isIdle();
              return chatgpt.code.extract(await chatgpt.getChatData('active', 'msg', 'chatgpt', 'latest'));
          },

          review: async function(code) {
              if (!code) return console.error('Code argument not supplied. Pass some code!');
              if (typeof code !== 'string') return console.error('Code argument must be a string!');
              chatgpt.send('Review the following code for me:\n\n' + code);
              console.info('Reviewing code...');
              await chatgpt.isIdle();
              return chatgpt.getChatData('active', 'msg', 'chatgpt', 'latest');
          },

          unminify: async function(code) {
              if (!code) return console.error('Code argument not supplied. Pass some code!');
              if (typeof code !== 'string') return console.error('Code argument must be a string!');
              chatgpt.send('Unminify the following code.:\n\n' + code);
              console.info('Unminifying code...');
              await chatgpt.isIdle();
              return chatgpt.code.extract(await chatgpt.getChatData('active', 'msg', 'chatgpt', 'latest'));
          },

          write: async function(prompt, outputLang) {
              if (!prompt) return console.error('Prompt (1st) argument not supplied. Pass a prompt!');
              if (!outputLang) return console.error('outputLang (2nd) argument not supplied. Pass a language!');
              for (let i = 0; i < arguments.length; i++) if (typeof arguments[i] !== 'string')
                  return console.error(`Argument ${ i + 1 } must be a string.`);
              chatgpt.send(prompt + '\n\nWrite this as code in ' + outputLang);
              console.info('Writing code...');
              await chatgpt.isIdle();
              return chatgpt.code.extract(await chatgpt.getChatData('active', 'msg', 'chatgpt', 'latest'));
          }
      },

      detectLanguage: async function(text) {
          if (!text) return console.error('Text argument not supplied. Pass some text!');
          if (typeof text !== 'string') return console.error('Text argument must be a string!');
          chatgpt.send('Detect the language of the following text:\n\n' + text
              + '\n\nOnly respond with the name of the language');
          console.info('Reviewing text...');
          await chatgpt.isIdle();
          return chatgpt.getChatData('active', 'msg', 'chatgpt', 'latest');
      },

      executeCode: function() { chatgpt.code.execute(); },

      exportChat: async function(chatToGet, format) {
      // chatToGet = 'active' (default) | 'latest' | index|title|id of chat to get
      // format = 'html' (default) | 'md' | 'pdf' | 'text'

          // Init args
          chatToGet = !chatToGet ? 'active' // default to 'active' if unpassed
                    : Number.isInteger(chatToGet) || /^\d+$/.test(chatToGet) ? // else if string/int num passed
                        parseInt(chatToGet, 10) // parse as integer
                    : chatToGet; // else preserve non-num string as 'active', 'latest' or title/id of chat to get
          format = format.toLowerCase() || 'html'; // default to 'html' if unpassed

          // Create transcript + filename
          console.info('Generating transcript...');
          let transcript = '', filename;
          if (/te?xt/.test(format)) { // generate plain transcript + filename for TXT export

              // Format filename using date/time
              const now = new Date(),
                    day = now.getDate().toString().padStart(2, '0'),
                    month = (now.getMonth() + 1).toString().padStart(2, '0'),
                    year = now.getFullYear(),
                    hour = now.getHours().toString().padStart(2, '0'),
                    minute = now.getMinutes().toString().padStart(2, '0');
              filename = `ChatGPT_${ day }-${ month }-${ year }_${ hour }-${ minute }.txt`;

              // Create transcript from active chat
              if (chatToGet == 'active' && /\/\w{8}-(\w{4}-){3}\w{12}$/.test(window.location.href)) {
                  const chatDivs = document.querySelectorAll('main > div > div > div > div > div > div[class*=group]');
                  if (chatDivs.length === 0) return console.error('Chat is empty!');
                  const msgs = []; let isUserMsg = true;
                  chatDivs.forEach((div) => {
                      const sender = isUserMsg ? 'USER' : 'CHATGPT'; isUserMsg = !isUserMsg;
                      let msg = Array.from(div.childNodes).map(node => node.innerText)
                          .join('\n\n') // insert double line breaks between paragraphs
                          .replace('Copy code', '');
                      msgs.push(sender + ': ' + msg);
                  });
                  transcript = msgs.join('\n\n');                     

              // ...or from getChatData(chatToGet)
              } else {
                  for (const entry of await chatgpt.getChatData(chatToGet, 'msg', 'both', 'all')) {
                      transcript += `USER: ${ entry.user }\n\n`;
                      transcript += `CHATGPT: ${ entry.chatgpt }\n\n`;
              }}

          } else { // generate rich transcript + filename for HTML/MD/PDF export

              // Fetch HTML transcript from OpenAI
              const response = await fetch(await chatgpt.shareChat(chatToGet)),
                    htmlContent = await response.text();

              // Format filename after <title>
              const parser = new DOMParser(),
                    parsedHtml = parser.parseFromString(htmlContent, 'text/html');
              filename = parsedHtml.querySelector('title').textContent + '.html';

              // Convert relative CSS paths to absolute ones
              const cssLinks = parsedHtml.querySelectorAll('link[rel="stylesheet"]');
              cssLinks.forEach(link => {
                  const href = link.getAttribute('href');
                  if (href?.startsWith('/')) link.setAttribute('href', 'https://chat.openai.com' + href);
              });

              // Serialize updated HTML to string
              transcript = new XMLSerializer().serializeToString(parsedHtml);
          }

          // Export transcript
          console.info(`Exporting transcript as ${ format.toUpperCase() }...`);
          if (format == 'pdf') { // convert SVGs + launch PDF printer

              // Convert SVG icons to data URLs for proper PDF rendering
              transcript = transcript.replace(/<svg.*?<\/svg>/g, (match) => {
                  const dataURL = 'data:image/svg+xml,' + encodeURIComponent(match);
                  return `<img src="${ dataURL }">`;
              });

              // Launch PDF printer
              const transcriptPopup = window.open('', '', 'toolbar=0, location=0, menubar=0, height=600, width=800');
              transcriptPopup.document.write(transcript);
              setTimeout(() => { transcriptPopup.print({ toPDF: true }); }, 100);

          } else { // auto-save to file

              if (format == 'md') { // remove extraneous HTML + fix file extension
                  const mdMatch = /<!?.*(<h1(.|\n)*?href=".*?continue.*?".*?\/a>.*?)<[^/]/.exec(transcript)[1];
                  transcript = mdMatch || transcript; filename = filename.replace('.html', '.md');
              }
              const blob = new Blob([transcript],
                  { type: 'text/' + ( format == 'html' ? 'html' : format == 'md' ? 'markdown' : 'plain' )});
              const link = document.createElement('a'), blobURL = URL.createObjectURL(blob);
              link.href = blobURL; link.download = filename; document.body.appendChild(link);
              link.click(); document.body.removeChild(link); URL.revokeObjectURL(blobURL);
          }
      },

      extractCode: function() { chatgpt.code.extract(); },

      generateRandomIP: function() {
          const ip = Array.from({length: 4}, () => Math.floor(chatgpt.randomFloat() * 256)).join('.');
          console.info('IP generated: ' + ip);
          return ip;
      },

      get: function(targetType, targetName = '') {
      // targetType = 'button'|'link'|'div'|'response'
      // targetName = from get[targetName][targetType] methods, e.g. 'send'

          // Validate argument types to be string only
          if (typeof targetType !== 'string' || typeof targetName !== 'string') {
              throw new TypeError('Invalid arguments. Both arguments must be strings.'); }

          // Validate targetType
          if (!targetTypes.includes(targetType.toLowerCase())) {
              throw new Error('Invalid targetType: ' + targetType
                  + '. Valid values are: ' + JSON.stringify(targetTypes)); }

          // Validate targetName scoped to pre-validated targetType
          const targetNames = [], reTargetName = new RegExp('^get(.*)' + targetType + '$', 'i');
          for (const prop in chatgpt) {
              if (typeof chatgpt[prop] === 'function' && reTargetName.test(prop)) {
                  targetNames.push( // add found targetName to valid array
                      prop.replace(reTargetName, '$1').toLowerCase());
          }}
          if (!targetNames.includes(targetName.toLowerCase())) {
              throw new Error('Invalid targetName: ' + targetName + '. '
                  + (targetNames.length > 0 ? 'Valid values are: ' + JSON.stringify(targetNames)
                      : 'targetType ' + targetType.toLowerCase() + ' does not require additional options.'));
          }

          // Call target function using pre-validated name components
          const targetFuncNameLower = ('get' + targetName + targetType).toLowerCase();
          const targetFuncName = Object.keys(this).find( // find originally cased target function name
              function(name) { return name.toLowerCase() === targetFuncNameLower; }); // test for match
          return this[targetFuncName](); // call found function
      },

      getAccessToken: function() {
          return new Promise((resolve, reject) => {
              if (Object.keys(chatgpt.openAIaccessToken).length > 0 && // populated
                      (Date.parse(chatgpt.openAIaccessToken.expireDate) - Date.parse(new Date()) >= 0)) // not expired
                  return resolve(chatgpt.openAIaccessToken.token);
              const xhr = new XMLHttpRequest();
              xhr.open('GET', endpoints.session, true);
              xhr.setRequestHeader('Content-Type', 'application/json');
              xhr.onload = () => {
                  if (xhr.status !== 200) return reject('🤖 chatgpt.js >> Request failed. Cannot retrieve access token.');
                  console.info('Token expiration: ' + new Date(JSON.parse(xhr.responseText).expires).toLocaleString().replace(',', ' at'));
                  chatgpt.openAIaccessToken = {
                      token: JSON.parse(xhr.responseText).accessToken,
                      expireDate: JSON.parse(xhr.responseText).expires
                  };
                  return resolve(chatgpt.openAIaccessToken.token);
              };
              xhr.send();
          });
      },

      getAccountDetails: function(...details) {
      // details = [email|id|image|name|picture] = optional

          // Build details array
          const validDetails = [ 'email', 'id', 'image', 'name', 'picture' ];
          details = ( !arguments[0] ? validDetails // no details passed, populate w/ all valid ones
                  : Array.isArray(arguments[0]) ? arguments[0] // details array passed, do nothing
                  : Array.from(arguments) ); // details arg(s) passed, convert to array

          // Validate detail args
          for (const detail of details) {
              if (!validDetails.includes(detail)) { return console.error(
                  'Invalid detail arg \'' + detail + '\' supplied. Valid details are:\n'
                + '                    [' + validDetails + ']'); }}

          // Return account details
          return new Promise((resolve, reject) => {
              const xhr = new XMLHttpRequest();
              xhr.open('GET', endpoints.session, true);
              xhr.setRequestHeader('Content-Type', 'application/json');
              xhr.onload = () => {
                  if (xhr.status === 200) {
                      const data = JSON.parse(xhr.responseText).user, detailsToReturn = {};
                      for (const detail of details) detailsToReturn[detail] = data[detail];
                      return resolve(detailsToReturn);
                  } else return reject('🤖 chatgpt.js >> Request failed. Cannot retrieve account details.');
              };
              xhr.send();
          });
      },

      getChatBox: function() { return document.getElementById('prompt-textarea'); },

      getChatData: function(chatToGet = 1, detailsToGet = 'all', sender = 'all', msgToGet = 'all') {
      // chatToGet = 'active' | 'latest' | index|title|id of chat to get (defaults to active OpenAI chat > latest chat)
      // detailsToGet = 'all' | [ 'id' | 'title' | 'create_time' | 'update_time' | 'msg' ] (defaults to 'all', excludes msg's)
      // sender = ( 'all' | 'both' ) | 'user' | 'chatgpt' (defaults to 'all', requires 2nd param = 'msg')
      // msgToGet = 'all' | 'latest' | index of msg to get (defaults to 'all', requires 2nd param = 'msg')

          // Init args
          const validDetails = [ 'all', 'id', 'title', 'create_time', 'update_time', 'msg' ];
          const validSenders = [ 'all', 'both', 'user', 'chatgpt' ];
          chatToGet = !chatToGet ? 'active' // if '' passed, set to active
                    : Number.isInteger(chatToGet) || /^\d+$/.test(chatToGet) ? // else if string/int num passed
                        ( parseInt(chatToGet, 10) === 0 ? 0 : parseInt(chatToGet, 10) - 1 ) // ...offset -1 or keep as 0
                    : chatToGet; // else preserve non-num string as 'active', 'latest' or title/id of chat to get
          detailsToGet = ['all', ''].includes(detailsToGet) ? // if '' or 'all' passed
                           validDetails.filter(detail => /^(?!all$|msg$).*/.test(detail)) // populate w/ [validDetails] except 'all' & 'msg'
                       : Array.isArray(detailsToGet) ? detailsToGet : [detailsToGet]; // else convert to array if needed
          sender = !sender ? 'all' // if '' or unpassed, set to 'all'
                 : validSenders.includes(sender) ? sender : 'invalid'; // else set to validSenders or 'invalid'
          msgToGet = Number.isInteger(msgToGet) || /^\d+$/.test(msgToGet) ? // if string/int num passed
                       ( parseInt(msgToGet, 10) === 0 ? 0 : parseInt(msgToGet, 10) - 1 ) // ...offset -1 or keep as 0
                   : ['all', 'latest'].includes(msgToGet.toLowerCase()) ? // else if 'all' or 'latest' passed
                       msgToGet.toLowerCase() // ...preserve it
                   : !msgToGet ? 'all' // else if '', set to 'all'
                   : 'invalid'; // else set 'invalid' for validation step

          // Validate args
          for (const detail of detailsToGet) {
              if (!validDetails.includes(detail)) { return console.error(
                  'Invalid detail arg \'' + detail + '\' passed. Valid details are:\n'
                + '                    [' + validDetails + ']'); }}
          if (sender === 'invalid') { return console.error(
              'Invalid sender arg passed. Valid senders are:\n'
            + '                    [' + validSenders + ']'); }
          if (msgToGet === 'invalid') { return console.error(
              'Invalid msgToGet arg passed. Valid msg\'s to get are:\n'
            + '                    [ \'all\' | \'latest\' | index of msg to get ]'); }

          // Return chat data
          return new Promise((resolve) => { chatgpt.getAccessToken().then(token => {
              if (!detailsToGet.includes('msg')) getChatDetails(token, detailsToGet).then(data => {
                  return resolve(data); // get just the chat details
              });
              else getChatMsgs(token).then(messages => { return resolve(messages); }); // otherwise get specific msg's
          });});

          function getChatDetails(token, detailsToGet) {
              const re_chatID = /\w{8}-(\w{4}-){3}\w{12}/;
              return new Promise((resolve, reject) => {
                  const xhr = new XMLHttpRequest();
                  xhr.open('GET', endpoints.chats, true);
                  xhr.setRequestHeader('Content-Type', 'application/json');
                  xhr.setRequestHeader('Authorization', 'Bearer ' + token);
                  xhr.onload = () => {
                      if (xhr.status !== 200) return reject('🤖 chatgpt.js >> Request failed. Cannot retrieve chat details.');
                      const data = JSON.parse(xhr.responseText).items;
                      if (data.length <= 0) return reject('🤖 chatgpt.js >> Chat list is empty.');
                      const detailsToReturn = {};

                      // Return by index if num, 'latest', or 'active' passed but not truly active
                      if (Number.isInteger(chatToGet) || chatToGet == 'latest' ||
                              (chatToGet == 'active' && !new RegExp('\/' + re_chatID.source + '$').test(window.location.href))) {
                          chatToGet = Number.isInteger(chatToGet) ? chatToGet : 0; // preserve index, otherwise get latest
                          if (chatToGet > data.length) { // reject if index out-of-bounds
                              return reject('🤖 chatgpt.js >> Chat with index ' + ( chatToGet + 1 )
                                  + ' is out of bounds. Only ' + data.length + ' chats exist!'); }
                          for (const detail of detailsToGet) detailsToReturn[detail] = data[chatToGet][detail];
                          return resolve(detailsToReturn);
                      }

                      // Return by title, ID or active chat
                      const chatIdentifier = ( // determine to check by ID or title
                          chatToGet == 'active' || new RegExp('^' + re_chatID.source + '$').test(chatToGet) ? 'id' : 'title' );
                      if (chatToGet == 'active') // replace chatToGet w/ actual ID
                          chatToGet = re_chatID.exec(window.location.href)[0];
                      let idx, chatFound; // index of potentially found chat, flag if found
                      for (idx = 0; idx < data.length; idx++) { // search for id/title to set chatFound flag
                          if (data[idx][chatIdentifier] === chatToGet) { chatFound = true; break; }}
                      if (!chatFound) // exit
                          return reject('🤖 chatgpt.js >> No chat with ' + chatIdentifier + ' = ' + chatToGet + ' found.');
                      for (const detail of detailsToGet) detailsToReturn[detail] = data[idx][detail];
                      return resolve(detailsToReturn);
                  };
                  xhr.send();
          });}

          function getChatMsgs(token) {
              return new Promise((resolve, reject) => {
                  const xhr = new XMLHttpRequest();
                  getChatDetails(token, ['id']).then(chat => {
                      xhr.open('GET', `${endpoints.chat}/${chat.id}`, true);
                      xhr.setRequestHeader('Content-Type', 'application/json');
                      xhr.setRequestHeader('Authorization', 'Bearer ' + token);
                      xhr.onload = () => {
                          if (xhr.status !== 200) return reject('🤖 chatgpt.js >> Request failed. Cannot retrieve chat messages.');

                          // Init const's
                          const data = JSON.parse(xhr.responseText).mapping; // Get chat messages
                          const userMessages = [], chatGPTMessages = [], msgsToReturn = [];

                          // Fill [userMessages]
                          for (const key in data)
                              if ('message' in data[key] && data[key].message.author.role === 'user')
                                  userMessages.push({ id: data[key].id, msg: data[key].message });
                          userMessages.sort((a, b) => a.msg.create_time - b.msg.create_time); // sort in chronological order

                          if (parseInt(msgToGet, 10) + 1 > userMessages.length) // reject if index out of bounds
                              return reject('🤖 chatgpt.js >> Message/response with index ' + ( msgToGet + 1)
                                  + ' is out of bounds. Only ' + userMessages.length + ' messages/responses exist!');

                          // Fill [chatGPTMessages]
                          for (const userMessage of userMessages) {
                              let sub = [];
                              for (const key in data) {
                                  if ('message' in data[key] && data[key].message.author.role === 'assistant' && data[key].parent === userMessage.id) {
                                      sub.push(data[key].message);
                                  }
                              }
                              sub.sort((a, b) => a.create_time - b.create_time); // sort in chronological order
                              sub = sub.map((x) => x.content.parts[0]); // pull out the messages after sorting
                              sub = sub.length === 1 ? sub[0] : sub; // convert not regenerated responses to strings
                              chatGPTMessages.push(sub); // array of arrays (length > 1 = regenerated responses)
                          }

                          if (sender === 'user') // Fill [msgsToReturn] with user messages
                              for (const userMessage in userMessages)
                                  msgsToReturn.push(userMessages[userMessage].msg.content.parts[0]);
                          else if (sender === 'chatgpt') // Fill [msgsToReturn] with ChatGPT responses
                              for (const chatGPTMessage of chatGPTMessages)
                                  msgsToReturn.push(msgToGet === 'latest' ? chatGPTMessages[chatGPTMessages.length - 1] : chatGPTMessage );
                          else { // Fill [msgsToReturn] with objects of user messages and chatgpt response(s)
                              let i = 0;
                              for (const message in userMessages) {
                                  msgsToReturn.push({
                                      user: userMessages[message].msg.content.parts[0],
                                      chatgpt: msgToGet === 'latest' ? chatGPTMessages[i][chatGPTMessages[i].length - 1] : chatGPTMessages[i]
                                  });
                                  i++;
                              }
                          }
                          return resolve(msgToGet === 'all' ? msgsToReturn // if 'all' passed, return array
                                       : msgToGet === 'latest' ? msgsToReturn[msgsToReturn.length - 1] // else if 'latest' passed, return latest
                                       : msgsToReturn[msgToGet] ); // else return element of array
                      };
                      xhr.send();
          });});}
      },

      getChatInput: function() { return chatgpt.getChatBox().value; },

      getContinueGeneratingButton: function() {
          for (const formButton of document.querySelectorAll('form button')) {
              if (formButton.textContent.toLowerCase().includes('continue')) {
                  return formButton;
      }}},

      getLastPrompt: function() { return chatgpt.getChatData('active', 'msg', 'user', 'latest'); },
      getLastResponse: function() { return chatgpt.getChatData('active', 'msg', 'chatgpt', 'latest'); },

      getNewChatLink: function() {
          for (const navLink of document.querySelectorAll('nav[aria-label="Chat history"] a')) {
              if (/(new|clear) chat/i.test(navLink.text)) {
                  return navLink;
      }}},

      getRegenerateButton: function() {
          for (const formButton of document.querySelectorAll('form button')) {
              if (formButton.textContent.toLowerCase().includes('regenerate')) {
                  return formButton;
      }}},

      getResponse: function() {
      // * Returns response via DOM by index arg if OpenAI chat page is active, otherwise uses API w/ following args:        
      // chatToGet = index|title|id of chat to get (defaults to latest if '' unpassed)
      // responseToGet = index of response to get (defaults to latest if '' unpassed)
      // regenResponseToGet = index of regenerated response to get (defaults to latest if '' unpassed)

          if (window.location.href.startsWith('https://chat.openai.com/c/'))
              return chatgpt.getResponseFromDOM.apply(null, arguments);
          else return chatgpt.getResponseFromAPI.apply(null, arguments);
      },

      getResponseFromAPI: function(chatToGet, responseToGet) { return chatgpt.response.getFromAPI(chatToGet, responseToGet); },
      getResponseFromDOM: function(pos) { return chatgpt.response.getFromDOM(pos); },
      getSendButton: function() { return document.querySelector('form button[class*="bottom"]'); },

      getStopGeneratingButton: function() {
          for (const formButton of document.querySelectorAll('form button')) {
              if (formButton.textContent.toLowerCase().includes('stop')) {
                  return formButton;
      }}},

      getUserLanguage: function() {
          return navigator.languages[0] || navigator.language || navigator.browserLanguage ||
              navigator.systemLanguage || navigator.userLanguage || ''; },

      history: {
          isOn: function() {
              for (const navLink of document.querySelectorAll('nav[aria-label="Chat history"] a')) {
                  if (/clear chat/i.test(navLink.text)) return false;
              } return true;
          },
          isOff: function() { return !this.isOn(); },
          activate: function() { this.isOff() ? this.toggle() : console.info('Chat history is already enabled!'); },
          deactivate: function() { this.isOn() ? this.toggle() : console.info('Chat history is already disabled!'); },
          toggle: function() {                
              for (const navBtn of document.querySelectorAll('nav[aria-label="Chat history"] button')) {
                  if (/chat history/i.test(navBtn.textContent))
                      navBtn.click(); return;
          }}
      },

      instructions: {
      // NOTE: DOM is not updated to reflect new instructions added/removed or toggle state (until session refresh)

          add: function(instruction, target) {
              if (!instruction) return console.error('Please provide an instruction');
              if (typeof instruction !== 'string') return console.error('Instruction must be a string');
              const validTargets = ['user', 'chatgpt']; // valid targets
              if (!target) return console.error('Please provide a valid target!');
              if (typeof target !== 'string') return console.error('Target must be a string');
              target = target.toLowerCase(); // lowercase target
              if (!validTargets.includes(target))
                  return console.error(`Invalid target ${target}. Valid targets are [${validTargets}]`);

              instruction = `\n\n${instruction}`; // add 2 newlines to the new instruction

              return new Promise((resolve) => {
                  chatgpt.getAccessToken().then(async token => {
                      const instructionsData = await this.fetchData();

                      // Concatenate old instructions with new instruction
                      if (target === 'user') instructionsData.about_user_message += instruction;
                      else if (target === 'chatgpt') instructionsData.about_model_message += instruction;

                      await this.sendRequest('POST', token, instructionsData);
                      return resolve();
                  });
              });
          },

          clear: function(target) {
              const validTargets = ['user', 'chatgpt']; // valid targets
              if (!target) return console.error('Please provide a valid target!');
              if (typeof target !== 'string') return console.error('Target must be a string');
              target = target.toLowerCase(); // lowercase target
              if (!validTargets.includes(target))
                  return console.error(`Invalid target ${target}. Valid targets are [${validTargets}]`);

              return new Promise((resolve) => {
                  chatgpt.getAccessToken().then(async token => {
                      const instructionsData = await this.fetchData();

                      // Clear target's instructions
                      if (target === 'user') instructionsData.about_user_message = '';
                      else if (target === 'chatgpt') instructionsData.about_model_message = '';

                      await this.sendRequest('POST', token, instructionsData);
                      return resolve();
                  });});
          },

          fetchData: function() {
          // INTERNAL METHOD
              return new Promise((resolve) => {
                  chatgpt.getAccessToken().then(async token => {
                      return resolve(await this.sendRequest('GET', token)); // Return API data
                  });});
          },

          sendRequest: function(method, token, body) {
          // INTERNAL METHOD
              // Validate args
              for (let i = 0; i < arguments.length - 1; i++) if (typeof arguments[i] !== 'string')
                  return console.error(`Argument ${ i + 1 } must be a string`);
              const validMethods = ['POST', 'GET'];
              method = (method || '').trim().toUpperCase();
              if (!method || !validMethods.includes(method)) // reject if not valid method
                  return console.error(`Valid methods are ${ validMethods }`);
              if (!token) return console.error('Please provide a valid access token!');
              if (body && typeof body !== 'object') // reject if body is passed but not an object
                  return console.error(`Invalid body data type. Got ${ typeof body }, expected object`);

              return new Promise((resolve, reject) => {
                  const xhr = new XMLHttpRequest();
                  xhr.open(method, endpoints.instructions, true);
                  // Set headers
                  xhr.setRequestHeader('Accept-Language', 'en-US');
                  xhr.setRequestHeader('Authorization', 'Bearer ' + token);
                  if (method === 'POST') xhr.setRequestHeader('Content-Type', 'application/json');

                  xhr.onload = () => {
                      const responseData = JSON.parse(xhr.responseText);
                      if (xhr.status === 422)
                          return reject('🤖 chatgpt.js >> Character limit exceeded. Custom instructions can have a maximum length of 1500 characters.');
                      else if (xhr.status === 403 && responseData.detail.reason === 'content_policy')
                          return reject('🤖 chatgpt.js >> ' + responseData.detail.description);
                      else if (xhr.status !== 200)
                          return reject('🤖 chatgpt.js >> Request failed. Cannot contact custom instructions endpoint.');
                      console.info(`Custom instructions successfully contacted with method ${ method }`);
                      return resolve(responseData || {}); // return response data no matter what the method is
                  };
                  xhr.send(JSON.stringify(body) || ''); // if body is passed send it, else just send the request
              });
          },

          turnOff: function() {
              return new Promise((resolve) => {
                  chatgpt.getAccessToken().then(async token => {
                      const instructionsData = await this.fetchData();
                      instructionsData.enabled = false;
                      await this.sendRequest('POST', token, instructionsData);
                      return resolve();
                  });
              });
          },

          turnOn: function() {
              return new Promise((resolve) => {
                  chatgpt.getAccessToken().then(async token => {
                      const instructionsData = await this.fetchData();
                      instructionsData.enabled = true;
                      await this.sendRequest('POST', token, instructionsData);
                      return resolve();
                  });
              });
          },

          toggle: function() {
              return new Promise((resolve) => {
                  this.fetchData().then(async instructionsData => {
                      await (instructionsData.enabled ? this.turnOff() : this.turnOn());
                      return resolve();
                  });});
          }
      },

      isDarkMode: function() { return document.documentElement.classList.contains('dark'); },

      isFullScreen: function() {
          const userAgentStr = navigator.userAgent;
          return userAgentStr.includes('Chrome') ? window.matchMedia('(display-mode: fullscreen)').matches
               : userAgentStr.includes('Firefox') ? window.fullScreen
               : /MSIE|rv:/.test(userAgentStr) ? document.msFullscreenElement : document.webkitIsFullScreen;
      },

      isIdle: function() {
          return new Promise(resolve => {
              const intervalId = setInterval(() => {
                  if (chatgpt.getRegenerateButton()) {
                      clearInterval(intervalId); resolve();
      }}, 100);});},

      isLoaded: function() {
          return new Promise(resolve => {
              const intervalId = setInterval(() => {
                  if (document.querySelector('nav button[id*="menu"]')) {
                      clearInterval(intervalId); resolve();
      }}, 100);});},

      isLightMode: function() { return document.documentElement.classList.contains('light'); },

      logout: function() { window.location.href = 'https://chat.openai.com/auth/logout'; },

      menu: {
          elements: [],
          addedEvent: false,

          append: function(element, attrs = {}) {
          // element = 'button' | 'dropdown' REQUIRED (no default value)
          // attrs = { ... }
          // attrs for 'button': 'icon' = src string, 'label' = string, 'onclick' = function
          // attrs for 'dropdown': 'items' = [ { text: string, value: string }, ... ] array of objects
          // where 'text' is the displayed text of the option and 'value' is the value of the option
                  const validElements = ['button', 'dropdown'];
                  if (!element || typeof element !== 'string') // Element not passed or invalid type
                      return console.error('🤖 chatgpt.js >> Please supply a valid string element name!');
                  element = element.toLowerCase();
                  if (!validElements.includes(element)) // Element not in list
                      return console.error(`🤖 chatgpt.js >> Invalid element! Valid elements are [${validElements}]`);

                  const newElement = document.createElement(
                      element === 'dropdown' ? 'select' :
                      element === 'button' ? 'a' : element
                  );
                  newElement.id = Math.floor(chatgpt.randomFloat() * 1000000) + Date.now(); // Add random id to the element

                  if (element === 'button') {
                      newElement.textContent = attrs?.label && typeof attrs.label === 'string'
                          ? attrs.label
                          : 'chatgpt.js button';

                      const icon = document.createElement('img');
                      icon.src = attrs?.icon && typeof attrs.icon === 'string' // Can also be base64 encoded image string
                          ? attrs.icon // Add icon to button element if given, else default one
                          : 'https://raw.githubusercontent.com/KudoAI/chatgpt.js/main/starters/chrome/extension/icons/icon128.png';
                      icon.width = 18;
                      newElement.insertBefore(icon, newElement.firstChild);

                      newElement.onclick = attrs?.onclick && typeof attrs.onclick === 'function'
                          ? attrs.onclick
                          : function() {};
                  }

                  else if (element === 'dropdown') {
                      if (!attrs?.items || // There no are options to add 
                          !Array.isArray(attrs.items) || // It's not an array
                          !attrs.items.length) // The array is empty
                              attrs.items = [{ text: '🤖 chatgpt.js option', value: 'chatgpt.js option value' }]; // Set default dropdown entry
      
                      if (!attrs.items.every(el => typeof el === 'object')) // The entries of the array are not objects
                          return console.error('\'items\' must be an array of objects!');

                      newElement.style = 'background-color: #000; width: 100%; border: none;';

                      attrs.items.forEach(item => {
                          const optionElement = document.createElement('option');
                          optionElement.textContent = item?.text;
                          optionElement.value = item?.value;
                          newElement.add(optionElement);
                      });
                  }

                  function addElementsToMenu() {
                      const optionButtons = document.querySelectorAll('a[role="menuitem"]');
                      let cssClasses;
              
                      for (let navLink of optionButtons)
                          if (navLink.textContent === 'Settings') {
                              cssClasses = navLink.classList;
                              break; }

                      const headlessNav = optionButtons[0].parentNode;

                      chatgpt.menu.elements.forEach(element => {
                          element.setAttribute('class', cssClasses);
                          if (!headlessNav.contains(element))
                              try { headlessNav.insertBefore(element, headlessNav.firstChild); }
                              catch (error) { console.error(error); }
                      });}

                  this.elements.push(newElement);
                  const menuBtn = document.querySelector('nav button[id*="headless"]');
                  if (!this.addedEvent) { // To prevent adding more than one event
                      menuBtn.addEventListener('click', () => { setTimeout(addElementsToMenu, 25); });
                      this.addedEvent = true; }

                  return newElement.id; // Return the element id
              },

          close: function() {
              if (!document.querySelector('[role="menu"]')) { console.error('Menu already hidden!'); throw new Error(); }
              const menuBtn = document.querySelector('nav button[id*="headless"]');
              try { menuBtn.click(); } catch (err) { console.error('Headless menu not found'); throw new Error(); }
          },

          open: function() {
              if (document.querySelector('[role="menu"]')) { console.error('Menu already open!'); throw new Error(); }
              const menuBtn = document.querySelector('nav button[id*="headless"]');
              try { menuBtn.click(); } catch (err) { console.error('Headless menu not found'); throw new Error(); }
          }
      },

      minify: function() { chatgpt.code.minify(); },

      notify: function(msg, position, notifDuration, shadow) {
          notifDuration = notifDuration ? +notifDuration : 1.75; // sec duration to maintain notification visibility
          const fadeDuration = 0.6, // sec duration of fade-out
                vpYoffset = 23, vpXoffset = 27; // px offset from viewport border

          // Make/stylize/insert div
          const notificationDiv = document.createElement('div'); // make div
          notificationDiv.id = Math.floor(chatgpt.randomFloat() * 1000000) + Date.now();
          notificationDiv.style.cssText = ( // stylize it
                ' background-color: black ; padding: 10px ; border-radius: 8px ; ' // box style
              + ' opacity: 0 ; position: fixed ; z-index: 9999 ; font-size: 1.8rem ; color: white ; ' // visibility
              + ' -webkit-user-select: none ; -moz-user-select: none ; -ms-user-select: none ; user-select: none ; ' // disable selection
              + ( shadow ? ( 'box-shadow: -8px 13px 25px 0 ' + ( /\b(shadow|on)\b/gi.test(shadow) ? 'gray' : shadow )) : '' ));
          document.body.appendChild(notificationDiv); // insert into DOM

          // Determine div position/quadrant
          notificationDiv.isTop = !position || !/low|bottom/i.test(position);
          notificationDiv.isRight = !position || !/left/i.test(position);
          notificationDiv.quadrant = (notificationDiv.isTop ? 'top' : 'bottom')
              + (notificationDiv.isRight ? 'Right' : 'Left');

          // Store div
          notifyQueue = JSON.parse(localStorage.notifyQueue);
          notifyQueue.quadrants[notificationDiv.quadrant].push(notificationDiv.id);
          localStorage.notifyQueue = JSON.stringify(notifyQueue);

          // Position notification (defaults to top-right)
          notificationDiv.style.top = notificationDiv.isTop ? vpYoffset.toString() + 'px' : '';
          notificationDiv.style.bottom = !notificationDiv.isTop ? vpYoffset.toString() + 'px' : '';
          notificationDiv.style.right = notificationDiv.isRight ? vpXoffset.toString() + 'px' : '';
          notificationDiv.style.left = !notificationDiv.isRight ? vpXoffset.toString() + 'px' : '';

          // Reposition old notifications
          const thisQuadrantDivIDs = notifyQueue.quadrants[notificationDiv.quadrant];
          if (thisQuadrantDivIDs.length > 1) {
              try { // to move old notifications
                  for (const divId of thisQuadrantDivIDs.slice(0, -1)) { // exclude new div
                      const oldDiv = document.getElementById(divId),
                            offsetProp = oldDiv.style.top ? 'top' : 'bottom', // pick property to change
                            vOffset = +/\d+/.exec(oldDiv.style[offsetProp])[0] + 5 + oldDiv.getBoundingClientRect().height;
                      oldDiv.style[offsetProp] = `${vOffset}px`; // change prop
                  }
              } catch (err) {}
          }

          // Show notification
          notificationDiv.innerText = msg; // insert msg
          notificationDiv.style.transition = 'none'; // remove fade effect
          notificationDiv.style.opacity = 1; // show msg

          // Hide notification
          const hideDelay = ( // set delay before fading
              fadeDuration > notifDuration ? 0 // don't delay if fade exceeds notification duration
              : notifDuration - fadeDuration); // otherwise delay for difference
          notificationDiv.hideTimer = setTimeout(() => { // maintain notification visibility, then fade out
              notificationDiv.style.transition = 'opacity ' + fadeDuration.toString() + 's'; // add fade effect
              notificationDiv.style.opacity = 0; // hide notification
              notificationDiv.hideTimer = null; // prevent memory leaks
          }, hideDelay * 1000); // ...after pre-set duration

          // Destroy notification
          notificationDiv.destroyTimer = setTimeout(() => {
              notificationDiv.remove(); // remove from DOM
              notifyQueue = JSON.parse(localStorage.notifyQueue);
              notifyQueue.quadrants[notificationDiv.quadrant].shift(); // + memory
              localStorage.notifyQueue = JSON.stringify(notifyQueue); // + storage
              notificationDiv.destroyTimer = null; // prevent memory leaks
          }, Math.max(fadeDuration, notifDuration) * 1000); // ...after notification hid
      },

      obfuscate: function() { chatgpt.code.obfuscate(); },

      printAllFunctions: function() {

          // Define colors
          const colors = { // element: [light, dark]
              cmdPrompt: ['#ff00ff', '#00ff00'], // pink, green
              objName: ['#0611e9', '#f9ee16'], // blue, yellow
              methodName: ['#005aff', '#ffa500'], // blue, orange
              entryType: ['#467e06', '#b981f9'], // green, purple
              srcMethod: ['#ff0000', '#00ffff'] // red, cyan
          };
          Object.keys(colors).forEach(element => { // populate dark scheme colors if missing
              colors[element][1] = colors[element][1] ||
                  '#' + (Number(`0x1${ colors[element][0].replace(/^#/, '') }`) ^ 0xFFFFFF)
                      .toString(16).substring(1).toUpperCase(); // convert to hex
          });

          // Create [functionNames]
          const functionNames = [];
          for (const prop in this) {
              if (typeof this[prop] === 'function') {
                  const chatgptIsParent = !Object.keys(this).find(obj => Object.keys(this[obj]).includes(this[prop].name)),
                        functionParent = chatgptIsParent ? 'chatgpt' : 'other';
                  functionNames.push([functionParent, prop]);
              } else if (typeof this[prop] === 'object') {
                  for (const nestedProp in this[prop]) {
                      if (typeof this[prop][nestedProp] === 'function') {
                          functionNames.push([prop, nestedProp]);
          }}}}
          functionNames.sort(function(a, b) { return a[0].localeCompare(b[0]) || a[1].localeCompare(b[1]); });

          // Print methods
          const isDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches,
                baseFontStyles = 'font-family: monospace ; font-size: larger ; ';
          console.log('\n%c🤖 chatgpt.js methods\n', 'font-family: sans-serif ; font-size: xxx-large ; font-weight: bold');
          for (const functionName of functionNames) {
              const isChatGptObjParent = /chatgpt|other/.test(functionName[0]),
                    rootFunction = ( functionName[0] === 'chatgpt' ? this[functionName[1]].name
                      : functionName[0] !== 'other' ? functionName[0] + '.' + functionName[1]
                      : (( Object.keys(this).find(obj => Object.keys(this[obj]).includes(this[functionName[1]].name)) + '.' )
                          + this[functionName[1]].name )),
                    isAsync = this[functionName[1]]?.constructor.name === 'AsyncFunction';
              console.log('%c>> %c' + ( isChatGptObjParent ? '' : `${ functionName[0] }.%c`) + functionName[1]
                      + ' - https://chatgptjs.org/userguide/' + /(?:.*\.)?(.*)/.exec(rootFunction)[1].toLowerCase() + ( isAsync ? '-async' : '' ) + '\n%c[%c'
                  + ((( functionName[0] === 'chatgpt' && functionName[1] === this[functionName[1]].name ) || // parent is chatgpt + names match or
                      !isChatGptObjParent) // parent is chatgpt.obj
                          ? 'Function' : 'Alias of' ) + '%c: %c'
                  + rootFunction + '%c]',

                  // Styles
                  baseFontStyles + 'font-weight: bold ; color:' + colors.cmdPrompt[+isDarkMode],
                  baseFontStyles + 'font-weight: bold ;'
                      + 'color:' + colors[isChatGptObjParent ? 'methodName' : 'objName'][+isDarkMode],
                  baseFontStyles + 'font-weight: ' + ( isChatGptObjParent ? 'initial' : 'bold' ) + ';'
                      + 'color:' + ( isChatGptObjParent ? 'initial' : colors.methodName[+isDarkMode] ),
                  baseFontStyles + 'font-weight: ' + ( isChatGptObjParent ? 'bold' : 'initial' ) + ';'
                      + 'color:' + ( isChatGptObjParent ? colors.entryType[+isDarkMode] : 'initial' ),
                  baseFontStyles + 'font-weight: ' + ( isChatGptObjParent ? 'initial' : 'bold' ) + ';'
                      + 'color:' + ( isChatGptObjParent ? 'initial' : colors.entryType[+isDarkMode] ),
                  baseFontStyles + ( isChatGptObjParent ? 'font-style: italic' : 'font-weight: initial' ) + ';'
                      + 'color:' + ( isChatGptObjParent ? colors.srcMethod[+isDarkMode] : 'initial' ),
                  baseFontStyles + ( isChatGptObjParent ? 'font-weight: initial' : 'font-style: italic' ) + ';'
                      + 'color:' + ( isChatGptObjParent ? 'initial' : colors.srcMethod[+isDarkMode] ),
                  isChatGptObjParent ? '' : ( baseFontStyles + 'color: initial ; font-weight: initial' ));
          }
      },

      randomFloat: function() {
      // * Generates a random, cryptographically secure value between 0 (inclusive) & 1 (exclusive)
          const crypto = window.crypto || window.msCrypto;
          return crypto.getRandomValues(new Uint32Array(1))[0] / 0xFFFFFFFF;
      },

      refactor: function() { chatgpt.code.refactor(); },

      regenerate: function() {
          for (const formButton of document.querySelectorAll('form button')) {
              if (formButton.textContent.toLowerCase().includes('regenerate')) {
                  formButton.click(); return;
      }}},

      renderHTML: function(node) {
          const reTags = /<([a-z\d]+)\b([^>]*)>([\s\S]*?)<\/\1>/g,
                reAttributes = /(\S+)=['"]?((?:.(?!['"]?\s+(?:\S+)=|[>']))+.)['"]?/g,
                nodeContent = node.childNodes;

          // Preserve consecutive spaces + line breaks
          if (!this.renderHTML.preWrapSet) {
              node.style.whiteSpace = 'pre-wrap'; this.renderHTML.preWrapSet = true;
              setTimeout(() => { this.renderHTML.preWrapSet = false; }, 100);
          }

          // Process child nodes
          for (const childNode of nodeContent) {

              // Process text node
              if (childNode.nodeType === Node.TEXT_NODE) {
                  const text = childNode.nodeValue,
                        elems = Array.from(text.matchAll(reTags));

                  // Process 1st element to render
                  if (elems.length > 0) {
                      const elem = elems[0],
                            [tagContent, tagName, tagAttributes, tagText] = elem.slice(0, 4),
                            tagNode = document.createElement(tagName); tagNode.textContent = tagText;

                      // Extract/set attributes
                      const attributes = Array.from(tagAttributes.matchAll(reAttributes));
                      attributes.forEach(attribute => {
                          const name = attribute[1], value = attribute[2].replace(/['"]/g, '');
                          tagNode.setAttribute(name, value);
                      });

                      const renderedNode = this.renderHTML(tagNode); // render child elements of newly created node

                      // Insert newly rendered node
                      const beforeTextNode = document.createTextNode(text.substring(0, elem.index)),
                            afterTextNode = document.createTextNode(text.substring(elem.index + tagContent.length));

                      // Replace text node with processed nodes
                      node.replaceChild(beforeTextNode, childNode);
                      node.insertBefore(renderedNode, beforeTextNode.nextSibling);
                      node.insertBefore(afterTextNode, renderedNode.nextSibling);
                  }

              // Process element nodes recursively
              } else if (childNode.nodeType === Node.ELEMENT_NODE) this.renderHTML(childNode);
          }

          return node; // if assignment used
      },

      resend: async function() { chatgpt.send(await chatgpt.getChatData('latest', 'msg', 'user', 'latest')); },

      response: {
          get: function() {
              // * Returns response via DOM by index arg if OpenAI chat page is active, otherwise uses API w/ following args:        
              // chatToGet = index|title|id of chat to get (defaults to latest if '' unpassed)
              // responseToGet = index of response to get (defaults to latest if '' unpassed)
              // regenResponseToGet = index of regenerated response to get (defaults to latest if '' unpassed)

                  if (window.location.href.startsWith('https://chat.openai.com/c/'))
                      return this.getFromDOM.apply(null, arguments);
                  else return this.getFromAPI.apply(null, arguments);
          },

          getFromAPI: function(chatToGet, responseToGet) {
          // chatToGet = index|title|id of chat to get (defaults to latest if '' or unpassed)
          // responseToGet = index of response to get (defaults to latest if '' or unpassed)

              chatToGet = chatToGet || 'latest'; responseToGet = responseToGet || 'latest';
              return chatgpt.getChatData(chatToGet, 'msg', 'chatgpt', responseToGet);
          },

          getFromDOM: function(pos) {
              const responseDivs = document.querySelectorAll('main > div > div > div > div > div[class*=group]'),
                    strPos = pos.toString().toLowerCase();
              if (/last|final/.test(strPos)) { // get last response
                  return responseDivs.length ? responseDivs[responseDivs.length - 1].textContent : '';
              } else { // get nth response
                  const nthOfResponse = (

                      // Calculate base number
                      Number.isInteger(pos) ? pos : // do nothing for integers
                      /^\d+/.test(strPos) ? /^\d+/.exec(strPos)[0] : // extract first digits for strings w/ them
                      ( // convert words to integers for digitless strings
                          /^(1|one|fir)(st)?$/.test(strPos) ? 1
                          : /^(2|tw(o|en|el(ve|f))|seco)(nd|t[yi])?(e?th)?$/.test(strPos) ? 2
                          : /^(3|th(ree|ir?))(rd|teen|t[yi])?(e?th)?$/.test(strPos) ? 3
                          : /^(4|fou?r)(teen|t[yi])?(e?th)?$/.test(strPos) ? 4
                          : /^(5|fi(ve|f))(teen|t[yi])?(e?th)?$/.test(strPos) ? 5
                          : /^(6|six)(teen|t[yi])?(e?th)?$/.test(strPos) ? 6
                          : /^(7|seven)(teen|t[yi])?(e?th)?$/.test(strPos) ? 7
                          : /^(8|eight?)(teen|t[yi])?(e?th)?$/.test(strPos) ? 8
                          : /^(9|nine?)(teen|t[yi])?(e?th)?$/.test(strPos) ? 9
                          : /^(10|ten)(th)?$/.test(strPos) ? 10 : 1 )

                      // Transform base number if suffixed
                      * ( /(ty|ieth)$/.test(strPos) ? 10 : 1 ) // x 10 if -ty/ieth
                      + ( /teen(th)?$/.test(strPos) ? 10 : 0 ) // + 10 if -teen/teenth

                  );
                  return responseDivs.length ? responseDivs[nthOfResponse - 1].textContent : '';
              }
          },

          getLast: function() { return chatgpt.getChatData('active', 'msg', 'chatgpt', 'latest'); },

          regenerate: function() {
              for (const formButton of document.querySelectorAll('form button')) {
                  if (formButton.textContent.toLowerCase().includes('regenerate')) {
                      formButton.click(); return;
          }}},

          stopGenerating: function() {
              for (const formButton of document.querySelectorAll('form button')) {
                  if (formButton.textContent.toLowerCase().includes('stop')) {
                      formButton.click(); return;
          }}}
      },

      reviewCode: function() { chatgpt.code.review(); },

      scrollToBottom: function() {
          try { document.querySelector('button[class*="cursor"][class*="bottom"]').click(); }
          catch (err) { console.error('', err); }
      },

      send: function(msg, method='') {
          for (let i = 0; i < arguments.length; i++) if (typeof arguments[i] !== 'string')
              return console.error(`Argument ${ i + 1 } must be a string!`);
          const textArea = document.querySelector('form textarea'),
                sendButton = document.querySelector('form button[class*="bottom"]');
          textArea.value = msg;
          textArea.dispatchEvent(new Event('input', { bubbles: true })); // enable send button
          const delaySend = setInterval(() => {
              if (!sendButton.hasAttribute('disabled')) { // send msg
                  method.toLowerCase() == 'click' ? sendButton.click()
                      : textArea.dispatchEvent(new KeyboardEvent('keydown', { keyCode: 13, bubbles: true }));
                  clearInterval(delaySend);
              }
          }, 25);
      },

      sendInNewChat: function(msg) {
          if (typeof msg !== 'string') return console.error('Message must be a string!');
          for (const navLink of document.querySelectorAll('nav[aria-label="Chat history"] a')) {
              if (/(new|clear) chat/i.test(navLink.text)) {
                  navLink.click(); break;
          }} setTimeout(() => { chatgpt.send(msg); }, 500);
      },

      settings: {
          scheme: {
              isDark: function() { return document.documentElement.classList.contains('dark'); },
              isLight: function() { return document.documentElement.classList.contains('light'); },
              set: function(value) {

                  // Validate value
                  const validValues = ['dark', 'light', 'system'];
                  if (!value) return console.error('Please specify a scheme value!');
                  if (!validValues.includes(value)) return console.error(`Invalid scheme value. Valid values are [${ validValues }]`);

                  // Determine scheme to set
                  let schemeToSet = value;
                  if (value === 'system') schemeToSet = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
                  localStorage.setItem('theme', value);
                  console.info(`Scheme set to ${ value.toUpperCase() }.`);

                  // Toggle scheme if necessary
                  if (!document.documentElement.classList.contains(schemeToSet)) this.toggle();
              },
              toggle: function() {
                  const [schemeToRemove, schemeToAdd] = this.isDark() ? ['dark', 'light'] : ['light', 'dark'];
                  document.documentElement.classList.replace(schemeToRemove, schemeToAdd);
                  document.documentElement.style.colorScheme = schemeToAdd;
                  localStorage.setItem('theme', schemeToAdd);
              }
          }
      },

      sentiment: async function(text, entity) {
          for (let i = 0; i < arguments.length; i++) if (typeof arguments[i] !== 'string')
              return console.error(`Argument ${ i + 1 } must be a string.`);
          chatgpt.send('What is the sentiment of the following text'
              + ( entity ? ` towards the entity ${ entity },` : '')
              + ' from strongly negative to strongly positive?\n\n' + text );
          console.info('Analyzing sentiment...');
          await chatgpt.isIdle();
          return chatgpt.getChatData('active', 'msg', 'chatgpt', 'latest');
      },

      setScheme: function(value) { chatgpt.settings.scheme.set(value); },

      shareChat: function(chatToGet, method = 'clipboard') {
      // chatToGet = index|title|id of chat to get (defaults to latest if '' or unpassed)
      // method = [ 'alert'|'clipboard' ] (defaults to 'clipboard' if '' or unpassed)

          const validMethods = ['alert', 'notify', 'notification', 'clipboard', 'copy'];
          if (!validMethods.includes(method)) return console.error(
              'Invalid method \'' + method + '\' passed. Valid methods are [' + validMethods + '].');

          return new Promise((resolve) => {
              chatgpt.getAccessToken().then(token => { // get access token
                  getChatNode(token).then(node => { // get chat node
                      makeChatToShare(token, node).then(data => {
                          confirmShareChat(token, data).then(() => {
                              if (['copy', 'clipboard'].includes(method)) navigator.clipboard.writeText(data.share_url);
                              else chatgpt.alert('🚀 Share link created!',
                                  '"' + data.title + '" is available at: <a target="blank" rel="noopener" href="'
                                      + data.share_url + '" >' + data.share_url + '</a>',
                                  [ function openLink() { window.open(data.share_url, '_blank', 'noopener'); },
                                      function copyLink() { navigator.clipboard.writeText(data.share_url); }]);
                              resolve(data.share_url);
          });});});});});

          function getChatNode(token) {
              return new Promise((resolve, reject) => {
                  const xhr = new XMLHttpRequest();
                  chatgpt.getChatData(chatToGet).then(chat => {
                      xhr.open('GET', `${ endpoints.chat }/${ chat.id }`, true);
                      xhr.setRequestHeader('Content-Type', 'application/json');
                      xhr.setRequestHeader('Authorization', 'Bearer ' + token);
                      xhr.onload = () => {
                          if (xhr.status !== 200)
                              return reject('🤖 chatgpt.js >> Request failed. Cannot retrieve chat node.');
                          return resolve(JSON.parse(xhr.responseText).current_node); // chat messages until now
                      };
                      xhr.send();
          });});}

          function makeChatToShare(token, node) {
              return new Promise((resolve, reject) => {
                  const xhr = new XMLHttpRequest();
                  chatgpt.getChatData(chatToGet).then(chat => {
                      xhr.open('POST', endpoints.share_create, true);
                      xhr.setRequestHeader('Content-Type', 'application/json');
                      xhr.setRequestHeader('Authorization', 'Bearer ' + token);
                      xhr.onload = () => {
                          if (xhr.status !== 200)
                              return reject('🤖 chatgpt.js >> Request failed. Cannot initialize share chat.');
                          return resolve(JSON.parse(xhr.responseText)); // return untouched data
                      };
                      xhr.send(JSON.stringify({ // request body
                          current_node_id: node, // by getChatNode
                          conversation_id: chat.id, // current chat id
                          is_anonymous: true // show user name in the conversation or not
                      }));
          });});}

          function confirmShareChat(token, data) {
              return new Promise((resolve, reject) => {
                  const xhr = new XMLHttpRequest();
                  xhr.open('PATCH', `${ endpoints.share }/${ data.share_id }`, true);
                  xhr.setRequestHeader('Content-Type', 'application/json');
                  xhr.setRequestHeader('Authorization', 'Bearer ' + token);
                  xhr.onload = () => {
                      if (xhr.status !== 200)
                          return reject('🤖 chatgpt.js >> Request failed. Cannot share chat.');
                      console.info(`Chat shared at '${ data.share_url }'`);
                      return resolve(); // the response has nothing useful
                  };
                  xhr.send(JSON.stringify({ // request body
                      share_id: data.share_id,
                      highlighted_message_id: data.highlighted_message_id,
                      title: data.title,
                      is_public: true, // must be true or it'll cause a 404 error
                      is_visible: data.is_visible,
                      is_anonymous: data.is_anonymous
                  }));
          });}
      },

      sidebar: {
          elements: [],
          observer: {},

          activateObserver: function() {
              const chatHistoryNav = document.querySelector('nav[aria-label="Chat history"]'),
                  firstButton = chatHistoryNav.querySelector('a');
              if (chatgpt.history.isOff()) // Hide enable history spam div
                  try { firstButton.parentNode.nextElementSibling.style.display = 'none'; } catch (error) {}

              // Stop the previous observer to preserve resources
              if (this.observer instanceof MutationObserver)
                  try { this.observer.disconnect(); } catch (e) {}

              if (!this.elements.length) return console.error('🤖 chatgpt.js >> No elements to append!');

              let cssClasses;
              // Grab CSS from original website elements
              for (let navLink of document.querySelectorAll('nav[aria-label="Chat history"] a')) {
                  if (/.*chat/.exec(navLink.text)[0]) {
                      cssClasses = navLink.classList;
                      navLink.parentNode.style.margin = '2px 0'; // add v-margins to ensure consistency across all inserted buttons
                      break;
                  }
              }
      
              // Apply CSS to make the added elements look like they belong to the website
              this.elements.forEach(element => {
                  element.setAttribute('class', cssClasses);
                  element.style.maxHeight = element.style.minHeight = '44px'; // Fix the height of the element
                  element.style.margin = '2px 0';
              });
      
              const navBar = document.querySelector('nav[aria-label="Chat history"]');
              // Create MutationObserver instance
              this.observer = new MutationObserver(mutations => {
                  mutations.forEach(mutation => {
                      if ((mutation.type === 'childList' && mutation.addedNodes.length) ||
                          (mutation.type === 'attributes' && mutation.attributeName === 'data-chatgptjs')) // check for trigger
                          // Try to insert each element...
                          this.elements.forEach(element => {
                              // ...if it's not already present...
                              if (!navBar.contains(element))
                                  try {
                                      // ...at the top of the sidebar
                                      navBar.insertBefore(element, navBar.querySelector('a').parentNode);
                                  } catch (error) {
                                      console.error(error);
                              }});
                  });
              });

              this.observer.observe(document.documentElement, { childList: true, subtree: true, attributes: true });
          },

          append: function(element, attrs = {}) {
          // element = 'button' | 'dropdown' REQUIRED (no default value)
          // attrs = { ... }
          // attrs for 'button': 'icon' = src string, 'label' = string, 'onclick' = function
          // attrs for 'dropdown': 'items' = [ { text: string, value: string }, ... ] array of objects
          // where 'text' is the displayed text of the option and 'value' is the value of the option
              const validElements = ['button', 'dropdown'];
              if (!element || typeof element !== 'string') // Element not passed or invalid type
                  return console.error('🤖 chatgpt.js >> Please supply a valid string element name!');
              element = element.toLowerCase();
              if (!validElements.includes(element)) // Element not in list
                  return console.error(`🤖 chatgpt.js >> Invalid element! Valid elements are [${validElements}]`);

              const newElement = document.createElement(element === 'dropdown' ? 'select' : element);
              newElement.id = Math.floor(chatgpt.randomFloat() * 1000000) + Date.now(); // Add random id to the element

              if (element === 'button') {
                  newElement.textContent = attrs?.label && typeof attrs.label === 'string'
                      ? attrs.label
                      : 'chatgpt.js button';

                  const icon = document.createElement('img');
                  icon.src = attrs?.icon && typeof attrs.icon === 'string' // Can also be base64 encoded image string
                      ? attrs.icon // Add icon to button element if given, else default one
                      : 'https://raw.githubusercontent.com/KudoAI/chatgpt.js/main/starters/chrome/extension/icons/icon128.png';
                  icon.width = 18;
                  newElement.insertBefore(icon, newElement.firstChild);

                  newElement.onclick = attrs?.onclick && typeof attrs.onclick === 'function'
                      ? attrs.onclick
                      : function() {};
              }

              else if (element === 'dropdown') {
                  if (!attrs?.items || // There no are options to add 
                      !Array.isArray(attrs.items) || // It's not an array
                      !attrs.items.length) // The array is empty
                          attrs.items = [{ text: '🤖 chatgpt.js option', value: 'chatgpt.js option value' }]; // Set default dropdown entry

                  if (!attrs.items.every(el => typeof el === 'object')) // The entries of the array are not objects
                      return console.error('\'items\' must be an array of objects!');

                  attrs.items.forEach(item => {
                      const optionElement = document.createElement('option');
                      optionElement.textContent = item?.text;
                      optionElement.value = item?.value;
                      newElement.add(optionElement);
                  });
              }
                          

              // Fix for blank background on dropdown elements
              if (element === 'dropdown') newElement.style.backgroundColor = 'var(--gray-900, rgb(32, 33, 35))';

              this.elements.push(newElement);
              this.activateObserver();
              document.body.setAttribute('data-chatgptjs', 'observer-trigger'); // add attribute to trigger the observer

              return newElement.id; // Return the element id
          },

          isOn: function() { return !document.querySelector('button[aria-label*="Open sidebar"]'); },
          isOff: function() { return !!document.querySelector('button[aria-label*="Open sidebar"]'); },
          hide: function() { this.isOn() ? this.toggle() : console.info('Sidebar already hidden!'); },
          show: function() { this.isOff() ? this.toggle() : console.info('Sidebar already shown!'); },
          toggle: function() {
              for (const navLink of document.querySelectorAll('nav[aria-label="Chat history"] a')) {
                  if (/close sidebar/i.test(navLink.text)) {
                      navLink.click(); return;                
          }}}
      },

      startNewChat: function() {
          for (const navLink of document.querySelectorAll('nav[aria-label="Chat history"] a')) {
              if (/(new|clear) chat/i.test(navLink.text)) {
                  navLink.click(); return;
      }}},

      stop: function() {
          for (const formButton of document.querySelectorAll('form button')) {
              if (formButton.textContent.toLowerCase().includes('stop')) {
                  formButton.click(); return;
      }}},

      suggest: async function(ideaType, details) {
          if (!ideaType) return console.error('ideaType (1st argument) not supplied'
              + '(e.g. \'gifts\', \'names\', \'recipes\', etc.)');
          for (let i = 0; i < arguments.length; i++) if (typeof arguments[i] !== 'string')
              return console.error(`Argument ${ i + 1 } must be a string.`);
          chatgpt.send('Suggest some names. ' + ( details || '' ));
          console.info(`Creating ${ ideaType }...`);
          await chatgpt.isIdle();
          return chatgpt.getChatData('active', 'msg', 'chatgpt', 'latest');
      },

      speak: function(msg, options = {}) {
      // Usage example: chatgpt.speak(await chatgpt.getLastResponse(), { voice: 1, pitch: 2, speed: 3 })
      // options.voice = index of voices available on user device
      // options.pitch = float for pitch of speech from 0 to 2
      // options.speed = float for rate of speech from 0.1 to 10

          const { voice = 2, pitch = 2, speed = 1.1 } = options;

          // Validate args
          if (typeof msg !== 'string') return console.error('Message must be a string!');
          for (let key in options) {
              const value = options[key];
              if (typeof value !== 'number' && !/^\d+$/.test(value))
                  return console.error(`Invalid ${ key } index '${ value }'. Must be a number!`);
          }

          try { // to speak msg using {options}
              const voices = speechSynthesis.getVoices(),
                    utterance = new SpeechSynthesisUtterance();
              utterance.text = msg;
              utterance.voice = voices[voice];
              utterance.pitch = pitch;
              utterance.rate = speed;
              speechSynthesis.speak(utterance);
          } catch (err) { console.error('', err); }
      },

      summarize: async function(text) {
          if (!text) return console.error('Text (1st) argument not supplied. Pass some text!');
          if (typeof text !== 'string') return console.error('Text argument must be a string!');
          chatgpt.send('Summarize the following text:\n\n' + text);
          console.info('Summarizing text...');
          await chatgpt.isIdle();
          return chatgpt.getChatData('active', 'msg', 'chatgpt', 'latest');
      },

      toggleScheme: function() { chatgpt.settings.scheme.toggle(); },

      translate: async function(text, outputLang) {
          if (!text) return console.error('Text (1st) argument not supplied. Pass some text!');
          if (!outputLang) return console.error('outputLang (2nd) argument not supplied. Pass a language!');
          for (let i = 0; i < arguments.length; i++) if (typeof arguments[i] !== 'string')
              return console.error(`Argument ${ i + 1 } must be a string!`);
          chatgpt.send('Translate the following text to ' + outputLang 
              + '. Only reply with the translation.\n\n' + text);
          console.info('Translating text...');
          await chatgpt.isIdle();
          return chatgpt.getChatData('active', 'msg', 'chatgpt', 'latest');
      },

      unminify: function() { chatgpt.code.unminify(); },

      uuidv4: function() {
          let d = new Date().getTime(); // get current timestamp in ms (to ensure UUID uniqueness)
          const uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
              const r = ( // generate random nibble
                  ( d + (window.crypto.getRandomValues(new Uint32Array(1))[0] / (Math.pow(2, 32) - 1))*16)%16 | 0 );
              d = Math.floor(d/16); // correspond each UUID digit to unique 4-bit chunks of timestamp
              return ( c == 'x' ? r : (r&0x3|0x8) ).toString(16); // generate random hexadecimal digit
          });
          return uuid;
      },

      writeCode: function() { chatgpt.code.write(); }
  };

  chatgpt.scheme = { ...chatgpt.settings.scheme }; // copy `chatgpt.settings.scheme` methods into `chatgpt.scheme`

  // Create chatgpt.[actions]Button(identifier) functions
  const buttonActions = ['click', 'get'], targetTypes = [ 'button', 'link', 'div', 'response' ];
  for (const buttonAction of buttonActions) {
      chatgpt[buttonAction + 'Button'] = function handleButton(buttonIdentifier) {
          const button = /^[.#]/.test(buttonIdentifier) ? document.querySelector(buttonIdentifier)
              : /send/i.test(buttonIdentifier) ? document.querySelector('form button[class*="bottom"]')
              : /scroll/i.test(buttonIdentifier) ? document.querySelector('button[class*="cursor"]')
              : (function() { // get via text content
                  for (const button of document.querySelectorAll('button')) { // try buttons
                      if (button.textContent.toLowerCase().includes(buttonIdentifier.toLowerCase())) {
                          return button; }}
                  for (const navLink of document.querySelectorAll('nav a')) { // try nav links if no button
                      if (navLink.textContent.toLowerCase().includes(buttonIdentifier.toLowerCase())) {
                          return navLink; }}})();
          if (buttonAction === 'click') { button.click(); } else { return button; }
      };
  }

  // Create alias functions
  const functionAliases = [
      ['actAs', 'actas', 'act', 'become', 'persona', 'premadePrompt', 'preMadePrompt', 'prePrompt', 'preprompt', 'roleplay', 'rolePlay', 'rp'],
      ['activateAutoRefresh', 'activateAutoRefresher', 'activateRefresher', 'activateSessionRefresher',
          'autoRefresh', 'autoRefresher', 'autoRefreshSession', 'refresher', 'sessionRefresher'],
      ['deactivateAutoRefresh', 'deactivateAutoRefresher', 'deactivateRefresher', 'deactivateSessionRefresher'],
      ['detectLanguage', 'getLanguage'],
      ['executeCode', 'codeExecute'],
      ['exportChat', 'chatExport', 'export'],
      ['getLastPrompt', 'getLastQuery', 'getMyLastMsg', 'getMyLastQuery'],
      ['getTextarea', 'getTextArea', 'getChatbox', 'getChatBox'],
      ['isFullScreen', 'isFullscreen'],
      ['logOut', 'logout', 'logOff', 'logoff', 'signOut', 'signout', 'signOff', 'signoff'],
      ['minify', 'codeMinify', 'minifyCode'],
      ['new', 'newChat', 'startNewChat'],
      ['obfuscate', 'codeObfuscate', 'obfuscateCode'],
      ['printAllFunctions', 'showAllFunctions'],
      ['refactor', 'codeRefactor', 'refactorCode'],
      ['refreshSession', 'sessionRefresh'],
      ['refreshReply', 'regenerate', 'regenerateReply'],
      ['renderHTML', 'renderHtml', 'renderLinks', 'renderTags'],
      ['reviewCode', 'codeReview'],
      ['send', 'sendChat', 'sendMsg'],
      ['sendInNewChat', 'sendNewChat'],
      ['sentiment', 'analyzeSentiment', 'sentimentAnalysis'],
      ['stop', 'stopGenerating'],
      ['suggest', 'suggestion', 'recommend'],
      ['toggleScheme', 'toggleMode'],
      ['toggleAutoRefresh', 'toggleAutoRefresher', 'toggleRefresher', 'toggleSessionRefresher'],
      ['translate', 'translation', 'translator'],
      ['unminify', 'unminifyCode', 'codeUnminify'],
      ['writeCode', 'codeWrite']
  ];
  const synonyms = [
      ['activate', 'turnOn'],
      ['account', 'acct'],
      ['analyze', 'check', 'evaluate', 'review'],
      ['ask', 'send', 'submit'],
      ['chat', 'conversation', 'convo'],
      ['data', 'details'],
      ['deactivate', 'deActivate', 'turnOff'],
      ['execute', 'run'],
      ['generating', 'generation'],
      ['minify', 'uglify'],
      ['refactor', 'rewrite'],
      ['render', 'parse'],
      ['reply', 'response'],
      ['sentiment', 'attitude', 'emotion', 'feeling', 'opinion', 'perception'],
      ['speak', 'say', 'speech', 'talk', 'tts'],
      ['unminify', 'beautify', 'prettify', 'prettyPrint']
  ];
  const camelCaser = (words) => {
      return words.map((word, index) => index === 0 || word === 's' ? word : word.charAt(0).toUpperCase() + word.slice(1)).join(''); };
  for (const prop in chatgpt) {

      // Create new function for each alias
      for (const subAliases of functionAliases) {
          if (subAliases.includes(prop)) {
              if (subAliases.some(element => element.includes('.'))) {
                  const nestedFunction = subAliases.find(element => element.includes('.')).split('.')[1];
                  for (const nestAlias of subAliases) {
                      if (/^(\w+)/.exec(nestAlias)[1] !== prop) { // don't alias og function
                          chatgpt[nestAlias] = chatgpt[prop][nestedFunction]; // make new function, reference og one
              }}} else { // alias direct functions
                  for (const dirAlias of subAliases) {
                      if (dirAlias !== prop) { // don't alias og function
                          chatgpt[dirAlias] = chatgpt[prop]; // make new function, reference og one
              }}}
      }}

      do { // create new function per synonym per word per function
          var newFunctionsCreated = false;
          for (const funcName in chatgpt) {
              if (typeof chatgpt[funcName] === 'function') {
                  const funcWords = funcName.split(/(?=[A-Zs])/); // split function name into constituent words
                  for (const funcWord of funcWords) {
                      const synonymValues = [].concat(...synonyms // flatten into single array w/ word's synonyms
                          .filter(arr => arr.includes(funcWord.toLowerCase())) // filter in relevant synonym sub-arrays
                          .map(arr => arr.filter(synonym => synonym !== funcWord.toLowerCase()))); // filter out matching word
                      for (const synonym of synonymValues) { // create function per synonym
                          const newFuncName = camelCaser(funcWords.map(word => (word === funcWord ? synonym : word)));
                          if (!chatgpt[newFuncName]) { // don't alias existing functions
                              chatgpt[newFuncName] = chatgpt[funcName]; // make new function, reference og one
                              newFunctionsCreated = true;
      }}}}}} while (newFunctionsCreated); // loop over new functions to encompass all variations
  }
  // console.error = (...args) => {
  //     if (!args[0].startsWith(consolePrefix)) ogError(consolePrefix + args[0], ...args.slice(1)); 
  //     else ogError(...args);
  // };
  // console.info = (msg) => {
  //     if (!msg.startsWith(consolePrefix)) ogInfo(consolePrefix + msg);
  //     else ogInfo(msg);
  // };

  // Export chatgpt object
  try { window.chatgpt = chatgpt; } catch (err) {} // for Greasemonkey
  try { module.exports = chatgpt; } catch (err) {} // for CommonJS

  /**
   * @typedef {Object} Prompt
   * @property {string} ID
   * @property {string} Category - Activity of the prompt (e.g. "Writing")
   * @property {string} Community - Topic of the prompt (e.g. "SEO")
   * @property {string} Prompt - The prompt text
   * @property {string} PromptHint - The prompt hint text (placeholder)
   * @property {PromptTypeNo} PromptTypeNo - public, private or paid prompt
   * @property {string} Title
   * @property {string} Help
   * @property {string} Teaser
   * @property {boolean} OwnPrompt - Whether the prompt is owned by the current user
   * @property {string} RevisionTime
   * @property {string} AuthorName
   * @property {string} AuthorURL
   * @property {number} Usages
   * @property {number} Views
   * @property {number} Votes
   */

  /** @typedef {{langcode: string, languageEnglish: string, languageLabel: string}} Language */

  /** @typedef {{ID: string, Label: string}} Topic */

  /** @typedef {{ID: string, TopicID: string, Label: string}} Activity */

  const DefaultPromptActivity = 'all';
  const DefaultPromptTopic = 'all';
  const DefaultTargetLanguage = 'English*';

  const lastPromptTopicKey = 'lastPromptTopic';
  const lastTargetLanguageKey = 'lastTargetLanguage';
  const lastPageSizeKey = 'lastPageSize';

  const queryParamPromptID = 'IN_BOUND_PromptID';

  let extensionText = extensionLanguages.english;

  // The number of prompts per page in the prompt templates section
  const pageSizeOptions = [4, 8, 12, 16, 20, 24];
  const pageSizeDefault = 5000;

  const editPromptTemplateEvent = 'editPromptTemplate';
  const demoUser = 'iqbalnawaz123750@gmail.com';


  window.IN_BOUND = {
    // Save a reference to the original fetch function
    fetch: (window._fetch = window._fetch || window.fetch.bind(window) || window.fetch),

    CacheBuster: btoa(new Date().toISOString().slice(0, 16).toString()),

    Client: IN_BOUNDClient,

    feedSelect: ["All", "Favourites"],

    feedSelected: window.localStorage.feedSelected || "All",

    ExtLang: "english",

    demoInterface: false,

    access: {
      cardMenuInDots: true
    },

    feedView: window.localStorage.feedView || "grid",
    feedViewList: ["grid", "list"],

    // Set default TargetLanguage based on last used language or default to English
    TargetLanguage:
      localStorage.getItem(lastTargetLanguageKey) === null
        ? DefaultTargetLanguage
        : localStorage.getItem(lastTargetLanguageKey),

    WebAccess: localStorage.getItem('WebAccess') === null ? false : localStorage.getItem('WebAccess'),

    // Set default Tone
    Tone: null,

    // Set default WritingStyle
    WritingStyle: null,

    // Set default topic
    PromptTopic: localStorage.getItem(lastPromptTopicKey) || DefaultPromptTopic,

    // Set default activity
    PromptActivity: DefaultPromptActivity,

    // Set default sort mode
    /** @type {SortModeNo} */
    PromptSortMode: SortModeNo.TOP_VIEWS,

    // Set default search query
    PromptSearch: '',

    // Set default prompt templates type
    /** @type {PromptTemplatesType} */
    PromptTemplatesType: localStorage.getItem('PromptTemplatesType') || PromptTemplatesType.PUBLIC,

    /** @type {Prompt[]} */
    PromptTemplates: [],


    FavouritePromptTemplates: [],
    PinPromptTemplates: [],
    forkPromptTemplates: [],
    activePromptID: "",
    themeMode: "",
    ToneCategories: [],
    DefaultTones: [],
    userTones: [],
    tonesOrderLocal: [],
    promptsOrderLocal: [],
    ToneCategorySelected: "",
    InputToneCategorySelected: "",
    promptVariables: [],
    settingsActiveTab: "settings",
    editActivatedTonesInSetting: "",
    activatedToneSelected: { title: "", tone: "" },
    searchPredictionList: [],
    webResults: [],
    current_active_prompts: [],
    Company: "",
    companyMeta: {},
    longInputText: '',
    features: company_features,
    team: {},
    allTeams: [],
    selectedTeam: localStorage.getItem('team_id'),
    usedPrompts: [],
    allCompanies: [],
    selectedCompany: sessionStorage.getItem('company_id') || '',
    savedSearchList: JSON.parse(localStorage.getItem('savedSearchList')) || [],
    chunkProcessingState: false,
    SelectedPromptTemplateID: "",
    hiddenVariations: JSON.parse(localStorage.getItem('hiddenVariations')) || [],

    runCsvChainOfPromptsState: false,

    APIEndpoint,

    companyTones: [],

    isLoading: false,

    workflowLoader: true,

    import: false,
    companyTonesState: false,
    companyToneText: "",

    /** @type {Prompt[]} */
    DefaultPromptTemplates: [],

    /** @type {Prompt[]} */
    OwnPrompts: [],

    /** @type {Language[]} */
    Languages: [],

    /** @typedef {{ID: number, Label: string}} Tone */

    /** @type {Tone[]} */
    Tone: "",
    Theme: "",

    /** @typedef {{ID: number, Label: string}} WritingStyle */

    /** @type {WritingStyle[]} */
    WritingStyles: [],

    /** @typedef {{ID: number, Label: string, Prompt: string}} ContinueAction */

    /** @type {ContinueAction[]} */
    ContinueActions: [],

    /** @type {Topic[]} */
    Topics: [],

    /** @type {Activity[]} */
    Activities: [],

    // true if admin mode is enabled
    AdminMode: false,

    // This object contains properties for the prompt templates section
    PromptTemplateSection: {
      currentPage: 0, // The current page number
      pageSize: pageSizeDefault, // The number of prompts per page
    },

    /** @type {Prompt} */
    SelectedPromptTemplate: null,

    async init() {

      this.WritingStyle = localStorage.getItem('selectedWritingStyle');
      this.TargetLanguage = localStorage.getItem(lastTargetLanguageKey);
      this.Tone = localStorage.getItem('selectedTone');
      this.SelectedPromptTemplateID = localStorage.getItem('SelectedPromptTemplateID');

      // this.injectStyleSheet()
      this.setupSidebar();
      this.folderManager.initializeFolders();
      // window.pdfjsLib.GlobalWorkerOptions.workerSrc = window.pdfjsWorker
      this.isLoading = true;
      this.showLoadingInterface("");
      // console.log('IN_BOUND init');


      this.tonesOrderLocal = JSON.parse(localStorage.getItem('tonesOrderLocal'))?.index || { index: [] };

      // Bind event handler for arrow keys
      this.boundHandleArrowKey = this.handleArrowKey.bind(this);

      await this.Client.init();

      this.replaceFetch();

      this.createObserver();

      // this.fetchMessages();


      // Wait for languages, tones, writing styles and continue actions
      await Promise.all([
        this.fetchUserDataEvent()
      ]);

      // this.insertLanguageToneWritingStyleContinueActions();
      // await this.fetchForks();


      // this.fetchPromptFromDeepLink();


      // this.sendBtnObserver();

      this.createThemeObserver();

      this.getTheme();


      // this.isLoading = false
      // this.hideLoadingInterface()
      // this.insertPromptTemplatesSection()
      // this.observeForTextareaElemChanges()
      // this.sendBtnObserverForChunks()

      this.insertConversationMenu();

      // listen for IN_BOUND.tokens event from  APP
      document.addEventListener('IN_BOUND.getRequest', async (event) => {
        this.handleGetRequestEvent(event);
      });

      document.addEventListener('IN_BOUND.postRequest', async (event) => {
        this.handlePostRequestEvent(event);
      });

      // on state change (e.g. back button) fetch the prompt from the deep link
      window.addEventListener('popstate', () => {
        this.fetchPromptFromDeepLink();
      });

      let sizes = localStorage.getItem('split-sizes');
      if (sizes) {
        sizes = JSON.parse(sizes);
      } else {
        sizes = [65, 35]; // default sizes
      }

      Split(['#__next', '#nav'], {
        sizes,
        gutterSize: 2,
        onDragEnd: function (sizes) {
          localStorage.setItem('split-sizes', JSON.stringify(sizes));
        },
      });

      const sideBarnMainDiv = document.querySelector('#__next').getElementsByClassName('overflow-hidden w-full h-full relative flex z-0')[0].children;
      sideBarnMainDiv[0].id = 'sidebar-resize';
      sideBarnMainDiv[1].id = 'chat-resize';


      // document.addEventListener('click', (event) => {
      //   const myDiv = document.getElementsByClassName('tonesList')[0] || ""
      //   if (!myDiv.contains(event.target)) {
      //     myDiv.style.display = 'none';
      //   }
      // });

      this.hidePromptCardOptionsOnClickOutside();

    },

    hidePromptCardOptions() {
      const promptCardOptions = document.getElementsByClassName('PromptCardOptions');
      Array.from(promptCardOptions)?.forEach(function (element) {
        setTimeout(() => {
          // element.classList.replace('flex','hidden') 
          // console.log('hide', element)
          element.className.indexOf('hidden') > -1 ? "" : element.className = element.className.replace('flex ', 'hidden ');
        }, 10);
      });
    },

    hidePromptCardOptionsOnClickOutside() {
      document.addEventListener('click', function (event) {
        const promptCardOptions = document.getElementsByClassName('PromptCardOptions');
        const promptCardOptionsBtn = document.querySelectorAll('#PromptCardOptionsBtn');

        // Check if the clicked element is the PromptCardOptionsBtn or its child elements
        const isClickOnPromptCardOptionsBtn = Array.from(promptCardOptionsBtn)?.some(function (element) {
          return element.contains(event.target);
        });
        // console.log('isClickOnPromptCardOptionsBtn ', isClickOnPromptCardOptionsBtn)

        // Check if the clicked element is inside any of the PromptCardOptions divs
        const isClickInsidePromptCardOptions = Array.from(promptCardOptions)?.some(function (element) {
          return element.contains(event.target);
        });

        // console.log("isClickInsidePromptCardOptions",isClickInsidePromptCardOptions)
        if (!isClickInsidePromptCardOptions && !isClickOnPromptCardOptionsBtn) {
          Array.from(promptCardOptions)?.forEach(function (element) {
            setTimeout(() => {
              // element.classList.replace('flex','hidden') 
              // console.log('hide', element)
              element.className.indexOf('hidden') > -1 ? "" : element.className = element.className.replace('flex ', 'hidden ');
            }, 10);
          });
        }

        // if(!document.querySelector('#variationButton').contains(event.target) && !document.querySelector('#variationButtonContent').contains(event.target)){
        //   document.querySelector('#variationButtonContent').className.indexOf('hidden ') > -1 ? "" : document.querySelector('#variationButtonContent').className += ' hidden'
        // }
      });
    }
    ,


    injectStyleSheet() {
      // Create a link element
      var link = document.createElement("link");
      link.rel = "stylesheet";
      link.href = `${APIEndpoint}/css/chatgpt_style`;

      // Append the link element to the head section
      document.head.appendChild(link);

    },

    changeLoadingText(txt) {
      document.querySelector('.loading-text') ? document.querySelector('.loading-text').innerHTML = txt : "";
    },


    async reloadAllData() {
      this.showLoadingInterface("loading...");
      this.fetchUserDataEvent();
      // this.hideLoadingInterface()
      this.insertPromptTemplatesSection();
      this.insertLanguageToneWritingStyleContinueActions();
    },

    // --------------------------------- Events for network requests ----------------------

    fetchUserDataEvent() {
      this.showLoadingInterface("loading...");
      this.changeLoadingText("Loading...");

      setTimeout(() => {
        this.changeLoadingText("Fetching User Data...");
      }, 1500);

      setTimeout(() => {
        this.changeLoadingText("Fetching Company Data...");
      }, 3000);

      const storedCompany = this.selectedCompany;

      if (storedCompany) {
        const url = `${APIEndpoint}/user-data-multi?user=${this.Client.User.Email}&company=${storedCompany}`;
        document.dispatchEvent(new CustomEvent('IN_BOUND.SendBgMsg', { detail: { url, type: "IN_BOUND.getRequest", returnType: "fetchUserData" }, bubbles: true }));
      } else {
        const url = `${APIEndpoint}/user-data?user=${this.Client.User.Email}`;
        document.dispatchEvent(new CustomEvent('IN_BOUND.SendBgMsg', { detail: { url, type: "IN_BOUND.getRequest", returnType: "fetchUserData" }, bubbles: true }));
      }
    },

    fetchPublicPromptsEvent(company, teamID) {
      this.changeLoadingText("Fetching Public Prompts...");
      const user = this.Client.User.Email;
      const url = `${APIEndpoint}/prompts?user=${user}&company=${company}&type=2&teamID=${teamID}`;
      document.dispatchEvent(new CustomEvent('IN_BOUND.SendBgMsg', { detail: { url, type: "IN_BOUND.getRequest", returnType: "fetchPublicPrompts" }, bubbles: true }));
    },

    fetchPrivatePromptsEvent(company, teamID) {
      this.changeLoadingText("Fetching Private Prompts...");
      const user = this.Client.User.Email;
      const url = `${APIEndpoint}/prompts?user=${user}&company=${company}&type=1&teamID=${teamID}`;
      document.dispatchEvent(new CustomEvent('IN_BOUND.SendBgMsg', { detail: { url, type: "IN_BOUND.getRequest", returnType: "fetchPrivatePrompts" }, bubbles: true }));
    },

    fetchUserVariationsEvent(company, teamID) {
      this.changeLoadingText("Fetching User Variations...");
      const user = this.Client.User.Email;
      const url = `${APIEndpoint}/variations?user=${user}&company=${company}&type=user&teamID=${teamID}`;
      document.dispatchEvent(new CustomEvent('IN_BOUND.SendBgMsg', { detail: { url, type: "IN_BOUND.getRequest", returnType: "fetchUserVariations" }, bubbles: true }));
    },

    fetchCompanyVariationsEvent(company, teamID) {
      this.changeLoadingText("Fetching Company Variations...");
      const user = this.Client.User.Email;
      const url = `${APIEndpoint}/variations?user=${user}&company=${company}&type=org&teamID=${teamID}`;
      document.dispatchEvent(new CustomEvent('IN_BOUND.SendBgMsg', { detail: { url, type: "IN_BOUND.getRequest", returnType: "fetchCompanyVariations" }, bubbles: true }));
    },

    async fetchUserPrompt(promptID, company) {
      const user = this.Client.User.Email;
      const url = `${APIEndpoint}/prompt?user=${user}&company=${company}&promptID=${promptID}`;
      document.dispatchEvent(new CustomEvent('IN_BOUND.SendBgMsg', { detail: { url, type: "IN_BOUND.getRequest", returnType: "processDeeplinkPrompt" }, bubbles: true }));
    },


    // ----------------------------------Network Requests ----------------------------

    async fetchUserData(response) {

      // console.log('fetchUserData: ', response)

      const data = JSON.parse(response);

      console.log("fetchUserData Json: ", data);

      setTimeout(() => {
        this.changeLoadingText("Fetching Prompts...");
      }, 4500);

      setTimeout(() => {
        this.changeLoadingText("Fetching Variations...");
      }, 6000);



      // let data = {}
      // try {
      //   if (storedCompany) {
      //     data = await fetch(`${APIEndpoint}/user-data-multi?user=${this.Client.User.Email}&company=${storedCompany}`).then(r => {
      //       if (r.status === 500) {
      //         window.localStorage.removeItem('company_id')
      //         window.location.reload()
      //       }
      //       return r.json()
      //     })
      //   } else {
      //     data = await fetch(`${APIEndpoint}/user-data?user=${this.Client.User.Email}`).then(r => {
      //       if (r.status === 500) {
      //         window.localStorage.removeItem('company_id')
      //         window.location.reload()
      //       }
      //       return r.json()
      //     })
      //   }
      //   //  console.log("data: ", data)

      // } catch (e) {
      //   // console.log(e)
      //   this.changeLoadingText("Reloading...")
      //   IN_BOUND.fetchUserData()

      //   return
      // }



      const { user, company, ownPrompts, publicPrompts, userVariations, companyVariations, userMulti, teams } = data;

      if (user === null) {
        sessionStorage.setItem("company_id", "");
        this.selectedCompany = null;
        this.fetchUserDataEvent();
        return
      }

      console.log("setup home");

      this.Company = user.company_email;
      this.selectedCompany = user.company_email;
      this.allCompanies = userMulti;
      this.allTeams = [{ tag: "No Team", id: "", company_id: user.company_email }, ...teams];
      ({ ...user, company: user.company_email });

      this.companyToneText = company.company_tone;
      let { dark_logo, description, email, id, light_logo, name, website, features } = company;
      this.companyMeta = { dark_logo, description, email, id, light_logo, name, website };
      this.WritingStyles = company.writing_styles?.sort((a, b) => a.label.localeCompare(b.label)).map((data, index) => {
        let { id, label, prompt } = data;
        return ({ ID: id, Label: label, Prompt: prompt })
      }) || [];
      this.ContinueActions = company.continue_actions?.sort((a, b) => a.label.localeCompare(b.label)).map((data, index) => {
        let { id, label, prompt } = data;
        return ({ ID: id, Label: label, Prompt: prompt })
      }) || [];
      this.Languages = company.languages?.sort((a, b) => a.language.localeCompare(b.language)).map((data, index) => {
        let { langcode, language, id } = data;
        return ({ langcode, languageEnglish: language, languageLabel: language, id })
      }) || [];
      this.features = features ? features : this.features;


      this.PromptTemplates = publicPrompts?.map((data, index) => ({ ...data, OwnPrompt: false, favourite: false, pin: false })).sort((a, b) => new Date(b.RevisionTime) - new Date(a.RevisionTime)) || [];
      this.DefaultPromptTemplates = this.PromptTemplates;

      this.OwnPrompts = ownPrompts?.map((data, index) => ({ ...data, OwnPrompt: true })).sort((a, b) => new Date(b.RevisionTime) - new Date(a.RevisionTime)) || [];

      this.userTones = userVariations?.map((data, index) => ({ ID: data.id, Label: data.label, Description: data.prompt, type: "user" })) || [];

      this.companyTones = companyVariations?.map((data, index) => ({ ID: data.id, Label: data.label, Description: data.prompt, type: "org" })) || [];

      if (data.user.email === demoUser) {
        window.IN_BOUND.demoInterface = true;
        this.OwnPrompts = [];
        this.userTones = [];
        this.companyTones = [];
        window.localStorage.setItem('PromptTemplatesType', "public");
        this.features.copy.allow = false;
        this.features.add_prompt.allow = false;
        this.features.favourites.allow = false;
        this.features.reload.allow = false;
        this.features.private_prompts.allow = false;
        this.features.setting.allow = false;
        this.features.import_export.allow = false;
      }

      const selectedTone = window.localStorage.getItem('selectedTone');
      if (selectedTone) {
        this.Tone = selectedTone;
      }



      this.workflowLoader = false;
      this.isLoading = false;

      // this.showPrivactTermsBanner()

      this.fetchPromptFromDeepLink();
      this.insertPromptTemplatesSection();
      this.insertLanguageToneWritingStyleContinueActions();
    },

    async fetchPublicPrompts(response) {

      // console.log('fetchPublicPrompts: ', response)
      const res = JSON.parse(response);
      // console.log('fetchPublicPrompts: ', res)

      // const user = this.Client.User.Email
      // const res_0 = await fetch(`${APIEndpoint}/prompts?user=${user}&company=${company}&type=2&teamID=${teamID}`)
      // const res = await res_0.json()

      this.PromptTemplates = res.documents.map((data, index) => ({ ...data, OwnPrompt: false, favourite: false, pin: false })).sort((a, b) => new Date(b.RevisionTime) - new Date(a.RevisionTime));
      this.DefaultPromptTemplates = this.PromptTemplates;

      this.insertPromptTemplatesSection();

      // console.log(res)
    },

    async fetchPrivatePrompts(response) {
      // this.changeLoadingText("Fetching User Prompts...")

      // console.log("fetchPrivatePrompts: ", response)
      const res = JSON.parse(response);
      // console.log("fetchPrivatePrompts: ", res)

      // const user = this.Client.User.Email
      // const res_0 = await fetch(`${APIEndpoint}/prompts?user=${user}&company=${company}&type=1&teamID=${teamID}`)
      // const res = await res_0.json()
      this.OwnPrompts = res.documents.map((data, index) => ({ ...data, OwnPrompt: true })).sort((a, b) => new Date(b.RevisionTime) - new Date(a.RevisionTime));
      // console.log(res)
      this.insertPromptTemplatesSection();
    },

    async fetchUserVariations(response) {
      // this.changeLoadingText("Fetching User Variations...")
      // console.log("fetchUserVariations: ", response)
      const res = JSON.parse(response);
      // console.log("fetchUserVariations: ", res)

      // const user = this.Client.User.Email
      // const res_0 = await fetch(`${APIEndpoint}/variations?user=${user}&company=${company}&type=user&teamID=${teamID}`)
      // const res = await res_0.json()
      this.userTones = res.documents.map((data, index) => ({ ID: data.id, Label: data.label, Description: data.prompt, type: "user" }));
      // console.log(res)

      // this.insertPromptTemplatesSection();
      this.showSettingModal();
    },

    async fetchCompanyVariations(response) {
      // this.changeLoadingText("Fetching Org Variations...")

      // console.log("fetchCompanyVariations: ", response)
      const res = JSON.parse(response);
      // console.log("fetchCompanyVariations: ", res)

      // const user = this.Client.User.Email
      // const res_0 = await fetch(`${APIEndpoint}/variations?user=${user}&company=${company}&type=org&teamID=${teamID}`)
      // const res = await res_0.json()
      this.companyTones = res.documents.map((data, index) => ({ ID: data.id, Label: data.label, Description: data.prompt, type: "org" }));
      // console.log(res)

      this.insertPromptTemplatesSection();
    },



    pinActionForPrompt(PromptID, Vote) {
      const url = `${this.APIEndpoint}/prompts?user=${this.Client.User.Email}&company=${this.Company}&id=${PromptID}`;
      const options = { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ pin: Vote === 1 }) };
      document.dispatchEvent(new CustomEvent('IN_BOUND.SendBgMsg', { detail: { url, options, type: "IN_BOUND.postRequest", returnType: "pinActionForPrompt" }, bubbles: true }));

      // return (
      //   fetch(`${this.APIEndpoint}/prompts?user=${this.Client.User.Email}&company=${this.Company}&id=${PromptID}`, {
      //     method: 'POST',
      //     headers: {
      //       'Content-Type': 'application/json'
      //     },
      //     body: JSON.stringify({
      //       pin: Vote === 1
      //     }),
      //   })
      //     // check if response is OK
      //     .then((res) => {
      //       if (!res.ok) {
      //         throw new Error('Network response was not OK');
      //       }

      //       return res;
      //     })
      // );
    },

    // ----------------------------------Network Requests ----------------------------


    getTheme() {
      this.Theme = document.documentElement.style.colorScheme;
    },

    handleGetRequestEvent(ev) {
      // console.log("Got in Main App: ",ev.detail)
      let searchDiv = document.createElement('div');
      searchDiv.innerHTML = ev.detail.data;
      ev.detail;
      const rawData = ev.detail.data;
      // console.log(rawOBJ)

      // Extract Search Results
      // let searchEnguine = searchDiv?.querySelector('#b_results')?.children ? "bing" : searchDiv.querySelector('#search')? "googlenews" : "ddg"

      this.hideLoadingInterface();

      if (ev.detail.returnType === "getBingResults") {
        this.processBingResults(rawData);
      } else if (ev.detail.returnType === "getDdgResults") {
        this.processDDGResults(rawData);
      } else if (ev.detail.returnType === "getGoogleNewsResults") {
        this.processGoogleNewsResults(rawData);
      } else if (ev.detail.returnType === "getWebContentResults") {
        this.processWebContentResults(rawData);
      } else if (ev.detail.returnType === "fetchUserData") {
        this.fetchUserData(rawData);
      } else if (ev.detail.returnType === "fetchPublicPrompts") {
        this.fetchPublicPrompts(rawData);
      } else if (ev.detail.returnType === "fetchPrivatePrompts") {
        this.fetchPrivatePrompts(rawData);
      } else if (ev.detail.returnType === "fetchUserVariations") {
        this.fetchUserVariations(rawData);
      } else if (ev.detail.returnType === "fetchCompanyVariations") {
        this.fetchCompanyVariations(rawData);
      } else if (ev.detail.returnType === "processDeeplinkPrompt") {
        this.processDeeplinkPrompt(rawData);
      } else if (ev.detail.returnType === "getCsvSheetResults") {
        Papa.parse(rawData, {
          header: true,
          complete: function (result) {
            console.log(result.data);
            const chainOfPrompts = result.data.map((d, i) => ({ ...d, index: i, completed: false, chatgptResponse: "" }));
            localStorage.setItem('chainOfPrompts', JSON.stringify(chainOfPrompts));
            IN_BOUND.runCsvChainOfPromptsState = true;
            IN_BOUND.runCsvChainOfPrompts(0);
            IN_BOUND.hideModal('variablesModal');
          },
          error: function (error) {
            console.error(error);
            chatgpt.notify('Restricted access given!', 'top right', 8, 'on');
          }
        });
      }

      // console.log(this.webResults)


      // console.log(this.SelectedPromptTemplate.Prompt)
      // this.showNotification(
      //   NotificationSeverity.SUCCESS,
      //   'Results added!'
      // );
    },


    handlePostRequestEvent(ev) {

      ev.detail;

      this.showNotification(
        NotificationSeverity.SUCCESS,
        'Changes saved!'
      );

      this.hideLoadingInterface();

      if (ev.detail.returnType === "pinActionForPrompt") {
        this.fetchPrivatePromptsEvent(this.Company, this.selectedTeam);
      } else if (ev.detail.returnType === "voteForPrompt") {
        this.fetchPrivatePromptsEvent(this.Company, this.selectedTeam);
      }
      else if (ev.detail.returnType === "savePrompt") {
        this.fetchPrivatePromptsEvent(this.Company, this.selectedTeam);
      } else if (ev.detail.returnType === "saveNewTone") {
        this.fetchUserVariationsEvent(this.Company, this.selectedTeam);
        this.showSettingModal();
      } else if (ev.detail.returnType === "saveEditTone") {
        this.fetchUserVariationsEvent(this.Company, this.selectedTeam);
        this.showSettingModal();
      } else if (ev.detail.returnType === "deleteTone") {
        this.fetchUserVariationsEvent(this.Company, this.selectedTeam);
        this.showSettingModal();
      } else if (ev.detail.returnType === "deletePrompt") {
        this.fetchPrivatePromptsEvent(this.Company, this.selectedTeam);
      }


    },

    processBingResults(data) {
      let searchDiv = document.createElement('div');
      searchDiv.innerHTML = data;

      let allElems = Array.from(searchDiv?.querySelector('#b_results')?.children);
      allElems?.forEach(elem => {
        let text = elem?.querySelector('p')?.innerText.slice(3, -3);
        let url = elem?.querySelector('a')?.href;
        text ? this.webResults.push({ text, url }) : "";
      });

      let prompt = this.SelectedPromptTemplate.Prompt;

      let searchResultsExtract = this.webResults.map((s, i) => `[${i + 1}] ${s.text} (URL: ${s.url})`).slice(0, 4).join('\n');
      const promptRefine = prompt.split('{{BingSearch');
      prompt = promptRefine[0] + searchResultsExtract + promptRefine[1].split('}}')[1];
      this.SelectedPromptTemplate = { ...this.SelectedPromptTemplate, Prompt: prompt };
      // this.selectPromptTemplate(this.SelectedPromptTemplate)

      this.showNotification(
        NotificationSeverity.SUCCESS,
        'Results added!'
      );

    },

    processDDGResults(data) {
      let searchDiv = document.createElement('div');
      searchDiv.innerHTML = data;
      // console.log(searchDiv)
      IN_BOUND.searchDiv = searchDiv;

      let elems = searchDiv?.querySelector('.results')?.children || searchDiv?.querySelector('.serp__results')?.querySelectorAll('result');
      let allElems = Array.from(elems);
      allElems?.forEach(elem => {
        let text = elem?.querySelector('.result__snippet')?.innerText;
        let url = elem?.querySelector('.result__snippet')?.href;
        text ? text.length > 20 ? this.webResults.push({ text, url }) : "" : "";
      });

      // console.log(this.webResults)

      let prompt = this.SelectedPromptTemplate.Prompt;

      let searchResultsExtract = this.webResults.map((s, i) => `[${i + 1}] ${s.text} (Link:${s.url})`).slice(0, 5 + Math.floor(Math.random() * 5)).join('\n');
      const promptRefine = prompt.split('{{WebSearch');
      prompt = promptRefine[0] + searchResultsExtract + promptRefine[1].split('}}')[1];
      this.SelectedPromptTemplate = { ...this.SelectedPromptTemplate, Prompt: prompt };
      // this.selectPromptTemplate(this.SelectedPromptTemplate)

      this.showNotification(
        NotificationSeverity.SUCCESS,
        'Results added!'
      );

      return prompt
    },

    processGoogleNewsResults(data) {
      let searchDiv = document.createElement('div');
      searchDiv.innerHTML = data;
      // console.log(searchDiv)

      let elems = searchDiv?.querySelector('#search')?.querySelectorAll('a') || searchDiv?.querySelector('#main')?.querySelectorAll('a');
      // IN_BOUND.searchDiv = searchDiv
      // console.log(elems)
      let allElems = Array.from(elems);
      allElems?.forEach(elem => {
        let text = elem?.innerText;
        let url = elem?.href;
        text ? text.length > 20 ? this.webResults.push({ text, url }) : "" : "";
      });

      let prompt = this.SelectedPromptTemplate.Prompt;

      let searchResultsExtract = this.webResults.map((s, i) => `[${i + 1}] ${s.text} (Link:${s.url})`).slice(0, 5 + Math.floor(Math.random() * 5)).join('\n');
      // console.log(this.webResults)
      const promptRefine = prompt.split('{{WebNews');
      prompt = promptRefine[0] + searchResultsExtract + promptRefine[1].split('}}')[1];
      this.SelectedPromptTemplate = { ...this.SelectedPromptTemplate, Prompt: prompt };
      // this.selectPromptTemplate(this.SelectedPromptTemplate)

      this.showNotification(
        NotificationSeverity.SUCCESS,
        'Results added!'
      );

      return prompt
    },

    processWebContentResults(data) {
      let contentDiv = document.createElement('div');
      contentDiv.innerHTML = data;
      IN_BOUND.contentDiv = contentDiv;
      IN_BOUND.rawDiv = data;
      // console.log(contentDiv)

      let prompt = this.SelectedPromptTemplate.Prompt;

      const textContent_0 = this.getTextFromHTML(data);
      this.longInputText = this.sanitizeTextContent(textContent_0);


      let textContentExtract = this.longInputText;

      // console.log(textContentExtract)
      const promptRefine = prompt.split('{{WebContent');
      prompt = promptRefine[0] + textContentExtract + promptRefine[1].split('}}')[1];
      this.SelectedPromptTemplate = { ...this.SelectedPromptTemplate, Prompt: prompt };

      this.showNotification(
        NotificationSeverity.SUCCESS,
        'Results added!'
      );

    },

    processWebContentResultsFromAPI(data) {

      let prompt = this.SelectedPromptTemplate.Prompt;

      const textContent_0 = {
        ...data, "rules": [
          "Use the language that the user previously used or the language requested by the user.",
          "Respond to the user's request, which may include asking questions or requesting specific actions (such as translation, rewriting, etc.), based on the provided content.",
          "If the user does not make a request, perform the following tasks: 1. Display the title in the user's language; 2. Summarize the article content into a brief and easily understandable paragraph; 3. Depending on the content, present three thought-provoking questions or insights with appropriate subheadings. For articles, follow this approach; for code, formulas, or content not suited for questioning, this step may be skipped."
        ]
      };
      // this.longInputText = JSON.stringify(textContent_0)
      let textContentExtract = JSON.stringify(textContent_0);

      // console.log(textContentExtract)
      const promptRefine = prompt.split('{{WebContent');
      prompt = promptRefine[0] + textContentExtract + promptRefine[1].split('}}')[1];
      // console.log(prompt)
      this.SelectedPromptTemplate = { ...this.SelectedPromptTemplate, Prompt: prompt };

      this.showNotification(
        NotificationSeverity.SUCCESS,
        'Results added!'
      );

    },

    getTextFromHTML(html) {
      // Create a temporary element
      var tempEl = document.createElement('div');
      tempEl.innerHTML = html;

      // Remove script and style tags and their contents
      var scripts = tempEl.getElementsByTagName('script');
      var styles = tempEl.getElementsByTagName('style');

      for (var i = 0; i < scripts.length; i++) {
        scripts[i].parentNode.removeChild(scripts[i]);
      }

      for (var j = 0; j < styles.length; j++) {
        styles[j].parentNode.removeChild(styles[j]);
      }

      // Extract the text from the remaining HTML
      var text = tempEl.textContent || tempEl.innerText;

      // Remove leading and trailing whitespace and extra newlines
      text = text.trim().replace(/\n\s*\n/g, '\n');

      return text;
    },


    async refreshData() {
      // console.log("Refresh")
      // setTimeout(function() {
      this.fetchPrivatePromptsEvent(this.Company, this.selectedTeam);
      this.fetchPublicPromptsEvent(this.Company, this.selectedTeam);
      this.fetchUserVariationsEvent(this.Company, this.selectedTeam);
      // }.bind(this), 2000);

      // setTimeout(function() {
      // this.insertPromptTemplatesSection();
      // }.bind(this), 3000);

    },

    async refreshActions() {
      // console.log("Refresh")
      // setTimeout(function() {
      this.fetchUserVariationsEvent(this.Company, this.selectedTeam);
      // }.bind(this), 200);

      // setTimeout(function() {
      // this.insertLanguageToneWritingStyleContinueActions();
      // this.showSettingModal();
      // }.bind(this), 1000);
      return true

    },

    // get the prompt ID from the URL and select the prompt templateinsert
    async fetchPromptFromDeepLink() {
      // Get the prompt ID from the URL (IN_BOUND_PromptID)
      const promptID = new URLSearchParams(window.location.search).get(
        queryParamPromptID
      ) || this.SelectedPromptTemplateID;

      if (!promptID) {
        // If there is no prompt ID in the URL - deselect the prompt template
        this.selectPromptTemplateByIndex(null);

        return;
      }

      try {
        // Fetch the prompt using the IN_BOUND API client
        const org_id = new URLSearchParams(window.location.search).get("inbound_o_id") || IN_BOUND.Company || IN_BOUND.selectedCompany;
        await this.fetchUserPrompt(promptID, org_id);
        // if (prompt.ID) {
        //   this.selectPromptTemplate(prompt);
        // }
        // console.log("Prompt: ",prompt)
      } catch (error) {
        // console.log(error)
        this.showNotification(
          NotificationSeverity.ERROR,
          'Something went wrong. Please try again.'
        );
        return;
      }

      {
        return;
      }

      // console.log(prompt)
      // Select the prompt template

    },


    processDeeplinkPrompt(response) {

      // console.log("Deeplink prompt: ", response)
      const prompt_0 = JSON.parse(response);
      const prompt = { ...prompt_0, OwnPrompt: true };
      if (prompt.ID) {
        this.selectPromptTemplate(prompt);
      }
    },

    // Fetch the list of messages from the server
    async fetchMessages() {
      showMessage(
        await this.Client.getMessages(
          this.PromptTopic === DefaultPromptTopic ? '' : this.PromptTopic
        ),
        this.confirmMessage.bind(this),
        this.voteForMessage.bind(this)
      );
    },

    /**
     * Confirm a message using the IN_BOUND API client
     *
     * @param {string} MessageID
     * @returns {Promise<boolean>} Whether the message was confirmed successfully
     */
    async confirmMessage(MessageID) {
      try {
        await this.Client.confirmMessage(MessageID);
      } catch (error) {
        this.showNotification(
          NotificationSeverity.ERROR,
          'Something went wrong. Please try again.'
        );
        return false;
      }

      this.showNotification(
        NotificationSeverity.SUCCESS,
        'Thanks for the confirmation!'
      );

      return true;
    },

    /**
     * Vote for a message using the IN_BOUND API client
     *
     * @param {string} MessageID
     * @param {MessageVoteTypeNo} VoteTypeNo
     * @returns boolean Whether the message was voted for successfully
     */
    async voteForMessage(MessageID, VoteTypeNo) {
      try {
        await this.Client.voteForMessage(MessageID, VoteTypeNo);
      } catch (error) {
        this.showNotification(
          NotificationSeverity.ERROR,
          'Something went wrong. Please try again.'
        );
        return false;
      }

      return true;
    },

    // This function sets up the chat sidebar by adding an "Export Button" and modifying
    // the "New Chat" buttons to clear the selected prompt template when clicked
    setupSidebar() {
      // Add the "Export Button" to the sidebar
      this.addExportButton();
      // Get the "New Chat" buttons
      const buttons = this.getNewChatButtons();
      // Set the onclick event for each button to clear the selected prompt template
      buttons.forEach((button) => {
        button.onclick = () => {
          this.selectPromptTemplateByIndex(null);

          // Hide the "Continue Writing" button (no prompt selected/new chat)
          this.hideContinueActionsButton();
        };
      });


      // ----------------------------------------------

      if (!document.getElementById("nav")) {
        document.body.classList.toggle("show-nav");
        document.body.classList.toggle('split');

        // document.getElementById('__next').style.width = '80%'
        let sideBarWrapper = document.createElement('div');
        sideBarWrapper.id = 'nav';
        // sideBarWrapper.className = 'text-gray-800 w-full md:max-w-2xl lg:max-w-3xl md:flex md:flex-col px-6 dark:text-gray-100'
        // sideBarWrapper.innerHTML = `

        // <nav class="nav">
        // </nav>`
        document.body.appendChild(sideBarWrapper);
      }



    },

    createObserver() {
      // Create a new observer for the chat sidebar to watch for changes to the document body
      const observer = new MutationObserver((mutations) => {
        // For each mutation (change) to the document body
        mutations.forEach((mutation) => {
          // If the mutation is not a change to the list of child nodes, skip it
          if (mutation.type !== 'childList')
            if (mutation.addedNodes.length == 0)
              // If no new nodes were added, skip this mutation
              return;
          // Get the first added node
          const node = mutation.addedNodes[0];
          // If the node is not an element or does not have a `querySelector` method, skip it
          if (!node || !node.querySelector) return;
          // Call the `handleElementAdded` function with the added node
          this.handleElementAdded(node);
        });
      });

      // Start observing the document body for changes
      observer.observe(document.body, { subtree: true, childList: true });
    },

    createThemeObserver() {
      let targetNode = document.documentElement;

      const config = { attributes: true, childList: true, subtree: true };

      const callback = (mutationList, observer) => {
        for (const mutation of mutationList) {
          if (mutation.type === "childList") ; else if (mutation.type === "attributes") {
            let currentTheme = document.documentElement.style.colorScheme;
            if (IN_BOUND.Theme !== currentTheme) {
              IN_BOUND.Theme = currentTheme;
              IN_BOUND.insertPromptTemplatesSection();
            }

          }
        }
      };

      // Create an observer instance linked to the callback function
      const observer = new MutationObserver(callback);

      // Start observing the target node for configured mutations
      observer.observe(targetNode, config);

    },


    sendBtnObserver() {
      // console.log("observer init")
      const targetNode = document.querySelector('textarea')?.nextElementSibling;

      if (!targetNode) return

      // Options for the observer (which mutations to observe)
      const config = { attributes: true, childList: true, subtree: true };

      // Callback function to execute when mutations are observed
      const callback = (mutationList, observer) => {
        // console.log("Change!")
        for (const mutation of mutationList) {
          // console.log("Change!")
          if (mutation.type === "childList") ; else if (mutation.type === "attributes") {
            // console.log(`The ${mutation.attributeName} attribute was modified.`);
            IN_BOUND.hideLanguageToneWritingStyleContinueActions();
          }
        }
      };

      // Create an observer instance linked to the callback function
      const observer = new MutationObserver(callback);

      // Start observing the target node for configured mutations

      observer.observe(targetNode, config);

    },

    makeWideScreen() {
      const continueButton = chatgpt.getContinueGeneratingButton();
      // console.log(continueButton)
      if (continueButton) {
        continueButton.click();
      }

      const parentDivs = document.querySelectorAll('[class="p-4 justify-center text-base md:gap-6 md:py-6 m-auto"');
      Array.from(parentDivs)?.forEach(el => {
        try {
          const child = el.children[0];
          child.className = child.className.replace('max-w', ' pr-12 lkij');
        } catch (error) {
          // console.log(error)
        }

      });
    },

    insertConversationMenu() {
      this.makeWideScreen();
      const allDivs = document.getElementsByClassName('text-gray-400 flex self-end lg:self-center justify-center mt-2 gap-2 md:gap-3 lg:gap-1 lg:absolute lg:top-0 lg:translate-x-full lg:right-0 lg:mt-0 lg:pl-2 visible');
      // console.log("All Chat Boxes",allDivs.length)

      Array.from(allDivs)?.forEach((div, index) => {
        if (index % 2 === 0) {
          return
        }
        if (!div.querySelector('#chat-menu')) {
          const elem = document.createElement('button');
          elem.className = 'p-1 rounded-md hover:bg-gray-100 hover:text-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-gray-200 disabled:dark:hover:text-gray-400';
          elem.innerHTML = svg(`menu-vertical`);
          elem.id = 'chat-menu';
          div.append(elem);

          const options = document.createElement('div');
          options.className = 'hidden absolute right-1 rounded shadow-lg px-1 py-1 flex-col bg-white dark:bg-gray-800  dark:border-bg-ray-700 gap-2 justify-center  mt-1 text-gray-600 group-hover:visible';
          options.style = 'top:40px; z-index:99999; box-shadow:0 2px 5px 6px rgba(0, 0, 0, 0.1); width: 12em;';
          options.innerHTML = `
            <a title="Copy Markdown" id="copy_markdown" class=" relative flex flex-row text-sm gap-2 p-1 rounded-md hover:bg-gray-100 hover:text-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-gray-200 disabled:dark:hover:text-gray-400" >
                ${svg('copy')}
                Copy Markdown</a>

            <a title="Copy HTML" id="copy_html" class=" relative flex flex-row text-sm gap-2 p-1 rounded-md hover:bg-gray-100 hover:text-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-gray-200 disabled:dark:hover:text-gray-400" >
            ${svg('html-doc')}
            Copy HTML</a>

            <a title="Share Link" id="share_link" class=" relative flex flex-row text-sm gap-2 p-1 rounded-md hover:bg-gray-100 hover:text-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-gray-200 disabled:dark:hover:text-gray-400" >
                ${svg('Link')}
                Share Link</a>`;

          //   <a title="Save to Google Doc" id="share_g_doc" class=" relative flex flex-row text-sm gap-2 p-1 rounded-md hover:bg-gray-100 hover:text-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-gray-200 disabled:dark:hover:text-gray-400" >
          //     ${svg('document')}
          //     Save to Google Doc</a>
          // `
          options.id = 'chat-menu-options';
          elem.appendChild(options);


          elem.addEventListener('click', () => {
            options.className.split(' ').includes('hidden') ? options.className = options.className.replace('hidden ', "flex ") : options.className = options.className.replace('flex ', "hidden ");
          });

          options.querySelector('#copy_markdown')?.addEventListener('click', () => {
            let markdown = '';
            const chat = document.getElementsByClassName('group w-full text-token-text-primary border-b border-black/10');
            Array.from(chat)?.forEach((div) => {
              markdown += div.querySelector('.markdown') ? div.querySelector('.markdown').innerHTML : `<h2>${div.innerHTML}</h2>`;
            });
            markdown = IN_BOUND.htmlToMarkdown(markdown);
            // console.log(markdown)
            navigator.clipboard.writeText(markdown)
              .then(() => {
                // console.log('Copied')
                options.className = options.className.replace('flex ', 'hidden ');
                IN_BOUND.showNotification(
                  NotificationSeverity.SUCCESS,
                  'Markdown copied to clipboard!'
                );
              }).catch(() => {
                // console.log('Failed')
                IN_BOUND.showNotification(
                  NotificationSeverity.ERROR,
                  'Failed to copy Markdown to clipboard!'
                );
              });
          });

          options.querySelector('#copy_html')?.addEventListener('click', () => {
            let htmlData = '';
            const chat = document.getElementsByClassName('group w-full text-token-text-primary border-b border-black/10');
            Array.from(chat)?.forEach((div) => {
              htmlData += div.querySelector('.markdown') ? div.querySelector('.markdown').innerHTML : `<h2>${div.innerHTML}</h2>`;
            });
            navigator.clipboard.writeText(htmlData)
              .then(() => {
                // console.log('Copied')
                options.className = options.className.replace('flex ', 'hidden ');
                IN_BOUND.showNotification(
                  NotificationSeverity.SUCCESS,
                  'HTML copied to clipboard!'
                );
              }).catch(() => {
                // console.log('Failed')
                IN_BOUND.showNotification(
                  NotificationSeverity.ERROR,
                  'Failed to copy HTML to clipboard!'
                );
              });
          });

          options.querySelector('#share_link')?.addEventListener('click', () => {
            let htmlData_0 = document.getElementsByClassName('flex flex-col text-sm dark:bg-gray-800')[0];

            const tempDiv = document.createElement('div');
            tempDiv.innerHTML = htmlData_0.innerHTML;
            tempDiv.className = "flex flex-col text-sm dark:bg-gray-800";


            tempDiv.querySelector('#chat-menu')?.remove();
            tempDiv.querySelector('#chat-menu-options')?.remove();
            const iconsElements = tempDiv.getElementsByClassName('text-gray-400 flex self-end lg:self-center justify-center mt-2 gap-2 md:gap-3 lg:gap-1 lg:absolute lg:top-0 lg:translate-x-full lg:right-0 lg:mt-0 lg:pl-2 visible');
            Array.from(iconsElements)?.forEach((icon) => {
              icon.className.replace(' visible', ' hidden');
              icon.remove();
            });
            let bgFix = tempDiv.getElementsByClassName('group w-full text-gray-800 dark:text-gray-100 border-b border-black/10 dark:border-gray-900/50 dark:bg-gray-800');
            Array.from(bgFix)?.forEach((bg) => {
              bg.className = bg.className + ' bg-white dark:bg-gray-800';
            });

            const htmlData = tempDiv.innerHTML.replaceAll('/_next/image?url=https%3A%2F%2F', 'https://chat.openai.com/_next/image?url=https%3A%2F%2F');
            // console.log(htmlData)
            IN_BOUND.showNotification(
              NotificationSeverity.SUCCESS,
              'Generating link..'
            );
            // call to api to store html data
            IN_BOUND.shareLinkRandomID = crypto.randomUUID();
            const url = `${APIEndpoint}/chatgpt-conversations?id=${IN_BOUND.shareLinkRandomID}&user=${this.Client.User.Email}&company=${this.Company}&promptID=${this.SelectedPromptTemplateID}`;
            const options_1 = {
              method: 'POST',
              headers: {
                'Content-Type': 'text/plain'
              },
              body: htmlData
            };


            document.dispatchEvent(new CustomEvent('IN_BOUND.SendBgMsg', { detail: { url, options: options_1, type: "IN_BOUND.postRequest", returnType: "shareChatLink" }, bubbles: true }));


            setTimeout(function () {
              const copyUrl = ("https://api.workengine.ai/chatgpt-conversations?chatid=" + IN_BOUND.shareLinkRandomID);
              navigator.clipboard.writeText(copyUrl)
                .then(() => {
                  // console.log('Copied')
                  options.className = options.className.replace('flex ', 'hidden ');
                  IN_BOUND.showNotification(
                    NotificationSeverity.SUCCESS,
                    'Url copied to clipboard!'
                  );
                  window.open(copyUrl, '_blank');
                }).catch((e) => {
                  console.info(e);
                  IN_BOUND.showNotification(
                    NotificationSeverity.ERROR,
                    'Failed to copy Url to clipboard!'
                  );
                });
            }, 3000);



            // fetch(url, {
            //   method: 'POST',
            //   headers: {
            //     'Content-Type': 'text/plain'
            //   },
            //   body: htmlData
            // })
            //   .then(res => {
            //     if (res.ok) {
            //       const copyUrl = "https://api.workengine.ai/chatgpt-conversations?chatid=" + randomID
            //       navigator.clipboard.writeText(copyUrl)
            //         .then(() => {
            //           // console.log('Copied')
            //           options.className = options.className.replace('flex ', 'hidden ')
            //           IN_BOUND.showNotification(
            //             NotificationSeverity.SUCCESS,
            //             'Url copied to clipboard!'
            //           );
            //           window.open(copyUrl, '_blank')
            //         }).catch(() => {
            //           // console.log('Failed')
            //           IN_BOUND.showNotification(
            //             NotificationSeverity.ERROR,
            //             'Failed to copy Url to clipboard!'
            //           );
            //         })
            //     } else {
            //       // console.log('Failed')
            //       IN_BOUND.showNotification(
            //         NotificationSeverity.ERROR,
            //         'Failed to share chat!'
            //       );
            //     }
            //   })


          });
        }
      });


      setTimeout(() => {
        IN_BOUND.insertConversationMenu();
        IN_BOUND.getParsedJSONFromCodeBlock();
        IN_BOUND.checkPromptWrapper();
      }, 1000);

    },

    htmlToMarkdown(html) {
      // Remove newline characters
      // html = html.replace(/\n/g, '');

      // Replace HTML tags with Markdown equivalents
      html = html.replace(/<h1(?:[\s\S]*?)>([\s\S]*?)<\/h1>/gi, '# $1\n\n');
      html = html.replace(/<h2(?:[\s\S]*?)>([\s\S]*?)<\/h2>/gi, '## $1\n\n');
      html = html.replace(/<h3(?:[\s\S]*?)>([\s\S]*?)<\/h3>/gi, '### $1\n\n');
      html = html.replace(/<h4(?:[\s\S]*?)>([\s\S]*?)<\/h4>/gi, '#### $1\n\n');
      html = html.replace(/<h5(?:[\s\S]*?)>([\s\S]*?)<\/h5>/gi, '##### $1\n\n');
      html = html.replace(/<h6(?:[\s\S]*?)>([\s\S]*?)<\/h6>/gi, '###### $1\n\n');
      html = html.replace(/<p(?:[\s\S]*?)>([\s\S]*?)<\/p>/gi, '$1\n\n');
      html = html.replace(/<a(?:[\s\S]*?)href="(.*?)"(?:[\s\S]*?)>([\s\S]*?)<\/a>/gi, '[$2]($1)');
      html = html.replace(/<strong(?:[\s\S]*?)>([\s\S]*?)<\/strong>/gi, '**$1**');
      html = html.replace(/<em(?:[\s\S]*?)>([\s\S]*?)<\/em>/gi, '*$1*');
      html = html.replace(/<ul(?:[\s\S]*?)>([\s\S]*?)<\/ul>/gi, '$1\n');
      html = html.replace(/<ol(?:[\s\S]*?)>([\s\S]*?)<\/ol>/gi, '$1\n');
      html = html.replace(/<li(?:[\s\S]*?)>([\s\S]*?)<\/li>/gi, '- $1\n');
      html = html.replace(/<blockquote(?:[\s\S]*?)>([\s\S]*?)<\/blockquote>/gi, '> $1\n');
      html = html.replace(/<code(?:[\s\S]*?)>([\s\S]*?)<\/code>/gi, '`$1`');
      html = html.replace(/<pre(?:[\s\S]*?)>([\s\S]*?)<\/pre>/gi, '```\n$1\n```');

      // Convert code blocks
      html = html.replace(/<code(?:[\s\S]*?)>/gi, '```');
      html = html.replace(/<\/code>/gi, '```');

      // Convert table
      html = html.replace(/<table(?:[\s\S]*?)>([\s\S]*?)<\/table>/gi, '\n$1\n');

      // Convert table headers
      html = html.replace(/<th(?:[\s\S]*?)>([\s\S]*?)<\/th>/gi, '| $1 ');
      html = html.replace(/<\/th>/gi, '|');
      html = html.replace(/<tr(?:[\s\S]*?)>/gi, '|');
      html = html.replace(/<\/tr>/gi, '|\n');

      // Convert table cells
      html = html.replace(/<td(?:[\s\S]*?)>([\s\S]*?)<\/td>/gi, '| $1 ');
      html = html.replace(/<\/td>/gi, '|');

      // Remove any remaining HTML tags
      html = html.replace(/<\/?[a-z]+(?:[\s\S]*?)>/gi, '');

      return html;
    },

    checkPromptWrapper(){
      const promptWrapper = document.querySelector('#prompt-wrapper');
      if(!promptWrapper){
        this.selectPromptTemplateByIndex(null);
      }
    },

    getParsedJSONFromCodeBlock() {
      // Get all elements with the specified classes
      const elements = document.querySelectorAll('.markdown.prose.w-full.break-words.dark\\:prose-invert');
      // console.log("elements",elements)
      // Iterate through each element
      Array.from(elements).forEach((element) => {
        // console.log(element)
        if (element.querySelectorAll('#save-json').length === element.querySelectorAll('.language-json').length) ; else {
          const codeBlocks = element.querySelectorAll('.language-json');
          codeBlocks.forEach(codeBlock => {
            // console.log("codeBlock",codeBlock)
            // Check if the element contains a code block
            if (codeBlock?.className.includes('language-json')) {
              // Get the code block's content
              const code = codeBlock.textContent.trim();

              try {
                // Parse the code block content as JSON
                const json = JSON.parse(code);
                // console.log(json)
                if (json.Prompt && json.Title) {
                  // console.log('inserting...')
                  this.insertButtonCodeBlock(codeBlock, json);
                  // JSON parsing successful, return the parsed JSON object
                  // return json;
                } else {
                  // Return an error
                  console.error("Error: JSON object must contain Prompt and Title keys.");
                }


              } catch (error) {
                // JSON parsing failed, continue to the next code block
                console.error("Error: JSON object must contain Prompt and Title keys.");
                // continue;
              }
            }
          });

        }

      });

      // No JSON code block found, return null or handle accordingly
      return null;
    },

    insertButtonCodeBlock(elem, json) {
      // console.log(elem)
      // const header = elem.getElementsByClassName('flex items-center relative text-gray-200 bg-gray-800 px-4 py-2 text-xs font-sans justify-between rounded-t-md')[0]
      const header = elem.parentElement.previousElementSibling;
      if (header) {
        if (header.querySelector('#save-json')) {
          return
        } else {
          const button = document.createElement('button');
          button.classList.add('flex', 'ml-auto', 'gap-2');
          button.innerHTML = svg('save') + "Save as Template";
          // button.textContent = 'Save as Template';
          button.id = "save-json";

          // Add onClick event to log JSON of code block
          button.addEventListener('click', function () {
            if (json) {
              // console.log("Save json as Prompt Template: ", json);
              IN_BOUND.saveImportedPrompt(json);
              // header.querySelector('#save-json').style.display = 'none';
            }
          });

          header.appendChild(button);
        }

      }
    },


    sendBtnObserverForChunks() {
      const targetNode = document.querySelector('textarea')?.nextElementSibling;
      if (!targetNode) return
      const config = { attributes: true, childList: true, subtree: true };
      let chunkProcessingState = false;

      const callback = async (mutationList, observer) => {
        for (const mutation of mutationList) {
          if (mutation.type === "childList") {
            const textarea = document.querySelector('textarea');
            const button = textarea.nextElementSibling;
            if (button.children[0].className === '' && IN_BOUND.longInputText.length > 0) {
              // console.log('Observer')
              if (chunkProcessingState === false) {
                // console.log('Add Element')
                chunkProcessingState = true;
                if (IN_BOUND.longInputText.length > 0) {
                  // console.log('Next')
                  const textarea = document.querySelector("textarea[tabindex='0']");
                  if (IN_BOUND.longInputText.slice(0, 9000).length < 9000) {
                    textarea.value = IN_BOUND.longInputText.slice(0, 9000);

                    // IN_BOUND.sendBtnObserverObject.disconnect()
                  } else {
                    textarea.value = IN_BOUND.longInputText.slice(0, 9000);

                  }

                  // IN_BOUND.longInputText = IN_BOUND.longInputText.slice(9000)
                  // IN_BOUND.SelectedPromptTemplate = {...IN_BOUND.SelectedPromptTemplate, Prompt: IN_BOUND.longInputText }

                  textarea.dispatchEvent(new Event("input", { bubbles: true }));
                  if (button.disabled) {
                    button.disabled = false;
                  }
                  await new Promise((resolve) => setTimeout(resolve, 1000));
                  button.click();
                }
              }
            } else {
              chunkProcessingState = false;
            }
          }
        }
      };

      const observer = new MutationObserver(callback);
      observer.observe(targetNode, config);
      IN_BOUND.sendBtnObserverObject = observer;
    },

    copyResponse(e) {
      const copyText = e.srcElement.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.innerText;
      // console.log(copyText)
      navigator.clipboard
        .writeText(copyText)
        .then(
          // Success - copied & public
          this.showNotification(
            NotificationSeverity.SUCCESS,
            'The response was copied to your clipboard.'
          )

        );
    },

    replaceFetch() {
      window.fetch = (...t) => {

        // console.log("Tem: ",this.SelectedPromptTemplate)
        // If the request is not for the chat backend API, just use the original fetch function
        if (!t[0] || !t[0].match(EndpointConversation)) return this.fetch(...t);

        console.log("Request intercepted!");

        if (!this.SelectedPromptTemplate && (!!this.Tone || !!this.WritingStyle || !!this.TargetLanguage)) {
          const options = t[1];
          // Parse the request body from JSON
          const body = JSON.parse(options.body);

          try {

            const lastIndex = body.messages[0].content.parts.length - 1;

            const tone = this.userTones.filter((tone) => this.Tone === tone.ID)[0];

            if (tone?.Description) {
              body.messages[0].content.parts[lastIndex] += `\n\nPlease write in ${tone.Description}.`;
            }

            if (this.TargetLanguage) {
              body.messages[0].content.parts[lastIndex] += `\nPlease write in ${this.TargetLanguage} language.\n`;
            }

            if (this.WritingStyle) {
              body.messages[0].content.parts[lastIndex] += `\nPlease write in ${this.WritingStyles.find(w => w.ID === this.WritingStyle)?.Prompt} writing style.`;
            }

            // Stringify the modified request body and update the options object
            options.body = JSON.stringify(body);
            // Use the modified fetch function to make the request
            console.log("last index: ", lastIndex);
            console.log("Submit Prompt:  ", body.messages[0].content.parts[lastIndex]);
            this.selectPromptTemplateByIndex(null);
            return this.fetch(t[0], options);
          } catch (error) {
            console.log(error);
            return this.fetch(...t);
          }
        }

        // If no prompt template, tone, writing style or target language has been selected, use the original fetch function
        if (
          !this.SelectedPromptTemplate &&
          !this.Tone &&
          !this.WritingStyle &&
          !this.TargetLanguage
        ) {
          console.log("No prompt template, tone, writing style or target language selected");
          return this.fetch(...t);
        }

        console.log("processed with selected prompt");
        // Get the selected prompt template
        let template = this.SelectedPromptTemplate;
        // this.usedPrompts.push(this.SelectedPromptTemplate)


        try {
          // Get the options object for the request, which includes the request body
          const options = t[1];
          // Parse the request body from JSON
          const body = JSON.parse(options.body);
          const lastIndex = body.messages[0].content.parts.length - 1;

          if (template) {
            // Get the prompt from the request body
            const prompt = body.messages[0].content.parts[lastIndex];
            // console.log(prompt)
            this.SelectedPromptTemplateID = template.ID;
            localStorage.setItem('SelectedPromptTemplateID', template.ID);

            // if (!prompt) {
            //   return this.fetch(...t);
            // }

            // Use the default target language if no target language has been selected
            const targetLanguage = (
              this.TargetLanguage ? this.TargetLanguage : DefaultTargetLanguage
            ).replace('*', '');

            // Replace the prompt in the request body with the selected prompt template,
            // inserting the original prompt into the template and replacing the target language placeholder
            // const tone = this.userTones.filter((tone) => this.Tone?.indexOf(tone.ID) > -1 )
            if (template.Prompt.indexOf(PromptPlaceholder) === -1) {
              template.Prompt = template.Prompt + `\n${prompt}`;
            }

            body.messages[0].content.parts[lastIndex] = template.Prompt.replaceAll(
              PromptPlaceholder,
              prompt
            ).replaceAll(TargetLanguagePlaceholder, targetLanguage);

            // console.log(body.messages[0].content.parts[0], template.Prompt)

          }

          /** @type {string[]} */
          const toneWritingStyleLanguagePrompt = [];

          // If the user has selected a tone, add it to the request body
          // const tone = this.companyTonesState === 'true' 
          // ? {Description: this.companyToneText  }
          // : this.Tone
          //   ? this.userTones.find((tone) => tone.ID === this.Tone)
          //   : null;

          const tone = this.userTones.filter((tone) => this.Tone === tone.ID)[0];


          // console.log("tone",tone)

          //   console.log("Tone replacefetch: ",tone,this.companyTonesState,this.companyToneText)

          // if (tone.length > 0) {
          //   toneWritingStyleLanguagePrompt.push(
          //     `[${tone?.map((tone) => tone.Description).join(', ').toLowerCase()}] tone`
          //   );

          // }



          // If the user has selected a tone, writing style or target language, add a prompt to the request body
          if (tone?.Description) {
            body.messages[0].content.parts[lastIndex] += `\n\nPlease write in ${tone.Description}.`;
          }

          if (this.TargetLanguage) {
            body.messages[0].content.parts[lastIndex] += `\nPlease write in ${this.TargetLanguage} language.\n`;
          }

          if (this.WritingStyle) {
            body.messages[0].content.parts[lastIndex] += `\nPlease write in ${this.WritingStyles.find(w => w.ID === this.WritingStyle)?.Prompt} writing style.`;
          }

          const fullPrompt = body.messages[0].content.parts[lastIndex];
          const prompt = fullPrompt;

          // if( fullPrompt.slice(9000)?.length > 0 ){
          //   IN_BOUND.longInputText = fullPrompt.slice(9000)
          //   IN_BOUND.SelectedPromptTemplate = {...IN_BOUND.SelectedPromptTemplate, Prompt: IN_BOUND.longInputText }
          //   IN_BOUND.sendBtnObserverForChunks()
          //   // console.log('Big Prompt!')
          // }else{
          //   IN_BOUND.longInputText = fullPrompt.slice(9000)

          console.log(prompt);
          console.log("last index: ", lastIndex);
          IN_BOUND.SelectedPromptTemplate = { ...IN_BOUND.SelectedPromptTemplate, Prompt: prompt };
          // IN_BOUND.selectPromptTemplateByIndex(null);
          // }
          body.messages[0].content.parts[lastIndex] = prompt;
          // Stringify the modified request body and update the options object
          options.body = JSON.stringify(body);
          // Use the modified fetch function to make the request
          // console.log("Submit Prompt:  ", prompt)
          // Clear the selected prompt template
          this.selectPromptTemplateByIndex(null);
          return this.fetch(t[0], options);
        } catch (er) {
          // console.log('error:::', er)
          // If there was an error parsing the request body or modifying the request,
          // just use the original fetch function
          return this.fetch(...t);
        }
      };
    },

    observeForTextareaElemChanges() {
      // Select the element you want to monitor
      document.querySelector('#prompt-textarea');

      // Use a MutationObserver to monitor changes to the DOM
      const observer = new MutationObserver(mutationsList => {
        mutationsList.forEach(mutation => {
          // Check if the element is added or removed
          if (mutation.addedNodes && mutation.addedNodes.length > 0) {
            mutation.addedNodes.forEach(node => {
            });
          }

          if (mutation.removedNodes && mutation.removedNodes.length > 0) {
            mutation.removedNodes.forEach(node => {
            });
          }
        });
      });

      // Start observing changes in the entire document
      observer.observe(document, { subtree: true, childList: true });

    },

    // This function is called for each new element added to the document body
    handleElementAdded(e) {
      // If the element added is the root element for the chat sidebar, set up the sidebar
      if (
        e.id === 'headlessui-portal-root' ||
        e.id === 'language-select-wrapper'
      ) {
        this.setupSidebar();
        return;
      }

      // Disable "Export Button" when no chat were started.
      // Insert "Prompt Templates" section to the main page.
      // Insert language select and continue button above the prompt textarea input
      if (e.querySelector('h1.text-4xl')) {
        this.insertPromptTemplatesSection();
        const button = document.getElementById('export-button');
        if (button) button.style = 'pointer-events: none;opacity: 0.5';

        this.insertLanguageToneWritingStyleContinueActions();
      }

      // Enable "Export Button" when a new chat started.
      // Insert language select and continue button above the prompt textarea input
      if (document.querySelector('.xl\\:max-w-3xl')) {
        const button = document.getElementById('export-button');
        if (button) button.style = '';

        this.insertLanguageToneWritingStyleContinueActions();
      }

      // Add "Save prompt as template" button, if new prompt was added
      if (document.querySelector('.whitespace-pre-wrap')) {
        this.insertSavePromptAsTemplateButton();
      }
    },

    // Add "Save prompt as template" button to the user prompt container next to the "Edit" button
    insertSavePromptAsTemplateButton() {
      // get the first element with selector '.flex.flex-col.items-center .whitespace-pre-wrap' and no children elements
      const firstPrompt = document.querySelector(
        '.flex.flex-col.items-center .whitespace-pre-wrap:not(:has(*))'
      );

      if (!firstPrompt) {
        return;
      }

      // get parent element of the first prompt to find the "Edit" button
      const button =
        firstPrompt.parentElement.parentElement.querySelector('button');

      if (!button) {
        return;
      }

      // Allow user to continue writing from chat history
      this.showContinueActionsButton();

      let saveButton = button.parentElement.querySelector('.save-prompt-button');

      // if button already exists, skip
      if (saveButton) {
        return;
      }

      saveButton = document.createElement('button');
      saveButton.className =
        'save-prompt-button p-1 rounded-md hover:bg-gray-100 hover:text-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-gray-200 disabled:dark:hover:text-gray-400 md:invisible md:group-hover:visible';
      saveButton.title = 'Save prompt as template';
      saveButton.addEventListener('click', this.showSavePromptModal.bind(this));
      saveButton.innerHTML = svg('Save');

      // add HTML before children in button.parentElement
      button.parentElement.prepend(saveButton);
    },

    // get all available activities for the selected topic
    getActivities(TopicID = DefaultPromptTopic) {
      const currentActivities = this.Activities.filter(
        (activity) =>
          !TopicID ||
          TopicID === DefaultPromptTopic ||
          activity.TopicID === TopicID
      );

      // keep only unique activity.Label and extract activity.ID and activity.Label
      return [
        ...new Set(currentActivities.map((activity) => activity.Label)),
      ].map((label) => ({
        ID: this.Activities.find((activity) => activity.Label === label).ID,
        Label: label,
      }));
    },

    /**
     * Validate prompt template before saving
     *
     * @param {Prompt} prompt
     * @returns {boolean} true if prompt is valid
     */
    validatePrompt(prompt) {
      const errors = [];

      // find existing prompt based on ID in PromptTemplates or OwnPrompts
      const existingPrompt = [...this.PromptTemplates, ...this.OwnPrompts].find(
        (p) => p.ID === prompt.ID
      );

      // prompt type was changed between public and private
      const promptTypeChanged =
        existingPrompt && existingPrompt.PromptTypeNo !== prompt.PromptTypeNo;

      // current user cannot create any prompt template, but can edit existing prompt
      if (!this.canCreatePromptTemplate() && !existingPrompt) {
        this.cannotCreatePromptTemplateError();

        return;
      }

      // current user cannot create public prompt template, but can edit existing public prompt template
      if (
        prompt.PromptTypeNo === PromptTypeNo.PUBLIC &&
        !this.canCreatePublicPromptTemplate() &&
        (!existingPrompt || promptTypeChanged)
      ) {
        this.cannotCreatePublicPromptTemplateError();

        return;
      }

      // current user cannot create private prompt template, but can edit existing private prompt template
      if (
        prompt.PromptTypeNo === PromptTypeNo.PRIVATE &&
        !this.canCreatePrivatePromptTemplate() &&
        (!existingPrompt || promptTypeChanged)
      ) {
        this.cannotCreatePrivatePromptTemplateError();

        return;
      }

      // require AuthorName and AuthorURL if prompt is public
      if (
        prompt.PromptTypeNo === PromptTypeNo.PUBLIC &&
        (!prompt.AuthorName.trim() || !prompt.AuthorURL.trim())
      ) {
        errors.push(
          'Please identify with Author Name and URL to publish a prompt template as public.'
        );
      }

      const missingPlaceholders = [];

      // require usage of target language placeholder if prompt is public
      if (
        prompt.PromptTypeNo === PromptTypeNo.PUBLIC &&
        !prompt.Prompt.includes(TargetLanguagePlaceholder)
      ) {
        missingPlaceholders.push(TargetLanguagePlaceholder);
      }

      // require usage of prompt placeholder in prompt template
      if (!prompt.Prompt.includes(PromptPlaceholder)) {
        missingPlaceholders.push(PromptPlaceholder);
      }

      // there is at least one missing placeholder
      if (missingPlaceholders.length > 0) {
        errors.push(
          `
          Make sure you follow the Prompt Template guidelines. <br>
          You must use ${missingPlaceholders.join(' and ')} correctly. <br><br>
          Learn more <a class="underline" href="https://lrt.li/IN_BOUNDpromptguide" target="_blank" rel="noopener noreferrer">here</a>.
        `
        );
      }

      // show error notification if there are any errors
      if (errors.length > 0) {
        const errorMessage = /*html*/ `
        <div>
          <strong>Please fix the following errors:</strong> <br><br>
          ${errors.join('<br><br>')}
        </div>
      `;

        this.showNotification(NotificationSeverity.ERROR, errorMessage, false);
      }

      return errors.length === 0;
    },

    // save prompt template via API and update client state
    async savePromptAsTemplate(e) {
      // e.preventDefault();

      /** @type Prompt */
      const prompt = {};
      const formData = new FormData(e.target);

      for (const [key, value] of formData) {
        prompt[key] = value;
      }

      // console.log(prompt)

      prompt.ID = prompt.ID ? prompt.ID : window.crypto.randomUUID() || (new Date()).getTime() + Math.random().toString(16).slice(2);
      prompt.PromptTypeNo = 1;
      prompt.teamID = this.selectedTeam;
      // prompt.pin = false
      // prompt.favourite = false
      prompt.CreationTime = (new Date()).toISOString();

      prompt.PromptTypeNo = prompt.Public
        ? PromptTypeNo.PUBLIC
        : PromptTypeNo.PRIVATE;

      // re-check user status
      // await this.Client.checkUserStatus();

      // if (!this.validatePrompt(prompt)) {
      //   return;
      // }

      try {
        const savedPrompt = await this.Client.savePrompt(prompt);

        // this.refreshData();

        // Update revision time to current time
        // prompt.RevisionTime = new Date().toISOString();

        // Update existing prompt template
        if (prompt.ID) {
          // this.updatePromptsState(prompt);
        }
        // Add new prompt template to client state if it belongs to the current topic
        else if (
          this.PromptTopic === DefaultPromptTopic ||
          prompt.Community === this.PromptTopic
        ) {
          // New prompt template was created, set the ID
          // prompt.ID = savedPrompt.ID;

          // this.OwnPrompts.push(prompt);

          // Add prompt to public prompt templates if it is public
          // if (prompt.Public) {
          //   this.PromptTemplates.push(prompt);
          // }
        }
      } catch (error) {
        // console.log(error)
        this.showNotification(
          NotificationSeverity.ERROR,
          error instanceof Reaction
            ? error.message
            : 'Something went wrong. Please try again.'
        );
        return;
      }

      this.hideSavePromptModal();

      this.showNotification(
        NotificationSeverity.SUCCESS,
        'Prompt template was saved successfully to "My Prompts".'
      );

      this.insertPromptTemplatesSection();
    },

    /**
     * Update prompt templates in client state
     *
     * @param {Prompt} prompt
     */
    updatePromptsState(prompt) {
      // if topic doesn't match, remove prompt from PromptTemplates and OwnPrompts
      if (
        prompt.Community !== this.PromptTopic &&
        this.PromptTopic !== DefaultPromptTopic
      ) {
        this.PromptTemplates = this.PromptTemplates.filter(
          (template) => template.ID !== prompt.ID
        );

        this.OwnPrompts = this.OwnPrompts.filter(
          (ownPrompt) => ownPrompt.ID !== prompt.ID
        );

        return;
      }

      // find prompt in OwnPrompts by ID and update it
      this.OwnPrompts = this.OwnPrompts.map((ownPrompt) =>
        ownPrompt.ID === prompt.ID ? prompt : ownPrompt
      );

      // find the prompt in PromptTemplates by ID
      const promptTemplate = this.PromptTemplates.find(
        (template) => template.ID === prompt.ID
      );

      const isPublicPrompt = prompt.PromptTypeNo === PromptTypeNo.PUBLIC;

      // if prompt is not public and it is in PromptTemplates, remove it
      if (!isPublicPrompt && promptTemplate) {
        this.PromptTemplates = this.PromptTemplates.filter(
          (template) => template.ID !== prompt.ID
        );

        return;
      }

      // if prompt is public and it is not in PromptTemplates, add it
      if (isPublicPrompt && !promptTemplate) {
        this.PromptTemplates.push(prompt);

        return;
      }

      // if prompt is public and it is in PromptTemplates, update it
      if (isPublicPrompt && promptTemplate) {
        this.PromptTemplates = this.PromptTemplates.map((template) =>
          template.ID === prompt.ID ? prompt : template
        );
      }
    },

    /**
     * Simple notification based on ChatGPT "high demand" notification
     *
     * @param {NotificationSeverity} severity
     * @param {string} message
     * @param {boolean} autoHide
     */
    showNotification(
      severity = NotificationSeverity.SUCCESS,
      message = '',
      autoHide = true
    ) {
      const notificationElementID = 'IN_BOUND-Notification';

      let notificationElement = document.getElementById(notificationElementID);

      // if notification doesn't exist, create it
      if (!notificationElement) {
        notificationElement = document.createElement('div');
        notificationElement.id = notificationElementID;
      }

      // notificationElement.innerHTML = /*html*/ `
      //   <div style="z-index:999999999999999;" class="fixed flex justify-center w-full top-2 px-2 pointer-events-none">
      //     <div class="${
      //       severityClassName[severity]
      //     } flex flex-row inline-flex pointer-events-auto px-6 py-3 rounded-md text-white" role="alert">
      //       <div class="flex gap-4">
      //         <p class="max-w-md">${message}</p>
      //         <button>${svg('Cross')}</button>
      //       </div>
      //     </div>
      //   </div>
      // `;

      notificationElement.innerHTML = `<div style="z-index:999999999999;" class="fixed top-0 right-0 p-6 space-y-4 max-w-md">` + (severity === NotificationSeverity.SUCCESS ? `
    <div class="flex items-center bg-green-500 border-l-4 border-green-700 py-2 px-3 shadow-md mb-2">
        <div class="text-green-500 rounded-full bg-white mr-3">
            <svg width="1.8em" height="1.8em" viewBox="0 0 16 16" class="bi bi-check-circle-fill" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
              <path fill-rule="evenodd" d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM6.5 10.5L4 8l1.5-1.5L6.5 7l3-3L12 5l-5.5 5.5z"/>
            </svg>
        </div>
        <div class="text-white max-w-xs  text-xl ">
        ${message}
        </div>
    </div>`
        :
        severity === NotificationSeverity.WARNING ? `
  <div class="flex items-center bg-yellow-500 border-l-4 border-yellow-700 py-2 px-3 shadow-md mb-2">
      <div class="text-yellow-500 rounded-full bg-white mr-3">
          <svg width="1.8em" height="1.8em" viewBox="0 0 16 16" class="bi bi-exclamation-triangle-fill" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
            <path fill-rule="evenodd" d="M7.938 2.016A.13.13 0 0 1 8 2h.001a.13.13 0 0 1 .095.047l6.857 9.5a.13.13 0 0 1-.034.154l-.034.034a.13.13 0 0 1-.183 0H1.217a.13.13 0 0 1-.183 0 .13.13 0 0 1-.034-.154l6.857-9.5a.13.13 0 0 1 .08-.047ZM7.002 12a1 1 0 1 0 2 0 1 1 0 0 0-2 0Zm.82-3.466a.563.563 0 1 1-1.22 0 .562.562 0 0 1 1.22 0Z"/>
          </svg>
      </div>
      <div class="text-white max-w-xs  text-xl">
      ${message}
      </div>
  </div>`
          :
          `<div class="flex items-center bg-red-500 border-l-4 border-red-700 py-2 px-3 shadow-md mb-2">
  <div class="text-red-500 rounded-full bg-white mr-3">
      <svg width="1.8em" height="1.8em" viewBox="0 0 16 16" class="bi bi-x-circle-fill" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
        <path fill-rule="evenodd" d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM5.354 4.646a.5.5 0 1 0-.708.708L7.293 8l-2.647 2.646a.5.5 0 0 0 .708.708L8 8.707l2.646 2.647a.5.5 0 0 0 .708-.708L8.707 8l2.647-2.646a.5.5 0 0 0-.708-.708L8 7.293 5.354 4.646z"/>
      </svg>
  </div>
  <div class="text-white max-w-xs text-xl">
  ${message}
  </div>
</div>

  `) + '</div>';
      // remove notificationElement from DOM on click
      notificationElement
        .addEventListener('click', () => {
          notificationElement.remove();
        });

      // or remove notificationElement from DOM after 5 seconds
      if (autoHide) {
        setTimeout(() => {
          notificationElement.remove();
        }, 5000);
      }

      document.body.appendChild(notificationElement);
    },

    hideModal,

    hideSavePromptModal() {
      this.hideModal('savePromptModal');
    },

    // show modal to report prompt
    showReportPromptModal(PromptIndex) {
      createReportPromptModal(
        PromptIndex,
        this.PromptTemplatesType,
        this.PromptTemplates,
        this.reportPrompt.bind(this)
      );
    },

    addInputToTextarea(text) {
      const el = document.getElementById('prompt_template_area');
      el.value = el.value.slice(0, el.selectionStart) + text + el.value.slice(el.selectionEnd);
    },


    auto_grow(element) {
      element.style.height = "5px";
      element.style.height = (element.scrollHeight) + "px";
      // console.log(element.scrollHeight)
    },

    /**
     * Show modal to save prompt as template
     *
     * @param {Event|null} e
     */
    async showSavePromptModal(e, promptID, promptFull) {
      let promptTemplate = '';


      const isEditPromptEvent = e && e.type === editPromptTemplateEvent;

      // cannot add new prompt template, but still can edit existing one
      // if (!this.canCreatePromptTemplate() && !isEditPromptEvent) {
      //   this.cannotCreatePromptTemplateError();

      //   return;
      // }

      let prompt = {};
      let promptExist = false;     //used in save prompt from chat
      // get the prompt template from current chat log if showSavePromptModal was called from "Save prompt as template" button (with event)
      if (e && e.type !== editPromptTemplateEvent) {
        // get the element that triggered this onclick event
        e.target.closest('button');
        // console.log(this.activePromptID, this.DefaultPromptTemplates.filter(prompt => prompt.ID === this.activePromptID)[0] || this.OwnPrompts.filter(prompt => prompt.ID === this.activePromptID)[0])

        // get the parent element of the button (the prompt container)
        prompt = this.DefaultPromptTemplates.filter(prompt => prompt.ID === this.activePromptID)[0] || this.OwnPrompts.filter(prompt => prompt.ID === this.activePromptID)[0];
        //  console.log(prompt)
        if (prompt) {
          promptTemplate = prompt.Prompt;
          promptExist = true;
        }
      }


      let savePromptModal = document.getElementById('savePromptModal');



      // if modal does not exist, create it, add event listener on submit and append it to body
      if (!savePromptModal) {
        savePromptModal = document.createElement('div');
        savePromptModal.id = 'savePromptModal';

        savePromptModal.addEventListener(
          'submit', (e) => {
            e.preventDefault();
            // console.log(e.submitter.name)
            e.submitter.name === "savePromptAsTemplate" ? this.savePromptAsTemplate(e) : this.saveAsNewPromptTemplate(e);
          }

        );

        document.body.appendChild(savePromptModal);
      }

      // console.log("Modal: ",promptFull,promptFull?.Tone)

      savePromptModal.innerHTML = /*html*/ `
      <div style="z-index:1000;" class="fixed inset-0 text-center transition-opacity w-full ">
        <div onclick="IN_BOUND.hideModal('savePromptModal')" class="absolute bg-gray-900 inset-0 opacity-90">
        </div>

        <div class="fixed inset-0 overflow-y-auto">
          <div class="flex items-center justify-center min-h-full">
            <form id="savePromptForm">
              <input type="hidden" name="ID" ${promptID ? `value="${promptID}"` : ""}  />
              
              <div
              class="align-center bg-white dark:bg-gray-800 dark:text-gray-200 inline-block overflow-hidden sm:rounded-lg shadow-xl text-left transform transition-all"
              role="dialog" aria-modal="true" aria-labelledby="modal-headline" style="text-align: left; height: 90vh; width:90vw;">
          
                <div class="bg-white dark:bg-gray-800 px-4 pt-5 pb-4 sm:p-6 sm:pb-4 overflow-y-auto" style="height: 100%;" >
                <label>${extensionText.inputform.title.label}</label>
                  <input name="Title" type="text" ${promptExist ? `value="${sanitizeInput(prompt.Title)}"` : ""}
                    title="${extensionText.inputform.title.placeholder}" required placeholder="${extensionText.inputform.title.placeholder}" class="w-full bg-gray-100 dark:bg-gray-700 dark:border-gray-700 rounded mb-3 mt-2 p-2 w-full" />
            

                    <label>${extensionText.inputform.teaser.label}</label>
                  <textarea name="Teaser" required
                    title="${extensionText.inputform.teaser.placeholder}'"
                    class="w-full bg-gray-100 dark:bg-gray-700 dark:border-gray-700 rounded p-2 mt-2 mb-3" style="height: 71px;"
                    placeholder="${extensionText.inputform.teaser.placeholder}"> ${promptExist ? `value="${sanitizeInput(prompt.Teaser)}"` : ""}</textarea>
                    
                  <label>${extensionText.inputform.promptHint.label}</label>
                  <input name="PromptHint" required type="text"  ${promptExist ? `value="${sanitizeInput(prompt.PromptHint)}"` : ""}
                    title="${extensionText.inputform.promptHint.placeholder}"
                    class="w-full bg-gray-100 dark:bg-gray-700 dark:border-gray-700 rounded p-2 mt-2 mb-3" placeholder="${extensionText.inputform.promptHint.placeholder}" />

                  <div class=" flex gap-2 items-center justify-start  " >
                  <label >${extensionText.inputform.promptTemplate.label}</label>
                  <a title="Add [PROMPT]" style="border: 1px solid gray; cursor: hand; border-radius:4px;  border: 1px solid #b6b6b6;  color: #1b1b1b;  padding: 5px 10px; background: linear-gradient(to bottom, #fafafa, #e2e4e8); font-size: 14px; " class=" hover:bg-gray-100 hover:text-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-gray-200 disabled:dark:hover:text-gray-400" 
                    onclick="IN_BOUND.addInputToTextarea( ' [PROMPT] ' )"> [PROMPT] </a>

                    <a title="Add [TARGETLANGUAGE]" style="border: 1px solid gray; cursor: hand; border-radius:4px;  border: 1px solid #b6b6b6;  color: #1b1b1b;  padding: 5px 10px; background: linear-gradient(to bottom, #fafafa, #e2e4e8); font-size: 14px; " class=" hover:bg-gray-100 hover:text-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-gray-200 disabled:dark:hover:text-gray-400" 
                    onclick="IN_BOUND.addInputToTextarea( ' [TARGETLANGUAGE] ')"> [TARGETLANGUAGE] </a>

                    <a title="Add {{VARIABLE}}" style="border: 1px solid gray; cursor: hand; border-radius:4px;  border: 1px solid #b6b6b6;  color: #1b1b1b;  padding: 5px 10px; background: linear-gradient(to bottom, #fafafa, #e2e4e8); font-size: 14px; " class=" hover:bg-gray-100 hover:text-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-gray-200 disabled:dark:hover:text-gray-400" 
                    onclick="IN_BOUND.addInputToTextarea( ' {{VARIABLE}} ')"> {{VARIABLE}} </a>
                  </div>
                  <textarea oninput="IN_BOUND.auto_grow(this)" name="Prompt" id="prompt_template_area" 
                      class="w-full bg-gray-100 dark:bg-gray-700 dark:border-gray-700 rounded p-2 mt-2 mb-3 "  style="height: 25% ; max-height:320px; "  required
                            placeholder="${extensionText.inputform.promptTemplate.placeholer}"
                            title="${extensionText.inputform.promptTemplate.placeholer}">${sanitizeInput(
      promptTemplate
    )}</textarea>
            
                  
                  
                  <div class="flex" >
                    <div class="w-full mr-2">
                      <label>${extensionText.inputform.activity}</label>
                      <input type="text" list="tagsList" name="Tags" id="Category" multiple placeholder="Comma Separated Tags"
                        class="w-full bg-gray-100 dark:bg-gray-700 dark:border-gray-700 rounded p-2 mt-2 mb-3" >
                      <datalist id="tagsList" >
                        ${this.searchPredictionList.map(p => `
                              <option value="${p}">`
    )
        .join('')}
                      </datalist>
                    </div>

                  ${this.userTones[0] ? `<div class="w-full ml-2 items-start justify-center flex flex-col">
                      <label> Variation (Optional) </label>
                        <select name="Tone" class="mt-2 mb-3 dark:bg-gray-700 dark:border-gray-700 dark:hover:bg-gray-900 rounded w-full">
                        <option  value="" selected  > No Variation </option>

                          ${this.userTones
          .map(
            (tone) => /*html*/ `
                                <option  value="${sanitizeInput(
              tone.ID
            )}">${sanitizeInput(tone.Label)}</option>`
          )
          .join('')}
                        </select>` : `<div class="w-full ml-2 items-start justify-center flex flex-col">
                        <label>Pompt Variation</label>
                          <select name="Tone" disabled class="mt-2 mb-3 dark:bg-gray-700 dark:border-gray-700 dark:hover:bg-gray-900 rounded w-full">
                          <option  value="" selected  > None Defined </option>
  
                          </select>`}

                        
                        
                        </div>

                        <a style="padding-top: 4%;padding-left: 10px;" title="Goto setting and click on My Variations to Manage Variations.">${svg('info')}</a>

                </div>

                ${isEditPromptEvent ? "" : `<div class="block mx-6 mt-4 gap-4">
                    <label class="text-sm">
                      <input name="Public" value="true" type="checkbox" class="mx-4 dark:bg-gray-700"> 
                      ${extensionText.inputform.share}
                    </label>
                    
                    <label class="text-sm mx-6">
                        <input name="companyTonesState" type="checkbox" class="mx-4 dark:bg-gray-700"> 
                        Apply overall company tone
                      </label>
            
                  
                </div>`}
            
                <div class=" px-4 py-3 text-right">
                ${isEditPromptEvent === true ? `<button type="submit" name="saveAsNewPromptTemplate" class="bg-gray-600 hover:bg-gray-400 mr-2 px-4 py-2 mt-2 rounded text-white"
                          > ${extensionText.inputform.saveAsNew}
                  </button>`: ""}
                  <button type="button" class="bg-gray-600 hover:bg-gray-400 mr-2 px-4 py-2 mt-2 rounded text-white"
                          onclick="IN_BOUND.hideSavePromptModal()"> ${extensionText.inputform.cancel}
                  </button>
                  <button type="submit" name="savePromptAsTemplate" class="bg-orange-500 hover:bg-orange-500/10 mr-2 px-4 py-2 mt-2 rounded text-white">${extensionText.inputform.save}
                  </button>
                </div>


                </div>

                  

                 
            
              </div>
            </form>
          </div>
        </div>
        
      </div>
    `;

      // add onchange event listener to select[name="Community"] to update the activities
      // savePromptModal.querySelector('select[name="Community"]').onchange = (
      //   event
      // ) => {
      //   // replace select[name="Category"] with new activities
      //   savePromptModal.querySelector('select[name="Category"]').innerHTML =
      //     this.getActivities(event.target.value)
      //       .map(
      //         (activity) => /*html*/ `
      //         <option value="${sanitizeInput(activity.ID)}">${sanitizeInput(
      //           activity.Label
      //         )}</option>`
      //       )
      //       .join('');
      // };

      savePromptModal.style = 'display: block;';

      // add event listener to close the modal on ESC
      document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
          this.hideSavePromptModal();
        }
      });

    },

    addNewEmptyTone() {
      const newTone = [{ ID: (new Date()).getTime() + Math.random().toString(16).slice(2), Label: "My New Variation", Description: "My Variation Detail" }];
      this.userTones = [...newTone, ...this.userTones];
      IN_BOUND.editActivatedTonesInSetting = newTone[0].ID;
      this.showSettingModal();
    },

    async deleteToneFromSetting(ID) {
      // console.log('Delete Tone: ',ID)
      await this.Client.deleteTone(ID);
      // this.refreshActions()
      // this.showNotification(
      //   NotificationSeverity.SUCCESS,
      //   'Tone was deleted!'
      // );
    },

    async showSettingModal() {

      this.tonesOrderLocal = JSON.parse(localStorage.getItem('tonesOrderLocal')) || [];

      if (this.tonesOrderLocal?.index) {
        this.tonesOrderLocal = [this.tonesOrderLocal];
      }

      let arrayIndxes = this.tonesOrderLocal?.filter(i => i.team === IN_BOUND.selectedTeam && i.company === IN_BOUND.selectedCompany && i.folder === IN_BOUND.folderManager.selectedFolder)[0]?.index || [];

      // Create a new array to store the rearranged items
      const rearrangedTonesArray = [];

      if (arrayIndxes !== this.userTones) {
        const newTones = this.userTones.filter(tone => !arrayIndxes.map(i => i[0]).includes(tone.ID)).map(d => [d.ID]);
        const combineTones = [...newTones, ...arrayIndxes];
        combineTones.map(t => {
          rearrangedTonesArray.push([t[0], rearrangedTonesArray.length]);
        });

        arrayIndxes = rearrangedTonesArray;

      }


      const rearrangedArray = [];

      // Iterate over the arrayIndxes array
      for (const [id, index] of arrayIndxes) {
        // console.log("ss-  ",id, index)
        // Find the item in userTones array with matching ID
        const item = this.userTones.find((tone) => tone.ID === id);

        // If the item is found, add it to the rearranged array at the specified index
        if (item) {
          rearrangedArray[index] = item;
        }
      }



      // Remove any undefined elements from the rearranged array
      const sortedUserTones = rearrangedArray.filter((item) => item !== undefined);

      // Print the rearranged array
      // console.log("sortedUserTones: ",sortedUserTones);


      let settingModal = document.getElementById('settingModal');

      // if modal does not exist, create it, add event listener on submit and append it to body
      if (!settingModal) {
        settingModal = document.createElement('div');
        settingModal.id = 'settingModal';

        document.body.appendChild(settingModal);
      }


      settingModal.innerHTML = `
      <div style="z-index:100;" class="fixed inset-0 text-center transition-opacity z-50 ">
          <div onclick="IN_BOUND.hideModal('settingModal')" class="absolute bg-gray-900 inset-0 opacity-90">
          </div>

            <div class="fixed inset-0 overflow-y-auto">
              <div  class="flex items-center min-h-full justify-center flex-col">
                <div
                class="w-1/2 align-center px-4 py-4 bg-white dark:bg-gray-800 dark:text-gray-200 inline-block overflow-hidden sm:rounded-lg shadow-xl sm:align-middle sm:max-w-lg sm:my-8 sm:w-full text-left transform transition-all"
                role="dialog" aria-modal="true" aria-labelledby="modal-headline" style="text-align: left;">

                <div class="flex" style="justify-content:flex-end;">
                <a title="Close" 
                  class="pb-4 rounded-md hover:bg-gray-100 cursor-pointer hover:text-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-gray-200 disabled:dark:hover:text-gray-400" 
                  onclick="IN_BOUND.hideModal('settingModal')"  >  ${svg('Cross-Round')}</a>
                </div>

                <div class="flex flex-wrap text-sm font-medium text-center text-gray-900 dark:text-gray-400 w-full border-b mb-4 pb-2">
                    
                  <button class="inline-block px-2 py-1  rounded-sm mr-2 ${this.settingsActiveTab === "settings" ? 'bg-orange-500 text-white' : ""} " 
                  onclick="IN_BOUND.settingsActiveTab = 'settings'; IN_BOUND.showSettingModal() " > Setting </button>

                  <button class="inline-block px-2 py-1  rounded-sm mr-2 ${this.settingsActiveTab === "tones" ? 'bg-orange-500 text-white' : ""} " 
                  onclick="IN_BOUND.settingsActiveTab = 'tones' ; IN_BOUND.showSettingModal()" > My Variations </button>
                  
                  <button class="inline-block px-2 py-1  rounded-sm mr-2 ${this.settingsActiveTab === "companyTones" ? 'bg-orange-500 text-white' : ""} " 
                  onclick="IN_BOUND.settingsActiveTab = 'companyTones'; IN_BOUND.showSettingModal() " > Company Variations </button>
                   
                   
                </div>


                ${this.settingsActiveTab === "settings" ? `<div class="mr-4 w-1/5 text-left text-gray-900 dark:text-gray-400">
                  <p class="text-right text-gray-500 dark:text-gray-400" >Version: 13.15.11</p>
                  <label>Extension Language</label>
                  <select id="languageExtSelect" name="Community" class="mt-2 mb-3 text-gray-500 dark:text-gray-400 dark:bg-gray-700 dark:border-gray-700 dark:hover:bg-gray-900 rounded w-full" required>
                  ${Object.keys(extensionLanguages)
          .map(
            (lang) =>
                        /*html*/ `<option   value="${lang}" ${this.ExtLang === lang ? 'selected' : ''
              }>${lang.charAt(0).toUpperCase() + lang.slice(1)}</option>`
          )
          .join('')}
                  </select>

                </div>` : ""}


                ${this.settingsActiveTab === "tones" ? `

                    <div class="flex justify-between items-center text-center ">
                        <h3>Variations</h3>
                        <div class="flex text-center row">
                        
                        <a  class="p-1 rounded-md cursor-pointer hover:bg-gray-100 hover:text-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-gray-200 disabled:dark:hover:text-gray-400" 
                              onclick="IN_BOUND.importToneinSetting()"> ${svg('import-h5')} <input id="dropzone-file589325" type="file" accept=".json" class="hidden" /> </a>

                        <a  class="p-1 rounded-md cursor-pointer hover:bg-gray-100 hover:text-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-gray-200 disabled:dark:hover:text-gray-400" 
                             onclick="IN_BOUND.addNewEmptyTone()"> ${svg('add-5')}  </a>

                              </div>
                    </div>
                    <div id="variationBox" class="list-group">
                       ${sortedUserTones.map((tone) => (`<div class=" list-group-item " data-id="${tone.ID}" >
                       
                       <div  class="flex items-center   justify-between m-2 bg-gray-50 dark:bg-gray-700  p-2 rounded-md hover:bg-gray-200 dark:hover:bg-gray-900 border shadow border-gray-300 dark:border-gray-700 hover:shadow-lg transition duration-300 ease-in-out tw-border-2 tw-border-blue-500 tw-rounded-xl">
                        <div class="flex gap-1 justify-center items-center">
                          ${svg('drag-lines')}
                           <p class="ml-5">${tone.Label}</p> 
                        </div>
                          <div class="flex gap-1 justify-end items-start"> 

                              <a title="Copy variation" class="p-1 rounded-md cursor-pointer hover:bg-gray-100 hover:text-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-gray-200 disabled:dark:hover:text-gray-400" 
                              onclick =" ${this.hiddenVariations.indexOf(tone.ID) === -1 ? `IN_BOUND.hideVariation('${tone.ID}')"> ${svg('eye')}` :
              `IN_BOUND.unHideVariation('${tone.ID}')"> ${svg('eye_off')}`}   </a>

                              <a title="Copy variation" class="p-1 rounded-md cursor-pointer hover:bg-gray-100 hover:text-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-gray-200 disabled:dark:hover:text-gray-400" 
                              onclick="IN_BOUND.copyToneFromSetting('${tone.ID}')"> ${svg('copy')}  </a>

                              <a title="Download variation" class="p-1 rounded-md cursor-pointer hover:bg-gray-100 hover:text-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-gray-200 disabled:dark:hover:text-gray-400" 
                              onclick="IN_BOUND.exportToneFromSetting('${tone.ID}')"> ${svg('export')}  </a>
                            
                            
                              <a title="Edit variation" class="p-1 rounded-md cursor-pointer hover:bg-gray-100 hover:text-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-gray-200 disabled:dark:hover:text-gray-400" 
                              onclick="${IN_BOUND.editActivatedTonesInSetting !== tone.ID ? `IN_BOUND.editActivatedTonesInSetting = '${tone.ID}'; IN_BOUND.showSettingModal();` : `IN_BOUND.editActivatedTonesInSetting = ''; IN_BOUND.showSettingModal()`}"> ${IN_BOUND.editActivatedTonesInSetting === tone.ID ? svg('EditOrange') : svg('Edit')}  </a>
                            
                              <a title="Delete variation" class="p-1 rounded-md cursor-pointer hover:bg-gray-100 hover:text-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-gray-200 disabled:dark:hover:text-gray-400" 
                              onclick="IN_BOUND.deleteToneFromSetting('${tone.ID}')"> ${svg('Cross')}  </a>
                          
                              </div> 
                        </div>
                        
                        <form id="saveToneForm" class="${IN_BOUND.editActivatedTonesInSetting === tone.ID ? '' : "hidden"}   " >
                        <input type="hidden" name="ID" value="${tone.ID}" />
                        
                      <div
                        class="align-center bg-white dark:bg-gray-800 dark:text-gray-200 inline-block overflow-hidden sm:rounded-lg shadow-xl sm:align-middle w-full text-left transform transition-all"
                        role="dialog" aria-modal="true" aria-labelledby="modal-headline" style="text-align: left;">
                    
                        <div class="bg-white dark:bg-gray-800 px-4 overflow-y-auto">
                          <label>Title</label>
                            <input name="Label" type="text" value="${tone.Label}"}
                              title="Tone Label" required placeholder="Tone Label" class="w-full bg-gray-100 dark:bg-gray-700 dark:border-gray-700 rounded mb-3 mt-2 p-2 w-full" />
                      
                            <label>Tone</label>
                            <textarea name="Description" class="w-full bg-gray-100 dark:bg-gray-700 dark:border-gray-700 rounded p-2 mt-2 mb-3" style="height: 120px;" required
                                      placeholder="Tone"
                                      title="Tone">${tone.Description}</textarea>
                      
                            <div class=" px-4 py-3 text-right">
                              
                                <button type="button" class="bg-gray-600 hover:bg-gray-400 mr-2 px-4 py-2 mt-2 rounded text-white"
                                        onclick=" IN_BOUND.editActivatedTonesInSetting = ''; IN_BOUND.showSettingModal() " "> Cancel
                                </button>
                                <button type="submit" class="bg-orange-500 hover:bg-orange-500/10 mr-2 px-4 py-2 mt-2 rounded text-white">Save
                                </button>
                            </div>
              
                        </div>
                      </form>

                        </div></div>`)).join('')}
                        </div>
                        
                ` : ""}


              ${this.settingsActiveTab === "companyTones" ? `

                <div class="flex justify-between items-center text-center ">
                    <h3>Company Variations</h3>
                </div>
                   ${this.companyTones.map((tone) => (`<div class="  ">
                   <div class="flex items-center  justify-between m-2 bg-gray-50 dark:bg-white/5 p-2 rounded-md hover:bg-gray-200 dark:hover:bg-gray-900 border shadow border-gray-300 dark:border-gray-700 hover:shadow-lg transition duration-300 ease-in-out tw-border-2 tw-border-blue-500 tw-rounded-xl">
                      <div> <p>${tone.Label}</p> </div>
                      <div class="flex gap-1 justify-end items-start"> 
                        
                          <a title="Copy to user variations"  class="p-1 rounded-md cursor-pointer hover:bg-gray-100 hover:text-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-gray-200 disabled:dark:hover:text-gray-400" 
                          onclick="IN_BOUND.forkActivatedTonesInSetting('${tone.ID}'); IN_BOUND.showSettingModal();"> ${svg('fork')}  </a>
                        
                      
                          </div> 
                    </div>
                    `)).join('')}
                    
            ` : ""}


              </div>
            </div>
          <div>
        </div>
  `;



      settingModal.style = 'display: block;';

      settingModal
        ?.querySelector('#languageExtSelect')
        ?.addEventListener('change', this.changeExtLanguage.bind(this));


      const variationBox = settingModal?.querySelector('#variationBox');
      if (variationBox) {
        Sortable.create(variationBox, {
          forceFallback: true,
          fallbackClass: "dragged-item",
          animation: 100,
          easing: "cubic-bezier(1, 0, 0, 1)",
          handle: ".drag-icon",
          onEnd: function (/**Event*/evt) {
            evt.item;  // dragged HTMLElement
            evt.to;    // target list
            evt.from;  // previous list
            evt.oldIndex;  // element's old index within old parent
            evt.newIndex;  // element's new index within new parent
            evt.oldDraggableIndex; // element's old index within old parent, only counting draggable elements
            evt.newDraggableIndex; // element's new index within new parent, only counting draggable elements
            evt.clone; // the clone element
            evt.pullMode;  // when item is in another sortable: `"clone"` if cloning, `true` if moving
            let indexes = [];
            Array.from(evt.target.children).forEach((elem, index) => {
              let data_id = elem.attributes['data-id'].value;
              // console.log(data_id,index)
              indexes.push([data_id, index]);
            });
            const oldOrders = IN_BOUND.tonesOrderLocal?.filter(i => !(i.team === IN_BOUND.selectedTeam && i.company === IN_BOUND.selectedCompany && i.folder === IN_BOUND.folderManager.selectedFolder)) || [];
            // console.log("Old order: ",oldOrders)
            localStorage.setItem('tonesOrderLocal', JSON.stringify([...oldOrders, { index: indexes, company: IN_BOUND.selectedCompany, team: IN_BOUND.selectedTeam, folder: IN_BOUND.folderManager.selectedFolder }]));
            IN_BOUND.tonesOrderLocal = JSON.parse(localStorage.getItem('tonesOrderLocal'));
            IN_BOUND.insertLanguageToneWritingStyleContinueActions();
          },
        });
      }


      const allSaveForms = settingModal.querySelectorAll('#saveToneForm');

      for (let i = 0; i < allSaveForms.length; i++) {
        allSaveForms[i]?.addEventListener(
          'submit', async function (e) {
            e.preventDefault();
            // console.log(e)

            const tone = {
              ID: e.target[0].value,
              Label: e.target[1].value,
              Description: e.target[2].value,
            };

            // console.log(tone)

            IN_BOUND.showNotification(
              NotificationSeverity.SUCCESS,
              'Sync..'
            );

            IN_BOUND.editActivatedTonesInSetting = "";

            const toneNew = { id: tone.ID, label: tone.Label, prompt: tone.Description, user: IN_BOUND.Client.User.Email, company: IN_BOUND.Company };

            await IN_BOUND.Client.saveEditTone(toneNew);

            // IN_BOUND.refreshActions();

            // IN_BOUND.showNotification(
            //   NotificationSeverity.SUCCESS,
            //   'Tone changes was saved!'
            // );

            IN_BOUND.showSettingModal();

          });
      }
      // this.saveEditedTone.bind(this)

      settingModal
        ?.querySelector('#companyToneState')
        ?.addEventListener('click', this.changeCompanyToneState.bind(this));

      // add event listener to close the modal on ESC
      document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
          this.hideModal('settingModal');
        }
      });
    },

    hideVariation(id) {
      this.hiddenVariations.push(id);
      localStorage.setItem('hiddenVariations', JSON.stringify(this.hiddenVariations));
      this.showSettingModal();
      this.insertLanguageToneWritingStyleContinueActions();
    },

    unHideVariation(id) {
      this.hiddenVariations = this.hiddenVariations.filter(d => d !== id);
      localStorage.setItem('hiddenVariations', JSON.stringify(this.hiddenVariations));
      this.showSettingModal();
      this.insertLanguageToneWritingStyleContinueActions();
    },

    async forkActivatedTonesInSetting(id) {
      const tone = IN_BOUND.companyTones.filter(d => d.ID === id)[0];
      const randonUUID = Math.random().toString(36).substring(2) + '-' + (new Date().getTime()).toString(36);
      tone.ID = window.crypto?.randomUUID() || randonUUID;
      if (tone) {
        const toneNew = { id: tone.ID, label: "Copy of: " + tone.Label, prompt: tone.Description, user: IN_BOUND.Client.User.Email, company: IN_BOUND.Company };
        await IN_BOUND.Client.saveEditTone(toneNew);
        // await IN_BOUND.refreshActions();
        IN_BOUND.showSettingModal();
        // IN_BOUND.showNotification(
        //   NotificationSeverity.SUCCESS,
        //   'Variation added!'
        // );
      }
    },

    exportToneFromSetting(id) {
      const tone = this.userTones.filter(d => d.ID === id)[0];
      const randonUUID = Math.random().toString(36).substring(2) + '-' + (new Date().getTime()).toString(36);
      tone.ID = window.crypto?.randomUUID() || randonUUID;
      if (tone) {
        const toneNew = { id: tone.ID, label: tone.Label, prompt: tone.Description, user: IN_BOUND.Client.User.Email, company: IN_BOUND.Company };
        this.exportContent(toneNew, toneNew.label);

        IN_BOUND.showNotification(
          NotificationSeverity.SUCCESS,
          'Variation downloaded!'
        );
      }
    },

    copyToneFromSetting(id) {
      const tone = this.userTones.filter(d => d.ID === id)[0];
      if (tone) {

        this.copyTextClipboard(tone.Description);

        IN_BOUND.showNotification(
          NotificationSeverity.SUCCESS,
          'Variation copied!'
        );
      }
    },

    importToneinSetting() {
      const inputFileDiv = document.getElementById('dropzone-file589325');
      inputFileDiv.click();

      inputFileDiv.onchange = (event) => {
        // event.stopPropagation();
        // event.preventDefault();

        const fileList = event.target.files;
        // console.log(fileList);

        var reader = new FileReader();
        reader.onload = async function () {
          var text = reader.result;
          let tone = JSON.parse(text);
          const randonUUID = Math.random().toString(36).substring(2) + '-' + (new Date().getTime()).toString(36);
          tone.id = window.crypto?.randomUUID() || randonUUID;
          // console.log(tone);
          if (tone) {
            ({ ID: tone.id, Label: "Import of: " + tone.label, Description: tone.prompt, type: "user" });
            if (tone.prompt) {
              await IN_BOUND.Client.saveEditTone(tone);
              // IN_BOUND.showNotification(
              //   NotificationSeverity.SUCCESS,
              //   'Variation added!'
              // );
              // await IN_BOUND.refreshActions();
              IN_BOUND.showSettingModal();
            } else {
              IN_BOUND.showNotification(
                NotificationSeverity.SUCCESS,
                'Invalid Variation!'
              );
            }
          }

        };
        reader.readAsText(fileList[0]);
      };
    },

    XMLRead: "",

    async showVariablesModal(template) {

      const fileVariables = ["PdfRead", "XMLRead"];

      // console.log(template)

      let prompt = template.Prompt;
      let variables_0 = prompt.match(/[^{{]+(?=\}})/g);
      let variables = [...new Set(variables_0)];
      // if(prompt.indexOf(PromptPlaceholder) > -1){
      //   variables.push(`${PromptPlaceholder}:${template.PromptHint}`)
      // }
      let variablesModal = document.getElementById('variablesModal');

      // if modal does not exist, create it, add event listener on submit and append it to body
      if (!variablesModal) {
        variablesModal = document.createElement('div');
        variablesModal.id = 'variablesModal';

        variablesModal.addEventListener('submit', function (e) {
          e.preventDefault();

          IN_BOUND.addVariablesToPrompt(e);
        });

        document.body.appendChild(variablesModal);
      }

      // console.log("Variables: ", variables)

      variablesModal.innerHTML = /*html*/ `
      <div style="z-index:1000;" class="fixed inset-0 text-center transition-opacity ">
        <div  class="absolute bg-gray-900 inset-0 opacity-90">
        </div>

        <div class="fixed inset-0 overflow-y-auto">
          <div class="flex items-center justify-center min-h-full">
            <form id="saveVariableForm">
              
              <div
              class="align-center px-6 py-4 bg-white dark:bg-gray-800 dark:text-gray-200 inline-block overflow-hidden sm:rounded-lg shadow-xl sm:align-middle sm:max-w-lg sm:my-8 sm:w-full text-left transform transition-all"
              role="dialog" aria-modal="true" aria-labelledby="modal-headline" style="text-align: left;">
          
                ${variables?.map(variable => {
      if (variable === "XMLRead") {
        return `
                    <label for="${variable?.split(':')[0]}" >XML File:</label>
                    <input type="file" id="${variable?.split(':')[0]}" accept="application/xml" name="${variable}" class=" rounded py-2 px-3 w-full">    
                    `

      } else if (variable === "SheetCSVPrompts") {
        return `
                    <label for="${variable}" >Google Sheet URL:</label>
                    <input type="text" id="${variable}" required name="${variable}" class=" rounded py-2 px-3 w-full bg-gray-100 dark:bg-gray-700 dark:border-gray-700">    
                    `

      } else if (variable === "PdfRead") {
        // console.log('File Variable!', variable)
        return `
                    <label for="${variable?.split(':')[0]}" >PDF File:</label>
                    <input type="file" id="${variable?.split(':')[0]}" accept="application/pdf" id="XMLRead" name="${variable}" class=" rounded py-2 px-3 w-full">    
                    `
      } else if (fileVariables?.indexOf(variable?.split(':')[0]) === -1) {
        return `
                    <label>${variable?.split(':')[0]}</label>
                    <textarea name="${variable}" class="w-full bg-gray-100 dark:bg-gray-700 dark:border-gray-700 rounded p-2 mt-2 mb-3" style="height: 120px;" 
                              placeholder=" ${variable?.split(':')[1] || ""}"
                              title=" ${variable?.split(':')[1] || ""}"></textarea>
                    `
      }

    }).join('')}
            
                <div class=" px-4 py-3 text-right">
                  <button type="button" class="IN_BOUND_hideVariablesModal bg-gray-600 hover:bg-gray-400 mr-2 px-4 py-2 mt-2 rounded text-white"
                          > Cancel
                  </button>
                  <button type="submit" name="savePromptVariables" class="bg-orange-500 hover:bg-orange-500/10 mr-2 px-4 py-2 mt-2 rounded text-white"> Submit
                  </button>
                </div>
            
              </div>
            </form>
          </div>
        </div>
        
      </div>
    `;

      variables.length > 0 ? variablesModal.style = 'display: block;' : variablesModal.style = 'display: none;';

      variablesModal?.querySelector('.IN_BOUND_hideVariablesModal')?.addEventListener('click', () => {
        IN_BOUND.hideModal('variablesModal');
        this.selectPromptTemplate(null);
      });

      variablesModal?.querySelector('#XMLRead')?.addEventListener('change', function (event) {
        const file = event.target.files[0]; // Get the selected file
        IN_BOUND.XMLFileName = file.name;

        if (file) {
          const reader = new FileReader();

          // Define the callback function when the file is loaded
          reader.onload = function (e) {
            const fileContents = e.target.result; // This contains the contents of the file as a string
            // console.log(fileContents);
            IN_BOUND.XMLRead = fileContents;
            // You can now work with the fileContents variable, which contains the text from the file.
          };

          // Read the file as text
          reader.readAsText(file);
        }
      });


      // add event listener to close the modal on ESC
      document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
          this.hideModal('variablesModal');
        }
      });
    },

    async addVariablesToPrompt(e) {
      const formData = new FormData(e.target);
      let prompt = this.SelectedPromptTemplate.Prompt;

      for (const [key, value] of formData) {
        // console.log(prompt.indexOf(key), key, value)
        // console.log(prompt)

        // if(key === "{{WebSearch"){
        //   this.webResults = []
        //   this.Client.getDdgResults(value)
        // }else if(key === "{{WebNews"){
        //   this.webResults = []
        //   this.Client.getGoogleNewsResults(value)
        // }else if(key === "{{WebContent"){
        //   this.webResults = []
        //   const result = await ( await fetch(`${APIEndpoint}/web-content?url=${value}`) ).json()
        //   this.processWebContentResultsFromAPI(result)
        //   // this.Client.getWebContentResults(value)
        // }else if(key === PromptPlaceholder){
        //   prompt = prompt.replace(key, value)
        //   this.SelectedPromptTemplate = {...this.SelectedPromptTemplate, Prompt: prompt}
        // }else{
        // console.log(typeof(value))
        if (key === "PdfRead") {
          // const extractedText = this.sanitizeTextContent(await this.readPDFFile(value))
          // // console.log('Extracted text:', extractedText);
          // prompt = prompt.replaceAll(`{{${key}}}`, extractedText)
          this.SelectedPromptTemplate = { ...this.SelectedPromptTemplate, Prompt: prompt };

        } else if (key === "SheetCSVPrompts") {
          console.log("SheetCSVPrompts: ", value);
          if (!value.includes('https://docs.google.com/spreadsheets')) {
            chatgpt.notify('Invalid url!', 'top right', 8, 'on');
            return
          }
          const sheetCSVUrl = value.replace('edit#', "gviz/tq?tqx=out:csv&");
          localStorage.setItem('sheetCSVUrl', sheetCSVUrl);
          this.selectPromptTemplate(null);
          document.dispatchEvent(new CustomEvent('IN_BOUND.SendBgMsg', { detail: { url: sheetCSVUrl, type: "IN_BOUND.getRequest", returnType: "getCsvSheetResults" }, bubbles: true }));


        } else if (key === "XMLRead") {
          this.hideModal('variablesModal');
          const data = IN_BOUND.XMLRead;
          // console.log("data: ", data)
          const removeTxt = data.match(/>(.*?)\w<\//g);
          const originalArray = [data.match(/>\n(.*?)<\//g), data.match(/>(.*?)\n<\//g), data.match(/>(.*?)<\//g)].flatMap(d => d).filter(d => d && !removeTxt.includes(d) && d.match(/\w/g) !== null).map(t => t?.slice(1, -2));

          IN_BOUND.SelectedPromptTemplate = null;
          IN_BOUND.selectPromptTemplateByIndex(null);
          IN_BOUND.resurssiveTranslation(originalArray, 0, prompt);

          // console.log("xmlReadContent: ", xmlReadContent)
        } else if (key === "ScrapeWebsite") {
          await new Promise((resolve, reject) => {
            // console.log("ScrapeWebsite: ", value)
            document.dispatchEvent(new CustomEvent('IN_BOUND.SendBgMsg', { detail: { url: value, type: "IN_BOUND.getScraperData", returnType: "getScraperData" }, bubbles: true }));
            document.addEventListener('IN_BOUND.getScraperData', async (event) => {
              // console.log("event: ", event.detail.data)

              const strData = JSON.stringify(event.detail.data);


              prompt = prompt.replaceAll(`{{${key}}}`, strData);
              IN_BOUND.SelectedPromptTemplate = { ...IN_BOUND.SelectedPromptTemplate, Prompt: prompt };

              resolve("");
            });

          });
        } else {
          prompt = prompt.replaceAll(`{{${key}}}`, value);
          // console.log('Variable: ', prompt)
          this.SelectedPromptTemplate = { ...this.SelectedPromptTemplate, Prompt: prompt };
        }

        // if(prompt.length > 9000){
        //   IN_BOUND.longInputText = prompt
        //   IN_BOUND.chunkProcessingState = false
        // }
        // console.log(prompt)
        // }

      }
      // console.log(prompt)

      // console.log(variables, this.SelectedPromptTemplate)
      if (IN_BOUND.SelectedPromptTemplate) {
        document.querySelector('#prompt-wrapper > span').title = IN_BOUND.SelectedPromptTemplate.Prompt;
      }

      this.hideModal('variablesModal');
    },


    async runCsvChainOfPrompts(index) {
      if (this.runCsvChainOfPromptsState == "no") {
        // this.runCsvChainOfPromptsState = false
        localStorage.removeItem('chainOfPrompts');
        this.insertPromptTemplatesSection();
        return
      }
      this.runCsvChainOfPromptsState = true;
      console.log("Active Index: ", index);
      const promptChain = JSON.parse(localStorage.getItem('chainOfPrompts')) || [];

      if (index === (promptChain.length)) {
        IN_BOUND.downloadAndUploadChainOfPrompts();
      }
      if (index >= promptChain.length) return
      const promptObj = promptChain[index];
      if (promptObj.completed === false) {
        promptObj.index;
        let prompt = promptObj.prompt;
        if (!prompt) {
          alert('prompt header not found!');
          this.clearChainOfPromptsData();
          return
        }
        const variables = prompt.match(/[^{{]+(?=\}})/g);
        if (variables) {
          for (const variable of variables) {
            console.log("variable: ", variable);
            if (variable === "websiteTranslation" || variable === "websiteLanguage") {
              if (variable !== "websiteTranslation") {
                return
              }
              const websiteStr = await this.openWebsiteNGetHtml(promptObj[variable]);
              console.log("websiteStr: ", websiteStr);
              if (promptObj.chat === "new") {
                chatgpt.startNewChat();
              }
              const dummyElement = new DOMParser().parseFromString(websiteStr, "text/html");
              const websiteTranslated = await this.translateHtmlContent(dummyElement, 0, promptObj["websiteLanguage"], parseInt(promptObj?.wait) || 2);
              promptObj.chatgptResponse = websiteTranslated;
              promptObj.completed = true;
              promptChain[index] = promptObj;
              localStorage.setItem('chainOfPrompts', JSON.stringify(promptChain));
              if (promptObj.wait) {
                IN_BOUND.insertPromptTemplatesSection();
                setTimeout(() => {
                  IN_BOUND.runCsvChainOfPrompts(index + 1);
                }, (parseInt(promptObj?.wait) || 2) * 1000);
              } else {
                IN_BOUND.insertPromptTemplatesSection();
                setTimeout(() => {
                  IN_BOUND.runCsvChainOfPrompts(index + 1);
                }, (1) * 1000);
              }
              return
            } else if (variable === "ScrapeWebsite") {
              const websiteStr = await IN_BOUND.openWebsiteNGetHtml(promptObj[variable]);
              console.log("websiteStr: ", websiteStr);
              const dummyElement = new DOMParser().parseFromString(websiteStr, "text/html");
              const textResults = [];
              await this.getHtmlContent(dummyElement, 0, textResults);
              // console.log("websiteContentText: ", websiteContentText)
              // console.log("textResults: ", textResults.join(' \n '))
              // promptObj[variable] = textResults.join(' \n ')
              prompt = prompt.replaceAll(`{{${variable}}}`, (textResults.join(' ') || ""));
              } else {
              prompt = prompt.replaceAll(`{{${variable}}}`, (promptObj[variable] || ""));
            }

          }
        }

        if (promptObj.chat === "new") {
          chatgpt.startNewChat();
        }
        setTimeout(async () => {
          const response = await chatgpt.askAndGetReply(prompt);
          if (response) {
            promptObj.chatgptResponse = response;
            promptObj.completed = true;
            promptChain[index] = promptObj;
            localStorage.setItem('chainOfPrompts', JSON.stringify(promptChain));
            if (promptObj.wait) {
              setTimeout(() => {
                IN_BOUND.runCsvChainOfPrompts(index + 1);
              }, (parseInt(promptObj?.wait) || 1) * 1000);
            } else {
              setTimeout(() => {
                IN_BOUND.runCsvChainOfPrompts(index + 1);
              }, 1000);
            }

          } else {
            setTimeout(() => {
              IN_BOUND.runCsvChainOfPrompts(index);
            }, 5000);
          }

          IN_BOUND.insertPromptTemplatesSection();
        }, 1000);

      } else if (promptObj.completed === true) {
        this.runCsvChainOfPrompts(index + 1);
      }
    },

    openWebsiteNGetHtml(url) {
      return new Promise(resolve => {
        document.dispatchEvent(new CustomEvent('IN_BOUND.SendBgMsg', { detail: { url: url, type: "IN_BOUND.getScraperHtmlData", returnType: "getScraperHtmlData" }, bubbles: true }));
        document.addEventListener('IN_BOUND.getScraperHtmlData', async (event) => {
          console.log("event: ", event.detail.data);

          const strData = JSON.stringify(event.detail.data);
          resolve(strData);
        });
      });
    },



    downloadAndUploadChainOfPrompts() {
      const promptChain_0 = JSON.parse(localStorage.getItem('chainOfPrompts')) || [];
      const promptChain = promptChain_0.filter(d => d.completed === true);
      const promptResponseChain = promptChain.map(({ completed, index, ...rest }) => rest);
      const csvFormat = Papa.unparse(promptResponseChain);
      this.downloadAsFile("bulk_prompt_responses_chatgpt.csv", csvFormat);

      const sheetFormatedData_0 = Papa.parse(csvFormat, {
        header: false
      });
      const sheetFormatedData = JSON.stringify(sheetFormatedData_0.data);
      const sheetCSVUrl = localStorage.getItem('sheetCSVUrl');
      const spreadSheetId = sheetCSVUrl.split('/')[5];
      const sheetId = sheetCSVUrl.split('/')[sheetCSVUrl.split('/').length - 1].split('=')[2];
      // send event to upload data to spreadsheet
      const url = `https://script.google.com/macros/s/AKfycbwtNEH-e-yKYhO6NgFStZk4Q7QsWzvqIH4Bkiq6bk6aBZ9DSTHDoqpTH1qV82MzHPgVEQ/exec?spreadsheetId=${spreadSheetId}&sheetId=${sheetId}`;
      const options = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: sheetFormatedData,
      };
      document.dispatchEvent(new CustomEvent('IN_BOUND.SendBgMsg', { detail: { url, options, type: "IN_BOUND.postRequest", returnType: "saveCsvData" }, bubbles: true }));
    },

    clearChainOfPromptsData() {
      localStorage.removeItem('chainOfPrompts');
      if (this.runCsvChainOfPromptsState === true) {
        this.runCsvChainOfPromptsState = "no";
      } else {
        this.runCsvChainOfPromptsState = false;
      }

      this.insertPromptTemplatesSection();
    },

    async resurssiveTranslation(originalArray, i, prompt) {
      const prompt_2 = prompt.replaceAll(`{{XMLRead}}`, originalArray[i]);
      // console.log("prompt_2: ", prompt_2)
      const translation = await chatgpt.askAndGetReply(prompt_2);
      // console.log(translation)
      IN_BOUND.XMLRead = IN_BOUND.XMLRead.replace(originalArray[i], translation);
      if (i < originalArray.length - 1) {
        this.resurssiveTranslation(originalArray, i + 1, prompt);
      } else {
        IN_BOUND.downloadAsFile(IN_BOUND.XMLFileName.slice(0, -3) + "_translated.xml", IN_BOUND.XMLRead);
        IN_BOUND.XMLRead = "";
        IN_BOUND.XMLFileName = "";
      }
    },


    async translateHtmlContent(doc, i, lang, time) {
      const selectors = ["h1", "h2", "h3", "h4", "h5", "h6", "p", "div"];
      // const selectors = ["h5", "h6"]
      const nodes = doc.querySelectorAll(selectors.join(', '));
      console.log("Nodes: ", nodes.length);
      console.log("Current Index: ", i);

      if (i >= nodes.length) {
        console.log('Done!');
        console.log(doc.body.innerHTML);
        window.customDoc = doc;
        return doc.body.innerHTML
      }

      // setTimeout(async () => {
        const node = nodes[i];

        if (node.nodeName === "DIV" && node.childElementCount < 1) {
          if (node.textContent) {
            const translatedText = await IN_BOUND.translateTextChatGPT(node.textContent, lang, time);
            node.textContent = translatedText;
          }
        } else if (selectors.filter(d => d !== 'div').includes(node.nodeName.toLowerCase())) {
          if (node.textContent) {
            const translatedText = await IN_BOUND.translateTextChatGPT(node.textContent, lang, time);
            node.textContent = translatedText;
          }

        }

        await IN_BOUND.translateHtmlContent(doc, i + 1, lang);
      // }, time * 1000);


    },

    async getHtmlContent(doc, i, textResults) {
      const selectors = ["h1", "h2", "h3", "h4", "h5", "h6", "p", "div"];
      // const selectors = ["h5", "h6"]
      const nodes = doc.querySelectorAll(selectors.join(', '));
      // console.log("Nodes: ", nodes.length);
      // console.log("Current Index: ", i);

      if (i >= nodes.length) {
        console.log('Done!');
        console.log(doc.body.textContent);
        window.customDoc = doc;
        return textResults.join(' \n ')
      }

      // setTimeout(async () => {
        const node = nodes[i];

        if (node.nodeName === "DIV" && node.childElementCount < 1) {
          if (node.textContent) {
            const translatedText = node.textContent;
            node.textContent = translatedText;
            textResults.push(translatedText);
          }
        } else if (selectors.filter(d => d !== 'div').includes(node.nodeName.toLowerCase())) {
          if (node.textContent) {
            const translatedText = node.textContent;
            node.textContent = translatedText;
            textResults.push(translatedText);
          }

        }
        // console.log(textResults)

        await IN_BOUND.getHtmlContent(doc, i + 1, textResults);
    },

    async translateTextChatGPT(text, lang) {
      // simulate API delay
      return new Promise(resolve => {
        setTimeout(async () => {
          try {
            const translatedText = await chatgpt.translate(text, lang);
            resolve(translatedText);
          } catch (error) {
            console.log(error);
            await chatgpt.startNewChat();
            setTimeout(async () => {
              const translatedText = await chatgpt.translate(text, lang);
              if (!translatedText) {
                resolve(text);
              }
              resolve(translatedText);
            }, 3000);

          }

        }, 1000);
      });
    },


    readPDFFile(file) {
      return new Promise((resolve, reject) => {
        const fileReader = new FileReader();
        fileReader.onload = function () {
          const typedArray = new Uint8Array(this.result);

          // Load the PDF file using the PDFJS library
          pdfjsLib.getDocument(typedArray).promise
            .then((pdfDoc) => {
              const numPages = pdfDoc.numPages;
              const pagesPromises = [];

              // Iterate through each page of the PDF
              for (let i = 1; i <= numPages; i++) {
                pagesPromises.push(pdfDoc.getPage(i));
              }

              // Extract the text content from each page
              Promise.all(pagesPromises)
                .then((pages) => {
                  const contentPromises = [];

                  // Iterate through each page and extract text
                  for (let page of pages) {
                    contentPromises.push(page.getTextContent());
                  }

                  // Resolve the promise with the extracted text content
                  Promise.all(contentPromises)
                    .then((contents) => {
                      let extractedText = '';

                      // Concatenate the text content from each page
                      for (let content of contents) {
                        for (let item of content.items) {
                          extractedText += item.str + ' ';
                        }
                      }

                      resolve(extractedText);
                    })
                    .catch(reject);
                })
                .catch(reject);
            })
            .catch(reject);
        };

        fileReader.readAsArrayBuffer(file);
      });
    },

    downloadAsFile(filename, text) {
      var element = document.createElement('a');
      element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
      element.setAttribute('download', filename);

      element.style.display = 'none';
      document.body.appendChild(element);

      element.click();

      document.body.removeChild(element);
    },


    sanitizeTextContent(text) {
      // Remove extra spaces
      text = text.replace(/\s+/g, ' ');

      // Remove unused dots
      text = text.replace(/\./g, '');

      // Remove unreadable characters
      text = text.replace(/[^\x00-\x7F]+/g, '');

      // Clean up leading/trailing spaces
      text = text.trim();

      return text;
    },

    changeCompanyToneState(e) {
      this.companyTonesState = e.target.checked;
      window.localStorage.setItem('companyTonesState', this.companyTonesState);

      this.refreshActions();
      // this.insertLanguageToneWritingStyleContinueActions();
    },


    // This function adds an "Export Button" to the sidebar
    addExportButton() {
      // Get the nav element in the sidebar
      const nav = document.querySelector('nav');
      // If there is no nav element or the "Export Button" already exists, skip
      if (!nav || nav.querySelector('#export-button')) return;

      // Create the "Export Button" element
      const button = document.createElement('a');
      button.id = 'export-button';
      button.className = css`ExportButton`;
      button.innerHTML = /*html*/ `${svg`Export`} Export Conversation`;
      button.onclick = this.exportCurrentChat.bind(this);

      // If there is no chat started, disable the button
      if (document.querySelector('.flex-1.overflow-hidden h1')) {
        button.style = 'pointer-events: none;opacity: 0.5';
      }

      // Get the Log out button as a reference
      [...nav.children].find((child) =>
        child.innerText.includes('Log out')
      );
      // Insert the "Export Button" before the "Color Mode" button
      // nav.insertBefore(button, colorModeButton);

      // Create the "Version" element
      // const version = document.createElement('a');
      // version.id = 'AppName';
      // version.className = css`VersionInfo`;
      // version.innerHTML = /*html*/ `${svg`Rocket`}` + AppName + ' powered';
      //version.onclick = exportCurrentChat
      // version.href = AppURL;

      // Get the Log out button as a reference
      // const colorModeButton2 = [...nav.children].find((child) =>
      //   child.innerText.includes('Log out')
      // );
      // Insert the "Export Button" before the "Color Mode" button

      // nav.insertBefore(version, colorModeButton2);

      // Create the "IN_BOUND Community Forum" element
      // const forum = document.createElement('a');
      // forum.className = css('VersionInfo');
      // forum.innerHTML = `${svg('Community')} IN_BOUND Community Forum`;
      // forum.href = AppCommunityForumURL;

      // nav.insertBefore(forum, colorModeButton);
    },

    // This function gets the "New Chat" buttons
    getNewChatButtons() {
      // Get the sidebar and topbar elements
      const sidebar = document.querySelector('#nav');
      const topbar = document.querySelector('.sticky');
      // Get the "New Chat" button in the sidebar
      const newChatButton = [
        ...(sidebar?.querySelectorAll('.cursor-pointer') ?? []),
      ].find((e) => e.innerText === 'New chat');
      // Get the "Plus" button in the topbar
      const AddButton = topbar?.querySelector('button.px-3');
      // Return an array containing the buttons, filtering out any null elements
      return [newChatButton, AddButton].filter((button) => button);
    },

    changeFeedToMyPrompts() {
      window.localStorage.setItem('feedSelected', "All");
      this.feedSelected = "All";
      this.insertPromptTemplatesSection();
    },

    copyPromptClipboard(id) {
      // console.log(id)
      IN_BOUND.hidePromptCardOptions();
      setTimeout(function () {
        const templates = [...IN_BOUND.OwnPrompts, ...IN_BOUND.PromptTemplates];
        // console.log(templates)
        const prompt = templates.filter(p => p.ID === id)[0].Prompt;
        // console.log(prompt)
        navigator.clipboard
          .writeText(prompt)
          .then(
            // successfully copied
            () => {


              // Success - copied & public
              IN_BOUND.showNotification(
                NotificationSeverity.SUCCESS,
                'The prompt template was copied to your clipboard.'
              );
            },
            // error - something went wrong (permissions?)
            () => {
              IN_BOUND.showNotification(
                NotificationSeverity.ERROR,
                'Something went wrong. Please try again.'
              );
            }
          );
      }, 100);

    },


    copyTextClipboard(txt) {
      navigator.clipboard
        .writeText(txt)
        .then(
      );
    },


    /**
     * Filter templates based on selected activity and search query
     *
     * @param {Prompt[]} templates
     * @returns {Prompt[]} filtered templates
     */
    filterPromptTemplates(templates) {
      return templates.filter((template) => {
        return (
          (!this.PromptSearch ||
            template.Teaser.toLowerCase().includes(
              this.PromptSearch.toLowerCase()
            ) ||
            template.Title.toLowerCase().includes(
              this.PromptSearch.toLowerCase()
            ) || template.Tags.toLowerCase().includes(
              this.PromptSearch.replace('#', '').toLowerCase()
            ))
        );
      });
    },

    showLoadingInterface(txt) {
      this.getTheme();
      // console.log("Theme 1:"+this.themeMode, "Theme 2:"+this.Theme)

      const html = `
    <div id="custom__ripple_Loader" class="box">
        <div class="ripple__rounds">
        ${this.Theme === 'dark' ? svg('no-txt-logo-dark') : svg('no-txt-logo-light')}
        <p class="loading-text">${txt}</p>
        </div>
        
    </div>

    `;


      let wrapper = document.createElement('div');
      wrapper.id = 'templates-wrapper';
      wrapper.className =
        'mt-2 md:flex items-start text-center gap-2.5 md:max-w-2xl lg:max-w-3xl m-auto text-sm';

      let sideBarWrapper = document.querySelector('#nav');
      if (sideBarWrapper?.querySelector('#templates-wrapper')) {
        wrapper = sideBarWrapper.querySelector('#templates-wrapper');
      } else {
        sideBarWrapper.appendChild(wrapper);
      }

      // wrapper.innerHTML = purify.sanitize(html, {
      //   RETURN_TRUSTED_TYPE: true
      // })
      wrapper.innerHTML = html;
      sideBarWrapper.classList.add("loading");
    },

    hideLoadingInterface() {
      let sideBarWrapper = document?.querySelector('#nav');
      sideBarWrapper?.querySelector('.box')?.classList?.add("not-show");
    },

    checkLoader() {
      if (this.isLoading) {
        this.showLoadingInterface();
      } else {
        this.hideLoadingInterface();
        this.insertPromptTemplatesSection();
      }
    },


    showSavedSearchModal() {

      let savedSearchModal = document.getElementById('savedSearchModal');

      // if modal does not exist, create it, add event listener on submit and append it to body
      if (!savedSearchModal) {
        savedSearchModal = document.createElement('div');
        savedSearchModal.id = 'savedSearchModal';

        document.body.appendChild(savedSearchModal);
      }

      savedSearchModal.innerHTML = `
    <div style="z-index:100;" class="fixed inset-0 text-center transition-opacity z-50 ">
          <div onclick="IN_BOUND.hideModal('savedSearchModal')"  class="absolute bg-gray-900 inset-0 opacity-90">
          </div>

            <div class="fixed inset-0 overflow-y-auto">
              <div  class="flex items-center min-h-full justify-center flex-col">
              <div class=" align-center px-4 py-4 bg-white dark:bg-gray-800 dark:text-gray-200 inline-block overflow-hidden sm:rounded-lg shadow-xl sm:align-middle sm:max-w-lg sm:my-8 sm:w-full text-left transform transition-all"
                role="dialog" aria-modal="true" aria-labelledby="modal-headline" style="text-align: left;">

              <div class="flex" style="justify-content:flex-end;">
                <a title="Close" 
                  class="pb-4 rounded-md hover:bg-gray-100 cursor-pointer hover:text-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-gray-200 disabled:dark:hover:text-gray-400" 
                  onclick="IN_BOUND.hideModal('savedSearchModal')"  >  ${svg('Cross-Round')}</a>
                </div>

                <h2> Saved Searches </h2>
              
    <div id="show_chips_modal" class="flex items-center justify-center gap-2 flex-wrap p-4 max-w-lg">
      ${this.savedSearchList.length > 0 ? this.savedSearchList?.map(tag =>
      `<div class="flex-none p-2">
        <button onclick="IN_BOUND.searchIntoPrompts('${tag}')" 
        class="${css`saveSearchChips`} 
        border-0 border border-gray-500" >${tag}</button> </div>`)
        .join('') : `
        <p class="text-gray-400" >No saved searches</p>
        `}
    </div>
    </div></div></div></div>`;



      savedSearchModal.style = 'display: block;';

      savedSearchModal
        ?.querySelector('#InputToneCategory')
        ?.addEventListener('change', this.changeInputToneCategory.bind(this));

    },

    showMultipleCompanyModal() {

      let multipleCompanyModal = document.getElementById('multipleCompanyModal');

      // if modal does not exist, create it, add event listener on submit and append it to body
      if (!multipleCompanyModal) {
        multipleCompanyModal = document.createElement('div');
        multipleCompanyModal.id = 'multipleCompanyModal';

        document.body.appendChild(multipleCompanyModal);
      }

      multipleCompanyModal.innerHTML = `
    <div style="z-index:100;" class="fixed inset-0 text-center transition-opacity z-50 ">
          <div onclick="IN_BOUND.hideModal('multipleCompanyModal')"  class="absolute bg-gray-900 inset-0 opacity-90">
          </div>

            <div  class="fixed inset-0 overflow-y-auto">
              <div  class="flex items-center min-h-full justify-center flex-col">
              <div class=" align-center px-4 py-4 bg-white dark:bg-gray-800 dark:text-gray-200 inline-block overflow-hidden sm:rounded-lg shadow-xl sm:align-middle sm:max-w-lg sm:my-8 sm:w-full text-left transform transition-all"
                role="dialog" aria-modal="true" aria-labelledby="modal-headline" style="text-align: left;">

              <div  class="flex" style="justify-content:flex-end;">
                <a title="Close" 
                  class="pb-4 rounded-md hover:bg-gray-100 cursor-pointer hover:text-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-gray-200 disabled:dark:hover:text-gray-400" 
                  onclick="IN_BOUND.hideModal('multipleCompanyModal')"  >  ${svg('Cross-Round')}</a>
                </div>

                <h2> Select Company </h2>
              
    <div id="show_chips_modal" class="flex items-center justify-center gap-2 flex-wrap p-4 max-w-lg">
      ${this.allCompanies.length > 1 ? this.allCompanies?.map(company =>
      `<div class="flex-none p-2">
        <button onclick="IN_BOUND.selectCompany('${company.id}')" 
        class="${css`saveSearchChips`} 
          ${company.id === this.selectedCompany ? "border" : "border-0"} border-gray-500" >${company.name}</button> </div>`)
        .join('') : `
        <p class="text-gray-400" >You're not member of multiple companies!</p>
        `}
    </div>
    </div></div></div></div>`;

      multipleCompanyModal.style = 'display: block;';

    },

    showMultipleTeamsModal() {

      let showMultipleTeamsModal = document.getElementById('showMultipleTeamsModal');

      // if modal does not exist, create it, add event listener on submit and append it to body
      if (!showMultipleTeamsModal) {
        showMultipleTeamsModal = document.createElement('div');
        showMultipleTeamsModal.id = 'showMultipleTeamsModal';

        document.body.appendChild(showMultipleTeamsModal);
      }

      showMultipleTeamsModal.innerHTML = `
    <div style="z-index:100;" class="fixed inset-0 text-center transition-opacity z-50 ">
          <div onclick="IN_BOUND.hideModal('showMultipleTeamsModal')"  class="absolute bg-gray-900 inset-0 opacity-90">
          </div>

            <div  class="fixed inset-0 overflow-y-auto">
              <div  class="flex items-center min-h-full justify-center flex-col">
              <div class=" align-center px-4 py-4 bg-white dark:bg-gray-800 dark:text-gray-200 inline-block overflow-hidden sm:rounded-lg shadow-xl sm:align-middle sm:max-w-lg sm:my-8 sm:w-full text-left transform transition-all"
                role="dialog" aria-modal="true" aria-labelledby="modal-headline" style="text-align: left;">

              <div  class="flex" style="justify-content:flex-end;">
                <a title="Close" 
                  class="pb-4 rounded-md hover:bg-gray-100 cursor-pointer hover:text-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-gray-200 disabled:dark:hover:text-gray-400" 
                  onclick="IN_BOUND.hideModal('showMultipleTeamsModal')"  >  ${svg('Cross-Round')}</a>
                </div>

                <h2> Select Company </h2>
              
    <div id="show_chips_modal" class="flex items-center justify-center gap-2 flex-wrap p-4 max-w-lg">
      ${this.allTeams.length > 1 ? this.allTeams?.map(team =>
      `<div class="flex-none p-2">
        <button onclick="IN_BOUND.selectTeam('${team.id}')" 
        class="${css`saveSearchChips`} 
          ${team.id === this.selectedTeam ? "border" : "border-0"} border-gray-500" >${team.tag}</button> </div>`)
        .join('') : `
        <p class="text-gray-400" >You're not member of multiple teams!</p>
        `}
    </div>
    </div></div></div></div>`;

      showMultipleTeamsModal.style = 'display: block;';

    },

    showFolderModal() {

      let showFolderModal = document.getElementById('showFolderModal');

      // if modal does not exist, create it, add event listener on submit and append it to body
      if (!showFolderModal) {
        showFolderModal = document.createElement('div');
        showFolderModal.id = 'showFolderModal';

        document.body.appendChild(showFolderModal);
      }

      showFolderModal.innerHTML = `
    <div style="z-index:100;" class="fixed inset-0 text-center transition-opacity z-50 ">
          <div onclick="IN_BOUND.hideModal('showFolderModal')"  class="absolute bg-gray-900 inset-0 opacity-90">
          </div>

            <div  class="fixed inset-0 overflow-y-auto">
              <div  class="flex items-center min-h-full justify-center flex-col">
              <div class=" w-1/2 align-center px-4 py-4 bg-white dark:bg-gray-800 dark:text-gray-200 inline-block overflow-hidden sm:rounded-lg shadow-xl sm:align-middle sm:max-w-lg sm:my-8 sm:w-full text-left transform transition-all"
                role="dialog" aria-modal="true" aria-labelledby="modal-headline" style="text-align: left;">

              <div  class="flex" style="justify-content:flex-end;">
                <a title="Close" 
                  class="pb-4 rounded-md hover:bg-gray-100 cursor-pointer hover:text-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-gray-200 disabled:dark:hover:text-gray-400" 
                  onclick="IN_BOUND.hideModal('showFolderModal')"  >  ${svg('Cross-Round')}</a>
                </div>

                <h2> Manage Folders </h2>

                <div class="p-1 flex flex-row gap-4 justify-between w-full" >

                <div class="flex items-center justify-centerflex-wrap w-full">
                  <input id="folderName" type="text" title="Folder Name" required="" placeholder="Folder Name" class="w-full bg-gray-100 dark:bg-gray-700 dark:border-gray-700 rounded p-=1 w-full">
                </div>

                <div class="flex items-center justify-center flex-wrap">
                <button id="addFolder" class="p-1 rounded-md hover:bg-gray-100 cursor-pointer hover:text-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-gray-200" >
                    Add Folder 
                </button></div>

                <div  class="flex items-center justify-center flex-wrap" >
                <a 
                class="p-1 text-center rounded-md hover:bg-gray-100 cursor-pointer hover:text-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-gray-200"
                  onclick="IN_BOUND.folderManager.selectFolder('')"   >  Clear Selection </a>
                </div>

                </div>

                
              
    <div id="show_chips_modal" class="flex items-center justify-center gap-2 flex-wrap p-4">
      ${this.folderManager.folders.length > 1 ? this.folderManager.folders?.map(folder =>
      `<div class="flex-none p-2 rounded border border-gray-500 dark:border-gray-600">
        <button onclick="IN_BOUND.folderManager.selectFolder('${folder.name}')" 
        class="rounded font-small bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-400 dark:hover:text-white px-2 py-1
          ${folder.name === this.folderManager.selectedFolder ? "border" : "border-0"} border-gray-500" >${folder.name} </button> 
          <button onclick="IN_BOUND.folderManager.deleteFolder('${folder.name}'); IN_BOUND.showFolderModal();" class="p-1 rounded-md hover:bg-gray-100 cursor-pointer hover:text-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-gray-200" > 
              ${svg("Cross")} </button>
          </div>`)
        .join('') : `
        <p class="text-gray-400" >You're not member of multiple teams!</p>
        `}
    </div>
    </div></div></div></div>`;

      showFolderModal.style = 'display: block;';

      showFolderModal.querySelector('#addFolder').addEventListener('click', () => {
        IN_BOUND.folderManager.createFolder(document.querySelector('#folderName')?.value);
        IN_BOUND.showFolderModal();
      });

    },

    showFolderSelectionModal() {

      let showFolderSelectionModal = document.getElementById('showFolderSelectionModal');

      // if modal does not exist, create it, add event listener on submit and append it to body
      if (!showFolderSelectionModal) {
        showFolderSelectionModal = document.createElement('div');
        showFolderSelectionModal.id = 'showFolderSelectionModal';

        document.body.appendChild(showFolderSelectionModal);
      }

      showFolderSelectionModal.innerHTML = `
    <div style="z-index:100;" class="fixed inset-0 text-center transition-opacity z-50 ">
          <div onclick="IN_BOUND.hideModal('showFolderSelectionModal')"  class="absolute bg-gray-900 inset-0 opacity-90">
          </div>

            <div  class="fixed inset-0 overflow-y-auto">
              <div  class="flex items-center min-h-full justify-center flex-col">
              <div class=" w-1/2 align-center px-4 py-4 bg-white dark:bg-gray-800 dark:text-gray-200 inline-block overflow-hidden sm:rounded-lg shadow-xl sm:align-middle sm:max-w-lg sm:my-8 sm:w-full text-left transform transition-all"
                role="dialog" aria-modal="true" aria-labelledby="modal-headline" style="text-align: left;">

              <div  class="flex" style="justify-content:flex-end;">
                <a title="Close" 
                  class="pb-4 rounded-md hover:bg-gray-100 cursor-pointer hover:text-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-gray-200 disabled:dark:hover:text-gray-400" 
                  onclick="IN_BOUND.hideModal('showFolderSelectionModal')"  >  ${svg('Cross-Round')}</a>
                </div>

                <h2> Choose A Folder </h2>

                
              
    <div id="show_chips_modal" class="flex items-center justify-center gap-2 flex-wrap p-4">
      ${this.folderManager.folders.length > 1 ? this.folderManager.folders?.map(folder =>
      `<div class="flex-none p-2">
        <button onclick="IN_BOUND.promptSelectionManager.addToFolder('${folder.name}')" 
        class="${css`saveSearchChips`} 
          border-0 border-gray-500" >${folder.name}</button> </div>`)
        .join('') : `
        <p class="text-gray-400" >You're not member of multiple teams!</p>
        `}
    </div>
    </div></div></div></div>`;

      showFolderSelectionModal.style = 'display: block;';

    },

    selectTeam(id) {
      this.selectedTeam = id;
      sessionStorage.setItem('team_id', id);
      this.insertPromptTemplatesSection();
      this.hideModal('showMultipleTeamsModal');
    },

    selectCompany(id) {
      this.selectedCompany = id;
      this.showLoadingInterface("Loading...");
      sessionStorage.setItem('company_id', id);
      sessionStorage.setItem('team_id', "");
      this.selectTeam("");
      this.reloadAllData();
      this.hideModal('multipleCompanyModal');
    },


    folderManager: {
      folders: [],
      selectedFolder: "",

      initializeFolders() {
        const storedFolders = localStorage.getItem('folders');
        this.selectedFolder = localStorage.getItem('selectedFolder') || "";
        if (storedFolders) {
          this.folders = JSON.parse(storedFolders);
        }
      },

      saveFolders() {
        localStorage.setItem('folders', JSON.stringify(this.folders));
        // console.log('Folders saved successfully.');
      },

      selectFolder(name) {
        this.selectedFolder = name;
        localStorage.setItem('selectedFolder', name);
        // console.log('Folders selected successfully.');
        IN_BOUND.hideModal('showFolderModal');
        IN_BOUND.insertPromptTemplatesSection();
      },

      createFolder(folderName) {
        if (!folderName) {
          // console.log('Folder name cannot be empty.');
          return;
        }

        const folder = {
          name: folderName,
          company: IN_BOUND.selectedCompany,
          team: IN_BOUND.selectedTeam,
          prompts: []
        };

        this.folders.push(folder);
        this.saveFolders();
        // console.log(`Folder "${folderName}" created successfully.`);
      },

      editFolder(folderName, newFolderName) {
        const folder = this.getFolder(folderName);
        if (folder) {
          folder.name = newFolderName;
          this.saveFolders();
          // console.log(`Folder "${folderName}" renamed to "${newFolderName}" successfully.`);
        }
      },

      deleteFolder(folderName) {
        const folderIndex = this.getFolderIndex(folderName);
        if (folderIndex !== -1) {
          this.folders.splice(folderIndex, 1);
          this.saveFolders();
          // console.log(`Folder "${folderName}" deleted successfully.`);
        }
      },

      addPrompt(folderName, promptID) {
        const folder = this.getFolder(folderName);
        if (folder) {
          const newPrompt = promptID;
          const existingPrompt = folder.prompts.find(p => p === promptID);
          if (existingPrompt) {
            // console.log(`A prompt with the title "${title}" already exists in the folder "${folderName}".`);
            return;
          }
          folder.prompts.push(newPrompt);
          this.saveFolders();
          // console.log(`Prompt added to folder "${folderName}" successfully.`);
        }
      },

      getFolder(folderName) {
        return this.folders.find(folder => folder.name === folderName);
      },

      getFolderIndex(folderName) {
        return this.folders.findIndex(folder => folder.name === folderName);
      }
    },

    promptSelectionManager: {
      selectedIds: [],

      manageId: function (id) {
        if (!this.selectedIds.includes(id)) {
          this.selectedIds.push(id);
          // console.log(`ID ${id} added successfully.`);
        } else {
          // console.log(`ID ${id} already exists.`);
          const index = this.selectedIds.indexOf(id);
          if (index > -1) {
            this.selectedIds.splice(index, 1);
            // console.log(`ID ${id} removed successfully.`);
          }
        }
        IN_BOUND.insertPromptTemplatesSection();
      },

      addToFolder: function (folder) {
        this.selectedIds?.map(id => {
          IN_BOUND.folderManager.addPrompt(folder, id);
        });

        IN_BOUND.hideModal('showFolderSelectionModal');
        this.selectedIds = [];
        IN_BOUND.insertPromptTemplatesSection();
      }

    },


    // This function inserts a section containing a list of prompt templates into the chat interface
    insertPromptTemplatesSection() {

      let templates = this.PromptTemplates;

      if (!templates) return;

      templates =
        this.PromptTemplatesType === PromptTemplatesType.OWN
          ? this.OwnPrompts
          : templates;

      // Use index as ID for each template actions
      templates = templates.map((template, index) => ({
        ...template,
        promptID: template.ID,
        ID: index,
        pin: template.pin === undefined ? false : template.pin,
        favourite: template.favourite === undefined ? false : template.favourite,
      }));
      // console.log("Initial All Templates: ",templates)

      templates = this.filterPromptTemplates(templates);
      // if(this.selectedTeam){
      //   templates = templates.filter(prompt => prompt.teamID === this.selectedTeam )
      // }else{
      //   templates = templates.filter(prompt => prompt?.teamID ? prompt?.teamID === "" : true )
      // }

      // if(this.folderManager.selectedFolder){
      //   const folderData = IN_BOUND.folderManager.getFolder(IN_BOUND.folderManager.selectedFolder)
      //   templates = templates.filter(prompt => folderData.prompts.indexOf(prompt.promptID) > -1 )
      // }

      // console.log(templates)

      let pinTemplates = templates.filter(template => template.pin === true);
      let normalTemplates = templates.filter(template => template.pin === false);
      templates = [...pinTemplates, ...normalTemplates];

      // console.log("All Templates: ",templates)

      // if(this.PromptTemplatesType === PromptTemplatesType.OWN){
      templates = this.feedSelected === "All" ? templates : templates.filter(prompt => prompt.favourite === true) || [];
      // }
      let currentTemplates = templates;


      if (this.PromptTemplatesType === PromptTemplatesType.OWN) {

        this.promptsOrderLocal = JSON.parse(localStorage.getItem('promptsOrderLocal'));
        if (this.promptsOrderLocal?.index) {
          this.promptsOrderLocal = [this.promptsOrderLocal];
        }


        const arrayIndxes = this.promptsOrderLocal?.filter(i => i.team === IN_BOUND.selectedTeam && i.company === IN_BOUND.selectedCompany && i.folder === IN_BOUND.folderManager.selectedFolder)[0]?.index || [];

        let newerPrompts = [];

        if (arrayIndxes.length < currentTemplates.length) {
          const newPrompt = currentTemplates.filter(prompt => !arrayIndxes.map(i => i[0]).includes(prompt.promptID));
          newPrompt.map(t => {
            // arrayIndxes.push([t.promptID, arrayIndxes.length])
            newerPrompts.push(t);
          });
        }

        // Create a new array to store the rearranged items 
        const rearrangedArray = [];

        // Iterate over the arrayIndxes array
        for (const [id, index] of arrayIndxes) {
          // console.log("ID Match-  ",id, index)
          // Find the item in userTones array with matching ID
          const item = currentTemplates.find((prompt) => {
            // console.log(prompt.promptID, id)
            return prompt.promptID === id
          });

          // If the item is found, add it to the rearranged array at the specified index
          if (item) {
            rearrangedArray[index] = item;
          }
        }
        // console.log('Rearranged Prompts', rearrangedArray)

        // Remove any undefined elements from the rearranged array
        const sortedPrompts = rearrangedArray.filter((item) => item !== undefined);

        // Print the rearranged array
        // console.log('Sorted Prompts',sortedPrompts, currentTemplates);
        // console.log("New Prrompts", newerPrompts)
        // const newerPrompts = currentTemplates.filter( prompt => !sortedPrompts.map( i => i.promptID ).includes( prompt.promptID) )
        sortedPrompts.length > 0 ? currentTemplates = [...newerPrompts, ...sortedPrompts] : currentTemplates;
        // console.log("Length: ",sortedPrompts.length > 0)
        currentTemplates = currentTemplates.filter(template => template.pin === false);
        // console.log(currentTemplates)
      }

      // Get the current page number and page size from the promptTemplateSection object
      const { currentPage, pageSize } = this.PromptTemplateSection;
      // Calculate the start and end indices of the current page of prompt templates
      const start = pageSize * currentPage;
      const end = Math.min(pageSize * (currentPage + 1), templates.length);
      // Get the current page of prompt templates
      // currentTemplates = currentTemplates.slice(start, end);

      this.current_active_prompts = currentTemplates;
      // console.log("Templates: ", currentTemplates)

      /**
       * Add search typed prediction words to a list
       */
      let predict = currentTemplates.map(t => t.Tags.toString().split(',')).flat(1);
      this.searchPredictionList = Array.from(new Set(predict));



      const chainOfPrompts = JSON.parse(localStorage.getItem('chainOfPrompts') ? localStorage.getItem('chainOfPrompts') : '[]');
      const remainingChainOfPrompt = chainOfPrompts.filter(d => d.completed == false);
      const completedChainOfPrompts = chainOfPrompts.filter(d => d.completed == true);

      // const paginationContainerTop = /*html*/ `


      //   <div class="flex flex-1 gap-3.5 justify-between items-center sm:flex-col ">
      //   <div></div>

      //     <div class="${css`paginationButtonGroup`}">
      //       <button onclick="IN_BOUND.prevPromptTemplatesPage()" class="${css`paginationButton`}" style="border-radius: 6px 0 0 6px">${svg`previous`}</button>
      //       <button onclick="IN_BOUND.nextPromptTemplatesPage()" class="${css`paginationButton`} border-0 border-l border-gray-500" style="border-radius: 0 6px 6px 0">${svg`next`}</button>
      //     </div>
      //   </div>
      // `;

      const tools = this.allCompanies.length > 1 ? `
        <div id="show_chips_modal" class="flex items-center overflow-hidden space-x-2 px-2 min-w-xs max-w-md">
      ${""}

          ${""}


          ${this.allCompanies.length > 1 ? `<div class="flex-none">
          <button onclick="IN_BOUND.showMultipleCompanyModal()" 
          class="${css`saveSearchChips`} 
          border-0 border border-gray-500" > ${this.allCompanies?.filter(c => c.id === IN_BOUND.selectedCompany)[0]?.name || "Companies"}  </button> </div>` : ""}

          ${this.allTeams.length === "djdghwyeiwudb" ? `<div class="flex-none">
          <button onclick="IN_BOUND.showMultipleTeamsModal()" 
          class="${css`saveSearchChips`} 
          border-0 border border-gray-500" >Teams</button> </div>` : ""}

          

      </div>
  ` : "";
      // const tools = ''

      const paginationContainerBottom = /*html*/ `
    
    <div class="flex flex-1 gap-3.5 justify-between items-center sm:flex-col ">
    <span class="${css`paginationText`}">
        Showing <span class="${css`paginationNumber`}">${start + 1
      }</span> to <span class="${css`paginationNumber`}">${end}</span> of <span class="${css`paginationNumber`}">${templates.length
      } Prompts</span>
      </span>

      <div class="${css`paginationButtonGroup`}">
        <button onclick="IN_BOUND.prevPromptTemplatesPage()" class="${css`paginationButton`}" style="border-radius: 6px 0 0 6px">${svg`previous`}</button>
        <button onclick="IN_BOUND.nextPromptTemplatesPage()" class="${css`paginationButton`} border-0 border-l border-gray-500" style="border-radius: 0 6px 6px 0">${svg`next`}</button>
      </div>
    </div>
  `;

      // Create the HTML for the prompt templates section
      const html = /*html*/ `
    <div class="${css`column`} relative">

      ${this.isAdmin()
        ? /*html*/ `
            <div class="absolute top-0 right-0">
              <label class="relative inline-flex items-center mb-5 cursor-pointer flex-col" title="Admin Mode">
                <input type="checkbox" value="" class="sr-only peer" id="adminMode" onchange="IN_BOUND.toggleAdminMode()" ${this.AdminMode ? ' checked' : ''
        }>
                <div class="w-9 h-5 bg-gray-200 peer-focus:outline-none rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all dark:border-gray-600 peer-checked:bg-gray-600"></div>
                <span class="ml-3 text-sm font-medium text-gray-900 dark:text-gray-300"></span>
              </label>
            </div>
          `
        : ''
      }

    
      <div class="flex flex-1 gap-3.5 justify-between items-center"  >
        <div>
        ${this.Theme === 'dark' ? this.companyMeta.light_logo ? `<img src='${this.companyMeta.light_logo}' class="logo-bg" />` : svg('Logo-light') : this.companyMeta.dark_logo ? `<img src='${this.companyMeta.dark_logo}' class="logo-bg" />` : svg('Logo-dark')}
        </div>
        <div  class="flex gap-1 justify-end items-start" >
        
        ${tools}

        ${this.features.setting?.allow ? `<a title="${extensionText.titleOnTopIcons[0]}" class="p-1 rounded-md hover:bg-gray-100 cursor-pointer hover:text-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-gray-200 disabled:dark:hover:text-gray-400" 
        onclick="IN_BOUND.showSettingModal()">${svg('setting')}</a>` : ''}

        </div>
      </div>
  

  
      <div class="flex flex-1 gap-3.5 justify-between items-center  ">
      <div class="flex flex-1 gap-3.5 justify-between  ">

        <div class="flex flex-1 gap-2 justify-start items-start sm:flex-col ">
      
       <div>
          <select id="promptTypeSelect" class="bg-gray-100 pr-7 border-0 text-xs rounded block w-full dark:bg-gray-600 dark:border-gray-600 dark:hover:bg-gray-700 dark:placeholder-gray-400 dark:text-white hover:bg-gray-200 focus:ring-0">
            
          ${this.features.public_prompts?.allow ? `<option class="mx-1 dark:bg-gray-700 dark:text-white"  value="${PromptTemplatesType.PUBLIC}" ${this.PromptTemplatesType === PromptTemplatesType.PUBLIC ? 'selected' : ''
        }>${extensionText.tabsLabel[0]}</option>` : ""}

          ${this.features.private_prompts?.allow ? `<option class="mx-1 dark:bg-gray-700 dark:text-white"  value="${PromptTemplatesType.OWN}" ${this.PromptTemplatesType === PromptTemplatesType.OWN ? 'selected' : ''
        }>${extensionText.tabsLabel[1]}</option>` : ""}
            
          </select>
        </div>

        <div class=" flex gap-1 justify-start items-center h-full ">

        ${this.features.add_prompt?.allow ? `<a title="${extensionText.titleOnTopIcons[1]}" class="p-1 rounded-md cursor-pointer hover:bg-gray-100 hover:text-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-gray-200 disabled:dark:hover:text-gray-400" 
        onclick="IN_BOUND.showSavePromptModal()">${svg('add')}</a>` : ""}

        ${this.features.import_export?.allow ? `<a title="${extensionText.titleOnTopIcons[2]}" class="p-1 rounded-md cursor-pointer hover:bg-gray-100 hover:text-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-gray-200 disabled:dark:hover:text-gray-400" 
        onclick="IN_BOUND.clickeFileInput()"> ${svg('import')} <input id="dropzone-file589" type="file" accept=".json" class="hidden" /></a>` : ""}

        
        </div>

      </div>

      <div class="flex gap-1 justify-end items-start">

      ${this.features.reload?.allow && 1 === 2 ? `<a title="Reload All Data" class="p-1 rounded-md hover:bg-gray-100 cursor-pointer hover:text-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-gray-200 disabled:dark:hover:text-gray-400" 
        onclick="IN_BOUND.reloadAllData()">${svg('reload')}</a>` : ""}
      
      
        

        ${this.features.favourites?.allow ? `<a title="${extensionText.titleOnTopIcons[5]}" class="p-1 rounded-md cursor-pointer hover:bg-gray-100 hover:text-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-gray-200 disabled:dark:hover:text-gray-400" onclick="IN_BOUND.changeFeedSelect('${this.feedSelected === "All" ? "Favourites" : "All"}')">
        ${this.feedSelected === "All" ? svg`star-gray` : svg`star-yellow`} </a>` : ''}
  
        ${this.features.expanded_view?.allow ? `<a title="${extensionText.titleOnTopIcons[3]}" class="p-1 rounded-md cursor-pointer hover:bg-gray-100 hover:text-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-gray-200 disabled:dark:hover:text-gray-400" onclick="IN_BOUND.changeFeedView('list')">
        ${this.feedView === "list" ? svg`list-yellow` : svg`list`} </a>` : ""}
  
        ${this.features.collapsed_view?.allow ? `<a title="${extensionText.titleOnTopIcons[4]}" class="p-1 rounded-md cursor-pointer hover:bg-gray-100 hover:text-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-gray-200 disabled:dark:hover:text-gray-400" onclick="IN_BOUND.changeFeedView('grid')">
        ${this.feedView === "grid" ? svg`grid-yellow` : svg`grid`} </a>` : ''}

      </div>

      </div>
      </div>



       ${this.features.search?.allow ? `<div class="flex flex-row items-center " >
          <input list="prediction" id="promptSearchInput" type="text" class="bg-gray-100 border-0 text-sm rounded-l block w-full dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white hover:bg-gray-200 focus:ring-0 md:w-full" placeholder="${extensionText.search}" 
          value="${sanitizeInput(
          this.PromptSearch
        )}" onfocus="this.value = this.value">
            <datalist id="prediction">
            ${this.searchPredictionList.map(p => (
          `<option style="font-size:small; padding:0;" value="${p}"></option>`
        )).join('')}
            </datalist>
            ${""}
        </div>`: ''}

        ${remainingChainOfPrompt.length > 0 ? `<p class=" dark:text-gray-400 disabled:dark:hover:text-gray-400"> 
        ${remainingChainOfPrompt.length} of ${chainOfPrompts.length} tasks remaining in chain of prompts! 
              ${IN_BOUND.runCsvChainOfPromptsState === false ? `<a class="underline cursor-pointer px-2" onclick="IN_BOUND.runCsvChainOfPrompts(0)">  Continue </a>
               or <a class="underline cursor-pointer px-2" onclick="IN_BOUND.downloadAndUploadChainOfPrompts()">  Sync </a> or ` : ""} 
              
              <a class="underline cursor-pointer pl-2" onclick="IN_BOUND.clearChainOfPromptsData()">  Clear Local Data </a>
            </p>`
        : completedChainOfPrompts.length > 0 ? `
          <p class="dark:text-gray-400 disabled:dark:hover:text-gray-400">${completedChainOfPrompts.length}  of ${chainOfPrompts.length} tasks completed in chain of prompts! 
            <a class="underline cursor-pointer px-2" onclick="IN_BOUND.downloadAndUploadChainOfPrompts()">  Download and Upload to Sheet again </a>
             or 
            <a class="underline cursor-pointer pl-2" onclick="IN_BOUND.clearChainOfPromptsData()">  Clear Local Data </a>
            </p>
          ` : ""}


        ${this.feedSelected !== "All" ? currentTemplates.length === 0 ? "<p>No Favourite Prompts!</p>" : "" : currentTemplates.length === 0 ? "<p>No Prompts!</p>" : ""} 


      ${pinTemplates.length > 0 ? `<div class="${css`ul`} grid grid-cols-1 "  >
        ${this.feedView === "list" ? pinTemplates
          ?.map(
            (template) => /*html*/ `
          <button  data-id="${template.promptID}" class="${css`card`} relative group  " >
            <div class="flex items-center w-full justify-between">

            <div class="text-gray-500 text-xs flex  max-w-full">

            ${this.PromptTemplatesType === PromptTemplatesType.OWN?.length ? `<a title="Select/ Unselect" class=" rounded-md cursor-pointer hover:bg-gray-100 hover:text-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-gray-200 disabled:dark:hover:text-gray-400" onclick="IN_BOUND.promptSelectionManager.manageId('${template.promptID}')">
              ${this.promptSelectionManager.selectedIds.indexOf(template.promptID) > -1 ? svg`checked_checkbox` : svg`empty_checkbox`} </a>` : ""}
             
              ${template.AuthorURL && template.AuthorName
                ? /*html*/ `
                    <a href="#" class="mx-1 overflow-hidden text-ellipsis flex-1"
                      style="white-space: nowrap;"
                      onclick="event.stopPropagation()"
                      rel="noopener noreferrer" 
                      title="${extensionText.authorTitle} ${sanitizeInput(template.AuthorName)} - ${sanitizeInput(template.AuthorURL)}">
                      ${sanitizeInput(template.AuthorName).slice(0, 15)}
                    </a>`
                : ''
              }            
              · 
              <span title="${extensionText.timeTitle} ${formatDateTime(
                template.RevisionTime
              )}" class="mx-1">${formatAgo(template.RevisionTime)}</span>

            </div>

            ${this.PromptTemplatesType === PromptTemplatesType.PUBLIC &&
                template.PromptTypeNo === 2
                ? `
              
            ${this.access.cardMenuInDots ? `<div class="flex gap-4 justify-center lg:gap-1 lg:pl-2 mt-1 right-2 text-gray-400   group-hover:visible">

            ${""}

            ${this.features.copy?.allow ? `<a title="${this.forkPromptTemplates.includes(template.promptID) ? extensionText.cardIconsTitle[3] : extensionText.cardIconsTitle[2]}" class="p-1 ${this.forkPromptTemplates.includes(template.promptID) ? "cursor-not-allowed" : ""} rounded-md hover:bg-gray-100 hover:text-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-gray-200 disabled:dark:hover:text-gray-400" 
                      onclick=" ${this.forkPromptTemplates.includes(template.promptID) ? "" : `IN_BOUND.forkPrompt('${template.promptID}')`}"> ${this.forkPromptTemplates.includes(template.promptID) ? svg('fork-yellow') : svg('fork')}</a>` : ""}

               <a title="Show Options" id="PromptCardOptionsBtn" onclick="IN_BOUND.toogleOptionsVisibility('PromptCardOptions-${template.ID}')" class=" hidden p-1 rounded-md hover:bg-gray-100 hover:text-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-gray-200 disabled:dark:hover:text-gray-400" >${svg('horizontal-menu')}</a>
            </div>` : ""}` :

                `<div class="flex gap-4 justify-center lg:gap-1 lg:pl-2 mt-1 right-2 text-gray-400   group-hover:visible">

            ${this.features.favourites?.allow ? `<a title="${template.favourite ? extensionText.cardIconsTitle[1] : extensionText.cardIconsTitle[0]}" class="p-1 rounded-md hover:bg-gray-100 hover:text-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-gray-200 disabled:dark:hover:text-gray-400" onclick="event.stopPropagation(); IN_BOUND.${template.favourite ? 'voteThumbsDown' : 'voteThumbsUp'}('${template.promptID
                  }')">${svg(template.favourite ? 'star-yellow' : 'star-gray')}</a>` : ''}

            ${this.features.pin?.allow ? ` <a title="${template.pin ? extensionText.cardIconsTitle[5] : extensionText.cardIconsTitle[4]}" class="p-1 rounded-md hover:bg-gray-100 hover:text-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-gray-200 disabled:dark:hover:text-gray-400" onclick="event.stopPropagation(); IN_BOUND.${template.pin ? 'removePin' : 'addToPin'}('${template.promptID
                  }')">${svg(template.pin ? 'pin-yellow' : 'pin-gray')}</a>` : ""}

               <a title="Show Options" id="PromptCardOptionsBtn" onclick="IN_BOUND.toogleOptionsVisibility('PromptCardOptions-${template.ID}')" class=" p-1 rounded-md hover:bg-gray-100 hover:text-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-gray-200 disabled:dark:hover:text-gray-400" >${svg('horizontal-menu')}</a>
            </div>`}



            <div style="top:40px; z-index:99999; box-shadow:0 2px 5px 6px rgba(0, 0, 0, 0.1); " class="${this.access.cardMenuInDots ? "hidden absolute right-1 rounded shadow-lg px-1 py-1 flex-col bg-white dark:bg-gray-800  dark:border-bg-ray-700" : "flex right-1"} gap-2 justify-center  mt-1 text-gray-600 group-hover:visible PromptCardOptions"  id="PromptCardOptions-${template.ID}">

                ${this.PromptTemplatesType === PromptTemplatesType.PUBLIC &&
                template.PromptTypeNo === 2
                ? /*html*/ `
                    
                    ${this.features.copy?.allow ? `<a title="${this.forkPromptTemplates.includes(template.promptID) ? extensionText.cardIconsTitle[3] : extensionText.cardIconsTitle[2]}" class="p-1 ${this.forkPromptTemplates.includes(template.promptID) ? "cursor-not-allowed" : ""} rounded-md hover:bg-gray-100 hover:text-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-gray-200 disabled:dark:hover:text-gray-400" 
                      onclick=" ${this.forkPromptTemplates.includes(template.promptID) ? "" : `IN_BOUND.forkPrompt('${template.promptID}')`}"> ${this.forkPromptTemplates.includes(template.promptID) ? svg('fork-yellow') : svg('fork')}</a>` : ""}

                    `
                : `
                      
                      

                    `
              }
                
                ${this.PromptTemplatesType === PromptTemplatesType.OWN ||
                template.PromptTypeNo === 1 ||
                this.isAdminMode()
                ? /*html*/ `

                    ${this.promptSelectionManager.selectedIds.indexOf(template.promptID) > -1 ? `

                      <a title="Add to Folder" class=" relative flex flex-row gap-2 p-1 rounded-md hover:bg-gray-100 hover:text-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-gray-200 disabled:dark:hover:text-gray-400" onclick="IN_BOUND.showFolderSelectionModal()">
                      ${svg('folder')} Add to Folder</a>

                    `  : `
                    ${this.features.edit?.allow ? `<a title="${extensionText.editPrmptTitle}" class=" relative flex flex-row gap-2 p-1 rounded-md hover:bg-gray-100 hover:text-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-gray-200 disabled:dark:hover:text-gray-400" onclick="event.stopPropagation(); IN_BOUND.editPromptTemplate(${template.ID
                  })">${svg('Edit')} Edit</a>` : ""}

                    ${this.features.import_export?.allow ? `<a title="${extensionText.cardIconsTitle[6]}" class=" relative flex flex-row gap-2 p-1 rounded-md hover:bg-gray-100 hover:text-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-gray-200 disabled:dark:hover:text-gray-400" onclick="event.stopPropagation(); IN_BOUND.exportPromptTemplate('${template.promptID
                  }')">${svg('export')} Download</a>` : ""}

                    ${this.features.copy?.allow ? `<a title="Copy Prompt" class=" relative flex flex-row gap-2 p-1 rounded-md hover:bg-gray-100 hover:text-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-gray-200 disabled:dark:hover:text-gray-400" 
                      onclick="event.stopPropagation(); IN_BOUND.copyPromptClipboard('${template.promptID}')">${svg('copy')} Copy</a>` : ""}

                  ${this.features.delete?.allow ? `<a title="${extensionText.dltPrmptTitle}" class=" relative flex flex-row gap-2 p-1 rounded-md hover:bg-gray-100 hover:text-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-gray-200 disabled:dark:hover:text-gray-400" onclick="event.stopPropagation(); IN_BOUND.deletePromptTemplate(${template.ID
                  })">${svg('trash')} Delete</a>` : ""}
                    
                    ` }`
                : ''
              }


              </div>
            </div>      

            <div onclick="IN_BOUND.selectPromptTemplateByIndex(${template.ID
              })" class="w-full">
            <h4 class="${css`h3`}" style="overflow-wrap: anywhere;">${sanitizeInput(
                template.Title
              )}</h4>
            
            <p class="${css`p`} text-gray-600 dark:text-gray-200 overflow-hidden text-ellipsis" style="display: -webkit-box; -webkit-line-clamp: 3; -webkit-box-orient: vertical;"
              title="${sanitizeInput(template.Teaser)}">
              ${sanitizeInput(template.Teaser)}
            </p>
            </div>
            

        </button>
      `
          )
          .join('')
          :
          pinTemplates
            ?.map(
              (template) => /*html*/ `
          <button  class="${css`card`} relative group  "  data-id="${template.promptID}"  >
            <div   class="flex gap-2 items-center w-full justify-between">
            
            ${this.PromptTemplatesType === PromptTemplatesType.OWN?.length ? `<a title="Select/ Unselect" class=" rounded-md cursor-pointer hover:bg-gray-100 hover:text-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-gray-200 disabled:dark:hover:text-gray-400" onclick="IN_BOUND.promptSelectionManager.manageId('${template.promptID}')">
              ${this.promptSelectionManager.selectedIds.indexOf(template.promptID) > -1 ? svg`checked_checkbox` : svg`empty_checkbox`} </a>` : ""}

              <h4 onclick="IN_BOUND.selectPromptTemplateByIndex(${template.ID
                })" class="${css`h3`}" style="overflow: hidden; text-overflow: ellipsis; white-space: nowrap; width:100%; ">${sanitizeInput(
                  template.Title
                )}</h4>

            ${this.PromptTemplatesType === PromptTemplatesType.PUBLIC &&
                  template.PromptTypeNo === 2
                  ?

                  `${this.access.cardMenuInDots ? `<div class="flex gap-4 justify-center lg:gap-1 lg:pl-2 mt-1 right-2 text-gray-400   group-hover:visible">

            ${""}

            ${this.features.copy?.allow ? `<a title="${this.forkPromptTemplates.includes(template.promptID) ? extensionText.cardIconsTitle[3] : extensionText.cardIconsTitle[2]}" class="p-1 ${this.forkPromptTemplates.includes(template.promptID) ? "cursor-not-allowed" : ""} rounded-md hover:bg-gray-100 hover:text-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-gray-200 disabled:dark:hover:text-gray-400" 
                      onclick=" ${this.forkPromptTemplates.includes(template.promptID) ? "" : `IN_BOUND.forkPrompt('${template.promptID}')`}"> ${this.forkPromptTemplates.includes(template.promptID) ? svg('fork-yellow') : svg('fork')}</a> ` : ""}


            <a title="Show Options" id="PromptCardOptionsBtn" onclick="IN_BOUND.toogleOptionsVisibility('PromptCardOptions-${template.ID}')" class=" hidden p-1 rounded-md hover:bg-gray-100 hover:text-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-gray-200 disabled:dark:hover:text-gray-400" >${svg('horizontal-menu')}</a>
            </div>` : ""}`
                  :
                  `${this.access.cardMenuInDots ? `<div class="flex gap-4 justify-center lg:gap-1 lg:pl-2 mt-1 right-2 text-gray-400   group-hover:visible">

            ${this.features.favourites?.allow ? `<a title="${template.favourite ? extensionText.cardIconsTitle[1] : extensionText.cardIconsTitle[0]}" class="p-1 rounded-md hover:bg-gray-100 hover:text-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-gray-200 disabled:dark:hover:text-gray-400" onclick="event.stopPropagation(); IN_BOUND.${template.favourite ? 'voteThumbsDown' : 'voteThumbsUp'}('${template.promptID
                      }')">${svg(template.favourite ? 'star-yellow' : 'star-gray')}</a>` : ""}

            ${this.features.pin?.allow ? `<a title="${template.pin ? extensionText.cardIconsTitle[5] : extensionText.cardIconsTitle[4]}" class="p-1 rounded-md hover:bg-gray-100 hover:text-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-gray-200 disabled:dark:hover:text-gray-400" onclick="event.stopPropagation(); IN_BOUND.${template.pin ? 'removePin' : 'addToPin'}('${template.promptID
                      }')">${svg(template.pin ? 'pin-yellow' : 'pin-gray')}</a>` : ""}

            <a title="Show Options" id="PromptCardOptionsBtn" onclick="IN_BOUND.toogleOptionsVisibility('PromptCardOptions-${template.ID}')" class=" p-1 rounded-md hover:bg-gray-100 hover:text-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-gray-200 disabled:dark:hover:text-gray-400" >${svg('horizontal-menu')}</a>
            </div>` : ""}`}
            

            <div style="top:40px; z-index:99999; box-shadow:0 2px 5px 6px rgba(0, 0, 0, 0.1); " class="${this.access.cardMenuInDots ? "hidden absolute right-1 flex flex-col px-1 py-1 gap-2 rounded border bg-white dark:bg-gray-800  dark:border-bg-ray-700" : "flex right-1"} gap-4 justify-center lg:gap-1 lg:pl-2 mt-1 text-gray-600 group-hover:visible PromptCardOptions"  id="PromptCardOptions-${template.ID}">

                ${this.PromptTemplatesType === PromptTemplatesType.OWN ||
                  template.PromptTypeNo === 1 ||
                  this.isAdminMode()
                  ? /*html*/ `

                    ${this.promptSelectionManager.selectedIds.indexOf(template.promptID) > -1 ? `

                      <a title="Add to Folder" class=" relative flex flex-row gap-2 p-1 rounded-md hover:bg-gray-100 hover:text-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-gray-200 disabled:dark:hover:text-gray-400" onclick="IN_BOUND.showFolderSelectionModal()">
                      ${svg('folder')} Add to Folder</a>

                    `  : `
                    ${this.features.edit?.allow ? `<a title="${extensionText.editPrmptTitle}" class=" relative flex flex-row gap-2 p-1 rounded-md hover:bg-gray-100 hover:text-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-gray-200 disabled:dark:hover:text-gray-400" onclick="event.stopPropagation(); IN_BOUND.editPromptTemplate(${template.ID
                    })">${svg('Edit')} Edit</a>` : ""}

                    ${this.features.import_export?.allow ? `<a title="${extensionText.cardIconsTitle[6]}" class=" relative flex flex-row gap-2 p-1 rounded-md hover:bg-gray-100 hover:text-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-gray-200 disabled:dark:hover:text-gray-400" onclick="event.stopPropagation(); IN_BOUND.exportPromptTemplate('${template.promptID
                    }')">${svg('export')} Download</a>` : ""}

                    ${this.features.copy?.allow ? `<a title="Copy Prompt" class=" relative flex flex-row gap-2 p-1 rounded-md hover:bg-gray-100 hover:text-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-gray-200 disabled:dark:hover:text-gray-400" 
                      onclick="event.stopPropagation(); IN_BOUND.copyPromptClipboard('${template.promptID}')">${svg('copy')} Copy</a>` : ""}

                  ${this.features.delete?.allow ? `<a title="${extensionText.dltPrmptTitle}" class=" relative flex flex-row gap-2 p-1 rounded-md hover:bg-gray-100 hover:text-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-gray-200 disabled:dark:hover:text-gray-400" onclick="event.stopPropagation(); IN_BOUND.deletePromptTemplate(${template.ID
                    })">${svg('trash')} Delete</a>` : ""}
                    
                    ` }`
                  : ''
                }
              </div>
            </div>      

            <div class="-mt-0.5 text-gray-500 text-xs pb-1 max-w-full">
              
            </div>

        </button>
      `
            )
            .join('')
        }
      
      </div>` : ""}


      
      <div class="${css`ul`} grid grid-cols-1 list-group" id="promptsContainer" >
        ${this.feedView === "list" ? currentTemplates
        ?.map(
          (template) => /*html*/ `
          <button ${formatAgo(template.RevisionTime).includes('second') ? 'style="border: 1px gray solid; "' : ""}  data-id="${template.promptID}" class="${css`card`} relative group list-group-item  " >
            <div class="flex items-center w-full justify-between">

            <div class="text-gray-500 text-xs flex  max-w-full">

            ${this.PromptTemplatesType === PromptTemplatesType.OWN?.length ? `<a title="Select/ Unselect" class=" rounded-md cursor-pointer hover:bg-gray-100 hover:text-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-gray-200 disabled:dark:hover:text-gray-400" onclick="IN_BOUND.promptSelectionManager.manageId('${template.promptID}')">
              ${this.promptSelectionManager.selectedIds.indexOf(template.promptID) > -1 ? svg`checked_checkbox` : svg`empty_checkbox`} </a>` : ""}
              
             
              ${template.AuthorURL && template.AuthorName
              ? /*html*/ `
                    <a href="#" class="mx-1 overflow-hidden text-ellipsis flex-1"
                      style="white-space: nowrap;"
                      onclick="event.stopPropagation()"
                      rel="noopener noreferrer" 
                      title="${extensionText.authorTitle} ${sanitizeInput(template.AuthorName)} - ${sanitizeInput(template.AuthorURL)}">
                      ${sanitizeInput(template.AuthorName).slice(0, 15)}
                    </a>`
              : ''
            }            
              · 
              <span title="${extensionText.timeTitle} ${formatDateTime(
              template.RevisionTime
            )}" class="mx-1">${formatAgo(template.RevisionTime)}</span>

            </div>

            ${this.PromptTemplatesType === PromptTemplatesType.PUBLIC &&
              template.PromptTypeNo === 2
              ? `
              
            ${this.access.cardMenuInDots ? `<div class="flex gap-4 justify-center lg:gap-1 lg:pl-2 mt-1 right-2 text-gray-400   group-hover:visible">

            ${""}

            ${this.features.copy?.allow ? `<a title="${this.forkPromptTemplates.includes(template.promptID) ? extensionText.cardIconsTitle[3] : extensionText.cardIconsTitle[2]}" class="p-1 ${this.forkPromptTemplates.includes(template.promptID) ? "cursor-not-allowed" : ""} rounded-md hover:bg-gray-100 hover:text-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-gray-200 disabled:dark:hover:text-gray-400" 
                      onclick=" ${this.forkPromptTemplates.includes(template.promptID) ? "" : `IN_BOUND.forkPrompt('${template.promptID}')`}"> ${this.forkPromptTemplates.includes(template.promptID) ? svg('fork-yellow') : svg('fork')}</a>` : ""}

               <a title="Show Options" id="PromptCardOptionsBtn" onclick="IN_BOUND.toogleOptionsVisibility('PromptCardOptions-${template.ID}')" class=" hidden p-1 rounded-md hover:bg-gray-100 hover:text-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-gray-200 disabled:dark:hover:text-gray-400" >${svg('horizontal-menu')}</a>
            </div>` : ""}` :

              `<div class="flex gap-4 justify-center lg:gap-1 lg:pl-2 mt-1 right-2 text-gray-400   group-hover:visible">

            ${this.features.favourites?.allow ? `<a title="${template.favourite ? extensionText.cardIconsTitle[1] : extensionText.cardIconsTitle[0]}" class="p-1 rounded-md hover:bg-gray-100 hover:text-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-gray-200 disabled:dark:hover:text-gray-400" onclick="event.stopPropagation(); IN_BOUND.${template.favourite ? 'voteThumbsDown' : 'voteThumbsUp'}('${template.promptID
                }')">${svg(template.favourite ? 'star-yellow' : 'star-gray')}</a>` : ''}

            ${this.features.pin?.allow ? ` <a title="${template.pin ? extensionText.cardIconsTitle[5] : extensionText.cardIconsTitle[4]}" class="p-1 rounded-md hover:bg-gray-100 hover:text-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-gray-200 disabled:dark:hover:text-gray-400" onclick="event.stopPropagation(); IN_BOUND.${template.pin ? 'removePin' : 'addToPin'}('${template.promptID
                }')">${svg(template.pin ? 'pin-yellow' : 'pin-gray')}</a>` : ""}

               <a title="Show Options" id="PromptCardOptionsBtn" onclick="IN_BOUND.toogleOptionsVisibility('PromptCardOptions-${template.ID}')" class=" p-1 rounded-md hover:bg-gray-100 hover:text-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-gray-200 disabled:dark:hover:text-gray-400" >${svg('horizontal-menu')}</a>
            </div>`}



            <div style="top:40px; z-index:99999; box-shadow:0 2px 5px 6px rgba(0, 0, 0, 0.1); " class="${this.access.cardMenuInDots ? "hidden absolute right-1 rounded shadow-lg px-1 py-1 flex-col bg-white dark:bg-gray-800  dark:border-bg-ray-700" : "flex right-1"} gap-2 justify-center  mt-1 text-gray-600 group-hover:visible PromptCardOptions"  id="PromptCardOptions-${template.ID}">

                ${this.PromptTemplatesType === PromptTemplatesType.PUBLIC &&
              template.PromptTypeNo === 2
              ? /*html*/ `
                    
                    ${this.features.copy?.allow ? `<a title="${this.forkPromptTemplates.includes(template.promptID) ? extensionText.cardIconsTitle[3] : extensionText.cardIconsTitle[2]}" class="p-1 ${this.forkPromptTemplates.includes(template.promptID) ? "cursor-not-allowed" : ""} rounded-md hover:bg-gray-100 hover:text-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-gray-200 disabled:dark:hover:text-gray-400" 
                      onclick=" ${this.forkPromptTemplates.includes(template.promptID) ? "" : `IN_BOUND.forkPrompt('${template.promptID}')`}"> ${this.forkPromptTemplates.includes(template.promptID) ? svg('fork-yellow') : svg('fork')}</a>` : ""}

                    `
              : `
                      
                      

                    `
            }
                
                ${this.PromptTemplatesType === PromptTemplatesType.OWN ||
              template.PromptTypeNo === 1 ||
              this.isAdminMode()
              ? /*html*/ `

                    ${this.promptSelectionManager.selectedIds.indexOf(template.promptID) > -1 ? `

                      <a title="Add to Folder" class=" relative flex flex-row gap-2 p-1 rounded-md hover:bg-gray-100 hover:text-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-gray-200 disabled:dark:hover:text-gray-400" onclick="IN_BOUND.showFolderSelectionModal()">
                      ${svg('folder')} Add to Folder</a>

                    `  : `
                    ${this.features.edit?.allow ? `<a title="${extensionText.editPrmptTitle}" class=" relative flex flex-row gap-2 p-1 rounded-md hover:bg-gray-100 hover:text-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-gray-200 disabled:dark:hover:text-gray-400" onclick="event.stopPropagation(); IN_BOUND.editPromptTemplate(${template.ID
                })">${svg('Edit')} Edit</a>` : ""}

                    ${this.features.import_export?.allow ? `<a title="${extensionText.cardIconsTitle[6]}" class=" relative flex flex-row gap-2 p-1 rounded-md hover:bg-gray-100 hover:text-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-gray-200 disabled:dark:hover:text-gray-400" onclick="event.stopPropagation(); IN_BOUND.exportPromptTemplate('${template.promptID
                }')">${svg('export')} Download</a>` : ""}

                    ${this.features.copy?.allow ? `<a title="Copy Prompt" class=" relative flex flex-row gap-2 p-1 rounded-md hover:bg-gray-100 hover:text-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-gray-200 disabled:dark:hover:text-gray-400" 
                      onclick="event.stopPropagation(); IN_BOUND.copyPromptClipboard('${template.promptID}')">${svg('copy')} Copy</a>` : ""}

                  ${this.features.delete?.allow ? `<a title="${extensionText.dltPrmptTitle}" class=" relative flex flex-row gap-2 p-1 rounded-md hover:bg-gray-100 hover:text-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-gray-200 disabled:dark:hover:text-gray-400" onclick="event.stopPropagation(); IN_BOUND.deletePromptTemplate(${template.ID
                })">${svg('trash')} Delete</a>` : ""}
                    
                    ` }`
              : ''
            }


              </div>
            </div>      

            <div onclick="IN_BOUND.selectPromptTemplateByIndex(${template.ID
            })" class="w-full">

            <div class=" flex flex-row gap-2 items-center " >
            ${this.PromptTemplatesType === PromptTemplatesType.OWN ? svg('drag-prompt') : ""}

            <h4 class="${css`h3`}" style="overflow-wrap: anywhere;">${sanitizeInput(
              template.Title
            )}</h4>
            </div>
          
            <p class="${css`p`} text-gray-600 dark:text-gray-200 overflow-hidden text-ellipsis" style="display: -webkit-box; -webkit-line-clamp: 3; -webkit-box-orient: vertical;"
              title="${sanitizeInput(template.Teaser)}">
              ${sanitizeInput(template.Teaser)}
            </p>
            </div>
            

        </button>
      `
        )
        .join('')
        :
        currentTemplates
          ?.map(
            (template) => /*html*/ `
          <button  class="${css`card`} relative group list-group-item "  data-id="${template.promptID}"  >
            <div   class="flex gap-2 items-center w-full justify-between">

            ${this.PromptTemplatesType === PromptTemplatesType.OWN?.length ? `<a title="Select/ Unselect" class=" rounded-md cursor-pointer hover:bg-gray-100 hover:text-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-gray-200 disabled:dark:hover:text-gray-400" onclick="IN_BOUND.promptSelectionManager.manageId('${template.promptID}')">
              ${this.promptSelectionManager.selectedIds.indexOf(template.promptID) > -1 ? svg`checked_checkbox` : svg`empty_checkbox`} </a>` : ""}


            <span class="w-5 h-5" >
            ${this.PromptTemplatesType === PromptTemplatesType.OWN ? svg('drag-prompt') : ""}
            </span>

              <h4 onclick="IN_BOUND.selectPromptTemplateByIndex(${template.ID
              })" class="${css`h3`}" style="overflow: hidden; text-overflow: ellipsis; white-space: nowrap; width:100%; ">${sanitizeInput(
                template.Title
              )}</h4>

            ${this.PromptTemplatesType === PromptTemplatesType.PUBLIC &&
                template.PromptTypeNo === 2
                ?

                `${this.access.cardMenuInDots ? `<div class="flex gap-4 justify-center lg:gap-1 lg:pl-2 mt-1 right-2 text-gray-400   group-hover:visible">

            ${""}

            ${this.features.copy?.allow ? `<a title="${this.forkPromptTemplates.includes(template.promptID) ? extensionText.cardIconsTitle[3] : extensionText.cardIconsTitle[2]}" class="p-1 ${this.forkPromptTemplates.includes(template.promptID) ? "cursor-not-allowed" : ""} rounded-md hover:bg-gray-100 hover:text-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-gray-200 disabled:dark:hover:text-gray-400" 
                      onclick=" ${this.forkPromptTemplates.includes(template.promptID) ? "" : `IN_BOUND.forkPrompt('${template.promptID}')`}"> ${this.forkPromptTemplates.includes(template.promptID) ? svg('fork-yellow') : svg('fork')}</a> ` : ""}


            <a title="Show Options" id="PromptCardOptionsBtn" onclick="IN_BOUND.toogleOptionsVisibility('PromptCardOptions-${template.ID}')" class=" hidden p-1 rounded-md hover:bg-gray-100 hover:text-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-gray-200 disabled:dark:hover:text-gray-400" >${svg('horizontal-menu')}</a>
            </div>` : ""}`
                :
                `${this.access.cardMenuInDots ? `<div class="flex gap-4 justify-center lg:gap-1 lg:pl-2 mt-1 right-2 text-gray-400   group-hover:visible">

            ${this.features.favourites?.allow ? `<a title="${template.favourite ? extensionText.cardIconsTitle[1] : extensionText.cardIconsTitle[0]}" class="p-1 rounded-md hover:bg-gray-100 hover:text-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-gray-200 disabled:dark:hover:text-gray-400" onclick="event.stopPropagation(); IN_BOUND.${template.favourite ? 'voteThumbsDown' : 'voteThumbsUp'}('${template.promptID
                    }')">${svg(template.favourite ? 'star-yellow' : 'star-gray')}</a>` : ""}

            ${this.features.pin?.allow ? `<a title="${template.pin ? extensionText.cardIconsTitle[5] : extensionText.cardIconsTitle[4]}" class="p-1 rounded-md hover:bg-gray-100 hover:text-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-gray-200 disabled:dark:hover:text-gray-400" onclick="event.stopPropagation(); IN_BOUND.${template.pin ? 'removePin' : 'addToPin'}('${template.promptID
                    }')">${svg(template.pin ? 'pin-yellow' : 'pin-gray')}</a>` : ""}

            <a title="Show Options" id="PromptCardOptionsBtn" onclick="IN_BOUND.toogleOptionsVisibility('PromptCardOptions-${template.ID}')" class=" p-1 rounded-md hover:bg-gray-100 hover:text-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-gray-200 disabled:dark:hover:text-gray-400" >${svg('horizontal-menu')}</a>
            </div>` : ""}`}
            

            <div style="top:40px; z-index:99999; box-shadow:0 2px 5px 6px rgba(0, 0, 0, 0.1); " class="${this.access.cardMenuInDots ? "hidden absolute flex flex-col px-2 py-2 gap-1 right-9 rounded border bg-white dark:bg-gray-800  dark:border-bg-ray-700" : "flex right-1"} gap-4 justify-center lg:gap-1 lg:pl-2 mt-1 text-gray-600 group-hover:visible PromptCardOptions"  id="PromptCardOptions-${template.ID}">

                ${this.PromptTemplatesType === PromptTemplatesType.PUBLIC &&
                template.PromptTypeNo === 2
                ? /*html*/ `
                    
                     
                      
                    `
                : `

                    
                    
                    `
              }
                
                ${this.PromptTemplatesType === PromptTemplatesType.OWN ||
                template.PromptTypeNo === 1 ||
                this.isAdminMode()
                ? /*html*/ `

                    ${this.promptSelectionManager.selectedIds.indexOf(template.promptID) > -1 ? `

                      <a title="Add to Folder" class=" relative flex flex-row gap-2 p-1 rounded-md hover:bg-gray-100 hover:text-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-gray-200 disabled:dark:hover:text-gray-400" onclick="IN_BOUND.showFolderSelectionModal()">
                      ${svg('folder')} Add to Folder</a>

                    `  : `
                    ${this.features.edit?.allow ? `<a title="${extensionText.editPrmptTitle}" class=" relative flex flex-row gap-2 p-1 rounded-md hover:bg-gray-100 hover:text-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-gray-200 disabled:dark:hover:text-gray-400" onclick="event.stopPropagation(); IN_BOUND.editPromptTemplate(${template.ID
                  })">${svg('Edit')} Edit</a>` : ""}

                    ${this.features.import_export?.allow ? `<a title="${extensionText.cardIconsTitle[6]}" class=" relative flex flex-row gap-2 p-1 rounded-md hover:bg-gray-100 hover:text-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-gray-200 disabled:dark:hover:text-gray-400" onclick="event.stopPropagation(); IN_BOUND.exportPromptTemplate('${template.promptID
                  }')">${svg('export')} Download</a>` : ""}

                    ${this.features.copy?.allow ? `<a title="Copy Prompt" class=" relative flex flex-row gap-2 p-1 rounded-md hover:bg-gray-100 hover:text-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-gray-200 disabled:dark:hover:text-gray-400" 
                      onclick="event.stopPropagation(); IN_BOUND.copyPromptClipboard('${template.promptID}')">${svg('copy')} Copy</a>` : ""}

                  ${this.features.delete?.allow ? `<a title="${extensionText.dltPrmptTitle}" class=" relative flex flex-row gap-2 p-1 rounded-md hover:bg-gray-100 hover:text-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-gray-200 disabled:dark:hover:text-gray-400" onclick="event.stopPropagation(); IN_BOUND.deletePromptTemplate(${template.ID
                  })">${svg('trash')} Delete</a>` : ""}
                    
                    ` }`
                : ''
              }
              </div>
            </div>      

            <div class="-mt-0.5 text-gray-500 text-xs pb-1 max-w-full">
              
            </div>

        </button>
      `
          )
          .join('')
      }
      
      </div>
    
      ${templates.length > this.PromptTemplateSection.pageSize
        ? paginationContainerBottom
        : ''
      }
      
    </div>
   `;

      let wrapper = document.createElement('div');
      wrapper.id = 'templates-wrapper';
      wrapper.className =
        'mt-2 md:flex items-start text-center gap-2.5 md:max-w-2xl lg:max-w-3xl m-auto text-sm';

      let sideBarWrapper = document.querySelector('#nav');
      if (sideBarWrapper.querySelector('#templates-wrapper')) {
        wrapper = sideBarWrapper.querySelector('#templates-wrapper');
      } else {
        sideBarWrapper.appendChild(wrapper);
      }

      wrapper.innerHTML = html;

      // Add event listeners for topic, activity, sort by select, search input and prompts per page select



      const promptsContainer = wrapper?.querySelector('#promptsContainer');
      if (promptsContainer) {
        this.sortElems = Sortable.create(promptsContainer, {
          // forceFallback: true,
          // fallbackClass: "dragging-prompt",
          animation: 200,
          easing: "cubic-bezier(0.37, 0, 0.63, 1)",
          handle: ".drag-icon-prompt",
          dataIdAttr: 'data-id',
          ghostClass: 'sortable-ghost',
          swapThreshold: 2, // Threshold of the swap zone
          onEnd: function (/**Event*/evt) {
            // console.log('drag end prompt')
            evt.item;  // dragged HTMLElement
            evt.to;    // target list
            evt.from;  // previous list
            evt.oldIndex;  // element's old index within old parent
            evt.newIndex;  // element's new index within new parent
            evt.oldDraggableIndex; // element's old index within old parent, only counting draggable elements
            evt.newDraggableIndex; // element's new index within new parent, only counting draggable elements
            evt.clone; // the clone element
            evt.pullMode;  // when item is in another sortable: `"clone"` if cloning, `true` if moving
            let indexes = [];
            Array.from(evt.target.children).forEach((elem, index) => {
              let data_id = elem.attributes['data-id'].value;
              // console.log(data_id,index)
              indexes.push([data_id, index]);
            });
            const oldOrders = IN_BOUND.promptsOrderLocal?.filter(i => !(i.team === IN_BOUND.selectedTeam && i.company === IN_BOUND.selectedCompany && i.folder === IN_BOUND.folderManager.selectedFolder)) || [];
            // console.log("Old order: ",oldOrders)
            localStorage.setItem('promptsOrderLocal', JSON.stringify([...oldOrders, { index: indexes, company: IN_BOUND.selectedCompany, team: IN_BOUND.selectedTeam, folder: IN_BOUND.folderManager.selectedFolder }]));
            IN_BOUND.promptsOrderLocal = JSON.parse(localStorage.getItem('promptsOrderLocal'));
            // console.log("New Order: ",IN_BOUND.promptsOrderLocal)
            setTimeout(() => {
              IN_BOUND.insertPromptTemplatesSection();
            }, 300);
          },
        });
      }




      wrapper
        ?.querySelector('#promptTypeSelect')
        ?.addEventListener('change', this.changePromptTemplatesType.bind(this));



      wrapper
        ?.querySelector('#save_search')
        ?.addEventListener('click', this.savedSearch.bind(this));

      // wrapper
      //   ?.querySelector('#sortBySelect')
      //   ?.addEventListener('change', this.changePromptSortBy.bind(this));

      wrapper
        ?.querySelector('#promptSearchInput')
        ?.addEventListener(
          'input',
          this.debounce(this.changePromptSearch.bind(this), 1000).bind(this)
        );

      const pageSizeSelectElements = wrapper?.querySelectorAll(
        'select.pageSizeSelect'
      );

      // this.PromptTemplatesType === PromptTemplatesType.PUBLIC ? "" : this.dragSortPromptsList()



      // Remove event listener for the pagination buttons (if not needed/already added)
      document.removeEventListener('keydown', this.boundHandleArrowKey);

      // Add event listener for the pagination buttons and page size select elements
      if (pageSizeSelectElements.length > 0) {
        pageSizeSelectElements.forEach((select) => {
          select.addEventListener('change', this.changePromptPageSize.bind(this));
        });

        // Add event listener for the pagination buttons
        document.addEventListener('keydown', this.boundHandleArrowKey);
      }
    },

    toogleOptionsVisibility(id) {
      // ev.preventDefault();
      let options = document.getElementById(id);
      // console.log(options)
      options.className.split(' ').includes('hidden') ? options.className = options.className.replace('hidden ', "flex ") : options.className = options.className.replace('flex ', "hidden ");

      // options.addEventListener('blur', () => {
      //   options.className.replace('flex ',"hidden ")
      // })
    },

    hideOptionsVisibility(id) {
      setTimeout(function () {
        let options = document.getElementById(id);
        options.className = options.className.replace('flex ', "hidden ");
      }, 500);

    },

    dragPromptIDOrder(current, before) {
      let promptIDs = window.localStorage.getItem('promptCardOrder')?.split(',');
      // console.log(promptIDs)
      if (promptIDs) {
        let allEntries = this.OwnPrompts.map(p => p.ID);
        let newItems = allEntries.filter(function (obj) { return promptIDs.indexOf(obj) === -1; });
        promptIDs = [...newItems, ...promptIDs];
        let curIndex = promptIDs.indexOf(current);
        let befIndex = promptIDs.indexOf(before);
        promptIDs.splice(curIndex, 1);
        promptIDs.splice(befIndex, 0, current);
        window.localStorage.setItem('promptCardOrder', promptIDs);
      } else {
        let promptIDs = this.OwnPrompts.map(p => p.ID);
        window.localStorage.setItem('promptCardOrder', promptIDs);
        this.dragPromptIDOrder(current, before);
      }

    },

    dragSortPromptsList() {

      // document.getElementsByClassName('PromptCardContainer')[0]?.addEventListener('mouseleave', function(event) {
      //   if (dragItem !== null) {
      //     mouseUp(event);
      //   }
      // });


      // document.querySelectorAll('.PromptCard')?.forEach(item => {
      //   item.addEventListener('mousedown', mouseDown);
      // });

      // document?.addEventListener('mousemove', mouseMove);
      // document?.addEventListener('mouseup', mouseUp);



    },



    clickeFileInput() {
      const inputFileDiv = document.getElementById('dropzone-file589');
      inputFileDiv.click();

      inputFileDiv.onchange = (event) => {
        // event.stopPropagation();
        // event.preventDefault();

        const fileList = event.target.files;
        // console.log(fileList);

        var reader = new FileReader();
        reader.onload = function () {
          var text = reader.result;
          let json = JSON.parse(text);
          // console.log(json);
          IN_BOUND.saveImportedPrompt(json);

        };
        reader.readAsText(fileList[0]);
      };
    },

    async saveImportedPrompt(data) {
      IN_BOUND.changeFeedToMyPrompts();

      const { Title, PromptHint, Prompt, Tags, Teaser } = data;
      let prompt = { Title, PromptHint, Prompt, Tags, Teaser };
      if (prompt.Prompt === "" || prompt.Prompt === undefined) {
        IN_BOUND.showNotification(
          NotificationSeverity.ERROR,
          'Invalid Prompt!'
        );
        return
      }

      prompt.AuthorName = this.Client.User.Name;
      prompt.AuthorURL = this.Client.User.Email;
      const idRandom = window.crypto.randomUUID() || (new Date()).getTime() + Math.random().toString(16).slice(2);
      prompt.ID = idRandom;
      prompt.id = idRandom;
      prompt.CreationTime = "";
      prompt.RevisionTime = "";
      prompt.PromptTypeNo = 1;
      prompt.pin = false;
      prompt.OwnPrompt = true;
      prompt.favourite = false;

      prompt.teamID = this.selectedTeam;

      // console.log("Saving json: ",prompt)

      this.showNotification(
        NotificationSeverity.SUCCESS,
        'Sync..'
      );

      await this.Client.savePrompt(prompt);
      // this.showNotification(
      //   NotificationSeverity.SUCCESS,
      //   'Prompt imported!'
      // );

      // this.refreshData();

    },

    exportPromptTemplate(promptID) {
      // console.log(promptID)
      let prompt_0 = this.DefaultPromptTemplates.filter(prompt => prompt.ID === promptID)[0] || this.OwnPrompts.filter(prompt => prompt.ID === promptID)[0];
      let prompt = { ...prompt_0 };
      delete prompt['AuthorName'];
      delete prompt['AuthorURL'];
      delete prompt['User'];
      prompt.forkID = prompt.ID;
      prompt.CreationTime = "";
      prompt.RevisionTime = "";
      prompt.ID = "";
      // console.log(prompt)
      this.exportContent(prompt, prompt.Title.slice(0, 20));
    },

    exportContent(content, name) {
      const blob = new Blob([JSON.stringify(content)], {
        type: 'text/plain',
      });
      const a = document.createElement('a');
      a.href = URL.createObjectURL(blob);
      a.download = name + '.json';
      document.body.appendChild(a);
      a.click();
    },

    showImport() {
      this.showNotification(
        NotificationSeverity.SUCCESS,
        this.import ? 'Going back to prompts...' : 'Getting import prompt templates...'
      );

      this.import = !this.import;
      this.refreshData();
    },

    async saveAsNewPromptTemplate(e) {
      // console.log(e)
      IN_BOUND.changeFeedToMyPrompts();

      const prompt = {};
      const formData = new FormData(e.target);

      for (const [key, value] of formData) {
        prompt[key] = value;
      }

      // console.log(prompt)
      // let prompt = this.DefaultPromptTemplates.filter(prompt => prompt.ID === promptID)[0] || this.OwnPrompts.filter(prompt => prompt.ID === promptID)[0]
      prompt.AuthorName = this.Client.User.Name;
      prompt.AuthorURL = this.Client.User.Email;
      prompt.Title = prompt.Title;
      prompt.forkID = prompt.ID;
      prompt.ID = window.crypto.randomUUID() || (new Date()).getTime() + Math.random().toString(16).slice(2);
      prompt.CreationTime = '';
      prompt.RevisionTime = '';
      prompt.PromptTypeNo = 1;
      prompt.pin = false;
      prompt.favourite = false;
      prompt.teamID = this.selectedTeam;
      // console.log(prompt)
      this.showNotification(
        NotificationSeverity.SUCCESS,
        'Sync..'
      );
      await this.Client.savePrompt(prompt);
      // this.showNotification(
      //   NotificationSeverity.SUCCESS,
      //   'Prompt saved as new template!'
      // );
      this.hideSavePromptModal();
      // this.refreshData();
    },

    async forkPrompt(id) {
      let prompt = this.PromptTemplates.filter(template => template.ID === id)[0];
      prompt.AuthorName = this.Client.User.Name;
      prompt.AuthorURL = this.Client.User.Email;
      prompt.Title = "Copy of: " + prompt.Title;
      prompt.forkID = prompt.ID;
      prompt.ID = window.crypto.randomUUID() || (new Date()).getTime() + Math.random().toString(16).slice(2);
      prompt.CreationTime = (new Date()).toISOString();
      prompt.RevisionTime = (new Date()).toISOString();
      prompt.PromptTypeNo = 1;
      prompt._id ? delete prompt['_id'] : "";
      prompt.teamID = this.selectedTeam;
      // console.log(prompt)
      this.showNotification(
        NotificationSeverity.SUCCESS,
        'Sync..'
      );
      await this.Client.savePrompt(prompt);
      // this.showNotification(
      //   NotificationSeverity.SUCCESS,
      //   'Prompt saved to My Prompts!'
      // );

      // this.refreshData();
    },

    async removePin(id) {

      this.showNotification(
        NotificationSeverity.SUCCESS,
        'Sync..'
      );

      this.pinActionForPrompt(id, -1);
      // this.showNotification(
      //   NotificationSeverity.SUCCESS,
      //   'Prompt removed from pin!'
      // );
      // this.refreshData();
    },

    async addToPin(id) {
      if (this.PinPromptTemplates.length > 3) {
        this.showNotification(
          NotificationSeverity.ERROR,
          'You cannot pin more than 4 prompts!'
        );
        return
      }

      this.showNotification(
        NotificationSeverity.SUCCESS,
        'Sync..'
      );
      this.pinActionForPrompt(id, 1);
      // this.showNotification(
      //   NotificationSeverity.SUCCESS,
      //   'Prompt added to pin!'
      // );
      // this.refreshData();
    },

    changeExtLanguage(e) {
      this.ExtLang = e.target.value;
      extensionText = extensionLanguages[e.target.value];
      // console.log(this.ExtLang,extensionText);
      this.insertPromptTemplatesSection();
      this.insertLanguageToneWritingStyleContinueActions();
    },



    changeFeedSelect(val) {
      this.feedSelected = val;
      localStorage.setItem('feedSelected', val);
      this.insertPromptTemplatesSection();
    },

    changeFeedView(val) {
      this.feedView = val;
      window.localStorage.setItem('feedView', val);
      this.insertPromptTemplatesSection();
    },

    /**
     * boundHandleArrowKey is the bound version of the handleArrowKey function
     *
     * @type {function(e: KeyboardEvent): void}
     */
    boundHandleArrowKey: null,

    // handleArrowKey handles the arrow key presses for the page navigation
    handleArrowKey(e) {
      const isArrowKey = e.key === 'ArrowLeft' || e.key === 'ArrowRight';

      const isInput =
        e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA';

      if (!isArrowKey || isInput) {
        // If the key pressed is not an arrow key or if it was pressed in an input or textarea element, do nothing
        return;
      }

      // If the key pressed is a left arrow key, call the previous page function
      if (e.key === 'ArrowLeft') {
        this.prevPromptTemplatesPage();

        return;
      }

      // Otherwise, call the next page function
      this.nextPromptTemplatesPage();
    },

    // changePromptPageSize updates the this.PromptTemplateSection.pageSize variable and re-renders the templates
    changePromptPageSize(e) {
      let pageSize = +e.target.value;

      // if the pageSize is not in the pageSizeOptions array, use the default pageSize option
      pageSize = pageSizeOptions.includes(pageSize) ? pageSize : pageSizeDefault;

      // persist the last selected page size in local storage
      localStorage.setItem(lastPageSizeKey, pageSize);

      this.PromptTemplateSection.currentPage = 0;
      this.PromptTemplateSection.pageSize = pageSize;

      this.insertPromptTemplatesSection();
    },

    // changePromptSearch updates the this.PromptSearch variable and re-renders the templates
    changePromptSearch(e) {
      this.PromptSearch = e.target.value;
      // console.log(this.PromptSearch)

      this.PromptTemplateSection.currentPage = 0;

      this.insertPromptTemplatesSection();

      const searchInput = document.querySelector('#promptSearchInput');

      searchInput.selectionStart = searchInput.selectionEnd =
        searchInput.value.length;
      searchInput.focus();

    },

    savedSearch() {
      this.savedSearchList.push(this.PromptSearch);
      localStorage.setItem('savedSearchList', JSON.stringify(this.savedSearchList));
      setTimeout(() => {
        IN_BOUND.insertPromptTemplatesSection();
      }, 200);
    },

    searchIntoPrompts(keyword) {
      this.PromptSearch = keyword;

      this.PromptTemplateSection.currentPage = 0;

      this.insertPromptTemplatesSection();

      const searchInput = document.querySelector('#promptSearchInput');
      searchInput.value = keyword;

      searchInput.selectionStart = searchInput.selectionEnd =
        searchInput.value.length;
      searchInput.focus();

      IN_BOUND.hideModal('savedSearchModal');

    },

    changePromptTemplatesType(e) {
      const type = e.target.value;
      if (this.PromptTemplatesType === type) {
        return;
      }

      this.PromptTemplatesType = type;
      localStorage.setItem('PromptTemplatesType', type);

      this.PromptTemplateSection.currentPage = 0;

      this.insertPromptTemplatesSection();
    },

    // debounce is a function that returns a function that will only execute after a certain amount of time has passed
    debounce(callback, milliseconds) {
      let timeout;

      return (argument) => {
        clearTimeout(timeout);
        timeout = setTimeout(() => callback(argument), milliseconds);
      };
    },

    showToneOptions() {
      if (document.getElementsByClassName('tonesList')[0]) {
        let listContainer = document.getElementsByClassName('tonesList')[0];
        listContainer.style.display = 'flex';
        const position = document.getElementById('optionOpener').getBoundingClientRect();
        listContainer.style.left = position.right + 'px';
      } else {
        var toolbarDiv = document.createElement("div");
        toolbarDiv.classList.add("chatgpt-all-in-one-toolbar2", "gap-3", "tonesList");

        toolbarDiv.style.overflow = 'hidden';

        let listContainer = document.createElement('div');
        listContainer.classList.add('tones-list-container');
        listContainer.id = "tones-list-container";
        listContainer.style.overflow = 'scroll';
        listContainer.style.maxHeight = '332px';
        listContainer.style.position = 'absolute';
        listContainer.style.backgroundColor = '#353740';
        listContainer.style.padding = "0.1em";
        listContainer.style.borderRadius = "5px";
        listContainer.style.width = 'fit-content';
        listContainer.style.position = "absolute";
        const position = document.getElementById('optionOpener').getBoundingClientRect();
        listContainer.style.left = ((position.x / 2) - 40) + 'px';
        // console.log(position)
        listContainer.style.bottom = '7vh';
        listContainer.onmouseleave = function () {
          // console.log('leave')
          IN_BOUND.hideToneOptions();
        };


        listContainer.style.borderColor = "#202123";
        listContainer.style.borderWidth = '1px';

        toolbarDiv.appendChild(listContainer);

        var textareaWrapper = document.querySelector("form textarea");
        textareaWrapper.parentNode.insertBefore(toolbarDiv, textareaWrapper);
      }
      this.insertToneOptionsInContainer();
    },

    insertToneOptionsInContainer() {
      let tonesContainer = document.querySelector('.tones-list-container');

      let tones = this.Tones;

      // console.log(tones)

      const htmlForContainer = `<ul >${tones.map((item, index) => `
    <li class="tonesLI" style="cursor:pointer; padding:1px; margin:1px;  flex-direction:row; display:flex; align-content:space-between; flex-wrap: wrap; justify-content: space-between; " >

    <p class="tonesLabel" onClick='IN_BOUND.setToneIndexAndRefresh("${item.ID}")' style="font-size:small; font-weight:light; padding:0px; margin:0px; line-height:normal; display:block;">${item.Label}</p>

    ${item.type === "user" ? `<div style="display:flex; flex-direction:row;">
    <a style="margin-left:3px; display:block;" class="tonesEdit" onclick="IN_BOUND.editTone('${item.ID}')" > ${svg(`Edit`)} </a>
    <a style="margin-left:3px; display:block;" class="tonesCross" onclick="IN_BOUND.deleteTone('${item.ID}')" > ${svg(`Cross`)} </a>
    </div>` : ""}

    </li>`).join('')}</ul>  `;

      tonesContainer.innerHTML = htmlForContainer;
    },

    setToneIndexAndRefresh(ID) {
      this.hideToneOptions();
      // this.Tone = ID;
      this.insertLanguageToneWritingStyleContinueActions();
    },


    hideToneOptions() {
      document.getElementsByClassName('tonesList')[0].style.display = 'none';
    },

    editTone(ID) {
      // console.log('edit',ID)
      // this.hideToneOptions();
      this.showeditToneModal(ID);
    },

    async deleteTone(ID) {
      // console.log('cross',ID)
      this.hideToneOptions();
      await this.Client.deleteTone(ID);
      // this.refreshData()
      // this.showNotification(
      //   NotificationSeverity.SUCCESS,
      //   'Tone was deleted!'
      // );
    },

    async showeditToneModal(ID) {

      const selectedTone = this.Tones.filter(d => d.ID === ID)[0];

      // console.log(selectedTone,ID)

      this.InputToneCategorySelected = selectedTone.CategoryID;

      let editToneModal = document.getElementById('editToneModal');

      // if modal does not exist, create it, add event listener on submit and append it to body
      if (!editToneModal) {
        editToneModal = document.createElement('div');
        editToneModal.id = 'editToneModal';

        editToneModal.addEventListener(
          'submit',
          this.saveEditedTone.bind(this));

        document.body.appendChild(editToneModal);
      }

      editToneModal.innerHTML = /*html*/ `
      <div style="z-index:100;" class="fixed inset-0 text-center transition-opacity z-50">
        <div onclick="IN_BOUND.hideModal('editToneModal')"  class="absolute bg-gray-900 inset-0 opacity-90">
        </div>

        <div class="fixed inset-0 overflow-y-auto">
          <div class="flex items-center justify-center min-h-full flex-col">

        <form id="saveToneForm">
          <input type="hidden" name="ID" value="${selectedTone.ID}" />
          
          <div
          class="align-center bg-white dark:bg-gray-800 dark:text-gray-200 inline-block overflow-hidden sm:rounded-lg shadow-xl sm:align-middle sm:max-w-lg sm:my-8 sm:w-full text-left transform transition-all"
          role="dialog" aria-modal="true" aria-labelledby="modal-headline" style="text-align: left;">
      
            <div class="bg-white dark:bg-gray-800 px-4 pt-5 pb-4 sm:p-6 sm:pb-4 overflow-y-auto">
            <label>Title</label>
              <input name="Label" type="text" value="${selectedTone.Label}"}
                title="Tone Label" required placeholder="Tone Label" class="w-full bg-gray-100 dark:bg-gray-700 dark:border-gray-700 rounded mb-3 mt-2 p-2 w-full" />
        
              <label>Tone</label>
              <textarea name="Description" class="w-full bg-gray-100 dark:bg-gray-700 dark:border-gray-700 rounded p-2 mt-2 mb-3" style="height: 120px;" required
                        placeholder="Tone"
                        title="Tone">${selectedTone.Description}</textarea>
        
                  


                      <div class=" px-4 py-3 text-right">
                
                  <button type="button" class="bg-gray-600 hover:bg-gray-400 mr-2 px-4 py-2 mt-2 rounded text-white"
                          onclick="IN_BOUND.hideModal('editToneModal')"> Cancel
                  </button>
                  <button type="submit" class="bg-orange-500 hover:bg-orange-500/10 mr-2 px-4 py-2 mt-2 rounded text-white">Save
                  </button>
              </div>

          </div>
        </form>
        </div>
          <div>
        </div>
          </div>
        </div>
        
      </div>
    `;



      editToneModal.style = 'display: block;';

      // editToneModal
      //   .querySelector('#InputToneCategory')
      //   .addEventListener('change', this.changeInputToneCategory.bind(this));

      // add event listener to close the modal on ESC
      document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
          this.hideModal('editToneModal');
        }
      });
    },

    async saveEditedTone(e) {
      e.preventDefault();

      const tone = {};
      const formData = new FormData(e.target);

      for (const [key, value] of formData) {
        tone[key] = value;
      }

      // console.log(formData,tone)
      const selectedCategory = this.ToneCategories.filter(d => d.Label === tone['Category'])[0];
      // console.log(selectedCategory)
      tone['CategoryID'] = selectedCategory.ID;
      tone['Category'] = selectedCategory.Label;
      // console.log(tone)

      this.showNotification(
        NotificationSeverity.SUCCESS,
        'Sync..'
      );

      // console.log('jdhsjdh')

      this.hideModal('editToneModal');

      const toneNew = { id: tone.ID, label: tone.Label, prompt: tone.Description, user: IN_BOUND.Client.User.Email, company: IN_BOUND.Company };

      await this.Client.saveEditTone(toneNew);

      // this.refreshData();

      // this.showNotification(
      //   NotificationSeverity.SUCCESS,
      //   'Tone changes was saved!'
      // );

    },

    async showNewToneModal() {

      let newToneModal = document.getElementById('newToneModal');

      this.InputToneCategorySelected = this.ToneCategories[0].ID;

      // if modal does not exist, create it, add event listener on submit and append it to body
      if (!newToneModal) {
        newToneModal = document.createElement('div');
        newToneModal.id = 'newToneModal';

        newToneModal.addEventListener(
          'submit',
          this.saveNewTone.bind(this));

        document.body.appendChild(newToneModal);
      }

      newToneModal.innerHTML = /*html*/ `
      <div style="z-index:100;" class="fixed inset-0 text-center transition-opacity z-50">
        <div onclick="IN_BOUND.hideModal('newToneModal')" class="absolute bg-gray-900 inset-0 opacity-90">
        </div>

        <div class="fixed inset-0 overflow-y-auto">
          <div class="flex items-center justify-center min-h-full flex-col">

          <form id="saveToneForm">
          <input type="hidden" name="ID" value="" />
          
          <div
          class="align-center bg-white dark:bg-gray-800 dark:text-gray-200 inline-block overflow-hidden sm:rounded-lg shadow-xl sm:align-middle sm:max-w-lg sm:my-8 sm:w-full text-left transform transition-all"
          role="dialog" aria-modal="true" aria-labelledby="modal-headline" style="text-align: left;">
      
            <div class="bg-white dark:bg-gray-800 px-4 pt-5 pb-4 sm:p-6 sm:pb-4 overflow-y-auto">
            <label>Title</label>
              <input name="Label" type="text" value=""}
                title="Tone Label" required placeholder="Tone Label" class="w-full bg-gray-100 dark:bg-gray-700 dark:border-gray-700 rounded mb-3 mt-2 p-2 w-full" />
        
              <label>Tone</label>
              <textarea name="Description" class="w-full bg-gray-100 dark:bg-gray-700 dark:border-gray-700 rounded p-2 mt-2 mb-3" style="height: 120px;" required
                        placeholder="Tone"
                        title="Tone"></textarea>
        
                      <div class="mr-4 w-1/5 text-left">
                        <label>Select Category</label>
                        <input name="Category" list="InputToneCategory" class="w-full bg-gray-100 dark:bg-gray-700 dark:border-gray-700 rounded mb-3 mt-2 p-2 w-full" />
                        <datalist id="InputToneCategory" class="mt-2 mb-3 dark:bg-gray-700 dark:border-gray-700 dark:hover:bg-gray-900 rounded w-full">
                          ${this.ToneCategories?.map(
      (category) => `
                            <option value="${category.Label}" >
                              </option> 
                          `
    ).join('')}
                        </datalist >
                      </div>


                      <div class=" px-4 py-3 text-right">
                
                  <button type="button" class="bg-gray-600 hover:bg-gray-400 mr-2 px-4 py-2 mt-2 rounded text-white"
                          onclick="IN_BOUND.hideModal('newToneModal')"> Cancel
                  </button>
                  <button type="submit" class="bg-orange-500 hover:bg-orange-500/10 mr-2 px-4 py-2 mt-2 rounded text-white">Save
                  </button>
                </div>

          </div>
        </form>
        </div>
          <div>
        </div>
          </div>
        </div>
        
      </div>
    `;



      newToneModal.style = 'display: block;';

      newToneModal
        .querySelector('#InputToneCategory')
        .addEventListener('change', this.changeInputToneCategory.bind(this));

      // add event listener to close the modal on ESC
      document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
          this.hideModal('newToneModal');
        }
      });
    },

    async saveNewTone(e) {
      e.preventDefault();

      this.hideModal('newToneModal');

      const tone = {};
      const formData = new FormData(e.target);

      for (const [key, value] of formData) {
        tone[key] = value;
      }

      const selectedCategory = this.ToneCategories.filter(d => d.Label === tone['Category'])[0];
      // console.log(selectedCategory)
      tone['CategoryID'] = selectedCategory.ID;
      tone['Category'] = selectedCategory.Label;
      // console.log(tone)

      this.showNotification(
        NotificationSeverity.SUCCESS,
        'Sync..'
      );

      // console.log('jdhsjdh')

      await this.Client.saveNewTone(tone);

      // this.refreshData();

      // this.showNotification(
      //   NotificationSeverity.SUCCESS,
      //   'Tone was added!'
      // );

    },

    changeInputToneCategory(e) {
      this.InputToneCategorySelected = e.target.value;
    },

    // Insert language select and continue button above the prompt textarea input
    
    insertLanguageToneWritingStyleContinueActions() {


      this.tonesOrderLocal = JSON.parse(localStorage.getItem('tonesOrderLocal'))?.index || [];




      const arrayIndxes = this.tonesOrderLocal;
      if (arrayIndxes.length < this.userTones.length) {
        const newTones = this.userTones.filter(tone => !arrayIndxes.map(i => i[0]).includes(tone.ID));
        newTones.map(t => {
          arrayIndxes.push([t.ID, arrayIndxes.length]);
        });
      }

      // Create a new array to store the rearranged items
      const rearrangedArray = [];

      // Iterate over the arrayIndxes array
      for (const [id, index] of arrayIndxes) {
        // console.log("ss-  ",id, index)
        // Find the item in userTones array with matching ID
        const item = this.userTones.find((tone) => tone.ID === id);

        // If the item is found, add it to the rearranged array at the specified index
        if (item) {
          rearrangedArray[index] = item;
        }
      }

      // Remove any undefined elements from the rearranged array
      const sortedUserTones = rearrangedArray.filter((item) => item !== undefined);

      // Print the rearranged array
      // console.log(sortedUserTones);


      // this.tone === undefined ? this.tone = this.SelectedPromptTemplate?.Tone : ""
      // console.log(this.tone, this.SelectedPromptTemplate?.Tone)
      let wrapper = document.createElement('div');

      wrapper.id = 'language-select-wrapper';
      wrapper.className = css('languageSelectWrapper');

      // Get the list of languages
      const languages = this.Languages;

      // If there are no languages, skip
      if (!languages) return;

      // Get the prompt textarea input
      const textarea = document.querySelector('form textarea');

      // If there is no textarea, skip
      if (!textarea) return;

      // Hide the spacer for absolutely positioned prompt input
      document.querySelector(
        '.w-full.h-32.md\\:h-48.flex-shrink-0'
      );

      // if (spacer) {
      //   spacer.style = 'display: none';
      // }

      // Remove the absolute positioning from the prompt input parent
      textarea.form.parentElement;

      // Get the parent of the textarea
      const parent = textarea.parentElement;

      // If there is no parent element, skip
      if (!parent) return;

      // Add padding to the parent element
      parent.classList.add('px-4');

      // this.Tone = this.Tone?.filter(t => t !== '')


      // Get existing language select wrapper or create a new one
      if (parent.querySelector(`#${wrapper.id}`)) {
        wrapper = parent.querySelector(`#${wrapper.id}`);
      } else {
        parent.prepend(wrapper);
      }

      // Create the HTML for the language select section
      wrapper.innerHTML = /*html*/ `
    <div class="flex w-full ">
     ${this.features.languages?.allow ? `<div>
        <select id="languageSelect" class="${css('select')} pr-10">
          <option value ${!this.TargetLanguage ? ' selected' : ''
        }>Default language</option>  

          ${this.Languages.map(
          (language) => `
            <option value="${language.languageEnglish}" ${this.TargetLanguage === language.languageEnglish
              ? ' selected'
              : ''
            }>
              ${language.languageLabel}
              </option> 
          `
        ).join('')}
        </select>
      </div>`: ""}
      

      ${this.features.writing_styles?.allow ? `<div class="ml-2">
        <select id="writingStyleSelect" class="${css('select')} pr-10">
          <option value ${!this.WritingStyle ? ' selected' : ''
        }>Default style</option>

          ${this.WritingStyles.map(
          (writingStyle) => `
            <option value="${writingStyle.ID}" ${this.WritingStyle === writingStyle.ID ? ' selected' : ''
            }>
              ${this.WritingStyle === writingStyle.ID ? writingStyle.Label + ' style' : writingStyle.Label}
              </option> 
          `
        ).join('')}
        </select>
      </div>` : ""}

      ${""}

      ${this.features.variations.allow ? `<div class="ml-2">
        <select id="toneSelect" class="${css('select')} pr-10">

        <option value="" selected > No Variation</option>

          ${sortedUserTones.filter(d => !IN_BOUND.hiddenVariations.includes(d.ID)).map(
            (tone) => `
            <option value="${tone.ID}" ${this.Tone === tone.ID ? ' selected' : ''
              }>
              ${this.Tone === tone.ID ? tone.Label + ' variation' : tone.Label}
              </option> 
          `
          ).join('')}
        </select>
      </div>` : ""}

    </div>

    ${""}
  `;

      // Add event listener to language select to update the target language on change
      wrapper
        ?.querySelector('#languageSelect')
        ?.addEventListener('change', this.changeTargetLanguage.bind(this));

      // Add event listener to tone select to update the tone on change
      wrapper
        ?.querySelector('#toneSelect')
        ?.addEventListener('change', this.changeTone.bind(this));


      wrapper.querySelector('#variationButton')?.addEventListener('click', function () {
        wrapper.querySelector('#variationButtonContent')?.classList.toggle('hidden');
      });

      // const checkboxes = wrapper.querySelector('#variationButtonContent')?.getElementsByTagName('input');
      // for (let i = 0; i < checkboxes?.length; i++) {
      //   checkboxes[i].addEventListener('change', function() {
      //     let selectedOptions = [];
      //     for (let j = 0; j < checkboxes.length; j++) {
      //       if (checkboxes[j].checked) {
      //         selectedOptions.push(checkboxes[j].value);
      //       }
      //     }
      //     IN_BOUND.changeTone(selectedOptions);
      //     const VariationLabels = sortedUserTones.filter(d => IN_BOUND.Tone?.includes(d.ID) ).map( t => t.Label).join(', ')
      //     wrapper.querySelector('#variationButton').innerText = selectedOptions.length > 0 ? VariationLabels : 'Select Variations';
      //     // console.log(selectedOptions)
      //   });
      // }

      // wrapper
      //   ?.querySelector('#toneCategorySelect')
      //   ?.addEventListener('change', this.changeToneCategory.bind(this));

      // Add event listener to writing style select to update the writing style on change
      wrapper
        ?.querySelector('#writingStyleSelect')
        ?.addEventListener('change', this.changeWritingStyle.bind(this));

      // Add event listener to continue action select to update the continue action on change
      wrapper
        ?.querySelector('#continueActionSelect')
        ?.addEventListener('change', this.changeContinueAction.bind(this));
    },

    hideLanguageToneWritingStyleContinueActions() {
      // document.querySelector('#language-select-wrapper')?.remove()
    },

    // Change the TargetLanguage on selection change
    changeTargetLanguage(event) {
      this.TargetLanguage = event.target.value;

      // persist the last selected language in local storage
      localStorage.setItem(lastTargetLanguageKey, this.TargetLanguage);
    },

    // Change the Tone on selection change
    changeTone(ev) {
      const tone = ev.target.value;
      // this.Tone?.indexOf(selectedTones) > -1 ? this.Tone = this.Tone?.filter(d => d !== selectedTones) : this.Tone?.push(selectedTones)
      this.Tone = tone;

      window.localStorage.setItem("selectedTone", tone);
      // console.log(tone)
      // this.insertLanguageToneWritingStyleContinueActions()
    },
    changeToneCategory(ev) {
      const value = ev.target.value;
      // console.log(value)
      this.ToneCategorySelected = value;
      const allTones = this.companyTonesState ? [...this.DefaultTones, ...this.userTones] : this.userTones;
      this.Tones = allTones.filter(d => d.CategoryID === this.ToneCategorySelected);

      this.Tones.sort((a, b) => a.Label.localeCompare(b.Label));
      // this.Tone = this.Tones[0].ID

      this.insertLanguageToneWritingStyleContinueActions();
    },

    // Change the WritingStyle on selection change
    changeWritingStyle(event) {
      this.WritingStyle = event.target.value;
      window.localStorage.setItem("selectedWritingStyle", this.WritingStyle);
      this.insertLanguageToneWritingStyleContinueActions();
    },

    // Change the ContinueAction on selection change and submit the continue action prompt
    changeContinueAction(event) {
      const continueActionID = event.target.value;

      // Get prompt for the selected continue action
      const continueAction = this.ContinueActions.find(
        (action) => action.ID === continueActionID
      );

      // If the continue action is not found, skip
      if (!continueAction) {
        return;
      }

      // Track usage of continue action
      // this.Client.usePrompt(`${continueAction.ID}`, UsageTypeNo.SEND);

      // Submit the continue action prompt
      this.submitContinueActionPrompt(continueAction.Prompt);
    },

    // Ask ChatGPT to continue writing
    continueWriting() {
      this.submitContinueActionPrompt('Continue writing please');
    },

    // Submit the continue action prompt to ChatGPT
    submitContinueActionPrompt(prompt = '') {
      const textarea = document.querySelector('form textarea');

      // If the textarea is not empty and it's not "Continue writing please" - ask for confirmation
      if (
        textarea.value.trim() &&
        textarea.value.trim() !== 'Continue writing please' &&
        !confirm(
          'Are you sure you want to continue? The current prompt text will be lost.'
        )
      ) {
        return;
      }

      // Add the continue action prompt to the textarea
      textarea.value = prompt;
      textarea.focus();

      // select button element which is in form and it's direct next sibling of textarea
      let button = textarea.nextElementSibling;

      // If the button is not found, skip
      if (
        !button ||
        !button.tagName ||
        button.tagName.toLowerCase() !== 'button'
      ) {
        return;
      }

      // Click the "Submit" button
      button.click();

      const enterKeyEvent = new KeyboardEvent("keydown", {
        bubbles: true,
        cancelable: true,
        keyCode: 13,
      });
      textarea.dispatchEvent(enterKeyEvent);


    },

    hideContinueActionsButton() {
      const button = document.querySelector('#continueActionsGroup');

      if (!button) {
        return;
      }

      button.classList.add('invisible');
    },

    showContinueActionsButton() {
      const button = document.querySelector('#continueActionsGroup');

      if (!button) {
        return;
      }

      button.classList.remove('invisible');
    },

    // Decrement the current page of the prompt templates section and re-render
    prevPromptTemplatesPage() {
      this.PromptTemplateSection.currentPage--;
      this.PromptTemplateSection.currentPage = Math.max(
        0,
        this.PromptTemplateSection.currentPage
      );

      // Update the section
      this.insertPromptTemplatesSection();
    },

    // nextPromptTemplatesPage increments the current page and re-renders the templates
    nextPromptTemplatesPage() {
      let templates =
        this.PromptTemplatesType === PromptTemplatesType.OWN
          ? this.OwnPrompts
          : this.DefaultPromptTemplates;

      if (!templates || !Array.isArray(templates)) return;


      // Filter templates based on selected activity and search query
      templates = this.filterPromptTemplates(templates);

      // If there are no templates, skip
      if (templates.length === 0) return;

      this.PromptTemplateSection.currentPage++;

      this.PromptTemplateSection.currentPage = Math.min(
        Math.floor((templates.length - 1) / this.PromptTemplateSection.pageSize),
        this.PromptTemplateSection.currentPage
      );

      // console.log("templates: ",templates)
      // Update the section
      this.insertPromptTemplatesSection();
    },

    // Export the current chat log to a file
    exportCurrentChat() {
      const blocks = [
        ...document.querySelector('.flex.flex-col.items-center').children,
      ];

      let markdown = blocks.map((block) => {
        let wrapper = block.querySelector('.whitespace-pre-wrap');

        if (!wrapper) {
          return '';
        }

        // probably a user's, so..
        if (wrapper.children.length === 0) {
          return '**User:**\n' + wrapper.innerText;
        }

        // pass this point is assistant's

        wrapper = wrapper.firstChild;

        return (
          '**ChatGPT:**\n' +
          [...wrapper.children]
            .map((node) => {
              switch (node.nodeName) {
                case 'PRE':
                  return `\`\`\`${node
                  .getElementsByTagName('code')[0]
                  .classList[2].split('-')[1]
                  }\n${node.innerText.replace(/^Copy code/g, '').trim()}\n\`\`\``;
                default:
                  return `${node.innerHTML}`;
              }
            })
            .join('\n')
        );
      });

      markdown = markdown.filter((b) => b);

      if (!markdown) return false;

      let header = '';

      try {
        header =
          ExportHeaderPrefix +
          window.__NEXT_DATA__.props.pageProps.user.name +
          ' on ' +
          new Date().toLocaleString() +
          '\n```\n\n---';
      } catch {
        console.error(
          'Failed to get user name from window.__NEXT_DATA__.props.pageProps.user.name. Using default header instead.'
        );
      }

      const blob = new Blob([header + '\n\n\n' + markdown.join('\n\n---\n\n')], {
        type: 'text/plain',
      });

      const a = document.createElement('a');
      a.href = URL.createObjectURL(blob);
      //a.download = 'chatgpt-thread_' + (new Date().toLocaleString('en-US', { hour12: false }).replace(/[\s/:]/g, '-').replace(',', '')) + '.md'
      a.download = ExportFilePrefix + new Date().toISOString() + '.md';
      document.body.appendChild(a);
      a.click();
    },

    // Edit the prompt template
    async editPromptTemplate(idx) {
      const prompt =
        this.PromptTemplatesType === PromptTemplatesType.OWN
          ? this.OwnPrompts[idx]
          : this.PromptTemplates[idx];

      // console.log(prompt)

      // Only allow editing of own prompt templates
      if (
        this.PromptTemplatesType !== PromptTemplatesType.OWN &&
        !prompt.OwnPrompt &&
        !this.isAdminMode()
      ) {
        return;
      }

      await this.showSavePromptModal(new CustomEvent(editPromptTemplateEvent), prompt.ID, prompt);

      // Pre-fill the prompt template modal with the prompt template
      const form = document.getElementById('savePromptForm');

      // console.log(prompt)
      IN_BOUND.hidePromptCardOptions();

      form.elements['Prompt'].value = prompt.Prompt;
      form.elements['Teaser'].value = prompt.Teaser;
      form.elements['PromptHint'].value = prompt.PromptHint;
      form.elements['Title'].value = prompt.Title;
      form.elements['Tags'].value = prompt.Tags;
      // form.elements['Community'].value = prompt.Community;
      form.elements['ID'].value = prompt.ID;
      prompt.Tone ? form.elements['Tone'].value = prompt.Tone : "";

      // form.elements['AuthorName'].value = prompt.AuthorName;
      // form.elements['AuthorURL'].value = prompt.AuthorURL;
      // form.elements['Views'].value = prompt.Views;
      // form.elements['Usages'].value = prompt.Usages;
      // form.elements['Votes'].value = prompt.Votes;
      if (form.elements['companyTonesState']) {
        form.elements['companyTonesState'].checked = prompt.companyTonesState;
      }


      // Check the "Share as public" checkbox if the prompt template is public
      if (prompt.PromptTypeNo === PromptTypeNo.PUBLIC) {
        if (form.elements['Public']) {
          form.elements['Public'].checked = true;
        }
      }

      // Trigger onchange event on Topics to update available Activities
      // form.elements['Community'].dispatchEvent(new Event('change'));

      // Set the selected Activity (category)
      // form.elements['Category'].value = prompt.Category;

    },

    // Delete a prompt template
    async deletePromptTemplate(idx) {
      const prompt =
        this.PromptTemplatesType === PromptTemplatesType.OWN
          ? this.OwnPrompts[idx]
          : this.PromptTemplates[idx];

      // Only allow deleting of own prompt templates
      if (
        this.PromptTemplatesType !== PromptTemplatesType.OWN &&
        !prompt.OwnPrompt &&
        !this.isAdminMode()
      ) {
        return;
      }

      // Ask for confirmation
      if (
        !confirm(
          `Are you sure you want to delete prompt template "${prompt.Title}"?`
        )
      ) {
        return;
      }

      try {
        this.showNotification(
          NotificationSeverity.SUCCESS,
          'Sync..'
        );
        await this.Client.deletePrompt(prompt.ID, this.Company);
        // this.refreshData();

        // remove template using ID
        // this.OwnPrompts = this.OwnPrompts.filter(
        //   (ownPrompt) => ownPrompt.ID !== prompt.ID
        // );

        // remove template using ID from the public prompt templates if it's public
        // if (prompt.PromptTypeNo === PromptTypeNo.PUBLIC) {
        //   this.PromptTemplates = this.PromptTemplates.filter(
        //     (promptTemplate) => promptTemplate.ID !== prompt.ID
        //   );
        // }
      } catch (error) {
        this.showNotification(
          NotificationSeverity.ERROR,
          'Something went wrong. Please try again.'
        );
        return;
      }

      // update the section
      this.insertPromptTemplatesSection();
    },

    // Vote for a prompt template with a thumbs up
    async voteThumbsUp(promptID) {
      this.showNotification(
        NotificationSeverity.SUCCESS,
        'Sync..'
      );
      try {
        await this.Client.voteForPrompt(promptID, 1);
        // this.fetchPrivatePromptsEvent(this.Company, this.selectedTeam);
      } catch (error) {
        this.showNotification(
          NotificationSeverity.ERROR,
          'Something went wrong. Please try again.'
        );
        return;
      }

      // this.showNotification(
      //   NotificationSeverity.SUCCESS,
      //   'Prompt added to favorites!'
      // );
    },

    // Vote for a prompt template with a thumbs down
    async voteThumbsDown(promptID) {
      this.showNotification(
        NotificationSeverity.SUCCESS,
        'Sync..'
      );
      try {
        await this.Client.voteForPrompt(promptID, -1);
        // this.fetchPrivatePromptsEvent(this.Company, this.selectedTeam);
      } catch (error) {
        this.showNotification(
          NotificationSeverity.ERROR,
          'Something went wrong. Please try again.'
        );
        return;
      }

      // this.showNotification(
      //   NotificationSeverity.SUCCESS,
      //   'Prompt removed from favorites!'
      // );
    },

    // Report the prompt template as inappropriate
    async reportPrompt(e) {
      // prevent the form from submitting
      e.preventDefault();

      const formData = new FormData(e.target);

      try {
        await this.Client.reportPrompt(
          formData.get('PromptID'),
          +formData.get('FeedbackTypeNo'),
          formData.get('FeedbackText'),
          formData.get('FeedbackContact')
        );
      } catch (error) {
        this.showNotification(
          NotificationSeverity.ERROR,
          'Something went wrong. Please try again.'
        );
        return;
      }

      this.showNotification(
        NotificationSeverity.SUCCESS,
        'Thanks for your feedback! We will review this prompt.'
      );

      this.hideModal('reportPromptModal');
    },

    // Copy link to prompt template to clipboard
    copyPromptDeepLink(idx) {
      const prompt =
        this.PromptTemplatesType === PromptTemplatesType.OWN
          ? this.OwnPrompts[idx]
          : this.PromptTemplates[idx];

      if (!prompt) {
        return;
      }

      // const promptLink =
      //   prompt.PromptTypeNo === PromptTypeNo.PUBLIC
      //     ? `https://app.IN_BOUND.com/prompts/${prompt.ID}`
      //     : `https://chat.openai.com/chat?${queryParamPromptID}=${prompt.ID}`;

      const promptLink = `https://chat.openai.com/chat?${queryParamPromptID}=${prompt.ID}`;

      navigator.clipboard
        .writeText(promptLink)
        .then(
          // successfully copied
          () => {
            // Warning about prompt not shared as public
            if (prompt.PromptTypeNo !== PromptTypeNo.PUBLIC) {
              this.showNotification(
                NotificationSeverity.WARNING,
                'The link to the prompt template was copied to your clipboard.<br>This prompt is not shared as public. Only you can access it.'
              );

              return;
            }

            // Success - copied & public
            this.showNotification(
              NotificationSeverity.SUCCESS,
              'The link to the prompt template was copied to your clipboard.'
            );
          },
          // error - something went wrong (permissions?)
          () => {
            this.showNotification(
              NotificationSeverity.ERROR,
              'Something went wrong. Please try again.'
            );
          }
        );
    },

    // This function selects a prompt template using the index
    selectPromptTemplateByIndex(idx) {

      const templates =
        this.PromptTemplatesType === PromptTemplatesType.OWN
          ? this.OwnPrompts
          : this.PromptTemplates;

      // If there are no templates, skip
      if (!templates || !Array.isArray(templates)) return;

      this.selectPromptTemplate(templates[idx]);
      // console.log("current tone: ",templates[idx]?.Tone)

      // Hide the "Continue Writing" button (prompt selected/new chat)
      this.hideContinueActionsButton();
      setTimeout(function () {
        IN_BOUND.insertLanguageToneWritingStyleContinueActions();
      }, 300);

    },

    addToOwnPrompts(promptID) {
      // console.log(this.OwnPrompts.map(t => t.ID ).includes(promptID))
      this.forkPrompt(promptID);
    },

    isObserverExist(element) {
      const observerEntries = window.performance.getEntriesByType('layout-shift');

      for (const entry of observerEntries) {
        if (entry.source && entry.source.node === element) {
          return true;
        }
      }

      return false;
    },


    /**
     * Select a prompt template and show it in the prompt input field
     *
     * @param {Prompt} template
     */
    selectPromptTemplate(template) {
      const textarea = document.querySelector('textarea');
      if (!textarea)
        return
      const parent = textarea.parentElement;
      let wrapper = document.createElement('div');
      wrapper.id = 'prompt-wrapper';
      if (parent.querySelector('#prompt-wrapper')) {
        wrapper = parent.querySelector('#prompt-wrapper');
      } else {
        textarea.parentNode.insertBefore(wrapper, textarea);
      }

      const url = new URL(window.location.href);

      if (template) {

        this.SelectedPromptTemplateID = template.ID;
        localStorage.setItem('SelectedPromptTemplateID', template.ID);

        this.Tone = template?.Tone ? template?.Tone : this.Tone;
        this.companyTonesState = template.companyTonesState || false;
        // console.log(template, this.Tone)

        this.features.variables?.allow && this.showVariablesModal(template);

        this.activePromptID = template.ID;
        // console.log(this.activePromptID)
        wrapper.innerHTML = /*html*/ `
        <span class="${css`tag`}">
        
        <span class="flex items-center">
          ${sanitizeInput(template.Title)}


          <span class="inline-flex items-center ml-2" >
              <a title="close prompt" style=" margin-left:10px; margin-top:auto; " class=" cursor-pointer" 
                onclick="IN_BOUND.selectPromptTemplate(null)">${svg('Cross_Round_h4')}</a> </span>
                </span>

              <span style="font-weight:normal;" class="text-xs font-thin ">
              ${extensionText.textareaPlaceholderIdentifier}  ${sanitizeInput(template.PromptHint)}
              </span>

        </span>
        `;


        // textarea.placeholder = template.PromptHint;
        textarea.placeholder = "Enter your prompt";
        this.SelectedPromptTemplate = template;
        if (template.Prompt.indexOf(PromptPlaceholder) > -1) {
          textarea.value = ' ';
          textarea.nextElementSibling.disabled = false;
        }
        textarea.focus();

        // Update query param IN_BOUND_PromptID to the selected prompt ID
        if (url.searchParams.get(queryParamPromptID) === template.ID) {
          return;
        }

        url.searchParams.set(queryParamPromptID, template.ID);
        url.searchParams.set("inbound_o_id", this.selectedCompany);
      } else {
        wrapper.innerHTML = '';
        // textarea.placeholder = '';
        this.SelectedPromptTemplate = null;
        this.SelectedPromptTemplateID = null;
        localStorage.setItem('SelectedPromptTemplateID', '');

        // Remove query param IN_BOUND_PromptID
        if (!url.searchParams.get(queryParamPromptID)) {
          return;
        }

        url.searchParams.delete(queryParamPromptID);
        url.searchParams.delete("inbound_o_id", this.selectedCompany);
      }

      // Push new URL to browser history
      window.history.pushState({}, '', url);
    },

    CSVToArray(strData, strDelimiter) {
      strDelimiter = strDelimiter || ',';
      var pattern = new RegExp(
        '(\\' +
        strDelimiter +
        '|\\r?\\n|\\r|^)' +
        '(?:"([^"]*(?:""[^"]*)*)"|' +
        '([^"\\' +
        strDelimiter +
        '\\r\\n]*))',
        'gi'
      );
      var data = [[]];
      var matches;
      while ((matches = pattern.exec(strData))) {
        var delimiter = matches[1];
        if (delimiter.length && delimiter !== strDelimiter) {
          data.push([]);
        }
        var value = matches[2]
          ? matches[2].replace(new RegExp('""', 'g'), '"')
          : matches[3];
        data[data.length - 1].push(value);
      }
      return data;
    },

    // get the topic label from the topic ID
    getTopicLabel(TopicID) {
      const topic = this.Topics.find((topic) => topic.ID === TopicID);

      if (!topic) {
        return '';
      }

      return topic.Label;
    },

    // get the activity label from the activity ID
    getActivityLabel(ActivityID) {
      const activity = this.Activities.find(
        (activity) => activity.ID === ActivityID
      );

      if (!activity) {
        return '';
      }

      return activity.Label;
    },

    // current user is admin
    isAdmin() {
      return this.Client.User.UserStatusNo === UserStatusNo.ADMIN;
    },

    // current user is admin and has enabled admin mode
    isAdminMode() {
      return this.isAdmin() && this.AdminMode;
    },

    // toggle admin mode and re-render prompt templates
    toggleAdminMode() {
      if (!this.isAdmin()) {
        return;
      }

      this.AdminMode = !this.AdminMode;

      this.insertPromptTemplatesSection();
    },

    // current user can create public or private prompt template
    canCreatePromptTemplate() {
      return (
        this.canCreatePublicPromptTemplate() ||
        this.canCreatePrivatePromptTemplate() || true
      );
    },

    // current user can create private prompt template
    canCreatePrivatePromptTemplate() {
      return this.isAdmin() || this.Client.User.MaxNewPrivatePromptsAllowed > 0;
    },

    // current user can create public prompt template
    canCreatePublicPromptTemplate() {
      return this.isAdmin() || this.Client.User.MaxNewPublicPromptsAllowed > 0;
    },

    // display notification with "cannot create public prompt template" error
    cannotCreatePublicPromptTemplateError() {
      this.showNotification(
        NotificationSeverity.WARNING,
        'Cannot Create Public Prompt Template',
        false
      );
    },

    // display notification with "cannot create private prompt template" error
    cannotCreatePrivatePromptTemplateError() {
      this.showNotification(
        NotificationSeverity.WARNING,
        "Cannot Create Private Prompt Template",
        false
      );
    },

    // display notification with "cannot create any prompt template" (public nor private) error
    cannotCreatePromptTemplateError() {
      this.showNotification(
        NotificationSeverity.WARNING,
        "Cannot Create Prompt Template",
        false
      );
    },

    showPrivactTermsBanner() {
      const showBanner = window.localStorage.getItem("showPrivactTermsBanner") === "true";
      if (showBanner) return

      const dialog = `
    <div class="bg-gray-100 flex justify-center items-center h-screen z-50" style="z-index=999999999999999;">
        <div class="bg-white rounded-lg p-8 max-w-md shadow-md">
            <button id="showDialogButton" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full mb-4">Show Terms and Conditions</button>
            <div class="dialog hidden">
                <div class="text-center">
                    <h2 class="text-2xl font-bold mb-4">Terms and Conditions</h2>
                    <p>Your terms and conditions content goes here.</p>
                </div>
                <div class="flex justify-center mt-6">
                    <button id="closeDialogButton" class="bg-gray-400 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded-full">Close</button>
                </div>
            </div>
        </div>
    </div>
    `;

      const elem = document.createElement('div');
      elem.innerHTML = dialog;

      document.body.appendChild(elem);

      // window.localStorage.setItem("showPrivactTermsBanner", "true") 
    }
  };



  if (window.location.hostname === "chat.openai.com") {
    setTimeout(async function () {
      // fetch(`${APIEndpoint}/user?user=${window.__NEXT_DATA__.props.pageProps.user.email}`)
      // .then(res => res.json())
      // .then( usr => {
      //   // console.log(usr)
      //   usr ? window.IN_BOUND.init() : ""
      // })
      if (window.location.href.includes("/auth/")) {
        return
      }
      window.IN_BOUND.init();



      // if(window.location.href.includes("workflow=true")){
      //   const prompt_0 = window.localStorage.getItem('activeWorkflowPrompt')
      //   if(prompt_0){
      //     const chatgptRes = await chatgpt.askAndGetReply(prompt_0)
      // console.log(chatgptRes)
      //   }
      // }
    }, 200);
  }

  // else if(window.location.hostname === "bard.google.com"){
  //   setTimeout(function(){
  //       const profile = document.querySelector('header').querySelectorAll('a')
  //       const email_username = profile[profile.length-1].attributes['aria-label'].value
  //       const email = email_username.split('(')[1].replace(')','')
  // console.log(email)
  //     fetch(`${APIEndpoint}/user?user=${email}`)
  //     .then(res => res.json())
  //     .then( usr => {
  // console.log(usr)
  //       window.IN_BOUND = IN_BOUND_BARD
  //       usr ? window.IN_BOUND.init() : ""
  //     })
  //   },500)
  // }

})();
