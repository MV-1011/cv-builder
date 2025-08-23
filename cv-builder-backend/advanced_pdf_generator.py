from reportlab.lib import colors
from reportlab.lib.pagesizes import letter, A4
from reportlab.platypus import SimpleDocTemplate, Table, TableStyle, Paragraph, Spacer, PageBreak, Flowable
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.lib.units import inch, mm
from reportlab.lib.enums import TA_LEFT, TA_CENTER, TA_RIGHT, TA_JUSTIFY
from reportlab.pdfgen import canvas
from reportlab.platypus.tableofcontents import TableOfContents
from reportlab.platypus.frames import Frame
from reportlab.platypus.doctemplate import PageTemplate, BaseDocTemplate
import os
from datetime import datetime
import tempfile

class AdvancedResumeCanvas(canvas.Canvas):
    """Custom canvas for advanced resume layouts"""
    
    def __init__(self, *args, **kwargs):
        self.template_id = kwargs.pop('template_id', '1')
        super().__init__(*args, **kwargs)
        
    def draw_legal_header(self, resume_data):
        """Draw the exact Legal Professional header layout"""
        personal_info = resume_data.get("personal_info", {})
        
        # Black header background
        self.setFillColor(colors.HexColor('#1a1a1a'))
        self.rect(0, A4[1] - 150, A4[0], 150, fill=1, stroke=0)
        
        # Gold accent line at bottom of header
        self.setStrokeColor(colors.HexColor('#8b7355'))
        self.setLineWidth(4)
        self.line(0, A4[1] - 150, A4[0], A4[1] - 150)
        
        # Name (centered, uppercase)
        self.setFillColor(colors.white)
        self.setFont("Times-Roman", 28)
        name = personal_info.get("full_name", "").upper()
        text_width = self.stringWidth(name, "Times-Roman", 28)
        self.drawString((A4[0] - text_width) / 2, A4[1] - 50, name)
        
        # Subtitle line under name
        self.setStrokeColor(colors.HexColor('#8b7355'))
        self.setLineWidth(1)
        line_y = A4[1] - 70
        self.line((A4[0] - 200) / 2, line_y, (A4[0] + 200) / 2, line_y)
        
        # Legal Professional designation (gold)
        self.setFillColor(colors.HexColor('#d4af37'))
        self.setFont("Times-Italic", 12)
        designation = "LEGAL PROFESSIONAL"
        text_width = self.stringWidth(designation, "Times-Italic", 12)
        self.drawString((A4[0] - text_width) / 2, A4[1] - 90, designation)
        
        # Contact info grid (2x2 layout)
        self.setFillColor(colors.white)
        self.setFont("Times-Roman", 9)
        
        # Left column
        email = personal_info.get("email", "")
        phone = personal_info.get("phone", "")
        address = f"{personal_info.get('city', '')}, {personal_info.get('country', '')}"
        linkedin = personal_info.get("linkedin", "")
        
        # Email (top left)
        if email:
            self.setFillColor(colors.HexColor('#d4af37'))
            self.drawString(120, A4[1] - 115, "Email:")
            self.setFillColor(colors.white)
            self.drawString(160, A4[1] - 115, email)
        
        # Phone (top right)  
        if phone:
            self.setFillColor(colors.HexColor('#d4af37'))
            self.drawString(320, A4[1] - 115, "Phone:")
            self.setFillColor(colors.white)
            self.drawString(360, A4[1] - 115, phone)
        
        # Address (bottom left)
        if address != ", ":
            self.setFillColor(colors.HexColor('#d4af37'))
            self.drawString(120, A4[1] - 135, "Address:")
            self.setFillColor(colors.white)
            self.drawString(170, A4[1] - 135, address)
        
        return 150  # Return header height
    
    def draw_legal_body(self, resume_data, start_y):
        """Draw the Legal Professional body with proper styling"""
        # Light gray background for body
        self.setFillColor(colors.HexColor('#fafafa'))
        self.rect(0, 0, A4[0], start_y, fill=1, stroke=0)
        
        current_y = start_y - 40
        
        # Professional Summary section with white card background
        personal_info = resume_data.get("personal_info", {})
        if personal_info.get("summary"):
            # Section title with gold lines
            self.setFillColor(colors.HexColor('#1a1a1a'))
            self.setFont("Times-Roman", 13)
            title = "PROFESSIONAL PROFILE"
            title_width = self.stringWidth(title, "Times-Roman", 13)
            
            # Left gold line
            self.setStrokeColor(colors.HexColor('#8b7355'))
            self.setLineWidth(1)
            self.line(50, current_y - 5, (A4[0] - title_width) / 2 - 15, current_y - 5)
            
            # Title
            self.drawString((A4[0] - title_width) / 2, current_y - 10, title)
            
            # Right gold line
            self.line((A4[0] + title_width) / 2 + 15, current_y - 5, A4[0] - 50, current_y - 5)
            
            current_y -= 30
            
            # White background card for summary
            self.setFillColor(colors.white)
            self.setStrokeColor(colors.HexColor('#e0e0e0'))
            card_height = 80
            self.rect(50, current_y - card_height, A4[0] - 100, card_height, fill=1, stroke=1)
            
            # Gold left accent bar
            self.setFillColor(colors.HexColor('#8b7355'))
            self.rect(50, current_y - card_height, 3, card_height, fill=1, stroke=0)
            
            # Summary text
            self.setFillColor(colors.HexColor('#333333'))
            self.setFont("Times-Roman", 10)
            
            # Text wrapping for summary
            summary = personal_info["summary"]
            lines = self._wrap_text(summary, A4[0] - 140, "Times-Roman", 10)
            text_y = current_y - 20
            
            for line in lines:
                if text_y > current_y - card_height + 10:
                    self.drawString(70, text_y, line)
                    text_y -= 12
            
            current_y -= card_height + 30
        
        return current_y
    
    def draw_modern_executive_header(self, resume_data):
        """Draw Modern Executive template header"""
        personal_info = resume_data.get("personal_info", {})
        
        # Blue gradient header background
        self.setFillColor(colors.HexColor('#2c3e50'))
        self.rect(0, A4[1] - 100, A4[0], 100, fill=1, stroke=0)
        
        # Blue accent line
        self.setStrokeColor(colors.HexColor('#3498db'))
        self.setLineWidth(3)
        self.line(0, A4[1] - 100, A4[0], A4[1] - 100)
        
        # Name (left-aligned, large)
        self.setFillColor(colors.white)
        self.setFont("Helvetica-Bold", 24)
        name = personal_info.get("full_name", "")
        self.drawString(50, A4[1] - 45, name)
        
        # Title/subtitle
        self.setFont("Helvetica", 12)
        self.setFillColor(colors.HexColor('#bdc3c7'))
        title = personal_info.get("summary", "Professional Title")[:50] + "..." if len(personal_info.get("summary", "")) > 50 else personal_info.get("summary", "Professional Title")
        self.drawString(50, A4[1] - 65, title)
        
        # Contact info (right side with icons)
        contact_x = A4[0] - 200
        contact_y = A4[1] - 30
        
        self.setFillColor(colors.white)
        self.setFont("Helvetica", 9)
        
        if personal_info.get("email"):
            self.drawString(contact_x, contact_y, f"📧 {personal_info['email']}")
            contact_y -= 15
        
        if personal_info.get("phone"):
            self.drawString(contact_x, contact_y, f"📞 {personal_info['phone']}")
            contact_y -= 15
        
        if personal_info.get("city"):
            self.drawString(contact_x, contact_y, f"📍 {personal_info.get('city', '')}, {personal_info.get('country', '')}")
        
        return 100  # Header height
    
    def draw_timeline_experience(self, resume_data, start_y):
        """Draw timeline-style experience for Modern Executive"""
        current_y = start_y - 40
        
        # Section title
        self.setFillColor(colors.HexColor('#2c3e50'))
        self.setFont("Helvetica-Bold", 14)
        self.drawString(50, current_y, "PROFESSIONAL EXPERIENCE")
        
        # Blue underline
        self.setStrokeColor(colors.HexColor('#3498db'))
        self.setLineWidth(2)
        self.line(50, current_y - 5, 250, current_y - 5)
        
        current_y -= 30
        
        # Experience items with timeline
        experience = resume_data.get("experience", [])
        for i, exp in enumerate(experience[:3]):  # Limit to 3 for space
            # Timeline dot
            self.setFillColor(colors.HexColor('#3498db'))
            self.circle(70, current_y - 10, 4, fill=1)
            
            # Timeline line (except for last item)
            if i < len(experience) - 1 and i < 2:
                self.setStrokeColor(colors.HexColor('#bdc3c7'))
                self.setLineWidth(2)
                self.line(70, current_y - 14, 70, current_y - 80)
            
            # Job title
            self.setFillColor(colors.HexColor('#2c3e50'))
            self.setFont("Helvetica-Bold", 12)
            self.drawString(90, current_y - 5, exp.get('position', ''))
            
            # Company and date
            self.setFont("Helvetica", 10)
            company = exp.get('company', '')
            date_range = f"{exp.get('start_date', '')} - {exp.get('end_date', 'Present') if not exp.get('current') else 'Present'}"
            self.drawString(90, current_y - 20, f"{company} | {date_range}")
            
            # Description
            self.setFillColor(colors.HexColor('#34495e'))
            self.setFont("Helvetica", 9)
            description = exp.get('description', '')
            if description:
                lines = self._wrap_text(description, A4[0] - 140, "Helvetica", 9)
                desc_y = current_y - 35
                for line in lines[:2]:  # Limit to 2 lines
                    self.drawString(90, desc_y, line)
                    desc_y -= 11
            
            current_y -= 80
            
        return current_y
    
    def _wrap_text(self, text, max_width, font_name, font_size):
        """Wrap text to fit within specified width"""
        words = text.split(' ')
        lines = []
        current_line = []
        
        for word in words:
            test_line = ' '.join(current_line + [word])
            text_width = self.stringWidth(test_line, font_name, font_size)
            
            if text_width <= max_width:
                current_line.append(word)
            else:
                if current_line:
                    lines.append(' '.join(current_line))
                    current_line = [word]
                else:
                    lines.append(word)  # Single word too long, add anyway
        
        if current_line:
            lines.append(' '.join(current_line))
        
        return lines

class CustomDocTemplate(BaseDocTemplate):
    """Custom document template for advanced layouts"""
    
    def __init__(self, filename, template_id='1', resume_data=None, **kwargs):
        self.template_id = template_id
        self.resume_data = resume_data or {}
        super().__init__(filename, **kwargs)
        
    def handle_pageBegin(self):
        """Custom page layout based on template"""
        super().handle_pageBegin()
        
        if self.template_id == '11':  # Legal Professional
            header_height = self.canv.draw_legal_header(self.resume_data)
            self.canv.draw_legal_body(self.resume_data, A4[1] - header_height)
            
        elif self.template_id == '2':  # Modern Executive  
            header_height = self.canv.draw_modern_executive_header(self.resume_data)
            self.canv.draw_timeline_experience(self.resume_data, A4[1] - header_height)

def generate_advanced_pdf(resume_data, template_data):
    """Generate PDF with advanced layouts matching frontend templates"""
    try:
        temp_dir = tempfile.gettempdir()
        filename = f"resume_{datetime.now().strftime('%Y%m%d_%H%M%S')}.pdf"
        filepath = os.path.join(temp_dir, filename)
        
        template_id = resume_data.get("template_id", "1")
        
        # Create custom canvas class with template-specific methods
        class TemplateCanvas(AdvancedResumeCanvas):
            def __init__(self, *args, **kwargs):
                super().__init__(*args, template_id=template_id, **kwargs)
        
        # Use custom document template for complex layouts
        if template_id in ['11', '2']:
            doc = CustomDocTemplate(
                filepath, 
                template_id=template_id,
                resume_data=resume_data,
                pagesize=A4,
                canvasmaker=TemplateCanvas
            )
            
            # Simple story for custom templates (layout handled in canvas)
            story = [Spacer(1, 8*inch)]  # Push content down to avoid header overlap
            doc.build(story)
            
        else:
            # Fall back to basic template for others
            from pdf_templates import generate_template_pdf
            return generate_template_pdf(resume_data, template_data)
        
        return filepath
        
    except Exception as e:
        print(f"Error in advanced PDF generation: {e}")
        # Fall back to basic template
        from pdf_templates import generate_template_pdf
        return generate_template_pdf(resume_data, template_data)