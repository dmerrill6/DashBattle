class AddRefreshTimeToComponentDashboards < ActiveRecord::Migration[5.0]
  def change
    add_column :component_dashboards, :refresh_time, :integer, default: 60
  end
end
