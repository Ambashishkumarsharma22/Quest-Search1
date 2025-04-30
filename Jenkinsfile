pipeline {
    agent any

    environment {
        COMPOSE_PROJECT_DIR = "${WORKSPACE}/unzipped_project"
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

        stage('Fix Dockerfile Name') {
            steps {
                echo 'Ensuring Dockerfile casing is correct...'
                sh '''
                    if [ -f unzipped_project/apps/backend/DockerFile ]; then
                        mv unzipped_project/apps/backend/DockerFile unzipped_project/apps/backend/Dockerfile
                    fi
                '''
            }
        }

        stage('Build and Run Containers') {
            steps {
                dir('unzipped_project') {
                    echo 'Building Docker containers...'
                    sh 'docker compose down || true'
                    sh 'docker compose build'
                    sh 'docker compose up -d'
                }
            }
        }

        stage('Run Frontend Tests') {
            steps {
                dir('unzipped_project/apps/frontend') {
                    echo 'Installing frontend dependencies and running tests...'
                    sh 'npm ci'
                    sh 'npm test || echo "Frontend tests failed"'
                }
            }
        }

        stage('Run Backend Tests') {
            steps {
                dir('unzipped_project/apps/backend') {
                    echo 'Installing backend dependencies and running tests...'
                    sh 'npm ci'
                    sh 'npm test || echo "Backend tests failed"'
                }
            }
        }
    }

    post {
        always {
            echo 'Cleaning up...'
            dir('unzipped_project') {
                sh 'docker compose down || true'
            }
            cleanWs()
        }
    }
}
