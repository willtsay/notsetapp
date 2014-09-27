Rails.application.routes.draw do
    
  root 'sessions#login'
  get '/oauth2callback', to: "sessions#google_login_callback"
  get '*path' => 'game#index'

end
