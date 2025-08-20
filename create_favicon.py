#!/usr/bin/env python3
from PIL import Image, ImageDraw, ImageFont
import os

# Create a simple favicon with "CV" text
def create_favicon():
    # Create 32x32 image (favicon size)
    size = 32
    img = Image.new('RGBA', (size, size), (47, 85, 151, 255))  # Blue background
    
    draw = ImageDraw.Draw(img)
    
    # Try to use a simple font, fallback to default if not available
    try:
        # Use default PIL font
        font_size = 18
        # Draw "CV" text in white
        text = "CV"
        
        # Calculate text position to center it
        bbox = draw.textbbox((0, 0), text)
        text_width = bbox[2] - bbox[0]
        text_height = bbox[3] - bbox[1]
        
        x = (size - text_width) // 2
        y = (size - text_height) // 2 - 2
        
        # Draw text with white color
        draw.text((x, y), text, fill=(255, 255, 255, 255))
        
    except Exception as e:
        print(f"Error drawing text: {e}")
        # If text fails, just create a simple colored square
        draw.rectangle([6, 6, 26, 26], fill=(255, 255, 255, 255))
    
    return img

# Create and save favicon
favicon = create_favicon()

# Save as ICO file
favicon_path = '/home/mayur/PJs/Cv_builder/cv-builder-frontend/public/favicon.ico'
favicon.save(favicon_path, format='ICO', sizes=[(32, 32), (16, 16)])

# Also create PNG versions for mobile icons
favicon.save('/home/mayur/PJs/Cv_builder/cv-builder-frontend/public/logo192.png', format='PNG')

# Create 512x512 version
large_favicon = create_favicon()
large_favicon = large_favicon.resize((512, 512), Image.Resampling.LANCZOS)
large_favicon.save('/home/mayur/PJs/Cv_builder/cv-builder-frontend/public/logo512.png', format='PNG')

print("Favicon and logos created successfully!")