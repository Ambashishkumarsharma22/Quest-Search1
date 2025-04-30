pipeline {
    agent any

    environment {
        DOCKER_COMPOSE_VERSION = "1.29.2"
        ZIP_FILE = 'Quest-Search.zip'      // Update with your ZIP file name
        EXTRACT_DIR = 'project'            // Directory where we'll extract
    }

    stages {
        stage('Checkout Code') {
            steps {
                echo 'Cloning the repository...'
                checkout scm
            }
        }

        stage('Install unzip (if missing)') {
            steps {
                echo 'Checking if unzip is available...'
                sh '''
                    if ! command -v unzip &> /dev/null; then
                        echo "Installing unzip..."
                        sudo apt-get update && sudo apt-get install -y unzip
                    fi
                '''
            }
        }

        stage('Unzip Project') {
            steps {
                echo "Unzipping project archive..."
                sh '''
                    mkdir -p ${EXTRACT_DIR}
                    unzip -o ${ZIP_FILE} -d ${EXTRACT_DIR}
                '''
            }
        }

        stage('Install Docker Compose (if missing)') {
            steps {
                echo 'Checking Docker Compose version...'
                sh '''
                    if ! command -v docker-compose &> /dev/null; then
                        echo "Installing Docker Compose..."
                        sudo curl -L "https://github.com/docker/compose/releases/download/${DOCKER_COMPOSE_VERSION}/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
                        sudo chmod +x /usr/local/bin/docker-compose
                    else
                        echo "Docker Compose already installed."
                    fi
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

