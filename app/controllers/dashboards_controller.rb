class DashboardsController < ApplicationController
  load_and_authorize_resource
  def show
    @dashboard = Dashboard.find(params[:id])

  end

  def index
    @dashboards = current_user.dashboards
    respond_to do |format|
      format.html{}
      format.json{render json: @dashboards, status: :ok }
    end
  end

  def new

  end

  def update
    @dashboard = Dashboard.find(params[:id])
    respond_to do |format|
      if @dashboard.update(dashboard_params.dup)
        format.json{render json: @dashboard, status: :ok}
      else
        format.json{render json: @dashboard.errors, status: :unprocessable_entity}
      end
    end
  end

  def create
    new_params = dashboard_params.dup
    @dashboard = Dashboard.new(new_params)
    respond_to do |format|
      if @dashboard.save
        format.html{redirect_to action: :index}
      else
        format.html{redirect_to action: :new, notice: "Dashboard could not be created."}
      end
    end
  end

  protected
  def dashboard_params
		params.require(:dashboard).permit(
      :name, :user_id, :dashboard_color
		)
	end
end
