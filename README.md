# Перенос фукнционала на react

Сначала решил попробовать сделать как рассказывал лектор по SSR, почитав про nextjs, до этого с ним не работал, да и с реактом тоже.
Решил делать через него, в процессе настройки, совместно с redux-ом, препроцессором sass, сталкивался с рядом проблем которые очень стопорили.

В итоге реализовано на текущий момент:

Страница со списком файлов, на ней работа хлебных крошек, выбор репозитория, переход между папками.

### Запуск сервера

* Установить зависимости
* т.к. за основу был взята предыдущая наработка по серверу, то настрока как и там: 
необходимо в корне создать файл .env, содержимое взять из файла .env.example, и изменить параметры под собственные требования.
* запустить `node server.js --path=PATH` с указанием PATH на паку с репозиториями

### P.S.

Если что-то не работает, не судите строго :) , старался сделать по-максимуму, но в связи с небольшим опытом в 
этом направлении и большой занятостью в буднии дни на работе не успел все что планировал

Могу сразу направить на места которые считаю что реализовал неплохо, т.к. в процессе решения задачи получил опыт и понял как лучше делать:
к примеру компонент `src/components/Files/Files.jsx` который используя другой компонент реализует свою логику. Сделал бы все так, но время увы :(


