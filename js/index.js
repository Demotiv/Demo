//------------------------------//
// Header

//Tablet menu

const hamburgerLines = document.querySelector('.lines')
const hamburgerLine = document.querySelectorAll('.line')
const tabletMenu = document.querySelector('.tablet-menu')
const navLinks = document.querySelectorAll('.link')

hamburgerLines.addEventListener('click', () => {
  hamburgerLine.forEach((line, index) => {
    line.classList.toggle(`active-line-${index + 1}`)
    tabletMenu.classList.toggle('active')
    dropDown.classList.remove('active')

    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        line.classList.remove(`active-line-${index + 1}`)
        tabletMenu.classList.remove('active')
      })
    })

    userIcon.forEach(icon => {
      icon.addEventListener('click', () => {
        line.classList.remove(`active-line-${index + 1}`)
        tabletMenu.classList.remove('active')
      })
    })
  })
})


// Drop-Down menu

const dropDown = document.querySelector('.dropMenu')
const userIcon = document.querySelectorAll('.icon-profile')
  
userIcon.forEach(icon => {
  icon.addEventListener('click', () => {
    dropDown.classList.toggle('active')
  })
})

// Remove classNames

document.addEventListener('click', event => {
  const hamburgerClick = event.target.closest('.hamburger')
  const tabletMenuClick = event.target.closest('.tablet-menu')
  const registerModalClick = event.target.closest('.register')
  const modalBackDrop = event.target.closest('.modal-backdrop')

  if (window.matchMedia("(max-width: 768px)").matches) {
    if (!hamburgerClick && !tabletMenuClick) {
      tabletMenu.classList.remove('active')
      dropDown.classList.remove('active')
      hamburgerLine.forEach((line, index) => {
        line.classList.remove(`active-line-${index + 1}`)
      })
    }
  }

  if (!registerModalClick && modalBackDrop) {
    registerModal.classList.remove('active')
    modalBackDrop.classList.remove('active')
  }
})

// Register
const registerModal = document.querySelector('.register')
const modalBackDrop = document.querySelector('.modal-backdrop')

document.addEventListener('click', () => {
  const registerLinks = document.querySelectorAll('a[href="#register"]')
  // const registerModal = document.querySelector('.register')
  // const modalBackDrop = document.querySelector('.modal-backdrop')
  const registerLines = document.querySelectorAll('.register__lines-container')

  registerLinks.forEach(link => {
    link.addEventListener('click', event => {
      event.preventDefault()
      registerModal.classList.add('active')
      modalBackDrop.classList.add('active')
      dropDown.classList.remove('active')
    })
  })

  registerLines.forEach(line => {
    line.addEventListener('click', () => {
      registerModal.classList.remove('active')
      modalBackDrop.classList.remove('active')
    })
  })
})

//------------------------------//
// Section About

// Carousel

const carouselSlide = document.querySelectorAll('.carousel__slide')
const carouselBtn = document.querySelectorAll('.carousel__btn')
const carouselTabletBtn = document.querySelectorAll('.carousel__tablet-btn')

if (carouselSlide.length && carouselBtn.length && carouselTabletBtn.length) {
  let rightValue = 0
  let slidePos = 34
  let slidePosTablet = 105.5
  let selectedBtnIndex = 0

  carouselBtn.forEach((btn, index) => {
    btn.addEventListener('click', () => {
      carouselBtn.forEach(el => {
        el.classList.remove('selected')
      })
      btn.classList.add('selected')
      selectedBtnIndex = index

      carouselSlide.forEach(slide => {
        rightValue = slidePos * index

        if (window.matchMedia("(max-width: 768px)").matches) {
          rightValue = slidePosTablet * index
        }

        slide.style.right = rightValue + '%'
      })
    })
  })

  // Tablet
  
  carouselTabletBtn.forEach((btn, index) => {
    btn.addEventListener('click', () => {
        carouselSlide.forEach(slide => {
            let currentRightValue = parseFloat(slide.style.right) || 0

            rightValue = index == 0 && currentRightValue == 0 ? (carouselSlide.length - 1) * slidePosTablet :
            index == 0 ? currentRightValue - slidePosTablet :
            index == 1 && currentRightValue == (carouselSlide.length - 1) * slidePosTablet ? 0 :
            index == 1 ? currentRightValue + slidePosTablet : rightValue
            
            rightValue = Math.max(0, Math.min(rightValue, (carouselSlide.length - 1) * slidePosTablet))
            
            slide.style.right = rightValue + '%'
        })
        
        carouselBtn.forEach(button => {
            button.classList.remove('selected')
        })
        
        const selectedSlideIndex = Math.round(rightValue / slidePosTablet)
        
        carouselBtn[selectedSlideIndex].classList.add('selected')
        selectedBtnIndex = selectedSlideIndex
    })
  })
}

//------------------------------//
// Favorites block

const radioBtn = document.querySelectorAll('.radio-container input[type="radio"]')
const books = document.querySelectorAll('.books-wrapper')

radioBtn.forEach((radio, indexBtn) => {
  radio.addEventListener('click', () => {
    let rightValue = 0
    let slidePos = 1620

    books.forEach((book, indexBook) => {
      book.classList.remove('fadeIn', 'fadeOut')

      if (indexBtn !== indexBook) {
        book.classList.add('fadeOut')
      } else {
        book.classList.add('fadeIn')
      }

      rightValue = indexBook * slidePos

      switch (indexBook) {
        case 0:
          tablet()
          book.style.right = rightValue + 'px'
          break
        case 1:
          tablet()
          book.style.right = rightValue + 'px'
          break
        case 2:
          tablet()
          book.style.right = rightValue + 'px'
          break
        case 3:
          tablet()
          book.style.right = rightValue + 'px'
          break
      }

      function tablet () {
        if (window.matchMedia("(max-width: 768px)").matches) {
          rightValue = indexBook * (slidePos / 2)
        }
        return rightValue
      }
    })
  })
})