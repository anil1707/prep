let arr = [1, 2, 3, 4];

let it1 = arr[Symbol.iterator]()

console.log(it1.next())
console.log(it1.next())
console.log(it1.next())
console.log(it1.next())
console.log(it1.next())

// polyfill

// Array.prototype.myIterator = function() {
//     let ind = 0;
//     const arr = this
//     return {
//         next(){
//             if(ind < arr.length){
//                 return {
//                     value: arr[ind++],
//                     done: false,
//                 }
//             } else {
//                 return {
//                     value: undefined,
//                     done: true,
//                 }
//             }
//         }
//     }
// }

// use generator function
Array.prototype.myIterator = function * () {
    let array = this;
    for(let i=0;i<array.length;i++){
        yield array[i];
    }

}

let it = arr.myIterator();
console.log(it.next());
console.log(it.next());
console.log(it.next());
console.log(it.next());
console.log(it.next());