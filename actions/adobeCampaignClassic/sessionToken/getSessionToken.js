/*
 * <license header>
 */

/**
 * This is a sample action showcasing how to access an external API
 */

const { Core } = require("@adobe/aio-sdk");
const {
  errorResponse,
  getBearerToken,
  stringParameters,
  checkMissingRequestInputs,
} = require("../../utils");
const request = require("request");
const parseString = require("xml2js").parseString;
// const parser = require("xml2json");

// main function that will be executed by Adobe I/O Runtime

async function main(params) {
  // create a Logger
  const logger = Core.Logger("main", { level: params.LOG_LEVEL || "info" });

  try {
    logger.info("Calling the main action"); // 'info' is the default level if not set
    logger.debug(stringParameters(params)); // log parameters, only if params.LOG_LEVEL === 'debug'
    // check for missing request input parameters and headers
    const requiredParams = ["accIntanceURL"];
    const errorMessage = checkMissingRequestInputs(params, requiredParams, [
      "Authorization",
    ]);
    if (errorMessage) {
      return errorResponse(400, errorMessage, logger); // return and log client errors
    }
    const token = getBearerToken(params);
    let buff = new Buffer(token, "base64");
    // let sessionToken = buff.toString("ascii").replace(/:/gi, "/");
    let [username, password] = buff.toString("ascii").split(":");

    console.log(`${username},${password}`);

    var url = `https://${params.accIntanceURL}/nl/jsp/soaprouter.jsp`;

    var contents = `<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:urn="urn:xtk:session">
    <soapenv:Header/>
    <soapenv:Body>
        <urn:Logon>
        	<urn:sessiontoken></urn:sessiontoken>
            <urn:strLogin>${username}</urn:strLogin>
            <urn:strPassword>${password}</urn:strPassword>
            <urn:elemParameters></urn:elemParameters>
        </urn:Logon>
    </soapenv:Body>
</soapenv:Envelope>`;

    return new Promise(function (resolve, reject) {
      try {
        var options = {
          method: "POST",
          headers: {
            "Content-Type": ["text/xml;charset=UTF-8", "application/xml"],
            SOAPAction: '"xtk:session#Logon"',
          },
          url: url,
          body: contents,
        };
        request(options, function (error, response, body) {
          if (error) reject(error);
          else {
            // console.log(`Body = ${body}`);
            // var json = parser.toJson(body);
            parseString(body, function (err, result) {
              // console.dir(result);

              let sessionResponse = {
                sessionToken:
                  result["SOAP-ENV:Envelope"]["SOAP-ENV:Body"][0][
                    "LogonResponse"
                  ][0]["pstrSessionToken"][0]["_"],
              };

              console.log(JSON.stringify(sessionResponse));
              const response = {
                statusCode: 200,
                body: sessionResponse,
              };

              // console.log(JSON.stringify(json));
              resolve(response);
            });
            // var json = JSON.parse(parser.toJson(body, { reversible: true }));
          }
        });
      } catch (e) {
        reject(e);
      }
    });
  } catch (error) {
    // log any server errors
    logger.error(error);
    // return with 500
    return errorResponse(500, "server error", logger);
  }
}

exports.main = main;
