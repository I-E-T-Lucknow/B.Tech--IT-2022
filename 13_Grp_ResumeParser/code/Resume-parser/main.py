import os
from bson import ObjectId
import json
from flask import Flask, flash, request, redirect, render_template
from werkzeug.utils import secure_filename

app=Flask(__name__)

app.secret_key = "secret key"
app.config['MAX_CONTENT_LENGTH'] = 16 * 1024 * 1024
SKILLS_DB = []
# Get current path
path = os.getcwd()
# file Upload
UPLOAD_FOLDER = os.path.join(path, 'uploads')

# Make directory if uploads is not exists
if not os.path.isdir(UPLOAD_FOLDER):
    os.mkdir(UPLOAD_FOLDER)

app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER

# Allowed extension you can set your own
ALLOWED_EXTENSIONS = set(['pdf'])


def allowed_file(filename):
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS


import pymongo
import urllib 
import os
from dotenv import load_dotenv
load_dotenv()

DB_PASSWORD=os.getenv('PASSWORD',None)
MONGODB_ATLAS_USER_ID=os.getenv('MONGODB_USER_ID',None)
url=f'mongodb+srv://{MONGODB_ATLAS_USER_ID}:'+urllib.parse.quote_plus(DB_PASSWORD)+'@cluster0.5xsbr.mongodb.net/resumeParserDB?retryWrites=true&w=majority'
myclient = pymongo.MongoClient(url)
mydb = myclient["resumeParserDB"]
mycol = mydb["Resumes"]
myskills = mydb["skills"]

def fun(e):
    return e.get('resume_score',0)

@app.route('/lowhigh',methods=['POST'])
def low_high_filter():
    # print("hi")
    low = request.form.get('lower_limit')
    high = request.form.get('upper_limit')
    low = int(low) if low else 0
    high = int(high) if high else 100
    notvalid = True if low > high else False
    cursor = mycol.find({}).sort('resume_score',-1)
    x = []
    # print(low,high)
    for i in cursor:
        if low <= i.get('resume_score') <= high:
            x.append(i)
            # print(i.resume_score,low,high)
    return render_template('list.html',comments=x,notvalid = notvalid)

@app.route('/filter',methods=['POST'])
def filter():
    top = request.form.get('top')
    top = int(top) if top else 1000
    cursor = mycol.find({}).sort('resume_score',-1)
    x = cursor[:top]
    return render_template('list.html',comments=x)


@app.route('/scores')
def get_sorted_score():
    cursor = mycol.find({})
    # print(type(cursor))
    x=[]
    for doc in cursor:
        # print(doc['_id'])
        x.append(doc)
    x.sort(reverse=True, key=fun)
    return render_template('list.html',comments=x)

    # return render_template('upload.html')

@app.route('/skills')
def cred_skills_page():
    cursor = myskills.find({})
    x=[]
    for doc in cursor:
        # print(doc['_id'])
        x.append(doc)
    
    x.sort(reverse=True, key=fun)
    return render_template('skills.html',skills=x)


@app.route('/skills/add',methods=['POST'])
def add_skill():
    try:
        skill_name = request.form.get("skill")
        if skill_name:
            if myskills.count_documents({'name':skill_name},limit=1)==0:
                cursor = myskills.insert_one({"name": skill_name})
    except Exception as e:
        print(e)
    return redirect('/skills')


@app.route('/skills/delete/<id>')
def delete_record_skill(id):
    # print(type(id))
    try:
        data = myskills.delete_one({'_id': ObjectId(id)})
        print("deleted record successfully",data)
    except Exception as e:
        print(e)
    return redirect('/skills')


@app.route('/delete/<id>')
def delete_record(id):
    # print(type(id))
    try:
        data = mycol.delete_one({'_id': ObjectId(id)})
        print("deleted record successfully",data)
    except Exception as e:
        print(e)
    return redirect('/scores')


@app.route('/')
def upload_form():
    return render_template('upload.html')


@app.route('/', methods=['POST'])
def upload_file():
    if request.method == 'POST':
        if 'files[]' not in request.files:
            flash('No file part')
            return redirect(request.url)

        files = request.files.getlist('files[]')
        # filenames=[]
        SKILLS_DB = []
        cursor = myskills.find({})
        for doc in cursor:
            # print(doc)
            SKILLS_DB.append(doc['name'].lower())
        # print(SKILLS_DB)
        # print("files", files)
        resume_score=0
        if len(SKILLS_DB)==0:
            flash('Attention! please add skill in skills DB first becuase skills DB is Empty')
            return redirect('/')

        for file in files:
            if file and allowed_file(file.filename):
                filename = secure_filename(file.filename)
                file.save(os.path.join(app.config['UPLOAD_FOLDER'], filename))
                text=extract_text_from_pdf(f'uploads/{filename}')
                email=extract_emails(text)
                phone_number = extract_phone_number(text)
                # name = extract_names(text)
                resume_score=(len(extract_skills(text,SKILLS_DB))/len(SKILLS_DB))*100.0
                # print(email,phone_number)
                email_id = email[0] if len(email)>0 else None
                phone_number_def = phone_number if phone_number else None
                fields={"email": email_id,"phone_number": phone_number_def,"resume_score":round(resume_score,2)}
                # print(mycol.find({"email":email}))
                if mycol.count_documents({'email':email_id},limit=1) !=0:
                    print(f"{email_id} already exist")
                elif email_id is None or phone_number_def is None:
                    print(f"provided resume of email: {email_id} and Phone No.: {phone_number_def} is not a valid combination")
                else:
                    x=mycol.insert_one(fields)
                    print(x.inserted_id)
        flash('File(s) successfully uploaded')
        return redirect('/')


# extract .pdf
from pdfminer.high_level import extract_text

def extract_text_from_pdf(pdf_path):
    return extract_text(pdf_path)
 
#extract .docx 
import docx2txt

def extract_text_from_docx(docx_path):
    txt = docx2txt.process(docx_path)
    if txt:
        return txt.replace('\t', ' ')
    return None


import nltk
import ssl
try:
    _create_unverified_https_context = ssl._create_unverified_context
except AttributeError:
    pass
else:
    ssl._create_default_https_context = _create_unverified_https_context

nltk.download()
 
nltk.download('punkt') # use for tokeninzation
nltk.download('averaged_perceptron_tagger') # tells parts of speech
nltk.download('maxent_ne_chunker') # create the grouping  of noun , verb etc
nltk.download('words')  
 
 
def extract_text_from_docx(docx_path):
    txt = docx2txt.process(docx_path)
    if txt:
        return txt.replace('\t', ' ')
    return None
 
 
def extract_names(txt):
    person_names = []
 
    for sent in nltk.sent_tokenize(txt):
        for chunk in nltk.ne_chunk(nltk.pos_tag(nltk.word_tokenize(sent))):
            if hasattr(chunk, 'label') and chunk.label() == 'PERSON':
                person_names.append(
                    ' '.join(chunk_leave[0] for chunk_leave in chunk.leaves())
                )
 
    return person_names

import re
PHONE_REG = re.compile(r'[\+\(]?[1-9][0-9 .\-\(\)]{8,}[0-9]')
def extract_phone_number(resume_text):
    phone = re.findall(PHONE_REG, resume_text)
    if phone:
        number = ''.join(phone[0])
        if len(number) > 10:
            return number
        else:
            return number
    return None   

 
EMAIL_REG = re.compile(r'[a-z0-9\.\-+_]+@[a-z0-9\.\-+_]+\.[a-z]+')

def extract_emails(resume_text):
    return re.findall(EMAIL_REG, resume_text)


 
nltk.download('stopwords')
 
# you may read the database from a csv file or some other database




def extract_skills(input_text,SKILLS_DB):
    print(input_text)
    stop_words = set(nltk.corpus.stopwords.words('english'))
    word_tokens = nltk.tokenize.word_tokenize(input_text)
 
    # remove the stopwords 
    filtered_tokens = [w for w in word_tokens if w not in stop_words]
 
    # remove the punctuation
    filtered_tokens = [w for w in filtered_tokens if w.isalpha()]
 
    # generate bigrams and trigrams (such as artificial intelligence)
    bigrams_trigrams = list(map(' '.join, nltk.everygrams(filtered_tokens, 2, 3)))
 
    # we create a set to keep the results in.
    found_skills = set()
 
    # we search for each token in our skills database
    for token in filtered_tokens:
        # print(token)
        if token.lower() in SKILLS_DB:
            found_skills.add(token.lower())
 
    # we search for each bigram and trigram in our skills database
    for ngram in bigrams_trigrams:
        if ngram.lower() in SKILLS_DB:
            found_skills.add(ngram.lower())
    print(found_skills)
    return found_skills

if __name__ == "__main__":
    app.run(host='127.0.0.1',port=5000,debug=True,threaded=True)