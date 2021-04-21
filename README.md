## front-end: React

### 실행순서
- ```npm install```
  

- ```npm start```
    - ```npm start```에러 발생 시 terminal창에 ```export SKIP_PREFLIGHT_CHECK=true ```환경변수 설정


- http://localhost:3000

## back-end: nodejs(express)

구성
- EC2(ubuntu 18.04)
  - 주소: 3.35.233.255:8000
  - docker-compose로 실행 중  


- RDS(Mysql)

### 실행순서(로컬환경 테스트 방법)
- ```npm install```


- 환경변수 주입 필요(DB,JWT)
  - .env 파일에 환경변수 관리(git에는 업로드 X)
  - back > .env.example 참고


- ```npm run dev```

