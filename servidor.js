var http = require("http");
var fs = require("fs");
var url = require("url");

http.createServer(function(req, res){
	var d = url.parse(req.url, true);
	console.log(d);
	var cad = d.search;
	var flag = false;
	var hora = "";
	for(i in cad){
		if(cad[i] == ".")
			break;
		if(flag == true)
			hora = hora + cad[i];
		if(cad[i] == "T")
			flag = true;
	}
	var v = hora.split(":");
	var obj = {
		hora : v[0],
		minuto : v[1],
		segundo : v[2]
	}
	console.log(obj.hora);
	console.log(obj.minuto);
	console.log(obj.segundo);
	fs.writeFile("labo.json", JSON.stringify(obj).replace(/(\:")/g, ":").replace(/(\",)/g, ", ").replace(/(\"})/g,"}"), function(err){
		if(err) throw err;
		fs.readFile("labo.json", function(err1, data){
			if(err1) throw err1;
			res.writeHead(200, {"Content-Type" : "application/json"});
			res.write(data);
			res.end();
		})
	})
}).listen(8000);

console.log("hola");