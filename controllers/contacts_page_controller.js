const path = require('path');

class ContactsPageController {
    constructor() {
        this.rootDir = process.cwd();
    }

    home = (_, res) => res.sendFile(path.join(this.rootDir, 'views', 'index.html'))

    contacts = (_, res) => res.sendFile(path.join(this.rootDir, 'views', 'contacts.html'))

    contactForm = (_, res) => res.sendFile(path.join(this.rootDir, 'views', 'contact-form.html'))

    contactLogs = (_, res) => res.sendFile(path.join(this.rootDir, 'views', 'contact-logs.html'))

    contactDetail = (_, res) => res.sendFile(path.join(this.rootDir, 'views', 'contact-detail.html'))
}

module.exports = ContactsPageController;