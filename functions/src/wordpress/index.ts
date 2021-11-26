import * as express from 'express';
import { wpAPIGet, wpAPICf7 } from './wpapi';

export const router = express.Router();

// middleware that is specific to this router
router.use(function timeLog(req: any, res: any, next: () => void) {
  // console.log('Time: ', Date.now());
  next();
});
// define the home page route
router.get('/', function (req: any, res: any) {
  res.send('news home page');
});
// define the about route
router.post('/cf7', wpAPICf7);
router.get('/get', wpAPIGet);
