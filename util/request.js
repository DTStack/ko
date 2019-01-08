const  rp = require('request-promise');

const options = {
    uri: '',
    json: true // Automatically stringifies the body to JSON
};
module.exports={
 get:(params,url)=>{
    options.method="get" ;
    options.uri=url;
   return rp(options);
 },
 post:(params,url)=>{
    options.method="post";
    options.body=params;
    options.uri=url;
    return rp(options);
 }
}