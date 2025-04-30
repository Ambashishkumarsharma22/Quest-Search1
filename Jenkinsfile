pipeline {
    agent any
    stages {
        stage('Docker Compose Check') {
            steps {
                sh 'docker compose version'
            }
        }
    }
}
