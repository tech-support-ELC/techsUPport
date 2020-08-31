const { expect } = require('chai')
// const doctorsAPI = require('../api/doctors')
const request = require('supertest')
const app = require('../index')
const Doctor = require('../db/models/doctor')
const authenticatedUser = request.agent(app)

const userCredentials = {
    email: "cody@email.com",
    password: '123'
}

describe('Routes', () => {

    beforeEach((done) => {
        authenticatedUser
            .post('/login')
            .send(userCredentials)
        done()
        // .end(function (err, response) {
        //     expect(response.statusCode).to.equal(200);
        //     done();
        // });
    })
    console.log(authenticatedUser)
    describe('/doctors', () => {
        describe('GET /doctors', () => {
            it('sends all doctors for a specific user', async () => {
                const response = await authenticatedUser.get('/api/doctors')
                expect(response.body).to.be.an('array')
                expect(response.body.length).to.equal(3)
                expect(response.body).to.deep.equal([
                    {
                        firstName: "Aretha",
                        lastName: "Magill",
                        address: "05171 1st Lane",
                        doctorType: "Cardiologist",
                        userId: 1,
                    },
                    {
                        firstName: "Ches",
                        lastName: "Milius",
                        address: "64936 Bay Lane",
                        doctorType: "Psychiatrist",
                        userId: 1,
                    },
                    {
                        firstName: "Pyotr",
                        lastName: "O'Carmody",
                        address: "46 Graedel Street",
                        doctorType: "Psychologist",
                        userId: 1,
                    },
                ])
            })
        })
    })
    describe('GET /doctors/:id', () => {
        it('sends a speciifc doctor back', async () => {
            const specificDoc1 = await authenticatedUser.get('/api/doctors/1')
            expect(specificDoc1.body).to.be.an('object')
            expect(specificDoc1.firstName).to.equal('Aretha')

            const specificDoc23 = await authenticatedUser.get('/api/doctors/23')
            expect(specificDoc23.body).to.be.an('object')
            expect(specificDoc23.doctorType).to.equal('Psychologist')
        })
    })

    describe('POST /doctors', () => {
        it('creates a new doctor and sends back the new doctor', async () => {
            const newDoc = await authenticatedUser.post('/api/doctors')
                .send({
                    firstName: 'Victor',
                    lastName: 'Frankenstein',
                    address: '201 University of Ingolstadt',
                    doctorType: 'Rejuvenation'
                })
                .expect(201)

            expect(newDoc.body).to.be.an('object')
            expect(newDoc.firstName).to.equal('Victor')


            const Frank = await Doctor.findOne({
                where: {
                    firstName: 'Victor'
                }
            })
            expect(Frank).to.be.an('object')
            expect(Frank.lastName).to.equal('Frankenstein')
        })
    })
    describe('PUT /doctors/:id', () => {
        it('updates a doctor and sends back the updated info', async () => {
            const updatedDoc = Doctor.findOne({ where: { firstName: 'Victor' } })
            const id = updatedDoc.id
            const update = await authenticatedUser.put(`/api/doctors/${id}`, { firstName: 'Mary', lastName: 'Shelley' })
            expect(update.firstName).to.equal('Mary')
            expect(update.doctorType).to.equal('Rejuvenation')

        })
    })

    describe('DELETE /doctors/:id', () => {
        it('deletes a doctor when given an id', async () => {
            const docToDelete = await Doctor.findOne({ where: { firstName: 'Mary', lastName: 'Shelley' } })
            const id = docToDelete.id
            await authenticatedUser.delete(`/api/doctors/${id}`).expect(204)
            const isDocStillThere = await Doctor.findById(id)
            expect(isDocStillThere).to.equal(null)

        })
    })

})
