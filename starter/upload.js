const http = require('http');
const formidable = require('formidable');
const path=require ('path');
fs = require("fs"),
PNG = require('pngjs').PNG;

// const { grayScale } = require('./IOhandler');



 
const server = http.createServer((req, res) => {
  if (req.url === '/api/upload' && req.method.toLowerCase() === 'post') {
    // parse a file upload
    const form = formidable({ multiples: true, keepExtensions: true, uploadDir: path.join(__dirname, 'uploads')});
 
    form.parse(req, (err, fields, files) => {
      res.writeHead(200, { 'content-type': 'application/json' });
      res.write(`
      <h1> This is the result, It worked!</h1>
      `)
      //res.end(JSON.stringify({ fields, files }, null, 2));//
    });
 
    return;
  }
 
  // show a file upload form
  res.writeHead(200, { 'content-type': 'text/html' });
  
   // res.end("./page1.html"); //how to connect html to this page?
  res.end(`
    <h2>With Node.js <code>"http"</code> module</h2>
    <form action="/api/upload" enctype="multipart/form-data" method="post">
      <div>File: <input type="file" name="multipleFiles" multiple="multiple" /></div>
      <input type="submit" value="Upload" />
    </form>
  `);
});
 
 server.listen(8080, () => {
   console.log('Server listening on http://localhost:8080/ ...');
 });



//grayscale the pictures in uploads folder//

const grayScale = (pathIn, pathOut) => {  
  fs.createReadStream("/Users/kailinwei/Documents/FSWD /milestone2/starter/uploads/upload_21c06722d1408190ebe8b7e561cdaa8e.png")
  .pipe(
    new PNG({
      filterType: 4,
    })
  )
  .on("parsed", function () {
    for (var y = 0; y < this.height; y++) {
      for (var x = 0; x < this.width; x++) {
        var idx = (this.width * y + x) << 2;
 
        // invert color
        this.data[idx] = 255 - this.data[idx];
        this.data[idx + 1] = 255 - this.data[idx + 1];
        this.data[idx + 2] = 255 - this.data[idx + 2];
        
        
      }
    }
 
    this.pack().pipe(fs.createWriteStream("out1.png"));
  });

};

grayScale();

