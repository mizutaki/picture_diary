require 'sinatra'
require 'sinatra/reloader'
require 'base64'
require 'sequel'
require 'sqlite3'
require 'rmagick'

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
    pictures = picture.all
    @hash = {}
    pictures.each do |picture|
      create_filepath = "./public/tmp_images/" + picture[:picture_id].to_s + ".png"
      File.open(create_filepath, "wb") do |w|
        w.write picture[:image_file]
      end
      img = Magick::ImageList.new(create_filepath)
        new_img = img.scale(0.25)
        new_img.write(create_filepath + "_small.png")
      @hash[picture[:picture_id]] = "/tmp_images/" + picture[:picture_id].to_s + ".png" + "_small.png"
    end
    erb :list
  end

  get '/download/:id' do
    p params[:id]
    pic = picture.where(picture_id: params[:id]).first
    file_name = pic[:picture_id]
    response.headers["Content-Disposition"] = "attachment"
    send_file "public/tmp_images/#{file_name}.png"
  end

  post '/save' do
    file = params['image']
    blob = Sequel.blob(File.read(file[:tempfile]))
    picture.insert(:name => 'test', :image_file => blob)
    redirect '/'
  end
end