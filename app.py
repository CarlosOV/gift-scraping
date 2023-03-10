from flask import Flask
from config import settings
from gift_recommender.api.product_catalog_api import product_catalog_api
from gift_recommender.api.prompt_api import prompt_api

app = Flask(__name__)
app.register_blueprint(product_catalog_api)
app.register_blueprint(prompt_api)

@app.route("/")
def hello_world():
    return "<p>Hello, World!</p>"

if __name__ == '__main__':
    app.run(debug=True)