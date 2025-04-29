const express = require('express');
const Middleware = require('./utils/middleware')
const contactsApiRoutes = require('./routes/contacts_api_route')
const contactsPageRoutes = require('./routes/contacts_pages_route')
const logsRoutes = require('./routes/logs_route')
const dotenv = require('dotenv')

dotenv.config(
    {
        path: '.env.local'
    }
)
const app = express();
const PORT = process.env.PORT
const API = '/api/'
const middleware = new Middleware('contact_logs.txt')

// Static files and middleware
app.use(express.static('./public'))
app.use(express.json())
app.use(express.urlencoded({
    extended: true
}))

// Custom Middleware
app.use(middleware.logs)

// Routes
app.use(API, logsRoutes)
app.use(`${API}contacts`, contactsApiRoutes)
app.use('/', contactsPageRoutes)

app.listen(PORT, () => console.log(`Listening on port ${PORT}.`))