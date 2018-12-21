import 'dotenv/config';  // environment variables
import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';

import { db } from './config';
import { users } from './routes';

const app = express();

app.use(bodyParser.json());  // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true }));  // for parsing application/x-www-form-urlencoded
app.use(cors());  // enable CORS (Cross-Origin Resource Sharing)
app.use(helmet());  // secure HTTP headers
app.use(morgan('short'));

/* 
  TEST MYSQL CONNECTION
  NOTE: we can also use pool.query(<sql>, function(error, rows)) to auto aquire 
  connection and release it after execution
*/
db.getConnection((error, connection) => {
  if (error) throw error;
  console.log('Connection to MySQL established (ID: ' + connection.threadId + ')');
  connection.release();
});

app.get('/api', (req, res) => {
  res.send('WELCOME TO THE API\n');
});

// API routes
app.use('/api/users', users);

const port = process.env.NODE_ENV === 'production' ? 80 : 5000;

app.listen(port, () => {
  console.log('NODE_ENV: ' + process.env.NODE_ENV);
  console.log(`Server listening on port ${port}...`);
});
