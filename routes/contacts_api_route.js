const express = require('express');
const ContactsApiController = require('../controllers/contacts_api_controller');

const contactsApiController = new ContactsApiController()
const router = express.Router()

router.route('/').get(
    contactsApiController.getContacts
).post(
    contactsApiController.createContact
)

router.route('/:contactId').get(
    contactsApiController.retrieveContact
).put(
    contactsApiController.updateContact
).delete(
    contactsApiController.deleteContact
)

module.exports = router