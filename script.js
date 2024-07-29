const workouts = [
    { name: "Jumping Jacks", calories: 100, video: "jumping-jacks.mp4", muscles: "Full Body" },
    { name: "Push-ups", calories: 50, video: "push-ups.mp4", muscles: "Chest, Shoulders, Triceps, Core" },
    { name: "Sit-ups", calories: 60, video: "sit-ups.mp4", muscles: "Abs" },
    { name: "Squats", calories: 80, video: "squats.mp4", muscles: "Legs, Glutes" },
    { name: "Lunges", calories: 70, video: "lunges.mp4", muscles: "Legs, Glutes" },
    { name: "Plank", calories: 40, video: "plank.mp4", muscles: "Core" },
    { name: "High Knees", calories: 90, video: "high-knees.mp4", muscles: "Legs, Core" },
    { name: "Butt Kicks", calories: 60, video: "butt-kicks.mp4", muscles: "Legs" },
    { name: "Mountain Climbers", calories: 70, video: "mountain-climbers.mp4", muscles: "Full Body, Core" },
    { name: "Burpees", calories: 100, video: "burpees.mp4", muscles: "Full Body" }
];

let currentWorkout = 0;
let timerInterval;
let timeLeft;

function createWorkoutPage(workout, index) {
    const workoutDiv = document.createElement('div');
    workoutDiv.className = 'workout fade-in';
    workoutDiv.id = `workout-${index}`;
    
    const workoutName = document.createElement('div');
    workoutName.className = 'workout-name';
    workoutName.textContent = workout.name;

    const video = document.createElement('video');
    video.controls = true;
    video.width = 300;
    video.src = workout.video;
    
    const timer = document.createElement('div');
    timer.className = 'timer';
    timer.id = `timer-${index}`;
    timer.textContent = `Time: 30s`;

    const buttons = document.createElement('div');
    buttons.className = 'buttons';

    const startButton = document.createElement('button');
    startButton.textContent = 'Start';
    startButton.onclick = () => startTimer(index);
    startButton.className = 'animated-button';

    const stopButton = document.createElement('button');
    stopButton.textContent = 'Stop';
    stopButton.onclick = stopTimer;
    stopButton.className = 'animated-button';

    buttons.appendChild(startButton);
    buttons.appendChild(stopButton);

    workoutDiv.appendChild(workoutName);
    workoutDiv.appendChild(video);
    workoutDiv.appendChild(timer);
    workoutDiv.appendChild(buttons);

    const caloriesBurnt = document.createElement('div');
    caloriesBurnt.className = 'calories-burnt';
    caloriesBurnt.id = `calories-${index}`;
    
    workoutDiv.appendChild(caloriesBurnt);

    const completeCheck = document.createElement('input');
    completeCheck.type = 'checkbox';
    completeCheck.disabled = true;
    completeCheck.className = 'complete-check';
    completeCheck.id = `complete-${index}`;
    completeCheck.onclick = () => completeWorkout(index);

    workoutDiv.appendChild(completeCheck);

    document.getElementById('workout-screens').appendChild(workoutDiv);
}

function loadWorkouts() {
    workouts.forEach((workout, index) => createWorkoutPage(workout, index));
    showWorkoutPage(0); // Show the first workout initially
}

function startTimer(index) {
    timeLeft = 30; // Reset timer for each workout
    updateTimerDisplay(index);

    timerInterval = setInterval(() => {
        timeLeft--;
        updateTimerDisplay(index);

        if (timeLeft <= 0) {
            clearInterval(timerInterval);
            document.querySelector(`#complete-${index}`).checked = true;
            completeWorkout(index);
        }
    }, 1000);
}

function updateTimerDisplay(index) {
    document.querySelector(`#timer-${index}`).textContent = `Time: ${timeLeft}s`;
}

function stopTimer() {
    clearInterval(timerInterval);
}

function completeWorkout(index) {
    const calories = workouts[index].calories;
    document.querySelector(`#calories-${index}`).textContent = `Calories Burnt: ${calories}`;
    document.querySelector(`#workout-${index}`).classList.remove('active');

    if (index < workouts.length - 1) {
        currentWorkout++;
        showWorkoutPage(currentWorkout);
    } else {
        showSummaryScreen();
    }
}

function showWorkoutPage(index) {
    // Hide all workout pages
    document.querySelectorAll('.workout').forEach(page => page.classList.remove('active'));
    // Show the current workout page
    document.getElementById(`workout-${index}`).classList.add('active');
}

function showSummaryScreen() {
    document.getElementById('workout-screens').style.display = 'none';

    const summaryList = document.getElementById('summary-list');
    summaryList.innerHTML = ''; // Clear previous content

    let totalCalories = 0;

    workouts.forEach((workout) => {
        const listItem = document.createElement('li');
        listItem.className = 'summary-item'; // Add a class for styling

        const workoutDetails = document.createElement('div');
        workoutDetails.className = 'summary-details';
        workoutDetails.innerHTML = `
            <strong>${workout.name}</strong><br>
            Calories Burnt: ${workout.calories}<br>
            Muscles Targeted: ${workout.muscles}
        `;

        listItem.appendChild(workoutDetails);
        summaryList.appendChild(listItem);

        totalCalories += workout.calories;
    });

    const totalCaloriesItem = document.createElement('li');
    totalCaloriesItem.className = 'summary-item total';
    totalCaloriesItem.innerHTML = `<strong>Total Calories Burnt: ${totalCalories}</strong>`;
    summaryList.appendChild(totalCaloriesItem);

    document.getElementById('summary-screen').style.display = 'block';
}

function showCompletionScreen() {
    document.getElementById('summary-screen').style.display = 'none';
    document.getElementById('completion-screen').style.display = 'block';
}

document.getElementById('user-info-form').addEventListener('submit', function (e) {
    e.preventDefault();
    document.getElementById('start-screen').style.display = 'none';
    loadWorkouts();
});

