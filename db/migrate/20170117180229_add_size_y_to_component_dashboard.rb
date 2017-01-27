class AddSizeYToComponentDashboard < ActiveRecord::Migration[5.0]
  def change
    add_column :component_dashboards, :sizeY, :integer
  end
end
