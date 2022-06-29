# Bucksapp Web SDK

Reference for integrating with the Bucksapp Web SDK.

## Overview

To get started with Bucksapp Web SDK, first, you'll want to contact us to get API keys and get further information about acquiring credentials for the Bucksapp API.

## Getting Started

### Install the SDK

```
npm i @bucksapp/web-bucksapp-sdk
```

### Importing the library


```
<script src=".../dist/bucksapp.js"></script>
```


### Initialize

```
<body>
...
<div id="iframe-container"></div>
...
<script src=".../dist/bucksapp.js"></script>
<script>
window.onload = (event) => {
    Bucksapp.initializeIframe(
        'iframe-container',
        'API_KEY',
        'uuid',
        'environment'
        { "language": 'en' } //options
    );
};
</script>

</body>
```

#### Options

`language` [`"es"`, `"en"`]
