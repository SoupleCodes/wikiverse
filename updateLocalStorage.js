// This function will update userData in localstorage whenever they make changes to their profile:

function updateStorage(column, value, whole) {
    let userData = localStorage.getItem(localStorage.getItem('loggedInAs'))
    if (userData) {
        userData = JSON.parse(userData)
        if (whole) {
            userData[column] = value
        } else {
            userData.user[column] = value
        }
        localStorage.setItem(localStorage.getItem('loggedInAs'), JSON.stringify(userData))
    }
}