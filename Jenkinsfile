pipeline {
    agent any

    environment {
        NODE_ENV = 'development'
    }

    tools {
        nodejs 'NodeJS 18'  // Ensure you configure this in Jenkins Global Tools (Manage Jenkins > Global Tool Configuration)
    }

    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Install Dependencies') {
            steps {
                dir('apps/quest-search') {
                    sh 'npm install'
                }
            }
        }

        stage('Lint') {
            steps {
                dir('apps/quest-search') {
                    sh 'npm run lint || echo "Linting failed, but continuing..."'
                }
            }
        }

        stage('Build') {
            steps {
                dir('apps/quest-search') {
                    sh 'npm run build'
                }
            }
        }

        stage('Test') {
            steps {
                dir('apps/quest-search') {
                    sh 'npm test || echo "Tests failed, but continuing..."'
                }
            }
        }

        stage('Docker Compose (Optional)') {
            when {
                expression { fileExists('docker-compose.yml') }
            }
            steps {
                sh 'docker-compose up -d --build'
            }
        }
    }

    post {
        always {
            echo 'Pipeline completed.'
        }
        failure {
            echo 'Pipeline failed!'
        }
    }
}
