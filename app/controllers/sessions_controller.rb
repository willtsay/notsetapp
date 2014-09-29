class SessionsController < ApplicationController

  def index
    @user = User.new
    @facebook_url = facebook_url
    @google_url = google_url
  end

  def google_login_callback
    logout
    user_info = get_user_info(params[:code])
    if User.find_by_email(user_info[:email])
      user = User.find_by_email(user_info[:email]) 
      login(user)
    else
      user = User.create(email: user_info[:email], username: user_info[:email].gsub!(/@.+/,''), password:SecureRandom.hex)
      login(user)
    end
    redirect_to '/multi'
  end

  def facebook_login_callback
    logout
    user_info = get_fb_user_info(params[:code])
    if User.find_by_email(user_info["email"])
      user = User.find_by_email(user_info["email"])
      login(user)
    else
      user = User.create(email: user_info["email"], username: user_info["email"].gsub(/@.+/,''), password:SecureRandom.hex)
      login(user)
    end
    redirect_to '/multi'
  end

  def name
    username = { name: user}
    render json: username
  end


end