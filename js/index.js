'use strict'
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
const myProfileLink = document.querySelectorAll('a[href="#my-profile"]') // Ссылка на My Profile 

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

document.addEventListener('click', outSideClick)

function outSideClick(event) {
  // Клик не по Tablet Menu
  if (tabletMenu.classList.contains('active')) {
    const tabletMenuClick = event.target.closest('.tablet-menu')
    const hamburgerClick = event.target.closest('.hamburger')

    if (window.matchMedia("(max-width: 768px)").matches) {
      if (!hamburgerClick && !tabletMenuClick) {
        closeTabletMenu()
      }
    }
  }

  // Клик не по Register
  if (registerModal.classList.contains('active')) {
    const registerModalClick = event.target.closest('.register')
    const modalBackDropClick = event.target.closest('.modal-backdrop')

    if (!registerModalClick && modalBackDropClick) {
      closeRegisterModal()
    }
  }

  // Клик не по Log In
  if (logInModal.classList.contains('active')) {
    const logInModalClick = event.target.closest('.log-in')
    const modalBackDropClick = event.target.closest('.modal-backdrop')

    if (!logInModalClick && modalBackDropClick) {
      closeLogInModal()
    }
  }

  // Клик не по guest || user icons
  if (dropDown.classList.contains('active')) {
    const guestIconClick = event.target.closest('.guest-profile')
    const usericonClick = event.target.closest('.user-profile')

    if (!guestIconClick && !usericonClick) {
      closeDropDown()
    }
  }

  // Клик не по My Profile
  if (myProfileModal.classList.contains('active')) {
    const myProfileModalClick = event.target.closest('.profile')
    const modalBackDropClick = event.target.closest('.modal-backdrop')

    if (!myProfileModalClick && modalBackDropClick) {
      closeMyProfile()
    }
  }

  // Клик не по Buy A Cards
  if (buyACard.classList.contains('active')) {
    const buyACardClick = event.target.closest('.buy-card')
    const modalBackDropClick = event.target.closest('.modal-backdrop')

    if (!buyACardClick && modalBackDropClick) {
      closeBuyACard()
    }
  }
}

//------------------------------//---//------------------------------//
// Register
//------------------------------//---//------------------------------//

const registerModal = document.querySelector('.register') // Окно регистрации
const modalBackDrop = document.querySelector('.modal-backdrop') // Фон затемнения
const registerLinks = document.querySelectorAll('a[href="#register"]') // Ссылка на регистрацию
const registerCloseBtn = document.querySelectorAll('.register__close-btn') // Закрытие меню регистрации

registerLinks.forEach(link => {
  link.addEventListener('click', event => {
    event.preventDefault()
    openRegisterModal()
  })
})

// Закрытие нажатием на крестик
registerCloseBtn.forEach(line => {
  line.addEventListener('click', () => {
    closeRegisterModal()
  })
})

// Открытие окна регистрации
function openRegisterModal() {
  registerModal.classList.add('active')
  modalBackDrop.classList.add('active')
  dropDown.classList.remove('active')
  logInModal.classList.remove('active')
}

// Закрытие окна регистрации
function closeRegisterModal() {
  registerModal.classList.remove('active')
  modalBackDrop.classList.remove('active')
}

//------------------------------//---//------------------------------//
// Log in
//------------------------------//---//------------------------------//

const logInModal = document.querySelector('.log-in') // Окно Log-in
const logInLinks = document.querySelectorAll('a[href="#log-in"]') // Ссыдка на Log-in
const logInCloseBtn = document.querySelectorAll('.log-in__close-btn') // Крестик в окне Log-in
const logOut = document.querySelectorAll('a[href="#log-out"]') // Выход из аккаунта
const userInitials = document.querySelectorAll('.user-profile__name') // Инициалы пользователя

logInLinks.forEach(link => {
  link.addEventListener('click', event => {
  event.preventDefault()
  openLogInModal()
  })
})

// Закрытие нажатием на крестик
logInCloseBtn.forEach(line => {
  line.addEventListener('click', () => {
  closeLogInModal()
  })
})

// Открытие окна Log In
function openLogInModal() {
  logInModal.classList.add('active')
  modalBackDrop.classList.add('active')
  dropDown.classList.remove('active')
  registerModal.classList.remove('active')
}

// Закрытие окна Log In
function closeLogInModal() {
  logInModal.classList.remove('active')
  modalBackDrop.classList.remove('active')
}

//------------------------------//---//------------------------------//
// My Profile
//------------------------------//---//------------------------------//

const myProfileModal = document.querySelector('.profile') // Окно My Profile
const myProfileCloseBtn = document.querySelector('.profile__close-btn') // Крестик окна My Profile

const myProfileVisits = document.querySelector('.hit-counter') // Счетчик посещений
const myProfileBonuses = document.querySelector('.bonuses-counter') // Счеткик бонусов
const myProfileBooks = document.querySelector('.books-counter') // Счетчик выбранных книг
const myProfileCardNumber = document.querySelector('.profile__card-number-user') // Номек карты пользователя
const myProfileCopyCardNumber = document.querySelector('.profile__card-number-icon') // Копирование карты

myProfileLink.forEach(link => {
  link.addEventListener('click', openMyProfile)
})

// Закрытие на крестик
myProfileCloseBtn.addEventListener('click', closeMyProfile)

// Копирование номера карты
myProfileCopyCardNumber.addEventListener('click', copyCard)

// Открытие окна My Profile
function openMyProfile() {
  myProfileModal.classList.add('active')
  modalBackDrop.classList.add('active')

  myProfileVisits.innerHTML = localStorage.getItem('visited')
  myProfileBonuses.innerHTML = localStorage.getItem('bonuses')
  myProfileBooks.innerHTML = localStorage.getItem('books')
  myProfileCardNumber.innerHTML = localStorage.getItem('card-number')
}

// Закрытие окна My Profile
function closeMyProfile() {
  myProfileModal.classList.remove('active')
  modalBackDrop.classList.remove('active')
}

// Функция копирования номера карты
function copyCard() {
  const cardNumber = localStorage.getItem('card-number')
  const tempInput = document.createElement('input')
  tempInput.value = cardNumber
  document.body.appendChild(tempInput)
  tempInput.select()
  document.execCommand('copy')
  document.body.removeChild(tempInput)
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

  localStorage.setItem('books', 0)
  localStorage.setItem('selected-books', null)

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

  // localStorage.setItem('books', 0)
  let selectedBooks = localStorage.getItem('selected-books')

  if (selectedBooks !== null) {
    selectedBooks = JSON.parse(selectedBooks)

    const allBooksBtn = document.querySelectorAll('.books__button')

    if (Array.isArray(selectedBooks)) {
      selectedBooks.forEach(index => {
        allBooksBtn[index].innerHTML = 'Own'
        allBooksBtn[index].classList.add('active')
      })
    }
  }

  guestMenu.style.display = 'none'
  userMenu.style.display = 'flex'

  visitProfileOn()
  showUserInfo()
}

// Выход пользователя
logOut.forEach(link => {
  link.addEventListener('click', event => {
    event.preventDefault()
    removeBooksBtn()
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

  dropMenuCardNumber.innerHTML = 'Profile'
  dropMenuCardNumber.style.fontSize = '15px'

  userMenu.style.display = 'none'
  guestMenu.style.display = 'flex'

  visitProfileOff()
  hidenUserInfo()
}

// localStorage.clear()
//------------------------------//---//------------------------------//
// Library Card
//------------------------------//---//------------------------------//

const cardForm = document.querySelector('.card__form') // Форма Library Cards
const cardBtn = document.querySelector('.find-card-btn') // Library Cards Button
const userInfo =document.querySelector('.user-info') // User Info
const visitedCounter = document.querySelector('.library-hit-counter') // Счетчик посещений
const bonusesCounter = document.querySelector('.library-bonuses-counter') // Счетчик бонусов
const booksCounter = document.querySelector('.library-books-counter') // Счетчик книг
const getACard = document.querySelector('.get-a-card') // Окно гостя в Library Card
const visitProfile = document.querySelector('.visit-profile') // Окно пользователя в Library Card
const visitProfileBtn = document.querySelector('.visit-profile-button') // Ссылка на профиль

visitProfileBtn.addEventListener('click', event => {
  event.preventDefault()
  openMyProfile()
})

// Появление информации для пользователя
function visitProfileOn() {
  getACard.style.display = 'none'
  visitProfile.classList.add('active')
}

// Появление информации для гостя
function visitProfileOff() {
  getACard.style.display = 'flex'
  visitProfile.classList.remove('active')
}

cardForm.addEventListener('submit', event => {
  event.preventDefault()
  checkCardForm()
})

// Проверка данных в Library Card
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
  booksCounter.innerHTML = localStorage.getItem('books')
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
    carousel(currentIndex, 34, 105.5) // slidePos = 34, tabletSlidePos = 105.5
  } else {
    if (currentIndex > 2) {
      carousel(currentIndex - 2, 34, 105.5) // slidePos = 34, tabletSlidePos = 105.5
    } else {
      carousel(currentIndex, 34, 105.5) // slidePos = 34, tabletSlidePos = 105.5
    }
  }
})

//------------------------------//---//------------------------------//
// Favorites block
//------------------------------//---//------------------------------//

const radioBtn = document.querySelectorAll('.radio-container input[type="radio"]') // Выбор сезонов
const books = document.querySelectorAll('.books-wrapper') // Блоки с книгами
const booksBtn = document.querySelectorAll('.books__button') // Покупка книги

// Выбор книг
booksBtn.forEach((book, indexBook) => {
  book.addEventListener('click', event => {
    event.preventDefault()

    const userIconActive = Array.from(userIcon).some(icon => icon.classList.contains('active'))
    const savedBankCardNumber = localStorage.getItem('bank-card-number')

    if (!userIconActive) {
      openLogInModal()
    } else if (book.classList.contains('active')) {
      booksNotOwn(event.target, indexBook)
    } else  if (savedBankCardNumber) {
      booksOwn(event.target, indexBook)
    } else {
      openBuyACard()
    }
  })
})

// Выбранная книга
function booksOwn(targetBtn, indexBook) {
  targetBtn.innerHTML = 'Own'
  targetBtn.classList.add('active')

  // Увеличения счётчика выбранных книг
  let localBooksCounter = parseInt(localStorage.getItem('books'), 10) || 0
  localBooksCounter += 1
  localStorage.setItem('books', localBooksCounter)

  // Добавление названия и автора
  const title = targetBtn.closest('.books__body').querySelector('h4').textContent
  const author = targetBtn.closest('.books__body').querySelector('p').textContent

  const newLi = document.createElement('li')
  newLi.textContent = `${title}, ${author}`
  const booksList = document.querySelector('.profile__books-list')
  booksList.appendChild(newLi)

  // Сохранение выбранных книг
  let selectedBooks = JSON.parse(localStorage.getItem('selected-books')) || []
  selectedBooks.push(indexBook)
  localStorage.setItem('selected-books', JSON.stringify(selectedBooks))
}

// Удаление выбранной книги
function booksNotOwn(targetBtn, indexBook) {
  targetBtn.innerHTML = 'Buy'
  targetBtn.classList.remove('active')

  // Уменьшение счётчика выбранных книг
  let localBooksCounter = parseInt(localStorage.getItem('books'), 10) || 0
  localBooksCounter -= 1
  localStorage.setItem('books', localBooksCounter)

  // Удаление названия и автора
  const title = targetBtn.closest('.books__body').querySelector('h4').textContent
  const author = targetBtn.closest('.books__body').querySelector('p').textContent

  const booksList = document.querySelector('.profile__books-list')
  const liElements = booksList.querySelectorAll('li')
  liElements.forEach(li => {
    if (li.textContent === `${title}, ${author}`) {
      li.remove()
    }
  })

  // Удаление выбранных книг
  let selectedBooks = JSON.parse(localStorage.getItem('selected-books')) || []
  selectedBooks = selectedBooks.filter(el => el !== indexBook)
  localStorage.setItem('selected-books', JSON.stringify(selectedBooks))
}

function removeBooksBtn() {
  booksBtn.forEach(book => {
    book.innerHTML = 'Buy'
    book.classList.remove('active')
  })
}

// Выбор сезонов
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
// Buy A Library Card
//------------------------------//---//------------------------------//

const buyACard = document.querySelector('.buy-card') // окно Buy A Card
const buyACardBtn = document.querySelector('.buy-card__close_btn') // Крестик закрытия 
const buyACardForm = document.querySelector('.buy-card__form') // Форма Buy A CArd

buyACardBtn.addEventListener('click', closeBuyACard)

// Отккрытие окна 
function openBuyACard() {
  buyACard.classList.add('active')
  modalBackDrop.classList.add('active')
}

// Закрытие окна
function closeBuyACard() {
  buyACard.classList.remove('active')
  modalBackDrop.classList.remove('active')
}

// Форма Buy A Card
buyACardForm.addEventListener('submit', event => {
  event.preventDefault()
  checkBuyACardForm()
})

// Сохранение формы Buy A Card
function checkBuyACardForm() {
  const formData = new FormData(buyACardForm)
  const formValue = Object.fromEntries(formData.entries())

  if (buyACardForm.checkValidity()) {
    for (let key in formValue) {
      localStorage.setItem(key, formValue[key])
    }
  }

  closeBuyACard()
}