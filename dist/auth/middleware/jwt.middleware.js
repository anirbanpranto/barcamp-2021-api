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
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const crypto_1 = __importDefault(require("crypto"));
const users_service_1 = __importDefault(require("../../users/services/users.service"));
class JwtMiddleware {
    verifyRefreshBodyField(req, res, next) {
        if (req.body && req.body.refreshToken) {
            return next();
        }
        else {
            return res
                .status(400)
                .send({ errors: ['Missing required field: refreshToken'] });
        }
    }
    validRefreshNeeded(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield users_service_1.default.getUserByEmail(res.locals.jwt.email);
            const salt = crypto_1.default.createSecretKey(Buffer.from(res.locals.jwt.refreshKey.data));
            const jwtSecret = process.env.JWT_SECRET;
            if (jwtSecret) {
                const hash = crypto_1.default
                    .createHmac('sha512', salt)
                    .update(res.locals.jwt.userId + jwtSecret)
                    .digest('base64');
                if (hash === req.body.refreshToken) {
                    req.body = {
                        userId: user._id,
                        email: user.email,
                        permissionFlags: user.permissionFlags,
                    };
                    return next();
                }
                else {
                    return res.status(400).send({ errors: ['Invalid refresh token'] });
                }
            }
        });
    }
    validJWTNeeded(req, res, next) {
        if (req.headers['authorization']) {
            try {
                const authorization = req.headers['authorization'].split(' ');
                if (authorization[0] !== 'Bearer') {
                    return res.status(401).send();
                }
                else {
                    const jwtSecret = process.env.JWT_SECRET;
                    if (jwtSecret) {
                        res.locals.jwt = jsonwebtoken_1.default.verify(authorization[1], jwtSecret);
                        next();
                    }
                    else {
                        throw "JWT_SECRET .env undefined";
                    }
                }
            }
            catch (err) {
                console.log(err);
                return res.status(403).send();
            }
        }
        else {
            return res.status(401).send();
        }
    }
    validateParamUserIdIsUser(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let token = req.headers['Authorization'] || req.headers.authorization;
                // @ts-expect-error
                token = token.split(' ')[1];
                // @ts-expect-error
                jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET, (err, decoded) => {
                    if (err) {
                        return res
                            .status(401)
                            .json({ status: false, error: 'Token is not valid' });
                    }
                    // @ts-expect-error
                    if (decoded.userId !== req.params.userId) {
                        return res
                            .status(401)
                            .json({ status: false, error: "You don't have access to this user" });
                    }
                    // @ts-expect-error
                    req.decoded = decoded;
                    next();
                });
            }
            catch (error) {
                return res.status(500).send();
            }
        });
    }
}
exports.default = new JwtMiddleware();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiand0Lm1pZGRsZXdhcmUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9hdXRoL21pZGRsZXdhcmUvand0Lm1pZGRsZXdhcmUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7QUFDQSxnRUFBK0I7QUFDL0Isb0RBQTRCO0FBRTVCLHVGQUE4RDtBQUU5RCxNQUFNLGFBQWE7SUFDZixzQkFBc0IsQ0FDbEIsR0FBb0IsRUFDcEIsR0FBcUIsRUFDckIsSUFBMEI7UUFFMUIsSUFBSSxHQUFHLENBQUMsSUFBSSxJQUFJLEdBQUcsQ0FBQyxJQUFJLENBQUMsWUFBWSxFQUFFO1lBQ25DLE9BQU8sSUFBSSxFQUFFLENBQUM7U0FDakI7YUFBTTtZQUNILE9BQU8sR0FBRztpQkFDTCxNQUFNLENBQUMsR0FBRyxDQUFDO2lCQUNYLElBQUksQ0FBQyxFQUFFLE1BQU0sRUFBRSxDQUFDLHNDQUFzQyxDQUFDLEVBQUUsQ0FBQyxDQUFDO1NBQ25FO0lBQ0wsQ0FBQztJQUVLLGtCQUFrQixDQUNwQixHQUFvQixFQUNwQixHQUFxQixFQUNyQixJQUEwQjs7WUFFMUIsTUFBTSxJQUFJLEdBQVEsTUFBTSx1QkFBWSxDQUFDLGNBQWMsQ0FDL0MsR0FBRyxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUN2QixDQUFDO1lBQ0YsTUFBTSxJQUFJLEdBQUcsZ0JBQU0sQ0FBQyxlQUFlLENBQy9CLE1BQU0sQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxDQUM5QyxDQUFDO1lBQ0YsTUFBTSxTQUFTLEdBQUcsT0FBTyxDQUFDLEdBQUcsQ0FBQyxVQUFVLENBQUM7WUFDekMsSUFBRyxTQUFTLEVBQUM7Z0JBQ1QsTUFBTSxJQUFJLEdBQUcsZ0JBQU07cUJBQ2xCLFVBQVUsQ0FBQyxRQUFRLEVBQUUsSUFBSSxDQUFDO3FCQUMxQixNQUFNLENBQUMsR0FBRyxDQUFDLE1B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