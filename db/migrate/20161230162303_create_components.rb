class CreateComponents < ActiveRecord::Migration[5.0]
  def change
    create_table :components do |t|
      t.integer :width
      t.integer :height
      t.string :name

      t.timestamps
    end
  end
end
