import _ from 'lodash';

let numCount: number = 7;
let minNum: number = 1;
let maxNum: number = 49;

function checkArgs() {
    if (argv.length > 2 && argv.length < 5) {
        console.log("Invalid number of arguments. To use default values, run the script without arguments.\nTo use custom value specify 3 arguments: count, min value and max value.");
        process.exit(1);
    }

    if (argv[2] && !Number.isNaN(Number(argv[2]))) numCount = Number(argv[2]);
    if (argv[3] && !Number.isNaN(Number(argv[3]))) minNum = Number(argv[3]);
    if (argv[4] && !Number.isNaN(Number(argv[4]))) maxNum = Number(argv[4]);

    if (numCount < 1) {
        console.log("Warning: count should be greater than 0\n");
        process.exit(1);
    }

    if (minNum >= maxNum) {
        console.log("Warning: min value should be less than max value\n");
        process.exit(1);
    }
    if (numCount > maxNum - minNum + 1) {
        console.log("Warning: cannot select", numCount, "unique numbers between", minNum, "and", maxNum, "\n");
        process.exit(1);
    }
}

function getNumbersFromAI(count: number, min: number, max: number): number[] {
    let nums: number[] = _.range(min, max);
    nums = _.shuffle(nums);
    return nums.slice(0, count);
}

function getNumbers(count: number, min: number, max: number): number[] {
    let nums: number[] = [];

    while (nums.length < count) {
        const a = _.random(min, max);
        if (!nums.includes(a)) nums.push(a);
    }
    return nums;
}

const argv = process.argv;

console.log("=== Loto numbers selector ===\n");

checkArgs();

console.log(">>> Draw ", numCount, " of ", maxNum - minNum + 1, "<<<\n");

console.log(">>> AI numbers:", getNumbersFromAI(numCount, minNum, maxNum), "<<<\n");

console.log(">>> My numbers:", getNumbers(numCount, minNum, maxNum));