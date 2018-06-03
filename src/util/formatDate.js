import DateUtilsService from '../services/DateUtilsService';

const formatDate = input => `${DateUtilsService.formatDate(input)}  ${DateUtilsService.formatTime(input)}`;

export default formatDate;
