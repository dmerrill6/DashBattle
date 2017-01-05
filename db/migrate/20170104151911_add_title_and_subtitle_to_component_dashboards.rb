class AddTitleAndSubtitleToComponentDashboards < ActiveRecord::Migration[5.0]
  def change
    add_column :component_dashboards, :title, :string
    add_column :component_dashboards, :subtitle, :string
  end
end
