import moment from 'moment'

export const getWeekDay = (date: Date): string => {
  
  return `Semana ${moment(date).format('W')}`
}