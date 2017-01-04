class AddResponseDataLocationToComponentDashboards < ActiveRecord::Migration[5.0]
  def change
    add_column :component_dashboards, :response_data_location, :string
  end
end
