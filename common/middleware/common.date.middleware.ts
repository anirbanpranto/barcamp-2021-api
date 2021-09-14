import express from 'express';
import debug from 'debug';

const log: debug.IDebugger = debug('app:common-date-middleware');

class CommonDateMiddleware {

  constructor() {
    log('constructor on common date middleware');
  }
  
  private proposeTopicDateRange = [new Date("15 September, 2020 00:00:00"), new Date("24 September, 2020 00:00:00")];
  private voteTopicDateRange = [];

  convertTZ(date: string, tzString: string) {
    return new Date((typeof date === "string" ? new Date(date) : date).toLocaleString("en-US", {timeZone: tzString}));   
  }

  validateDateRange(routesType: string) {
    return (req: express.Request, res: express.Response, next: express.NextFunction) => {
      const dateNow = this.convertTZ(`${new Date()}`, 'Asia/Kuala_Lumpur');
      const dateRange = routesType === 'proposeTopic' ? this.proposeTopicDateRange : this.voteTopicDateRange;
      const dateRangeStart = dateRange[0];
      const dateRangeEnd = dateRange[1];
      const dateRangeStartString = dateRangeStart.toString();
      const dateRangeEndString = dateRangeEnd.toString();
      const dateNowString = dateNow.toString();
      log(dateNow);
      if (dateRangeStartString <= dateNowString && dateNowString <= dateRangeEndString) {
        next();
      } else {
        res.status(425).send({
          error: `Date range is not valid. Date range must be between ${dateRangeStartString} and ${dateRangeEndString}. Date now is ${dateNow}`
        });
      }
    }
  }

}

export default new CommonDateMiddleware();