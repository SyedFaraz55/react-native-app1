export const convertDate = (date) => {
    let month = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
    const dateArr = date.toString().split(' ').slice(1, 4);
    const deg = month.indexOf(dateArr[0]) + 1
    const zeroDeg = ('0' + deg).slice(-2)  // '04'

    const finalDate = `${dateArr[2]}-${zeroDeg}-${dateArr[1]}`
 
    return finalDate
    
  };