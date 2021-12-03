const fs = require('fs')
var readline = require('readline');
var rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  terminal: true
});

function rank(p,np,len,inlen) {
	let rank = p-(Math.abs(len-10)/30)
	//console.log(p,np,len,inlen,rank)
	return rank
}

// find the index of the best matching entry in the ref array
function find_best_match(input_string,ref) {
  let words = {}
  let input = input_string.split(" ")
  for (i of input) {
     if (!words[i]) {
         words[i] = true;
     }
  }

  let max = -100
  let idx = -1

  for (senid in ref) {
    let sen = ref[senid]
    let swords = sen.split(" ").filter((x) => x.length > 1)

    let np = 0

   let  p = 0

    for (sword of swords) {
      if (words[sword]) {
        p = p + 1
      } else {
        np = np + 1
      }
    }

    if (rank(p,np,swords.length,input.length) > max) {
       max = rank(p,np,swords.length,input.length)
       idx = senid
       //console.log(ref[senid])
    }

  }
  return idx;
}

fs.readFile('big.txt', 'utf8' , (err, text) => {

  if (err) {
    console.error(err)
    return
  }

  let lines = text.split('\n').filter((x) => x.length > 1);

  rl.on("line", (x) => {
    let bestidx = find_best_match(x ,lines)

    let resp = lines[parseInt(bestidx,10)+1]

    console.log(`<< ${lines[bestidx]} : ${resp}`)

    process.stdout.write("> ");

  })
})
