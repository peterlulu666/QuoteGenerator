const quoteContainer = document.getElementById("quote-container")
const quoteText = document.getElementById("quote")
const authorText = document.getElementById("author")
const twitterBtn = document.getElementById("twitter")
const newQuoteBtn = document.getElementById("new-quote")
const loader = document.getElementById("loader")

let apiQuotes = []

// Showing loading 
function loading() {
    loader.hidden = false
    quoteContainer.hidden = true
}

// Hide loading
function complete() {
    quoteContainer.hidden = false
    loader.hidden = true
}

function newQuote() {
    loading()
    let randomIndex = Math.floor(Math.random() * apiQuotes.length)
    let randomQuote = apiQuotes[randomIndex]
    // console.log(randomQuote)
    if (!randomQuote.author) {
        authorText.textContent = "Unknown"
    } else {
        authorText.textContent = randomQuote.author
    }
    if (randomQuote.text.length > 100) {
        quoteText.classList.add("long-quote")
    } else {
        quoteText.classList.remove("long-quote")
    }
    complete()
    quoteText.textContent = randomQuote.text
}
// function newQuoteLocal() {
//     let randomIndex = Math.floor(Math.random() * quotes.length)
//     let randomQuote = quotes[randomIndex]
//     console.log(randomQuote)
// }
// Get quotes from API 
async function getQuotes() {
    loading()
    const apiURL = "https://type.fit/api/quotes"
    try {
        const response = await fetch(apiURL)
        apiQuotes = await response.json()
        newQuote()
        // newQuoteLocal()
    } catch (error) {

    }
}

// Twitter function
function tweetQuote() {
    const twitterURL = `https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${authorText.textContent}`
    window.open(twitterURL, "_blank")
}

// Event Listeners 
newQuoteBtn.addEventListener("click", newQuote)
twitterBtn.addEventListener("click", tweetQuote)
getQuotes()