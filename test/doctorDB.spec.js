const { expect } = require('chai')
// const db = require('../db/db') -- need to make a test db
const { Doctor, Appointment, User } = require('../server/db/models/index')

describe('Doctor model', () => {
    describe('column definitions and validations', () => {
        it('has a firstName, lastName, address, and doctorType ', async () => {
            const doctor = await Doctor.create({
                firstName: 'Leonard',
                lastName: 'McCoy',
                address: 'Starship Enterprise',
                doctorType: 'Internal Medicine'
            })
            expect(doctor.firstName).to.equal('Leonard')
            expect(doctor.lastName).to.equal('McCoy')
            expect(doctor.address).to.equal('Starship Enterprise')
            expect(doctor.doctorType).to.equal('Internal Medicine')
        })

        it('all values are required', async () => {
            const doctor = Doctor.build({ firstName: '', lastName: '' })
            try {
                await doctor.validate()
                throw Error(
                    "validation should have failed with empty values"
                )
            } catch (err) {
                expect(err.message).to.contain("validation notEmpty on firstName")
                expect(err.message).to.contain("validation notEmpty on lastName")
            }

        })

        it('Doctor has a belongstomany association with User through Appointments', () => {
            const doctor = await Doctor.create({
                firstName: 'Mindy',
                lastName: 'Lahiri',
                address: 'Shulman and Associates',
                doctorType: 'OB/GYN'
            })
            const user = await User.create({
                firstName: 'Morgan',
                lastName: 'Tookers',
                email: "morgan@morgan.com",
                password: 'hello'
            })

            await user.setAppointment(doctor, { appointmentDate: '2019-8-13', time: '13:01' })
            const appointment = await user.getAppointments()
            expect(appointment).to.be.an('array')
            expect(appointment.length).to.equal(1)
        })
    })

})


