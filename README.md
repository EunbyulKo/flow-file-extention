
## 개요
확장자(Extension)를 관리하는 간단한 웹 기반 설정 도구입니다.
고정 확장자 선택 및 사용자 정의 확장자를 추가/삭제하여 AWS Lambda에 저장합니다.


<br/>


## 기술 스택

### **Frontend**

* React + TypeScript

### **Backend**

* Node.js (AWS Lambda)
* DynamoDB

### **Deployment**

* S3 + CloudFront


<br/>


## 프로젝트 구조

```
src/
 ├─ api/
 │   └─ LambdaApiClient.ts
 ├─ components/
 │   ├─ FixedExtensionSelector.tsx
 │   ├─ CustomExtensionInput.tsx
 │   └─ CustomExtensionList.tsx
 ├─ assets/
 │   └─ css/
 │        ├─ app.css
 │        ├─ fixed-extensions.css
 │        ├─ custom-extension.css
 │        └─ custom-extension-list.css
 └─ App.tsx

public/
 └─ images/
      └─ flow-icon.jpg
```



<br/>


## 실행 및 빌드

### 개발 모드 실행

```
npm install
npm run dev
```

### 빌드

```
npm run build
```

### 빌드 결과 위치

```
dist/
```

