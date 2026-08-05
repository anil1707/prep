const debounce = (callback, delay=1000) =>{
    let timer = "";

    return (...props) => {
        
             clearTimeout(timer)
            let id = setTimeout(() => {
                return callback.apply(this, props)
            }, delay);
            timer = id;
    }
}


// // test 1 with browser
// const searchField = document.getElementById('search');
// console.log("seradsf", searchField)

// const handleOnSearch = (event) => {
//     console.log("Instant value:", event.target.value);
// }

// searchField.addEventListener("input", debounce(handleOnSearch, 500))


// text with console only
// const debounced = debounce((msg) => {
//     console.log(msg);
// }, 1000);

// debounced("A");
// debounced("B");
// debounced("C");

// throttle

// const throttle = (callback, wait = 1000) => {
//     let shouldAllow = false;
    
//     return function(...args){
//         if(shouldAllow){
//             console.log("skipped: ", ...args)
//             return
//         }
//         callback.apply(this, args);
//         shouldAllow = true;
//         setTimeout(() => {
//             shouldAllow = false;
//         }, wait)
//     }

// }

// const buttonClick = (message) => {
//     console.log("hello", message);
// }

// const throttled = throttle(buttonClick, 1000);

// setTimeout(() => throttled("A"), 0);
// setTimeout(() => throttled("B"), 500);

// setTimeout(() => throttled("C"), 1000);

// setTimeout(() => throttled("D"), 1500);

// setTimeout(() => throttled("E"), 2000);

// setTimeout(() => throttled("F"), 2600);


// currying function

// const tax = (amount, taxRate) =>{
//     return amount * taxRate;
// }

// console.log(tax(100, 0.18));
// now convert it into curry function

// function tax(rate){
//         return function(amount){
//             return rate*amount;
//         }
// }

// const calculateGST = tax(0.18);
// const otherTax = tax(0.12);

// const amount = 1000;

// let totalTax = calculateGST(amount) + otherTax(amount);
// console.log("total tax: ", totalTax)

// example 2
// logger

// function logger(level){
//     return function(message){
//         console.log("[",level,"]:", message)
//     }
// }

// const infoLogger = logger("INFO");
// const errorLogger = logger("ERROR");
// const warningLoger = logger("WARNING");

// infoLogger("This is depricated, you can use lates version");
// infoLogger("API depricated");
// warningLoger("Should keep useState at top");
// errorLogger("Someting went wrong")

// // example 3: api wrapper

// const request = (method) =>{
//     return function(url){
//         console.log(method, ":", url)
//     }
// }

// const get = request("GET");
// const post = request("POST")

// get("/user/info")
// post("/add/new-user")

// memoization

const memoization = (callback) => {
    let cache = {};

    return function(...args){
        let key = JSON.stringify(args);
        if(key in cache){
            console.log("from cache")
            return cache[key]
        }

        console.log("calculating...");
        let result = callback.apply(this, args);
        cache[key] = result;
        return result;
    }
}

const square = (number) => {
    return number*number;
}

const memoizedSqare = memoization(square);

console.log(memoizedSqare(5));
console.log(memoizedSqare(5));
console.log(memoizedSqare(4));
console.log(memoizedSqare(4));
console.log(memoizedSqare(6));
console.log(memoizedSqare(5))
