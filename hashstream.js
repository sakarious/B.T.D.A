/* Write a program to perform a Get request on the route

https://coderbyte.com/api/challenges/json/age-counting

which contains aa data key and the value is a string which contains
items in the format key=STRING, age=INTEGER.

Your goal is to count how many items
exist that have an age equal to 32.

Then you should create a write stream to a file
called output.txt and the contents should be the key values (from the
json) each on a
separate line in the order they appeared in the  json file (the file
should end with a
newline character on its own line).

Finally, then output the SHA1 hash of the file.
*/

const https = require('https')
const fs = require('fs')
const crypto = require('crypto')

https.get('https://coderbyte.com/api/challenges/json/age-counting', (response) => {
    let data = ''

    response.on('data', (bytes) => {
        data = data + bytes
    })

    response.on('end', () => {
        //console.log(data);
        //Parse to JSON
        let parsedData = JSON.parse(data)
        //console.log(parsedData);
        //Extract data for use
        let parsedD = parsedData.data
        //console.log(parsedD);
        //turn parsedD to array
        let keyValueArray = parsedD.split(',')
        //console.log(keyValueArray);

        //Remove ' age=' to work with an array of object
        let filtertedAgeArray = keyValueArray.map((data) => {
            return data.replace(" age=", "")
        })

        //console.log(filtertedAgeArray);

        //Remove ' key=' to work with an array of object
        let filtertedKeyArray = filtertedAgeArray.map((data) => {
            return data.replace(" key=", "")
        })

        //console.log(filtertedKeyArray);

        let arrayOfObject = []
        for (let index = 0; index < filtertedKeyArray.length; index = index + 2) {
            arrayOfObject.push({key: filtertedKeyArray[index], age: filtertedKeyArray[index + 1]})
        }
        //console.log(arrayOfObject);

        //Now we filter array to get ages equal to 32
        let ages32 = arrayOfObject.filter((data) => {
            return data.age == '32'
        })

        //console.log(ages32);

        let itemsInAges32 = ages32.length
        console.log(itemsInAges32);

        const stream = fs.createWriteStream("output.txt", {flags:'a'});
        ages32.forEach( function (item,index) {
            stream.write(JSON.stringify(ages32[index]) + "\n");
        });
        stream.end();

        //create hash object
        let hash = crypto.createHash('sha1')
        //passing the file to be hashed
        let fileHash = hash.update('output.txt')
        //creating hash in the required format
        let genHash = fileHash.digest('hex')
        console.log('SHA1 HASH is : ', genHash);
    })

    response.on('error', (err) => {
        console.log(err.message);
    })
    
})