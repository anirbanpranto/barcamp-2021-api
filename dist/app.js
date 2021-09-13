"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const http = __importStar(require("http"));
const winston = __importStar(require("winston"));
const expressWinston = __importStar(require("express-winston"));
const cors_1 = __importDefault(require("cors"));
const users_routes_config_1 = require("./users/users.routes.config");
const auth_routes_config_1 = require("./auth/auth.routes.config");
const topics_routes_config_1 = require("./topics/topics.routes.config");
const votes_routes_config_1 = require("./votes/votes.routes.config");
const debug_1 = __importDefault(require("debug"));
const dotenv_1 = __importDefault(require("dotenv"));
const helmet_1 = __importDefault(require("helmet"));
/* Swagger Documentation */
const swaggerUI = require('swagger-ui-express');
const YAML = require('yamljs');
const swaggerDocument = YAML.load('./swagger.yaml');
if (process.env.NODE_ENV !== 'production') {
    const dotenvResult = dotenv_1.default.config();
    if (dotenvResult.error) {
        throw dotenvResult.error;
    }
}
const app = (0, express_1.default)();
const server = http.createServer(app);
const port = parseInt(process.env.PORT ? process.env.PORT : '3000') || 3000;
const routes = [];
const debugLog = (0, debug_1.default)('app');
// here we are adding middleware to parse all incoming requests as JSON 
app.use(express_1.default.json());
app.use((0, helmet_1.default)());
// here we are adding middleware to allow cross-origin requests
app.use((0, cors_1.default)());
// here we are preparing the expressWinston logging middleware configuration,
// which will automatically log all HTTP requests handled by Express.js
const loggerOptions = {
    transports: [new winston.transports.Console()],
    format: winston.format.combine(winston.format.json(), winston.format.prettyPrint(), winston.format.colorize({ all: true })),
};
if (!process.env.DEBUG) {
    loggerOptions.meta = false; // when not debugging, log requests as one-liners
    if (typeof global.it === 'function') {
        loggerOptions.level = 'http'; // for non-debug test runs, squelch entirely
    }
}
// initialize the logger with the above configuration
app.use(expressWinston.logger(loggerOptions));
/* initialize swagger documentation */
app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerDocument));
// here we are adding the UserRoutes to our array,
// after sending the Express.js application object to have the routes added to our app!
routes.push(new auth_routes_config_1.AuthRoutes(app));
routes.push(new topics_routes_config_1.TopicsRoutes(app));
routes.push(new users_routes_config_1.UsersRoutes(app));
routes.push(new votes_routes_config_1.VotesRoutes(app));
// this is a simple route to make sure everything is working properly
const runningMessage = `Server running at http://localhost:${process.env.PORT || 3000}`;
app.get('/', (req, res) => {
    res.status(200).send(runningMessage);
});
exports.default = server.listen(port, () => {
    routes.forEach((route) => {
        debugLog(`Routes configured for ${route.getName()}`);
    });
    // our only exception to avoiding console.log(), because we
    // always want to know when the server is done starting up
    console.log(runningMessage);
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXBwLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vYXBwLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLHNEQUE4QjtBQUM5QiwyQ0FBNkI7QUFFN0IsaURBQW1DO0FBQ25DLGdFQUFrRDtBQUNsRCxnREFBd0I7QUFFeEIscUVBQXdEO0FBQ3hELGtFQUF1RDtBQUN2RCx3RUFBMEQ7QUFDMUQscUVBQXdEO0FBQ3hELGtEQUEwQjtBQUMxQixvREFBNEI7QUFDNUIsb0RBQTRCO0FBRTVCLDJCQUEyQjtBQUMzQixNQUFNLFNBQVMsR0FBRyxPQUFPLENBQUMsb0JBQW9CLENBQUMsQ0FBQztBQUNoRCxNQUFNLElBQUksR0FBRyxPQUFPLENBQUMsUUFBUSxDQUFDLENBQUM7QUFDL0IsTUFBTSxlQUFlLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDO0FBRXBELElBQUksT0FBTyxDQUFDLEdBQUcsQ0FBQyxRQUFRLEtBQUssWUFBWSxFQUFDO0lBQ3hDLE1BQU0sWUFBWSxHQUFHLGdCQUFNLENBQUMsTUFBTSxFQUFFLENBQUM7SUFDckMsSUFBSSxZQUFZLENBQUMsS0FBSyxFQUFFO1FBQ3BCLE1BQU0sWUFBWSxDQUFDLEtBQUssQ0FBQztLQUM1QjtDQUNGO0FBRUQsTUFBTSxHQUFHLEdBQXdCLElBQUEsaUJBQU8sR0FBRSxDQUFDO0FBQzNDLE1BQU0sTUFBTSxHQUFnQixJQUFJLENBQUMsWUFBWSxDQUFDLEdBQUcsQ0FBQyxDQUFDO0FBQ25ELE1BQU0sSUFBSSxHQUFHLFFBQVEsQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxJQUFJLElBQUksQ0FBQztBQUM1RSxNQUFNLE1BQU0sR0FBOEIsRUFBRSxDQUFDO0FBQzdDLE1BQU0sUUFBUSxHQUFvQixJQUFB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