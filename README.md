# OFPE - 우리들의 필름사진전

<br/>

## 들어가기 전에...
오프는 2020년 스파르타 코딩클럽 웹 개발반을 수강하면서 기획했던 사이트였다. 그 당시엔 html, css만 겨우 할 줄 아는 수준이었기 때문에<br/>
기획과 퍼블리싱 까지만 따라갈 수 있었고, 나머지 부분은 구현하기 쉽지가 않았었다.<br/>
개발 환경은 지금과 다르게 html, css, js, python, mongoDB를 사용했었으며 게시글 업로드 기능만 겨우 구현해놓은 채로 종강하게 되어 완성하지 못한 아쉬움이 남아있었다.<br/>
그래서 이번에 리액트를 공부하면서 나의 첫 프로젝트 '오프'를 되살려 보기로 했다!

## 사이트 기획
__React로 제작한 첫 번째 프로젝트__ <br/>
나와 내 지인들만 사용할 수 있는 필름사진 사이트를 만들고 싶었다. 인스타와는 정반대 성향의 완전히 폐쇄적인 사이트를 제작하고 싶었으나, 그렇게 제작하면 포트폴리오를 보러 오신 분들도 사이트를 볼 수 없게 되기 때문에 일단은 게스트 로그인 버튼과 회원가입 버튼을 노출시켰다.

<br/>

__페이지 구성__ <br/>
로그인, 회원가입, 메인페이지, 글작성페이지
메인페이지에는 핀터레스트처럼 업로드 된 사진이 나열되어있다. <br/>
이미지를 클릭하면 모달 형식으로 상세 정보를 볼 수 있고, 즐겨찾기(좋아요)와 댓글을 작성할 수 있다.
<br/>
 <br/>
__회원가입__<br/>
아이디, 닉네임 중복조회 <br/>
비밀번호 해시 <br/>
DB에 저장 <br/>

api 통신으로 DB에 아이디가 존재하는지 확인하고, crypto를 사용해 DB에 저장된 slat와 pw를 해시한 값이 일치하는지 확인
 <br/>
 
__로그인__<br/>
아이디, 비밀번호 확인 <br/>
토큰 생성 <br/>
쿠키에 저장 <br/>
 <br/>
 
__메인페이지__<br/>
핀터레스트 레이아웃(Masonry)으로 이미지 나열 <br/>
이미지 클릭 시 모달 형식으로 상세정보 보여주기 <br/>
즐겨찾기 <br/>
글 수정, 삭제 <br/>
댓글 쓰기, 삭제 <br/>
<br/>
 
 __글작성페이지__<br/>
모든 input에 데이터가 있어야 api 보내기 <br/>
이미지 업로드 시 이미지 미리보기 <br/>
jpg, png만 업로드 가능 <br/>
이미지 사이즈 최적화 <br/>

 <br/>


-----

<br/>

## 개발 환경

### frontend
![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Styled-componemts](https://img.shields.io/badge/styled--components-DB7093?style=for-the-badge&logo=styled-components&logoColor=white)
![Typescript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![Redux toolkit](https://img.shields.io/badge/Redux-593D88?style=for-the-badge&logo=redux&logoColor=white)

### backend
![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white)
![MySQL](https://img.shields.io/badge/MySQL-005C84?style=for-the-badge&logo=mysql&logoColor=white)

### deploy
![aws](https://img.shields.io/badge/Amazon_AWS-FF9900?style=for-the-badge&logo=amazonaws&logoColor=white)

-----
<br/>

## 구현한 스크립트 기능

+ __Top, About__
  + Vanilla JS로 요소의 위치로 이동하는 네비게이션 버튼 구현
  + Vanilla JS로 특정 위치까지 요소 position: fixde 후 absolute로 전환 
  + Vue 템플릿 구문을 이용한 모달창 구현
  + TweenMax, GSAP의 ScrollTrigger를 이용하여 스크롤할때만 애니메이션이 실행되도록 구현
  
<br/>

+ __Main project__
  + 동영상 재생, 멈춤 구현
  
<br/>

+ __Side project__
  + Vanilla JS로 tab메뉴 클릭시 버튼에 .active추가/제거 
  + 탭메뉴 하위 컨텐츠는 버튼에 주어진 각각의 id를 switch 조건문으로 특정 id일때 type1, type2의 class .on을 추가/제거
  + (isotope로 요소 정렬기능 추가할 예정입니다.)
  
<br/>

+ __Blog posting__
  + 블로그 포스팅 웹 크롤링
    + express로 서버를 열어서 api통신
    + axios와 cheerio로 원하는 주소와 요소를 배열에 저장
    + 6개만 가져오도록 slice()메서드로 자르기

<br/>

+ __Contact__
  + Vanilla JS로 clientX, clientY 좌표값을 이용해 마우스 커서의 위치를 구함
  + mousemove 이벤트핸들러를 이용하여 요소의 style.transform에 값을 계속적으로 변경하여 마우스 위치에 반응하는 원 제작
  
  <br/>
  
+ __etc.__
  + 오른쪽 하단 스크롤 이벤트핸들러로 height % 변경. progress bar 구현
  + scrollY가 100이상일때만 top 버튼 작동하도록 

