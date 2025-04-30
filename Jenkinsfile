pipeline {
    agent any

    environment {
        ZIP_FILE = 'project.zip'
        EXTRACT_DIR = 'unzipped_project'
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
                    if ! command -v unzip >/dev/null 2>&1; then
                        echo "Error: unzip is not installed!"
                        exit 1
                    fi
                    mkdir -p ${EXTRACT_DIR}
                    unzip -o ${ZIP_FILE} -d ${EXTRACT_DIR}
                '''
            }
        }

        stage('Build and Run Containers') {
            steps {
                echo 'Starting Docker containers...'
                dir("${EXTRACT_DIR}") {
                    sh '''
                        if [ ! -f docker-compose.yml ]; then
                            echo "docker-compose.yml not found in ${EXTRACT_DIR}"
                            exit 1
                        fi
                        docker-compose down || true
                        docker-compose up --build -d
                    '''
                }
            }
        }

        stage('Teardown') {
            steps {
                echo 'Stopping and removing Docker containers...'
                dir("${EXTRACT_DIR}") {
                    sh '''
                        docker-compose down
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
