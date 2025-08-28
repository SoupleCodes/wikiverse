function setupCarousel(containerID, content, itemWidth) {
    const container = document.getElementById(containerID)
    if (!container) throw new Error('Carousel container missing!')

    container.innerHTML = ''
    container.classList.add('carousel')

    let arrowLeft = document.createElement('div'); arrowLeft.classList.add('carousel-arrow'); container.appendChild(arrowLeft)
    const containerContent = document.createElement('div'); containerContent.classList.add('carousel-content')
    containerContent.appendChild(content)
    container.appendChild(containerContent)
    let arrowRight = document.createElement('div'); arrowRight.classList.add('carousel-arrow', 'right'); container.appendChild(arrowRight)

    arrowLeft.addEventListener('click', () => containerContent.scrollLeft -= itemWidth)
    arrowRight.addEventListener('click', () => containerContent.scrollLeft += itemWidth)
}