

export const countAppointments = (appointmentData) => {
    let countObj = {}
    for (let i = 0; i < appointmentData.length; i++) {
        let doctorId = appointmentData[i].doctorId
        if (!countObj[doctorId]) {
            countObj[doctorId] = 1
        } else {
            countObj[doctorId] += 1
        }
    }
    return countObj
}


export const updateDonut = (appointmentData, doctorData) => {
    console.log('inside update donut function')
    let newAppointmentData = []
    let colorsArray = ['#DA291C', '#FFB20F', '#184A45', '#76B041', '#95DBE5', '#FF9F1C', '#94DBE5', '#56A8CB', '#080357', '#339E66']
    let countObj = countAppointments(appointmentData)
    let arrOfDocId = Object.keys(countObj)
    let formattedObj = {}


    for (let i = 0; i < arrOfDocId.length; i++) {
        for (let j = 0; j < doctorData.length; j++) {
            if (Number(arrOfDocId[i]) === doctorData[j].id) {
                let colorIndex = i % colorsArray.length
                formattedObj.count = countObj[doctorData[j].id]
                formattedObj.color = colorsArray[colorIndex]
                formattedObj.name = `${doctorData[j].firstName} ${doctorData[j].lastName}`
                newAppointmentData.push(formattedObj)
                formattedObj = {}
            }
        }

    }


    return newAppointmentData
}



