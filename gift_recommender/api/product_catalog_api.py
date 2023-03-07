from flask import Blueprint, jsonify, request, Response

from gift_recommender.application.product_catalog_use_cases import ProductCatalogUseCases
from gift_recommender.domain.category import Category
from gift_recommender.infrastructure.adapters.product_catalog_adapter import ProductCatalogAdapter


product_catalog_api = Blueprint('product_catalog_api', __name__)
adapter = ProductCatalogAdapter()
product_catalog_use_cases = ProductCatalogUseCases(adapter)


@product_catalog_api.route('/products', methods=['POST'])
def get_products():
    data = request.json
    if not request.data or data['category'] == None or len(data['category']) == 0:
        return Response("Products not found", 400)
    category = Category(description=data['category'])
    products = product_catalog_use_cases.get_products_by_category(category)
    return jsonify([product.to_dict() for product in products])
