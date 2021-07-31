# 2021 SG 해커톤 세미콜론(3조)

## 목차
- [팀원](#팀원)
- [아이디어](#아이디어)
- [목적](#목적)
- [구현방법](#구현방법)
- [권한](#권한)
- [주소별 페이지](#주소별-페이지)
- [소프트웨어 구조](#소프트웨어-구조)
- [How to use](#how-to-use)
- [Installation](#installation)
- [Running the app](running-the-app)
- [Test](#test)
- [License](#license)


## 팀원
- 기획 : 손서영
- 디자인 : 송채은
- 개발 : 이원주, 권민기

## 아이디어
각 매장의 혼잡도를 표시한다. 혼잡도(%) = 현재인원 / 허용인원 * 100

### 목적
- 사람들이 혼잡한 매장을 피해가도록 유도함으로써, 여러 사람이 밀집된 환경이 만들어지지 않도록 하는 것을 목적으로 한다.
- 혼잡도가 100%를 넘어가는 경우, 지자체 관리자가 알 수 있게 함으로써, 코로나 관리가 잘 이루어질 수 있도록 한다.

### 구현방법
- 매장 내 인원을 알기 위해서, 사용자는 매장에 들어갈 때와 나갈 때 QR 코드를 찍는다.

### 권한
- 일반 사용자
- 매장 관리자
- 관리자

### 주소별 페이지
- / : 로그인, 지도로 밀집도 확인, 회원가입, 사업자 등록 버튼
<img src="https://user-images.githubusercontent.com/50279318/127738508-83532a69-2d09-40bb-94f1-deaaa94d7a5e.png" height="400"/>
<br/>

- /auth/signin : 로그인 화면. 이미 로그인한 경우에는 권한별 기본 페이지로 리다이렉트. 
<img src="https://user-images.githubusercontent.com/50279318/127738505-cfd3552d-5051-4671-bf0e-120b53c3948a.png" height="400"/>
<br/>

- /market : 지도를 통한 매장 혼잡도 조회 화면.
<img src="https://user-images.githubusercontent.com/50279318/127738510-2e8e4cbd-2221-4802-a5f9-eecf13546ab8.png" height="400"/>
<br/>

- /auth/signup : 일반 회원가입 화면.
<img src="https://user-images.githubusercontent.com/50279318/127738511-707d151d-7b08-42ac-8763-3bcc3b52d6d4.png" height="400"/>
<br/>

- /market/add : 사업자 및 매장 등록 화면.
<img src="https://user-images.githubusercontent.com/50279318/127738507-74c864ac-afab-4347-bd74-5d1e9651291a.png" height="400"/>
<br/>

- /admin : 관리자 권한으로 접근가능. 매장 목록 출력. 혼잡도가 100%를 넘는 경우 목록 위쪽에 빨간색으로 출력됨.
<img src="https://user-images.githubusercontent.com/50279318/127738499-cb66caf4-2059-43a6-b23d-bd9edf24edca.png" height="400"/>
<br/>

- /user : 로그인 후 접근가능. 매장 입/퇴장을 위한 QR 코드화면
<img src="https://user-images.githubusercontent.com/50279318/127738501-cc76e4cd-2cfb-4a45-9451-1430b32eb2fd.png" height="400"/>
<br/>

- /market/qr : 매장 관리자 권한으로 접근가능. QR 스캔을 위한 화면.
<img src="https://user-images.githubusercontent.com/50279318/127738504-4c377050-24be-4022-b559-cc6cafaa5d32.png" height="400"/>
<br/>

- error page : 에러 페이지.
<img src="https://user-images.githubusercontent.com/50279318/127738558-82c7d5ba-5981-4094-9f8b-5822c680d82e.png" height="400"/>

---

## 소프트웨어 구조
### 엔티티
<img src="https://user-images.githubusercontent.com/50279318/127738996-4f068df1-23af-4dad-85f4-7e3dee0c95eb.png" width="500"/>

### 기술 스택
<img src="https://user-images.githubusercontent.com/50279318/127739024-6aae4d85-9dcb-4d75-9b51-00da28bdd5de.png" width="500"/>


---
## How to use
### Installation

```bash
$ yarn
```

### Running the app

```bash
# development
$ yarn start

# development watch mode
$ yarn start:dev

# production mode
$ yarn start:prod
```

### Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

### License

Nest is [MIT licensed](LICENSE).
