from typing import List

from gift_recommender.domain.category import Category
from gift_recommender.application.ports.category_port import CategoryPort


class CategoryUseCases:
    def __init__(self, category_port: CategoryPort) -> None:
        self.category_port = category_port

    def get_categories(self, statement: str) -> List[Category]:
        self.category_port.get_categories_by_statement(statement)