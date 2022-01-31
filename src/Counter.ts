import WordToken from './WordToken'

export default class Counter {
  constructor () {}

  public exec (text: string) {
    return new TextProcess(new WordToken(text))
  }
}

class TextProcess {
  protected index: number[] = []

  constructor (protected readonly word: WordToken) {
    word.getToken().forEach((str, index) => {
      if (! word.isNumberAt(index)) {
        return;
      }

      if (word.nextTo(index).isChuoi()) {
        return this.index.push(index)
      }

      if (word.nextTo(index).getDistance() <= 3) {
        return this.index.push(index)
      }
    })
  }

  public isCountable() {
    return this.index.length > 0
  }

  public count() {
    return this.index.reduce((acc, index) => acc + this.word.numberAt(index), 0)
  }
}
