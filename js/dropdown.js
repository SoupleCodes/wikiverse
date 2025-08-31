function setupDropdown(kv, parent) {
    const p = document.querySelector(parent)
    p.style.position = 'relative'

    let dropd = document.createElement('div') 
    dropd.classList.add('dropdown', 'hidden')

    let dropdUL = document.createElement('ul')
    for (const [k, v] of Object.entries(kv)) {
        let a = document.createElement('a')
        a.href = v

        let li = document.createElement('li')
        li.textContent = k

        a.appendChild(li)
        dropdUL.appendChild(a)
    }
    dropd.appendChild(dropdUL)
    p.appendChild(dropd)

    p.addEventListener('click', () => {
        dropd.classList.toggle('hidden')
    })
}