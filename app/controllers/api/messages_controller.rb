class Api::MessagesController < ApplicationController
  def index

     @messages = Message.where('id > ? and group_id = ? ', params[:id], params[:group_id])

  end
end

