#Imports
from flask import Flask, render_template, request
from wtforms import Form, StringField, TextAreaField, validators, StringField, SubmitField
import pandas as pd

app = Flask(__name__) #App initialization

#Review Form Class
class ReviewForm(Form):
    fname = StringField("First Name*", validators=[validators.DataRequired()])
    pname = StringField("Product Name*", validators=[validators.DataRequired()])
    review= TextAreaField("Your Review*", validators=[validators.DataRequired()])
    submit= SubmitField("Post")

#Review Page
@app.route("/", methods=["GET", "POST"])
def Review():
    form = ReviewForm(request.form)

    #Read the CSV file
    df = pd.read_csv("reviews.csv", index_col=False)

    #Check if user submitted the form
    if request.method == "POST":
        result = request.form
        #Save the review into the CSV file
        df = df.append({"fname":result["fname"], "pname":result["pname"], "review":result["review"]}, ignore_index=True)
        df.to_csv("reviews.csv", index=False)

    # The loop must be placed here to update the rev variable after form submission
    rev = [] #This will be passed as a Jinja variable to the template
    for index, row in df.iterrows():
        rev.append([row["fname"], row["pname"], row["review"]])
    rev = rev[::-1] #To list reviews based on the lastest posted one

    return render_template("index.html", form=form, rev=rev)
    
#Start Checkpoint
if __name__ == "__main__":
    app.debug = True
    app.run(host="0.0.0.0", port=5000)
