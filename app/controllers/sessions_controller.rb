class SessionsController < ApplicationController

  def login
    @hello = "helloworld"
    @google_url = google_url
  end

  def google_login_callback
    @info = get_user_info(params[:code])
    redirect_to root_path
  end


end