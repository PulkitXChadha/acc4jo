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

// const parser = require("xml2json");

// main function that will be executed by Adobe I/O Runtime

async function main(params) {
  // create a Logger
  const logger = Core.Logger("main", { level: params.LOG_LEVEL || "info" });

  try {
    logger.info("Calling the main action"); // 'info' is the default level if not set
    logger.debug(stringParameters(params)); // log parameters, only if params.LOG_LEVEL === 'debug'
    // check for missing request input parameters and headers
    const requiredParams = ["email", "eventType"];
    const errorMessage = checkMissingRequestInputs(params, requiredParams, [
      "Authorization",
    ]);
    if (errorMessage) {
      return errorResponse(400, errorMessage, logger); // return and log client errors
    }

    // extract the user Bearer token from the input request parameters
    let buff = new Buffer(getBearerToken(params), "base64");
    const sessionToken = buff.toString("ascii").replace(":", "/");

    logger.info(`sessionToken = ${sessionToken}`);

    var url = `https://${params.accIntanceURL}/nl/jsp/soaprouter.jsp`;

    params.externalId = params.externalId || "";

    let ctxxml = "";
    Object.keys(params.ctx).map((attr) => {
      ctxxml += `<${attr}>${params.ctx[attr]}</${attr}>\n`;
    });

    var content = `<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:urn="urn:nms:rtEvent">
   <soapenv:Header/>
   <soapenv:Body>
      <urn:PushEvent>
         <urn:sessiontoken>${sessionToken}</urn:sessiontoken>
         <urn:domEvent>
            <rtEvent type="${params.eventType}" email="${params.email}" externalId="${params.externalId}">
                <ctx>
                ${ctxxml}
                </ctx>
            </rtEvent>
         </urn:domEvent>
      </urn:PushEvent>
   </soapenv:Body>
</soapenv:Envelope>`;

    logger.info(`content = ${content}`);

    return new Promise(function (resolve, reject) {
      try {
        var options = {
          method: "POST",
          headers: {
            "Content-Type": ["text/xml;charset=UTF-8", "text/plain"],
            SOAPAction: '"nms:rtEvent#PushEvent"',
          },
          url: url,
          body: content,
        };

        request(options, function (error, response, body) {
          if (error) reject(error);
          else {
            // var json = JSON.parse(parser.toJson(body, { reversible: true }));
            const response = {
              statusCode: 200,
              body: body,
            };
            // console.log(JSON.stringify(json));
            resolve(response);
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
