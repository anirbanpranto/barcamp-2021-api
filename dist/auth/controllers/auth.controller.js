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
const debug_1 = __importDefault(require("debug"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const crypto_1 = __importDefault(require("crypto"));
const log = (0, debug_1.default)('app:auth-controller');
class AuthController {
    createJWT(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const tokenBody = {
                    userId: req.body.userId,
                    email: req.body.email,
                    picture: req.body.picture,
                    permissionFlags: req.body.permissionFlags,
                };
                // @ts-expect-error
                const jwtSecret = process.env.JWT_SECRET;
                const tokenExpirationInSeconds = 36000;
                const refreshId = req.body.userId + jwtSecret;
                const salt = crypto_1.default.createSecretKey(crypto_1.default.randomBytes(16));
                const hash = crypto_1.default
                    .createHmac('sha512', salt)
                    .update(refreshId)
                    .digest('base64');
                req.body.refreshKey = salt.export();
                if (jwtSecret) {
                    const token = jsonwebtoken_1.default.sign(tokenBody, jwtSecret, {
                        expiresIn: tokenExpirationInSeconds,
                    });
                    return res
                        .status(201)
                        .send({ accessToken: token, refreshToken: hash });
                }
                else {
                    throw ".env JWT_SECRET undefined";
                }
            }
            catch (err) {
                log('createJWT error: %O', err);
                return res.status(500).send();
            }
        });
    }
    checkAuth(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            return res.status(200).send();
        });
    }
}
exports.default = new AuthController();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXV0aC5jb250cm9sbGVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vYXV0aC9jb250cm9sbGVycy9hdXRoLmNvbnRyb2xsZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7QUFDQSxrREFBMEI7QUFDMUIsZ0VBQStCO0FBQy9CLG9EQUE0QjtBQUU1QixNQUFNLEdBQUcsR0FBb0IsSUFBQSxlQUFLLEVBQUMscUJBQXFCLENBQUMsQ0FBQztBQUUxRCxNQUFNLGNBQWM7SUFDVixTQUFTLENBQUMsR0FBb0IsRUFBRSxHQUFxQjs7WUFDdkQsSUFBSTtnQkFDQSxNQUFNLFNBQVMsR0FBRztvQkFDZCxNQUFNLEVBQUUsR0FBRyxDQUFDLElBQUksQ0FBQyxNQUFNO29CQUN2QixLQUFLLEVBQUUsR0FBRyxDQUFDLElBQUksQ0FBQyxLQUFLO29CQUNyQixPQUFPLEVBQUUsR0FBRyxDQUFDLElBQUksQ0FBQyxPQUFPO29CQUN6QixlQUFlLEVBQUUsR0FBRyxDQUFDLElBQUksQ0FBQyxlQUFlO2lCQUM1QyxDQUFBO2dCQUNELG1CQUFtQjtnQkFDbkIsTUFBTSxTQUFTLEdBQVcsT0FBTyxDQUFDLEdBQUcsQ0FBQyxVQUFVLENBQUM7Z0JBQ2pELE1BQU0sd0JBQXdCLEdBQUcsS0FBSyxDQUFDO2dCQUN2QyxNQUFNLFNBQVMsR0FBRyxHQUFHLENBQUMsSUFBSSxDQUFDLE1BQU0sR0FBRyxTQUFTLENBQUM7Z0JBQzlDLE1BQU0sSUFBSSxHQUFHLGdCQUFNLENBQUMsZUFBZSxDQUFDLGdCQUFNLENBQUMsV0FBVyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7Z0JBQzVELE1BQU0sSUFBSSxHQUFHLGdCQUFNO3FCQUNkLFVBQVUsQ0FBQyxRQUFRLEVBQUUsSUFBSSxDQUFDO3FCQUMxQixNQUFNLENBQUMsU0FBUyxDQUFDO3FCQUNqQixNQUFNLENBQUMsUUFBUSxDQUFDLENBQUM7Z0JBQ3RCLEdBQUcsQ0FBQyxJQUFJLENBQUMsVUFBVSxHQUFHLElBQUksQ0FBQyxNQUFNLEVBQUUsQ0FBQztnQkFDcEMsSUFBRyxTQUFTLEVBQUM7b0JBQ1QsTUFBTSxLQUFLLEdBQUcsc0JBQUcsQ0FBQyxJQUFJLENBQUMsU0FBUyxFQUFFLFNBQVMsRUFBRTt3QkFDekMsU0FBUyxFQUFFLHdCQUF3QjtxQkFDdEMsQ0FBQyxDQUFDO29CQUNILE9BQU8sR0FBRzt5QkFDVCxNQUFNLENBQUMsR0FBRyxDQUFDO3lCQUNYLElBQUksQ0FBQyxFQUFFLFdBQVcsRUFBRSxLQUFLLEVBQUUsWUFBWSxFQUFFLElBQUksRUFBRSxDQUFDLENBQUM7aUJBQ3JEO3FCQUNHO29CQUNBLE1BQU0sMkJBQTJCLENBQUM7aUJBQ3JDO2FBQ0o7WUFBQyxPQUFPLEdBQUcsRUFBRTtnQkFDVixHQUFHLENBQUMscUJBQXFCLEVBQUUsR0FBRyxDQUFDLENBQUM7Z0JBQ2hDLE9BQU8sR0FBRyxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQyxJQUFJLEVBQUUsQ0FBQzthQUNqQztRQUNMLENBQUM7S0FBQTtJQUVLLFNBQVMsQ0FBQyxHQUFvQixFQUFFLEdBQXFCOztZQUN6RCxPQUFPLEdBQUcsQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUMsSUFBSSxFQUFFLENBQUM7UUFDaEMsQ0FBQztLQUFBO0NBQ0o7QUFFRCxrQkFBZSxJQUFJLGNBQWMsRUFBRSxDQUFDIn0=