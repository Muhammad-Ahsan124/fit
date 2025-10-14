// Recommendation Engine
class FitnessRecommender {
    constructor(dataset) {
        this.dataset = dataset;
        this.userProfile = {};
    }
    
    setUserProfile(profile) {
        this.userProfile = profile;
    }
    
    // Calculate similarity between user profile and activity
    calculateActivityScore(activityData) {
        let score = 0;
        
        // Fitness level alignment (higher fitness users can handle more intense workouts)
        const fitnessMatch = 1 - Math.abs(this.userProfile.fitnessLevel / 10 - activityData.avgFitnessLevel / 10);
        score += fitnessMatch * 0.3;
        
        // Goal alignment
        const goalMatch = this.calculateGoalMatch(activityData);
        score += goalMatch * 0.3;
        
        // Time availability match
        const timeMatch = 1 - Math.min(1, Math.abs(this.userProfile.availableTime - activityData.avgDuration) / 60);
        score += timeMatch * 0.2;
        
        // Intensity preference match
        const intensityMatch = this.calculateIntensityMatch(activityData);
        score += intensityMatch * 0.2;
        
        return score;
    }
    
    calculateGoalMatch(activityData) {
        switch(this.userProfile.goal) {
            case 'weight_loss':
                return activityData.avgCaloriesBurned / 20; // Higher calories = better for weight loss
            case 'muscle_gain':
                return activityData.strengthFocus / 10;
            case 'endurance':
                return activityData.enduranceFocus / 10;
            case 'maintenance':
                return 0.7; // Balanced activities
            default:
                return 0.5;
        }
    }
    
    calculateIntensityMatch(activityData) {
        const intensityValues = { 'Low': 1, 'Medium': 2, 'High': 3 };
        const userIntensity = intensityValues[this.userProfile.preferredIntensity];
        const activityIntensity = intensityValues[activityData.avgIntensity];
        
        return 1 - Math.abs(userIntensity - activityIntensity) / 2;
    }
    
    getRecommendations(limit = 5) {
        const activityScores = [];
        
        for (const activityType in this.dataset.activityStats) {
            const score = this.calculateActivityScore(this.dataset.activityStats[activityType]);
            activityScores.push({
                activity: activityType,
                score: score,
                data: this.dataset.activityStats[activityType]
            });
        }
        
        // Sort by score (descending) and return top recommendations
        return activityScores
            .sort((a, b) => b.score - a.score)
            .slice(0, limit);
    }
    
    // Generate a weekly plan based on recommendations
    generateWeeklyPlan(recommendations) {
        const plan = {};
        const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
        
        // Distribute activities throughout the week, alternating focus
        days.forEach((day, index) => {
            if (index % 7 < 5) { // Weekdays
                // Mix of cardio and strength
                if (index % 2 === 0) {
                    plan[day] = this.findActivityByType(recommendations, 'cardio');
                } else {
                    plan[day] = this.findActivityByType(recommendations, 'strength');
                }
            } else { // Weekend
                // Fun/active recovery
                plan[day] = this.findActivityByType(recommendations, 'recovery');
            }
        });
        
        return plan;
    }
    
    findActivityByType(recommendations, type) {
        // Simple type classification for demo purposes
        const typeMap = {
            'cardio': ['Running', 'Cycling', 'Swimming', 'HIIT', 'Dancing'],
            'strength': ['Weight Training', 'Basketball', 'Tennis'],
            'recovery': ['Yoga', 'Walking', 'Swimming']
        };
        
        for (const rec of recommendations) {
            if (typeMap[type].includes(rec.activity)) {
                return rec;
            }
        }
        
        // Fallback to first recommendation if no match found
        return recommendations[0];
    }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize fitness level display
    const fitnessLevelSlider = document.getElementById('fitnessLevel');
    const fitnessLevelValue = document.getElementById('fitnessLevelValue');
    
    fitnessLevelSlider.addEventListener('input', function() {
        fitnessLevelValue.textContent = this.value;
    });
    
    // Initialize recommender
    const recommender = new FitnessRecommender(fitnessData);
    
    // Set up recommendation button
    document.getElementById('getRecommendations').addEventListener('click', function() {
        // Get user inputs
        const userProfile = {
            age: parseInt(document.getElementById('age').value),
            gender: document.getElementById('gender').value,
            fitnessLevel: parseInt(document.getElementById('fitnessLevel').value),
            goal: document.getElementById('goal').value,
            availableTime: parseInt(document.getElementById('availableTime').value),
            preferredIntensity: document.getElementById('preferredIntensity').value
        };
        
        // Update recommender
        recommender.setUserProfile(userProfile);
        
        // Get recommendations
        const recommendations = recommender.getRecommendations();
        const weeklyPlan = recommender.generateWeeklyPlan(recommendations);
        
        // Display recommendations
        displayRecommendations(recommendations, weeklyPlan);
        
        // Update insights
        updateInsights();
    });
    
    // Display recommendations
    function displayRecommendations(recommendations, weeklyPlan) {
        const container = document.getElementById('recommendationsContainer');
        container.innerHTML = '';
        
        // Top recommendations
        const recHeader = document.createElement('h3');
        recHeader.textContent = 'Top Activity Recommendations';
        container.appendChild(recHeader);
        
        recommendations.forEach(rec => {
            const card = document.createElement('div');
            card.className = 'recommendation-card';
            
            card.innerHTML = `
                <h3>${rec.activity}</h3>
                <p>Match Score: <strong>${(rec.score * 100).toFixed(1)}%</strong></p>
                <p>Average Calories: <strong>${rec.data.avgCaloriesBurned.toFixed(1)}</strong></p>
                <p>Typical Duration: <strong>${rec.data.avgDuration.toFixed(0)} min</strong></p>
                <p>Intensity: <strong>${rec.data.avgIntensity}</strong></p>
                <div class="recommendation-metrics">
                    <div class="metric">Effectiveness: <span>${rec.data.effectiveness.toFixed(1)}/10</span></div>
                    <div class="metric">Popularity: <span>${rec.data.popularity.toFixed(1)}%</span></div>
                </div>
            `;
            
            container.appendChild(card);
        });
        
        // Weekly plan
        const planHeader = document.createElement('h3');
        planHeader.textContent = 'Sample Weekly Plan';
        planHeader.style.marginTop = '30px';
        container.appendChild(planHeader);
        
        const planContainer = document.createElement('div');
        planContainer.className = 'weekly-plan';
        
        for (const day in weeklyPlan) {
            const dayPlan = document.createElement('div');
            dayPlan.className = 'recommendation-card';
            dayPlan.innerHTML = `
                <h4>${day}</h4>
                <p><strong>${weeklyPlan[day].activity}</strong> - ${weeklyPlan[day].data.avgDuration.toFixed(0)} min</p>
                <p>Intensity: ${weeklyPlan[day].data.avgIntensity}</p>
            `;
            planContainer.appendChild(dayPlan);
        }
        
        container.appendChild(planContainer);
    }
    
    // Update insights charts
    function updateInsights() {
        updateActivityEffectivenessChart();
        updateCaloriesDurationChart();
    }
    
    function updateActivityEffectivenessChart() {
        const container = document.getElementById('activityEffectivenessChart');
        container.innerHTML = '';
        
        // Get top 5 activities by effectiveness
        const activities = Object.entries(fitnessData.activityStats)
            .sort((a, b) => b[1].effectiveness - a[1].effectiveness)
            .slice(0, 5);
        
        const chart = document.createElement('div');
        chart.className = 'chart';
        
        const maxEffectiveness = Math.max(...activities.map(a => a[1].effectiveness));
        
        activities.forEach(([activity, data]) => {
            const bar = document.createElement('div');
            bar.className = 'bar';
            bar.style.height = `${(data.effectiveness / maxEffectiveness) * 100}%`;
            
            const label = document.createElement('div');
            label.className = 'bar-label';
            label.textContent = activity.substring(0, 8);
            
            bar.appendChild(label);
            chart.appendChild(bar);
        });
        
        container.appendChild(chart);
    }
    
    function updateCaloriesDurationChart() {
        const container = document.getElementById('caloriesDurationChart');
        container.innerHTML = '';
        
        // Sample activities for the chart
        const sampleActivities = [
            { name: 'Walking', calories: 4.5, duration: 45 },
            { name: 'Yoga', calories: 3.2, duration: 60 },
            { name: 'Swimming', calories: 8.7, duration: 40 },
            { name: 'Cycling', calories: 12.5, duration: 50 },
            { name: 'Running', calories: 15.2, duration: 30 },
            { name: 'HIIT', calories: 18.3, duration: 25 }
        ];
        
        const chart = document.createElement('div');
        chart.className = 'chart';
        
        const maxCalories = Math.max(...sampleActivities.map(a => a.calories));
        
        sampleActivities.forEach(activity => {
            const bar = document.createElement('div');
            bar.className = 'bar';
            bar.style.height = `${(activity.calories / maxCalories) * 100}%`;
            bar.style.background = `linear-gradient(to top, #48bb78, #68d391)`;
            
            const label = document.createElement('div');
            label.className = 'bar-label';
            label.textContent = activity.name.substring(0, 6);
            
            bar.appendChild(label);
            chart.appendChild(bar);
        });
        
        container.appendChild(chart);
    }
    
    // Initialize charts on load
    updateInsights();
});
