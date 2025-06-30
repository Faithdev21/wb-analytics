from django.core.management.base import BaseCommand

from api.constants import DEFAULT_SPP
from products.services.parser import parse_products


class Command(BaseCommand):
    help = 'Парсит товары Wildberries по ключевому слову'

    def add_arguments(self, parser):
        parser.add_argument('--keyword', type=str, default='смартфон')
        parser.add_argument('--dest', type=str, default='-1257786')
        parser.add_argument('--spp', type=int, default=DEFAULT_SPP)

    def handle(self, *args, **options):
        keyword = options['keyword']
        dest = options['dest']
        spp = options['spp']

        parse_products(keyword=keyword, dest=dest, spp=spp)
        self.stdout.write(self.style.SUCCESS('✅ Парсинг завершён'))
