
// Date should be in the form 2023-07-17T11:30:28.342Z
export const formatDateToDDMMYY = (inputDate) => {
    const date = new Date(inputDate);
    
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = String(date.getFullYear()).slice(-2);
    
    return `${day}/${month}/${year}`;
  }
  

  