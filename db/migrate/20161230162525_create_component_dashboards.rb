class CreateComponentDashboards < ActiveRecord::Migration[5.0]
  def change
    create_table :component_dashboards do |t|
      t.integer :component_id
      t.integer :dashboard_id
      t.integer :col
      t.integer :row
      t.string :endpoint
      t.string :secret_key

      t.timestamps
    end
  end
end
