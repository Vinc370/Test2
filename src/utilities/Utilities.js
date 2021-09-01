import ReactGa from 'react-ga'

export const clickGAHandler = (category, action) => {
  if(process.env.NODE_ENV === 'production'){
    ReactGa.event({
      category: category,
      action: action
    })
  }
}

export const getMoneyValue = money => {
  money = money.replaceAll(".", "");
  const x = Number(money);

  return x;
}

export const setLoadingText = (text) => {
  if(text === undefined) return 'Loading...';
  if(text === null) return 'Loading...'
  return text
}

export const getMoneyFormat = money=>{
  if(setLoadingText(money) === 'Loading...') return setLoadingText(money);
  return new Intl.NumberFormat('id-ID',
    { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }
  ).format(money);
};

export const isNotEmpty = (obj) => {
  return Object.keys(obj).length >= 0;
}

export const getDateFormat = (date, day = true, d = true, m = "mmmm", y = true, hour=false, minute=false, second=false, betweenDateTime=false) => {
  if(setLoadingText(date) === 'Loading...') return setLoadingText(date);

  let dateTime = new Date(date)
  let formatted_date = []

  const dayName = ["Minggu","Senin","Selasa","Rabu","Kamis","Jumat","Sabtu"]
  const mmm = ["Jan", "Feb", "Mar","Apr", "May", "Jun", "Jul", "Agu", "Sep", "Okt", "Nov", "Des"];
  const mmmm = ["Januari", "Februari", "Maret","April", "Mei", "Juni", "Juli", "Agustus", "September", "Oktober", "November", "Desember"];

  if(day) formatted_date.push(dayName[dateTime.getDay()]+",")
  if(d) formatted_date.push(dateTime.getDate())
  if(m) {
    if(m === "mmm") formatted_date.push(mmm[dateTime.getMonth()])
    else if(m === "mmmm") formatted_date.push(mmmm[dateTime.getMonth()])
    else formatted_date.push(dateTime.getMonth())
  }
  if(y) {
    formatted_date.push(dateTime.getFullYear())
  }
  if(betweenDateTime!==false){
    formatted_date.push(betweenDateTime)
  }
  if(hour) {
    let time = []
    let finalTime = ""

    time.push(dateTime.getHours())
    if(minute) {
      time.push(dateTime.getMinutes())
      if(second) {
        time.push(dateTime.getSeconds())
      }
    }
    finalTime = time.join(":")

    formatted_date.push(finalTime)
  }

  return formatted_date.join(" ")
}

export const getDifferenceDate = (date=null, day=true, month=false, year=false) => {
  if(date !== null && date !== undefined) {
    const date1 = new Date()
    const date2 = new Date(date)
    
    if(year) {
  
    } else if (month) {
      
    } else if (day) {
      const Difference_In_Time = date2.getTime() - date1.getTime();
      const Difference_In_Days = parseInt(Difference_In_Time / (1000 * 3600 * 24));
  
      return Difference_In_Days
    }
  }
}

export const processWords = (str) => {
  str = str.toLowerCase()
  str = str.split(' ').join("-");

  return str
}