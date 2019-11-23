class Processors {

    constructor() {
        this._js = new (require('./js'))();
        this._jsx = new (require('./jsx'))();
    }

    get js() {
        return this._js;
    }

    get jsx() {
        return this._jsx;
    }
}

module.exports = Processors;