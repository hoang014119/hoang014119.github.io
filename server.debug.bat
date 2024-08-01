java -jar ../../../server/target/server-0.0.1-SNAPSHOT.jar ^
  --404 ^
  --replace=test/angular.js:../test/dist/test/angular.debug.js ^
  --replace=test/setup.js:../test/src/setup.js
