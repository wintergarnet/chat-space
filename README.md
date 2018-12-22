## groupテーブル

|Column|Type|Options|
|------|----|-------|
|group_name|integer|null: false, unique: true|


### Association
- has_many :users_groups
- has_many :users, through: :users_group
- has_many :comments

## group_usersテーブル

|Column|Type|Options|
|------|----|-------|
|user|references|null: false, foreign_key: true|
|group|references|null: false, foreign_key: true|

### Association
- belongs_to :group
- belongs_to :user

## usersテーブル

|Column|Type|Options|
|------|----|-------|
|name|integer|null: false, unique: true|

###Association
- has_many :users_group
- has_many :groups, through: :user_groups
- has_many :comments

##commentsテーブル

|Column|Type|Options|
|------|----|-------|
|user|references|null: false, foreign_key: true|
|group|references|null: false, foreign_key: true|
|image|text|
|text|text|null: false|

###Association
- belongs_to :user
- belongs_to :group



