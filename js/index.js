//------------------------------//
// Header

//Tablet menu

const hamburger = document.querySelector('.hamburger')
const hamburgerLines = document.querySelector('.lines')
const hamburgerLine = document.querySelectorAll('.line')
const tabletMenu = document.querySelector('.tablet-menu')
const navLinks = document.querySelectorAll('.link')

hamburger.addEventListener('click', ()=> {
    hamburgerLine.forEach((el, index) => {
        el.classList.toggle(`active-line-${index + 1}`)
    })

    hamburgerLines.classList.toggle('active')
    tabletMenu.classList.toggle('active')
})

navLinks.forEach(el => {
    el.addEventListener('click', () => {
        hamburgerLine.forEach((el, index) => {
            el.classList.remove(`active-line-${index + 1}`)
        })

        hamburgerLines.classList.remove('active')
        tabletMenu.classList.remove('active')
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

  //------------------------------//
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