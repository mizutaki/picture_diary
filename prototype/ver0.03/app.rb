require 'sinatra'
require 'sinatra/reloader'
require 'base64'

class App < Sinatra::Base

  configure :development do
  	register Sinatra::Reloader
  end

  get '/' do
    erb :index
  end

  get '/list' do
    erb :list
  end

  post '/save' do
    img = params['image']
    File.open("./public/test1.png", "wb") do |w|
      w.write File.read(img[:tempfile])
    end
  end
end