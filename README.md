Next.js로 만들어진 타이핑 연습 웹 사이트

# TODO 
### Logic
 - [x] totalUserText가 한 라인 끝에 도달한 경우 자동으로 다음 라인으로 이동
 - [x] 잘못된 타입 or 틀린 Text입력시 유저 피드백(Cell이 상하로 흔들림) 로직 작성
 - [x] Input에 Focusing 된 경우에만 Caret을 렌더링해야함

### 고도화
 - [ ] 타이핑 속도 측정 기능
 - [ ] 타이핑 속도에 따른 게이지 or 계기판 컴포넌트 작성
 - [ ] 타이핑 정확도 계산 로직 작성 

### Animation
 - [ ] Input key감지 키보드 컴포넌트 작성

### Exceptions
 - [ ] 잘못된 텍스트로 공백을 입력한 경우 처리
 - [ ] 잘못된 텍스트 입력시 base의 투명처리의 범위를 공백 단위로 묶기
 - [ ] 한글 2중 겹받침(종성) 단계별 지우기 기능 추가