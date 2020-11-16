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

  const unzip = (pathIn, pathOut) => { 
    try{
        fs.createReadStream("myfile.zip")
       .pipe(unzipper.Extract({ path:"uzipper" }))
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





/*
 
const readDir=dir=>{                             // I tried the promise version of readDir, but this gave me the files from _MACOX, so I commented this out
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
    
 */   
   const readDir = (dir) => {                     // I tried the callback version of the readDir funciton
   fs.readdir("unzipped", (err,files)=>{        
    if (err){
       return console.log(err);
    }
      let list=[];                              //create a list so the .png names can be pushed into this later
        files.forEach((file)=>{                //for each loop will loop through the file directory
            if(path.extname(file)===".png"){   //this will only print out the file with .png end. 
              list.push(file);                 //this will push the .png to a list   
            }    
        });
       console.log (list);  
            return list;
}); 
   };

readDir(dir);

/**
 * Description: Read in png file by given pathIn, 
 * convert to grayscale and write to given pathOut
 * 
 * @param {string} filePath 
 * @param {string} pathProcessed 
 * @return {promise}
 */

//const grayScale = (pathIn, pathOut) => {}//

const grayScale = (pathIn, pathOut) => {            //I use the PNGJS library to parse the pathIn image
  fs.createReadStream(pathIn)                      //need to use the readstream because need to move the photo files in pieces, this fs.readstream will read the whole file into buffer. Stream can process data as soon as it arrives
  .pipe(                                            //to avoid backpressure, pipe is used. It can  temporarily pause readstream when readstream speed is faster than creatstream
    new PNG({
      filterType: 4,                                //RGB belongs to filtertype 4
    })
  )
  .on("parsed", function () {
 
        // inverting color

        for (var i=0; i<=this.data.length;i+=4){        // this loop will go through the image and turn it into grayscaled
          const avg=(this.data[i] + this.data[i+1] + this.data[i+2])/3 //this equation is based on the simple function for grayscale Gray=(R+G+B)/3
          this.data[i]=avg                              //this.data is an important variable in this function, but I don't what does it represent 
          this.data[i+1]=avg
          this.data[i=2]=avg
     
        }
        
  
    this.pack().pipe(fs.createWriteStream(pathOut)); // after turning images into grayscale, need to pass out the images via creatstream function. the destinatin of the file should be under the "grayscaled directory"
  });

}; 
grayScale ('this/is/my/path.png', 'this/is/path/out.png')

module.exports = {                         
  unzip,
  readDir,
  grayScale
};
