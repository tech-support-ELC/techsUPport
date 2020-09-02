import moment from 'moment'


export default function checkDay(stringDate) {
    if (moment(stringDate).isSameOrBefore(moment().subtract(24, 'hours'))) {
        return true
    } else {
        return false
    }
}