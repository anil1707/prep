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


// test 1 with browser
const searchField = document.getElementById('search');
console.log("seradsf", searchField)

const handleOnSearch = (event) => {
    console.log("Instant value:", event.target.value);
}

searchField.addEventListener("input", debounce(handleOnSearch, 500))


// text with console only
const debounced = debounce((msg) => {
    console.log(msg);
}, 1000);

debounced("A");
debounced("B");
debounced("C");

