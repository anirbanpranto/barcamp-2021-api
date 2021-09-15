"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const debug_1 = __importDefault(require("debug"));
const log = (0, debug_1.default)('app:common-date-middleware');
class CommonDateMiddleware {
    constructor() {
        this.proposeTopicDateRange = [new Date("15 September, 2021 00:00:00"), new Date("24 September, 2021 00:00:00")];
        this.voteTopicDateRange = [new Date("25 September, 2021 00:00:00"), new Date("30 September, 2021 00:00:00")];
        this.initialDateRange = [new Date("1 January, 2021 00:00:00"), new Date("31 December, 2021 00:00:00")];
        log('constructor on common date middleware');
    }
    convertTZ(date, tzString) {
        return new Date((typeof date === "string" ? new Date(date) : date).toLocaleString("en-US", { timeZone: tzString }));
    }
    validateDateRange(routesType) {
        return (req, res, next) => {
            const dateNow = this.convertTZ(`${new Date()}`, 'Asia/Kuala_Lumpur');
            let dateRange = this.initialDateRange;
            if (routesType === 'proposeTopic') {
                dateRange = this.proposeTopicDateRange;
            }
            else if (routesType === 'voteTopic') {
                dateRange = this.voteTopicDateRange;
            }
            const dateRangeStart = dateRange[0];
            const dateRangeEnd = dateRange[1];
            const dateRangeStartString = dateRangeStart.getTime();
            const dateRangeEndString = dateRangeEnd.getTime();
            const dateNowString = dateNow.getTime();
            log(dateNow);
            if (dateRangeStartString <= dateNowString && dateNowString <= dateRangeEndString) {
                next();
            }
            else {
                res.status(425).send({
                    error: `Date range is not valid. Date range must be between ${dateRangeStartString} and ${dateRangeEndString}. Date now is ${dateNow}`
                });
            }
        };
    }
}
exports.default = new CommonDateMiddleware();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29tbW9uLmRhdGUubWlkZGxld2FyZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL2NvbW1vbi9taWRkbGV3YXJlL2NvbW1vbi5kYXRlLm1pZGRsZXdhcmUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFDQSxrREFBMEI7QUFFMUIsTUFBTSxHQUFHLEdBQW9CLElBQUEsZUFBSyxFQUFDLDRCQUE0QixDQUFDLENBQUM7QUFFakUsTUFBTSxvQkFBb0I7SUFFeEI7UUFJUSwwQkFBcUIsR0FBRyxDQUFDLElBQUksSUFBSSxDQUFDLDZCQUE2QixDQUFDLEVBQUUsSUFBSSxJQUFJLENBQUMsNkJBQTZCLENBQUMsQ0FBQyxDQUFDO1FBQzNHLHVCQUFrQixHQUFHLENBQUMsSUFBSSxJQUFJLENBQUMsNkJBQTZCLENBQUMsRUFBRSxJQUFJLElBQUksQ0FBQyw2QkFBNkIsQ0FBQyxDQUFDLENBQUM7UUFDeEcscUJBQWdCLEdBQUcsQ0FBQyxJQUFJLElBQUksQ0FBQywwQkFBMEIsQ0FBQyxFQUFFLElBQUksSUFBSSxDQUFDLDRCQUE0QixDQUFDLENBQUMsQ0FBQztRQUx4RyxHQUFHLENBQUMsdUNBQXVDLENBQUMsQ0FBQztJQUMvQyxDQUFDO0lBTUQsU0FBUyxDQUFDLElBQVksRUFBRSxRQUFnQjtRQUN0QyxPQUFPLElBQUksSUFBSSxDQUFDLENBQUMsT0FBTyxJQUFJLEtBQUssUUFBUSxDQUFDLENBQUMsQ0FBQyxJQUFJLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsY0FBYyxDQUFDLE9BQU8sRUFBRSxFQUFDLFFBQVEsRUFBRSxRQUFRLEVBQUMsQ0FBQyxDQUFDLENBQUM7SUFDcEgsQ0FBQztJQUVELGlCQUFpQixDQUFDLFVBQWtCO1FBQ2xDLE9BQU8sQ0FBQyxHQUFvQixFQUFFLEdBQXFCLEVBQUUsSUFBMEIsRUFBRSxFQUFFO1lBQ2pGLE1BQU0sT0FBTyxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUMsR0FBRyxJQUFJLElBQUksRUFBRSxFQUFFLEVBQUUsbUJBQW1CLENBQUMsQ0FBQztZQUNyRSxJQUFJLFNBQVMsR0FBRyxJQUFJLENBQUMsZ0JBQWdCLENBQUM7WUFDdEMsSUFBRyxVQUFVLEtBQUssY0FBYyxFQUFFO2dCQUNoQyxTQUFTLEdBQUcsSUFBSSxDQUFDLHFCQUFxQixDQUFDO2FBQ3hDO2lCQUFNLElBQUcsVUFBVSxLQUFLLFdBQVcsRUFBRTtnQkFDcEMsU0FBUyxHQUFHLElBQUksQ0FBQyxrQkFBa0IsQ0FBQzthQUNyQztZQUNELE1BQU0sY0FBYyxHQUFHLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUNwQyxNQUFNLFlBQVksR0FBRyxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDbEMsTUFBTSxvQkFBb0IsR0FBRyxjQUFjLENBQUMsT0FBTyxFQUFFLENBQUM7WUFDdEQsTUFBTSxrQkFBa0IsR0FBRyxZQUFZLENBQUMsT0FBTyxFQUFFLENBQUM7WUFDbEQsTUFBTSxhQUFhLEdBQUcsT0FBTyxDQUFDLE9BQU8sRUFBRSxDQUFDO1lBQ3hDLEdBQUcsQ0FBQyxPQUFPLENBQUMsQ0FBQztZQUNiLElBQUksb0JBQW9CLElBQUksYUFBYSxJQUFJLGFBQWEsSUFBSSxrQkFBa0IsRUFBRTtnQkFDaEYsSUFBSSxFQUFFLENBQUM7YUFDUjtpQkFBTTtnQkFDTCxHQUFHLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQztvQkFDbkIsS0FBSyxFQUFFLHVEQUF1RCxvQkFBb0IsUUFBUSxrQkFBa0IsaUJBQWlCLE9BQU8sRUFBRTtpQkFDdkksQ0FBQyxDQUFDO2FBQ0o7UUFDSCxDQUFDLENBQUE7SUFDSCxDQUFDO0NBRUY7QUFFRCxrQkFBZSxJQUFJLG9CQUFvQixFQUFFLENBQUMifQ==