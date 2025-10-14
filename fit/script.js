// script.js - Complete fixed version
document.addEventListener('DOMContentLoaded', function() {
    console.log('FitRec script loaded successfully');
    
    const recommendationButton = document.querySelector('button');
    const fitnessPlanSection = document.querySelector('#fitnessPlan');
    
    if (recommendationButton) {
        console.log('Recommendation button found');
        recommendationButton.addEventListener('click', generateFitnessPlan);
    } else {
        console.error('Recommendation button not found!');
    }

    function generateFitnessPlan() {
        console.log('Generate button clicked');
        
        // Get form values - using more flexible selectors
        const age = getInputValue('age');
        const gender = getInputValue('gender');
        const fitnessLevel = getInputValue('fitnessLevel');
        const primaryGoal = getInputValue('primaryGoal');
        const availableTime = getInputValue('availableTime');
        const preferredIntensity = getInputValue('preferredIntensity');

        console.log('Form values:', {age, gender, fitnessLevel, primaryGoal, availableTime, preferredIntensity});

        // Validate all fields
        if (!age || !gender || !fitnessLevel || !primaryGoal || !availableTime || !preferredIntensity) {
            alert('Please complete all fields in your health profile!');
            return;
        }

        // Create personalized plan
        const plan = createPersonalizedPlan({
            age: parseInt(age),
            gender: gender,
            fitnessLevel: parseInt(fitnessLevel),
            primaryGoal: primaryGoal,
            availableTime: parseInt(availableTime),
            preferredIntensity: preferredIntensity
        });

        // Display the plan
        displayFitnessPlan(plan);
    }

    function getInputValue(fieldName) {
        // Try multiple selector strategies
        const selectors = [
            `[name="${fieldName}"]`,
            `#${fieldName}`,
            `input[placeholder*="${fieldName}"]`,
            `select[title*="${fieldName}"]`
        ];
        
        for (const selector of selectors) {
            const element = document.querySelector(selector);
            if (element) {
                return element.value ? element.value.trim() : null;
            }
        }
        return null;
    }

    function createPersonalizedPlan(profile) {
        console.log('Creating plan for profile:', profile);
        
        let plan = {
            title: '',
            description: '',
            warmup: '',
            workout: [],
            coolDown: '',
            recommendations: [],
            weeklySchedule: []
        };

        // Customize plan based on primary goal
        switch(profile.primaryGoal.toLowerCase()) {
            case 'weight loss':
                plan.title = `High-Intensity Weight Loss Program`;
                plan.description = `Fat-burning program designed for ${profile.gender}, age ${profile.age}, fitness level ${profile.fitnessLevel}/10`;
                plan.warmup = '5-minute dynamic warm-up (jumping jacks, high knees, arm circles, leg swings)';
                
                if (profile.preferredIntensity === 'High') {
                    plan.workout = [
                        `HIIT Circuit Training (${profile.availableTime - 10} minutes):`,
                        '• Burpees: 45 seconds work, 15 seconds rest',
                        '• Mountain Climbers: 45 seconds work, 15 seconds rest', 
                        '• Kettlebell Swings: 45 seconds work, 15 seconds rest',
                        '• Jump Squats: 45 seconds work, 15 seconds rest',
                        '• Plank to Push-up: 45 seconds work, 15 seconds rest',
                        `• Repeat circuit ${Math.floor((profile.availableTime - 10) / 5)} times`
                    ];
                }
                plan.coolDown = '5-minute static stretching (hamstrings, quads, chest, shoulders)';
                plan.recommendations = [
                    'Maintain 75-85% of maximum heart rate during workouts',
                    'Combine with calorie-controlled diet for optimal results',
                    `Drink ${2.5 + (profile.preferredIntensity === 'High' ? 0.5 : 0)}L water daily`,
                    'Track progress with weekly measurements'
                ];
                plan.weeklySchedule = [
                    'Monday: Full Body HIIT',
                    'Tuesday: Active Recovery (30min walk)',
                    'Wednesday: Strength + Cardio',
                    'Thursday: Rest or Yoga',
                    'Friday: Full Body HIIT', 
                    'Saturday: Outdoor Activity',
                    'Sunday: Rest'
                ];
                break;

            case 'muscle gain':
                plan.title = `Muscle Building Strength Program`;
                plan.description = `Strength training program for ${profile.gender}, fitness level ${profile.fitnessLevel}/10`;
                plan.warmup = '5-10 minute dynamic stretching and light cardio';
                plan.workout = [
                    `Strength Training (${profile.availableTime - 10} minutes):`,
                    '• Barbell Squats: 3 sets of 8-12 reps',
                    '• Bench Press: 3 sets of 8-12 reps',
                    '• Bent-over Rows: 3 sets of 8-12 reps',
                    '• Shoulder Press: 3 sets of 10-15 reps',
                    '• Bicep Curls: 3 sets of 12-15 reps',
                    '• Rest 60-90 seconds between sets'
                ];
                plan.coolDown = '5-minute full body stretching';
                plan.recommendations = [
                    'Focus on progressive overload - increase weight gradually',
                    'Ensure protein intake: 1.6-2.2g per kg of body weight',
                    'Get 7-9 hours of sleep for optimal recovery',
                    'Consider protein timing around workouts'
                ];
                plan.weeklySchedule = [
                    'Monday: Upper Body Strength',
                    'Tuesday: Lower Body Strength', 
                    'Wednesday: Active Recovery',
                    'Thursday: Full Body Strength',
                    'Friday: Rest',
                    'Saturday: Full Body Hypertrophy',
                    'Sunday: Rest'
                ];
                break;

            case 'endurance improvement':
                plan.title = `Endurance Building Program`;
                plan.description = `Cardiovascular endurance program for ${profile.age} year old ${profile.gender}`;
                plan.warmup = '5-minute light jogging and dynamic stretches';
                
                if (profile.preferredIntensity === 'High') {
                    plan.workout = [
                        `High-Intensity Endurance (${profile.availableTime - 10} minutes):`,
                        '• Interval Running: 30s sprint, 60s walk (repeat 8-10x)',
                        '• Or: Hill repeats - 45s uphill run, 90s walk down',
                        '• Or: Fartlek training - varied pace running',
                        `• Total workout time: ${profile.availableTime} minutes`
                    ];
                }
                plan.coolDown = '5-minute walking and full body stretching';
                plan.recommendations = [
                    'Gradually increase distance/duration each week',
                    'Monitor heart rate zones (aim for 70-80% max HR)',
                    'Stay hydrated - drink during longer sessions',
                    'Incorporate cross-training (cycling, swimming)'
                ];
                plan.weeklySchedule = [
                    'Monday: Interval Training',
                    'Tuesday: Moderate Pace Run',
                    'Wednesday: Cross-Training',
                    'Thursday: Tempo Run',
                    'Friday: Active Recovery',
                    'Saturday: Long Slow Distance',
                    'Sunday: Rest'
                ];
                break;

            default:
                plan.title = 'General Fitness Program';
                plan.workout = ['30-minute full body workout with cardio and strength components'];
        }

        return plan;
    }

    function displayFitnessPlan(plan) {
        console.log('Displaying fitness plan:', plan);
        
        // Find or create the fitness plan display area
        let planContainer = document.querySelector('#fitnessPlan');
        if (!planContainer) {
            // Create container if it doesn't exist
            planContainer = document.createElement('div');
            planContainer.id = 'fitnessPlan';
            document.body.appendChild(planContainer);
        }

        // Build the plan HTML
        const planHTML = `
            <div style="background: #f8f9fa; padding: 20px; border-radius: 10px; margin-top: 20px;">
                <h2 style="color: #2c3e50; border-bottom: 2px solid #3498db; padding-bottom: 10px;">${plan.title}</h2>
                
                <div style="margin-bottom: 15px;">
                    <strong>Description:</strong> ${plan.description}
                </div>
                
                <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px; margin-bottom: 20px;">
                    <div>
                        <h3 style="color: #e74c3c;">Workout Structure</h3>
                        <p><strong>Warm-up:</strong> ${plan.warmup}</p>
                        
                        <h4>Main Workout:</h4>
                        <ul style="list-style: none; padding-left: 0;">
                            ${plan.workout.map(item => `<li style="margin-bottom: 8px; padding-left: 0;">${item}</li>`).join('')}
                        </ul>
                        
                        <p><strong>Cool-down:</strong> ${plan.coolDown}</p>
                    </div>
                    
                    <div>
                        <h3 style="color: #27ae60;">Weekly Schedule</h3>
                        <ul style="list-style: none; padding-left: 0;">
                            ${plan.weeklySchedule.map(item => `<li style="margin-bottom: 5px; padding: 5px; background: #ecf0f1; border-radius: 3px;">${item}</li>`).join('')}
                        </ul>
                    </div>
                </div>
                
                <div style="background: #e8f4fc; padding: 15px; border-radius: 5px;">
                    <h3 style="color: #2980b9; margin-top: 0;">Key Recommendations</h3>
                    <ul>
                        ${plan.recommendations.map(rec => `<li style="margin-bottom: 8px;">${rec}</li>`).join('')}
                    </ul>
                </div>
                
                <div style="margin-top: 15px; padding: 10px; background: #fff3cd; border-radius: 5px;">
                    <strong>Note:</strong> Always consult with a healthcare professional before starting any new fitness program. Listen to your body and adjust intensity as needed.
                </div>
            </div>
        `;

        // Update the container
        planContainer.innerHTML = planHTML;
        
        // Scroll to the plan
        planContainer.scrollIntoView({ behavior: 'smooth' });
        
        console.log('Fitness plan displayed successfully');
    }
});
