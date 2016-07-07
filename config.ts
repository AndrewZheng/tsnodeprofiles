export class Config {
    db = 'mongodb://localhost/tsnodeprofiles';
    session_secret = 'tsnodeprofiles_session';
    port = process.env.PORT || 3000;
}