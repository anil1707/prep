console.log("ARRAY POLYFILL");

let arr = [3, 4, 5, 6];

let newArr = arr.map((item, i, j) => {
    console.log("item: ", item, i, j)
});
console.log("new array: ", newArr)

// map polyfill
Array.prototype.myMap = function(callback){
    let result = [];
    console.log("this: ", this)
    for(let i=0;i<this.length;i++){
        result.push(callback(this[i], i, this))
    }
    return result;
}

let ans = arr.myMap((item, i) => item*3+3);
console.log("ans: ", ans)

// filter
// let ans2 = arr.filter(item => item %2 == 0)
// console.log("ans2: ", ans2)

// filter polyfill
Array.prototype.myFilter = function(callback){
    const result = [];
    for(let i=0;i<this.length;i++){
        if(callback(this[i])){
            result.push(this[i]);
        }
    }
    return result;
}

let ans3 = arr.myFilter(item => item %2 == 0)
console.log("ans3: ", ans3)

// reduce
// let ans4 = arr.reduce((item, acc) =>  item + acc, 10);

// console.log("ans4: ", ans4)

// reduct polyfil
Array.prototype.myReduce = function(callback, initialValue = 0){
    let ans = initialValue;
    for(let i=0;i<this.length;i++){
        ans += this[i];
    }
    return ans;
}

let ans4 = arr.myReduce((item, acc) =>  item + acc, 10);

console.log("ans4: ", ans4)


// flat
let arr1 = [1, 2, 3, [4, 5, [6, 7, [8, 9]]]];

console.log(arr1.flat(1))
console.log(arr1.flat(Infinity))

// flat polyfill
Array.prototype.myFlat = function(flatCount){
    let ans = [];
    let count = 1;
    const flat = (arr) => {
        for(let i=0;i<arr.length;i++){
            if(Array.isArray(arr[i])){
                if(count == flatCount){
                    ans.push(arr[i])
                    return;
                }
                count++;
                flat(arr[i]);
            } else {
                ans.push(arr[i]);
            }
        }
    }
    flat(this)
    return ans;
}

console.log("flat polyfill: ", arr1.myFlat(2))