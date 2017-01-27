class AddSizeXToComponentDashboard < ActiveRecord::Migration[5.0]
  def change
    add_column :component_dashboards, :sizeX, :integer
  end
end
