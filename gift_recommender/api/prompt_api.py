from flask import Blueprint, jsonify, request, Response

from gift_recommender.infrastructure.adapters.category_adapter import CategoryAdapter
from gift_recommender.application.category_use_cases import CategoryUseCases

prompt_api = Blueprint('prompt_api', __name__)
adapter = CategoryAdapter()
category_use_cases = CategoryUseCases(adapter)

@prompt_api.route('/prompt', methods=['POST'])
def command_prompt():
    data = request.json
    if not request.data or data['statement'] == None or len(data['statement']) == 0:
        return Response("Statement not found", 400)
    categories = category_use_cases.get_categories_by_statement(statement=data['statement'])
    return jsonify([category.to_dict() for category in categories])