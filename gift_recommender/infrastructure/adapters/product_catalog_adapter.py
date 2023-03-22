import requests
from config import settings

from gift_recommender.domain.product import Product
from gift_recommender.application.ports.product_catalog_port import ProductCatalogPort

class ProductCatalogAdapter(ProductCatalogPort):
    def search_products(self, description: str) -> list[Product]:
        scraping_product_catalog_url = f'{settings.scraping_web_url}{settings.product_catalog_path}'
        response = requests.post(scraping_product_catalog_url, json={
            'page': 1,
            'product': description,
            'results': 10
        })
        
        response_json = response.json()
        response_products = response_json['SearchResult']['Items']
        products = []
        for product in response_products:
            products.append(Product(
                name=product['ItemInfo']['Title']['DisplayValue'],
                asin=product['ASIN'],
                detail_page=f"{settings.amazon_base_path}/{product['ASIN']}?tag={settings.amazon_tag}",
                image_url=product['Images']['Primary']['Large']['URL'],
                display_amount=product['Offers']['Listings'][0]['Price']['DisplayAmount']
            ))

        return products
