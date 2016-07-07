"use strict";
const mongoose = require('mongoose');
const mg = require('mongoose-gen');
class UserProfile {
    constructor() {
        this.name = "UserProfiles";
        this.default = {
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
        this.schema = new mongoose.Schema(mg.convert(this.default));
        this.model = mongoose.model(this.name, this.schema);
    }
}
exports.UserProfile = UserProfile;
//# sourceMappingURL=user-profile.js.map