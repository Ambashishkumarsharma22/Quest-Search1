pipeline {
    agent any

    environment {
        COMPOSE_PROJECT_NAME = "questsearch"
    }

    stages {
        stage('Checkout Code') {
            steps {
                git url: 'https://github.com/Ambashishkumarsharma22/Quest-Search1', branch: 'main'
            }
        }

        stage('Unzip Project') {
            steps {
                script {
                    sh 'unzip -o Quest-search-main.zip'
                }
            }
        }

        stage('Check Docker & Compose') {
            steps {
                sh 'docker --version'
                sh 'docker-compose --version'
            }
        }

        stage('Build and Run Containers') {
            steps {
                sh 'docker-compose down || true'
                sh 'docker-compose up --build -d'
            }
        }
    }

    post {
        always {
            echo 'Pipeline execution completed.'
        }
        failure {
            echo 'Pipeline failed.'
        }
        success {
            echo 'Pipeline succeeded.'
        }
    }
}
