import React, { useState } from 'react'
import { connect } from 'react-redux'
import { addDoctorThunk } from '../redux/doctors'


export function AddDoctor(props) {
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [address, setAddress] = useState('')
    const [doctorType, setDoctorType] = useState('')

    const handleSubmit = () => {
        const payload = { firstName, lastName, address, doctorType }
        //how to get userid???
        props.addNewDoctor(payload)
    }

    return (
        <div>
            <form onSubmit={() => handleSubmit()}>
                <h1>Add a New Doctor</h1>
                <div>
                    <input
                        className="input"
                        placeholder="first name or title"
                        type="text"
                        name="firstName"
                        onChange={(firstName) => setFirstName(firstName)}
                        value={firstName}
                    />
                </div>
                <br />

                <div>
                    <input
                        className="input"
                        placeholder="last name"
                        type="text"
                        name="lastName"
                        onChange={(lastName) => setLastName(lastName)}
                        value={lastName}
                    />
                </div>
                <br />

                <div>
                    <input
                        className="input"
                        placeholder="office address"
                        type="text"
                        name="address"
                        onChange={(address) => setAddress(address)}
                        value={address}
                    />
                </div>
                <br />

                <div>
                    <input
                        className="input"
                        placeholder="specialty"
                        type="text"
                        name="doctorType"
                        onChange={(doctorType) => setDoctorType(doctorType)}
                        value={doctorType}
                    />
                </div>
                <br />

            </form>

        </div>
    )
}

const mapDispatchToProps = dispatch => {
    return {
        addNewDoctor: (newDoctor) => dispatch(addDoctorThunk(newDoctor))
    }
}

export default connect(null, mapDispatchToProps)(AddDoctor)