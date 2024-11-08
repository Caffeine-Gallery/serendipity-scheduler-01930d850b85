import { backend } from "declarations/backend";

let timer;
let timeLeft = 25 * 60; // 25 minutes in seconds
let isRunning = false;
const WORK_TIME = 25 * 60;
const BREAK_TIME = 5 * 60;
let isBreak = false;

async function updateStats() {
    try {
        const [sessions, totalTime] = await backend.getStats();
        document.getElementById('totalSessions').textContent = sessions.toString();
        document.getElementById('totalTime').textContent = Math.floor(totalTime / 60).toString();
    } catch (error) {
        console.error('Error updating stats:', error);
    }
}

async function updateColor() {
    try {
        const color = await backend.getRandomColor();
        document.querySelector('.progress-bar').style.backgroundColor = color;
    } catch (error) {
        console.error('Error updating color:', error);
    }
}

async function showMessage(isBreakMessage = false) {
    const messageBox = document.getElementById('messageBox');
    const messageElement = document.getElementById('message');
    
    try {
        const message = isBreakMessage ? 
            await backend.getRandomTip() :
            await backend.getRandomQuote();
        
        messageBox.classList.remove('d-none');
        messageElement.textContent = message;
    } catch (error) {
        console.error('Error fetching message:', error);
    }
}

function updateDisplay() {
    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;
    
    document.getElementById('minutes').textContent = minutes.toString().padStart(2, '0');
    document.getElementById('seconds').textContent = seconds.toString().padStart(2, '0');
    
    const totalTime = isBreak ? BREAK_TIME : WORK_TIME;
    const progress = (timeLeft / totalTime) * 100;
    document.getElementById('progress-bar').style.width = `${progress}%`;
}

async function startTimer() {
    if (isRunning) return;
    
    isRunning = true;
    document.getElementById('startButton').disabled = true;
    document.getElementById('resetButton').disabled = false;
    document.getElementById('messageBox').classList.add('d-none');
    
    await updateColor();

    timer = setInterval(async () => {
        timeLeft--;
        updateDisplay();
        
        if (timeLeft <= 0) {
            clearInterval(timer);
            
            if (!isBreak) {
                // Record completed focus session
                await backend.recordSession(WORK_TIME / 60);
                await updateStats();
                
                // Switch to break
                isBreak = true;
                timeLeft = BREAK_TIME;
                await showMessage(true);
            } else {
                // Switch back to work
                isBreak = false;
                timeLeft = WORK_TIME;
                await showMessage(false);
            }
            
            isRunning = false;
            document.getElementById('startButton').disabled = false;
            updateDisplay();
        }
    }, 1000);
}

function resetTimer() {
    clearInterval(timer);
    isRunning = false;
    isBreak = false;
    timeLeft = WORK_TIME;
    document.getElementById('startButton').disabled = false;
    document.getElementById('resetButton').disabled = true;
    document.getElementById('messageBox').classList.add('d-none');
    updateDisplay();
}

// Event Listeners
document.getElementById('startButton').addEventListener('click', startTimer);
document.getElementById('resetButton').addEventListener('click', resetTimer);

// Initial setup
updateDisplay();
updateStats();
updateColor();
