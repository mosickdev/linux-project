# Tomcat 9 기반 이미지 사용
FROM tomcat:9.0

# WAR 파일을 Tomcat 웹앱 폴더에 복사
COPY target/linux-project.war /usr/local/tomcat/webapps/

# Tomcat 포트 개방
EXPOSE 8080

# Tomcat 실행
CMD ["catalina.sh", "run"]
