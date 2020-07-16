'use strict';

const fs = require('fs');

process.stdin.resume();
process.stdin.setEncoding('utf-8');

let inputString = '';
let currentLine = 0;

process.stdin.on('data', inputStdin => {
    inputString += inputStdin;
});

process.stdin.on('end', function () {
    inputString = inputString.replace(/\s*$/, '')
        .split('\n')
        .map(str => str.replace(/\s*$/, ''));

    main();
});

function readLine() {
    return inputString[currentLine++];
}

// calculate the error given two elements in the array
function error(m, mCurPos, n, nCurPos) {
    const mTargetPos = m - 1;
    const nTargetPos = n - 1;
    return Math.abs(mTargetPos - mCurPos) + Math.abs(nTargetPos - nCurPos);
}

// scan an array to find the two elements that have the highest combined error
function findBestPair(arr) {

    let m;
    let currMax = 0;
    let bestPair;

    for (let i = 0; i < arr.length; i++) {
        for (let j = i + 1; j < arr.length; j++) {

            const m = arr[i];
            const n = arr[j];

            const err = error(m, i, n, j);

            if (err > currMax) {
                currMax = err;
                bestPair = {first: i, second: j};
            }

        }
    }

    return bestPair;
}

// Complete the minimumSwaps function below.
function minimumSwaps(arr) {

    let swaps = 0;

    do {
        const bestPair = findBestPair(arr);
        if (!bestPair) {
            break;
        }
        // swap
        const tmp = arr[bestPair.second];
        arr[bestPair.second] = arr[bestPair.first]
        arr[bestPair.first] = tmp;

        swaps++;

    } while (1)

    return swaps;
}

function main() {
    process.env.OUTPUT_PATH = './test-data';

    const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

    const n = parseInt(readLine(), 10);

    const arr = readLine().split(' ').map(arrTemp => parseInt(arrTemp, 10));

    const res = minimumSwaps(arr);

    ws.write(res + '\n');

    ws.end();

    console.log(res)
}
