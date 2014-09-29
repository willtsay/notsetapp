class User < ActiveRecord::Base
  has_secure_password
  validates :email, :email => {:strict_mode => true}, uniqueness: true
  validates :password_digest, presence: true
  before_save :set_username

  private

  def set_username
    self.username = self.email.gsub(/@.+/,'')
  end

end
