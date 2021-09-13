"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const debug_1 = __importDefault(require("debug"));
const log = (0, debug_1.default)('app:common-date-middleware');
class CommonDateMiddleware {
    constructor() {
        this.proposeTopicDateRange = [new Date("15 September, 2020 00:00:00"), new Date("24 September, 2020 00:00:00")];
        this.voteTopicDateRange = [];
        this.dateNow = this.convertTZ(`${new Date()}`, 'Asia/Kuala_Lumpur');
        log('constructor on common date middleware');
    }
    convertTZ(date, tzString) {
        return new Date((typeof date === "string" ? new Date(date) : date).toLocaleString("en-US", { timeZone: tzString }));
    }
    validateDateRange(routesType) {
        return (req, res, next) => {
            const dateRange = routesType === 'proposeTopic' ? this.proposeTopicDateRange : this.voteTopicDateRange;
            const dateNow = this.dateNow;
            const dateRangeStart = dateRange[0];
            const dateRangeEnd = dateRange[1];
            const dateRangeStartString = dateRangeStart.toString();
            const dateRangeEndString = dateRangeEnd.toString();
            const dateNowString = dateNow.toString();
            log(dateNow);
            if (dateRangeStartString <= dateNowString && dateNowString <= dateRangeEndString) {
                next();
            }
            else {
                res.status(425).send({
                    message: `Date range is not valid. Date range must be between ${dateRangeStartString} and ${dateRangeEndString}. Date now is ${dateNow}`
                });
            }
        };
    }
}
exports.default = new CommonDateMiddleware();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29tbW9uLmRhdGUubWlkZGxld2FyZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL2NvbW1vbi9taWRkbGV3YXJlL2NvbW1vbi5kYXRlLm1pZGRsZXdhcmUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFDQSxrREFBMEI7QUFFMUIsTUFBTSxHQUFHLEdBQW9CLElBQUEsZUFBSyxFQUFDLDRCQUE0QixDQUFDLENBQUM7QUFFakUsTUFBTSxvQkFBb0I7SUFFeEI7UUFJUSwwQkFBcUIsR0FBRyxDQUFDLElBQUksSUFBSSxDQUFDLDZCQUE2QixDQUFDLEVBQUUsSUFBSSxJQUFJLENBQUMsNkJBQTZCLENBQUMsQ0FBQyxDQUFDO1FBQzNHLHVCQUFrQixHQUFHLEVBQUUsQ0FBQztRQUN4QixZQUFPLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQyxHQUFHLElBQUksSUFBSSxFQUFFLEVBQUUsRUFBRSxtQkFBbUIsQ0FBQyxDQUFDO1FBTHJFLEdBQUcsQ0FBQyx1Q0FBdUMsQ0FBQyxDQUFDO0lBQy9DLENBQUM7SUFNRCxTQUFTLENBQUMsSUFBWSxFQUFFLFFBQWdCO1FBQ3RDLE9BQU8sSUFBSSxJQUFJLENBQUMsQ0FBQyxPQUFPLElBQUksS0FBSyxRQUFRLENBQUMsQ0FBQyxDQUFDLElBQUksSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxjQUFjLENBQUMsT0FBTyxFQUFFLEVBQUMsUUFBUSxFQUFFLFFBQVEsRUFBQyxDQUFDLENBQUMsQ0FBQztJQUNwSCxDQUFDO0lBRUQsaUJBQWlCLENBQUMsVUFBa0I7UUFDbEMsT0FBTyxDQUFDLEdBQW9CLEVBQUUsR0FBcUIsRUFBRSxJQUEwQixFQUFFLEVBQUU7WUFDakYsTUFBTSxTQUFTLEdBQUcsVUFBVSxLQUFLLGNBQWMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLHFCQUFxQixDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsa0JBQWtCLENBQUM7WUFDdkcsTUFBTSxPQUFPLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQztZQUM3QixNQUFNLGNBQWMsR0FBRyxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDcEMsTUFBTSxZQUFZLEdBQUcsU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ2xDLE1BQU0sb0JBQW9CLEdBQUcsY0FBYyxDQUFDLFFBQVEsRUFBRSxDQUFDO1lBQ3ZELE1BQU0sa0JBQWtCLEdBQUcsWUFBWSxDQUFDLFFBQVEsRUFBRSxDQUFDO1lBQ25ELE1BQU0sYUFBYSxHQUFHLE9BQU8sQ0FBQyxRQUFRLEVBQUUsQ0FBQztZQUN6QyxHQUFHLENBQUMsT0FBTyxDQUFDLENBQUM7WUFDYixJQUFJLG9CQUFvQixJQUFJLGFBQWEsSUFBSSxhQUFhLElBQUksa0JBQWtCLEVBQUU7Z0JBQ2hGLElBQUksRUFBRSxDQUFDO2FBQ1I7aUJBQU07Z0JBQ0wsR0FBRyxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUM7b0JBQ25CLE9BQU8sRUFBRSx1REFBdUQsb0JBQW9CLFFBQVEsa0JBQWtCLGlCQUFpQixPQUFPLEVBQUU7aUJBQ3pJLENBQUMsQ0FBQzthQUNKO1FBQ0gsQ0FBQyxDQUFBO0lBQ0gsQ0FBQztDQUVGO0FBRUQsa0JBQWUsSUFBSSxvQkFBb0IsRUFBRSxDQUFDIn0=