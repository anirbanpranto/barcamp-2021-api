import mongoose from 'mongoose';
import debug from 'debug';

const log: debug.IDebugger = debug('app:mongoose-service');

class MongooseService {
    private count = 0;
    private mongooseOptions = {
        serverSelectionTimeoutMS: 5000,
        useNewUrlParser: true,
    };

    constructor() {
        this.connectWithRetry();
    }

    getMongoose() {
        return mongoose;
    }

    connectWithRetry = () => {
        log('Attempting MongoDB connection (will retry if needed)');
        mongoose
        
            // // @ts-expect-error
            .connect('mongodb+srv://shaun:shaun-barcamp-staging@barcampcyberjaya2021-st.evbg1.mongodb.net/api-db', this.mongooseOptions)
            .then(() => {
                log('MongoDB is connected');
            })
            .catch((err) => {
                const retrySeconds = 5;
                log(
                    `MongoDB connection unsuccessful (will retry #${++this
                        .count} after ${retrySeconds} seconds):`,
                    err
                );
                setTimeout(this.connectWithRetry, retrySeconds * 1000);
            });
    };
}
export default new MongooseService();