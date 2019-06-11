### How To Play

There are 2 UI, `kyfw.12306.cn` is calling the local SpringBoot backend API, `kyfw.12306.cn.ori` is the original copy which calls the remote official backend API. After launch UI and backend API (if needed), the application can be viewed at `http://localhost:8080/otn/queryDishonest/init.html`

#### play with local SpringBoot backend API

- launch local SpringBoot backend API

```commandline
cd backend-api/springBoot/bffService
./gradlew bootRun
```

```commandline
cd backend-api/springBoot/executedService
./gradlew bootRun 
```

```commandline
cd backend-api/springBoot/executingService
./gradlew bootRun 
```

- launch UI

```commandline
http-server kyfw.12306.cn/
```

- to play with mock service, set the bffService active profile

```commandline
cd backend-api/springBoot/bffService
export SPRING_PROFILES_ACTIVE=mock
./gradlew bootRun 
```

#### play with remote official backend API

- launch UI

```commandline
http-server kyfw.12306.cn.ori/
```

- this is connecting to official backend API, so no local API is required.
- to play with mock service, in `kyfw.12306.cn.ori/otn/resources/` search and replace the url `https://kyfw.12306.cn` with `http://localhost:3000`, then relaunch the UI again.

*Anytime you want to play with mock service, you need to prepare your mock service with yourself*