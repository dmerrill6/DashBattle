# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

Component.create({data_type: 'amount', width: '1', height: '1', name: 'Number Component' })
Component.create({data_type: 'goal', width: '1', height: '1', name: 'Goal Component' })
Component.create({data_type: 'line-chart', width: '2', height: '1', name: 'Line Component' })
Component.create({data_type: 'bar-chart', width: '2', height: '1', name: 'Bar Component' })
Component.create({data_type: 'pie-chart', width: '2', height: '1', name: 'Pie Component' })
Component.create({data_type: 'iframe', width: '2', height: '2', name: 'Iframe' })
