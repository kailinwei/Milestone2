/*
 * Project: COMP1320 Milestone 1
 * File Name: IOhandler.js
 * Description: Collection of functions for files input/output related operations
 * 
 * Created Date: Nov. 6th, 2020
 * Author: Kailin Wei
 * 
 */

const { dir } = require('console');

const unzipper = require('unzipper'),
  fs = require("fs"),
  PNG = require('pngjs').PNG,
  path = require('path');


/**
 * Description: decompress file from given pathIn, write to given pathOut 
 *  
 * @param {string} pathIn 
 * @param {string} pathOut 
 * @return {promise}
 */
//const unzip = (pathIn, pathOut) => { //
  /*

  this one works !

  const unzip = (pathIn, pathOut) => { 
  fs.createReadStream('myfile.zip')
  .pipe(unzipper.Extract({ path: 'unzipped' }))
  console.log('Extraction Operation Complete');}
  unzip(); */

  const unzip = (pathIn, pathOut) => { 
    try{
        fs.createReadStream('myfile.zip')
       .pipe(unzipper.Extract({ path: 'unzipped' }))
        console.log('Extraction Operation Complete');
    }catch (error){
    console.log(error);
  }
  }
    unzip();
/**
 * Description: read all the png files from given directory and return Promise containing array of each png file path 
 * 
 * @param {string} path 
 * @return {promise}
 */
/*const readDir = dir => {

}; */


 
  const readDir=dir=>{
    return new Promise ((resolve, reject)=>{
        fs.readdir('unzipped', "utf8", (err,files)=>{
        if (err){
            reject(err);
        }else {
            resolve (files);
        }
        
      })
    })
  }
  const filepath = (path.join(__dirname));
  readDir(filepath)
    .then(files=> console.log (files))
    .catch( err => console.log (err))
      



/**
 * Description: Read in png file by given pathIn, 
 * convert to grayscale and write to given pathOut
 * 
 * @param {string} filePath 
 * @param {string} pathProcessed 
 * @return {promise}
 */
//const grayScale = (pathIn, pathOut) => {//
const grayScale = (pathIn, pathOut) => {  
  fs.createReadStream("unzipped")
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
 
    this.pack().pipe(fs.createWriteStream("out.png"));
  });

};



module.exports = {
  unzip,
  readDir,
  grayScale
};