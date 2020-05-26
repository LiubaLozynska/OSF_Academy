const http = require("http");
const fs = require("fs");
const PORT = process.env.PORT || 3000;

http.createServer(function(request, response){
      
    console.log(`Requested URL: ${request.url}`);
 
    const filePath = request.url.substr(1);
    fs.access(filePath, fs.constants.R_OK, err => {
        if(err){
            response.statusCode = 404;
            response.end("Resourse not found!");
        }
        else{
            fs.createReadStream(filePath).pipe(response);
        }
      });
      
    
}).listen(PORT, function(){
    console.log(`Server started at ${PORT}`);
});