var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http)
var bodyParser = require('body-parser')
var AlertController = require('./controllers/alertController')

var mongoose = require('mongoose')
mongoose.connect('mongodb://localhost:27017/alertas')


//middlewares
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true}))

//rutas
app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});

app.post('/api/save',AlertController.addAlert)

app.get('/alertas', AlertController.view)




//servidor de WebSockets
io.on('connection', function(socket){

  socket.on('disconnect', function(){
    console.log('un usuario se desconecto');
  });

  socket.on('chat message', function(msg){
    io.emit('chat message', msg);
  });  

})

var mongooseObserver = require('mongoose-observer')
mongooseObserver.register('Alert', 'create', function(newAlert){
  io.emit('nueva alerta',newAlert)
});

app.set('view engine', 'jade')

http.listen(3000, function(){
  console.log('listening on *:3000');
});
