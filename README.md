# getargs.js

A Javascript library for easily reading and modifying GET arguments.

[View the demo.](https://hellshltd.github.io/getargs.js/)

## Installing

You can either load the script from cdn.hell.sh using

    <script src="https://cdn.hell.sh/getargs.js/1.3/getargs.js" integrity="sha384-75nPgIj7miANv4WfaIVYXRX2vmZCLpNWQ5DXmsAwUPj2sig3yHrtft1Pgp8JXwUy" crossorigin="anonymous"></script>

or [download the getargs.js](https://raw.githubusercontent.com/hellshltd/getargs.js/master/getargs.js) and host it yourself.

## Reading

You can get the getargs using `window.getargs.get();` or `window.location.getargs;`.

You can get a single property using `window.getargs.get(key);` or `window.location.getargs.key`. Either way, `undefined` means the property has not been set and an empty string means it's present but without value, e.g. `?test` or `?test=`.

## Writing

You can set the getargs to `undefined`, a string, or an object, using `window.getargs.set(value);` or `window.location.getargs = value;`.

You can set a single property using `window.getargs.set(key, value);`, which returns `window.getargs` allowing for code such as `window.getargs.set("key1", "value1").set("key2", "value2");`

## Unsetting

You can delete a key using `window.getargs.remove(key)`.

## Events

You can register a change handler using `window.getargs.registerChangeHandler(function);` and unregister one using `window.getargs.registerChangeHandler(function);`.

A change handler is a normal function which will be called every time the value of `location.search` changes.

This is only useful if you have `window.getargs.options.pushState` enabled and fix links using `window.getargs.fixLinks()`.

## Options

You can modify the options by accessing the `window.getargs.options` object. There are the following properties:

- `pushState` (boolean, default: false) If true, `history.pushState` will be used instead of `window.location.search` to prevent the site from reloading.
- `monitorInterval` (int, default: 200) If you registered a change handler, a monitor "thread" will start and check `location.search` every `monitorInterval` milliseconds.

## Utils

- `window.getargs.searchToObject(search)` turns a string such as `?test=true` in an object such as `{"test":"true"}`.
- `window.getargs.objectToSearch(object)` turns an object such as `{"test":"true"}` in a string such as `test=true`.
- `window.getargs.fixLinks()` turns all links with a href such as `?test=true` into links which will call `window.getargs.set(href)`. This is only useful if you have `window.getargs.options.pushState` enabled.
- `window.getargs.updateSearch(object)` updates the `window.location.search` to reflect the given object. This is similar to using `window.getargs.set(object);` or `window.location.getargs = object;`.
