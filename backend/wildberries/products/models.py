from django.db import models


class Product(models.Model):
    wb_id = models.BigIntegerField(unique=True)
    name = models.CharField(max_length=255)
    price = models.FloatField()
    discount_price = models.FloatField()
    rating = models.FloatField()
    review_count = models.PositiveIntegerField()

    def __str__(self):
        return self.name
