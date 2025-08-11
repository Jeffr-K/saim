# SAiM

### 개발 환경


### 빌드

##### 소셜 로그인 네이티브 빌드:

소셜 로그인 네이티브 빌드를 위해서 다음과 같이 `EAS` 를 사용합니다.

```bash  
# EAS Build CLI 설치
$ npm install -g eas-cli

# EAS Build CLI 로그인
$ eas login

# 안드로이드용 개발 빌드 생성
$ npx eas build --profile development --platform android

# iOS용 개발 빌드 생성
$ npx eas build --profile development --platform ios 
```