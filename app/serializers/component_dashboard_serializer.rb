class ComponentDashboardSerializer < ActiveModel::Serializer
  attributes :id, :row, :col, :endpoint, :secret_key

  belongs_to :component
end
