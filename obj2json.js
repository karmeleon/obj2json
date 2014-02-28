//node.js
if(process.argv.length < 3) {
	console.log("usage: obj2json.js [input.obj]");
	process.exit(1);
}
var inputfile = process.argv[2];
var fs = require('fs');
fs.readFile(__dirname + '/' + inputfile, function(err, data) {
	if(err)
		console.log(err);
	var input = data.toString();

	var lines = input.split(/\r\n|\r|\n/g);
	var out = {};
	out.vertexPositions = [];
	out.vertexNormals = [];
	out.vertexTextureCoords = [];
	out.indices = [];
	lines.forEach(function(line) {
		var linePieces = line.split(" ");
		if(linePieces[0] == "v") {
			//this is a vertex entry. we'll ignore the w coord
			for(var i = 1; i < 4; i++) {
				var num = parseFloat(linePieces[i]);
				num /= 20;
				out.vertexPositions.push(num);
			}
		}
		else if(linePieces[0] == "vn") {
			//this is a normals entry
			for(var i = 1; i < 4; i++)
				out.vertexNormals.push(parseFloat(linePieces[i]));
		}
		else if(linePieces[0] == "vt") {
			//this is a texture coordinate entry, again ignoring w coord
			for(var i = 1; i < 3; i++)
				out.vertexTextureCoords.push(parseFloat(linePieces[i]));
		}
		else if(linePieces[0] == "f") {
			//this is a face entry. indices in the file start at 0, so we need to subtract 1. additionally, we only care about the first entry in each group of slashes. parseint does this automagically
			for(var i = 1; i < 4; i++) {
				var derp = linePieces[i].split("/")[0];
				out.indices.push(parseInt(derp) - 1);
			}
		}
	});
	console.log("found " + out.vertexPositions.length / 3 + " vertices, " + out.vertexNormals.length / 3 + " normals, " + out.vertexTextureCoords.length / 2 + " texture coords, and " + out.indices.length / 3 + " indexed triangles.");
	fs.writeFile(__dirname + "/" + inputfile + ".json", JSON.stringify(out, null, 4), function(err) {
		if(err)
			console.log(err);
	});
});
