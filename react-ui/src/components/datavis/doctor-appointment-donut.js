import DonutChart from 'react-d3-donut'
import React from 'react'
import { updateDonut } from '../../utils/update-donut'
import { connect } from 'react-redux'

export function doctorAppointmentDonut(props) {
    const appointmentData = props.appointment
    const doctorData = props.doctors

    const data = updateDonut(appointmentData, doctorData)
    return (
        <div>
            <h4>My Appointments Over Time</h4>
            <DonutChart
                innerRadius={30}
                outerRadius={80}
                transition={true}
                svgClass="example6"
                pieClass="pie6"
                displayTooltip={true}
                strokeWidth={3}
                data={data} />
        </div>
    )
}

const mapState = (state) => {
    return {
        doctors: state.doctors,
        appointment: state.appointment
    }
}

export default connect(mapState, null)(doctorAppointmentDonut)