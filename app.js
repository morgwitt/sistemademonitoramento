const express = require('express');
const socket = require('socket.io');
const app = express();
const bodyParser = require('body-parser');
const SerialPort = require('serialport');
const port = new SerialPort('COM3');
const Readline = SerialPort.parsers.Readline;
const parser = new Readline();
port.pipe(parser);
const db = require('./database');

// twitter
const Twit = require('twit');
const T = new Twit({
  consumer_key:         'aKJHoo9Z6Kg6haHKdACaFph1n',
  consumer_secret:      'AHikb7zx06dI5OOh9PCK79eSadD4evq8xVAovxA3sgfzy87Ent',
  access_token:         '138050795-ii3bR7ssgX08KTsHf9azOQp0oF2lWbGGBd30skIx',
  access_token_secret:  'ZSyc5GOBTB0GkNu7CSe3J1IFfAyFCXT8c80ulMvdDU7yX',
  timeout_ms:           60*1000,  // optional HTTP request timeout to apply to all requests.
  strictSSL:            true,     // optional - requires SSL certificates to be valid.
})



const tweet =  {
	status: 'Um usuário está usando o meu Sistema de monitoramento da cultura do morangueiro'
}

function tweeted(err, data, response) {
	console.log(data);
	if(err){
		console.log("algo errado no twitter");
	}else{
		console.log("twitter funcionando");
	}
}

T.post('statuses/update', tweet,  tweeted);



const session = require('express-session');

app.use(session({
    secret: 'senha do meu sistema que ninguem nunca vai saber, nunquinha 12351R1!%!#$!@@!#',
    resave: false,
    saveUninitialized: false
}));





const funcaoOK = function() {
	console.log("Tudo certo no listen, na porta 8080.");
}
const server = app.listen(8080, funcaoOK);
const io = socket.listen(server);
app.use(bodyParser.urlencoded({ extended: true })); 
app.set('view engine', 'ejs') 

//Rotas
const userRoutes = require('./routes/userRoutes');
app.use(userRoutes);

const adminRoutes = require('./routes/adminRoutes');
app.use(adminRoutes);


//verificação de administrador
const isAdmin = (req, res, next) => {
    console.log("Verificando se é admin...");
    if (req.session.isAdmin) {
        next();
    } else {
        res.redirect('/');
    }

}

// SESSÃO PARA UP

app.use(express.static('public')); //o padrao é /public, então pode ser omitido
app.use('/data', express.static('data'));
app.use('/uploads', express.static('uploads'));


//SESSÃO ARDUINO DATA 


app.use((req, res) => {
	res.status(404).json({
		message: 'Resource not found'
	});
});

parser.on('open', function (){
	console.log('conexão aberta');
});
		
let cont = 0;

parser.on('data', (data) =>{ 
	serialData = data;
	

	if(serialData.indexOf('°C') > -1){
			io.emit('temp', serialData);
			if(cont == 3600){
				connection.query(`"INSERT INTO temperature (temperatura, date_temp) 
					VALUES ('"+serialData+"', current_date());" `);
				cont = 0;
				console.log("salvou no banco e o valor de cont ");
			}else{
				cont++;
			}
		console.log(serialData);
	}else if(serialData.indexOf('%') > -1){
		io.emit('hum', serialData);

		if(cont == 3600 ){
			connection.query ("INSERT INTO humidity (umidade, data_umidade) VALUES ('"+serialData+"', current_date());");
			console.log("salvou no banco e o valor de cont ");
		}
		console.log(serialData);
	}else{
		io.emit('soil', serialData);
		if(cont == 3600 ){
			connection.query ("INSERT INTO moisture_humidity (umidade_solo, data_umidade_solo) VALUES ('"+serialData+"', current_date())");
		}
		console.log(serialData);
	}
});


port.on('error', function(err){
	console.log(err);
});



