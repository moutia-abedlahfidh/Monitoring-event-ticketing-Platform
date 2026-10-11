
pipeline {
    agent any

    tools {
        jdk 'jdk21'
    }

    environment {
        ACR_NAME = 'eventticketingacr2026'
        ACR_SERVER = 'eventticketingacr2026.azurecr.io'

        RESOURCE_GROUP = 'rg-7bca'
        CONTAINER_APP = 'users'
        IMAGE_NAME = 'users-service'

        AZURE_SUBSCRIPTION_ID = '0dbd7d27-4116-4ef2-8f8e-d17422383bd2'
        AZURE_TENANT_ID = 'DEINE_TENANT_ID'

        IMAGE_TAG = "jenkins-${BUILD_NUMBER}"
    }

    stages {

        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Build Spring Boot') {
            steps {
                dir('event-ticketing-backend/users') {
                    sh 'chmod +x gradlew'
                    sh './gradlew clean bootJar --no-daemon'
                }
            }
        }

        stage('Check Docker and Azure CLI') {
            steps {
                sh 'docker version'
                sh 'az version'
            }
        }

        stage('Docker Build') {
            steps {
                dir('event-ticketing-backend/users') {
                    sh '''
                        docker build \
                          -t ${ACR_SERVER}/${IMAGE_NAME}:${IMAGE_TAG} .
                    '''
                }
            }
        }

        stage('Azure Login') {
            steps {
                withCredentials([
                    usernamePassword(
                        credentialsId: 'azure-sp',
                        usernameVariable: 'AZ_CLIENT_ID',
                        passwordVariable: 'AZ_CLIENT_SECRET'
                    )
                ]) {
                    sh '''
                        set +x

                        az login --service-principal \
                          --username "$AZ_CLIENT_ID" \
                          --password "$AZ_CLIENT_SECRET" \
                          --tenant "$AZURE_TENANT_ID" \
                          --output none

                        az account set \
                          --subscription "$AZURE_SUBSCRIPTION_ID"

                        az acr login --name "$ACR_NAME"
                    '''
                }
            }
        }

        stage('Push Docker Image to ACR') {
            steps {
                sh '''
                    docker push \
                      ${ACR_SERVER}/${IMAGE_NAME}:${IMAGE_TAG}
                '''
            }
        }

        stage('Deploy to Azure Container Apps') {
            steps {
                sh '''
                    az containerapp update \
                      --name "$CONTAINER_APP" \
                      --resource-group "$RESOURCE_GROUP" \
                      --image ${ACR_SERVER}/${IMAGE_NAME}:${IMAGE_TAG}
                '''
            }
        }

        stage('Verify Deployment') {
            steps {
                sh '''
                    az containerapp show \
                      --name "$CONTAINER_APP" \
                      --resource-group "$RESOURCE_GROUP" \
                      --query "{image:properties.template.containers[0].image,latestRevision:properties.latestRevisionName,readyRevision:properties.latestReadyRevisionName}" \
                      -o json
                '''
            }
        }
    }

    post {
        success {
            echo 'CI/CD erfolgreich: Users Service auf Azure aktualisiert!'
        }

        failure {
            echo 'CI/CD fehlgeschlagen. Console Output überprüfen.'
        }
    }
}
