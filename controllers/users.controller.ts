import { UserProfileService } from '../services/user-profile.service';
const userProfileService = new UserProfileService();

export class UsersController {
    async index(req, res, next) {
        var users = await userProfileService.getUserProfiles()
        if (users) {
            res.render('users/index', { users: users });
        }
    }

    create(req, res, next) {
        res.render('users/edit');
    }

    async edit(req, res, next) {
        var id = req.query.id;
        var userProfile = await userProfileService.getUserProfile(id);
        return res.render('users/edit', userProfile);
    }

    update(req, res, next) {
        var userProfile = {
            Id: req.body.id,
            FirstName: req.body.firstname,
            LastName: req.body.lastname,
            Email: req.body.email,
            Location: req.body.location,
            Discipline: req.body.discipline,
            Profile: {
                Summary: req.body.summary
            }
        };
        userProfileService.saveUserProfile(userProfile)
            .then(function () {
                return res.redirect('/users');
            });
    }
    
    async delete(req, res, next) {
        var id = req.query.id;
        await userProfileService.deleteUserProfile(id)
        return res.redirect('/users');
    }
}