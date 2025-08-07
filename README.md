# Upnava - Elevate Your Career to Top 1%

*Up (elevation) + Nava (new)*

Upnava is an AI-powered career analysis platform that helps professionals identify skill gaps and create personalized learning paths to compete with the top 1% in the job market.

## Demo

https://github.com/user-attachments/assets/upanava.mp4

*Watch Upnava in action - from resume upload to personalized career insights*

## Features

- **Resume Analysis**: OCR-powered resume parsing and skill extraction
- **Market Intelligence**: Real-time comparison with top market demands
- **Skill Gap Detection**: Identifies missing skills for elite positions
- **GitHub Portfolio Analysis**: Evaluates code quality and project portfolio
- **Personalized Learning Plans**: Custom roadmaps with prioritized skills
- **Career Recommendations**: Actionable insights for career growth

## Architecture

The system uses a multi-agent architecture powered by LangChain and LangGraph:

```
User Upload → OCR Agent → Resume Parser → Skills Extractor
                                              ↓
                                    Market Analyzer Agent
                                              ↓
                                      Gap Detector Agent
                                              ↓
                                    GitHub Analyzer Agent
                                              ↓
                                    Learning Plan Generator
                                              ↓
                                    Personalized Recommendations
```

## Tech Stack

- **Backend**: FastAPI, LangChain, LangGraph
- **AI/ML**: Google Gemini, LangChain Agents
- **Frontend**: HTML, CSS, JavaScript
- **OCR**: Pytesseract, PyPDF2
- **GitHub Integration**: PyGithub

## Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/upnava.git
cd upnava
```

2. Install dependencies:
```bash
pip install -r requirements.txt
```

3. Set up environment variables:
```bash
cp .env.example .env
```

Edit `.env` and add your API keys:
- `GOOGLE_API_KEY`: Your Google Gemini API key
- `GITHUB_TOKEN`: GitHub personal access token (optional)

4. Run the application:
```bash
cd backend
python main.py
```

5. Open your browser and navigate to:
```
http://localhost:8000
```

## Usage

1. **Upload Resume**: Upload your resume in PDF or text format
2. **GitHub URL** (Optional): Provide your GitHub profile URL
3. **Analyze**: Click "Analyze My Profile" to start the analysis
4. **Review Results**: Get detailed insights including:
   - Current skill assessment
   - Market gap analysis
   - GitHub portfolio feedback
   - Personalized learning plan
   - Career recommendations

## API Endpoints

- `GET /`: Serve frontend application
- `POST /api/analyze`: Analyze resume and GitHub profile
- `POST /api/upload-resume`: Upload resume file
- `GET /api/sample-analysis`: Get sample analysis results
- `GET /health`: Health check endpoint

## Project Structure

```
upnava/
├── backend/
│   ├── agents/
│   │   ├── base_agent.py
│   │   ├── resume_parser_agent.py
│   │   ├── skills_extractor_agent.py
│   │   ├── market_analyzer_agent.py
│   │   ├── gap_detector_agent.py
│   │   └── github_analyzer_agent.py
│   ├── models/
│   │   └── schemas.py
│   ├── orchestrator.py
│   └── main.py
├── frontend/
│   ├── index.html
│   ├── css/
│   │   └── styles.css
│   └── js/
│       └── app.js
├── static/
│   └── uploads/
├── requirements.txt
├── .env.example
└── README.md
```

## Agent System

### Resume Parser Agent
Extracts text from PDF/images using OCR and structures resume data.

### Skills Extractor Agent
Identifies technical and soft skills, experience level, and certifications.

### Market Analyzer Agent
Analyzes current job market trends and top 1% skill requirements.

### Gap Detector Agent
Identifies missing skills and creates priority-based improvement areas.

### GitHub Analyzer Agent
Evaluates GitHub repositories for code quality and best practices.

### Orchestrator
LangGraph-based workflow orchestrator that manages agent interactions and memory.

## Premium Features (Coming Soon)

- Curated video lectures from top instructors
- AI-generated study materials
- Real-world project templates
- Weekly progress tracking
- 1-on-1 AI mentorship

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License.

## Support

For issues and questions, please open an issue on GitHub.

## Acknowledgments

- Built with LangChain and LangGraph
- Powered by Google Gemini
- FastAPI for backend services
