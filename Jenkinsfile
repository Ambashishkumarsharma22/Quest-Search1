pipeline {
    agent any

    environment {
        COMPOSE_FILE = 'docker-compose.yml'
    }

    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Build Docker Containers') {
            steps {
                sh 'docker-compose build'
            }
        }

        stage('Start Services') {
            steps {
                sh 'docker-compose up -d'
            }
        }

        stage('Run Backend Tests') {
            steps {
                sh 'docker-compose exec -T backend npm test'
            }
        }

        stage('Run Frontend Build') {
            steps {
                sh 'docker-compose exec -T frontend npm run build'
            }
        }

        stage('Teardown') {
            steps {
                sh 'docker-compose down'
            }
        }
    }
}
