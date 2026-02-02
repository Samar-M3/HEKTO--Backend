const fs=require("fs")
const filepath="./uploads/test.txt"

const deleteImage=(path)=>{
    fs.unlink(path,(err)=>{
    if(err){
        console.log('error deleting file',err);
    }   
    else{
        console.log('file deleted successfully!');
    }
}) 
}

module.exports=deleteImage