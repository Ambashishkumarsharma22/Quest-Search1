pipeline {
    agent any

    environment {
        DOCKER_CLI_EXPERIMENTAL = 'enabled'
    }

    stages {
        stage('Checkout Code') {
            steps {
                echo 'Cloning the repository...'
                checkout scm
            }
        }

        stage('Unzip Project') {
            steps {
                echo 'Unzipping project archive...'
                sh '''
                    mkdir -p unzipped_project
                    unzip -o project.zip -d unzipped_project
                '''
            }
        }

        stage('Check Docker & Compose') {
            steps {
                sh '''
                    which docker || echo "Docker not found"
                    docker --version || echo "Docker CLI not available"
                    docker compose version || echo "Docker Compose not found"
                '''
            }
        }

        stage('Build and Run Containers') {
            steps {
                echo 'Building and starting Docker containers...'
                dir('unzipped_project') {
                    sh '''
                        docker compose down || true
                        docker compose build
                        docker compose up -d
                    '''
                }
            }
        }
    }

    post {
        always {
            echo 'Cleaning workspace...'
            cleanWs()
        }
    }
}
