import axios from 'axios'

const initialState = []

//ACTION TYPES
const ADD_DOCTOR = 'ADD_DOCTOR'
const GET_ALL_DOCTORS = 'GET_ALL_DOCTORS'
const REMOVE_DOCTOR = 'REMOVE_DOCTOR'
const UPDATE_DOCTORS_LIST = 'UPDATE_DOCTORS_LIST'

//ACTION CREATORS
const addDoctor = doctor => {
    return {
        type: ADD_DOCTOR,
        doctor
    }
}
const deleteDoctor = id => {
    return {
        type: REMOVE_DOCTOR,
        id
    }
}

const getAllDoctors = doctors => {
    return {
        type: GET_ALL_DOCTORS,
        doctors
    }
}

export const updateAllDoctors = (id, doctor) => {
    return {
        type: UPDATE_DOCTORS_LIST,
        id,
        doctor
    }
}

//THUNKS
export const addDoctorThunk = (doctor) => {
    return async dispatch => {
        try {
            let { data } = await axios.post('/api/doctors', doctor)
            dispatch(addDoctor(data))
        } catch (error) {
            console.log(error)
        }
    }
}

export const deleteDoctorThunk = id => {
    return async dispatch => {
        try {
            await axios.delete(`/api/doctors/${id}`)
            dispatch(deleteDoctor(id))
        } catch (error) {
            console.log(error)
        }
    }
}

export const getAllDoctorsThunk = () => {
    return async dispatch => {
        try {
            const { data } = await axios.get('/api/doctors/')
            dispatch(getAllDoctors(data))
        } catch (error) {
            console.log(error)
        }
    }
}



export default function (state = initialState, action) {
    switch (action.type) {
        case GET_ALL_DOCTORS:
            return action.doctors
        case REMOVE_DOCTOR:
            return state.filter(doctor => doctor.id !== action.id)
        case ADD_DOCTOR:
            return [...state, action.doctor]
        case UPDATE_DOCTORS_LIST:
            return [...state].map((doctor) => {
                if (doctor.id === action.id) {
                    return action.doctor
                } else {
                    return doctor
                }
            })
        default:
            return state
    }
}
