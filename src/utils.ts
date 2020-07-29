import * as crypto from 'crypto'

function transformId(id: string): [string, string[]] {
  const idLength = id.length

  if (/^\d*$/.test(id)) {
    const ary: string[] = []
    for (let i = 0; i < idLength; i += 9) {
      ary.push(parseInt(id.slice(i, Math.min(i + 9, idLength))).toString(16))
    }
    return ['3', ary]
  }

  let r = ''
  for (let i = 0; i < idLength; i++) {
    r += id.charCodeAt(i).toString(16)
  }
  return ['4', [r]]
}

export function calculateBookStrId(bookId: string): string {
  const digest = crypto.createHash('md5').update(bookId).digest('hex')
  let result = digest.substr(0, 3)
  const [code, transformedIds] = transformId(bookId)
  result += code + '2' + digest.substr(digest.length - 2, 2)

  for (let i = 0; i < transformedIds.length; i++) {
    let hexLengthStr = transformedIds[i].length.toString(16)
    if (hexLengthStr.length === 1) {
      hexLengthStr = '0' + hexLengthStr
    }

    result += hexLengthStr + transformedIds[i]

    if (i < transformedIds.length - 1) {
      result += 'g'
    }
  }

  if (result.length < 20) {
    result += digest.substr(0, 20 - result.length)
  }

  result += crypto.createHash('md5').update(result).digest('hex').substr(0, 3)

  return result
}
