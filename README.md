# api-server
Express API 서버 개발


### process.env

- process.env : 환경 설정을 세팅해주는 함수
  - set NODE_ENV=process : window
  - export NODE_ENV=process : linux
  - cross-env vs dotenv
     - dotenv : default .env 파일을 세팅 하면서 사용이 가능하다.
     - dotenv.config() : 함수를 통해서 .env 파일을 변경할 수 있다.
     - .env파일은 git에 올리는게 아니고, filezila를 통해서 업로드를 시킨다.
