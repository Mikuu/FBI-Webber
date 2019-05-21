wget \
     --recursive \
     --no-clobber \
     --page-requisites \
     --html-extension \
     --convert-links \
     --restrict-file-names=windows \
     --domains kyfw.12306.cn \
     --no-parent \
     -l 1 \
     https://kyfw.12306.cn/otn/queryDishonest/init