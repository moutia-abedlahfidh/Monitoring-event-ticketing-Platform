
pipeline {
    agent any

    tools {
        jdk 'jdk21'
    }

    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Build Users Service') {
            steps {
                dir('event-ticketing-backend/users') {
                    sh 'chmod +x gradlew'
                    sh './gradlew clean bootJar --no-daemon'
                }
            }
        }
    }

    post {
        success {
            echo 'Spring Boot Build erfolgreich!'
        }
        failure {
            echo 'Spring Boot Build fehlgeschlagen!'
        }
    }
}
