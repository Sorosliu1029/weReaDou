import * as $ from 'jquery'
import { calculateBookStrId } from './utils'

const WEREAD_DETAIL_PAGE_BASE_URL = 'https://weread.qq.com/web/reader/'

type BookInfo = {
  author: string
  bookId: string
  cover: string
  intro: string
  title: string
  price: number
}

type Book = {
  bookInfo: BookInfo
  reading: number
  readingCount: number
}

function getHTML(books: Book[]): string {
  const lis = books.reduce((acc, book) => {
    return (
      acc +
      `<li>
        <div class="cell" style="display: flex">
          <div class="vendor-name">
            <a target="_blank" href="${
              WEREAD_DETAIL_PAGE_BASE_URL +
              calculateBookStrId(book.bookInfo.bookId)
            }">
              <span>${book.bookInfo.title}</span>
            </a>
          </div>
        </div>
      </li>`
    )
  }, '')

  return `
    <div class="gray_ad">
        <div>
            <h2><span>✳️ 在微信读书中可读</span>&nbsp;·&nbsp;·&nbsp;·&nbsp;·&nbsp;·&nbsp;·</h2>
            <ul>
            ${lis}
            </ul>
        </div>
    </div>
    `
}

function render(books: Book[]) {
  const buyInfoDOM = $('#buyinfo')
  buyInfoDOM.before(getHTML(books.slice(0, 3)))
}

$(() => {
  const title = $('#wrapper > h1 > span').text()
  chrome.runtime.sendMessage(title, (data: { books: Book[] }) => {
    render(data['books'])
  })
})
