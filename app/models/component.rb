class Component < ApplicationRecord
	has_many :component_dashboards
  	has_many :dashboards, through: :component_dashboards
end
