const axios = require('axios')

jest.mock('axios')


describe('Contact API Tests', () => {
    const contactsApiURL = 'http://localhost:3000/api/contacts/'

    beforeEach(() => {
        jest.clearAllMocks()
    })

    describe("Get a list contacts tests", () => {

        it("Successfully gets the list of contacts", async () => {
            // Arrange
            const statusCode = 200
            // Act
            const res = await fetch(contactsApiURL)
            // Assert
            expect(res.status).toEqual(statusCode)

        })
    })

    describe("Create a new contact", () => {

        it("Successfully creates a new contact", async () => {
            // Arrange
            const data = { "status": "Success" }
            const statusCode = 201
            const payload = { 'name': 'Stark' }
            axios.post.mockResolvedValue({ data, status: statusCode })

            // Act
            const res = await axios.post(contactsApiURL, payload)

            // Assert
            expect(res.data).toEqual(data)
            expect(res.status).toEqual(statusCode)
            expect(axios.post).toHaveBeenCalledWith(contactsApiURL, payload)
        })

        it("Returns a 400 status code", async () => {
            // Arrange
            const error = {
                'message': 'First Name, Last Name, Birthday and Contact are required fields.'
            }
            const statusCode = 400
            const payload = { 'name': 'Stark' }
            // Act
            const res = await fetch(contactsApiURL, {
                method: "POST",
                body: JSON.stringify(payload),
                headers: {
                    'content-type': 'application/json'
                }
            })
            const json_data = await res.json()
            // Assert
            expect(json_data).toEqual(error)
            expect(res.status).toEqual(statusCode)
        })

    })

    describe("Retrieve contact requests", () => {

        it("Successfully retrieves a contact", async () => {
            // Arrange
            const statusCode = 200
            // Act
            const res = await fetch(`${contactsApiURL}1743526384251/`)
            // Assert
            expect(res.status).toEqual(statusCode)

        })

        it("Returns a 404 status code", async () => {
            // Arrange
            const statusCode = 404
            // Act
            const res = await fetch(`${contactsApiURL}hello/`)
            // Assert
            expect(res.status).toEqual(statusCode)

        })

    })

    describe('PUT requests', () => {

        it("Successfully updates an existing contact", async () => {
            // Arrange
            const data = { "status": "Success" }
            const statusCode = 202
            const payload = { 'name': 'Stark' }
            axios.put.mockResolvedValue({ data, status: statusCode })

            // Act
            const res = await axios.put(`${contactsApiURL}1/`, payload)

            // Assert
            expect(res.data).toEqual(data)
            expect(res.status).toEqual(statusCode)
            expect(axios.put).toHaveBeenCalledWith(`${contactsApiURL}1/`, payload)
        })

        it("Returns a 400 status code when updating a contact", async () => {
            // Arrange
            const error = {
                'message': 'First Name, Last Name, Birthday and Contact are required fields.'
            }
            const statusCode = 400
            const payload = { 'name': 'Stark' }

            // Act
            const res = await fetch(`${contactsApiURL}1743526384251/`, {
                method: "PUT",
                body: JSON.stringify(payload),
                headers: {
                    'content-type': 'application/json'
                }
            })
            const data = await res.json()
            // Assert
            expect(data).toEqual(error)
            expect(res.status).toEqual(statusCode)
        })


        it("Returns a 404 status code when updating a contact", async () => {
            // Arrange
            const error = {
                'message': "Contact not found"
            }
            const statusCode = 404
            const payload = { "firstName": "Ebenezer", "lastName": "Offei", "contact": "0271815776", "birthday": "2025-04-17", "description": "He is a child of God indeed." }

            // Act
            const res = await fetch(`${contactsApiURL}hello/`, {
                method: "PUT",
                body: JSON.stringify(payload),
                headers: {
                    'content-type': 'application/json'
                }
            })
            const data = await res.json()
            // Assert
            expect(data).toEqual(error)
            expect(res.status).toEqual(statusCode)
        })

    })

    describe("DELETE requests", () => {

        it("Successfully deletes a contact", async () => {
            // Arrange
            const statusCode = 204
            axios.delete.mockResolvedValue({ status: statusCode })
            // Act
            const res = await axios.delete(`${contactsApiURL}1743526384251/`)
            // Assert
            expect(res.status).toEqual(statusCode)
            expect(axios.delete).toHaveBeenCalledWith(`${contactsApiURL}1743526384251/`)

        })

    })
})