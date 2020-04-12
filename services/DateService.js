

module.exports = class DateService{
  
    toISO(date){
      return  date.toISOString()
    }

    toString(date){
      //console.log(date)
      let newDate = ''
     const [fullDate, fullTime] = date.toISOString().split('T')
     const [year, month, day] = fullDate.slice(0, 10).split('-')
   //  const [hour, minute, second] = fullTime.slice(0, 8).split(':') későbbi felhasználásra
     return newDate = year + ' ' +month+ '. '+day+ '.'
    }


}