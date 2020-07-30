import * as $ from 'jquery'
import {
  calculateBookStrId,
  calculateScore,
  calculateSimilarity,
  cleanTitle,
} from './utils'

const WEREAD_DETAIL_PAGE_BASE_URL = 'https://weread.qq.com/web/reader/'
const TITLE_MIN_SCORE = 0.5
const AUTHOR_MIN_SIMILARITY_SCORE = 0.3
const SELECT_FROM_COUNT = 5

type WeReadResult = {
  books: Book[]
  parts: string[]
}

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

  titleScore?: number
  authorSimilarity?: number
}

function getHTML(books: Book[]): string {
  let list = books.reduce((acc, book) => {
    const wereadLink =
      WEREAD_DETAIL_PAGE_BASE_URL + calculateBookStrId(book.bookInfo.bookId)
    return (
      acc +
      `<li style="width: 275px; display: inline-block; zoom: 1; overflow: hidden; margin: 0 0 12px 0; vertical-align: top;">
        <div>
          <div style="float: none; vertical-align: top; display: inline-block; zoom: 1; margin-right: 16px;">
            <a target="_blank" href="${wereadLink}">
              <img src="${book.bookInfo.cover}" style="max-width: 70px;">
            </a>
          </div>
          <div style="max-width: 170px; display: inline-block; zoom: 1; overflow: hidden;">
            <div>
              <a target="_blank" href="${wereadLink}">${book.bookInfo.title}</a>
            </div>
            <div>${book.bookInfo.author}</div>
            <div><a target="_blank" href="${wereadLink}">去看看 ></a></div>
          </div>
        </div>
     </li>`
    )
  }, '')

  if (!list) {
    list =
      '<div><span>微信读书好像没有收录这本书 🤔️ </span><a target="_blank" href="https://weread.qq.com/web/#search">我要去搜搜 ></a></div>'
  } else {
    list = `<ul>${list}</ul>`
  }

  return `
    <div class="gray_ad">
        <div>
            <h2><span>✳️ 在微信读书中可读</span>&nbsp;·&nbsp;·&nbsp;·&nbsp;·&nbsp;·&nbsp;·</h2>
            ${list}
        </div>
    </div>
    `
}

function render(books: Book[]) {
  const buyInfoDOM = $('#buyinfo')
  buyInfoDOM.before(getHTML(books))
}

function filter(data: WeReadResult, doubanAuthor: string): Book[] {
  const { parts, books } = data

  return books
    .slice(0, SELECT_FROM_COUNT)
    .map((book) => ({
      ...book,
      titleScore: calculateScore(book.bookInfo.title, parts),
      authorSimilarity: calculateSimilarity(doubanAuthor, book.bookInfo.author),
    }))
    .map((book) => {
      console.log(book)
      return book
    })
    .filter(
      (book) =>
        book.titleScore >= TITLE_MIN_SCORE &&
        book.authorSimilarity > AUTHOR_MIN_SIMILARITY_SCORE,
    )
    .sort(
      (a, b) =>
        b.titleScore * b.authorSimilarity - a.titleScore * a.authorSimilarity,
    )
}

$(() => {
  const title = cleanTitle($('#wrapper > h1 > span').text())
  const author =
    $('#info > span:nth-child(1) > a').text() ||
    $('#info > a:nth-child(2)').text()
  chrome.runtime.sendMessage(title, (data: WeReadResult) => {
    render(filter(data, author))
  })
})
