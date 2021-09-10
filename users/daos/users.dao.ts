import { CreateUserDto } from '../dto/create.user.dto';
import { PatchUserDto } from '../dto/patch.user.dto';
import { PutUserDto } from '../dto/put.user.dto';
import shortid from 'shortid';
import debug from 'debug';
import mongooseService from '../../common/services/mongoose.service';

const log: debug.IDebugger = debug('app:in-memory-dao');

class UsersDao {
    Schema = mongooseService.getMongoose().Schema;

    userSchema = new this.Schema({
        _id: String,
        email: String,
        fullName: String,
        age: Number,
        contactNumber: String,
        companyOrInstitution: String,
        picture: String,
        permissionFlags: Number,
    }, { id: false });

    User = mongooseService.getMongoose().model('Users', this.userSchema);

    constructor() {
        log('Created new instance of UsersDao');
    }

    async addUser(userFields: CreateUserDto) {
        log(userFields);
        const userId = shortid.generate();
        const user = new this.User({
            _id: userId,
            ...userFields,
            permissionFlags: 1,
        });
        await user.save();
        return userId;
    }

    async getUserByEmail(email: string) {
        return this.User.findOne({ email: email }).exec();
    }
    
    async getUserById(userId: string) {
        return this.User.findOne({ _id: userId }).exec();
    }
    
    async getUsers(limit = 1000, page = 0) {
        return this.User.find()
            .limit(limit)
            .skip(limit * page)
            .exec();
    }

    async updateUserById(
        userId: string,
        userFields: PatchUserDto | PutUserDto
    ) {
        const existingUser = await this.User.findOneAndUpdate(
            { _id: userId },
            { $set: userFields },
            { new: true }
        ).exec();

        // @ts-expect-error
        if(existingUser.fullName && existingUser.age && existingUser.contactNumber) {
            this.updatePermissionById(userId, 2);
        }else{
            this.updatePermissionById(userId, 1);
        }
    
        return existingUser;
    }

    async removeUserById(userId: string) {
        return this.User.deleteOne({ _id: userId }).exec();
    }

    async updatePermissionById(userId: string, permissionFlags: number) {
        return this.User.findOneAndUpdate(
            { _id: userId },
            { $set: { permissionFlags: permissionFlags } },
            { new: true }
        ).exec();
    }
}

export default new UsersDao();