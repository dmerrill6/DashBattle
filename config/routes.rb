Rails.application.routes.draw do
  devise_for :users
  root to: "pages#home"

  resources :dashboards do
  	resources :component_dashboards
  end
end
