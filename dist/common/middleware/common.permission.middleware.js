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
const common_permissionflag_enum_1 = require("./common.permissionflag.enum");
const debug_1 = __importDefault(require("debug"));
const log = (0, debug_1.default)('app:common-permission-middleware');
class CommonPermissionMiddleware {
    permissionFlagRequired(requiredPermissionFlag) {
        return (req, res, next) => {
            try {
                const userPermissionFlags = parseInt(res.locals.jwt.permissionFlags);
                if (userPermissionFlags >= requiredPermissionFlag) {
                    next();
                }
                else {
                    return res.status(403).send();
                }
            }
            catch (e) {
                log(e);
                return res.status(500).send();
            }
        };
    }
    onlySameUserOrAdminCanDoThisAction(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const userPermissionFlags = parseInt(res.locals.jwt.permissionFlags);
            if (req.params &&
                req.params.userId &&
                req.params.userId === res.locals.jwt.userId) {
                return next();
            }
            else {
                if (userPermissionFlags & common_permissionflag_enum_1.PermissionFlag.ADMIN_PERMISSION) {
                    return next();
                }
                else {
                    return res.status(403).send();
                }
            }
        });
    }
    userCantChangePermission(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            if ('permissionFlags' in req.body &&
                req.body.permissionFlags !== res.locals.user.permissionFlags) {
                res.status(400).send({
                    errors: ['User cannot change permission flags'],
                });
            }
            else {
                next();
            }
        });
    }
}
exports.default = new CommonPermissionMiddleware();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29tbW9uLnBlcm1pc3Npb24ubWlkZGxld2FyZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL2NvbW1vbi9taWRkbGV3YXJlL2NvbW1vbi5wZXJtaXNzaW9uLm1pZGRsZXdhcmUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7QUFDQSw2RUFBOEQ7QUFDOUQsa0RBQTBCO0FBRTFCLE1BQU0sR0FBRyxHQUFvQixJQUFBLGVBQUssRUFBQyxrQ0FBa0MsQ0FBQyxDQUFDO0FBRXZFLE1BQU0sMEJBQTBCO0lBQzVCLHNCQUFzQixDQUFDLHNCQUFzQztRQUN6RCxPQUFPLENBQ0gsR0FBb0IsRUFDcEIsR0FBcUIsRUFDckIsSUFBMEIsRUFDNUIsRUFBRTtZQUNBLElBQUk7Z0JBQ0EsTUFBTSxtQkFBbUIsR0FBRyxRQUFRLENBQ2hDLEdBQUcsQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLGVBQWUsQ0FDakMsQ0FBQztnQkFDRixJQUFJLG1CQUFtQixJQUFJLHNCQUFzQixFQUFFO29CQUMvQyxJQUFJLEVBQUUsQ0FBQztpQkFDVjtxQkFBTTtvQkFDSCxPQUFPLEdBQUcsQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUMsSUFBSSxFQUFFLENBQUM7aUJBQ2pDO2FBQ0o7WUFBQyxPQUFPLENBQUMsRUFBRTtnQkFDUixHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBQ1AsT0FBTyxHQUFHLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDLElBQUksRUFBRSxDQUFDO2FBQ2pDO1FBQ0wsQ0FBQyxDQUFDO0lBQ04sQ0FBQztJQUVLLGtDQUFrQyxDQUNwQyxHQUFvQixFQUNwQixHQUFxQixFQUNyQixJQUEwQjs7WUFFMUIsTUFBTSxtQkFBbUIsR0FBRyxRQUFRLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsZUFBZSxDQUFDLENBQUM7WUFDckUsSUFDSSxHQUFHLENBQUMsTUFBTTtnQkFDVixHQUFHLENBQUMsTUFBTSxDQUFDLE1BQU07Z0JBQ2pCLEdBQUcsQ0FBQyxNQUFNLENBQUMsTUFBTSxLQUFLLEdBQUcsQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLE1BQU0sRUFDN0M7Z0JBQ0UsT0FBTyxJQUFJLEVBQUUsQ0FBQzthQUNqQjtpQkFBTTtnQkFDSCxJQUFJLG1CQUFtQixHQUFHLDJDQUFjLENBQUMsZ0JBQWdCLEVBQUU7b0JBQ3ZELE9BQU8sSUFBSSxFQUFFLENBQUM7aUJBQ2pCO3FCQUFNO29CQUNILE9BQU8sR0FBRyxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQyxJQUFJLEVBQUUsQ0FBQztpQkFDakM7YUFDSjtRQUNMLENBQUM7S0FBQTtJQUVLLHdCQUF3QixDQUMxQixHQUFvQixFQUNwQixHQUFxQixFQUNyQixJQUEwQjs7WUFFMUIsSUFDSSxpQkFBaUIsSUFBSSxHQUFHLENBQUMsSUFBSTtnQkFDN0IsR0FBRyxDQUFDLElBQUksQ0FBQyxlQUFlLEtBQUssR0FBRyxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsZUFBZSxFQUM5RDtnQkFDRSxHQUFHLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQztvQkFDakIsTUFBTSxFQUFFLENBQUMscUNBQXFDLENBQUM7aUJBQ2xELENBQUMsQ0FBQzthQUNOO2lCQUFNO2dCQUNILElBQUksRUFBRSxDQUFDO2FBQ1Y7UUFDTCxDQUFDO0tBQUE7Q0FDSjtBQUVELGtCQUFlLElBQUksMEJBQTBCLEVBQUUsQ0FBQyJ9