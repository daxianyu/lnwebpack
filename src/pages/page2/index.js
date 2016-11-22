console.log(222);
var $ = require("jquery");

class Animal {
    constructor(x, y){
        this.x = x;
        this.y = y;
    }
    speech(){
        console.log(this.x + this.y)
    }
}

var cat = new Animal("cat  :",4);
cat.speech();

$.each([1,2,3], function (i) {
    console.log(i)
});

require("./test");

// window._ = require("angular");
