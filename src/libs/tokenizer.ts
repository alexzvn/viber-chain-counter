const isNumber = (char: string) => /[0-9]/.test(char)
const isAlpha = (char: string) => /[a-zA-Z_ÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềểỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễếệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ]/u.test(char)
const isMisc = (char: string) => /:|,/.test(char)

const typeOf = (word: string) => {
  switch (true) {
    case isNumber(word): return 'number'
    case isAlpha(word): return 'alpha'
    case isMisc(word): return 'misc'
  }
}

const breaker = (a: string, b: string|undefined) => {
  switch (true) {
    case b == undefined: return false;
    case a === '\n': return true;
    case isMisc(a): return true;
    case a.trim() == '': return true;
    case isNumber(a) && isAlpha(b!): return true;
    case isNumber(b!) && isAlpha(a): return true;
    case isMisc(b!): return true;
    default: return false;
  }
}

const tokenizer = (text: string) => {
  const words = [] as string[]
  const chars = text
    .split(new RegExp('', 'u'))
    .filter(char => char.trim() !== '' || char === '\n')

  let carry = ''

  for (let i = 0; i < chars.length; i++) {
    const a = chars[i], b = chars[i - 1]

    if (breaker(a, b)) {
      words.push(carry)
      carry = a.trim()
    } else {
      carry += a
    }
  }

  words.push(carry)

  return words
}

export default tokenizer
