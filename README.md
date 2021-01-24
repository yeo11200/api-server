# api-server
Express API 서버 개발


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
// 등록
create({}, {options})

/**
 * select 
 * findAll : 데이터를 전제적으로 출력을 하는 방법
 * count : 데이터의 총 합만 출력하는 방법
 * attributes : 원하는 colum만 리턴을 해준다.
 */
findAll({attributes, where, offset, limit})
count({attributes, where});
// 수정
update({}, {where})

// 삭제
destroy({where});

// sequelize 에서 트랜지션을 사용하기 위한 함수
// 트랜지션을 사용하려면 트랜지션안에 사용을 해주고 옵션에 transaction : callback을 적어준다.
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