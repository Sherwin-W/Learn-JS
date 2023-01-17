var number  = 5; // in-line comment

/* this is a 
multi-lined comment */

number = 9;

/* data types: 
undefined, null, boolean, string, symbol, number, and object
*/

var myName = "Sherwin"
//var represents ANY variable

let ourName = "Besties"
//only used within scope where we declared it

const pi = 3.14
//variable that should NEVER change, ERROR if changed

var a;
var b = 2;
//semicolons are not required, but helpful for viewing the end of the line

a = 7;
a = b;
//declaring and assigning are same as java

a += "String";
//because var is a generic variable, integers and strings can be added together

console.log(a);

//+, -, *, /, % operators all work the same as in java

//increment with ++, decrememnt with --

//we can use \" for quotes in strings. But we can also use '', or single quotes to create strings. 
//BUT if we use ``, we can use both '' and "" in strings

var nameLength = myName.length;
//just like java, finds the length
console.log(nameLength);
var firstLetter = myName[0];


function wordBlanks(noun, adj, verb, adv){
    var result = "";
    result += "The " + adj + " " + noun + " " + verb + " " + adv + " to the store";
    return result;
}

console.log(wordBlanks("dog", "big", "ran", "quickly"));

//creating and using functions, which are really methods

var myArray = ["John", 23];
//arrays are not limited to a single data type
var multiDimentional = [["Bulls", 23],["White Sox", [2, 4]]];
//arrays can also contain arrays
//if we do array[0][0], it find the index 0 value of the index 0 value

//we can use a array.push() function to add a value to end of the array, like ArrayList.add() in java
//array.pop() removes the last element
//array.shift() removes the first element
