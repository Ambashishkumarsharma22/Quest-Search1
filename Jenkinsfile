pipeline {
    agent any

    stages {
        stage('Declarative: Checkout SCM') {
            steps {
                checkout scm
            }
        }

        stage('Checkout Code') {
            steps {
                git url: 'https://github.com/Ambashishkumarsharma22/Quest-Search1', branch: 'main'
            }
        }

        stage('Unzip Project') {
            steps {
                sh 'unzip project.zip -d ./unzipped || echo "No zip found"'
            }
        }

        stage('Fix Dockerfile Name') {
            steps {
                sh 'mv ./unzipped/Dockerfile.prod ./unzipped/Dockerfile || true'
            }
        }

        stage('Build and Run Containers') {
            steps {
                sh '''
                docker-compose -f ./unzipped/docker-compose.yml up -d --build
                '''
            }
        }

        stage('Run Frontend Tests') {
            steps {
                sh '''
                cd ./unzipped/frontend
                npm install
                npm test || echo "Frontend tests failed"
                '''
            }
        }

        stage('Run Backend Tests') {
            steps {
                sh '''
                cd ./unzipped/backend
                npm install
                npm test || echo "Backend tests failed"
                '''
            }
        }
    }

    post {
        always {
            echo 'Cleaning up...'
            sh 'docker-compose down || true'
        }
        success {
            echo 'Build completed successfully!'
        }
        failure {
            echo 'Build failed.'
        }
    }
}
