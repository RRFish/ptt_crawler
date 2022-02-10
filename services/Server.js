import express from "express"
import { engine } from 'express-handlebars';

const server = express()

server.engine("handlebars", engine())
server.set('view engine', 'handlebars');
server.set('views', './views');

export {
    server
}