// /* Write a program to perform a Get request on the route

// https://coderbyte.com/api/challenges/json/age-counting

// which contains aa data key and the value is a string which contains
// items in the format key=STRING, age=INTEGER.

// Your goal is to count how many items
// exist that have an age equal to 32.

// Then you should create a write stream to a file
// called output.txt and the contents should be the key values (from the
// json) each on a
// separate line in the order they appeared in the  json file (the file
// should end with a
// newline character on its own line).

// Finally, then output the SHA1 hash of the file.
// */

// const https = require('https')
// const fs = require('fs')
// const crypto = require('crypto')

// https.get('https://coderbyte.com/api/challenges/json/age-counting', (response) => {
//     let data = ''

//     response.on('data', (bytes) => {
//         data = data + bytes
//     })

//     response.on('end', () => {
//         //console.log(data);
//         //Parse to JSON
//         let parsedData = JSON.parse(data)
//         //console.log(parsedData);
//         //Extract data for use
//         let parsedD = parsedData.data
//         //console.log(parsedD);
//         //turn parsedD to array
//         let keyValueArray = parsedD.split(',')
//         //console.log(keyValueArray);

//         //Remove ' age=' to work with an array of object
//         let filtertedAgeArray = keyValueArray.map((data) => {
//             return data.replace(" age=", "")
//         })

//         //console.log(filtertedAgeArray);

//         //Remove ' key=' to work with an array of object
//         let filtertedKeyArray = filtertedAgeArray.map((data) => {
//             return data.replace(" key=", "")
//         })

//         //console.log(filtertedKeyArray);

//         let arrayOfObject = []
//         for (let index = 0; index < filtertedKeyArray.length; index = index + 2) {
//             arrayOfObject.push({key: filtertedKeyArray[index], age: filtertedKeyArray[index + 1]})
//         }
//         //console.log(arrayOfObject);

//         //Now we filter array to get ages equal to 32
//         let ages32 = arrayOfObject.filter((data) => {
//             return data.age == '32'
//         })

//         //console.log(ages32);

//         let itemsInAges32 = ages32.length
//         console.log(itemsInAges32);

//         const stream = fs.createWriteStream("output.txt", {flags:'a'});
//         ages32.forEach( function (item,index) {
//             stream.write(JSON.stringify(ages32[index]) + "\n");
//         });
//         stream.end();

//         //create hash object
//         let sha1hash = crypto.createHash('sha1')
//         //passing the file to be hashed
//         let filename = __dirname + '/output.txt'
//         let hash = fs.ReadStream(filename)
//         hash.on('data', (chunk) => {
//             sha1hash.update(chunk)
//         })
//         hash.on('end', () => {
//             let hashHex = sha1hash.digest('hex')
//             console.log(hashHex + " " + filename);
//         })
//     })

//     response.on('error', (err) => {
//         console.log(err.message);
//     })
    
// })

// //let s = "he is a good programmer, he won 865 competitions, but sometimes he dont. What do you think? All test-cases should pass. Done-done?"

// // let wordArray = s.split(' ')
// // //console.log(wordArray);

// // let counter = 0



// //console.log(counter);

// // function howMany(sentence) {
// //     let wordArray = sentence.split(' ')
// //     let counter = 0
// //     for (let index = 0; index < wordArray.length; index++) {
// //          if (!(n(wordArray[index]))){
// //              counter = counter + 1
// //          } 
// //      }
// //      return counter
// // }


// // console.log(howMany(s));


// // function pthFactor(n, p) {
// //     let factors = []
// //     if (p === 1) {
// //         return 1
// //     }
// //     let counter = 1
// //     while ( counter < n) {
// //         if ( ( n % counter ) === 0 ) {
// //             factors.push(counter)
// //         }
// //     counter++
// //     }
// //     if ( p < 0 || p > factors.length ) {
// //         return 0
// //     } else {
// //         return factors[p - 1];
// //     }
// // }
// // let answer = isWithinFactorRange(15,1)
// // console.log(answer);




// // function isWithinFactorRange (n, p) {
// //     let factors = []
// //     if (p === 1) {
// //         return 1
// //     }
// //     let counter = 1
// //     while ( counter < n) {
// //         if ( ( n % counter ) === 0 ) {
// //             factors.push(counter)
// //         }
// //     counter++
// //     }
// //     if ( p < 0 || p > factors.length ) {
// //         return 0
// //     } else {
// //         return factors[p - 1];
// //     }
// // }

// let number = 130

// let f = []

// for (let index = 0; index <= number; index++) {
//     if (number % index == 0){
//         f.push(index)
//     }
// }

// console.log(f);\

// function validateDescription(object){
//     error = {}

//     if ('description' in object == false){
//         error.description = "DESCRIPTION IS A REQUIRED FIELD IN REQUEST BODY"
//     }
    
//     return { error, isValid: Object.keys(error).length == 0}
// }

// console.log(validateDescription({name: "Oluwasegun", description: "Present"}))
