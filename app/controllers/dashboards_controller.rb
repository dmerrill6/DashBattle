class DashboardsController < ApplicationController
  load_and_authorize_resource

  def index
    @dashboards = current_user.dashboards
  end

  def new

  end

  protected
  def dashboard_params
		params.require(:dashboard).permit(
      :name
		)
	end
end
