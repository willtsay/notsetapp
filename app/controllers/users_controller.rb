class UsersController < ApplicationController

  def create
    logout
    user = User.find_by_email(params_user[:email])
    if (user && user.authenticate(params_user[:password]))
      login(user)
      redirect_to '/multi'
    else 
      @user = User.new(params_user)
      if @user.save 
        login(@user)
        redirect_to '/multi'
      else
        redirect_to root_path
      end
    end
  end

  private

  def params_user
    params.require(:user).permit(:password, :email)
  end


end