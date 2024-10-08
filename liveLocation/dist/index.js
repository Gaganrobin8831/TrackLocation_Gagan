"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
require('dotenv').config();
var express = require('express');
var app = express();
var http = require('http').createServer(app);
var socketio = require('socket.io');
var path = require('path');
var io = socketio(http);
var port = process.env.PORT || 3000;

// Serve static files from the 'dist' directory
app.use(express["static"](path.join(__dirname, 'dist')));

// Serve HTML file
app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'views', 'index.html')); // Adjust the path as needed
});
io.on("connection", function (socket) {
  socket.on("send-location", function (data) {
    io.emit("recive-location", _objectSpread({
      id: socket.id
    }, data));
  });
  console.log("User Connected: " + socket.id);
  socket.on("disconnect", function () {
    console.log("User disconnected: " + socket.id);
    io.emit("User-disconnect", socket.id);
  });
});
http.listen(port, function () {
  console.log("The server is running on http://localhost:".concat(port, "/"));
});