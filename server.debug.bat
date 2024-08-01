java -jar ../../../server/target/server-0.0.1-SNAPSHOT.jar ^
  --404 ^
  --replace=debug:../test/dist/test ^
  --replace=test/angular.js:debug/runtime.min.js+debug/polyfills.min.js+debug/vendor.min.js+debug/main.min.js ^
  --replace=test/setup.js:../test/src/setup.js
