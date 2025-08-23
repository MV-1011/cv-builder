from advanced_pdf_generator import generate_advanced_pdf
from pdf_templates import generate_template_pdf

def generate_pdf(resume_data, template_data):
    """
    Generate a PDF resume with advanced template-specific layouts.
    
    Uses advanced canvas-based rendering for complex templates,
    falls back to basic styling for simpler templates.
    
    Args:
        resume_data: Dictionary containing resume information
        template_data: Dictionary containing template information
    
    Returns:
        str: Path to the generated PDF file
    """
    try:
        # Check if template needs advanced layout rendering
        template_id = resume_data.get("template_id", "1")
        
        # Templates with complex layouts use advanced generator
        if template_id in ['11', '2', '3', '6', '7', '10']:
            return generate_advanced_pdf(resume_data, template_data)
        else:
            # Simpler templates use the styled template system
            return generate_template_pdf(resume_data, template_data)
            
    except Exception as e:
        # Log the error and fall back to basic template
        print(f"Error generating PDF: {str(e)}")
        try:
            return generate_template_pdf(resume_data, template_data)
        except:
            raise Exception(f"PDF generation failed: {str(e)}")