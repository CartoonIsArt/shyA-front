# 타임라인  
본 깃은 동아리 웹사이트의 Timeline 프론트엔드입니다.  
React를 사용합니다.  
전체 소스코드를 빌드하면 bundle.js를 얻을 수 있습니다.  
bundle.js파일은 cms의 index.html이 불러오는 static파일입니다.  

## 설치  
Timeline 프로젝트를 설치하는 방법에 대해 설명합니다.  

### 개발환경 설정
nodejs와 그 패키지 매니저인 npm을 설치합니다

    $ apt install npm 
    $ npm i npm@latest -g
    $ npm i -g n
    $ n lts

### 소스코드 다운로드  
본 깃을 클론하고 의존성 프로젝트를 설치합니다.  

    $ git clone http://128.134.57.197:10080/shyA/timeline.git
    $ cd timeline
    $ npm install

### 빌드  
소스코드를 빌드합니다.  

    $ npm [options]

|options     |  기능      |
|------------|------------|
|start       |빠른 빌드   |
|run optimize|최적화 빌드 |

결과 파일인 bundle.js를 확인합니다.  
