const express = require('express')
const ContactsPageController = require('../controllers/contacts_page_controller')

const router = express.Router();
const contactsPageController = new ContactsPageController()

router.get('/', contactsPageController.home)

router.get('/contacts', contactsPageController.contacts)

router.get('/contact-form', contactsPageController.contactForm)

router.get('/contact-logs', contactsPageController.contactLogs)

router.get('/contacts/:contactId', contactsPageController.contactDetail)

module.exports = router