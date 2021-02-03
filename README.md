# api-server
Express API 서버 개발


### 비동기
- 동기 vs 비동기
  - 동기 : event 가 응답이 올 때까지 다른 event를 발생하지않고 기다린다. 
  - 비동기 : event가 응답이 오든 안오던 상관없이 다른 event나 로직 사용이 가능하다.
    - 장점 : 먼저 오는 순서대로가 아니라 먼저 처리가 된 순서대로 처리를 해서, 사용자입장에서 빠르게 처리가 된다.
    - 단점 : 동기 처리 보다 조금 더 설계를 사용한다.

- block과 non-block
  - block : 이벤트가 발생을 하고 응답이 올때 까지 기다리면서 대기 중
  - non-block : 이벤트가 발생을 하고 응답이 올때까지 기다리지 않고 사용
### process.env

- process.env : 환경 설정을 세팅해주는 함수
  - set NODE_ENV=process : window
  - export NODE_ENV=process : linux
  - dotenv
     - dotenv : default .env 파일을 세팅 하면서 사용이 가능하다.
     - dotenv.config() : 함수를 통해서 .env 파일을 변경할 수 있다.
     - .env파일은 git에 올리는게 아니고, filezila를 통해서 업로드를 시킨다.


### ORM 
- object relational mapping
  - 객체를 관계로 연결시켜준다.
  - 장점
    - 객체로 사용을 하다보니 재사용과 유지보수가 쉽다.
    - 가독성 면에서 편하게 사용 할 수 있다.
    - 비지니스 로직에 집중할 수있다.
    - DBMS에 엮매이지 않고, DBMS에 종속되지 않는다.
  - 단점
    - 프로시저, 트리거가 다양할 경우 사용이 복잡해진다.
    - 복잡한 쿼리나 복잡도가 높을 수록 사용이 어려워진다.

```npm
npm install --save sequelize // sequelize 설정
npm install --save mysql2 // mysql2를 설치 해준다.
npm install -g sequelize-cli // sequelize 간단하게 실행 
```
```js
/**
 * create : 단일 행 insert,
 * bulkCreate : 다중 행 insert
 */
create({}, {options})
bulkCreate({}, {})

/**
 * select 
 * findAll : 데이터를 전제적으로 출력을 하는 방법
 * count : 데이터의 총 합만 출력하는 방법
 * attributes : 원하는 colum만 리턴을 해준다.
 */
findAll({attributes, where, offset, limit})
count({attributes, where});
// 수정
update({query}, {where})

// 삭제
destroy({where});

// sequelize 에서 트랜지션을 사용하기 위한 함수
// 트랜지션을 사용하려면 트랜지션안에 사용을 해주고 옵션에 transaction : callback을 적어준다.
// option에 transaction를 적어줘야한다.
sequelize.transaction(callback)

```


### mysql, mariaDB pagination
```sql
SELECT * FROM table LIMIT start, end
```
```js

// end page만큼은 1페이지에 추가되었기 떄문에 현재 페이지에서 -1를 해야한다.
start = currientPage == 1 ? 0 : currientPage-1 * end 
```


### moment
- 날짜를 가지고 오는 라이브럴
  - format 등 다양하게 활용이 가능하다
  - npm install moment-timezone을 사용할 경우 date 타입 세팅을 국가 별 나라별로 할 수 있다.
  - 공식 사이트 : https://momentjs.com/timezone/
```npm
npm install moment
npm install moment-timezone
```
```js
const moment = require('moment-timezone');
const serverTime = moment.tz('Asia/Seoul').format('YYYY-MM-DD HH:DD:ss');
```

### mysql 
- DBMS의 종류 중 하나
  - index란 데이터를 정렬해주고, 검색 속도를 향상 시켜준다. 
  - 복합 index란 여러가지의 키를 합쳐서 검색 속도를 향상 시켜주는 index
    - 복합 index를 작업할 때는 중복도가 낮은 순 -> 높은 순으로 index를 걸어줘야한다.
  - index는 물리저장소인 page에 저장이되고, index가 많은 만큼 속도가 느려질 수 있다.
  ```sql
    SELECT * FROM table USE INDEX(index name) WHERE 조건
  ```
- 날짜 세팅
```sql
SET GLOBAL time_zone='Asia/Seoul'

SET time_zone='Asia/Seoul'
```