class Dashboard < ApplicationRecord
  belongs_to :user
  has_many :component_dashboards
  has_many :components, through: :component_dashboards
end
