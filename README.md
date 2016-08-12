# material-ui-more

High-level React components built from material-ui components. Currently has a Proper Name popup component. Address popup component to come. This is very much work in progress.

Demo of currently available components is at https://shoe54.github.io/material-ui-more/

## Pre-requisites

* Node
* Npm

## Usage

Add the following dependencies to your project:

```
  "dependencies": {
    "material-ui": "^0.15.2",
    "material-ui-more": "^0.0.8",
    "keycode": "^2.1.4",
    "react": "^15.0.0",
    "react-dom": "^15.0.0",
    "react-event-listener": "^0.2.1",
    "react-tap-event-plugin": "^1.0.0"
  },
```

See `src\demo.jsx` for component usage examples.

# Contributing

## Building

    npm install
    npm run build
    npm run demobuild

To publish npm module, use `npm publish` after building.

## Running for development purposes

    npm run demodevbuild
    npm run demorun

You will need to execute the above commands in separate console windows as each command will stay running and watch for file changes