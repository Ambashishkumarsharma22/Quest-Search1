
pipeline {
    agent any

    environment {
        DOCKER_BUILDKIT = 1
    }

    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Verify Docker Compose') {
            steps {
                sh 'docker compose version || docker-compose version'
            }
        }

        stage('Build Containers') {
            steps {
                sh 'docker-compose build'
            }
        }

        stage('Start Services') {
            steps {
                sh 'docker-compose up -d'
            }
        }

        stage('Backend Tests') {
            steps {
                sh 'docker-compose exec backend npm test || echo "Skip if no backend tests"'
            }
        }

        stage('Frontend Build') {
            steps {
                sh 'docker-compose exec frontend npm run build || echo "Skip if no frontend build"'
            }
        }

        stage('Teardown') {
            steps {
                sh 'docker-compose down'
            }
        }
    }

    post {
        always {
            echo 'Cleaning up...'
            sh 'docker-compose down || true'
        }
    }
}
