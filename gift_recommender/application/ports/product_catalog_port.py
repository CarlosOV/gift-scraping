from abc import ABC, abstractmethod

from gift_recommender.domain.product import Product

class ProductCatalogPort(ABC):

    @abstractmethod
    def search_products(self, description:str) -> list[Product]:
        pass