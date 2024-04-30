//------------------------------//
// Header

//Tablet menu

const hamburgerLines = document.querySelector('.lines')
const hamburgerLine = document.querySelectorAll('.line')
const tabletMenu = document.querySelector('.tablet-menu')
const navLinks = document.querySelectorAll('.link')

hamburgerLines.addEventListener('click', toogleTabletMenu)

function toogleTabletMenu() {
  hamburgerLine.forEach((line, index) => {
    line.classList.toggle(`active-line-${index + 1}`)
  })
  tabletMenu.classList.toggle('active')
  dropDown.classList.remove('active')

  navLinks.forEach(link => {
    link.addEventListener('click', closeTabletMenu)
  })

  userIcon.forEach(icon => {
    icon.addEventListener('click', closeTabletMenu)
  })
}

function closeTabletMenu() {
  hamburgerLine.forEach((line, index) => {
    line.classList.remove(`active-line-${index + 1}`)
  })
  tabletMenu.classList.remove('active')
}

// Drop-Down menu

const dropDown = document.querySelector('.dropMenu')
const userIcon = document.querySelectorAll('.icon-profile')
  
userIcon.forEach(icon => {
  icon.addEventListener('click', toggleDropDown)
})

function toggleDropDown() {
  dropDown.classList.toggle('active')
}

// Remove classNames

document.addEventListener('click', outsideClick)

function outsideClick(event) {
  const hamburgerClick = event.target.closest('.hamburger')
  const tabletMenuClick = event.target.closest('.tablet-menu')
  const registerModalClick = event.target.closest('.register')
  const logInModalClick = event.target.closest('.log-in')
  const modalBackDropClick = event.target.closest('.modal-backdrop')
  const userIconClick = event.target.closest('.icon-profile')

  if (window.matchMedia("(max-width: 768px)").matches) {
    if (!hamburgerClick && !tabletMenuClick) {
      closeTabletMenu()
      closeDropDown()
    }
  }

  if (!registerModalClick && modalBackDropClick) {
    closeRegisterModal()
  }

  if (!logInModalClick && modalBackDropClick) {
    closeLogInModal()
  }

  if (!userIconClick) {
    closeDropDown()
  }
}

function closeDropDown() {
  dropDown.classList.remove('active')
}

// Register

const registerModal = document.querySelector('.register')
const modalBackDrop = document.querySelector('.modal-backdrop')
const registerLinks = document.querySelectorAll('a[href="#register"]')
const registerLines = document.querySelectorAll('.register__lines-container')

function openRegisterModal() {
  registerModal.classList.add('active')
  modalBackDrop.classList.add('active')
  dropDown.classList.remove('active')
  logInModal.classList.remove('active')
}

registerLinks.forEach(link => {
  link.addEventListener('click', event => {
    event.preventDefault()
    openRegisterModal()
  })
})

function closeRegisterModal() {
  registerModal.classList.remove('active')
  modalBackDrop.classList.remove('active')
}

registerLines.forEach(line => {
  line.addEventListener('click', () => {
    closeRegisterModal()
  })
})

// Log in

const logInModal = document.querySelector('.log-in')
const logInLinks = document.querySelectorAll('a[href="#log-in"]')
const logInLines = document.querySelectorAll('.log-in__lines-container')

function openLogInModal() {
  logInModal.classList.add('active')
  modalBackDrop.classList.add('active')
  dropDown.classList.remove('active')
  registerModal.classList.remove('active')
}

logInLinks.forEach(link => {
  link.addEventListener('click', event => {
  event.preventDefault()
  openLogInModal()
  })
})

function closeLogInModal() {
  logInModal.classList.remove('active')
  modalBackDrop.classList.remove('active')
}

logInLines.forEach(line => {
  line.addEventListener('click', () => {
  closeLogInModal()
  })
})

//------------------------------//
// Local Storage

const registerForm = document.querySelector('.register__form')

function saveFormData() {
  const formData = new FormData(registerForm)
  const formValue = Object.fromEntries(formData.entries())

  for (let key in formValue) {
    localStorage.setItem(key, formValue[key])
  }
}

function loadFormData() {
  const formData = new FormData(registerForm)
  const formValue = Object.fromEntries(formData.entries())

  for (let key in formValue) {
    const savedValue = localStorage.getItem(key)
    if (savedValue) {
      registerForm[key].value = savedValue
    }
  }
}

registerForm.addEventListener('submit', event => {
  event.preventDefault()
  saveFormData()
})

loadFormData()

//------------------------------//
// Section About

// Carousel

const carouselSlide = document.querySelectorAll('.carousel__slide')
const carouselBtn = document.querySelectorAll('.carousel__btn')
const carouselTabletBtn = document.querySelectorAll('.carousel__tablet-btn')

carouselBtn.forEach((btn, index) => {
  btn.addEventListener('click',() => carousel(index, 34, 105.5))
})

function carousel(index, slidePos, tabletSlidePos) {
  carouselBtn.forEach(btn => {
    btn.classList.remove('selected')
  })

  carouselBtn[index].classList.add('selected')

  if (window.matchMedia("(max-width: 768px)").matches) {
    activeSlide(index, tabletSlidePos)
  } else {
    activeSlide(index, slidePos)
  }
}

function activeSlide(index, slidePos, tabletSlidePos) {
  carouselSlide.forEach((slide) => {
    slide.style.right = (index * (slidePos || tabletSlidePos)) + '%'
  })
}

// Tablet slide

carouselTabletBtn.forEach((btn, indexTabletBtn) => {
  btn.addEventListener('click', () => carouselSlideBtn(indexTabletBtn, 105.5))
})


function carouselSlideBtn(indexTabletBtn, tabletSlidePos) {
  carouselBtn.forEach(btn => {
    btn.classList.remove('selected')
  })

  activeSlideBtn(indexTabletBtn, tabletSlidePos)
}

function activeSlideBtn(indexTabletBtn, tabletSlidePos) {
  carouselSlide.forEach(slide => {
    let rightValue = 0
    let currentRightValue = parseFloat(slide.style.right) || 0

    switch (indexTabletBtn) {
      case 0:
        rightValue = currentRightValue - tabletSlidePos
        break
      case 1:
        rightValue = currentRightValue + tabletSlidePos
        break
    }

    rightValue = Math.max(0, Math.min(rightValue, (carouselSlide.length - 1) * tabletSlidePos))

    slide.style.right = rightValue + '%'
    carouselBtn[`${rightValue / tabletSlidePos}`].classList.add('selected')
  })
}

window.addEventListener('resize', () => {
  let carouselBtnsArray = Array.from(carouselBtn)
  let currentIndex = carouselBtnsArray.findIndex(btn => btn.classList.contains('selected'))

  if (window.matchMedia("(max-width: 768px)").matches) {
    carousel(currentIndex, slidePos = 34, tabletSlidePos = 105.5)
  } else {
    if (currentIndex > 2) {
      carousel(currentIndex - 2, slidePos = 34, tabletSlidePos = 105.5)
    } else {
      carousel(currentIndex, slidePos = 34, tabletSlidePos = 105.5)
    }
  }
})

//------------------------------//
// Favorites block

const radioBtn = document.querySelectorAll('.radio-container input[type="radio"]')
const books = document.querySelectorAll('.books-wrapper')

const season = document.querySelector('.season')

radioBtn.forEach((radio, indexBtn) => {
  radio.addEventListener('click', () => {
    booksClasses(indexBtn)
  })
})

function booksClasses(indexBtn) {
  books.forEach((book, indexBook) => {
    book.classList.remove('fadeIn', 'fadeOut')

    indexBtn !== indexBook ? book.classList.add('fadeOut') : book.classList.add('fadeIn')

    booksPos(indexBook)
  })
}

function booksPos(indexBook) {
  let slidePos = 1620
  let rightValue = indexBook * slidePos
  let book = books[indexBook]

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
}

//------------------------------//
// Old Code
//------------------------------//
// Hamburger
/*
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
*/
//------------------------------//
// Outside Click
/*
document.addEventListener('click', event => {
  const hamburgerClick = event.target.closest('.hamburger')
  const tabletMenuClick = event.target.closest('.tablet-menu')
  const registerModalClick = event.target.closest('.register')
  const logInModalClick = event.target.closest('.log-in')
  const modalBackDropClick = event.target.closest('.modal-backdrop')
  const userIconClick = event.target.closest('.icon-profile')


  // Закрытие при клике на иную область
  if (window.matchMedia("(max-width: 768px)").matches) {
    if (!hamburgerClick && !tabletMenuClick) {
      tabletMenu.classList.remove('active')
      dropDown.classList.remove('active')
      hamburgerLine.forEach((line, index) => {
        line.classList.remove(`active-line-${index + 1}`)
      })
    }
  }

  // Закрытие register при клике на другую область
  if (!registerModalClick && modalBackDropClick) {
    registerModal.classList.remove('active')
    modalBackDrop.classList.remove('active')
  }

  // Закрытие log in при клике на другую область
  if (!logInModalClick && modalBackDropClick) {
    logInModal.classList.remove('active')
    modalBackDrop.classList.remove('active')
  }

  // Закрытие dropDown при клике не по иконке
  if (!userIconClick) {
    dropDown.classList.remove('active')
  }
})
*/
//------------------------------//
// Register
/*
const registerModal = document.querySelector('.register')
const modalBackDrop = document.querySelector('.modal-backdrop')

document.addEventListener('click', () => {
  const registerLinks = document.querySelectorAll('a[href="#register"]')
  const registerLines = document.querySelectorAll('.register__lines-container')

  // Появление register
  registerLinks.forEach(link => {
    link.addEventListener('click', event => {
      event.preventDefault()
      registerModal.classList.add('active')
      modalBackDrop.classList.add('active')
      dropDown.classList.remove('active')
      logInModal.classList.remove('active')
    })
  })

  // Закрытие на крестик
  registerLines.forEach(line => {
    line.addEventListener('click', () => {
      registerModal.classList.remove('active')
      modalBackDrop.classList.remove('active')
    })
  })
})
*/
//------------------------------//
// Login
/*
const logInModal = document.querySelector('.log-in')

document.addEventListener('click', () => {
  const logInLinks = document.querySelectorAll('a[href="#log-in"]')
  const logInLines = document.querySelectorAll('.log-in__lines-container')

  // Появление log in
  logInLinks.forEach(link => {
    link.addEventListener('click', event => {
      event.preventDefault()
      logInModal.classList.add('active')
      modalBackDrop.classList.add('active')
      dropDown.classList.remove('active')
      registerModal.classList.remove('active')
    })
  })

  // Закрытие на крестик
  logInLines.forEach(line => {
    line.addEventListener('click', () => {
      logInModal.classList.remove('active')
      modalBackDrop.classList.remove('active')
    })
  })
})
*/
//------------------------------//
// Local Storage
/*
const registerForm = document.querySelector('.register__form')

registerForm.addEventListener('submit', event => {
  event.preventDefault()

  localStorage.setItem('firstName', registerForm['first-name'].value)
  localStorage.setItem('lastName', registerForm['last-name'].value)
  localStorage.setItem('email', registerForm['e-mail'].value)
  localStorage.setItem('password', registerForm['password'].value)
})

registerForm['first-name'].value = localStorage.getItem('firstName') || ''
registerForm['last-name'].value = localStorage.getItem('lastName') || ''
registerForm['e-mail'].value = localStorage.getItem('email') || ''
registerForm['password'].value = localStorage.getItem('password') || ''
*/
//------------------------------//
// Carusel
/*
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
*/
//------------------------------//
// Function Carusel()
/*
function carousel() {
  const slidePos = 34
  const tabletSlidePos = 105.5
  let selectedBtnIndex = null

  function selectedBtn(btnArray, slideMove) {
    btnArray.forEach((btn, index) => {
      btn.addEventListener('click', () => {
        btnArray.forEach(btn => {
          btn.classList.remove('selected')
        })

        selectedBtnIndex = index
        btn.classList.add('selected')
        activeSlide(selectedBtnIndex, slideMove)
      })
    })
  }

  function activeSlide(indexBtn, slideMove) {
    carouselSlide.forEach((slide) => {
      slide.style.right = (indexBtn * slideMove) + '%'
    })
  }

  function updateCarousel() {
    if (window.matchMedia("(max-width: 768px)").matches) {
      selectedBtn(carouselBtn, tabletSlidePos)
    } else {
      selectedBtn(carouselBtn, slidePos)
    }
  }

  updateCarousel()

  window.addEventListener('resize', updateCarousel)
}

carousel()
*/
//------------------------------//
/*
function activeSlideBtn(indexTabletBtn, tabletSlidePos) {
  carouselSlide.forEach((slide) => {
    let currentRightValue = parseFloat(slide.style.right) || 0
    // let rightValue = calc(indexTabletBtn, currentRightValue, tabletSlidePos)
    let rightValue = 0

    let pos = (currentRightValue % tabletSlidePos)

    if (indexTabletBtn == 0) {
      rightValue = (pos * tabletSlidePos) - tabletSlidePos
    } else {
      rightValue = (pos * tabletSlidePos) + tabletSlidePos
    }
    
    slide.style.right = rightValue + '%'
  })
}
*/
/*
function calc(indexTabletBtn, currentRightValue, tabletSlidePos) {
  let result
  let pos = (currentRightValue % tabletSlidePos)

  if (indexTabletBtn == 0) {
    result = (pos * tabletSlidePos) - tabletSlidePos
  } else {
    result = (pos * tabletSlidePos) + tabletSlidePos
  }

  return result
}
*/
//------------------------------//
// Favorites
/*
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
*/