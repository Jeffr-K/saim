const { withDangerousMod } = require('@expo/config-plugins');
const fs = require('fs');
const path = require('path');

const withIosSplashText = (config) => {
  return withDangerousMod(config, [
    'ios',
    async (modConfig) => {
      const projectRoot = modConfig.modRequest.projectRoot;
      const appName = modConfig.modRequest.projectName;

      // 1. 마스터 템플릿 파일 경로
      const sourcePath = path.join(
        projectRoot,
        'assets/splash/SplashScreen.storyboard'
      );

      // 2. 덮어쓸 대상 파일 경로 (올바른 이름으로 수정)
      const destinationPath = path.join(
        projectRoot,
        'ios',
        appName,
        'SplashScreen.storyboard'
      );

      if (!fs.existsSync(sourcePath)) {
        throw new Error(
          `Custom splash screen template not found at: ${sourcePath}`
        );
      }
      
      // 마스터 템플릿으로 Expo 기본 파일을 덮어쓰기
      fs.copyFileSync(sourcePath, destinationPath);

      return modConfig;
    },
  ]);
};

module.exports = withIosSplashText;