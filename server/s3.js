require("dotenv").config();
const S3 = require("aws-sdk/clients/s3");

const fs = require("fs");


const bucketName = process.env.AWS_BUCKET_NAME
const region = process.env.AWS_BUCKET_REGION
const accessKeyId = process.env.AWS_ACCESS_KEY
const secretAccessKey = process.env.AWS_SECRET_KEY
const s3 = new S3({
    region,
    accessKeyId,
    secretAccessKey,
    
});

function uploadFile(file) {
    console.log("FILE", file.filename)
    const fileStream = fs.createReadStream(file.path);
    console.log("FILE", file.filename)

    const uploadParams = {
        Bucket: bucketName,
        Body: fileStream,
        Key: file.filename,
    }
    return s3.upload(uploadParams).promise();
}

exports.uploadFile = uploadFile;

//uploads to s3



//downloads a file from s3

function getFileStream(fileKey){
    const downloadParams = {
        Key: fileKey,
        Bucket: bucketName,
    }
    return s3.getObject(downloadParams).createReadStream();
}

function deleteFile(fileKey){
    const deleteParams = {
        Key: fileKey,
        Bucket: bucketName,
    }
    return s3.deleteObject(deleteParams).promise();
}

exports.deleteFile = deleteFile;


exports.getFileStream = getFileStream;