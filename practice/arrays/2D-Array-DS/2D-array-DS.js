'use strict';

// hacker rank reference:
// https://www.hackerrank.com/challenges/2d-array/problem?h_l=interview&playlist_slugs%5B%5D=interview-preparation-kit&playlist_slugs%5B%5D=arrays

const fs = require('fs');

process.stdin.resume();
process.stdin.setEncoding('utf-8');

let inputString = '';
let currentLine = 0;

process.stdin.on('data', inputStdin => {
    inputString += inputStdin;
});

process.stdin.on('end', _ => {
    inputString = inputString.replace(/\s*$/, '')
        .split('\n')
        .map(str => str.replace(/\s*$/, ''));

    main();
});

function readLine() {
    return inputString[currentLine++];
}

// given a location in the matrix, get the hour glass at that "location."
// The "location" is defined as the "a" coordinate
function getHourglass(matrix, i, j) {

    return {
        a: matrix[i][j],
        b: matrix[i][j + 1],
        c: matrix[i][j + 2],
        d: matrix[i + 1][j + 1],
        e: matrix[i + 2][j],
        f: matrix[i + 2][j + 1],
        g: matrix[i + 2][j + 2]
    }
}

// compute the hourglass sum
function computeHourGlassSum(hourglass) {
    return (
        hourglass.a +
        hourglass.b +
        hourglass.c +
        hourglass.d +
        hourglass.e +
        hourglass.f +
        hourglass.g
    );
}

// Complete the hourglassSum function below.
function hourglassSum(arr) {

    // collect all of the hourglasses into a list
    const hourglassSums = [];

    for (let i = 0; i < arr.length - 2; i++) {
        for (let j = 0; j < arr[i].length - 2; j++) {

            hourglassSums.push(
                computeHourGlassSum(
                    getHourglass(arr, i, j)
                )
            );
        }
    }

    // sort
    const sorted = hourglassSums.sort((h1, h2) => {
        return h2 - h1;
    });
    return sorted[0];

}

function main() {
    process.env.OUTPUT_PATH = './test-data';

    const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

    let arr = Array(6);

    for (let i = 0; i < 6; i++) {
        arr[i] = readLine().split(' ').map(arrTemp => parseInt(arrTemp, 10));
    }

    let result = hourglassSum(arr);

    ws.write(result + "\n");

    ws.end();
}
