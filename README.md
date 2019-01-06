# README

## membersテーブル

|Column|Type|Options|
|------|----|-------|
|user_id|integer|null: false, foreign_key: true|
|group_id|integer|null: false, foreign_key: true|

### Association
- belongs_to :group
- belongs_to :user


## messagesテーブル

|Column|Type|Options|
|------|----|-------|
|body|text||
|image|string||
|group_id|integer|null: false, foreign_key: true|
|user_id|integer|null: false, foreign_key: true|


## udsersテーブル

|Column|Type|Options|
|------|----|-------|
|email|string|null: false, add_index unique: true|
|name|string|null: false|
|group_id|integer|null: false, foreign_key: true|
|encrypted_password|string|null: false|

### Association
- has_many :members


## groupsテーブル

|Column|Type|Options|
|------|----|-------|
|g_name|string|null: false|
|user_id|integer|null: false, foreign_key: true|

### Association
- has_many :members







