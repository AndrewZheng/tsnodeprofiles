"use strict";
class Config {
    constructor() {
        this.db = 'mongodb://localhost/tsnodeprofiles';
        this.session_secret = 'tsnodeprofiles_session';
        this.port = process.env.PORT || 3000;
    }
}
exports.Config = Config;
//# sourceMappingURL=config.js.map