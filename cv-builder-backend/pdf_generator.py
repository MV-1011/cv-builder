from reportlab.lib import colors
from reportlab.lib.pagesizes import letter, A4
from reportlab.platypus import SimpleDocTemplate, Table, TableStyle, Paragraph, Spacer, PageBreak
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.lib.units import inch
from reportlab.lib.enums import TA_LEFT, TA_CENTER, TA_RIGHT
import os
from datetime import datetime
import tempfile

def generate_pdf(resume_data, template_data):
    try:
        # Use tempfile for better cross-platform compatibility
        temp_dir = tempfile.gettempdir()
        filename = f"resume_{datetime.now().strftime('%Y%m%d_%H%M%S')}.pdf"
        filepath = os.path.join(temp_dir, filename)
        
        print(f"Generating PDF at: {filepath}")
        
        doc = SimpleDocTemplate(filepath, pagesize=A4)
        styles = getSampleStyleSheet()
        story = []
        
        name_style = ParagraphStyle(
            'CustomTitle',
            parent=styles['Heading1'],
            fontSize=24,
            textColor=colors.HexColor('#2c3e50'),
            spaceAfter=6,
            alignment=TA_CENTER
        )
        
        heading_style = ParagraphStyle(
            'CustomHeading',
            parent=styles['Heading2'],
            fontSize=14,
            textColor=colors.HexColor('#34495e'),
            spaceAfter=6,
            spaceBefore=12,
            borderWidth=1,
            borderColor=colors.HexColor('#34495e'),
            borderPadding=4
        )
        
        normal_style = ParagraphStyle(
            'CustomNormal',
            parent=styles['Normal'],
            fontSize=11,
            textColor=colors.HexColor('#2c3e50'),
            spaceAfter=4
        )
        
        personal_info = resume_data.get("personal_info", {})
        story.append(Paragraph(personal_info.get("full_name", ""), name_style))
        
        contact_info = []
        if personal_info.get("email"):
            contact_info.append(personal_info["email"])
        if personal_info.get("phone"):
            contact_info.append(personal_info["phone"])
        if personal_info.get("address"):
            contact_info.append(personal_info["address"])
        
        if contact_info:
            story.append(Paragraph(" | ".join(contact_info), normal_style))
            story.append(Spacer(1, 0.2*inch))
        
        if personal_info.get("summary"):
            story.append(Paragraph("Professional Summary", heading_style))
            story.append(Paragraph(personal_info["summary"], normal_style))
            story.append(Spacer(1, 0.1*inch))
        
        experience = resume_data.get("experience", [])
        if experience:
            story.append(Paragraph("Professional Experience", heading_style))
            for exp in experience:
                exp_title = f"<b>{exp.get('position', '')}</b> at {exp.get('company', '')}"
                story.append(Paragraph(exp_title, normal_style))
                
                date_range = f"{exp.get('start_date', '')} - {exp.get('end_date', 'Present') if not exp.get('current') else 'Present'}"
                story.append(Paragraph(date_range, normal_style))
                
                if exp.get("description"):
                    story.append(Paragraph(exp["description"], normal_style))
                
                if exp.get("achievements"):
                    for achievement in exp["achievements"]:
                        story.append(Paragraph(f"• {achievement}", normal_style))
                
                story.append(Spacer(1, 0.1*inch))
        
        education = resume_data.get("education", [])
        if education:
            story.append(Paragraph("Education", heading_style))
            for edu in education:
                edu_title = f"<b>{edu.get('degree', '')}</b> in {edu.get('field_of_study', '')}"
                story.append(Paragraph(edu_title, normal_style))
                story.append(Paragraph(edu.get('institution', ''), normal_style))
                
                date_range = f"{edu.get('start_date', '')} - {edu.get('end_date', 'Present') if not edu.get('current') else 'Present'}"
                story.append(Paragraph(date_range, normal_style))
                
                if edu.get("gpa"):
                    story.append(Paragraph(f"GPA: {edu['gpa']}", normal_style))
                
                story.append(Spacer(1, 0.1*inch))
        
        skills = resume_data.get("skills", [])
        if skills:
            story.append(Paragraph("Skills", heading_style))
            skill_list = ", ".join([skill.get("name", "") for skill in skills])
            story.append(Paragraph(skill_list, normal_style))
            story.append(Spacer(1, 0.1*inch))
        
        projects = resume_data.get("projects", [])
        if projects:
            story.append(Paragraph("Projects", heading_style))
            for project in projects:
                story.append(Paragraph(f"<b>{project.get('name', '')}</b>", normal_style))
                story.append(Paragraph(project.get('description', ''), normal_style))
                
                if project.get("technologies"):
                    tech_list = ", ".join(project["technologies"])
                    story.append(Paragraph(f"Technologies: {tech_list}", normal_style))
                
                story.append(Spacer(1, 0.1*inch))
        
        try:
            doc.build(story)
            print(f"PDF generated successfully at: {filepath}")
            return filepath
        except Exception as build_error:
            print(f"Error building PDF document: {str(build_error)}")
            raise
    except Exception as e:
        print(f"Error in generate_pdf: {str(e)}")
        raise