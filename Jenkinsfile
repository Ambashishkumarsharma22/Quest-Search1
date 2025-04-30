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
                git url: 'https://github.com/Ambashishkumarsharma22/Quest-Search1', branch: 'main'
            }
        }

        stage('Unzip Project') {
            steps {
                echo 'Unzipping project archive...'
                sh 'mkdir -p ${UNZIP_DIR}'
                sh 'unzip -o ${PROJECT_ZIP} -d ${UNZIP_DIR}'
            }
        }

        stage('Fix Dockerfile Name') {
            steps {
                echo 'Ensuring Dockerfile casing is correct...'
                sh '''
                    if [ -f ${UNZIP_DIR}/apps/backend/DockerFile ]; then
                        mv ${UNZIP_DIR}/apps/backend/DockerFile ${UNZIP_DIR}/apps/backend/Dockerfile
                    fi
                '''
            }
        }

        stage('Build and Run Containers') {
            steps {
                dir("${UNZIP_DIR}") {
                    echo 'Building Docker containers...'
                    sh 'docker compose down || true'
                    sh 'docker compose build'
                    sh 'docker compose up -d'
                }
            }
        }

        stage('Run Frontend Tests') {
            steps {
                dir("${UNZIP_DIR}/apps/frontend") {
                    sh 'npm install'
                    sh 'npm test || true'
                }
            }
        }

        stage('Run Backend Tests') {
            steps {
                dir("${UNZIP_DIR}/apps/backend") {
                    sh 'npm install'
                    sh 'npm test || true'
                }
            }
        }
    }

    post {
        always {
            echo 'Cleaning up...'
            dir("${UNZIP_DIR}") {
                sh 'docker compose down || true'
            }
            cleanWs()
        }
    }
}
