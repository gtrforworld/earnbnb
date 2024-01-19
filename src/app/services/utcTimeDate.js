import moment from 'moment';

const formatUtcDate = (dateString) => {
    // Create a moment object in UTC
    const utcMoment = moment.utc(dateString);
  
    // Format the UTC moment object with year, month, date, hour, minutes, and seconds
    const formattedDate = utcMoment.format('YYYY-MM-DD HH:mm:ss');
  
    return formattedDate;
};

export default formatUtcDate;
