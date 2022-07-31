
export const formatDateString = (json_date, language = "DE") => {
    const date = new Date(json_date)
    const currentDate = new Date()
    const diff = currentDate.getTime() - date.getTime()



    if ((diff / 1000) <= 60) {
      return secondsAgo(language)
    }
    else if ((diff / 1000 / 60) < 60) {
      //minutes ago
      return minutesAgo(Math.floor((diff / 1000 / 60)).toString(), language)
    }
    else if ((diff / 1000 / 60 / 60) < 24) {
      //hours ago
      return hoursAgo(Math.floor((diff / 1000 / 60 / 60)).toString(), language)
    }
    else if ((diff / 1000 / 60 / 60 / 24) < 10) {
      //hours ago
      return daysAgo(Math.floor((diff / 1000 / 60 / 60 / 24)).toString(), language)
    }

    return date.toLocaleDateString()
  }

export const secondsAgo = (language) => {
    switch (language) {
      case "DE":
        return "Vor wenigen Sekunden"
      case "EN":
        return "Seconds ago"

      default:
        break;
    }
  }
export const minutesAgo = (number, language) => {
    switch (language) {
      case "DE": if (number == 1) {
        return "Vor " + number + " Minute"
      }
        return "Vor " + number + " Minuten"
      case "EN":
        if (number == 1) {
          return number + " minute ago"
        }
        return number + " minutes ago"

      default:
        break;
    }
  }
export const hoursAgo = (number, language) => {

    switch (language) {
      case "DE":
        if (number == 1) {
          return "Vor " + number + " Stunde"
        }
        return "Vor " + number + " Stunden"
      case "EN":
        if (number == 1) {
          return number + " hour ago"
        }
        return number + " hours ago"

      default:
        break;

    }
    return "break"
  }
  
export const daysAgo = (number, language) => {
    switch (language) {
      case "DE":
        return "Vor " + number + " Tagen"
      case "EN":
        return number + " days ago"

      default:
        break;
    }
  }

export const formatTooLongText = (text) =>{
    if(text.length > 300){
      return text.substring(0, 260) + " ..."
    }
    return text
  }
