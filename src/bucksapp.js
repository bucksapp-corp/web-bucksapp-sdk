import _ from "lodash";
import { LANGUAGES, ENVIRONMENTS } from "./constants";

class Bucksapp {
  initializeIframe = (divId, apiKey, uuid, environment, options) => {
    // Validaciones
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
    if (
      typeof environment !== "string" ||
      environment === "" ||
      !ENVIRONMENTS.includes(environment) //TODO: Esto esta fallando al compilar, ver por qué?
    ) {
      throw "Invalid environment";
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

    //Setup de entorno
    let api_host = "";
    let app_host = "";
    switch (environment) {
      case "development":
        api_host = "https://api.dev.bucksapp.com/";
        app_host = "https://app.dev.bucksapp.com/";
        break;
      case "staging":
        api_host = "https://api.stg.bucksapp.com/";
        app_host = "https://app.stg.bucksapp.com/";
        break;
      case "sandbox":
        api_host = "https://api.sbx.bucksapp.com/";
        app_host = "https://app.sbx.bucksapp.com/";
        break;
      case "production":
        api_host = "https://api.bucksapp.com/";
        app_host = "https://app.bucksapp.com/";
        break;
      default:
        break;
    }

    var data = JSON.stringify({
      user: uuid,
    });

    var xhr = new XMLHttpRequest();

    xhr.addEventListener("readystatechange", function () {
      if (this.readyState === 4) {
        if (this.status === 200) {
          const response = JSON.parse(this.responseText);
          const token = response?.token;
          if (token) {
            const iframe = window.document.createElement("iframe");
            iframe.src = app_host + language + "?token=" + token;
            iframe.style.width = "100%";
            iframe.style.borderWidth = "0px";
            iframe.style.height = `${iframeContainer.offsetHeight}px`;
            iframe.style.minHeight = `${iframeContainer.offsetHeight}px`;
            iframeContainer.innerHTML = "";
            iframeContainer.appendChild(iframe);
          } else {
            throw "Invalid user";
          }
        } else {
          throw `${this.status} - ${this.responseText}`;
        }
      }
    });

    xhr.open("POST", `${api_host}/api/fi/v1/authenticate`);
    xhr.setRequestHeader("JWT_AUD", environment);
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.setRequestHeader("X-API-KEY", apiKey);

    xhr.send(data);
  };
}

export default Bucksapp;
