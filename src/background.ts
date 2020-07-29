const BASE_URL = 'https://weread.qq.com/web/search/global'

chrome.runtime.onMessage.addListener((title, sender, sendResponse) => {
  fetch(`${BASE_URL}?keyword=${encodeURIComponent(title)}`)
    .then((resp) => resp.text())
    .then((text) => sendResponse(JSON.parse(text)))
    .catch((err) => console.error(err))
  return true
})
