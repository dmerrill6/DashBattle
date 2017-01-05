class ComponentDashboardSerializer < ActiveModel::Serializer
  attributes :id, :row, :col, :endpoint, :secret_key, :response_data_location, :refresh_time, :title, :subtitle

  belongs_to :component
end
