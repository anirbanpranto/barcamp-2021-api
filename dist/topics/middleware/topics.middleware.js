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
const topics_service_1 = __importDefault(require("../services/topics.service"));
const debug_1 = __importDefault(require("debug"));
const log = (0, debug_1.default)('app:topics-controller');
class TopicsMiddleware {
    validateUserDoesntHaveTopic(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield topics_service_1.default.findUser(req.body.user);
            console.log(user);
            if (user) {
                res.status(400).send({ error: `A topic for this user already exists` });
            }
            else {
                next();
            }
        });
    }
    validateTopicExists(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const topic = yield topics_service_1.default.readById(req.params.topicId);
            if (topic) {
                res.locals.topic = topic;
                next();
            }
            else {
                res.status(404).send({
                    error: `Topic ${req.params.topicId} not found`,
                });
            }
        });
    }
    extractTopicId(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            req.body.id = req.params.topicId;
            next();
        });
    }
}
exports.default = new TopicsMiddleware();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidG9waWNzLm1pZGRsZXdhcmUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi90b3BpY3MvbWlkZGxld2FyZS90b3BpY3MubWlkZGxld2FyZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7OztBQUVBLGdGQUFzRDtBQUN0RCxrREFBMEI7QUFFMUIsTUFBTSxHQUFHLEdBQW9CLElBQUEsZUFBSyxFQUFDLHVCQUF1QixDQUFDLENBQUM7QUFDNUQsTUFBTSxnQkFBZ0I7SUFFWiwyQkFBMkIsQ0FDN0IsR0FBb0IsRUFDcEIsR0FBcUIsRUFDckIsSUFBMEI7O1lBRTFCLE1BQU0sSUFBSSxHQUFHLE1BQU0sd0JBQVksQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztZQUN4RCxPQUFPLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxDQUFDO1lBQ2xCLElBQUksSUFBSSxFQUFFO2dCQUNOLEdBQUcsQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLEVBQUUsS0FBSyxFQUFFLHNDQUFzQyxFQUFFLENBQUMsQ0FBQzthQUMzRTtpQkFBTTtnQkFDSCxJQUFJLEVBQUUsQ0FBQzthQUNWO1FBQ0wsQ0FBQztLQUFBO0lBRUssbUJBQW1CLENBQ3JCLEdBQW9CLEVBQ3BCLEdBQXFCLEVBQ3JCLElBQTBCOztZQUUxQixNQUFNLEtBQUssR0FBRyxNQUFNLHdCQUFZLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLENBQUM7WUFDOUQsSUFBSSxLQUFLLEVBQUU7Z0JBQ1AsR0FBRyxDQUFDLE1BQU0sQ0FBQyxLQUFLLEdBQUcsS0FBSyxDQUFDO2dCQUN6QixJQUFJLEVBQUUsQ0FBQzthQUNWO2lCQUFNO2dCQUNILEdBQUcsQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDO29CQUNqQixLQUFLLEVBQUUsU0FBUyxHQUFHLENBQUMsTUFBTSxDQUFDLE9BQU8sWUFBWTtpQkFDakQsQ0FBQyxDQUFDO2FBQ047UUFDTCxDQUFDO0tBQUE7SUFFSyxjQUFjLENBQ2hCLEdBQW9CLEVBQ3BCLEdBQXFCLEVBQ3JCLElBQTBCOztZQUUxQixHQUFHLENBQUMsSUFBSSxDQUFDLEVBQUUsR0FBRyxHQUFHLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQztZQUNqQyxJQUFJLEVBQUUsQ0FBQztRQUNYLENBQUM7S0FBQTtDQUVKO0FBRUQsa0JBQWUsSUFBSSxnQkFBZ0IsRUFBRSxDQUFDIn0=