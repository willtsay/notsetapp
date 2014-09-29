class ApplicationController < ActionController::Base
  # Prevent CSRF attacks by raising an exception.
  # For APIs, you may want to use :null_session instead.
  protect_from_forgery with: :exception

  private

  def check_logged
    unless session[:username]
      flash[:error] = "not logged in. invalid username/password"
      redirect_to root_path
    end
  end

  def login(user)
    session[:username] = user.username
  end

  def user
    session[:username]
  end

  def logout
    session[:username] = nil
  end

  def google_url
    "https://accounts.google.com/o/oauth2/auth?" +
      "response_type=code&"+
      "client_id=#{Rails.application.secrets.google_id}&"+
      "redirect_uri=#{Rails.application.secrets.google_redirect}&"+
      "scope=email%20profile&"+
      "state=#{Rails.application.secrets.state}&"
  end
  def get_user_info(access_code)
    first_response = HTTParty.post("https://accounts.google.com/o/oauth2/token?", {body: {client_id: Rails.application.secrets.google_id, client_secret: Rails.application.secrets.google_secret, redirect_uri: Rails.application.secrets.google_redirect, grant_type:"authorization_code", code: access_code}}) 
    access_token = first_response["access_token"]
    user_info = HTTParty.get("https://www.googleapis.com/plus/v1/people/me?", {query: {access_token: access_token}})
    {first_name: user_info["name"]["givenName"], picture: user_info["image"]["url"], email: user_info["emails"][0]["value"]}
  end

  def facebook_url
    "https://www.facebook.com/dialog/oauth?client_id=#{Rails.application.secrets.fb_id}&response_type=code&redirect_uri=#{Rails.application.secrets.fb_redirect}&state=#{Rails.application.secrets.state}&scope=email,public_profile"
  end
  def get_fb_user_info(access_code)
    first_response = HTTParty.get("https://graph.facebook.com/oauth/access_token?client_id=#{Rails.application.secrets.fb_id}&client_secret=#{Rails.application.secrets.fb_secret}&redirect_uri=#{Rails.application.secrets.fb_redirect}&code=#{access_code}")
    first_response.gsub!(/&expires.*/,'')
    first_response.gsub!(/access_token=/,'')
    access_token = first_response
    user_info = JSON.parse(HTTParty.get("https://graph.facebook.com/me?access_token=#{access_token}"))
  end


end
