pipeline {
    agent any

    environment {
        DOCKER_COMPOSE_VERSION = '1.29.2' // or latest
    }

    stages {
        stage('Clean Workspace') {
            steps {
                cleanWs()
            }
        }

        stage('Unzip Project') {
            steps {
                echo 'Unzipping project files...'
                unzip zipFile: 'Quest-search-main.zip', dir: 'project'
            }
        }

        stage('Install Docker Compose (if missing)') {
            steps {
                sh '''
                    if ! command -v docker-compose > /dev/null; then
                        echo "Docker Compose not found. Installing..."
                        sudo curl -L "https://github.com/docker/compose/releases/download/${DOCKER_COMPOSE_VERSION}/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
                        sudo chmod +x /usr/local/bin/docker-compose
                    fi
                '''
            }
        }

        stage('Build and Run Containers') {
            steps {
                dir('project') {
                    sh 'docker-compose up -d --build'
                }
            }
        }

        stage('Run Backend Tests (Optional)') {
            steps {
                dir('project') {
                    // Replace with your actual backend test command
                    sh 'docker-compose exec backend npm test || true'
                }
            }
        }

        stage('Teardown') {
            steps {
                dir('project') {
                    sh 'docker-compose down'
                }
            }
        }
    }

    post {
        always {
            echo 'Cleaning up workspace...'
            cleanWs()
        }
    }
}

