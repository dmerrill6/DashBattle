class AddDataTypeToComponent < ActiveRecord::Migration[5.0]
  def change
    add_column :components, :data_type, :string
  end
end
