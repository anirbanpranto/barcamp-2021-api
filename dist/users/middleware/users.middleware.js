"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const users_service_1 = __importDefault(require("../services/users.service"));
const debug_1 = __importDefault(require("debug"));
const { OAuth2Client } = require("google-auth-library");
const client = new OAuth2Client(process.env.CLIENT_ID);
const log = (0, debug_1.default)('app:users-controller');
class UsersMiddleware {
    constructor() {
        this.validatePatchEmail = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            if (req.body.email) {
                log('Validating email', req.body.email);
                this.validateSameEmailBelongToSameUser(req, res, next);
            }
            else {
                next();
            }
        });
    }
    validateSameEmailDoesntExist(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const ticket = yield client.verifyIdToken({
                    idToken: req.body.googleId,
                    audience: process.env.CLIENT_ID,
                });
                const { email } = ticket.getPayload();
                const user = yield users_service_1.default.getUserByEmail(email);
                if (user) {
                    res.status(400).send({ error: `User email already exists` });
                }
                else {
                    next();
                }
            }
            catch (error) {
                log(error);
                res.status(500).send({ error: `googleId Incorrect` });
            }
        });
    }
    validateSameEmailBelongToSameUser(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            if (res.locals.user._id === req.params.userId) {
                next();
            }
            else {
                res.status(400).send({ error: `Invalid email` });
            }
        });
    }
    validateUserExists(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield users_service_1.default.readById(req.params.userId);
            if (user) {
                res.locals.user = user;
                next();
            }
            else {
                res.status(404).send({
                    error: `User ${req.params.userId} not found!`,
                });
            }
        });
    }
    extractUserId(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            req.body.id = req.params.userId;
            next();
        });
    }
    extractUserInfo(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const ticket = yield client.verifyIdToken({
                    idToken: req.body.googleId,
                    audience: process.env.CLIENT_ID,
                });
                const { email } = yield ticket.getPayload();
                // console.log(ticket.getPayload());
                const user = yield users_service_1.default.getUserByEmail(email);
                //console.log(user);
                // @ts-expect-error
                req.body.email = user.email;
                // @ts-expect-error
                req.body.userId = user._id;
                // @ts-expect-error
                req.body.permissionFlags = user.permissionFlags;
                next();
            }
            catch (error) {
                log(error);
                res.status(500).send({ error: `Token invalid` });
            }
        });
    }
}
exports.default = new UsersMiddleware();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXNlcnMubWlkZGxld2FyZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3VzZXJzL21pZGRsZXdhcmUvdXNlcnMubWlkZGxld2FyZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7OztBQUNBLDhFQUFvRDtBQUNwRCxrREFBMEI7QUFDMUIsTUFBTSxFQUFFLFlBQVksRUFBRSxHQUFHLE9BQU8sQ0FBQyxxQkFBcUIsQ0FBQyxDQUFDO0FBQ3hELE1BQU0sTUFBTSxHQUFHLElBQUksWUFBWSxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsU0FBUyxDQUFDLENBQUM7QUFFdkQsTUFBTSxHQUFHLEdBQW9CLElBQUEsZUFBSyxFQUFDLHNCQUFzQixDQUFDLENBQUM7QUFDM0QsTUFBTSxlQUFlO0lBQXJCO1FBcUNJLHVCQUFrQixHQUFHLENBQ2pCLEdBQW9CLEVBQ3BCLEdBQXFCLEVBQ3JCLElBQTBCLEVBQzVCLEVBQUU7WUFDQSxJQUFJLEdBQUcsQ0FBQyxJQUFJLENBQUMsS0FBSyxFQUFFO2dCQUNoQixHQUFHLENBQUMsa0JBQWtCLEVBQUUsR0FBRyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztnQkFFeEMsSUFBSSxDQUFDLGlDQUFpQyxDQUFDLEdBQUcsRUFBRSxHQUFHLEVBQUUsSUFBSSxDQUFDLENBQUM7YUFDMUQ7aUJBQU07Z0JBQ0gsSUFBSSxFQUFFLENBQUM7YUFDVjtRQUNMLENBQUMsQ0FBQSxDQUFDO0lBdUROLENBQUM7SUF0R1MsNEJBQTRCLENBQzlCLEdBQW9CLEVBQ3BCLEdBQXFCLEVBQ3JCLElBQTBCOztZQUU1QixJQUFJO2dCQUNGLE1BQU0sTUFBTSxHQUFHLE1BQU0sTUFBTSxDQUFDLGFBQWEsQ0FBQztvQkFDeEMsT0FBTyxFQUFFLEdBQUcsQ0FBQyxJQUFJLENBQUMsUUFBUTtvQkFDMUIsUUFBUSxFQUFFLE9BQU8sQ0FBQyxHQUFHLENBQUMsU0FBUztpQkFDaEMsQ0FBQyxDQUFDO2dCQUNI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