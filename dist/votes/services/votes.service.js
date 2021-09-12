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
const votes_dao_1 = __importDefault(require("../daos/votes.dao"));
class VotesService {
    create(resource) {
        return __awaiter(this, void 0, void 0, function* () {
            return votes_dao_1.default.create(resource);
        });
    }
    deleteById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return votes_dao_1.default.removeById(id);
        });
    }
    list(limit, page) {
        return __awaiter(this, void 0, void 0, function* () {
            return votes_dao_1.default.getAll(limit, page);
        });
    }
    readByUserId(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return votes_dao_1.default.getByUserId(id);
        });
    }
    readByTopicId(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return votes_dao_1.default.getByTopicId(id);
        });
    }
    getTotalVotesByTopicId(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return votes_dao_1.default.getTotalVotesByTopicId(id);
        });
    }
    getByAllFields(resource) {
        return __awaiter(this, void 0, void 0, function* () {
            return votes_dao_1.default.getByAllFields(resource);
        });
    }
}
exports.default = new VotesService();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidm90ZXMuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3ZvdGVzL3NlcnZpY2VzL3ZvdGVzLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7QUFBQSxrRUFBeUM7QUFJekMsTUFBTSxZQUFZO0lBQ1IsTUFBTSxDQUFDLFFBQXVCOztZQUNoQyxPQUFPLG1CQUFRLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxDQUFDO1FBQ3JDLENBQUM7S0FBQTtJQUVLLFVBQVUsQ0FBQyxFQUFVOztZQUN2QixPQUFPLG1CQUFRLENBQUMsVUFBVSxDQUFDLEVBQUUsQ0FBQyxDQUFDO1FBQ25DLENBQUM7S0FBQTtJQUVLLElBQUksQ0FBQyxLQUFhLEVBQUUsSUFBWTs7WUFDbEMsT0FBTyxtQkFBUSxDQUFDLE1BQU0sQ0FBQyxLQUFLLEVBQUUsSUFBSSxDQUFDLENBQUM7UUFDeEMsQ0FBQztLQUFBO0lBRUssWUFBWSxDQUFDLEVBQVU7O1lBQ3pCLE9BQU8sbUJBQVEsQ0FBQyxXQUFXLENBQUMsRUFBRSxDQUFDLENBQUM7UUFDcEMsQ0FBQztLQUFBO0lBRUssYUFBYSxDQUFDLEVBQVU7O1lBQzVCLE9BQU8sbUJBQVEsQ0FBQyxZQUFZLENBQUMsRUFBRSxDQUFDLENBQUM7UUFDbkMsQ0FBQztLQUFBO0lBRUssc0JBQXNCLENBQUMsRUFBVTs7WUFDckMsT0FBTyxtQkFBUSxDQUFDLHNCQUFzQixDQUFDLEVBQUUsQ0FBQyxDQUFDO1FBQzdDLENBQUM7S0FBQTtJQUVLLGNBQWMsQ0FBRSxRQUF1Qjs7WUFDM0MsT0FBTyxtQkFBUSxDQUFDLGNBQWMsQ0FBQyxRQUFRLENBQUMsQ0FBQztRQUMzQyxDQUFDO0tBQUE7Q0FDSjtBQUVELGtCQUFlLElBQUksWUFBWSxFQUFFLENBQUMifQ==