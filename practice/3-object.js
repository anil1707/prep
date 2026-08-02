console.log("Object Topic");

// way to create object:
// 1. Object Literal (Recommended)
 const obj = {
    name: "Anil",
    city: "mumbai",
     greet(){
        console.log("hello")
    }
 };

//  2. new Object()
let obj2 = new Object();

// 3. Constructor Function
function User(name, city){
    this.city = city;
    this.name = name;
}

const user1 = new User("anil", "mumbai");
const user2 = new User("Rahul", "varanasi");
console.log("user1 & user2: ", user1, user2)

// 4. Object.create()

let obj3 = Object.create(obj)

console.log("obj3: ", obj3)
console.log("obj3 prototype: ", Object.getPrototypeOf(obj3));

// 5. Object.assign() ==> used for shallow copy 

const obj4 = Object.assign({}, obj);
console.log("obj4: ", obj4)


const newObj = Object.create(obj);

console.log("newObj: ", newObj)


