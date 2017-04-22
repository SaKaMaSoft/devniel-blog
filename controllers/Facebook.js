/** FACEBOOOK */
var ACCESS_TOKEN = 'EAAUqdeJkPN4BAJI09GQzLcVKAIHZCV85VmZCewOKdErt4xHdSAShKqQqMbxiImPDGX4TyisceeDDvBFoEixDkaB6P9252xRCYQGmVTmYUCmtPUWzphpPqwjRSAkQdJxNHnWLNTb7BPAFTPjvfoc8hv0kMZAkqLHAGVbkHE4PQZDZD';

var FACEBOOK_APP_ID = '1316060328447097';
var FACEBOOK_APP_SECRET = 'ef290cd1b8de93885fe78faa8fe26c4d';

var CONVERSATION = {
    conversation_id : null,
    system : null
};

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

        /** CONECTAR CON WATSON */

        var ConversationV1 = require('watson-developer-cloud/conversation/v1');

        var conversation = new ConversationV1({
            username: '72571603-d7e3-4344-ada6-a7d149a47ec1',
            password: 'VkoBnR0ATb32',
            version_date: ConversationV1.VERSION_DATE_2017_02_03
        });

        var data = {
            input: { 
                text: req.body.entry[0].messaging[0].message.text 
            },
            workspace_id: 'a770cf43-80f1-45c0-8681-fc4f22e90c2c'
        };

        if(CONVERSATION.conversation_id){
            
            data = {
                input: { 
                    text: req.body.entry[0].messaging[0].message.text 
                },
                context : {
                    conversation_id : CONVERSATION.conversation_id,
                    system : CONVERSATION.system
                },
                workspace_id: 'a770cf43-80f1-45c0-8681-fc4f22e90c2c'
            };
            
        }

        conversation.message(data, function(err, response) {

            if (err) {
                console.error(err);
                return;
            } 

           console.log("MENSAJE DE RESPUESTA DE WATSON", response);

            CONVERSATION.conversation_id = response.context.conversation_id;
            CONVERSATION.system = response.context.system;
            CONVERSATION.context = response.context;

            if(response.context.action){
                switch(response.context.action){
                    case 'ENVIAR_IMAGEN':

                        /**

                        curl -X POST -H "Content-Type: application/json" -d '{
                            "recipient":{
                                "id":"USER_ID"
                            },
                            "message":{
                                
                            }
                        }' "https://graph.facebook.com/v2.6/me/messages?access_token=PAGE_ACCESS_TOKEN"    

                         */

                        request({
                            url:  "https://graph.facebook.com/v2.6/me/messages?access_token=" + ACCESS_TOKEN,
                            json : true,
                            body : {
                                "recipient": {
                                    "id": req.body.entry[0].messaging[0].sender.id
                                },
                                "message": {
                                    "attachment":{
                                        "type":"image",
                                        "payload":{
                                            "url":"http://cde.3.elcomercio.pe/ima/0/1/6/6/7/1667246/base_image.jpg"
                                        }
                                    }
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

                            console.log("MENSAJE DE RESPUESTA ENVIADO", body);

                            var context = CONVERSATION.context;
                            context.moises = 'EXPLOTAR';
                            context.sergio = 'MANDARINO';

                            conversation.message({
                                input: { 
                                    text: '[[[[/MESSAGE_FROM_ENGINE/]]]'
                                },
                                context : context,
                                workspace_id: 'a770cf43-80f1-45c0-8681-fc4f22e90c2c'
                            }, function(err, response) {

                                request({
                                    url:  "https://graph.facebook.com/v2.6/me/messages?access_token=" + ACCESS_TOKEN,
                                    json : true,
                                    body : {
                                        "recipient": {
                                            "id": req.body.entry[0].messaging[0].sender.id
                                        },
                                        "message": {
                                            "text": response.output.text.join(" ")
                                        }
                                    },
                                    timeout : 60000,
                                    method: 'POST',
                                    headers: {
                                        "Content-Type": "application/json"
                                    }
                                }, function(error, response, body) {

                                });

                            });

                            return;

                        });

                        return;
                        break;
                    default:
                }
            }

            // Response --> 
            // - ouput --> 'Ok, se ...',
            // - intents --> [{ 'modelo-reemplazo' : 0.98845545}]
            // - context --> {
            //     'action' : 'CREAR_TICKET'
            // }

            request({
                url:  "https://graph.facebook.com/v2.6/me/messages?access_token=" + ACCESS_TOKEN,
                json : true,
                body : {
                    "recipient": {
                        "id": req.body.entry[0].messaging[0].sender.id
                    },
                    "message": {
                        "text": response.output.text.join(" ")
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

                console.log("MENSAJE DE RESPUESTA ENVIADO", body);
                return;

            });

        });

        
  
    }
}

module.exports = Facebook;