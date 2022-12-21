# OFPE - 우리들의 필름사진전

<br/>

## 들어가기 전에...
오프는 2020년 스파르타 코딩클럽 웹 개발반을 수강하면서 기획했던 사이트였다. 그 당시엔 html, css만 겨우 할 줄 아는 수준이었기 때문에<br/>
기획과 퍼블리싱 까지만 따라갈 수 있었고, 나머지 부분은 구현하기 쉽지가 않았었다.<br/>
개발 환경은 지금과 다르게 html, css, js, python, mongoDB를 사용했었으며 게시글 업로드 기능만 겨우 구현해놓은 채로 종강하게 되어 완성하지 못한 아쉬움이 남아있었다.<br/>
그래서 이번에 리액트를 공부하면서 나의 첫 프로젝트 '오프'를 되살려 보기로 했다!

## 사이트 기획
> __React로 제작한 첫 번째 프로젝트__ <br/>
나와 내 지인들만 사용할 수 있는 필름사진 사이트를 만들고 싶었다. 인스타와는 정반대 성향의 완전히 폐쇄적인 사이트를 제작하고 싶었으나, 그렇게 제작하면 포트폴리오를 보러 오신 분들도 사이트를 볼 수 없게 되기 때문에 일단은 게스트 로그인 버튼과 회원가입 버튼을 노출시켰다.

<br/>
+ __로그인 __

-----

<br/>

## 개발 환경

### front
![HTML5](https://img.shields.io/badge/html5-%23E34F26.svg?style=for-the-badge&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/css3-%231572B6.svg?style=for-the-badge&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E)
![Vue.js](https://img.shields.io/badge/vuejs-%2335495e.svg?style=for-the-badge&logo=vuedotjs&logoColor=%234FC08D)

### back
![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white)
![Express.js](https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB)

### deploy
![Firebase](https://img.shields.io/badge/Firebase-FFCA28?style=for-the-badge&logo=Firebase&logoColor=white)

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

