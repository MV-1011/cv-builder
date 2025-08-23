from pdf_templates import generate_template_pdf

def generate_pdf(resume_data, template_data):
    """
    Generate a PDF resume with template-specific styling.
    
    This function delegates to the template-specific PDF generator
    which handles different template designs.
    
    Args:
        resume_data: Dictionary containing resume information
        template_data: Dictionary containing template information
    
    Returns:
        str: Path to the generated PDF file
    """
    try:
        # Use the template-specific PDF generator
        return generate_template_pdf(resume_data, template_data)
    except Exception as e:
        # Log the error and re-raise
        print(f"Error generating PDF: {str(e)}")
        raise