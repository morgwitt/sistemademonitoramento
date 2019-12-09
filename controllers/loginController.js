const db = require('../database');


exports.MostraLogin = (req, res) => {
	res.render('login');
}

exports.Deslogar = (req, res) => {
    req.session.destroy();
    res.redirect('/');
}

exports.FazLogin = (req, res) => {
	
	const email = req.body.email;
    const pass = req.body.pass;

    let query = `SELECT * FROM login 
        WHERE user = '${email}' AND pass = '${pass}'`;
    
    db.execute(query).then(result => {
    	console.log(result[0]);
    	if (result[0].length > 0){
    		req.session.user = result[0][0];
            req.session.loggedIn = true;
            if (result[0][0].isAdmin){
            	req.session.isAdmin = true;
                res.redirect('/admin/adm');
            }else{
            	res.redirect('/home');
            }
    	}else{
    		res.render('login');
    	}
    }).catch(erro => {
        console.log(erro);
        res.write(JSON.stringify(erro));
        res.end();
    });
}