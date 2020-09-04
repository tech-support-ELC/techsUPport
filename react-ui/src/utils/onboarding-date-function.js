import moment from 'moment'


export default function checkDay(stringDate) {
    if (moment(stringDate).isSameOrBefore(moment().subtract(24, 'hours'))) {
        return true
    } else {
        return false
    }
}

export function possibleData(stringDate) {
    if (moment(stringDate).isSameOrBefore(moment().subtract(1, 'week'))) {
        return true
    } else {
        return false
    }
}