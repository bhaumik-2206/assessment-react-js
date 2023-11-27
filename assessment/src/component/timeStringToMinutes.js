function timeStringToMinutes(timeString) {
    const [time, period] = timeString.split(' ');
    const [hours, minutes] = time.split(':');
    let totalMinutes = parseInt(hours) * 60 + parseInt(minutes);
    if (period.toLowerCase() === 'pm' && hours !== '12') {
        totalMinutes += 12 * 60;
    }
    return totalMinutes;
}

export default timeStringToMinutes;