pipeline {
    agent any

    environment {
        // Add /usr/local/bin to PATH so Jenkins can find docker-compose
        PATH = "/usr/local/bin:$PATH"
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
                    command -v unzip
                    mkdir -p unzipped_project
                    unzip -o project.zip -d unzipped_project
                '''
            }
        }

        stage('Build and Run Containers') {
            steps {
                echo 'Building and starting Docker containers...'
                dir('unzipped_project') {
                    sh '''
                        docker-compose down || true
                        docker-compose build
                        docker-compose up -d
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
