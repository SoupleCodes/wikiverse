export function formatDate(dateString) {
    const date = new Date(dateString);
    const hours = date.getUTCHours();
    const minutes = date.getUTCMinutes();
    const seconds = date.getUTCSeconds();
    const month = date.getUTCMonth();
    const day = date.getUTCDate();
    const year = date.getUTCFullYear();
  
    const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

    const formattedDate = `${monthNames[month]} ${day} ${year}, ${hours}:${minutes.toString().padStart(2, '0')}:${seconds} UTC`;
    return formattedDate;
}  