
// Date should be in the form 2023-07-17T11:30:28.342Z
export const formatDateToDDMMYY = (inputDate) => {
    const date = new Date(inputDate);
    
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = String(date.getFullYear()).slice(-2);
    
    return `${day} / ${month} / ${year}`;
  }
  

// Date function to convert 1999-10-20T00:00:00+00:00 to Oct 20, 1999

export const toMMDDYYY = (inputDate) => {
    const months = [
        "Jan", "Feb", "Mar", "Apr", "May", "Jun",
        "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
      ];
    
      const date = new Date(inputDate);
      const monthAbbreviation = months[date.getMonth()];
      const day = date.getDate();
      const year = date.getFullYear();
    
      const formattedDate = `${monthAbbreviation} ${day}, ${year}`;
      return formattedDate;
}