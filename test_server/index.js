// On windows use 'start node index.js' to start server in new window

const http = require('http')
const fs = require('fs')
const port = 3000

const testdata = {
}

const requestHandler = (request, response) => {
    console.log(request.url)
    //response.writeHead(200, {'Content-Type': 'text/html'});
    if(testdata[request.url]!=null){
      response.end(testdata[request.url]);
    } else{
      const pathname = request.url=='/'? '../build/index.html': '../build'+request.url
      fs.readFile(pathname, function(err, data){
            if(err){
              response.statusCode = 500;
              response.end(`Error getting the file: ${err}.`);
            } else {
              //console.log(data)
              response.end(data);
            }
      });
    }
}
const server = http.createServer(requestHandler)
server.listen(port, (err) => {
    if (err) {
        return console.log('something bad happened', err)
    }
    console.log(`server is listening on ${port}`)
})
