export function getUserSex(sex: number) {
  if (sex == 0) {
    return '男'
  }

  if (sex == 1) {
    return '女'
  }

  return '保密'
}
