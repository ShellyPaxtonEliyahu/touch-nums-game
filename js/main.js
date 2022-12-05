'use strict'

var gBoard
var gNums
var gNextNum
var gSize
var gInterval
var gTime
var gStartTime
var gIsGameStart = false

function onInit(level = 16) {
    if (gInterval) clearInterval(gInterval)
    resetTime()
    gIsGameStart = false
    gSize = level
    gNextNum = 1
    gNums = createNums()
    renderBoard(gNums)

}

function createNums() {

    const nums = []
    for (var i = 0; i < gSize; i++) {
        nums.push(i + 1)
    }
    const randNums = shuffle(nums)
    return randNums

}

function renderBoard(nums) {
    var strHtml = ''
    const boardSize = Math.sqrt(nums.length)
    for (var i = 0; i < boardSize; i++) {
        strHtml += '<tr>'
        for (var j = 0; j < boardSize; j++) {
            const cellNum = nums.pop()
            strHtml += `<td data-id=${cellNum} onclick="cellClicked(this, ${cellNum})">${cellNum}</td>`

        }

        strHtml += '</tr>'
    }
    const elBoard = document.querySelector('tbody.nums-board')
    elBoard.innerHTML = strHtml
}

function changeLevels(level) {
    if (level === 'easy') gSize = 16
    if (level === 'medium') gSize = 25
    if (level === 'hard') gSize = 36
    
    onInit(gSize)
}

function resetTime() {
    var elH2 = document.querySelector('.game-time')
    elH2.innerText = '0.000'
}

function startTimer() {
    gStartTime = Date.now() 
    gInterval = setInterval(() => {
        const seconds = (Date.now() - gStartTime) / 1000
        var elH2 = document.querySelector('.game-time')
        elH2.innerText = seconds.toFixed(3)
    }, 10);
}


function cellClicked(btn, num) {
    if (num === gNextNum) {
        if (num === 1) startTimer()
        btn.style.backgroundColor = "rgba(112, 131, 7, 0.726)"
        gNextNum++
    }
    if (gNextNum === gSize + 1) {
        clearInterval(gInterval)
    }

}






function shuffle(items) {
    var randIdx, keep;
    for (var i = items.length - 1; i > 0; i--) {
        randIdx = getRandomInt(0, items.length);
        keep = items[i];
        items[i] = items[randIdx];
        items[randIdx] = keep;
    }
    return items;
}

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
}

