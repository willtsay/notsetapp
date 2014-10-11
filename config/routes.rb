Rails.application.routes.draw do
    
  root 'sessions#index'
  get '/oauth2callback', to: "sessions#google_login_callback"
  get '/fboauth2callback', to: "sessions#facebook_login_callback"
  get '/name', to: "sessions#name"
  resources :users, only: [:index, :create]
  resources :sessions, only: [:new, :create, :destroy]
  get '/single', to: "single#index"
  get '*path' => 'game#index'

end
