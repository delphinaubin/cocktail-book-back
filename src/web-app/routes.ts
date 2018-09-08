/* tslint:disable */
import { Controller, ValidateParam, FieldErrors, ValidateError, TsoaRoute } from 'tsoa';
import { CocktailController } from './controller/cocktail/CocktailController';
import { IngredientController } from './controller/ingredient/IngredientController';

const models: TsoaRoute.Models = {
    "CocktailDto": {
        "properties": {
            "name": { "dataType": "string", "required": true },
        },
    },
    "IngredientDto": {
        "properties": {
            "name": { "dataType": "string", "required": true },
            "unit": { "dataType": "string", "required": true },
            "color": { "dataType": "string", "required": true },
        },
    },
};

export function RegisterRoutes(app: any) {
    app.get('/cocktails',
        function(request: any, response: any, next: any) {
            const args = {
            };

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request);
            } catch (err) {
                return next(err);
            }

            const controller = new CocktailController();


            const promise = controller.getCocktail.apply(controller, validatedArgs);
            promiseHandler(controller, promise, response, next);
        });
    app.post('/cocktails',
        function(request: any, response: any, next: any) {
            const args = {
                cocktail: { "in": "body", "name": "cocktail", "required": true, "ref": "CocktailDto" },
            };

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request);
            } catch (err) {
                return next(err);
            }

            const controller = new CocktailController();


            const promise = controller.addCocktail.apply(controller, validatedArgs);
            promiseHandler(controller, promise, response, next);
        });
    app.get('/ingredients',
        function(request: any, response: any, next: any) {
            const args = {
            };

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request);
            } catch (err) {
                return next(err);
            }

            const controller = new IngredientController();


            const promise = controller.getAllIngredients.apply(controller, validatedArgs);
            promiseHandler(controller, promise, response, next);
        });
    app.post('/ingredients',
        function(request: any, response: any, next: any) {
            const args = {
                ingredient: { "in": "body", "name": "ingredient", "required": true, "ref": "IngredientDto" },
            };

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request);
            } catch (err) {
                return next(err);
            }

            const controller = new IngredientController();


            const promise = controller.addIngredient.apply(controller, validatedArgs);
            promiseHandler(controller, promise, response, next);
        });


    function isController(object: any): object is Controller {
        return 'getHeaders' in object && 'getStatus' in object && 'setStatus' in object;
    }

    function promiseHandler(controllerObj: any, promise: any, response: any, next: any) {
        return Promise.resolve(promise)
            .then((data: any) => {
                let statusCode;
                if (isController(controllerObj)) {
                    const headers = controllerObj.getHeaders();
                    Object.keys(headers).forEach((name: string) => {
                        response.set(name, headers[name]);
                    });

                    statusCode = controllerObj.getStatus();
                }

                if (data || data === false) { // === false allows boolean result
                    response.status(statusCode || 200).json(data);
                } else {
                    response.status(statusCode || 204).end();
                }
            })
            .catch((error: any) => next(error));
    }

    function getValidatedArgs(args: any, request: any): any[] {
        const fieldErrors: FieldErrors = {};
        const values = Object.keys(args).map((key) => {
            const name = args[key].name;
            switch (args[key].in) {
                case 'request':
                    return request;
                case 'query':
                    return ValidateParam(args[key], request.query[name], models, name, fieldErrors);
                case 'path':
                    return ValidateParam(args[key], request.params[name], models, name, fieldErrors);
                case 'header':
                    return ValidateParam(args[key], request.header(name), models, name, fieldErrors);
                case 'body':
                    return ValidateParam(args[key], request.body, models, name, fieldErrors, name + '.');
                case 'body-prop':
                    return ValidateParam(args[key], request.body[name], models, name, fieldErrors, 'body.');
            }
        });
        if (Object.keys(fieldErrors).length > 0) {
            throw new ValidateError(fieldErrors, '');
        }
        return values;
    }
}
