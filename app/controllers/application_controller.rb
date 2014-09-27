class ApplicationController < ActionController::Base
  # Prevent CSRF attacks by raising an exception.
  # For APIs, you may want to use :null_session instead.
  protect_from_forgery with: :exception

  def index
  end

  def check_logged
    unless session[:user_id]
      redirect_to root_path
    end
  end

  def google_url
    "https://accounts.google.com/o/oauth2/auth?" +
      "response_type=code&"+
      "client_id=#{Rails.application.secrets.client_id}&"+
      "redirect_uri=#{Rails.application.secrets.redirect_uri}&"+
      "scope=email%20profile&"+
      "state=#{Rails.application.secrets.state}&"
  end

  def get_user_info(access_code)
    first_response = HTTParty.post("https://accounts.google.com/o/oauth2/token?", {body: {client_id: Rails.application.secrets.client_id, client_secret: Rails.application.secrets.client_secret, redirect_uri: Rails.application.secrets.redirect_uri, grant_type:"authorization_code", code: access_code}}) 
  end

end
