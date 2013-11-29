var Db = require('mongodb').Db;
var Server = require('mongodb').Server;

var dPort=27017;
var dHost= "localhost";
var dName= "Users";

var Usuar={};

Usuar.db = new Db(dName, new Server(dHost, dPort, {auto_reconnect: true},{}));
Usuar.db.open(function(e,d){

	if(e){
		console.log(e)
	}else{
		console.log("conectado a la B D: "+dName);
	}

});
Usuar.clientes = Usuar.db.collection('clientes');

module.exports = Usuar;

Usuar.new = function(newData,callback){
	Usuar.clientes.findOne({id: newData.id}, function(e,obj){
	if(obj){
	callback('Usuario ya registrado');
	}else{
	Usuar.clientes.insert(newData, callback(null))
	  }
	})
}
Usuar.list= function(callback){
	Usuar.clientes.find().toArray(function(e,res){
	if(e){
	callback(e)
	}else{
	callback(null, res)
	}
	})
}

Usuar.edit = function(newData, callback){
	Usuar.clientes.findOne({id: newData.id}, function(e,o){
		o.name = newData.name;
		o.telefono = newData.telefono;
		o.direccion = newData.direccion;
		Usuar.clientes.save(o);
		callback(o);
	})
}

Usuar.delete = function(id, callback){
	Usuar.clientes.findOne({id: id}, function(e,o){
		Usuar.clientes.remove(o ,callback)
	})
}
