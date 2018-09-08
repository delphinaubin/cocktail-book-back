import * as bodyParser from 'body-parser';
import * as express from 'express';
import * as methodOverride from 'method-override';
import {RegisterRoutes} from './routes';

import './controller/cocktail/CocktailController';
import './controller/ingredient/IngredientController';

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(methodOverride());

RegisterRoutes(app);

app.listen(3001, () => {
  // tslint:disable-next-line:no-console
  console.log('Cocktail app listening on port 3001');
});
