import * as mongoose from 'mongoose';
import * as mg from 'mongoose-gen';

export class UserProfile {
    name = "UserProfiles";
    default = {
        Id: '',
        EmployeeNumber: '',
        DisplayName: '',
        FirstName: '',
        LastName: '',
        Email: '',
        Location: '',
        Role: '',
        Discipline: '',
        Thumbnail: '',
        CreatedAt: '',
        Profile: {
            Summary: '',
            KeySkills: [
                ''
            ],
            CareerHistories: [
                {
                    DateTime: '',
                    Title: '',
                    Company: '',
                    Location: ''
                }
            ],
            Educations: [
                {
                    DateTime: '',
                    Degree: '',
                    School: '',
                    Location: ''
                }
            ],
            Languages: [
                {
                    Name: '',
                    Level: ''
                }
            ],
            CertificatesAndAwards: [
                ''
            ]
        }
    };
    schema: mongoose.Schema;
    model: mongoose.Model<mongoose.Document>;

    constructor() {
        this.schema = new mongoose.Schema(mg.convert(this.default));
        this.model = mongoose.model(this.name, this.schema);
    }
}