import os
import requests
from typing import Dict, Optional
from urllib.parse import urlencode, parse_qs, urlparse
import secrets

class LinkedInOAuth:
    """
    LinkedIn Sign-In API OAuth implementation
    Uses the FREE LinkedIn Sign-In API to get basic profile information
    """
    
    def __init__(self):
        self.client_id = os.getenv("LINKEDIN_CLIENT_ID")
        self.client_secret = os.getenv("LINKEDIN_CLIENT_SECRET")
        self.redirect_uri = os.getenv("LINKEDIN_REDIRECT_URI")
        
        # LinkedIn OAuth URLs
        self.auth_base_url = "https://www.linkedin.com/oauth/v2/authorization"
        self.token_url = "https://www.linkedin.com/oauth/v2/accessToken"
        self.profile_url = "https://api.linkedin.com/v2/people/~"
        self.email_url = "https://api.linkedin.com/v2/emailAddress?q=members&projection=(elements*(handle~))"
        
        # Scopes available with free Sign-In API
        self.scopes = [
            "r_liteprofile",  # Basic profile info
            "r_emailaddress"  # Email address
        ]
    
    def get_authorization_url(self, state: Optional[str] = None) -> tuple[str, str]:
        """
        Generate LinkedIn authorization URL
        Returns: (auth_url, state)
        """
        if not state:
            state = secrets.token_urlsafe(32)
        
        params = {
            "response_type": "code",
            "client_id": self.client_id,
            "redirect_uri": self.redirect_uri,
            "state": state,
            "scope": " ".join(self.scopes)
        }
        
        auth_url = f"{self.auth_base_url}?{urlencode(params)}"
        return auth_url, state
    
    def exchange_code_for_token(self, code: str) -> Optional[str]:
        """
        Exchange authorization code for access token
        """
        try:
            data = {
                "grant_type": "authorization_code",
                "code": code,
                "redirect_uri": self.redirect_uri,
                "client_id": self.client_id,
                "client_secret": self.client_secret
            }
            
            headers = {
                "Content-Type": "application/x-www-form-urlencoded"
            }
            
            response = requests.post(self.token_url, data=data, headers=headers)
            
            if response.status_code == 200:
                token_data = response.json()
                return token_data.get("access_token")
            else:
                print(f"Token exchange failed: {response.status_code} - {response.text}")
                return None
                
        except Exception as e:
            print(f"Error exchanging code for token: {e}")
            return None
    
    def get_profile_data(self, access_token: str) -> Dict:
        """
        Fetch user profile data from LinkedIn API
        """
        try:
            headers = {
                "Authorization": f"Bearer {access_token}",
                "Content-Type": "application/json"
            }
            
            # Get basic profile info
            profile_response = requests.get(
                f"{self.profile_url}?projection=(id,firstName,lastName,headline,location,industry,summary,profilePicture(displayImage~:playableStreams))",
                headers=headers
            )
            
            if profile_response.status_code != 200:
                return {"error": f"Failed to fetch profile: {profile_response.status_code}"}
            
            profile_data = profile_response.json()
            
            # Get email address
            email_response = requests.get(self.email_url, headers=headers)
            email = None
            if email_response.status_code == 200:
                email_data = email_response.json()
                if email_data.get("elements") and len(email_data["elements"]) > 0:
                    email = email_data["elements"][0].get("handle~", {}).get("emailAddress")
            
            # Process and structure the data
            return self._process_profile_data(profile_data, email)
            
        except Exception as e:
            return {"error": f"Error fetching profile data: {str(e)}"}
    
    def _process_profile_data(self, profile_data: Dict, email: Optional[str]) -> Dict:
        """
        Process LinkedIn profile data into CV format
        """
        try:
            # Extract names
            first_name = profile_data.get("firstName", {}).get("localized", {})
            last_name = profile_data.get("lastName", {}).get("localized", {})
            
            # Get the first available language variant
            first_name_text = list(first_name.values())[0] if first_name else ""
            last_name_text = list(last_name.values())[0] if last_name else ""
            full_name = f"{first_name_text} {last_name_text}".strip()
            
            # Extract other fields
            headline = profile_data.get("headline", {}).get("localized", {})
            headline_text = list(headline.values())[0] if headline else ""
            
            # Location processing
            location_info = profile_data.get("location", {})
            location_name = ""
            if location_info:
                location_data = location_info.get("localized", {})
                location_name = list(location_data.values())[0] if location_data else ""
            
            # Industry
            industry = profile_data.get("industry", {}).get("localized", {})
            industry_text = list(industry.values())[0] if industry else ""
            
            # Summary
            summary_data = profile_data.get("summary", {})
            summary_text = ""
            if summary_data:
                summary_localized = summary_data.get("localized", {})
                summary_text = list(summary_localized.values())[0] if summary_localized else ""
            
            # Profile picture
            profile_pic_url = None
            profile_pic = profile_data.get("profilePicture", {})
            if profile_pic:
                display_image = profile_pic.get("displayImage~", {})
                if display_image and display_image.get("elements"):
                    # Get the largest image
                    images = display_image["elements"]
                    if images:
                        profile_pic_url = images[-1].get("identifiers", [{}])[-1].get("identifier")
            
            # Build CV format data
            cv_data = {
                "personal_info": {
                    "full_name": full_name,
                    "email": email,
                    "phone": "",  # Not available via Sign-In API
                    "address": "",
                    "city": self._extract_city(location_name),
                    "country": self._extract_country(location_name),
                    "postal_code": "",
                    "linkedin": f"https://www.linkedin.com/in/{profile_data.get('id', '')}",
                    "github": "",
                    "website": "",
                    "summary": summary_text or f"{headline_text}. Professional in {industry_text}." if headline_text else ""
                },
                "experience": [
                    {
                        "company": "Current Company",
                        "position": headline_text,
                        "location": location_name,
                        "start_date": "",
                        "end_date": "",
                        "current": True,
                        "description": f"Currently working as {headline_text}" + (f" in {industry_text} industry" if industry_text else ""),
                        "achievements": []
                    }
                ] if headline_text else [],
                "education": [],  # Not available via free API
                "skills": [],    # Not available via free API
                "projects": [],
                "certifications": [],
                "languages": [],
                "references": [],
                "profile_picture": profile_pic_url
            }
            
            return {
                "success": True,
                "data": cv_data,
                "message": "LinkedIn profile imported successfully via LinkedIn Sign-In API",
                "note": "Free API provides basic profile information. Add more details manually for a complete CV."
            }
            
        except Exception as e:
            return {"error": f"Error processing profile data: {str(e)}"}
    
    def _extract_city(self, location: str) -> str:
        """Extract city from location string"""
        if not location:
            return ""
        parts = location.split(",")
        return parts[0].strip() if parts else ""
    
    def _extract_country(self, location: str) -> str:
        """Extract country from location string"""
        if not location:
            return ""
        parts = location.split(",")
        return parts[-1].strip() if len(parts) > 1 else ""
    
    def is_configured(self) -> bool:
        """Check if LinkedIn OAuth is properly configured"""
        return all([
            self.client_id and self.client_id != "your_linkedin_client_id_here",
            self.client_secret and self.client_secret != "your_linkedin_client_secret_here",
            self.redirect_uri
        ])