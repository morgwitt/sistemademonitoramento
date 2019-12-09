const db = require('../database');

const connection = db;


exports.MostraPaginaInicial = (req, res) => {
    res.render('login');
}

exports.Home = (req, res) => {
	if(req.session.loggedIn == true){
		res.render('home');
	}else{
		res.redirect('/');
	}
}

exports.Historico = (req, res) => {
	if(req.session.loggedIn = true){
		connection.query('SELECT * FROM temperature WHERE CAST(date_temp AS DATE) = "'+req.body.datapesquisa+'" union select * from humidity where CAST(data_umidade AS DATE) = "'+req.body.datapesquisa+'" union select * from moisture_humidity where CAST(data_umidade_solo AS DATE) = "'+req.body.datapesquisa+'" ', (err, rows, fields) =>{
			if (err) throw err;
			for(let i=-0; i<rows.length; i++){
				console.log('teste : ', rows[i]);
			}
			res.render('historico', {hist: rows});
		});
	}else{
		res.redirect('/');
	}
}

exports.Doencas = (req, res) => {
	if(req.session.loggedIn == true){
		res.render('doencas');
	}else{
		res.redirect('/');
	}
	
}



