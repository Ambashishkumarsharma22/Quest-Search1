pipeline {
    agent any

    environment {
        REPO_URL = 'https://github.com/Ambashishkumarsharma22/Quest-Search1'
    }

    stages {
        stage('Checkout') {
            steps {
                // Checkout source code
                git url: "${REPO_URL}", branch: 'main'
            }
        }

        stage('Build') {
            steps {
                echo "Running build steps..."
                // Run your actual build commands here
                sh 'ls -la'
            }
        }

        stage('Test') {
            steps {
                echo "Running tests..."
                // Add your test commands here
            }
        }
    }
}
