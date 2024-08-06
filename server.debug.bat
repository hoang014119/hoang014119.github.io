java -jar ../../../server/target/server-0.0.1-SNAPSHOT.jar ^
  --nologin ^
  --404 ^
  --replace=debug:../test/dist/test ^
  --replace=test/angular.js:debug/runtime.min.js+debug/polyfills.min.js+debug/vendor.min.js+debug/main.min.js ^
  --replace=test/setup.js:../test/src/setup.js

exit /b

java -jar ../../../server/target/server-0.0.1-SNAPSHOT.jar ^
  --nologin ^
  --404 ^
  --replace=debug:../test-new/dist/test-new/browser ^
  --replace=test/angular.js:debug/polyfills.js+debug/main.js ^
  --replace=test/setup.js:../test/src/setup.js
