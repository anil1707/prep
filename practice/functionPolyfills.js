console.log("call, apply and bind pollyfill practice")

function hello(city, place){
    console.log("this value: ", this)
    console.log("hey: ", this.name, "from ", city, place);
}

let obj = {
    name:"anil",
}

Function.prototype.myCall = function(context, ...args){
    context.tempFunc = this;
    context.tempFunc(...args);
    delete context.tempFunc;
    return;
}

Function.prototype.myapply = function(context, [...args]){
    context.tempFunc = this;
    context.tempFunc(...args);
    delete context.tempFunc
    return
}

Function.prototype.myBind = function(context, ...args){
    context.tempFunc = this
    let result = function(){
        let res = context.tempFunc(...args)
        delete context.tempFunc;
        return res
    }
    
    return result
}

console.log("obj:", obj)

let func = hello.myBind(obj, "mumbai", "malad");

func();

