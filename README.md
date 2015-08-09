С помощью HTML+CSS и Javascript максимально просто сделать страничку интернет-магазина со списком товаров. Например,
как тут, но проще:

http://www.ulmart.ru/catalog/optics?sort=0&viewType=1&rec=true

Страничка будет состоять из header (верхней части), section (списка из 5 товаров), footer (нижняя часть). 

В header сделать слева название магазина (любое) крупными буквами. Можно включить в эту секцию также картинку с
логотипом или какие-то другие элементы на выбор.

Список товаров будет состоять из горизонтальных блоков, один на единицу товара. В каждом блоке есть картинка товара
(любая), название и краткое описание.

В footer будет справа внизу мелкими буквами “Тестовое задание для GD”.

При клике на картинку товара будет всплывать модальный диалог с большой картинкой товара и расширенным описанием товара.
Окно должно закрываться по Escape или двойному клику по нему.

Данные для товаров (название, кратное описание, расширенное описание, ссылка на маленькую картинку, ссылка на большую
картинку) хранятся в формате JSON и получаются с сервера через AJAX запрос.