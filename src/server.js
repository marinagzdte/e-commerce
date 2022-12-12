import express from 'express';
import cookieParser from 'cookie-parser';
import session from 'express-session';
import passport from './middlewares/passport.js';
import compression from 'compression';
import { createServer } from 'http';
import { Server } from 'socket.io';
import { productRouter, messageRouter, orderRouter, cartRouter, userRouter } from "./routes/index.js";
import { MessagesRepository } from './repositories/MessageRepository.js';

const app = express();
const messagesRepo = new MessagesRepository();

app.use(cookieParser());
app.use(session({
    secret: 'secret',
    resave: true,
    saveUninitialized: false,
    cookie: {
        maxAge: 60000,
        httpOnly: false,
        secure: false
    },
    rolling: true
}));

app.use(passport.initialize())
app.use(passport.session())

app.use(compression())
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/productos', productRouter)
app.use('/mensajes', messageRouter);
app.use('/ordenes', orderRouter);
app.use('/carritos', cartRouter)
app.use('', userRouter);

app.all('*', (req, res) => {
    res.status(405).json({ error: -2, descripcion: `ruta ${req.url} metodo ${req.method} no implementado` })
});

/*-----------------------------------------------*/
/*               socket setup                    */
/*-----------------------------------------------*/

const httpServer = createServer(app);
const io = new Server(httpServer);

io.on('connection', async socket => {
    logger.logInfo('Un cliente se ha conectado.');
    socket.emit('messages', { messages: await messagesRepo.getAll() });

    socket.on('new-chat-message', async data => {
        await messagesRepo.add(data);
        io.sockets.emit('messages', { messages: await messagesRepo.getAll() })
    });
});

export default httpServer;