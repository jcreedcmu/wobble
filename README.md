wobble
======

A little test of browser device orientation apis.

The thought was maybe you could have a game where something would
happen on a single large display (tv or projector) running off a
laptop, and the players would interact via wobbling their phones
around.

Running
-------

I looked up my computer's ethernet address with `ifconfig`, found it
to be 192.168.0.4. On that computer ("the host") ran
```shell
bower install
npm install
node server.js
```
and opened a browser to `http://192.168.0.4:4080/host.html`

On each cellphone I went to `http://192.168.0.4:4080`
