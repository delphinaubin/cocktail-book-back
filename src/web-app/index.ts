import * as bodyParser from 'body-parser';
import * as express from 'express';
import * as methodOverride from 'method-override';
import * as cors from 'cors';
import * as errorHandler from 'api-error-handler';
import { RegisterRoutes } from './routes';

import './controller/cocktail/CocktailController';
import './controller/ingredient/IngredientController';

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(methodOverride());
app.use(cors());
app.use(errorHandler());
RegisterRoutes(app);

app.listen(3001, () => {
  // tslint:disable-next-line:no-console
  console.log('Cocktail app listening on port 3001');
});
