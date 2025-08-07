const API_URL = 'http://localhost:8000';

// Sample data for standalone mode
const SAMPLE_DATA = {
    "extracted_skills": {
        "technical_skills": ["Python", "JavaScript", "React", "Node.js", "SQL"],
        "soft_skills": ["Leadership", "Communication", "Problem Solving"],
        "experience_years": 3,
        "education": ["Bachelor's in Computer Science"],
        "certifications": ["AWS Certified Developer"]
    },
    "market_analysis": {
        "top_skills": ["Python", "Cloud Computing", "AI/ML", "React", "DevOps"],
        "emerging_skills": ["Generative AI", "LangChain", "Rust"],
        "industry_trends": [
            "AI/ML skills seeing 150% increase in demand",
            "Cloud expertise is critical for top positions"
        ],
        "avg_salary_range": {"min": 80000, "max": 130000}
    },
    "skill_gaps": {
        "missing_skills": ["Cloud Computing", "AI/ML", "DevOps"],
        "skills_to_improve": ["Advanced Python", "System Design"],
        "recommended_certifications": ["AWS Solutions Architect", "Google Cloud Professional"],
        "priority_level": {
            "Cloud Computing": "Critical - Address within 3 months",
            "AI/ML": "High - Address within 6 months"
        }
    },
    "github_analysis": {
        "total_repos": 15,
        "languages_used": ["Python", "JavaScript", "TypeScript"],
        "project_quality_score": 72.5,
        "improvement_suggestions": [
            "Add README files to all repositories",
            "Implement unit tests",
            "Set up CI/CD pipelines"
        ]
    },
    "learning_plan": {
        "short_term_goals": [
            {"skill": "Cloud Computing", "priority": "Critical", "timeline": "1-3 months"}
        ],
        "medium_term_goals": [
            {"skill": "AI/ML", "priority": "High", "timeline": "3-6 months"}
        ],
        "long_term_goals": [
            {"skill": "System Architecture", "priority": "Medium", "timeline": "6-12 months"}
        ],
        "recommended_resources": [
            {"type": "Course", "name": "AWS Solutions Architect Course"},
            {"type": "Practice", "name": "LeetCode for algorithm practice"}
        ],
        "estimated_timeline": "6-9 months to reach top 1%"
    },
    "overall_score": 68.5,
    "recommendations": [
        "Learn Cloud Computing to improve market position",
        "Add comprehensive documentation to GitHub projects",
        "Focus on building AI/ML projects",
        "Current market position: High - Top 25% market position",
        "Network with professionals in your target industry"
    ]
};

document.getElementById('analyzeForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const resumeFile = document.getElementById('resumeFile').files[0];
    const resumeText = document.getElementById('resumeText').value;
    const githubUrl = document.getElementById('githubUrl').value;
    
    if (!resumeFile && !resumeText) {
        alert('Please provide either a resume file or resume text');
        return;
    }
    
    showLoading(true);
    hideResults();
    
    const formData = new FormData();
    if (resumeFile) {
        formData.append('resume', resumeFile);
    }
    if (resumeText) {
        formData.append('resume_text', resumeText);
    }
    if (githubUrl) {
        formData.append('github_url', githubUrl);
    }
    
    try {
        const response = await fetch(`${API_URL}/api/analyze`, {
            method: 'POST',
            body: formData
        });
        
        if (!response.ok) {
            throw new Error('Analysis failed');
        }
        
        const result = await response.json();
        displayResults(result);
        
    } catch (error) {
        console.error('Backend not available, using sample data:', error);
        // Show notification that we're using sample data
        showSampleDataNotification();
        // Use sample data when backend is not available
        displayResults(SAMPLE_DATA);
    } finally {
        showLoading(false);
    }
});

function showLoading(show) {
    const loadingIndicator = document.getElementById('loadingIndicator');
    if (show) {
        loadingIndicator.classList.remove('hidden');
    } else {
        loadingIndicator.classList.add('hidden');
    }
}

function showSampleDataNotification() {
    // Create notification element
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: #f59e0b;
        color: white;
        padding: 15px 20px;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.15);
        z-index: 1000;
        max-width: 350px;
        font-size: 14px;
        line-height: 1.4;
    `;
    notification.innerHTML = `
        <strong>Demo Mode</strong><br>
        Backend not available. Showing sample analysis results.
        <button onclick="this.parentElement.remove()" style="
            background: none;
            border: none;
            color: white;
            float: right;
            cursor: pointer;
            font-size: 16px;
            margin-left: 10px;
        ">×</button>
    `;
    
    document.body.appendChild(notification);
    
    // Auto-remove after 8 seconds
    setTimeout(() => {
        if (notification.parentElement) {
            notification.remove();
        }
    }, 8000);
}

function hideResults() {
    document.getElementById('results').classList.add('hidden');
}

function displayResults(data) {
    document.getElementById('overallScore').textContent = Math.round(data.overall_score || 0);
    
    const marketPosition = data.market_analysis?.market_demand || 
                          data.recommendations?.find(r => r.includes('market position')) ||
                          'Processing...';
    document.getElementById('marketPosition').textContent = marketPosition;
    
    displaySkills(data.extracted_skills);
    displayMissingSkills(data.skill_gaps);
    displayMarketInsights(data.market_analysis);
    displayGitHubAnalysis(data.github_analysis);
    displayLearningPlan(data.learning_plan);
    displayRecommendations(data.recommendations);
    
    document.getElementById('results').classList.remove('hidden');
    document.getElementById('results').scrollIntoView({ behavior: 'smooth' });
}

function displaySkills(skills) {
    const container = document.getElementById('skillsList');
    container.innerHTML = '';
    
    if (skills && skills.technical_skills) {
        skills.technical_skills.forEach(skill => {
            const tag = document.createElement('span');
            tag.className = 'skill-tag';
            tag.textContent = skill;
            container.appendChild(tag);
        });
    }
    
    if (skills && skills.soft_skills) {
        skills.soft_skills.forEach(skill => {
            const tag = document.createElement('span');
            tag.className = 'skill-tag';
            tag.style.background = '#48bb78';
            tag.textContent = skill;
            container.appendChild(tag);
        });
    }
}

function displayMissingSkills(gaps) {
    const container = document.getElementById('missingSkills');
    container.innerHTML = '';
    
    if (gaps && gaps.missing_skills) {
        gaps.missing_skills.slice(0, 10).forEach(skill => {
            const tag = document.createElement('span');
            tag.className = 'missing-skill';
            tag.textContent = skill;
            container.appendChild(tag);
        });
    }
}

function displayMarketInsights(market) {
    const container = document.getElementById('marketInsights');
    container.innerHTML = '';
    
    if (market) {
        if (market.industry_trends) {
            const ul = document.createElement('ul');
            market.industry_trends.forEach(trend => {
                const li = document.createElement('li');
                li.textContent = trend;
                ul.appendChild(li);
            });
            container.appendChild(ul);
        }
        
        if (market.avg_salary_range) {
            const salaryInfo = document.createElement('p');
            salaryInfo.innerHTML = `<strong>Salary Range:</strong> $${market.avg_salary_range.min?.toLocaleString()} - $${market.avg_salary_range.max?.toLocaleString()}`;
            container.appendChild(salaryInfo);
        }
    }
}

function displayGitHubAnalysis(github) {
    const container = document.getElementById('githubAnalysis');
    container.innerHTML = '';
    
    if (github && !github.error) {
        const info = document.createElement('div');
        info.innerHTML = `
            <p><strong>Total Repos:</strong> ${github.total_repos || 'N/A'}</p>
            <p><strong>Languages:</strong> ${github.languages_used?.join(', ') || 'N/A'}</p>
            <p><strong>Quality Score:</strong> ${github.project_quality_score?.toFixed(1) || 'N/A'}/100</p>
        `;
        container.appendChild(info);
        
        if (github.improvement_suggestions) {
            const suggestions = document.createElement('ul');
            github.improvement_suggestions.slice(0, 3).forEach(suggestion => {
                const li = document.createElement('li');
                li.textContent = suggestion;
                suggestions.appendChild(li);
            });
            container.appendChild(suggestions);
        }
    } else {
        container.innerHTML = '<p>GitHub analysis not available</p>';
    }
}

function displayLearningPlan(plan) {
    const container = document.getElementById('learningPlan');
    container.innerHTML = '';
    
    if (plan) {
        if (plan.short_term_goals && plan.short_term_goals.length > 0) {
            const section = document.createElement('div');
            section.className = 'plan-section';
            section.innerHTML = '<h4>Short Term (1-3 months)</h4>';
            const ul = document.createElement('ul');
            plan.short_term_goals.forEach(goal => {
                const li = document.createElement('li');
                li.textContent = `${goal.skill} - ${goal.priority}`;
                ul.appendChild(li);
            });
            section.appendChild(ul);
            container.appendChild(section);
        }
        
        if (plan.medium_term_goals && plan.medium_term_goals.length > 0) {
            const section = document.createElement('div');
            section.className = 'plan-section';
            section.innerHTML = '<h4>Medium Term (3-6 months)</h4>';
            const ul = document.createElement('ul');
            plan.medium_term_goals.forEach(goal => {
                const li = document.createElement('li');
                li.textContent = `${goal.skill} - ${goal.priority}`;
                ul.appendChild(li);
            });
            section.appendChild(ul);
            container.appendChild(section);
        }
        
        if (plan.estimated_timeline) {
            const timeline = document.createElement('p');
            timeline.innerHTML = `<strong>Timeline to Top 1%:</strong> ${plan.estimated_timeline}`;
            container.appendChild(timeline);
        }
    }
}

function displayRecommendations(recommendations) {
    const container = document.getElementById('recommendationsList');
    container.innerHTML = '';
    
    if (recommendations && recommendations.length > 0) {
        recommendations.forEach(rec => {
            const li = document.createElement('li');
            li.textContent = rec;
            container.appendChild(li);
        });
    }
}

function resetAnalysis() {
    document.getElementById('analyzeForm').reset();
    hideResults();
    document.getElementById('analyze').scrollIntoView({ behavior: 'smooth' });
}

function scrollToAnalyze() {
    document.getElementById('analyze').scrollIntoView({ behavior: 'smooth' });
}

document.getElementById('resumeFile').addEventListener('change', function(e) {
    const fileInfo = document.querySelector('.file-info');
    if (e.target.files.length > 0) {
        const file = e.target.files[0];
        fileInfo.textContent = `Selected: ${file.name} (${(file.size / 1024).toFixed(2)} KB)`;
    } else {
        fileInfo.textContent = '';
    }
});