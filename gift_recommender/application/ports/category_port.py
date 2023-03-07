from abc import ABC, abstractmethod

from gift_recommender.domain.category import Category

class CategoryPort(ABC):

    @abstractmethod
    def get_categories_by_statement(self, statement:str) -> list[Category]:
        pass