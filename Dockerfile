FROM gradle:jdk11 as build

ENV GRAAL_VERSION 22.3.1
ENV JAVA_VERSION 11
RUN ["bash", "-c", "bash <(curl -sL https://get.graalvm.org/jdk) graalvm-ce-java$JAVA_VERSION-$GRAAL_VERSION"]
ENV JAVA_HOME /home/gradle/graalvm-ce-java$JAVA_VERSION-$GRAAL_VERSION

WORKDIR /code
#COPY src/ gradle/ build.gradle.kts gradle.properties micronaut-cli.yml openapi.properties settings.gradle.kts ./
COPY . .
RUN gradle clean build

FROM openjdk:17-alpine  as Run
WORKDIR /home/app
COPY --from=build /code/build/docker/main/layers/libs /home/app/libs
COPY --from=build /code/build/docker/main/layers/classes /home/app/classes
COPY --from=build /code/build/docker/main/layers/resources /home/app/resources
COPY --from=build /code/build/docker/main/layers/application.jar /home/app/application.jar
EXPOSE 8080
ENTRYPOINT ["java", "-jar", "/home/app/application.jar"]
