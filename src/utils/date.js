import { format } from 'date-fns'

const monthDays = 
{
    1: 31,
    2: 28,
    3: 31,
    4: 30,
    5: 31,
    6: 30,
    7: 31,
    8: 31,
    9: 30,
    10: 31,
    11: 30,
    12: 31
};

export const timeStamp = () => Math. floor(Date. now() / 1000); 

export const today = () => format((new Date(Date.now())), 'yyyy-MM-dd');

export const isValidKeyboardDatePickerDate = (value) =>
{
    const date = new Date();
    const [ year, month, day ] = value.replaceAll('_', '').split('-');

    if (year.length === 4 && date.getFullYear() < year) return false;

    if (month.length === 2 && month > 12) return false;

    if (day.length === 2 && day > monthDays[month]) return false;

    return true;
}