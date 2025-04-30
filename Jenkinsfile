pipeline {
    agent any

    environment {
        ZIP_FILE = 'Quest-Search.zip'
        EXTRACT_DIR = 'project'
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
                echo "Unzipping project archive..."
                sh '''
                    if ! command -v unzip &> /dev/null; then
                        echo "Error: unzip not installed!"
                        exit 1
                    fi

                    mkdir -p ${EXTRACT_DIR}
                    unzip -o ${ZIP_FILE} -d ${EXTRACT_DIR}
                '''
            }
        }

        stage('Build and Run Containers') {
            steps {
                echo 'Starting containers...'
                dir("${EXTRACT_DIR}") {
                    sh 'docker-compose up -d --build'
                }
            }
        }

        stage('Teardown') {
            steps {
                echo 'Stopping containers...'
                dir("${EXTRACT_DIR}") {
                    sh 'docker-compose down'
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
