from flask import Flask
from flask_restful import Resource, Api, reqparse
import requests
import os, cloudsight

app = Flask(__name__)
app.testing = False # Only change this to True if you are developing. Always deploy into production with False.
api = Api(app)

# Cloudsight set-up
csAuth = cloudsight.OAuth(os.getenv("CSAPIKEY"), os.getenv("CSAPIKEYSECRET"))
csAPI = cloudsight.API(csAuth)

parser = reqparse.RequestParser()
parser.add_argument('src', type=str, help='Image to be converted to caption')

# Caption
# Example for success: curl https://altML-Server.thatrobotdev.repl.co/api/v1/caption -d "src=https://via.placeholder.com/150" Post -v
# Example for failure: curl https://altML-Server.thatrobotdev.repl.co/api/v1/caption -d "src=notaurl" Post -v
# takes src, and asks cloudsight api for a caption, then returns a caption
class Caption(Resource):
    def post(self):
        args = parser.parse_args()
        imageSource = args['src']
        try:
          if(requests.get(imageSource, timeout=1).raise_for_status): # If the URL, when opened by the server, is given a 200 (OK) code
            return {'caption': args['src'] + ' is a valid URL that you just sent to me'}, 201
        except:
          return "Bad Request: This URL is either one that is invalid (not a URL at all), or the server cannot access it. The server tested this URL, and it recieved something other than a 200 (OK) code, so we aborted. If you think that this is a valid URL, the server might not have permission to access it. altML only works with publically avaliable images on the web for now, without authentication. Sorry!", 400

# Set-up API Resource routing
api.add_resource(Caption, '/api/v1/caption')

if __name__ == '__main__':

    if app.testing == True: # Development build
      app.run(host='0.0.0.0',port=7000,debug=False)
    else: # Production build
      from waitress import serve
      serve(app, host='0.0.0.0',port=7000)