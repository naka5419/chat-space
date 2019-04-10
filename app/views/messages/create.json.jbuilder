json.(@message, :content, :image)
json.created_at simple_time(@message.created_at)
json.user_name @message.user.name
json.id @message.id
