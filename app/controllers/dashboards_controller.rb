class DashboardsController < ApplicationController
  load_and_authorize_resource

  def index
    @dashboards = current_user.dashboards
  end
end
