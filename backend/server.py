from flask import Flask
from flask import request
import json
from flask_pymongo import PyMongo
from bson.objectid import ObjectId
from bson.json_util import dumps
from datetime import datetime 
from datetime import timedelta
import jwt
import random 
app = Flask(__name__)
app.config["MONGO_URI"] = "mongodb://localhost:27017/say-cheese"
mongo = PyMongo(app)
@app.route("/user-data",methods=["POST"])
def StoreUserData():
    usersData={}
    usersData["username"]=request.json["username"]
    usersData["name"]=request.json["name"]
    usersData["email"]=request.json["email"]
    usersData["password"]=request.json["password"]
    usersData["dob"]=request.json["dob"]
    usersData["rating"]=[]
    usersData["meet_request"]=[]
    usersData["hire_request"]=[]
    usersData["about"]=request.json["about"]
    usersData["uploads"]=[]    
    data=mongo.db.users.find()
    flag=True
    for x in data:
        if x["username"]==usersData["username"]:
           flag=False
    if flag:
        mongo.db.users.insert(usersData)
        res={
            "error": "false",
            "message": "Registration Success"
            }
        return dumps({"response":res})
    else:
        res={
            "error": "true",
            "message": "Registration failed, user already exists"
            }
        return dumps({"response":res})
@app.route("/user-post/<string:token_id>",methods=["POST"])
def StoreUserPost(token_id):
    # mongo.db.posts.remove()
    decoded=jwt.decode(token_id,"secret",algorithm="HS256")
    usersPost={}
    usersPost["_id"]= ObjectId()
    usersPost["title"]=request.json["title"]
    usersPost["media_type"]=request.json["media-type"]
    usersPost["media_link"]=request.json["media-link"]
    usersPost["posted_by"]=decoded["username"]
    usersPost["content_type"]=request.json["content-type"]
    usersPost["hash_tag"]=request.json["hash-tag"]
    usersPost["who_to_see"]=request.json["who-to-see"]
    usersPost["happened_at"]=request.json["happened-at"]
    usersPost["happened_on"]=request.json["happened-on"]
    usersPost["post_description"]=request.json["post-description"]
    usersPost["posted_at"]=(datetime.now())
    usersPost["happy"]=[]
    usersPost["comments"]=[]
    usersPost["views"]=0
    show=mongo.db.users.update(decoded,{"$push":{"uploads":usersPost["_id"]}})
    mongo.db.posts.insert(usersPost)
    # show=mongo.db.users.find({"_id":user_id})
    status=mongo.db.posts.find()
    user=mongo.db.users.find()
    return dumps({"status":status,"user":user})
@app.route("/auth/login",methods=["POST"])
def logins():
    userEmail=request.json["email"]
    passw=request.json["password"]
    check=mongo.db.users.find_one({"email":userEmail})
    if check!=None:
        encoded=jwt.encode({"username":check["username"]},"secret",algorithm="HS256")   
        data={
            "error": "false",
            "token": encoded
            }
        return dumps({"data":data})
    else:
        display={
                "error": "true",
                "message": "Invalid login creadentials"
                }
        return dumps({"data":display})
@app.route("/users",methods=["POST"])
def user():
    token= request.json["token"]
    decoded=jwt.decode(token,"secret",algorithm="HS256")
    result=mongo.db.users.find(decoded)
    return dumps({"result":result})
@app.route("/user-trending")
def trending():
    limit=request.args.get("limit"," ")
    if(limit!=" "):
        result=mongo.db.posts.aggregate([{"$sort":{"happy":-1}},{"$limit":int(limit)}])
    else:
        result=mongo.db.posts.aggregate([{"$sort":{"happy":-1}}])
    return dumps({"status":result})
@app.route("/user-popular")
def popular():
    limit=request.args.get("limit"," ")
    if(limit!=" "):
        result=mongo.db.posts.aggregate([{"$sort":{"views":-1}},{"$limit":int(limit)}])
    else:
        result=mongo.db.posts.aggregate([{"$sort":{"views":-1}}])
    return dumps({"status":result})
@app.route("/user-recent")
def recent():
    limit=request.args.get("limit"," ")
    if(limit!=" "):
        result=mongo.db.posts.aggregate([{"$sort":{"posted_at":-1}},{"$limit":int(limit)}])
    else:
        result=mongo.db.posts.aggregate([{"$sort":{"posted_at":-1}}])
    return dumps({"status":result})
@app.route("/user-data")
def filteration():
    fil=request.args.get("filter")
    if fil=="celebration":
        result=mongo.db.posts.find({"content_type":fil})
    if fil=="surroundings":
        result=mongo.db.posts.find({"content_type":fil})
    if fil=="climates":
        result=mongo.db.posts.find({"content_type":fil})
    return dumps({"data":result})
@app.route("/save/<string:token_id>",methods=["POST"])
def save(token_id):
    decoded=jwt.decode(token_id,"secret",algorithm="HS256")
    # mongo.db.save.remove()
    result=request.json["id"]
    userSave={}
    userSave["userId"]=decoded["username"]
    userSave["postId"]=result
    status=mongo.db.save.insert(userSave)
    findUser=mongo.db.save.find({"userId":decoded["username"]})
    return dumps({"result":findUser})
@app.route("/user-save/<string:token_id>")
def saved(token_id):
    decoded=jwt.decode(token_id,"secret",algorithm="HS256")
    findUser=mongo.db.save.find({"userId":decoded["username"]})
    return dumps({"result":findUser})
@app.route("/user-like/<string:token_id>/<ObjectId:post_id>")
def liked(token_id,post_id):
    decoded=jwt.decode(token_id,"secret",algorithm="HS256")
    finds=mongo.db.posts.find({"_id":post_id})
    flag=False
    # return dumps({"res":finds[0]['happy']})
    if len(finds[0]["happy"])!=0:
        for x in range(len(finds[0]["happy"])):
            if x != decoded["username"]:
                flag=True
                status=mongo.db.posts.update({"_id":post_id},{"$push":{"happy":decoded["username"]}})
                return dumps({"res":status})
    if flag:
        errors={error:"true",status:"user have already made it"}
        return dumps({"res":errors})
    
@app.route("/user-comment/<string:token_id>/<ObjectId:post_id>",methods=["POST"])
def comment(token_id,post_id):
    decoded=jwt.decode(token_id,"secret",algorithm="HS256")
    comments={}
    comments["id"]=ObjectId()
    comments["comment"]=request.json["comment"]
    comments["user_id"]=decoded["username"]
    status=mongo.db.posts.update({"_id":post_Id},{"$push":{"comment":comments}})
    return dumps({"response":status})
@app.route("/user-comment-delete/<ObjectId:post_id>/<string:comment_id>")
def delete(post_id,comment_id):
    post=mongo.db.posts.find({"id":post_id})
    result=""
    new_arr=[]
    for x in post[0]["comment"]:
        if(x["id"]!=comment_id):
            new_arr.append(x)
    return dumps({"deleted":new_arr})
@app.route("/user-rating/<string:token_id>/<ObjectId:rated_user_id>")
def rating(token_id,rated_user_id):
    decoded=jwt.decode(token_id,"secret",algorithm="HS256")
    status=mongo.db.users.find({"username":rated_user_id},{"$push":{"rating":decoded["username"]}})
    return dumps({"response":status})
@app.route("/user-hire-requesting/<string:token_id>/<ObjectId:requesting_user_id>")
def requesting(token_id,rated_user_id):
    decoded=jwt.decode(token_id,"secret",algorithm="HS256")
    status=mongo.db.users.find({"username":rated_user_id},{"$push":{"hire-request":decoded["username"]}})
    return dumps({"response":status})
@app.route("/user-uploads/<string:token_id>")
def uploads(user_id):
    decoded=jwt.decode(token_id,"secret",algorithm="HS256")
    find=mongo.db.users.find(decoded)
    posts=[]
    for x in find[0]["uploads"]:
        post=mongo.db.posts.find({"_id":x})
        posts.append(post)
    return dumps({"uploads":posts})










    