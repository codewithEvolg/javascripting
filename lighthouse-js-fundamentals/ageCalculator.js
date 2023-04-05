const ageCalculator = function(name, yearOfBirth, currentYear){
  let age = currentYear - yearOfBirth;
  let outCome = name + " is " + age + "years old.";
  return outCome;
}
console.log(ageCalculator("Suzie", 1983, 2015));
console.log(ageCalculator("Jack", 2003, 2015));
console.log(ageCalculator("Ali", 2023, 2023));