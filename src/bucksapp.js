import _ from "lodash";
import constants from "./constants";

const HOST = constants.HOST;
const LANGUAGES = constants.LANGUAGES;

class Bucksapp {
  initializeIframe = (divId, token, options) => {
    let language = "es/";
    if (typeof divId !== "string" || divId === "") {
      throw "Invalid div id";
    }
    if (typeof token !== "string" || token === "") {
      throw "Invalid token";
    }
    const iframeContainer = window.document.getElementById(divId);

    if (!iframeContainer) {
      throw "Div not exists";
    }

    if (typeof options !== "undefined") {
      if (typeof options.language !== "undefined") {
        if (
          typeof divId !== "string" ||
          !LANGUAGES.includes(options.language)
        ) {
          throw "Invalid language";
        }
        language = options.language + "/";
      }

      if (typeof options.responseHandler !== "undefined") {
        Settings.handler = options.responseHandler;
      }
    }

    window.document.cookie = "token=" + token + "; domain=" + HOST + ";";
    const iframe = window.document.createElement("iframe");

    iframe.src = HOST + language + "?token=" + token;
    iframe.style.width = "100%";
    iframe.style.borderWidth = "0px";
    iframe.style.height = `${iframeContainer.offsetHeight}px`;
    iframe.style.minHeight = `${iframeContainer.offsetHeight}px`;

    iframeContainer.innerHTML = "";
    iframeContainer.appendChild(iframe);
  };
}

export default Bucksapp;
