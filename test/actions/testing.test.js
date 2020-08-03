function getS3FileName(params) {
  console.log(
    JSON.parse(JSON.parse(params["__ow_body"])["Message"])["Records"][0]["s3"][
      "object"
    ]["key"]
  );
}

// const parser = require("xml2json");

// main function that will be executed by Adobe I/O Runtime

// function main(params) {
let sample = {
  __ow_body:
    '{\n  "Type" : "Notification",\n  "MessageId" : "77055a93-f15a-58f7-8832-0db07e622ef8",\n  "TopicArn" : "arn:aws:sns:us-west-2:820656603837:engage-etl-inbound",\n  "Subject" : "Amazon S3 Notification",\n  "Message" : "{\\"Records\\":[{\\"eventVersion\\":\\"2.1\\",\\"eventSource\\":\\"aws:s3\\",\\"awsRegion\\":\\"us-west-2\\",\\"eventTime\\":\\"2020-04-29T14:19:30.745Z\\",\\"eventName\\":\\"ObjectCreated:Put\\",\\"userIdentity\\":{\\"principalId\\":\\"AWS:AIDA36EXSAK6XY42X54DD\\"},\\"requestParameters\\":{\\"sourceIPAddress\\":\\"192.150.10.214\\"},\\"responseElements\\":{\\"x-amz-request-id\\":\\"108D7918CA6F6235\\",\\"x-amz-id-2\\":\\"f9cO6K5yI0nthQRM+BlDLTpFl+/MN38ZVPB1ml0/3d2YKxIYB/yrlklV5Lf4fz4oRYzGIoL1xJDrLH4BMkbSHEXl4e3vR9xA\\"},\\"s3\\":{\\"s3SchemaVersion\\":\\"1.0\\",\\"configurationId\\":\\"engage-etl-in-notify\\",\\"bucket\\":{\\"name\\":\\"engage-etl\\",\\"ownerIdentity\\":{\\"principalId\\":\\"A13A7363WN64T7\\"},\\"arn\\":\\"arn:aws:s3:::engage-etl\\"},\\"object\\":{\\"key\\":\\"inbound/email_contact_coded.csv\\",\\"size\\":2143,\\"eTag\\":\\"e17e826fc64a40146edf6bb2b2d529b6\\",\\"sequencer\\":\\"005EA98CF73457AAE5\\"}}}]}",\n  "Timestamp" : "2020-04-29T14:19:36.476Z",\n  "SignatureVersion" : "1",\n  "Signature" : "SxD9v7QMs7DOyQxB9Vny7Y50kytRXwgsszpTCeAoBzBqXwdtl72k+/ZHkxz+veHfSYUjnGioAJw3HKK7ci5zrRoTGuelhxMwXMDfWSJGPSuD/vw3JPUR2e8ZFF80xyoBaFiwLLmz8ApW352ZIrawsr/11DczjEjGLty1H0wI2SGan4SO6DcJwjm5hz5GkZwwI1nIhwBulHqRry8MGyH7iM7D0DCEw54QwrBEfaZHaMlDp3y+sOeTjU2pUzrx0JTuVo1/90UihyUcGQxfjRspYCAGgM9+ljrHbVSzaGpAhsLj85ztQ0b0SWZSDnV79WcdC4r6sjQYewsUV7y4abp/MA==",\n  "SigningCertURL" : "https://sns.us-west-2.amazonaws.com/SimpleNotificationService-a86cb10b4e1f29c941702d737128f7b6.pem",\n  "UnsubscribeURL" : "https://sns.us-west-2.amazonaws.com/?Action=Unsubscribe&SubscriptionArn=arn:aws:sns:us-west-2:820656603837:engage-etl-inbound:aa0b436b-1645-47ce-a2d6-01ea95f87cc2"\n}',
  __ow_headers: {
    "accept-encoding": "gzip, deflate",
    connection: "close",
    "content-type": "text/plain; charset=UTF-8",
    host: "controller-a",
    "perf-br-req-in": "1588169977.277",
    "user-agent": "Amazon Simple Notification Service Agent",
    "x-amz-sns-message-id": "77055a93-f15a-58f7-8832-0db07e622ef8",
    "x-amz-sns-message-type": "Notification",
    "x-amz-sns-subscription-arn":
      "arn:aws:sns:us-west-2:820656603837:engage-etl-inbound:aa0b436b-1645-47ce-a2d6-01ea95f87cc2",
    "x-amz-sns-topic-arn":
      "arn:aws:sns:us-west-2:820656603837:engage-etl-inbound",
    "x-forwarded-for": "54.240.230.241, 10.250.204.30",
    "x-forwarded-host": "runtime.adobe.io",
    "x-forwarded-port": "443",
    "x-forwarded-proto": "https",
    "x-real-ip": "10.250.204.30",
    "x-request-id": "310wDWwYgg9bPcK6h6oe92dtharI0Q0h",
  },
  __ow_method: "post",
  __ow_path: "",
};

getS3FileName(sample);
// }

exports.main = main;
