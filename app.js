const express = require('express');
const ejs = require('ejs');
const http = require('http');
const app = express();
const server = http.createServer(app);

app.use(express.static(__dirname + "/public"));
// app.use(express.static(path.join(__dirname, 'public'), {maxAge: 36000}));

//设置模板视图的目录
app.set("views", "./views");
//设置是否启用视图编译缓存，启用将加快服务器执行效率
app.set("view cache", true);
// 2.注册html模板引擎：
app.engine('html', ejs.__express);
//设置模板引擎的格式即运用何种模板引擎
app.set("view engine", "html");

app.get('/', (req, res) => {
    res.send('hi socket...');
})

app.get("/index", (req, res) => {
    res.render("index", {
        title: 'Hi'
    });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, (err) => {
    if (err) throw err;
    console.log(`Start server:http://localhost:${PORT}`);
});

// socket
const options = {};
const io = require('socket.io')(server, options);
io.on('connection', socket => {
    console.log('建立连接.............');
    socket.on('message', (data) => {
        console.log(data);
        socket.emit('servermessage', data);
    })
});