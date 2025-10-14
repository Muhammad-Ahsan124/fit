// script.js - Fixed version

document.addEventListener('DOMContentLoaded', function() {
    const recommendationButton = document.getElementById('recommendationButton');
    const fitnessPlanSection = document.getElementById('fitnessPlan');
    
    if (recommendationButton) {
        recommendationButton.addEventListener('click', function() {
            // Get all form values
            const age = document.getElementById('age')?.value;
            const gender = document.getElementById('gender')?.value;
            const fitnessLevel = document.getElementById('fitnessLevel')?.value;
            const primaryGoal = document.getElementById('primaryGoal')?.value;
            const availableTime = document.getElementById('availableTime')?.value;
            const preferredIntensity = document.getElementById('preferredIntensity')?.value;

            // Validate all fields are filled
            if (!age || !gender || !fitnessLevel || !primaryGoal || !availableTime || !preferredIntensity) {
                alert('Please complete all fields in your health profile!');
                return;
            }

            // Generate personalized plan
            const plan = generateFitnessPlan({
                age: parseInt(age),
                gender: gender,
                fitnessLevel: parseInt(fitnessLevel),
                primaryGoal: primaryGoal,
                availableTime: parseInt(availableTime),
                preferredIntensity: preferredIntensity
            });

            // Display the plan
            displayFitnessPlan(plan);
        });
    }

    function generateFitnessPlan(profile) {
        let plan = {
            title: `Personalized ${profile.primaryGoal} Plan`,
            description: '',
            warmup: '',
            workout: [],
            recommendations: []
        };

        // Customize based on goal and intensity
        switch(profile.primaryGoal.toLowerCase()) {
            case 'weight loss':
                plan.description = `High-intensity fat burning program for ${profile.gender}, age ${profile.age}`;
                plan.warmup = '5-minute dynamic warm-up (jumping jacks, high knees, arm circles)';
                
                if (profile.preferredIntensity === 'High') {
                    plan.workout = [
                        'HIIT Circuit (35 minutes):',
                        '- Burpees: 45 seconds work, 15 seconds rest',
                        '- Mountain Climbers: 45 seconds work, 15 seconds rest',
                        '- Kettlebell Swings: 45 seconds work, 15 seconds rest',
                        '- Box Jumps: 45 seconds work, 15 seconds rest',
                        '- Repeat circuit 4 times'
                    ];
                }
                plan.recommendations = [
                    'Focus on compound movements for maximum calorie burn',
                    'Maintain 75-85% max heart rate during workouts',
                    'Combine with calorie deficit diet',
                    `Drink ${3 + (profile.intensity === 'High' ? 1 : 0)}L water daily`
                ];
                break;

            case 'muscle gain':
                plan.description = `Muscle building program for ${profile.gender}, fitness level ${profile.fitnessLevel}/10`;
                plan.warmup = '5-10 minute dynamic stretching and light cardio';
                plan.workout = [
                    'Strength Training (35 minutes):',
                    '- Squats: 3 sets of 8-12 reps',
                    '- Bench Press: 3 sets of 8-12 reps',
                    '- Deadlifts: 3 sets of 6-10 reps',
                    '- Pull-ups/Lat Pulldowns: 3 sets of 8-12 reps',
                    '- Shoulder Press: 3 sets of 10-15 reps'
                ];
                plan.recommendations = [
                    'Focus on progressive overload',
                    'Ensure adequate protein intake (1.6-2.2g per kg body weight)',
                    'Rest 60-90 seconds between sets',
                    'Get 7-9 hours of sleep for recovery'
                ];
                break;

            case 'endurance':
                plan.description = `Endurance building program for ${profile.age} year old`;
                plan.warmup = '5-minute light jogging and dynamic stretches';
                plan.workout = [
                    'Cardio Focus (35 minutes):',
                    '- Interval Running: 30s sprint, 90s walk (repeat 10x)',
                    '- Or Continuous jogging at moderate pace',
                    '- Include hill intervals if possible'
                ];
                plan.recommendations = [
                    'Gradually increase distance/duration each week',
                    'Monitor heart rate zones',
                    'Stay hydrated during longer sessions',
                    'Incorporate cross-training'
                ];
                break;

            default:
                plan.description = 'General fitness program';
                plan.workout = ['30-minute full body workout with cardio and strength components'];
        }

        return plan;
    }

    function displayFitnessPlan(plan) {
        const planElement = document.getElementById('fitnessPlanContent');
        if (!planElement) return;

        let planHTML = `
            <h3>${plan.title}</h3>
            <p><strong>Description:</strong> ${plan.description}</p>
            
            <h4>Your Workout Structure:</h4>
            <p><strong>Warm-up:</strong> ${plan.warmup}</p>
            
            <h4>Main Workout:</h4>
            <ul>
                ${plan.workout.map(item => `<li>${item}</li>`).join('')}
            </ul>
            
            <h4>Key Recommendations:</h4>
            <ul>
                ${plan.recommendations.map(rec => `<li>${rec}</li>`).join('')}
            </ul>
            
            <p><em>Note: Always consult with a healthcare professional before starting any new fitness program.</em></p>
        `;

        planElement.innerHTML = planHTML;
        
        // Make sure the plan section is visible
        const fitnessPlanSection = document.getElementById('fitnessPlan');
        if (fitnessPlanSection) {
            fitnessPlanSection.style.display = 'block';
        }
    }
});
