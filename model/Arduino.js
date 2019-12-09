const db = require('./database');
const socket = require('socket.io');
const SerialPort = require('serialport');
const port = new SerialPort('COM3');
const Readline = SerialPort.parsers.Readline;
const parser = new Readline();
port.pipe(parser);

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