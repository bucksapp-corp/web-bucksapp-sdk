import _ from "lodash";
import constants from "./constants";

const HOST = constants.HOST;
const ENV = constants.ENV;
const API_HOST = constants.API_HOST;
const LANGUAGES = constants.LANGUAGES;

class Bucksapp {
  initializeIframe = (divId, apiKey, uuid, options) => {
    let language = "es/";
    if (typeof divId !== "string" || divId === "") {
      throw "Invalid div id";
    }
    if (typeof apiKey !== "string" || apiKey === "") {
      throw "Invalid apiKey";
    }
    if (typeof uuid !== "string" || uuid === "") {
      throw "Invalid uuid";
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

    var data = JSON.stringify({
      user: uuid,
    });

    var xhr = new XMLHttpRequest();
    // xhr.withCredentials = true;

    xhr.addEventListener("readystatechange", function () {
      if (this.readyState === 4 && this.status === 200) {
        const response = JSON.parse(this.responseText);
        const token = response?.token;
        if (token) {
          const iframe = window.document.createElement("iframe");
          iframe.src = HOST + language + "?token=" + token;
          iframe.style.width = "100%";
          iframe.style.borderWidth = "0px";
          iframe.style.height = `${iframeContainer.offsetHeight}px`;
          iframe.style.minHeight = `${iframeContainer.offsetHeight}px`;
          iframeContainer.innerHTML = "";
          iframeContainer.appendChild(iframe);
        }else{
          throw "Invalid user";
        }
      }else{
        throw `${this.status} - ${this.responseText}`
      }
    });

    xhr.open("POST", `${API_HOST}/api/fi/v1/authenticate`);
    xhr.setRequestHeader("JWT_AUD", ENV);
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.setRequestHeader("X-API-KEY", apiKey);

    xhr.send(data);
  };
}

export default Bucksapp;
