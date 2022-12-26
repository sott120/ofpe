# OFPE - 우리들의 필름사진전 <br/>
촬영한 필름사진을 가까운 사람들과 함께 보기 위한 서비스
<br/>
![meta_img](https://user-images.githubusercontent.com/69718601/209573415-eb47d746-eb09-4e98-b479-6e4e4dd40ba4.jpg)
## 들어가기 전에...
오프는 2020년 스파르타 코딩클럽 웹 개발반을 수강하면서 기획했던 사이트입니다. 그 당시엔 html, css만 겨우 할 줄 아는 수준이었기 때문에 사이트를 혼자서 구현하기 어려웠습니다. 기존 개발 환경은 html, css, js, python, mongoDB를 사용했었으며 게시글 업로드 기능만 겨우 구현해놓은 채로 종강하게 되어 완성하지 못한 아쉬움이 남아있었기에, 이번에 리액트를 공부하면서 저의 첫 프로젝트 '오프'를 되살려 보게 되었습니다.

## 사이트 제작 의도
저와 제 지인들만 사용할 수 있는 필름사진 사이트를 만들고 싶었습니다. 유명한 SNS와는 정반대 성향의 완전히 폐쇄적인 사이트를 제작하고 싶었으나, 그렇게 제작하면 포트폴리오를 보러 오신 분들도 사이트를 볼 수 없게 되기 때문에 일단은 게스트 로그인 버튼과 회원가입 버튼을 노출시켰습니다.<br/>

## 페이지 구성과 개발 환경

__페이지 구성__ <br/>
로그인, 회원가입, 메인페이지, 글작성페이지

<br/><br/>

__배포환경__<br/>
ec2, nginx

<br/><br/>

__스토리지__<br/>
S3

<br/><br/>

__서버__<br/>
pm2



### frontend
![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Styled-componemts](https://img.shields.io/badge/styled--components-DB7093?style=for-the-badge&logo=styled-components&logoColor=white)
![Typescript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![Redux-toolkit](https://img.shields.io/badge/Redux-593D88?style=for-the-badge&logo=redux&logoColor=white)

### backend
![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white)
![MySQL](https://img.shields.io/badge/MySQL-005C84?style=for-the-badge&logo=mysql&logoColor=white)

### deploy
![aws](https://img.shields.io/badge/Amazon_AWS-FF9900?style=for-the-badge&logo=amazonaws&logoColor=white)

<br/>
-----
<br/>

## 구현한 기능

### 디자인, 퍼블리싱
+ 큰 틀은 React-Bootstrap과 GlobalStyles를 이용해 제작
+ styled-components를 사용하여 세부적인 디테일을 디자인
+ pc(1920px)부터 모바일(375px)까지 반응형으로 제작
  
  
### 회원가입
![회원가입](https://user-images.githubusercontent.com/69718601/209572693-5817c811-3d38-4541-88a1-6b3d1e6a6983.jpg)<br/>
+ 회원가입 유효성검사
+ 아이디, 닉네임 중복조회
+ crypto 사용하여 비밀번호 slat 생성
+ crypto 사용하여 비밀번호와 salt 해시
+ 아이디, 닉네임, salt, 해시 비밀번호 user Table DB에 저장
  
  
### 로그인
![로그인](https://user-images.githubusercontent.com/69718601/209572697-3b7735ac-567c-499d-92dd-efc3c5e3d24f.jpg)<br/>
+ 로그인 버튼 클릭 시 아이디, 비밀번호 user table에서 확인
+ jwt 토큰 생성 후 쿠키에 저장
+ 리덕스 스토어에 유저 닉네임, 아이디 저장
+ 게스트로그인 클릭 시 미리 저장해둔 guest라는 회원정보로 로그인
+ 리덕스 스토어에 저장된 값이 있으면 로그인 페이지 접근 막기
  

### 메인페이지
![메인페이지](https://user-images.githubusercontent.com/69718601/209572704-739adfa6-d0e1-4874-a703-e27da7faebb5.jpg)<br/>
+ '필름사진을 전시한다'는 목적성에 맞게 화면에 이미지만 나열
+ 이미지 각각의 높이에 맞게 Masonry 레이아웃 사용
+ useEffect로 페이지 들어오면 게시글 불러오기
+ 미들웨어를 이용해 /board 경로로 들어오는 요청은 토큰 유무를 조회하여 로그인 되어있는지 확인
+ 리덕스 스토어에 저장된 user name을 헤더에 출력 
+ Intersection Observer로 데이터 24개씩 무한스크롤
+ 이미지 클릭 시 모달 형식으로 상세정보 보여주기
+ 토큰이 없거나 만료된 경우 로그인 페이지로 되돌려보내기(폐쇄성)


### 메인페이지 모달창
![메인모달](https://user-images.githubusercontent.com/69718601/209572710-75605e84-fa9e-4f02-8a23-148213205ef9.jpg)<br/>
+ 즐겨찾기 클릭 시 like 테이블에 게시글번호, 유저 아이디 저장(필터기능에 사용 예정)
+ 좋아요 한 게시글은 제목 옆 노란색 별 아이콘 활성화
+ 글 작성 시 선택했던 필름과 일치하는 필름이미지 노출 
+ 글 수정, 삭제 버튼은 redux store에 저장한 username과 해당 게시글을 작성한 username이 일치할 때만 active
+ 글 수정 시 write page에 useNavigate로 게시글 정보 전달
+ 글 삭제 시 해당 게시글과 연관된 댓글,  좋아요 함께 삭제(posting, comment, like table)
+ 댓글 쓰기, 삭제 기능
  
  
### 글쓰기
![글쓰기](https://user-images.githubusercontent.com/69718601/209572711-9115a6b1-fe41-450e-a15a-ef688073124c.jpg)
+ jpg, png만 업로드 가능하도록 검사
+ 이미지 최대 용량 1mb로 최적화 
+ 최적화된 이미지 data로 이미지 미리보기
+ 이미지 S3 스토리지에 저장
+ 모든 input에 데이터가 있어야 posting Table에 저장

