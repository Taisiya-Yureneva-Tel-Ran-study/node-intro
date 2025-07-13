import _ from 'lodash';

let count: number = 7;
let min: number = 1;
let max: number = 49;

const argv = process.argv;

console.log("=== Loto imitator ===\n");

if (argv.length > 2 && argv.length < 5) {
    console.log("Invalid number of arguments. To use default values, run the script without arguments.\nTo use custom value specify 3 arguments: count, min value and max value.");
    process.exit(1);
}

if (argv[2] && !Number.isNaN(Number(argv[2]))) count = Number(argv[2]);
if (argv[3] && !Number.isNaN(Number(argv[3]))) min = Number(argv[3]);
if (argv[4] && !Number.isNaN(Number(argv[4]))) max = Number(argv[4]);

if (min >= max) {
    console.log("Warning: min value should be less than max\n");
    process.exit(1);
}
if (count > max - min + 1) {
    console.log("Warning: cannot select", count, "unique numbers between", min, "and", max, "\n");
    process.exit(1);
}

console.log(">>> Draw ", count, " of ", max - min + 1, "<<<\n");

// A solution suggested by AI - it was too fast and nice, I did not have a chance to reject it...
let num: number[] = _.range(min, max );

num = _.shuffle(num);
num = num.slice(0, count);

console.log(">>> Numbers:", num);

// And below is my solution
let otherNums: number[] = [];

while (otherNums.length < count) {
    const a = _.random(min, max);
    if (!otherNums.includes(a)) otherNums.push(a);
}

console.log(">>> Numbers:", otherNums);