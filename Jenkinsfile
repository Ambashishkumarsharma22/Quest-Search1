pipeline {
    agent any

    environment {
        REPO_URL = 'https://github.com/Ambashishkumarsharma22/Quest-Search1.git'
        ZIP_FILE = 'Quest-search-main.zip'
    }

    stages {
        stage('Checkout Code') {
            steps {
                git url: "${REPO_URL}"
            }
        }

        stage('Unzip Project') {
            steps {
                sh '''
                    if [ -f "${ZIP_FILE}" ]; then
                        unzip -o ${ZIP_FILE} -d unzipped
                        echo "Unzipped project to ./unzipped"
                    else
                        echo "Zip file not found: ${ZIP_FILE}"
                    fi
                '''
            }
        }

        stage('Check Docker & Compose') {
            steps {
                sh '''
                    docker --version
                    docker compose version || docker-compose version
                '''
            }
        }

        stage('Build and Run Containers') {
            steps {
                dir('unzipped') {
                    script {
                        if (fileExists('docker-compose.yml')) {
                            sh 'docker compose up -d --build || docker-compose up -d --build'
                        } else {
                            echo 'No docker-compose.yml found in unzipped directory'
                        }
                    }
                }
            }
        }
    }

    post {
        always {
            echo 'Pipeline execution completed.'
        }
    }
}
