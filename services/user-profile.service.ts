import * as mongoose from 'mongoose';
import { Config } from '../config';
import { UserProfile } from '../models/user-profile';

var config = new Config();
const UserProfileModel = new UserProfile().model;

export class UserProfileService {

    constructor(){
       mongoose.connect(config.db);
    }

    async saveUserProfile(userProfile) {
        return new Promise<mongoose.Document>(resolve => {
            if (userProfile.Id) {
                var id = userProfile.Id;
                UserProfileModel.findByIdAndUpdate(id, { $set: userProfile }, function (err, res) {
                    resolve(res);
                });
            }
            else {
                var userProfileModel = new UserProfileModel(userProfile);
                userProfileModel.save(function (err, res) {
                    resolve();
                });
            }
        });
    }

    async getUserProfiles() {
        return new Promise<any>(resolve => {
            UserProfileModel.find(function (err, res) {
                resolve(res);
            });
        });
    }

    async getUserProfile(id) {
        return new Promise<mongoose.Document>(resolve => {
            UserProfileModel.findById(id, function (err, res) {
                resolve(res);
            });
        });
    }

    async deleteUserProfile(id) {
        return new Promise<mongoose.Document>(resolve => {
            UserProfileModel.findByIdAndRemove(id, function (err, res) {
                resolve(res);
            });
        });        
    }
}