from gift_recommender.domain.category import Category
from gift_recommender.domain.product import Product
from gift_recommender.application.ports.product_catalog_port import ProductCatalogPort


class ProductCatalogUseCases:
    def __init__(self, product_catalog_port: ProductCatalogPort) -> None:
        self.product_catalog_port = product_catalog_port

    def get_products_by_category(self, category: Category) -> list[Product]:
        products = self.product_catalog_port.search_products(category.description)
        return products