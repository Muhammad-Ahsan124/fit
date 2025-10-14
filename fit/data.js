// Processed fitness data based on the provided dataset
const fitnessData = {
    activityStats: {
        'Walking': {
            avgCaloriesBurned: 7.2,
            avgDuration: 72.5,
            avgIntensity: 'Low',
            avgHeartRate: 124.3,
            popularity: 18.5,
            effectiveness: 6.2,
            strengthFocus: 2,
            enduranceFocus: 7,
            avgFitnessLevel: 4.2
        },
        'Running': {
            avgCaloriesBurned: 24.8,
            avgDuration: 68.3,
            avgIntensity: 'High',
            avgHeartRate: 138.2,
            popularity: 12.3,
            effectiveness: 8.7,
            strengthFocus: 5,
            enduranceFocus: 9,
            avgFitnessLevel: 7.1
        },
        'Cycling': {
            avgCaloriesBurned: 18.6,
            avgDuration: 71.2,
            avgIntensity: 'Medium',
            avgHeartRate: 132.5,
            popularity: 10.8,
            effectiveness: 7.8,
            strengthFocus: 6,
            enduranceFocus: 8,
            avgFitnessLevel: 6.5
        },
        'Swimming': {
            avgCaloriesBurned: 14.3,
            avgDuration: 65.4,
            avgIntensity: 'Medium',
            avgHeartRate: 135.7,
            popularity: 8.7,
            effectiveness: 8.2,
            strengthFocus: 7,
            enduranceFocus: 9,
            avgFitnessLevel: 6.2
        },
        'Weight Training': {
            avgCaloriesBurned: 11.5,
            avgDuration: 75.8,
            avgIntensity: 'Medium',
            avgHeartRate: 128.4,
            popularity: 14.2,
            effectiveness: 8.5,
            strengthFocus: 9,
            enduranceFocus: 4,
            avgFitnessLevel: 6.8
        },
        'Yoga': {
            avgCaloriesBurned: 5.8,
            avgDuration: 78.3,
            avgIntensity: 'Low',
            avgHeartRate: 118.6,
            popularity: 11.5,
            effectiveness: 7.1,
            strengthFocus: 5,
            enduranceFocus: 3,
            avgFitnessLevel: 5.2
        },
        'HIIT': {
            avgCaloriesBurned: 26.4,
            avgDuration: 52.7,
            avgIntensity: 'High',
            avgHeartRate: 142.3,
            popularity: 9.8,
            effectiveness: 9.2,
            strengthFocus: 8,
            enduranceFocus: 8,
            avgFitnessLevel: 7.8
        },
        'Dancing': {
            avgCaloriesBurned: 9.7,
            avgDuration: 80.1,
            avgIntensity: 'Medium',
            avgHeartRate: 126.8,
            popularity: 7.3,
            effectiveness: 6.8,
            strengthFocus: 4,
            enduranceFocus: 6,
            avgFitnessLevel: 5.5
        },
        'Tennis': {
            avgCaloriesBurned: 16.8,
            avgDuration: 74.6,
            avgIntensity: 'Medium',
            avgHeartRate: 134.2,
            popularity: 6.2,
            effectiveness: 7.9,
            strengthFocus: 6,
            enduranceFocus: 7,
            avgFitnessLevel: 6.4
        },
        'Basketball': {
            avgCaloriesBurned: 14.2,
            avgDuration: 68.9,
            avgIntensity: 'High',
            avgHeartRate: 139.5,
            popularity: 5.7,
            effectiveness: 8.1,
            strengthFocus: 7,
            enduranceFocus: 8,
            avgFitnessLevel: 6.9
        }
    },
    
    // Additional aggregated data for insights
    userDemographics: {
        ageGroups: {
            '18-25': 15,
            '26-35': 28,
            '36-45': 32,
            '46-55': 18,
            '56+': 7
        },
        genderRatio: {
            'M': 52,
            'F': 48
        }
    },
    
    // Popular activity combinations
    popularCombinations: [
        { activities: ['Running', 'Weight Training'], frequency: 23 },
        { activities: ['Cycling', 'Yoga'], frequency: 18 },
        { activities: ['Swimming', 'HIIT'], frequency: 15 },
        { activities: ['Walking', 'Weight Training'], frequency: 12 }
    ]
};
