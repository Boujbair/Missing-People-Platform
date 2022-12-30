from flask import Flask, request, url_for, redirect, render_template
from firebase_admin import credentials, initialize_app, storage
import io

# Init firebase with your credentials
cred = credentials.Certificate("./service-account-key.json")
initialize_app(cred, {'storageBucket': 'mpf-ai.appspot.com'})

# # Put your local file path 
# fileName = "myImage.jpg"
# bucket = storage.bucket()
# blob = bucket.blob(fileName)
# blob.upload_from_filename(fileName)

# # Opt : if you want to make public access from the URL
# blob.make_public()

# print("your file url", blob.public_url)


app = Flask(__name__, template_folder='.')

@app.route('/')
def hello_world():
    return render_template("/templates/index.html")

@app.route('/match', methods=['POST', 'GET'])
def match():
    print("hhhhhhhhhhhh")
    if request:
        if request.method == "POST":
            if request.files:
                print(request.form["first-name-find"])
                suspectImg = request.files["img-find"]
                print(suspectImg)
                # # fileName = "myImage.jpg"
                suspectImg = io.BufferedReader(suspectImg)
                bucket = storage.bucket()
                blob = bucket.blob('img.jpg')
                
                # blob.upload_from_filename(suspectImg)
                blob.upload_from_file(suspectImg)
                if suspectImg:
                    blob.upload_from_file(suspectImg)
                    blob.make_public()
                    print("ssss")
                    print("your file url", blob.public_url)
                else:
                    print('img not read !')
            else:
                print("no request files")
            
        
        else:
            print('request method is not POST')

        return render_template('/templates/index.html')

    else:
        print("request not found")

if __name__ == '__main__':
    app.run(debug=True)