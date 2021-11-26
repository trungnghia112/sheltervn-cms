import { db } from '../core';

const cors = require('cors')({origin: true});

export const wpAPICf7 = (request: any, response: any) => {
  cors(request, response, async () => {
    try {
      if (request.body.email) {
        // Push the new message into Firestore using the Firebase Admin SDK.
        const writeResult = await db.collection('messages').add({
          ...request.body,
          timestamp: Date.now()
        });
        // Send back a message that we've successfully written the message
        response.json({result: `Message with ID: ${writeResult.id} added.`});
      } else {
        response.json(null);
      }
    } catch (e) {
      response.send(e);
    }
  });
};

export const wpAPIGet = (request: any, response: any) => {
  cors(request, response, async () => {
    const url = request.query.url;
    response.send(url);
    // try {
    //   const res: any = await axios.get(url);
    //   const data = res.data;
    //   response.send(data);
    // } catch (e) {
    //   response.send(e);
    // }
  });
};
