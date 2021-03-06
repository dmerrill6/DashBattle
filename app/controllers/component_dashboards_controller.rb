class ComponentDashboardsController < ApplicationController
  before_action :set_component_dashboard, only: [:show, :edit, :update, :destroy]

  def show
  end

  def index
    @dashboard = Dashboard.find(params[:dashboard_id])
    @component_dashboards = @dashboard.component_dashboards
    respond_to do |format|
      format.html{}
      format.json{render json: @component_dashboards}
    end
  end

  def new
    @component_dashboard = ComponentDashboard.new
    @dashboard = Dashboard.find(params[:dashboard_id])
    @components_json = Component.all.to_json

  end

  def create
    @component_dashboard = ComponentDashboard.new(component_dashboard_params)
    @dashboard = Dashboard.find(params[:dashboard_id])
    respond_to do |format|
      if @component_dashboard.save
        @dashboard.component_dashboards << @component_dashboard
        format.html{redirect_to action: :index}
        format.json{render json: @component_dashboard, status: :ok}
      else
        format.html{redirect_to action: :new, notice: "ComponentDashboard could not be created."}
        format.json{render json: @component_dashboard.errors, status: :unprocessable_entity}
      end
    end
  end

  def edit
    @dashboard = Dashboard.find(params[:dashboard_id])
  end

  def update
    @component_dashboard = ComponentDashboard.find(params[:id])
    respond_to do |format|
      if @component_dashboard.update(component_dashboard_params.dup)
        format.json{render json: @component_dashboard, status: :ok}
      else
        format.json{render json: @component_dashboard.errors, status: :unprocessable_entity}
      end
    end
  end

  def destroy
    @component_dashboard.destroy
    respond_to do |format|
      format.html { redirect_to dashboard_component_dashboards_path, notice: 'ComponentDashboard was successfully destroyed.' }
      format.json { head :no_content }
    end
  end

  def set_component_dashboard
     @component_dashboard = ComponentDashboard.find(params[:id])
   end

  def component_dashboard_params
		params.require(:component_dashboard).permit(:component_id, :col, :row, :sizeX, :sizeY, :endpoint,
    :secret_key, :response_data_location, :refresh_time, :title, :subtitle
		)
	end


end
