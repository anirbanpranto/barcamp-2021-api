import express from 'express';
import debug from 'debug';

const log: debug.IDebugger = debug('app:common-date-middleware');

class CommonDateMiddleware {

  constructor() {
    log('constructor on common date middleware');
  }
  
  private proposeTopicDateRange = [new Date("15 September, 2021 00:00:00"), new Date("24 September, 2021 00:00:00")];
  private voteTopicDateRange = [new Date("25 September, 2021 00:00:00"), new Date("30 September, 2021 00:00:00")];
  private initialDateRange = [new Date("1 January, 2021 00:00:00"), new Date("31 December, 2021 00:00:00")];

  convertTZ(date: string, tzString: string) {
    return new Date((typeof date === "string" ? new Date(date) : date).toLocaleString("en-US", {timeZone: tzString}));   
  }

  validateDateRange(routesType: string) {
    return (req: express.Request, res: express.Response, next: express.NextFunction) => {
      const dateNow = this.convertTZ(`${new Date()}`, 'Asia/Kuala_Lumpur');
      let dateRange = this.initialDateRange;
      if(routesType === 'proposeTopic') {
        dateRange = this.proposeTopicDateRange;
      } else if(routesType === 'voteTopic') {
        dateRange = this.voteTopicDateRange;
      }
      const dateRangeStart = dateRange[0];
      const dateRangeEnd = dateRange[1];
      const dateRangeStartString = dateRangeStart.getTime();
      const dateRangeEndString = dateRangeEnd.getTime();
      const dateNowString = dateNow.getTime();
      log(dateNow);
      if (dateRangeStartString <= dateNowString && dateNowString <= dateRangeEndString) {
        // next();
        res.status(425).send({
          error: `Date range is not valid. Date range must be between ${dateRangeStartString} and ${dateRangeEndString}. Date now is ${dateNow}`
        });
      } else {
        res.status(425).send({
          error: `Date range is not valid. Date range must be between ${dateRangeStartString} and ${dateRangeEndString}. Date now is ${dateNow}`
        });
      }
    }
  }

}

export default new CommonDateMiddleware();