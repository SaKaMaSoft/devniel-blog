/** FACEBOOOK */
var ACCESS_TOKEN = 'EAAUqdeJkPN4BAJI09GQzLcVKAIHZCV85VmZCewOKdErt4xHdSAShKqQqMbxiImPDGX4TyisceeDDvBFoEixDkaB6P9252xRCYQGmVTmYUCmtPUWzphpPqwjRSAkQdJxNHnWLNTb7BPAFTPjvfoc8hv0kMZAkqLHAGVbkHE4PQZDZD';


class Facebook {

    static connect(req, res){

        // https://bb23e8d7.ngrok.io/?hub.mode=subscribe&hub.verify_token=12345678&hub.challenge=1231241234345345446546456546

        //res.status(200).send(req.query['hub.challenge']);
        
        if (req.query['hub.mode'] === 'subscribe' &&
            req.query['hub.verify_token'] === "12345678") {
            console.log("Validating webhook");
            res.status(200).send(req.query['hub.challenge']);
        } else {
            console.error("Failed validation. Make sure the validation tokens match.");
            res.sendStatus(403);          
        }  

    }

    static onMessage(req, res){

        console.log(JSON.stringify(req.body));

        res.status(200).end();

        var request = require("request");

        /** PROCESAR CON WATSON */
        /** ---> CAPTURAR RESPUESTA DE WATSON */
        /** ------> ENVIAR RESPUESTA DE WATSON A FACEBOOK */
        
        request({
            url:  "https://graph.facebook.com/v2.6/me/messages?access_token=" + ACCESS_TOKEN,
            json : true,
            body : {
                "recipient": {
                    "id": req.body.entry[0].messaging[0].sender.id
                },
                "message": {
                    "text": "hello, world!"
                }
            },
            timeout : 60000,
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            }
        }, function(error, response, body) {

            if(error){
                console.error(error);
                return;
            }

            console.log("MENSAJE DE RESPUESTA ENVIADO");
            return;

        });
  
    }
}

module.exports = Facebook;