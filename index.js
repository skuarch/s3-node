const express = require('express');
const app = express();
const PORT = 3200;
const AWS = require('aws-sdk');

AWS.config.update({
    accessKeyId: "youraccesskey",
    secretAccessKey: "yoursecretkey"
});

let s3 = new AWS.S3();

async function getImage() {
    const data = s3.getObject({
        Bucket: 'nameofbuket',
        Key:'images/header-background.jpg'
    }).promise();
    return data;
}

function encode(data){ 
    let buf = Buffer.from(data);
    let base64 = buf.toString('base64');
    return base64
}

app.get('/', (req, res) => {

    getImage()
 .then((img)=>{
  let image="<img src='data:image/jpeg;base64," + encode(img.Body) + "'" + "/>";
  let startHTML="<html><body></body>";
  let endHTML="</body></html>";
  let html=startHTML + image + endHTML;
  res.send(html)
  }).catch((e)=>{
        res.send(e)
  })
});

app.listen(PORT, () => {
  console.log('server running');
});
