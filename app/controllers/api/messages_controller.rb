class Api::MessagesController < ApplicationController
  def index
  	#@messages = @group.messages.where('id > ?', params[:id])
  	#@message = @messages.where('id > ?', params[:id])

  	@messages = Message.where('id > ?', params[:id])
  	 #@new_message = @messages.where('id > ?', params[:last_id])
	#@messages = messages.where('id > ?', params[:id])
	#@messages = @group.messages.includes(:user).where('id > ?', params[:id])
	#messages = Message.where('id > ?', params[:id])
	#@messages = @messages.where('id > ?', params[:last_id])
  end
end