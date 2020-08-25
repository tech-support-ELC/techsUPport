import React, { useState } from 'react'
import { connect } from 'react-redux'
import { updateSingleDoctor } from '../redux/singleDoctor'
import { Link } from 'react-router-dom'


export function UpdateDoctor(props) {
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [address, setAddress] = useState('')
    const [doctorType, setDoctorType] = useState('')

    const handleSubmit = (event) => {
        event.preventDefault()
        console.log(props)
        const userId = props.currentUser.id
        const id = props.doctor.id
        const payload = { firstName, lastName, address, doctorType, userId }
        for (let key in payload) {
            if (payload[key] === '') {
                delete payload[key]
            }
        }
        props.updateDoctor(id, payload)
    }


    return (
        <div>
            <form onSubmit={(event) => handleSubmit(event)}>
                <h1>Update This Doctor</h1>
                <div>
                    <input
                        type="text"
                        placeholder="first name or title"
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                    />
                </div>
                <br />

                <div>
                    <input
                        type="text"
                        placeholder="last name"
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                    />
                </div>
                <br />

                <div>
                    <input
                        type="text"
                        placeholder="office address"
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                    />
                </div>
                <br />

                <div>
                    <input
                        type="text"
                        placeholder="specialty"
                        value={doctorType}
                        onChange={(e) => setDoctorType(e.target.value)}
                    />
                </div>
                <br />
                <button type='submit'>Add A Doctor</button>
                <Link to='/medications'>Add A Medication</Link>
            </form>

        </div>
    )
}
const mapStateToProps = state => {
    return {
        currentUser: state.currentUser
    }
}
const mapDispatchToProps = dispatch => {
    return {
        updateDoctor: (id, updatedDoctor) => dispatch(updateSingleDoctor(id, updatedDoctor))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(UpdateDoctor)