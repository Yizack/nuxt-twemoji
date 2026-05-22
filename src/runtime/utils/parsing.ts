const vs16RegExp = /\uFE0F/g
const zeroWidthJoiner = String.fromCharCode(0x200D)

export const removeVS16s = (rawEmoji: string) => {
  return !rawEmoji.includes(zeroWidthJoiner) ? rawEmoji.replace(vs16RegExp, '') : rawEmoji
}
