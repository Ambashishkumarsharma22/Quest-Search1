pipeline {
    agent any

    stages {
        stage('Clone Repo') {
            steps {
                git 'https://github.com/Ambashishkumarsharma22/Quest-Search1'
            }
        }

        stage('Build') {
            steps {
                echo 'Building the project...'
                // Add build commands here
            }
        }

        stage('Test') {
            steps {
                echo 'Running tests...'
                // Add test commands here
            }
        }

        stage('Deploy') {
            steps {
                echo 'Deploying...'
                // Add deployment steps if any
            }
        }
    }
}
