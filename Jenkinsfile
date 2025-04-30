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

        stage('Check Docker & Compose') {
            steps {
                sh 'docker --version || echo "Docker not found"'
                sh 'docker-compose --version || echo "Docker Compose not found"'
            }
        }

        stage('Build and Run Containers') {
            steps {
                dir('Quest-search-main') {
                    sh 'docker-compose down || true'
                    sh 'docker-compose up --build -d'
                }
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
