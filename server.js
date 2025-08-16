import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import routes from './routes/index.js';

const app = express();
const PORT = process.env.PORT || 3000;

//Middleware
app.use(bodyParser.urlencoded({ extended : false }));
app.use(bodyParser.json());
app.use(cors());
app.use(routes);

//Start server
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
