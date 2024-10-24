let timer;
        let startTime;
        let elapsedTime = 0;
        let isRunning = false;

        const clock = document.getElementById('clock');
        const timeDisplay = document.getElementById('time');
        const dateDisplay = document.getElementById('date');
        const startButton = document.getElementById('startButton');
        const lapButton = document.getElementById('lapButton');
        const pauseButton = document.getElementById('pauseButton');
        const stopButton = document.getElementById('stopButton');
        const resetButton = document.getElementById('resetButton');
        const lapsContainer = document.getElementById('laps');

        function updateDisplay() {
            const now = Date.now();
            const diff = now - startTime + elapsedTime;
            const hours = Math.floor(diff / 3600000);
            const minutes = Math.floor((diff % 3600000) / 60000);
            const seconds = Math.floor((diff % 60000) / 1000);
            const milliseconds = Math.floor((diff % 1000) / 10);

            timeDisplay.textContent = `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
            dateDisplay.textContent = `${String(seconds).padStart(2, '0')}:${String(milliseconds).padStart(2, '0')}`;
        }

        function startTimer() {
            startTime = Date.now();
            timer = setInterval(updateDisplay, 10);
            isRunning = true;
        }

        function stopTimer() {
            clearInterval(timer);
            elapsedTime += Date.now() - startTime;
            isRunning = false;
        }

        startButton.addEventListener('click', () => {
            startButton.classList.add('hidden');
            lapButton.classList.remove('hidden');
            pauseButton.classList.remove('hidden');
            stopButton.classList.remove('hidden');
            clock.classList.add('expanded');
            startTimer();
        });

        lapButton.addEventListener('click', () => {
            const lapTime = timeDisplay.textContent + ':' + dateDisplay.textContent.split(':')[1];
            const lapElement = document.createElement('div');
            lapElement.textContent = `Lap: ${lapTime}`;
            lapsContainer.appendChild(lapElement);
        });

        pauseButton.addEventListener('click', () => {
            if (isRunning) {
                stopTimer();
                pauseButton.textContent = 'Play';
            } else {
                startTimer();
                pauseButton.textContent = 'Pause';
            }
        });

        stopButton.addEventListener('click', () => {
            stopTimer();
            startButton.classList.remove('hidden');
            lapButton.classList.add('hidden');
            pauseButton.classList.add('hidden');
            stopButton.classList.add('hidden');
            clock.classList.remove('expanded');
        });

        resetButton.addEventListener('click', () => {
            stopTimer();
            elapsedTime = 0;
            timeDisplay.textContent = '00:00:00';
            dateDisplay.textContent = '00:00';
            lapsContainer.innerHTML = '';
            startButton.classList.remove('hidden');
            lapButton.classList.add('hidden');
            pauseButton.classList.add('hidden');
            stopButton.classList.add('hidden');
            clock.classList.remove('expanded');
        });