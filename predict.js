const fs = require('fs')
var readline = require('readline');
var rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  terminal: true
});

let SubjectChangers = [""]

let excu = ["What?"]

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
  let sel_p = -1

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
       sel_p = p
       //console.log(ref[senid])
    }

  }
  return [idx,max,sel_p];
}

fs.readFile('big.txt', 'utf8' , (err, text) => {

  if (err) {
    console.error(err)
    return
  }

  let lines = text.split('\n').filter((x) => x.length > 1).filter((x) => x[0] != ">");

  rl.on("line", (x) => {
    let match = find_best_match(x ,lines)

    let bestidx = match[0];

    let rank = match[1];

    let resp = lines[parseInt(bestidx,10)+1]

    if (match[2]>0)
      console.log(`<< ${resp}`)
    else {
       let e = Math.floor(Math.random() * excu.length)
       console.log(`<< ${excu[e]}`)
    }

    process.stdout.write("> ");

  })
})

fs.readFile('excuses', 'utf8' , (err, text) => {

  if (err) {
    console.error(err)
    return
  }

  let lines = text.split('\n').filter((x) => x.length > 1);

  excu = lines
})
