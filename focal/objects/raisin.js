// Raisin' Arizona
const raisinAlarm = function (cookie) {
  // Put your solution here
  let isFound = false;
  for(let ingredient in cookie){
    if(cookie[ingredient] === "🍇"){
      isFound = true;
      break;
    }
  }
  // Using the ternary to return the correct string
  return isFound === true ? "Raisin alert!" : "All good!";
};

console.log(raisinAlarm(["🍫", "🍫", "🍇", "🍫"]));
console.log(raisinAlarm(["🍫", "🍇", "🍫", "🍫", "🍇"]));
console.log(raisinAlarm(["🍫", "🍫", "🍫"]));

// Stretch Activity

const raisinAlarmArray = function(cookies) {
  // Put your solution here
  let response = [];
  for (const cookie of cookies) {
    response.push(raisinAlarm(cookie));
  }
  return response;
};

console.log(
  raisinAlarmArray([
    ["🍫", "🍫", "🍇", "🍫"],
    ["🍫", "🍇", "🍫", "🍫", "🍇"],
    ["🍫", "🍫", "🍫"],
  ])
);

//TEST CASE 2
console.log(
  raisinAlarmArray([
    ["🍫", "🍫", "🍇", "🍫"],
    ["🍫", "🍇", "🍫"]
  ])
);