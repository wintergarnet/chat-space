class UsersController < ApplicationController

  def index
    @users = User.where('name LIKE(?) && id != ?', "%#{params[:keyword]}%", current_user)
    respond_to do |format|
      format.html
      format.json
    end
  end

  def edit
  end

  def update
    if current_user.update(user_params)
      redirect_to root_path
    else
      render :edit
    end
  end
end
