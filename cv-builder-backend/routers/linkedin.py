from fastapi import APIRouter, HTTPException, Query
from fastapi.responses import RedirectResponse
from pydantic import BaseModel
from linkedin_oauth import LinkedInOAuth
from typing import Dict, Optional

router = APIRouter()

class LinkedInImportResponse(BaseModel):
    success: bool
    data: Optional[Dict] = None
    message: str = ""
    error: Optional[str] = None
    note: Optional[str] = None

@router.get("/oauth/login")
async def linkedin_oauth_login():
    """
    Initiate LinkedIn OAuth login process
    Redirects user to LinkedIn for authentication
    """
    oauth = LinkedInOAuth()
    
    if not oauth.is_configured():
        raise HTTPException(
            status_code=500,
            detail="LinkedIn OAuth is not configured. Please set LINKEDIN_CLIENT_ID and LINKEDIN_CLIENT_SECRET in environment variables."
        )
    
    auth_url, state = oauth.get_authorization_url()
    
    return {
        "auth_url": auth_url,
        "state": state,
        "message": "Redirect user to auth_url to begin LinkedIn authentication"
    }

@router.get("/oauth/callback")
async def linkedin_oauth_callback(
    code: str = Query(..., description="Authorization code from LinkedIn"),
    state: str = Query(..., description="State parameter for security"),
):
    """
    Handle LinkedIn OAuth callback
    Exchange authorization code for access token and fetch profile data
    """
    try:
        oauth = LinkedInOAuth()
        
        # Exchange code for access token
        access_token = oauth.exchange_code_for_token(code)
        
        if not access_token:
            raise HTTPException(status_code=400, detail="Failed to obtain access token from LinkedIn")
        
        # Get profile data
        profile_data = oauth.get_profile_data(access_token)
        
        if profile_data.get("error"):
            raise HTTPException(status_code=400, detail=profile_data["error"])
        
        return LinkedInImportResponse(
            success=True,
            data=profile_data["data"],
            message=profile_data.get("message", "LinkedIn profile imported successfully"),
            note=profile_data.get("note")
        )
        
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"OAuth callback error: {str(e)}")

@router.post("/oauth/import")
async def linkedin_oauth_import(access_token: str):
    """
    Import LinkedIn profile using existing access token
    Used when frontend already has a valid access token
    """
    try:
        oauth = LinkedInOAuth()
        profile_data = oauth.get_profile_data(access_token)
        
        if profile_data.get("error"):
            return LinkedInImportResponse(
                success=False,
                error=profile_data["error"],
                message="Failed to import LinkedIn profile"
            )
        
        return LinkedInImportResponse(
            success=True,
            data=profile_data["data"],
            message=profile_data.get("message", "LinkedIn profile imported successfully"),
            note=profile_data.get("note")
        )
        
    except Exception as e:
        return LinkedInImportResponse(
            success=False,
            error=str(e),
            message="An error occurred while importing LinkedIn profile"
        )

