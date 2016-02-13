require 'sinatra'
require 'sinatra/reloader'
require 'base64'
require 'sequel'
require 'sqlite3'
require 'json'

class App < Sinatra::Base

  configure :development do
  	register Sinatra::Reloader
  end

  db = Sequel.sqlite('test.db')
  master = db[:sqlite_master]
  if master.where("type='table' and name='picture'").count == 0
    db.create_table :picture do
      primary_key :picture_id
      String :name
      blob :image_file
    end
  end
  picture = db[:picture]

  get '/' do
    erb :index
  end

  get '/list' do
    erb :list
  end

  post '/save' do
    file = params['image']
    #File.open("./public/test1.png", "wb") do |w|
    #  w.write File.read(img[:tempfile])
    #end
    blob = Sequel.blob(File.read(file[:tempfile]))
    picture.insert(:name => 'test', :image_file => blob)
    redirect '/'
  end
end