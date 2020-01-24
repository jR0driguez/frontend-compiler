function Processors() {

    const js = new (require('./js'))();
    Object.defineProperty(this, 'js', {'get': () => js});

    const jsx = new (require('./jsx'))();
    Object.defineProperty(this, 'jsx', {'get': () => jsx});

    const scss = new (require('./scss'))();
    Object.defineProperty(this, 'scss', {'get': () => scss});

}

module.exports = Processors;