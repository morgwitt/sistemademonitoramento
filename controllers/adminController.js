const db = require('../database');
const connection = db;

const fileUpload = require('express-fileupload');


exports.MostraAdm = (req, res) => {
	if(req.session.isAdmin){
		let users = connection.query('Select * from login', (err, rows, fields) => {
			if (err) throw err;
			for(let i=-0; i<rows.length; i++){
				console.log('teste : ', rows[i]);
			}
			res.render('adm', {users: rows});
		});
	}else{
		res.redirect('/');
	}
}

exports.MostraAddUser = (req, res) => {
	if(req.session.isAdmin){
		res.render('adicionarUser');
	}else{
		res.redirect('/');
	}
}

exports.AddUser = (req, res) => {
	if(req.session.isAdmin){

		const imagem = req.body.imageUrl;
		const user = req.body.user;
		const pass = req.body.pass;
		const isAdmin = req.body.isAdmin;

		connection.query('insert into login (user, pass, isAdmin, imagem) values ("'+user+'", "'+pass+'", "'+isAdmin+'","'+imagem+'") ');
		res.redirect('/admin/adm');
	}else{
		res.redirect('/');
	}
}

exports.MostraRemoverUser = (req, res) => {
	if(req.session.isAdmin){
		res.render('removerUser');
	}else{
		res.redirect('/');
	}
}

exports.RemoverUser = (req, res) => {
	if(req.session.isAdmin){
		connection.query('DELETE FROM login WHERE user = "'+req.body.rmuser+'" ', (err, rows, fields) =>{
			if (err) throw err;
			res.redirect('/admin/adm');
		});
		
	}else{
		res.redirect('/');
	}
}