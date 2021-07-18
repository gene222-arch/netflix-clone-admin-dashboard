import { format } from 'date-fns'

export const timeStamp = () => Math. floor(Date. now() / 1000); 

export const today = () => format((new Date(Date.now())), 'yyyy-MM-dd');