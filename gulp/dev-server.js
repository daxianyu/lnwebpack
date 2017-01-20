/**
 * Created by tangjianfeng on 2017/1/20.
 */
/* global require */
const path = require('path'),
    express = require('express'),
    webpack = require('webpack'),
    proxyMiddleware = require('http-proxy-middleware'),
    port = require('./config').PORT;

let app = express(),
    complier = webpack()