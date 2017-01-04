class Component < ApplicationRecord
	has_many :component_dashboards
	has_many :dashboards, through: :component_dashboards

	validates_uniqueness_of :data_type
	validates_presence_of :data_type
end
