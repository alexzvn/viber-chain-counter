import tokenizer from './libs/tokenizer'
import levenshtein from './libs/levenshtein'

const vietnameseNumberMapper = {
  '0': /không/,
  '1': /một/,
  '2': /hai/,
  '3': /ba/,
  '4': /bốn/,
  '5': /năm/,
  '6': /sáu/,
  '7': /(bẩy|bảy)/,
  '8': /tám/,
  '9': /chín/,
  '10': /mười/
}

export default class WordToken {
  protected readonly tokenizer: string[]

  constructor(private readonly text: string) {
    this.tokenizer = tokenizer(this.text)
  }

  public asReplacer() {
    let text = this.text.toLowerCase()

    for (const [key, value] of Object.entries(vietnameseNumberMapper)) {
      text = text.replace(value, key)
    }

    return new WordToken(text)
  }

  public getToken() {
    return this.tokenizer
  }

  public isNumberAt(index: number) {
    return isNaN(this.numberAt(index)) === false
  }

  public numberAt(index: number) {
    return +this.tokenizer[index]
  }

  public nextTo(index: number) {
    return new ChuoiDetector(this.tokenizer[index + 1])
  }
}

class ChuoiDetector {
  constructor (protected readonly word: string) {}

  public isChuoi() {
    return /(c|ch|chuỗi|chuoi|chuôi)/.test(this.word.trim().toLowerCase().replace(/\./, ''))
  }

  public getDistance() {
    return Math.max(
      levenshtein(this.word, 'chuoi'),
      levenshtein(this.word, 'chuỗi'),
    )
  }
}
