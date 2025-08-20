# CV Builder Application

A free, web-based CV/Resume builder application that allows users to create professional resumes using multiple templates.

## Features

- **LinkedIn Profile Import**: 🆕 Automatically import profile data from LinkedIn to quickly populate CV fields
- **Multiple Professional Templates**: Choose from various pre-designed templates
- **Real-time Preview**: See your CV update in real-time as you fill in the information
- **Section Management**: Add/remove sections like Experience, Education, Skills, Projects
- **PDF Export**: Download your CV as a PDF file
- **User Authentication**: Save and manage multiple resumes (optional)
- **MongoDB Integration**: Store resumes and templates in database
- **Responsive Design**: Works on desktop and mobile devices

## Tech Stack

### Frontend
- React with TypeScript
- React Router for navigation
- HTML2Canvas & jsPDF for PDF generation
- Axios for API calls

### Backend
- Python FastAPI
- MongoDB with Motor (async driver)
- ReportLab for PDF generation
- JWT Authentication
- CORS enabled for frontend integration

## Installation & Setup

### Prerequisites
- Node.js (v14 or higher)
- Python 3.8+
- MongoDB Atlas account (or local MongoDB instance)

### Backend Setup

1. Navigate to backend directory:
```bash
cd cv-builder-backend
```

2. Create a virtual environment:
```bash
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
```

3. Install dependencies:
```bash
pip install -r requirements.txt
```

4. Configure MongoDB connection in `.env` file:

**For MongoDB Atlas (Recommended):**
```env
# Get this from MongoDB Atlas -> Connect -> Connect your application
MONGODB_URL=mongodb+srv://YOUR_USERNAME:YOUR_PASSWORD@YOUR_CLUSTER.mongodb.net/?retryWrites=true&w=majority
DATABASE_NAME=cv_builder
SECRET_KEY=your-secret-key-here
```

**For Local MongoDB:**
```env
MONGODB_URL=mongodb://localhost:27017/
DATABASE_NAME=cv_builder
SECRET_KEY=your-secret-key-here
```

📋 **See `MONGODB_SETUP.md` for detailed MongoDB Atlas setup instructions.**

5. Test your MongoDB connection:
```bash
python test_connection.py
```

6. Initialize the database with sample data:
```bash
python setup_database.py
```

7. Run the backend server:
```bash
uvicorn main:app --reload --port 8000
```

The backend API will be available at `http://localhost:8000`
API documentation at `http://localhost:8000/docs`

### Frontend Setup

1. Navigate to frontend directory:
```bash
cd cv-builder-frontend
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm start
```

The application will open at `http://localhost:3000`

## Usage

1. **Home Page**: Browse the landing page to understand features
2. **Templates**: Click "Browse Templates" to see available CV templates
3. **Build CV**: Select a template and click "Use This Template"
4. **Fill Information**:
   - Personal Information
   - Work Experience
   - Education
   - Skills
   - Projects
5. **Preview**: See real-time preview on the right side
6. **Save/Download**: Save your resume or download as PDF

## API Endpoints

### Templates
- `GET /api/templates` - Get all templates
- `GET /api/templates/{id}` - Get specific template
- `POST /api/templates` - Create new template
- `PUT /api/templates/{id}` - Update template
- `DELETE /api/templates/{id}` - Delete template

### Resumes
- `GET /api/resumes` - Get all resumes
- `GET /api/resumes/{id}` - Get specific resume
- `POST /api/resumes` - Create new resume
- `PUT /api/resumes/{id}` - Update resume
- `DELETE /api/resumes/{id}` - Delete resume
- `GET /api/resumes/{id}/download` - Download resume as PDF

### Users (Optional)
- `POST /api/users/register` - Register new user
- `POST /api/users/login` - Login user
- `GET /api/users/me` - Get current user info

### LinkedIn Import 🆕
- `POST /api/linkedin/import` - Import LinkedIn profile data to CV format
- `GET /api/linkedin/supported-formats` - Get supported LinkedIn URL formats

## Project Structure

```
cv-builder/
├── cv-builder-frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Navbar.tsx
│   │   │   ├── ResumePreview.tsx
│   │   │   └── forms/
│   │   │       ├── PersonalInfoForm.tsx
│   │   │       ├── ExperienceForm.tsx
│   │   │       ├── EducationForm.tsx
│   │   │       ├── SkillsForm.tsx
│   │   │       └── ProjectsForm.tsx
│   │   ├── pages/
│   │   │   ├── HomePage.tsx
│   │   │   ├── TemplatesPage.tsx
│   │   │   ├── BuilderPage.tsx
│   │   │   ├── PreviewPage.tsx
│   │   │   ├── LoginPage.tsx
│   │   │   └── RegisterPage.tsx
│   │   ├── types/
│   │   │   └── index.ts
│   │   └── App.tsx
│   └── package.json
│
└── cv-builder-backend/
    ├── main.py
    ├── models.py
    ├── database.py
    ├── pdf_generator.py
    ├── routers/
    │   ├── templates.py
    │   ├── resumes.py
    │   └── users.py
    ├── requirements.txt
    └── .env
```

## Contributing

Feel free to fork this project and submit pull requests for any improvements.

## License

This project is free to use for everyone.

## Future Enhancements

- Add more templates
- Add cover letter builder
- Add AI-powered content suggestions
- Add LinkedIn import functionality
- Add more export formats (Word, Google Docs)
- Add collaboration features
- Add analytics for resume views
