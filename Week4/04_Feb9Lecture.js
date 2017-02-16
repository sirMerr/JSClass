/* Some of the Feb 9th lecture examples in random order */

// callback function example
function printBanana(x, yell) {
  if (typeof yell !== "function"){
    //throw new Err....
  }
  if (1 + x > 0){
    console.log("banana!");
  } else {
    yell();
  }
}

function myAwesomeYelling() {
  throw new Error("baaaa");
}

printBanana(-5, myAwesomeYelling);

// A function that returns another function (and a closure)
o = {"day": "Wed",  isToday: true};

function getProp(name, obj) {
  // creating a closure
  var result = function() {
    if (name in obj) { // obj[name] === "undefined"
      // obj.name.toString() same as obj["name"].toString()
      // obj[name.toString()]
      // obj["isToday"]
      return obj[name]; // Why not obj.name? it's obj["name"]
    } else {
      // throw new Error("message");
      console.log("Doesn't exist");
      return false;
    }
  };
  return result;
}

// x is a function
var x = getProp("isToday", o);
// y is true
var y = x();
// w is true
var w = getProp("isToday", o)();

//o.isToday
//o["isToday"]
