//变量提升
console.log(a) // undefined
var a = 1;

//实际运行代码
// var a
// console.log(a)
// a = 1

var num = 0
while (num < 10) {
  num++
  if (num % 2 == 0) continue
  console.log(num)
}