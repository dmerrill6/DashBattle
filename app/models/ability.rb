class Ability
  include CanCan::Ability

  def initialize(user)
    if user.has_role? :admin
      can :manage, :all
    else
      can :manage, Dashboard, {user_id: user.id}
      can :manage, ComponentDashboard, {dashboard: {user_id: user.id}}
    end
  end
end
