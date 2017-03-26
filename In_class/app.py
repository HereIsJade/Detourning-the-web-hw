from flask import Flask, request,render_template
import videoMash


app=Flask(__name__)

@app.route('/')
def home():
    name=request.args.get('name','no one')
    return render_template("home.html")
    # return render_template("home.html",name=name,age=age)
    # return "heyyy "+name #http://127.0.0.1:5000/?name=ada

@app.route('/yo')
def yo():
    return 'yo ooo'

@app.route('/create')
def create():
    phrase1=request.args.get('phrase1','')
    phrase2=request.args.get('phrase2','')

    outfile='static/'+phrase1+phrase2+'.mp4'
    outfile=outfile.replace(" ","_")
    videoMash.mash(phrase1,phrase2,outfile)
    return render_template('video.html',vid=outfile)

if __name__ =='__main__':
    app.run(debug=True)
