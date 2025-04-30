pipeline {
    agent any

    environment {
        PROJECT_ZIP = 'project.zip'
        UNZIP_DIR = 'unzipped_project'
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
                    if ! command -v unzip >/dev/null; then
                        echo "Error: unzip not installed!"
                        exit 1
                    fi

                    mkdir -p ${UNZIP_DIR}
                    unzip -o ${PROJECT_ZIP} -d ${UNZIP_DIR}
                '''
            }
        }

        stage('Build and Run Containers') {
            steps {
                echo 'Building and starting Docker containers...'
                dir("${UNZIP_DIR}") {
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
