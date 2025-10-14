// script.js - Fixed and enhanced version

document.addEventListener('DOMContentLoaded', function() {
    const recommendationButton = document.getElementById('getRecommendations');
    const fitnessLevelSlider = document.getElementById('fitnessLevel');
    const fitnessLevelValue = document.getElementById('fitnessLevelValue');

    // Update fitness level display
    if (fitnessLevelSlider && fitnessLevelValue) {
        fitnessLevelSlider.addEventListener('input', function() {
            fitnessLevelValue.textContent = this.value;
        });
    }

    if (recommendationButton) {
        recommendationButton.addEventListener('click', function() {
            generateAndDisplayRecommendations();
        });
    }

    function generateAndDisplayRecommendations() {
        // Get all form values
        const age = parseInt(document.getElementById('age').value);
        const gender = document.getElementById('gender').value;
        const fitnessLevel = parseInt(document.getElementById('fitnessLevel').value);
        const goal = document.getElementById('goal').value;
        const availableTime = parseInt(document.getElementById('availableTime').value);
        const preferredIntensity = document.getElementById('preferredIntensity').value;

        // Validate inputs
        if (!age || !gender || !fitnessLevel || !goal || !availableTime || !preferredIntensity) {
            alert('Please complete all fields in your health profile!');
            return;
        }

        // Generate recommendations based on fitness data
        const recommendations = generateRecommendations({
            age: age,
            gender: gender,
            fitnessLevel: fitnessLevel,
            goal: goal,
            availableTime: availableTime,
            preferredIntensity: preferredIntensity
        });

        // Display recommendations
        displayRecommendations(recommendations);
        
        // Update insights charts
        updateInsightsCharts();
    }

    function generateRecommendations(profile) {
        const activities = Object.keys(fitnessData.activityStats);
        const scoredActivities = [];
        
        // Score each activity based on user profile
        activities.forEach(activity => {
            const stats = fitnessData.activityStats[activity];
            let score = 0;
            
            // Goal-based scoring
            switch(profile.goal) {
                case 'weight_loss':
                    score += stats.avgCaloriesBurned * 3;
                    score += stats.effectiveness * 2;
                    break;
                case 'muscle_gain':
                    score += stats.strengthFocus * 4;
                    score += stats.effectiveness * 2;
                    break;
                case 'endurance':
                    score += stats.enduranceFocus * 4;
                    score += stats.effectiveness * 2;
                    break;
                case 'maintenance':
                    score += (stats.strengthFocus + stats.enduranceFocus) * 2;
                    score += stats.effectiveness;
                    break;
            }
            
            // Intensity matching
            if (stats.avgIntensity === profile.preferredIntensity) {
                score += 5;
            }
            
            // Time compatibility (prefer activities close to user's available time)
            const timeDiff = Math.abs(stats.avgDuration - profile.availableTime);
            if (timeDiff <= 15) score += 3;
            else if (timeDiff <= 30) score += 1;
            
            // Fitness level compatibility
            const levelDiff = Math.abs(stats.avgFitnessLevel - profile.fitnessLevel);
            if (levelDiff <= 1) score += 3;
            else if (levelDiff <= 2) score += 1;
            
            scoredActivities.push({
                name: activity,
                score: score,
                stats: stats
            });
        });
        
        // Sort by score and get top 3
        scoredActivities.sort((a, b) => b.score - a.score);
        return scoredActivities.slice(0, 3);
    }

    function displayRecommendations(recommendations) {
        const container = document.getElementById('recommendationsContainer');
        
        if (!recommendations || recommendations.length === 0) {
            container.innerHTML = '<p class="placeholder">No suitable recommendations found. Please adjust your profile.</p>';
            return;
        }
        
        let html = '<div class="recommendations-list">';
        
        recommendations.forEach((rec, index) => {
            const stats = rec.stats;
            html += `
                <div class="recommendation-card">
                    <h3>${rec.name}</h3>
                    <p><strong>Why it's recommended:</strong> Excellent match for your ${document.getElementById('goal').options[document.getElementById('goal').selectedIndex].text} goals</p>
                    <div class="recommendation-metrics">
                        <div class="metric">Calories: <span>${stats.avgCaloriesBurned}/min</span></div>
                        <div class="metric">Duration: <span>${stats.avgDuration}min</span></div>
                        <div class="metric">Intensity: <span>${stats.avgIntensity}</span></div>
                        <div class="metric">Effectiveness: <span>${stats.effectiveness}/10</span></div>
                    </div>
                    <p><strong>Expected Results:</strong> ${getExpectedResults(rec.name, document.getElementById('goal').value)}</p>
                </div>
            `;
        });
        
        html += '</div>';
        container.innerHTML = html;
    }

    function getExpectedResults(activity, goal) {
        const results = {
            'weight_loss': 'High calorie burn for effective weight management',
            'muscle_gain': 'Builds strength and promotes muscle growth',
            'endurance': 'Improves cardiovascular endurance and stamina',
            'maintenance': 'Maintains overall fitness and health'
        };
        
        return results[goal] || 'Supports your fitness goals effectively';
    }

    function updateInsightsCharts() {
        // Update activity effectiveness chart
        updateActivityEffectivenessChart();
        
        // Update calories vs duration chart
        updateCaloriesDurationChart();
    }

    function updateActivityEffectivenessChart() {
        const container = document.getElementById('activityEffectivenessChart');
        const activities = Object.entries(fitnessData.activityStats)
            .sort((a, b) => b[1].effectiveness - a[1].effectiveness)
            .slice(0, 5);
        
        let html = '<div class="chart">';
        const maxEffectiveness = Math.max(...activities.map(a => a[1].effectiveness));
        
        activities.forEach(([name, stats]) => {
            const height = (stats.effectiveness / maxEffectiveness) * 100;
            html += `
                <div class="bar-container">
                    <div class="bar" style="height: ${height}%"></div>
                    <div class="bar-label">${name}</div>
                </div>
            `;
        });
        
        html += '</div>';
        container.innerHTML = html;
    }

    function updateCaloriesDurationChart() {
        const container = document.getElementById('caloriesDurationChart');
        const activities = Object.entries(fitnessData.activityStats).slice(0, 6);
        
        let html = '<div class="chart">';
        const maxCalories = Math.max(...activities.map(a => a[1].avgCaloriesBurned));
        const maxDuration = Math.max(...activities.map(a => a[1].avgDuration));
        
        activities.forEach(([name, stats]) => {
            const calorieHeight = (stats.avgCaloriesBurned / maxCalories) * 100;
            const durationHeight = (stats.avgDuration / maxDuration) * 100;
            
            html += `
                <div class="bar-container" style="display: inline-block; width: 30px; margin: 0 5px;">
                    <div class="bar" style="height: ${calorieHeight}%; background: #667eea; margin-bottom: 5px;"></div>
                    <div class="bar" style="height: ${durationHeight}%; background: #764ba2;"></div>
                    <div class="bar-label">${name.split(' ')[0]}</div>
                </div>
            `;
        });
        
        html += '</div>';
        container.innerHTML = html;
    }

    // Initialize charts on page load
    updateInsightsCharts();
});
