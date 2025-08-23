from reportlab.lib import colors
from reportlab.lib.pagesizes import letter, A4
from reportlab.platypus import SimpleDocTemplate, Table, TableStyle, Paragraph, Spacer, PageBreak, KeepTogether, Flowable
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.lib.units import inch
from reportlab.lib.enums import TA_LEFT, TA_CENTER, TA_RIGHT, TA_JUSTIFY
from reportlab.pdfgen import canvas
from reportlab.lib.utils import ImageReader
from reportlab.platypus.flowables import HRFlowable
from io import BytesIO
import os
from datetime import datetime
import tempfile

class BlackHeaderBackground(Flowable):
    """Custom flowable for black header background"""
    def __init__(self, width, height, content_elements):
        Flowable.__init__(self)
        self.width = width
        self.height = height
        self.content_elements = content_elements
    
    def draw(self):
        # Draw black background
        self.canv.saveState()
        self.canv.setFillColor(colors.HexColor('#1a1a1a'))
        self.canv.rect(-0.75*inch, -0.5*inch, self.width + 1.5*inch, self.height + 0.5*inch, fill=1, stroke=0)
        
        # Draw gold accent line at bottom
        self.canv.setStrokeColor(colors.HexColor('#8b7355'))
        self.canv.setLineWidth(3)
        self.canv.line(-0.75*inch, -0.5*inch, self.width + 0.75*inch, -0.5*inch)
        self.canv.restoreState()
        
        # Draw the content on top
        for element in self.content_elements:
            element.drawOn(self.canv, 0, self.height - element.height)
            self.height -= element.height

def get_legal_professional_styles():
    """Styles for Legal Professional Template"""
    styles = {}
    
    # Name style - large, uppercase
    styles['name'] = ParagraphStyle(
        'LegalName',
        fontSize=22,
        textColor=colors.white,
        spaceAfter=6,
        alignment=TA_CENTER,
        fontName='Times-Roman',
        leading=26
    )
    
    # Designation style
    styles['designation'] = ParagraphStyle(
        'LegalDesignation',
        fontSize=12,
        textColor=colors.HexColor('#d4af37'),
        spaceAfter=12,
        alignment=TA_CENTER,
        fontName='Times-Italic'
    )
    
    # Contact style
    styles['contact'] = ParagraphStyle(
        'LegalContact',
        fontSize=10,
        textColor=colors.white,
        alignment=TA_CENTER,
        fontName='Times-Roman'
    )
    
    # Section heading
    styles['heading'] = ParagraphStyle(
        'LegalHeading',
        fontSize=13,
        textColor=colors.HexColor('#1a1a1a'),
        spaceAfter=8,
        spaceBefore=16,
        fontName='Times-Bold',
        borderWidth=0,
        borderColor=colors.HexColor('#8b7355'),
        borderPadding=0
    )
    
    # Normal text
    styles['normal'] = ParagraphStyle(
        'LegalNormal',
        fontSize=10,
        textColor=colors.HexColor('#1a1a1a'),
        spaceAfter=4,
        fontName='Times-Roman',
        alignment=TA_JUSTIFY
    )
    
    # Job title
    styles['jobtitle'] = ParagraphStyle(
        'LegalJobTitle',
        fontSize=11,
        textColor=colors.HexColor('#1a1a1a'),
        spaceAfter=2,
        fontName='Times-Bold'
    )
    
    return styles

def get_modern_executive_styles():
    """Styles for Modern Executive Template"""
    styles = {}
    
    styles['name'] = ParagraphStyle(
        'ModernName',
        fontSize=24,
        textColor=colors.HexColor('#2c3e50'),
        spaceAfter=6,
        alignment=TA_LEFT,
        fontName='Helvetica-Bold'
    )
    
    styles['contact'] = ParagraphStyle(
        'ModernContact',
        fontSize=10,
        textColor=colors.HexColor('#7f8c8d'),
        alignment=TA_LEFT,
        fontName='Helvetica'
    )
    
    styles['heading'] = ParagraphStyle(
        'ModernHeading',
        fontSize=14,
        textColor=colors.HexColor('#2c3e50'),
        spaceAfter=8,
        spaceBefore=12,
        fontName='Helvetica-Bold',
        borderWidth=2,
        borderColor=colors.HexColor('#3498db'),
        borderPadding=4
    )
    
    styles['normal'] = ParagraphStyle(
        'ModernNormal',
        fontSize=10,
        textColor=colors.HexColor('#34495e'),
        spaceAfter=4,
        fontName='Helvetica'
    )
    
    styles['jobtitle'] = ParagraphStyle(
        'ModernJobTitle',
        fontSize=12,
        textColor=colors.HexColor('#2c3e50'),
        spaceAfter=2,
        fontName='Helvetica-Bold'
    )
    
    return styles

def get_minimalist_styles():
    """Styles for Minimalist Clean Template"""
    styles = {}
    
    styles['name'] = ParagraphStyle(
        'MinimalistName',
        fontSize=20,
        textColor=colors.black,
        spaceAfter=4,
        alignment=TA_CENTER,
        fontName='Helvetica'
    )
    
    styles['contact'] = ParagraphStyle(
        'MinimalistContact',
        fontSize=9,
        textColor=colors.HexColor('#666666'),
        alignment=TA_CENTER,
        fontName='Helvetica'
    )
    
    styles['heading'] = ParagraphStyle(
        'MinimalistHeading',
        fontSize=11,
        textColor=colors.black,
        spaceAfter=6,
        spaceBefore=10,
        fontName='Helvetica-Bold'
    )
    
    styles['normal'] = ParagraphStyle(
        'MinimalistNormal',
        fontSize=9,
        textColor=colors.HexColor('#333333'),
        spaceAfter=3,
        fontName='Helvetica'
    )
    
    styles['jobtitle'] = ParagraphStyle(
        'MinimalistJobTitle',
        fontSize=10,
        textColor=colors.black,
        spaceAfter=1,
        fontName='Helvetica-Bold'
    )
    
    return styles

def get_academic_scholar_styles():
    """Styles for Academic Scholar Template"""
    styles = {}
    
    styles['name'] = ParagraphStyle(
        'AcademicName',
        fontSize=18,
        textColor=colors.HexColor('#2c3e50'),
        spaceAfter=4,
        alignment=TA_CENTER,
        fontName='Times-Bold'
    )
    
    styles['contact'] = ParagraphStyle(
        'AcademicContact',
        fontSize=9,
        textColor=colors.HexColor('#555555'),
        alignment=TA_CENTER,
        fontName='Times-Roman'
    )
    
    styles['heading'] = ParagraphStyle(
        'AcademicHeading',
        fontSize=12,
        textColor=colors.HexColor('#2c3e50'),
        spaceAfter=6,
        spaceBefore=10,
        fontName='Times-Bold',
        borderWidth=1,
        borderColor=colors.HexColor('#2c3e50'),
        borderPadding=2
    )
    
    styles['normal'] = ParagraphStyle(
        'AcademicNormal',
        fontSize=10,
        textColor=colors.HexColor('#333333'),
        spaceAfter=3,
        fontName='Times-Roman',
        alignment=TA_JUSTIFY
    )
    
    styles['jobtitle'] = ParagraphStyle(
        'AcademicJobTitle',
        fontSize=11,
        textColor=colors.HexColor('#2c3e50'),
        spaceAfter=2,
        fontName='Times-Bold'
    )
    
    return styles

def get_tech_sidebar_styles():
    """Styles for Tech Sidebar Template"""
    styles = {}
    
    styles['name'] = ParagraphStyle(
        'TechName',
        fontSize=22,
        textColor=colors.HexColor('#0066cc'),
        spaceAfter=6,
        alignment=TA_LEFT,
        fontName='Helvetica-Bold'
    )
    
    styles['contact'] = ParagraphStyle(
        'TechContact',
        fontSize=9,
        textColor=colors.HexColor('#666666'),
        alignment=TA_LEFT,
        fontName='Courier'
    )
    
    styles['heading'] = ParagraphStyle(
        'TechHeading',
        fontSize=13,
        textColor=colors.HexColor('#0066cc'),
        spaceAfter=8,
        spaceBefore=12,
        fontName='Helvetica-Bold',
        borderWidth=0,
        leftIndent=10
    )
    
    styles['normal'] = ParagraphStyle(
        'TechNormal',
        fontSize=10,
        textColor=colors.HexColor('#333333'),
        spaceAfter=4,
        fontName='Helvetica'
    )
    
    styles['jobtitle'] = ParagraphStyle(
        'TechJobTitle',
        fontSize=11,
        textColor=colors.HexColor('#0066cc'),
        spaceAfter=2,
        fontName='Helvetica-Bold'
    )
    
    return styles

def get_professional_accountant_styles():
    """Styles for Professional Accountant Template"""
    styles = {}
    
    styles['name'] = ParagraphStyle(
        'AccountantName',
        fontSize=20,
        textColor=colors.HexColor('#1a472a'),
        spaceAfter=6,
        alignment=TA_CENTER,
        fontName='Times-Bold'
    )
    
    styles['contact'] = ParagraphStyle(
        'AccountantContact',
        fontSize=9,
        textColor=colors.HexColor('#495057'),
        alignment=TA_CENTER,
        fontName='Times-Roman'
    )
    
    styles['heading'] = ParagraphStyle(
        'AccountantHeading',
        fontSize=12,
        textColor=colors.HexColor('#1a472a'),
        spaceAfter=6,
        spaceBefore=10,
        fontName='Times-Bold',
        borderWidth=2,
        borderColor=colors.HexColor('#1a472a'),
        borderPadding=3
    )
    
    styles['normal'] = ParagraphStyle(
        'AccountantNormal',
        fontSize=10,
        textColor=colors.HexColor('#212529'),
        spaceAfter=3,
        fontName='Times-Roman'
    )
    
    styles['jobtitle'] = ParagraphStyle(
        'AccountantJobTitle',
        fontSize=11,
        textColor=colors.HexColor('#1a472a'),
        spaceAfter=2,
        fontName='Times-Bold'
    )
    
    return styles

def get_sales_executive_styles():
    """Styles for Sales Executive Template"""
    styles = {}
    
    styles['name'] = ParagraphStyle(
        'SalesName',
        fontSize=24,
        textColor=colors.HexColor('#d35400'),
        spaceAfter=6,
        alignment=TA_CENTER,
        fontName='Helvetica-Bold'
    )
    
    styles['contact'] = ParagraphStyle(
        'SalesContact',
        fontSize=10,
        textColor=colors.HexColor('#7f8c8d'),
        alignment=TA_CENTER,
        fontName='Helvetica'
    )
    
    styles['heading'] = ParagraphStyle(
        'SalesHeading',
        fontSize=14,
        textColor=colors.HexColor('#d35400'),
        spaceAfter=8,
        spaceBefore=12,
        fontName='Helvetica-Bold'
    )
    
    styles['normal'] = ParagraphStyle(
        'SalesNormal',
        fontSize=10,
        textColor=colors.HexColor('#34495e'),
        spaceAfter=4,
        fontName='Helvetica'
    )
    
    styles['jobtitle'] = ParagraphStyle(
        'SalesJobTitle',
        fontSize=12,
        textColor=colors.HexColor('#2c3e50'),
        spaceAfter=2,
        fontName='Helvetica-Bold'
    )
    
    return styles

def get_creative_portfolio_styles():
    """Styles for Creative Portfolio Template"""
    styles = {}
    
    styles['name'] = ParagraphStyle(
        'PortfolioName',
        fontSize=28,
        textColor=colors.HexColor('#9b59b6'),
        spaceAfter=8,
        alignment=TA_LEFT,
        fontName='Helvetica-Bold'
    )
    
    styles['contact'] = ParagraphStyle(
        'PortfolioContact',
        fontSize=10,
        textColor=colors.HexColor('#555555'),
        alignment=TA_LEFT,
        fontName='Helvetica-Oblique'
    )
    
    styles['heading'] = ParagraphStyle(
        'PortfolioHeading',
        fontSize=15,
        textColor=colors.HexColor('#9b59b6'),
        spaceAfter=10,
        spaceBefore=14,
        fontName='Helvetica-Bold'
    )
    
    styles['normal'] = ParagraphStyle(
        'PortfolioNormal',
        fontSize=10,
        textColor=colors.HexColor('#333333'),
        spaceAfter=4,
        fontName='Helvetica'
    )
    
    styles['jobtitle'] = ParagraphStyle(
        'PortfolioJobTitle',
        fontSize=12,
        textColor=colors.HexColor('#8e44ad'),
        spaceAfter=3,
        fontName='Helvetica-Bold'
    )
    
    return styles

def get_creative_designer_styles():
    """Styles for Creative Designer Template"""
    styles = {}
    
    styles['name'] = ParagraphStyle(
        'CreativeName',
        fontSize=26,
        textColor=colors.HexColor('#e74c3c'),
        spaceAfter=6,
        alignment=TA_LEFT,
        fontName='Helvetica-Bold'
    )
    
    styles['contact'] = ParagraphStyle(
        'CreativeContact',
        fontSize=10,
        textColor=colors.HexColor('#555555'),
        alignment=TA_LEFT,
        fontName='Helvetica'
    )
    
    styles['heading'] = ParagraphStyle(
        'CreativeHeading',
        fontSize=14,
        textColor=colors.HexColor('#e74c3c'),
        spaceAfter=8,
        spaceBefore=12,
        fontName='Helvetica-Bold'
    )
    
    styles['normal'] = ParagraphStyle(
        'CreativeNormal',
        fontSize=10,
        textColor=colors.HexColor('#333333'),
        spaceAfter=4,
        fontName='Helvetica'
    )
    
    styles['jobtitle'] = ParagraphStyle(
        'CreativeJobTitle',
        fontSize=12,
        textColor=colors.HexColor('#2c3e50'),
        spaceAfter=2,
        fontName='Helvetica-Bold'
    )
    
    return styles

def get_template_styles(template_id):
    """Get the appropriate styles based on template ID"""
    
    # Map template IDs to style functions
    template_map = {
        '2': get_modern_executive_styles,
        '3': get_creative_designer_styles,
        '4': get_minimalist_styles,
        '5': get_academic_scholar_styles,
        '6': get_tech_sidebar_styles,
        '7': get_creative_portfolio_styles,
        '8': get_modern_executive_styles,  # Duplicate of 2
        '9': get_professional_accountant_styles,
        '10': get_sales_executive_styles,
        '11': get_legal_professional_styles,
        # Database template IDs
        '68a309eb5bd4f4f3594268c9': get_creative_designer_styles,  # Creative from DB
        '68a309eb5bd4f4f3594268ca': get_minimalist_styles,  # Minimalist from DB
        '68a309eb5bd4f4f3594268cb': get_modern_executive_styles,  # Executive from DB
        '68a309eb5bd4f4f3594268cc': get_tech_sidebar_styles,  # Tech Pro from DB
        '68a3a104ca6b026875831f3f': get_professional_accountant_styles,  # Professional Accountant from DB
        '68a3a111ca6b026875831f40': get_sales_executive_styles,  # Sales Executive from DB
        '68a3a143ca6b026875831f41': get_legal_professional_styles,  # Legal Professional from DB
    }
    
    # Get the style function for this template
    style_func = template_map.get(str(template_id), get_minimalist_styles)
    return style_func()


def generate_template_pdf(resume_data, template_data):
    """Generate a PDF with template-specific styling"""
    try:
        # Use tempfile for better cross-platform compatibility
        temp_dir = tempfile.gettempdir()
        filename = f"resume_{datetime.now().strftime('%Y%m%d_%H%M%S')}.pdf"
        filepath = os.path.join(temp_dir, filename)
        
        # Get template ID
        template_id = resume_data.get("template_id", "1")
        
        # Get template-specific styles
        styles = get_template_styles(template_id)
        
        # Create document
        doc = SimpleDocTemplate(filepath, pagesize=A4)
        
        story = []
        
        # Personal Info Section
        personal_info = resume_data.get("personal_info", {})
        
        # For Legal Professional template, create header with black background
        if str(template_id) == '11':
            # Create header content
            header_content = []
            
            # Name
            name_text = personal_info.get("full_name", "").upper()
            name_para = Paragraph(name_text, styles['name'])
            
            # Designation
            designation_para = Paragraph("LEGAL PROFESSIONAL", styles['designation'])
            
            # Contact info
            contact_parts = []
            if personal_info.get("email"):
                contact_parts.append(personal_info["email"])
            if personal_info.get("phone"):
                contact_parts.append(personal_info["phone"])
            if personal_info.get("address"):
                contact_parts.append(personal_info["address"])
            
            contact_text = " | ".join(contact_parts) if contact_parts else ""
            contact_para = Paragraph(contact_text, styles['contact'])
            
            # Create black header with content
            header = BlackHeaderBackground(
                doc.width,
                2.5*inch,  # Header height
                [name_para, designation_para, Spacer(1, 0.1*inch), contact_para]
            )
            story.append(header)
            story.append(Spacer(1, 0.3*inch))
        else:
            # Standard header for other templates
            # Name
            name_text = personal_info.get("full_name", "")
            story.append(Paragraph(name_text, styles['name']))
            
            # Contact info
            contact_parts = []
            if personal_info.get("email"):
                contact_parts.append(personal_info["email"])
            if personal_info.get("phone"):
                contact_parts.append(personal_info["phone"])
            if personal_info.get("address"):
                contact_parts.append(personal_info["address"])
            
            if contact_parts:
                contact_text = " | ".join(contact_parts)
                story.append(Paragraph(contact_text, styles['contact']))
                story.append(Spacer(1, 0.2*inch))
        
        # Professional Summary
        if personal_info.get("summary"):
            story.append(Paragraph("PROFESSIONAL SUMMARY", styles['heading']))
            story.append(Paragraph(personal_info["summary"], styles['normal']))
            story.append(Spacer(1, 0.1*inch))
        
        # Experience Section
        experience = resume_data.get("experience", [])
        if experience:
            story.append(Paragraph("PROFESSIONAL EXPERIENCE", styles['heading']))
            for exp in experience:
                # Job title and company
                exp_title = f"<b>{exp.get('position', '')}</b> at {exp.get('company', '')}"
                story.append(Paragraph(exp_title, styles['jobtitle']))
                
                # Date range
                date_range = f"{exp.get('start_date', '')} - {exp.get('end_date', 'Present') if not exp.get('current') else 'Present'}"
                story.append(Paragraph(date_range, styles['normal']))
                
                # Description
                if exp.get("description"):
                    story.append(Paragraph(exp["description"], styles['normal']))
                
                # Achievements
                if exp.get("achievements"):
                    for achievement in exp["achievements"]:
                        story.append(Paragraph(f"• {achievement}", styles['normal']))
                
                story.append(Spacer(1, 0.1*inch))
        
        # Education Section
        education = resume_data.get("education", [])
        if education:
            story.append(Paragraph("EDUCATION", styles['heading']))
            for edu in education:
                edu_title = f"<b>{edu.get('degree', '')}</b> in {edu.get('field_of_study', '')}"
                story.append(Paragraph(edu_title, styles['jobtitle']))
                story.append(Paragraph(edu.get('institution', ''), styles['normal']))
                
                date_range = f"{edu.get('start_date', '')} - {edu.get('end_date', 'Present') if not edu.get('current') else 'Present'}"
                story.append(Paragraph(date_range, styles['normal']))
                
                if edu.get("gpa"):
                    story.append(Paragraph(f"GPA: {edu['gpa']}", styles['normal']))
                
                story.append(Spacer(1, 0.1*inch))
        
        # Skills Section
        skills = resume_data.get("skills", [])
        if skills:
            story.append(Paragraph("SKILLS", styles['heading']))
            skill_list = ", ".join([skill.get("name", "") for skill in skills])
            story.append(Paragraph(skill_list, styles['normal']))
            story.append(Spacer(1, 0.1*inch))
        
        # Projects Section
        projects = resume_data.get("projects", [])
        if projects:
            story.append(Paragraph("PROJECTS", styles['heading']))
            for project in projects:
                story.append(Paragraph(f"<b>{project.get('name', '')}</b>", styles['jobtitle']))
                story.append(Paragraph(project.get('description', ''), styles['normal']))
                
                if project.get("technologies"):
                    tech_list = ", ".join(project["technologies"])
                    story.append(Paragraph(f"Technologies: {tech_list}", styles['normal']))
                
                story.append(Spacer(1, 0.1*inch))
        
        # Build the PDF
        doc.build(story)
        
        return filepath
    except Exception as e:
        raise