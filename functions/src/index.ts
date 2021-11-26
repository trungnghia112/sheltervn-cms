import * as functions from 'firebase-functions';
import * as express from 'express';
import * as cors from 'cors';

import { router as routerWordpress } from './wordpress';

const app: any = express();
const main: any = express();

app.use(cors({origin: '*', credentials: true}));
main.use(cors({origin: '*', credentials: true}));
main.use('/api/v1', app);
app.use(express.json());
app.use(express.urlencoded()); // Parse URL-encoded bodies

app.use('/wpapi', routerWordpress);


// @ts-ignore:disable-next-line
export const webApi = functions.runWith({memory: '4GB'}).https.onRequest(main);
