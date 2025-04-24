const path = require('path');
const MiscServices = require('../services/misc_services');

class ContactsController {
    constructor() {
        this.contactsDB = path.join(process.cwd(), 'models', 'contacts.json')
    }

    getContacts = async (_, res) => {
        const data = await MiscServices.readDB(this.contactsDB);
        res.json(JSON.parse(data));
    }

    createContact = async (req, res) => {
        const { firstName, lastName, contact, birthday } = req.body;
        if (firstName && lastName && contact && birthday) {
            const id = new Date().getTime();
            const data = JSON.parse(await MiscServices.readDB(this.contactsDB));
            data.push({ id, ...req.body });
            MiscServices.updateDB(this.contactsDB, JSON.stringify(data))
            res.status(201).json({ "status": "Success" });
        }
        else {
            res.status(400).json({
                'message': 'First Name, Last Name, Birthday and Contact are required fields.'
            })
        }
    };

    retrieveContact = async (req, res) => {
        const data = JSON.parse(await MiscServices.readDB(this.contactsDB));
        const contactId = req.params['contactId']
        let foundContact = false;
        for (let ele of data) {
            if (ele['id'] == contactId) {
                res.json(ele);
                foundContact = true;
                break;
            }
        }
        if (!foundContact) {
            res.status(404).json({ 'message': "Contact not found." })
        }
    }

    updateContact = async (req, res) => {
        const { firstName, lastName, contact, birthday } = req.body;
        if (firstName && lastName && contact && birthday) {
            const data = JSON.parse(await MiscServices.readDB(this.contactsDB));
            const contactId = req.params['contactId'];
            let foundContact = false;
            for (let i = 0; i < data.length; i++) {
                const ele = data[i];
                if (ele['id'] == contactId) {
                    data[i] = { ...ele, ...req.body };
                    foundContact = true;
                    break;
                }
            }
            if (foundContact) {
                MiscServices.updateDB(this.contactsDB, JSON.stringify(data))
                res.status(202).json({ "status": "Success" });
            }
            else {
                res.status(404).json({
                    'message': "Contact not found"
                })
            }
        }
        else {
            res.status(400).json({
                'message': 'First Name, Last Name, Birthday and Contact are required fields.'
            })
        }
    }

    deleteContact = async (req, res) => {
        const data = JSON.parse(await MiscServices.readDB(this.contactsDB));
        const contactId = req.params['contactId']
        const sanitizedContacts = data.filter(({ id }) => id != contactId);
        await MiscServices.updateDB(this.contactsDB, JSON.stringify(sanitizedContacts));
        res.status(204).end();
    }
}

module.exports = ContactsController