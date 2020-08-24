import React, { useState } from 'react'
import { connect } from 'react-redux'
import { addDoctorThunk } from '../redux/doctors'
import { Link } from 'react-router-dom'


export function AddDoctor(props) {
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [address, setAddress] = useState('')
    const [doctorType, setDoctorType] = useState('')

    const handleSubmit = (event) => {
        event.preventDefault()
        console.log(props)
        const userId = props.currentUser.id

        const payload = { firstName, lastName, address, doctorType, userId }
        props.addNewDoctor(payload)
    }


    return (
        <div>
            <form onSubmit={(event) => handleSubmit(event)}>
                <h1>Add Your New Doctor</h1>
                <div>
                    <input
                        type="text"
                        required
                        placeholder="first name or title"
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                    />
                </div>
                <br />

                <div>
                    <input
                        type="text"
                        required
                        placeholder="last name"
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                    />
                </div>
                <br />

                <div>
                    <input
                        type="text"
                        required
                        placeholder="office address"
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                    />
                </div>
                <br />

                <div>
                    <input
                        type="text"
                        required
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
        addNewDoctor: (newDoctor) => dispatch(addDoctorThunk(newDoctor))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AddDoctor)