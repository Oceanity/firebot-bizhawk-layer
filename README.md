# Bizhawk Compatibility Layer (by Oceanity)

This script was created to allow Bizhawk Lua scripts to send `POST` requests to Firebot. By default, sending a `POST` request from Bizhawk using it's `comm.httpPost` method sends a body like this with no way to adjust it:

```json
{
  "payload": "{ \"foo\": \"bar\" }"
}
```

This script adds a new endpoint to Firebot, `/integrations/oceanity/bizhawk` that takes `POST` requests with a payload like this (needs to be string encoded in Lua script):

```json
{
  "url": "/api/v1/counters/my-counter-id-here" /* whatever Firebot endpoint you want to pass through too */,
  "data": {
    /* your request body */
    "value": 1
  }
}
```

and passes it on to the actual Firebot endpoint, returning the response as you would expect.

### Setup

- In Firebot, go to Settings > Scripts
  - Enable Custom Scripts if they are not currently enabled
  - Click Manage Startup Scripts
  - Click Add New Script
  - Click the "scripts folder" link to open the Scripts Folder and place `oceanityBizhawkCompatibilityLayer.js` there
  - Refresh the list of scripts and pick `oceanityBizhawkCompatibilityLayer.js` from the dropdown

### Updating

- Overwrite existing `oceanityBizhawkCompatibilityLayer.js` with new version
- Restart Firebot
