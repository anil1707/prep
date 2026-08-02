console.log("PROMISE POLYFILL")


// promise practice
let promise = new Promise((resolve, reject)=> {
    let isSuccess = true
    if(isSuccess){
        resolve("promise resolved")
    } else {
        reject("promise rejected")
    }
})

// promise.then(data =>{
//     throw new Error(  "no reason")
// }).then(data => {
//     console.log("data", data)
// }).catch(error => {
//     console.log(error)
// })

let p1 = new Promise((resolve, reject)=>{
    return setTimeout(() => {
        resolve("resovled promise 1")
    }, (10000));
})

let p2 = Promise.resolve("Promise 2 resovled");
let p3 = Promise.resolve("Promise 3 resoved")

let promise1 = Promise.all([p1, p2, p3])

// promise1.then(data =>{
//     console.log("data:", data)
// }).catch(error => console.log("error: ",error))

// promise all polyfill
Promise.myAll = function (promises) {
    return new Promise((resolve, reject) => {
        let result = [];
        let count = 0;
        console.log(this)
        for (let i = 0; i < promises.length; i++) {
            Promise.resolve(promises[i]) // this extra promise only to handle if promises has non promise item
                .then(value => {
                    result[i] = value;

                    count++;

                    if (count === promises.length) {
                        resolve(result);
                    }
                }).catch(reject)
        }
    })

}

// Promise.myAll([p1, p2, p3, 5]).then(data => console.log("data: ", data))

// primise.race polyfill

Promise.myRace = function(promises){
    return new Promise((resolve, rejet) => {
        for(let i=0;i<promises.length;i++){
            Promise.resolve(promises[i])
            .then(value => {
                resolve(value)
            }).catch(rejet)
        }
    })
}

let p4 = Promise.reject("promise rejected")

// Promise.myRace([p1, p4, p2, p3, ]).then(data => console.log(data)).catch(err => console.log(err))

// promise.any polyfill 
Promise.myAny = function(promises){
    return new Promise((resolve, reject) =>{
        let error = [];
        let count = [];
        for(let i=0;i<promises.length;i++){
            Promise.resolve(promises[i])
            .then(resolve)
            .catch(err => {
                error[i] = err
                count++;
                if(count == promises.length){
                    reject(error)
                }
            })
        }
    })
}

Promise.myAny([p2, p3, p4]).then(value=> console.log(value)).catch(error => console.log("error: ", error))