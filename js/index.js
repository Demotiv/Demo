//------------------------------//---//------------------------------//
//Tablet menu
//------------------------------//---//------------------------------//

const hamburgerLines = document.querySelector('.lines') // Блок с линиями в hamburger
const hamburgerLine = document.querySelectorAll('.line') // Линии в hamburger
const tabletMenu = document.querySelector('.tablet-menu') // Tablet menu
const navLinks = document.querySelectorAll('.link') // Ссылки в Tablet menu

hamburgerLines.addEventListener('click', toogleTabletMenu) // Открытие/Закрытие Tablet menu

// Переключение Tablet menu
function toogleTabletMenu() {
  hamburgerLine.forEach((line, index) => {
    line.classList.toggle(`active-line-${index + 1}`)  // Добавление анимаций для линий
  })

  tabletMenu.classList.toggle('active') // Переключение Tablet menu
  dropDown.classList.remove('active') // Закрытие Drop Down menu

  navLinks.forEach(link => {
    link.addEventListener('click', closeTabletMenu) // Закрытие Tablet menu по ссылке
  })

  guestIcon.forEach(icon => {
    icon.addEventListener('click', closeTabletMenu) // Закрытие Tablet menu гостем
  })

  userIcon.forEach(icon => {
    icon.addEventListener('click', closeTabletMenu) // Закрытие Tablet menu пользователем
  })
}

// Закрытие Tablet menu
function closeTabletMenu() {
  hamburgerLine.forEach((line, index) => {
    line.classList.remove(`active-line-${index + 1}`) // Удаление анимаций для линий
  })

  tabletMenu.classList.remove('active') // Закрытие Tablet menu
}

//------------------------------//---//------------------------------//
// Drop-Down menu
//------------------------------//---//------------------------------//

const dropDown = document.querySelector('.dropMenu') // Drop Down menu
const dropMenuCardNumber = document.querySelector('.dropMenu__card-profile') // Profile / Card Number
const guestIcon = document.querySelectorAll('.guest-profile') // Иконка гостя
const guestMenu = document.querySelector('.dropMenu__guest') // Меню гостя
const userIcon = document.querySelectorAll('.user-profile') // Иконка пользователя
const userMenu = document.querySelector('.dropMenu__user') // Меню пользователя

// Открытие/Закрытие Drop Down menu гостем
guestIcon.forEach(icon => {
  icon.addEventListener('click', toggleDropDown)
})

// Открытие/Закрытие Drop Down menu пользователем
userIcon.forEach(icon => {
  icon.addEventListener('click', toggleDropDown)
})

// Информация при наведении курсора
userIcon.forEach(icon => {
  icon.addEventListener('mouseover', () => {
    icon.setAttribute('title', localStorage.getItem('full-name'))
  })
})

// Открытие/Закрытие Drop Down menu
function toggleDropDown() {
  dropDown.classList.toggle('active')
}

// Закрытие Drop Down menu
function closeDropDown() {
  dropDown.classList.remove('active')
}

//------------------------------//---//------------------------------//
// Remove classNames
//------------------------------//---//------------------------------//

// Клик не по элементам
document.addEventListener('click', outsideClick)

function outsideClick(event) {
  const hamburgerClick = event.target.closest('.hamburger')
  const tabletMenuClick = event.target.closest('.tablet-menu')
  const registerModalClick = event.target.closest('.register')
  const logInModalClick = event.target.closest('.log-in')
  const modalBackDropClick = event.target.closest('.modal-backdrop')
  const guestIconClick = event.target.closest('.guest-profile')
  const usericonClick = event.target.closest('.user-profile')

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

  // Проверить!
  if (!guestIconClick && !usericonClick) {
    closeDropDown()
  }
}

//------------------------------//---//------------------------------//
// Register
//------------------------------//---//------------------------------//

const registerModal = document.querySelector('.register') // Окно регистрации
const modalBackDrop = document.querySelector('.modal-backdrop') // Фон затемнения
const registerLinks = document.querySelectorAll('a[href="#register"]') // Ссылка на регистрацию
const registerLines = document.querySelectorAll('.register__lines-container') // Закрытие меню регистрации

registerLinks.forEach(link => {
  link.addEventListener('click', event => {
    event.preventDefault()
    openRegisterModal()
  })
})

// Открытие окна регистрации
function openRegisterModal() {
  registerModal.classList.add('active')
  modalBackDrop.classList.add('active')
  dropDown.classList.remove('active')
  logInModal.classList.remove('active')
}

registerLines.forEach(line => {
  line.addEventListener('click', () => {
    closeRegisterModal()
  })
})

// Закрытие окна регистрации
function closeRegisterModal() {
  registerModal.classList.remove('active')
  modalBackDrop.classList.remove('active')
}

//------------------------------//---//------------------------------//
// Log in
//------------------------------//---//------------------------------//

const logInModal = document.querySelector('.log-in')
const logInLinks = document.querySelectorAll('a[href="#log-in"]')
const logInLines = document.querySelectorAll('.log-in__lines-container')
const logOut = document.querySelectorAll('a[href="#log-out"]')
const userInitials = document.querySelectorAll('.user-profile__name')

logInLinks.forEach(link => {
  link.addEventListener('click', event => {
  event.preventDefault()
  openLogInModal()
  })
})

// Открытие окна Log In
function openLogInModal() {
  logInModal.classList.add('active')
  modalBackDrop.classList.add('active')
  dropDown.classList.remove('active')
  registerModal.classList.remove('active')
}

logInLines.forEach(line => {
  line.addEventListener('click', () => {
  closeLogInModal()
  })
})

// Закрытие окна Log In
function closeLogInModal() {
  logInModal.classList.remove('active')
  modalBackDrop.classList.remove('active')
}

//------------------------------//---//------------------------------//
// Local Storage
//------------------------------//---//------------------------------//

const registerForm = document.querySelector('.register__form') // Форма регистрации
const loginForm = document.querySelector('.log-in__form') // Форма Log In

registerForm.addEventListener('submit', event => {
  event.preventDefault()
  saveFormData()
  closeRegisterModal()
})

// Сохранение данных при регистрации
function saveFormData() {
  const formData = new FormData(registerForm)
  const formValue = Object.fromEntries(formData.entries())

  if (registerForm.checkValidity()) {
    for (let key in formValue) {
      localStorage.setItem(key, formValue[key])
    }
  }
  
  const randomCardNumber = Math.floor(Math.random() * 0x1000000000).toString(16).padStart(9, '0').toUpperCase()
  localStorage.setItem('card-number', randomCardNumber)

  const randomBonuses = Math.floor(1000 + Math.random() * 9000)
  localStorage.setItem('bonuses', randomBonuses)

  const firstName = localStorage.getItem('first-name')
  const lastName = localStorage.getItem('last-name')

  localStorage.setItem('full-name', `${firstName} ${lastName}`)

  userIsIn(firstName, lastName)
}

//------------------------------//

loginForm.addEventListener('submit', event => {
  event.preventDefault()
  checkLoginData()
})

// Проверка данных пользователя
function checkLoginData() {
  const formData = new FormData(loginForm)
  const formValue = Object.fromEntries(formData.entries())

  const email = formValue['e-mail']
  const password = formValue['password']

  const savedEmail = localStorage.getItem('e-mail')
  const savedPassword = localStorage.getItem('password')

  if (email === savedEmail && password === savedPassword) {
    const firstName = localStorage.getItem('first-name')
    const lastName = localStorage.getItem('last-name')

    closeLogInModal()
    userIsIn(firstName, lastName)
  } else {
    alert('Wrong login or password')
  }
}

// Авторизация пользователя
function userIsIn(firstName, lastName) {
  guestIcon.forEach(icon => {
    icon.style.display = 'none'
  })

  userIcon.forEach(icon => {
    icon.classList.add('active')
  })

  userInitials.forEach(initials => {
    initials.innerHTML = `${firstName[0]}${lastName[0]}`
  })

  let visited = parseInt(localStorage.getItem('visited')) || 0
  visited++
  localStorage.setItem('visited', visited)

  dropMenuCardNumber.innerHTML = localStorage.getItem('card-number')
  dropMenuCardNumber.style.fontSize = '12px'

  guestMenu.style.display = 'none'
  userMenu.style.display = 'flex'

  showUserInfo()
}

// Выход пользователя
logOut.forEach(link => {
  link.addEventListener('click', event => {
    event.preventDefault()
    userIsOut()
  })
})

function userIsOut() {
  userIcon.forEach(icon => {
    icon.classList.remove('active')
  })

  guestIcon.forEach(icon => {
    icon.style.display = 'block'
  })

  userMenu.style.display = 'none'
  guestMenu.style.display = 'flex'

  hidenUserInfo()
}

// localStorage.clear()
//------------------------------//---//------------------------------//
// Library Card
//------------------------------//---//------------------------------//

const cardForm = document.querySelector('.card__form') // Форма Library Cards
const cardBtn = document.querySelector('.find-card-btn') // Library Cards Button
const userInfo =document.querySelector('.user-info') // User Info
const visitedCounter = document.querySelector('.hit-counter') // Счетчик посещений
const bonusesCounter = document.querySelector('.bonuses-counter')

cardForm.addEventListener('submit', event => {
  event.preventDefault()
  checkCardForm()
})

function checkCardForm() {
  const formData = new FormData(cardForm)
  const formValue = Object.fromEntries(formData.entries())

  const fullName = formValue['full-name']
  const cardNumber = formValue['card-number']

  const savedFullName = localStorage.getItem('full-name')
  const savedCardNumber = localStorage.getItem('card-number')

  if (fullName === savedFullName && cardNumber === savedCardNumber) {
    showUserInfo()

    setTimeout(function() {
      hidenUserInfo()
    }, 10000)
  }
}

// Появление информации пользователя
function showUserInfo() {
  cardBtn.style.display = 'none'
  userInfo.style.display = 'flex'

  visitedCounter.innerHTML = localStorage.getItem('visited')
  bonusesCounter.innerHTML = localStorage.getItem('bonuses')
}

// Скрытие информации пользователя
function hidenUserInfo() {
  userInfo.style.display = 'none'
  cardBtn.style.display = 'block'
  cardForm.reset()
}

//------------------------------//---//------------------------------//
// Section About
//------------------------------//---//------------------------------//
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

//------------------------------//---//------------------------------//
// Favorites block
//------------------------------//---//------------------------------//

const radioBtn = document.querySelectorAll('.radio-container input[type="radio"]')
const books = document.querySelectorAll('.books-wrapper')
const booksBtn = document.querySelectorAll('.books__button')

booksBtn.forEach(book => {
  book.addEventListener('click', event => {
    event.preventDefault()
    openLogInModal()
  })
})

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

//------------------------------//---//------------------------------//