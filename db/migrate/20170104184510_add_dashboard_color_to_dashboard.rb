class AddDashboardColorToDashboard < ActiveRecord::Migration[5.0]
  def change
    add_column :dashboards, :dashboard_color, :string
  end
end
