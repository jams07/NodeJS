var express= require('express');
var app= express();
var usu = require('./DB/funcionesDB');

app.configure(function(){
  app.use(express.bodyParser());
});

app.get('/',function(req, res){
	usu.list(function(e,subs){
		res.render('list.jade',{title:'Lista de Usuarios', funcionesDB: subs});
	})
});

app.get('/newCustomer', function(req, res){
	res.render('formulario.jade');
})

app.post('/newCustomer', function(req, res){
	usu.new({name: req.param('names'),
		id: req.param('id'), 
		telefono: req.param('telefono'), 
		direccion: req.param('direccion')}, 
		function(e){
			res.redirect('/');
		}
	)
})

app.post('/deleteCustomer', function(req, res){
	usu.delete(req.body.id, 
		function(e,obj){
			res.redirect('/');			
		}
	)
})

app.post('/loadCustomer', function(req, res){
	usu.clientes.findOne({id: req.body.id}, function(e,o){
		res.render('formulario2.jade',{title:'Editar Usuario', funcionesDB: o});
	})
})

app.post('/saveCustomer', function(req, res){
	usu.edit({name: req.param('names'),
		id: req.param('id'), 
		telefono: req.param('telefono'), 
		direccion: req.param('direccion')},
		function(e,obj){
			res.redirect('/');			
		}
	)
})

app.listen(8887);
console.log('Hello world Express app initiated');
