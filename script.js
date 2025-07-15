// Theme toggle functionality
const themeToggle = document.getElementById("theme-toggle")
const body = document.body

// Check for saved theme preference or default to 'dark'
const currentTheme = localStorage.getItem("theme") || "dark"
body.setAttribute("data-theme", currentTheme)

themeToggle.addEventListener("click", () => {
  const currentTheme = body.getAttribute("data-theme")
  const newTheme = currentTheme === "dark" ? "light" : "dark"

  body.setAttribute("data-theme", newTheme)
  localStorage.setItem("theme", newTheme)
})

// Element toggle function
const elementToggleFunc = (elem) => {
  elem.classList.toggle("active")
}

// Sidebar variables
const sidebar = document.querySelector("[data-sidebar]")
const sidebarBtn = document.querySelector("[data-sidebar-btn]")

// Sidebar toggle functionality for mobile
sidebarBtn.addEventListener("click", () => {
  elementToggleFunc(sidebar)
})

// Custom select variables
const select = document.querySelector("[data-select]")
const selectItems = document.querySelectorAll("[data-select-item]")
const selectValue = document.querySelector("[data-selecct-value]")
const filterBtn = document.querySelectorAll("[data-filter-btn]")

if (select) {
  select.addEventListener("click", function () {
    elementToggleFunc(this)
  })
}

// Add event in all select items
for (let i = 0; i < selectItems.length; i++) {
  selectItems[i].addEventListener("click", function () {
    const selectedValue = this.innerText.toLowerCase()
    selectValue.innerText = this.innerText
    elementToggleFunc(select)
    filterFunc(selectedValue)
  })
}

// Filter variables
const filterItems = document.querySelectorAll("[data-filter-item]")

const filterFunc = (selectedValue) => {
  for (let i = 0; i < filterItems.length; i++) {
    if (selectedValue === "barchasi" || selectedValue === "all") {
      filterItems[i].classList.add("active")
    } else if (selectedValue === filterItems[i].dataset.category) {
      filterItems[i].classList.add("active")
    } else {
      filterItems[i].classList.remove("active")
    }
  }
}

// Add event in all filter button items for large screen
let lastClickedBtn = filterBtn[0]

for (let i = 0; i < filterBtn.length; i++) {
  filterBtn[i].addEventListener("click", function () {
    const selectedValue = this.innerText.toLowerCase()
    selectValue.innerText = this.innerText
    filterFunc(selectedValue)

    lastClickedBtn.classList.remove("active")
    this.classList.add("active")
    lastClickedBtn = this
  })
}

// Contact form variables
const form = document.querySelector("[data-form]")
const formInputs = document.querySelectorAll("[data-form-input]")
const formBtn = document.querySelector("[data-form-btn]")
const formSuccess = document.querySelector(".form-success")

// Add event to all form input field
for (let i = 0; i < formInputs.length; i++) {
  formInputs[i].addEventListener("input", () => {
    // Check form validation
    if (form.checkValidity()) {
      formBtn.removeAttribute("disabled")
    } else {
      formBtn.setAttribute("disabled", "")
    }
  })
}

// Telegram bot configuration
const TELEGRAM_BOT_TOKEN = "7403989998:AAESfQgMTjyLl9L8iK7kHgnOQF_c7Juyaoo"
const TELEGRAM_CHAT_ID = "5516465276" // Sizning to'g'ri chat ID

// Form submission handler
form.addEventListener("submit", async (e) => {
  e.preventDefault()

  // Disable button and show loading state
  formBtn.setAttribute("disabled", "")
  formBtn.innerHTML = '<ion-icon name="hourglass-outline"></ion-icon><span>Yuborilmoqda...</span>'

  const formData = new FormData(form)
  const fullname = formData.get("fullname")
  const email = formData.get("email")
  const message = formData.get("message")

  const telegramMessage = `
🔔 Yangi xabar portfolio saytidan!

👤 Ism: ${fullname}
📧 Email: ${email}
💬 Xabar: ${message}

📅 Vaqt: ${new Date().toLocaleString("uz-UZ")}
  `

  try {
    // Telegram botga xabar yuborish
    const response = await fetch(`https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        chat_id: TELEGRAM_CHAT_ID,
        text: telegramMessage,
        parse_mode: "HTML",
      }),
    })

    const result = await response.json()

    if (response.ok && result.ok) {
      // Muvaffaqiyatli yuborildi
      formSuccess.style.display = "block"
      formSuccess.innerHTML = "<p>✅ Xabaringiz muvaffaqiyatli yuborildi!</p>"
      form.reset()

      // Reset button
      formBtn.innerHTML = '<ion-icon name="paper-plane"></ion-icon><span>Xabar Yuborish</span>'
      formBtn.setAttribute("disabled", "")

      // 3 soniyadan keyin success xabarini yashirish
      setTimeout(() => {
        formSuccess.style.display = "none"
      }, 5000)
    } else {
      throw new Error(result.description || "Xabar yuborishda xatolik yuz berdi")
    }
  } catch (error) {
    console.error("Error:", error)

    // Show error message
    formSuccess.style.display = "block"
    formSuccess.innerHTML =
      '<p style="background: var(--bittersweet-shimmer); color: white;">❌ Xabar yuborishda xatolik yuz berdi. Iltimos, qaytadan urinib ko\'ring.</p>'

    // Reset button
    formBtn.innerHTML = '<ion-icon name="paper-plane"></ion-icon><span>Xabar Yuborish</span>'

    // Check form validation again
    if (form.checkValidity()) {
      formBtn.removeAttribute("disabled")
    }

    // Hide error message after 5 seconds
    setTimeout(() => {
      formSuccess.style.display = "none"
    }, 5000)
  }
})

// Page navigation variables
const navigationLinks = document.querySelectorAll("[data-nav-link]")
const pages = document.querySelectorAll("[data-page]")

// Add event to all nav link
for (let i = 0; i < navigationLinks.length; i++) {
  navigationLinks[i].addEventListener("click", function () {
    for (let i = 0; i < pages.length; i++) {
      if (this.innerHTML.toLowerCase() === pages[i].dataset.page) {
        pages[i].classList.add("active")
        navigationLinks[i].classList.add("active")
        window.scrollTo(0, 0)
      } else {
        pages[i].classList.remove("active")
        navigationLinks[i].classList.remove("active")
      }
    }
  })
}

// Dark mode sound effect
const eldarkmode = document.getElementById("darkmode")
const lamp = document.getElementById("lamp")

eldarkmode.addEventListener("click", () => {
  lamp.play()
})

// SHELL GAME FUNCTIONALITY
class ShellGame {
  constructor() {
    this.cups = document.querySelectorAll(".cup")
    this.ball = document.getElementById("ball")
    this.startBtn = document.getElementById("startGame")
    this.messageEl = document.getElementById("gameMessage")
    this.winsEl = document.getElementById("wins")
    this.totalEl = document.getElementById("total")

    this.ballPosition = 0
    this.isPlaying = false
    this.wins = Number.parseInt(localStorage.getItem("shellGameWins")) || 0
    this.total = Number.parseInt(localStorage.getItem("shellGameTotal")) || 0

    this.updateScore()
    this.init()
  }

  init() {
    this.startBtn.addEventListener("click", () => this.startGame())

    this.cups.forEach((cup, index) => {
      cup.addEventListener("click", () => this.selectCup(index))
    })
  }

  startGame() {
    if (this.isPlaying) return

    this.isPlaying = true
    this.startBtn.disabled = true
    this.startBtn.textContent = "O'yin davom etmoqda..."
    this.messageEl.textContent = "🔴 Qizil koptokni diqqat bilan kuzatib turing!"
    this.messageEl.className = "game-message"
    this.messageEl.style.color = "#ff6b6b"

    // Disable cup clicks
    this.cups.forEach((cup) => cup.classList.add("disabled"))

    // Randomly place ball
    this.ballPosition = Math.floor(Math.random() * 3)
    this.showBall()

    // Start shuffling after 3 seconds (increased time)
    setTimeout(() => {
      this.messageEl.textContent = "Endi idishlar aralashadi..."
      this.messageEl.style.color = "var(--orange-yellow-crayola)"
      this.hideBall()
      this.shuffle()
    }, 3000)
  }

  showBall() {
    const cupsContainer = document.querySelector(".cups-container")
    const gameArea = document.querySelector(".game-area")
    const cups = Array.from(this.cups)

    // Get the selected cup
    const selectedCup = cups[this.ballPosition]

    // Get positions relative to game area
    const gameAreaRect = gameArea.getBoundingClientRect()
    const cupRect = selectedCup.getBoundingClientRect()

    // Calculate ball position (center of the cup, slightly in front)
    const ballLeft = cupRect.left - gameAreaRect.left + cupRect.width / 2 - 12
    const ballBottom = 15

    // Position the ball
    this.ball.style.left = ballLeft + "px"
    this.ball.style.bottom = ballBottom + "px"
    this.ball.style.transform = "none"
    this.ball.classList.remove("hidden")

    // Add arrow indicator
    const existingArrow = this.ball.querySelector(".ball-indicator")
    if (existingArrow) {
      existingArrow.remove()
    }

    const arrow = document.createElement("div")
    arrow.className = "ball-indicator"
    arrow.innerHTML = "↓"
    this.ball.appendChild(arrow)

    // Add pulsing effect
    this.ball.style.animation = "ball-pulse 1s ease-in-out infinite"
  }

  hideBall() {
    this.ball.style.animation = "none"
    const arrow = this.ball.querySelector(".ball-indicator")
    if (arrow) {
      arrow.remove()
    }
    this.ball.classList.add("hidden")
  }

  shuffle() {
    const shuffleCount = 8 + Math.floor(Math.random() * 5) // 8-12 shuffles
    let currentShuffle = 0

    const performShuffle = () => {
      if (currentShuffle >= shuffleCount) {
        this.endShuffle()
        return
      }

      // Random swap
      const cup1 = Math.floor(Math.random() * 3)
      let cup2 = Math.floor(Math.random() * 3)
      while (cup2 === cup1) {
        cup2 = Math.floor(Math.random() * 3)
      }

      this.swapCups(cup1, cup2)
      currentShuffle++

      // Increase speed gradually
      const delay = Math.max(200, 600 - currentShuffle * 40)
      setTimeout(performShuffle, delay)
    }

    performShuffle()
  }

  swapCups(index1, index2) {
    const cup1 = this.cups[index1]
    const cup2 = this.cups[index2]

    // Add shuffling class for animation
    cup1.classList.add("shuffling")
    cup2.classList.add("shuffling")

    // Get positions
    const cup1Rect = cup1.getBoundingClientRect()
    const cup2Rect = cup2.getBoundingClientRect()
    const distance = cup2Rect.left - cup1Rect.left

    // Animate swap
    cup1.style.transform = `translateX(${distance}px)`
    cup2.style.transform = `translateX(${-distance}px)`

    // Update ball position if needed
    if (this.ballPosition === index1) {
      this.ballPosition = index2
    } else if (this.ballPosition === index2) {
      this.ballPosition = index1
    }

    // Reset transforms after animation
    setTimeout(() => {
      cup1.style.transform = ""
      cup2.style.transform = ""
      cup1.classList.remove("shuffling")
      cup2.classList.remove("shuffling")
    }, 500)
  }

  endShuffle() {
    this.messageEl.textContent = "Qaysi idish ostida koptok bor?"

    // Enable cup clicks
    this.cups.forEach((cup) => cup.classList.remove("disabled"))
  }

  selectCup(selectedIndex) {
    if (!this.isPlaying) return

    this.isPlaying = false
    this.total++

    // Disable all cups
    this.cups.forEach((cup) => cup.classList.add("disabled"))

    // Show the ball
    this.showBall()

    if (selectedIndex === this.ballPosition) {
      // Winner!
      this.wins++
      this.messageEl.textContent = "🎉 Siz yutdingiz! Tabriklaymiz!"
      this.messageEl.className = "game-message success"
      this.cups[selectedIndex].classList.add("winner")

      setTimeout(() => {
        this.cups[selectedIndex].classList.remove("winner")
      }, 1000)
    } else {
      // Wrong choice
      this.messageEl.textContent = "😔 Yana urinib ko'ring!"
      this.messageEl.className = "game-message error"
      this.cups[selectedIndex].classList.add("wrong")

      setTimeout(() => {
        this.cups[selectedIndex].classList.remove("wrong")
      }, 500)
    }

    this.updateScore()
    this.saveScore()

    // Reset for next game
    setTimeout(() => {
      this.resetGame()
    }, 3000)
  }

  resetGame() {
    this.startBtn.disabled = false
    this.startBtn.textContent = "O'yinni Boshlash"
    this.messageEl.textContent = ""
    this.messageEl.className = "game-message"
    this.hideBall()

    // Enable cups
    this.cups.forEach((cup) => cup.classList.remove("disabled"))
  }

  updateScore() {
    this.winsEl.textContent = this.wins
    this.totalEl.textContent = this.total
  }

  saveScore() {
    localStorage.setItem("shellGameWins", this.wins.toString())
    localStorage.setItem("shellGameTotal", this.total.toString())
  }
}

// Initialize the shell game when DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
  new ShellGame()
})
